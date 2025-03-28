import dotenv from 'dotenv';
try {
	const result = dotenv.config();
	if (result.error) {
		console.warn('⚠️  Nie udało się załadować pliku .env:', result.error);
	}
} catch (err) {
	console.error('❌ Błąd przy ładowaniu konfiguracji dotenv:', err.message);
	process.exit(1); // zakończ, jeśli konfiguracja jest krytyczna
}

import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function loadData() {
	const files = [
		'additional_skills_and_qualifications',
		'education',
		'experience',
		'what_i_know',
		'what_im_learning_now',
		'where_i_want_to_go',
	];

	const data = {};

	for (const file of files) {
		const filePath = path.resolve('./data', `${file}.json`);

		try {
			const content = await fs.readFile(filePath, 'utf-8');
			try {
				data[file] = JSON.parse(content);
			} catch (jsonError) {
				console.warn(`⚠️  Błąd parsowania JSON w pliku "${file}.json": ${jsonError.message}`);
			}
		} catch (fsError) {
			console.warn(`⚠️  Nie udało się odczytać pliku "${file}.json": ${fsError.message}`);
		}
	}

	return data;
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function startChat() {
	const knowledge = await loadData();

	const systemPrompt = `
Jesteś chatbotem-reprezentantem kandydata do pracy. Twoim zadaniem jest odpowiadać na pytania rekrutera na podstawie danych w formacie JSON, które opisują konkretnego kandydata (Twojego twórcę). Nie jesteś kandydatem — jesteś jego asystentem.

Nigdy nie twórz nowych faktów i nie dopowiadaj niczego, co nie wynika z danych. Jeśli czegoś nie ma w danych, powiedz to wprost lub zasugeruj, że kandydat może odpowiedzieć osobiście.

Mów konkretnie, zwięźle i profesjonalnie — maksymalnie 3 zdania. Staraj się być pomocny, rzeczowy i uprzejmy. Jeśli rozmowa prowadzona jest po angielsku, odpowiadaj po angielsku.

Po każdej odpowiedzi zadaj pytanie otwarte, które naturalnie podtrzymuje rozmowę.

Po trzecim pytaniu rekrutera zaproponuj kontakt bezpośredni z kandydatem (np. przez e-mail lub LinkedIn, jeśli dostępny). Nie podawaj danych kontaktowych, jeśli ich nie ma w danych.


Dane użytkownika:
${JSON.stringify(knowledge, null, 2)}
`;

	const messages = [{ role: 'system', content: systemPrompt }];
	let questionCount = 0;

	console.log(
		'🤖 Witaj! Jestem chatem Adama Zagórskiego! Chętnie Ci o nim opowiem i pomogę poznać przed rozmową rekrutacyjną. Jakie informacje Cię interesują?\n'
	);

	const ask = () => {
		rl.question('🧑 Ty: ', async userInput => {
			if (userInput.toLowerCase() === 'exit') {
				console.log('👋 Do zobaczenia!');
				rl.close();
				return;
			}

			messages.push({ role: 'user', content: userInput });

			try {
				const response = await client.chat.completions.create({
					model: 'gpt-3.5-turbo-0125',
					messages,
					temperature: 0.7,
				});

				const reply = response.choices[0].message.content;
				messages.push({ role: 'assistant', content: reply });

				console.log('\n🤖:', reply, '\n');
				questionCount++;
				if (questionCount === 3) {
					console.log('📩 Jeśli chcesz, mogę przekazać kontakt bezpośredni do kandydata.');
				}
			} catch (err) {
				console.error('❌ Błąd zapytania:', err.message);
			}

			ask();
		});
	};

	ask();
}

startChat();
