// 📁 routes/chatRoute.js
import express from 'express';
import fs from 'fs/promises';
import { loadData } from '../modules/loadData.js';
import { buildSystemPrompt } from '../modules/prompt.js';

const router = express.Router();

export default function createChatRoute(client) {
	const messages = [];
	let questionCount = 0;

	router.post('/chat', async (req, res) => {
		const { message } = req.body;
		if (!message) return res.status(400).json({ error: 'Brak wiadomości.' });

		try {
			if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === '') {
				return res.json({ error: 'NO_API_KEY' });
			}

			if (messages.length === 0) {
				const knowledge = await loadData();
				const systemPrompt = buildSystemPrompt(knowledge);
				messages.push({ role: 'system', content: systemPrompt });
			}

			messages.push({ role: 'user', content: message });

			const response = await client.chat.completions.create({
				model: 'gpt-4o',
				// model: 'gpt-3.5-turbo',
				messages,
				temperature: 0.7,
			});

			const reply = response.choices[0].message.content;
			messages.push({ role: 'assistant', content: reply });

			questionCount++;
			let finalReply = reply;
			if (questionCount === 3) {
				finalReply += '\n\n📩 Jeśli chcesz, mogę przekazać kontakt bezpośredni do kandydata.';
			}

			await fs.appendFile('chatlog.txt', `🧑 ${message}\n🤖 ${finalReply}\n\n`, 'utf-8');

			const usage = response.usage;
			const promptCost = (usage.prompt_tokens * 0.005) / 1000;
			const completionCost = (usage.completion_tokens * 0.015) / 1000;
			const totalCost = promptCost + completionCost;

			res.json({
				reply: finalReply,
				usage: {
					prompt_tokens: usage.prompt_tokens,
					completion_tokens: usage.completion_tokens,
					total_tokens: usage.total_tokens,
					estimated_cost: totalCost.toFixed(6),
				},
			});
		} catch (err) {
			console.error('Błąd w /api/chat:', err);
			res.status(500).json({ error: 'Błąd serwera OpenAI.' });
		}
	});

	return router;
}
