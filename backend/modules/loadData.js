// 📁 modules/loadData.js
import fs from 'fs/promises';
import path from 'path';

export async function loadData() {
	const files = [
		'additional_skills_and_qualifications',
		'education',
		'experience',
		'what_i_know',
		'what_im_learning_now',
		'where_i_want_to_go',
		'contact',
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
