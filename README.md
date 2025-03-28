# 🤖 AI CV Agent

**AI CV Agent** to inteligentny asystent kariery, który może reprezentować Ciebie podczas rozmowy z rekruterem.  
Wykorzystuje model OpenAI (GPT) oraz dane zapisane w plikach JSON, aby prowadzić naturalną i profesjonalną rozmowę w Twoim imieniu.

---

## ✨ Co potrafi?

- Odpowiada na pytania rekrutera na podstawie Twojego doświadczenia, edukacji, projektów i umiejętności.
- Komunikuje się naturalnym językiem, opierając się tylko na danych, które mu dostarczysz.
- Zlicza tokeny i szacuje koszty sesji.
- Uruchamiany lokalnie — Ty kontrolujesz dane i klucz API.

---

## 🚀 Jak uruchomić?

### 1. Sklonuj repozytorium:

```bash
git clone https://github.com/adamzagorski92/ai-cvAgent.git
cd ai-cvAgent
```

### 2. Zdobądź klucz API z OpenAI

Zarejestruj się na stronie:

👉 https://auth.openai.com/log-in

Wygeneruj swój klucz API.

### 3. Wklej klucz do pliku .env

Utwórz plik .env w katalogu głównym i dodaj:
```
OPENAI_API_KEY=tu_wklej_swoj_klucz
PORT=3000
```

### 4. Zainstaluj zależności
```
npm install
```

### 5. Uruchom aplikację
```
npm start
```

Po chwili aplikacja będzie dostępna pod adresem:
```
👉 http://localhost:3000
```

### 6. Przygotuj dane w formacie JSON (opcjonalne)

Uzupełnij pliki w folderze data/:
Jeśli zmienisz zawartość tych plików, to agent będzie z nich korzystał
Póki co są tam dane dotyczące Adama Zagórskiego, aktualne na 28.03.2025r.

- experience.json

- education.json

- what_i_know.json

- what_im_learning_now.json

- where_i_want_to_go.json

- additional_skills_and_qualifications.json

- contact.json

### 7. 🧠 Co potrafi agent?

Prowadzi naturalną rozmowę z rekruterem

Reprezentuje Cię na podstawie Twoich danych

Nie wymyśla – opiera się wyłącznie na faktach z JSON

Liczy tokeny i szacuje koszt rozmowy

### 8. 🛠 Wykorzystane technologie

Node.js + Express

OpenAI (GPT-4o / GPT-3.5)

HTML, CSS, JS (frontend terminalowy i webowy)

Pliki .env i lokalne logowanie tokenów

### 9. Co warto byloby poprawić?

Możnaby dopisać opcjonalny moduł RAG (Retrieval-Augmented Generation) w połączeniu z Agentem AI.
Możnaby zbierać dane z wyszukiwań użytkowników i ulepszać bazę danych dodając odpowiedzi generowane poza promptem.
W sytuacjach niestandardowych dopiero posiłkować się modelem AI, co z biegiem czasu powinno zmneijszyć koszty.

Do działania lokalnego (np do działania wewnątrz firmy), możnaby lokalnego modelu typu LLama lub mistral, co zredukowałoby koszt co jedynie do zuzytego prądu i amortyzacji sprzętu wewnątrz firmy. Wydaje mi się, że byłoby to najtańsze rozwiązanie.

Jeśli mówimy jednak o zdalnym działaniu, to będzie trzeba się posiłkować dużymi modelami, czy to amerykanskimi, czy chinskimi, a być może naszym polskim Bielikiem! :) W każdym razie będzie trzeba liczyć się z kosztami i to nie małymi.

Jedno zapytanie zużywa 5500-6000 tokenów (biorąc pod uwagę aktualną bazę danych, którą możesz sobie przejrzeć w folderze "data") Co przy najnowszym gpt-4o przekłada się na około 0,03$ za zapytanie.
Daje to około 33-35 zapytań za 1$! To dość drogo!
Opcjonalnie można uzyć modelu gpt-3.5-turbo, który jest 10 razy tańszy, co przełoży się na 330-350 zapytań za dolara!

Naturalnie należałoby wdrożyć sporo mechanizmów z dziedziny cybersecurity, aby zabezpieczyć się przed DDoS lub innymi botami, które mogłyby momentalnie doprowadzić do ruiny finansowej niejedną firmę będąc "ciekawskim" w wysyłaniu zapytań do takiego bota.

Być może warto byłoby wdrożyć dostępność do takiego modułu za bramką logowania. ((nie dla każdego- tylko dla zautoryzowanych uzytkowmników))

### PODSUMOWANIE

Ogólnie ten skrypt (agent) działa lokalnie, więc nie ma się czego bać.
Jeśli chcesz potestować sobie zapytania i zmniejszyć koszty takich testów, to przejdź do
routes>chatRoute.js
a następnie poszukaj takiego kodu i zrób to:

const response = await client.chat.completions.create({
model: 'gpt-4o', <---- ZAKOMENTUJ TĘ LINIĘ
// model: 'gpt-4o', <---- ODKOMENTUJ TĘ LINIĘ
messages,
temperature: 0.7, <---- (OPCJONALNIE) pobaw się tym paramterem 0d 0 do 1. Im większa liczba tym model bardziej kreatywny, a im mniejsza tym bardziej konserwatywny
});
