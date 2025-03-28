# 🤖 AI CV Agent

**AI CV Agent** to inteligentny asystent kariery, który może rozmawiać z rekruterem w Twoim imieniu.  
Wykorzystuje model GPT (OpenAI) oraz Twoje dane zapisane w plikach JSON. Odpowiada naturalnie, profesjonalnie i tylko na podstawie faktów, które mu przekażesz.

---

## 🚀 Jak uruchomić?

### 1. Sklonuj repozytorium

```bash
git clone https://github.com/adamzagorski92/ai-cvAgent.git
cd ai-cvAgent
```

---

### 2. Zdobądź klucz API z OpenAI

Zarejestruj się na stronie:

👉 [https://auth.openai.com/log-in](https://auth.openai.com/log-in)

Wygeneruj swój klucz API.

---

### 3. Wklej klucz do pliku `.env`

Utwórz plik .env w katalogu głównym i dodaj:

OPENAI_API_KEY=tu_wklej_swoj_klucz
PORT=3000

### 4. Zainstaluj zależności

npm install

### 5. Uruchom aplikację

npm start

```

Po chwili aplikacja będzie dostępna pod adresem:

👉 http://localhost:3000

### 6. Przygotuj dane w formacie JSON (opcjonalne)

Uzupełnij pliki w folderze `data/`:

- `experience.json`
- `education.json`
- `what_i_know.json`
- `what_im_learning_now.json`
- `where_i_want_to_go.json`
- `additional_skills_and_qualifications.json`
- `contact.json`

> Te pliki to Twoja baza wiedzy – agent zna tylko to, co tam wpiszesz.

---

## 🧠 Co potrafi agent?

- Prowadzi naturalną rozmowę z rekruterem
- Reprezentuje Cię na podstawie Twoich danych
- Nie wymyśla – opiera się wyłącznie na faktach z JSON
- Liczy tokeny i szacuje koszt rozmowy

---

## 🛠 Wykorzystane technologie

- Node.js + Express
- OpenAI (GPT-4o / GPT-3.5)
- HTML, CSS, JS (frontend terminalowy i webowy)
- Pliki `.env` i lokalne logowanie tokenów

---

## 9. Co warto byłoby ulepszyć?

W przyszłości projekt można rozbudować o **moduł RAG (Retrieval-Augmented Generation)**. Umożliwi on dynamiczne wyszukiwanie tylko najbardziej trafnych fragmentów wiedzy z plików `.json`, a następnie przekazywanie ich do modelu AI.

### 🔍 Dlaczego RAG?

- 🔹 Zmniejsza liczbę tokenów przekazywanych do modelu → **niższe koszty**
- 🔹 Zwiększa **trafność odpowiedzi**
- 🔹 Daje większą **kontrolę nad wiedzą**, z której korzysta agent

Dodatkowo, można rozważyć **zbieranie danych z zapytań użytkowników** i ulepszanie bazy wiedzy poprzez automatyczne dodawanie wygenerowanych odpowiedzi poza głównym promptem. W ten sposób model AI byłby wykorzystywany tylko w niestandardowych przypadkach.

---

## 🧠 Lokalne vs zdalne działanie

### 🖥️ Tryb lokalny (np. wewnątrz firmy)

Można uruchomić lokalne modele (np. **LLaMA**, **Mixtral**, **Mistral**) bez konieczności korzystania z usług zewnętrznych:

- Koszty ograniczają się do energii i sprzętu
- Dane pozostają w pełni prywatne
- Idealne do środowisk zamkniętych

### ☁️ Tryb zdalny (np. SaaS, produkt online)

Wymaga użycia zewnętrznych modeli (np. **OpenAI**, **Baidu**, a może w przyszłości **Bielik** 🇵🇱). W tym przypadku należy liczyć się z kosztami.

---

## 💸 Przykład kosztów zapytania

Przy aktualnej bazie danych (folder `data/`) jedno zapytanie zużywa około **5500–6000 tokenów**.

| Model           | Koszt zapytania | Zapytania za 1 USD |
| --------------- | --------------- | ------------------ |
| `gpt-4o`        | ok. **$0.03**   | ~33                |
| `gpt-3.5-turbo` | ok. **$0.003**  | ~330               |

➡️ **Wniosek:** Testuj na tańszym modelu (`gpt-3.5-turbo`), a przełączaj na `gpt-4o` tylko wtedy, gdy naprawdę zależy Ci na jakości.

---

## 🛡️ Cyberbezpieczeństwo

Jeśli planujesz udostępnić agenta publicznie, koniecznie zadbaj o zabezpieczenia:

- 🧱 **Rate limiting** – ogranicz liczbę zapytań na IP
- 🔐 **Autoryzacja** – logowanie tylko dla uprawnionych użytkowników
- 🛡️ **Ochrona przed DDoS** – unikaj przeciążeń i nadużyć

Bez odpowiednich zabezpieczeń nawet prosty bot może szybko wygenerować ogromne koszty i narazić Twoją aplikację na problemy.

---

## ✅ Podsumowanie

Agent działa w trybie **lokalnym**, więc możesz bezpiecznie testować jego możliwości bez ponoszenia kosztów czy ryzyka udostępniania danych na zewnątrz.

Aby **zmniejszyć koszty testów**, warto tymczasowo przełączyć model z `gpt-4o` na tańszy `gpt-3.5-turbo`.

### 🔧 Jak to zrobić?

1. Otwórz plik:

```

routes/chatRoute.js

````

2. Znajdź fragment:

```js
const response = await client.chat.completions.create({
	model: 'gpt-4o',
	messages,
	temperature: 0.7,
});
````

3. I zamień go na:

```js
const response = await client.chat.completions.create({
	model: 'gpt-3.5-turbo', // ✅ tańszy model — 10x mniej kosztowny
	messages,
	temperature: 0.7, // 🎛️ Zakres 0–1: im wyższa wartość, tym bardziej kreatywna odpowiedź
});
```

> 💡 Tip: `temperature` możesz regulować od `0` (bardziej precyzyjny, "konserwatywny" styl) do `1` (bardziej swobodna, kreatywna forma wypowiedzi).

---

Gotowe! Możesz teraz rozwijać swojego AI Asystenta Kariery. 💼🤖
