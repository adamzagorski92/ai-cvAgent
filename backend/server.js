// 📁 server.js
import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';
import createChatRoute from './routes/chatRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🧠 Middleware
app.use(express.json());

// 🌍 Statyczny frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// 🤖 API czatu
app.use('/api', createChatRoute(client));

app.listen(port, () => {
	console.log(`✅ Serwer działa na http://localhost:${port}`);
});
