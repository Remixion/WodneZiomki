# 🎮 Rift Draft

Narzędzie do losowania drużyn i postaci w League of Legends custom meczach.  
Zbudowane jako statyczna strona — zero backendu, działa w 100% w przeglądarce.

## 🚀 Uruchomienie na GitHub Pages (krok po kroku)

### 1. Utwórz repozytorium

Przejdź na [github.com/new](https://github.com/new) i utwórz nowe repozytorium:
- Nazwa: `rift-draft` (lub dowolna)
- Widoczność: **Public** (wymagane dla darmowego GitHub Pages)
- NIE zaznaczaj "Add README"

### 2. Wgraj pliki

Masz dwie opcje:

**Opcja A — przez przeglądarkę (łatwiej):**
1. Wejdź do repozytorium → kliknij **"uploading an existing file"**
2. Przeciągnij wszystkie pliki z folderu `rift-draft/`:
   - `index.html`
   - `data.js`
   - `.nojekyll`
3. Kliknij **"Commit changes"**

**Opcja B — przez Git:**
```bash
git init
git add .
git commit -m "initial deploy"
git branch -M main
git remote add origin https://github.com/TWOJ_NICK/rift-draft.git
git push -u origin main
```

### 3. Włącz GitHub Pages

1. Idź do repozytorium → **Settings** → **Pages** (lewy panel)
2. W sekcji "Source" wybierz:
   - Branch: **main**
   - Folder: **/ (root)**
3. Kliknij **Save**
4. Poczekaj ~1 minutę

Strona będzie dostępna pod adresem:
```
https://TWOJ_NICK.github.io/rift-draft/
```

---

## 📁 Struktura plików

```
rift-draft/
├── index.html     — cała aplikacja (HTML + CSS + JS logika)
├── data.js        — dane: gracze, historia meczy, postacie, aliasy
├── .nojekyll      — wyłącza przetwarzanie przez Jekyll
└── README.md      — ten plik
```

## ✏️ Aktualizacja danych

Edytuj `data.js` żeby:
- Dodać nowych graczy do `const PC = { ... }`
- Dodać mecze do `let MH = [ ... ]`
- Zmienić aliasy w `let ALIASES = { ... }`

Po każdej zmianie zrób `git push` (lub wgraj plik przez GitHub UI) — strona zaktualizuje się automatycznie w ciągu ~1 minuty.

## 💾 Dane użytkownika

Wszystkie zmiany robione w aplikacji (dodani gracze, blokady, wyniki AI Scan) są zapisywane w **localStorage** przeglądarki — czyli lokalnie na danym urządzeniu. Dane nie są synchronizowane między urządzeniami. Żeby przenieść dane na inne urządzenie, wyeksportuj historię przez przycisk `↓ CSV`.

## 🤖 AI Scan

Do skanowania screenów przez AI potrzebny jest klucz API Anthropic (`claude-sonnet-4-20250514`).  
Klucz podajesz w oknie AI Scan — nie jest nigdzie zapisywany.

---

*Stworzone z pomocą Claude · Powered by Riot Data Dragon*
