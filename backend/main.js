// 📁 main.js
import { loadData } from './modules/loadData.js';
import { buildSystemPrompt } from './modules/prompt.js';
import { createChatInterface } from './public/chat.js';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function start() {
	const knowledge = await loadData();
	const systemPrompt = buildSystemPrompt(knowledge);
	createChatInterface(client, systemPrompt);
}

start();
