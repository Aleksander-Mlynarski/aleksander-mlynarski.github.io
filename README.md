# Strona portfolio — Aleksander Młynarski

Statyczna strona osobista gotowa do wdrożenia na własną domenę (GitHub Pages, Netlify, Cloudflare Pages itd.).

## Podgląd lokalny

```bash
cd website
python -m http.server 8080
```

Otwórz [http://localhost:8080](http://localhost:8080).

## Struktura

```
website/
├── index.html          # główna strona
├── css/styles.css
├── js/main.js          # menu mobilne, lightbox galerii
└── assets/
    ├── docs/           # CV, chwytak, certyfikaty (PDF)
    └── gallery/        # tu wrzucaj zdjęcia z hobby
```

## Co warto dostosować

1. **Galeria** — wrzuć zdjęcia do `assets/gallery/` i dodaj wpisy w tablicy `galleryImages` w `js/main.js`:

```javascript
const galleryImages = [
  { src: "assets/gallery/chwytak.jpg", caption: "Chwytak — montaż" },
  { src: "assets/gallery/projekt.jpg", caption: "Opis zdjęcia" },
];
```

2. **Język** — przełącznik PL/EN w górnym panelu; wybór zapisywany w przeglądarce. CV po angielsku: `assets/docs/CV_Aleksander_Mlynarski_eng.pdf`.

## Wdrożenie na domenę

### GitHub Pages

1. Utwórz repozytorium np. `Aleksander-Mlynarski.github.io` (lub osobne repo `portfolio-site`).
2. Wgraj zawartość folderu `website/` (nie cały katalog `portfolio` z laboratoriami).
3. W Settings → Pages ustaw branch `main` i folder root.
4. W DNS domeny ustaw rekordy:
   - **A** lub **CNAME** wskazujące na GitHub Pages (patrz [dokumentacja GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).

### Netlify / Cloudflare Pages

Przeciągnij folder `website` w panelu albo połącz repo — build command pusty, publish directory: `.`

## Nowy projekt na stronie

Skopiuj blok `<article class="project-card">` w sekcji `#projekty` i uzupełnij tytuł, opis oraz link do GitHub/PDF.
