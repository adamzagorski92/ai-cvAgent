// 📁 public/chat.js
const input = document.getElementById('input');
const chat = document.getElementById('chat');

let totalSessionCost = 0;

function appendMessage(content, className) {
	const msg = document.createElement('div');
	msg.className = `message ${className}`;
	msg.textContent = content;
	chat.appendChild(msg);
	chat.scrollTop = chat.scrollHeight;
}

// Pierwsze powitanie bota po załadowaniu strony
window.addEventListener('DOMContentLoaded', () => {
	appendMessage(
		'👋 Cześć! Jestem botem reprezentującym umiejętności Adama. Mogę powiedzieć więcej o jego doświadczeniu. W czym mogę Ci pomóc?',
		'bot'
	);
});

input.addEventListener('keydown', async e => {
	if (e.key === 'Enter' && input.value.trim()) {
		const question = input.value.trim();
		appendMessage(question, 'user');
		input.value = '';

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: question }),
			});

			const data = await res.json();

			if (data.error === 'NO_API_KEY') {
				appendMessage('⚠️ Podpnij API key z OpenAI w pliku .env', 'bot');
				return;
			}

			appendMessage(data.reply, 'bot');

			if (data.usage) {
				totalSessionCost += parseFloat(data.usage.estimated_cost);
				const info = `📊 Tokeny: prompt ${data.usage.prompt_tokens}, odpowiedź ${data.usage.completion_tokens}, razem ${
					data.usage.total_tokens
				} | 💰 Koszt tego zapytania: $${data.usage.estimated_cost} | 💼 Koszt całej sesji: $${totalSessionCost.toFixed(
					6
				)}`;
				appendMessage(info, 'bot stats');
			}
		} catch (err) {
			appendMessage('❌ Wystąpił błąd podczas komunikacji z serwerem.', 'bot');
		}
	}
});
