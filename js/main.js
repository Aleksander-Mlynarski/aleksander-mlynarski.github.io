(function () {
  "use strict";

  const STORAGE_KEY = "portfolio-lang";
  let currentLang = localStorage.getItem(STORAGE_KEY) || "pl";

  function setLanguage(lang) {
    if (!window.I18N[lang]) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    const t = window.I18N[lang];
    document.documentElement.lang = lang;

    const meta = document.querySelector('meta[name="description"]');
    if (meta && t["meta.description"]) meta.content = t["meta.description"];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.dataset.i18nHtml;
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.dataset.i18nAria;
      if (t[key] !== undefined) el.setAttribute("aria-label", t[key]);
    });

    document.querySelectorAll("[data-i18n-caption]").forEach((el) => {
      const key = el.dataset.i18nCaption;
      if (t[key] !== undefined) el.dataset.caption = t[key];
    });

    document.querySelectorAll(".cv-link").forEach((el) => {
      el.href = window.I18N.cv[lang];
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  setLanguage(currentLang);

  document.getElementById("year").textContent = new Date().getFullYear();

  const toggle = document.querySelector(".nav-toggle");
  const navPanel = document.querySelector(".nav-panel");

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    navPanel.classList.toggle("open", !open);
  });

  navPanel.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      navPanel.classList.remove("open");
    });
  });

  const galleryImages = [];

  const grid = document.getElementById("gallery-grid");

  if (galleryImages.length > 0) {
    grid.innerHTML = "";
    galleryImages.forEach(({ src, captionKey, caption }) => {
      const fig = document.createElement("figure");
      fig.className = "gallery-item";
      fig.dataset.caption = caption || "";
      if (captionKey) fig.dataset.i18nCaption = captionKey;
      const img = document.createElement("img");
      img.src = src;
      img.alt = caption || "";
      img.loading = "lazy";
      fig.appendChild(img);
      grid.appendChild(fig);
    });
    setLanguage(currentLang);
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (!item) return;
    const img = item.querySelector("img");
    if (img) openLightbox(img.src, item.dataset.caption || img.alt);
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  const header = document.querySelector(".header");
  const progress = document.getElementById("scroll-progress");
  const navAnchors = document.querySelectorAll(".nav-links a[data-nav]");
  const sections = ["o-mnie", "projekty", "galeria", "kontakt"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function onScroll() {
    const y = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;

    progress.style.width = pct + "%";
    header.classList.toggle("header-scrolled", y > 24);

    let current = "";
    sections.forEach((section) => {
      if (y >= section.offsetTop - 120) current = section.id;
    });

    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.dataset.nav === current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
