# Portfolio — Aleksander Młynarski

Strona: **https://aleksander-mlynarski.github.io/portfolio-site/**

---

## Struktura plików

```
website/
├── index.html
├── css/styles.css
├── js/
│   ├── main.js       # galeria, menu, scroll
│   └── i18n.js       # tłumaczenia PL/EN
└── assets/
    ├── docs/         # CV, certyfikaty, PDF-y projektów
    └── gallery/      # zdjęcia do galerii
```

---

## Galeria — Twoje zdjęcia (hobby, sport, życie)

Galeria to **Twoje prywatne zdjęcia** — nie projekty z uczelni (chwytak i inne są w sekcji Projekty).

### 1. Wrzuć pliki

Skopiuj zdjęcia do folderu:

```
website/assets/gallery/
```

Np. `plywanie.jpg`, `gitara.jpg`, `wycieczka.jpg`. Format: **JPG** lub **PNG**.

### 2. Wpisz je w `js/main.js`

Tablica `galleryImages` — wystarczy sama ścieżka do pliku:

```javascript
const galleryImages = [
  "assets/gallery/moje-zdjecie.jpg",
  "assets/gallery/kolejne.jpg",
];
```

Podpisy nie są wymagane. Po kliknięciu zdjęcie powiększa się bez opisu.

### 3. Wgraj na GitHub

Dodaj nowe pliki do repo i zrób commit + push. Strona odświeży się po ok. 1 minucie.

> Dopóki `galleryImages` jest puste, na stronie widać placeholdery.

---

## Inne zmiany

| Co | Gdzie |
|----|--------|
| Tekst „O mnie”, projekty | `index.html` + tłumaczenia w `js/i18n.js` |
| CV po polsku / angielsku | `assets/docs/` — linki przełączają się z językiem |
| Nowy projekt | Skopiuj blok `<article class="project-card">` w `index.html` |
| Kolory, wygląd | `css/styles.css` |

---

## Podgląd lokalny

```bash
cd website
python -m http.server 8080
```

Otwórz http://localhost:8080

---

## Własna domena (opcjonalnie)

Strona działa za darmo na GitHub Pages — własna domena nie jest potrzebna.

Jeśli kiedyś kupisz domenę: **Settings → Pages → Custom domain**, potem rekord DNS u rejestratora (CNAME `www` → `aleksander-mlynarski.github.io` albo 4× rekord A na `@`). Szczegóły: [dokumentacja GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
