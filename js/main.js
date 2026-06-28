(function () {
  "use strict";

  const STORAGE_KEY = "portfolio-lang";
  let currentLang = localStorage.getItem(STORAGE_KEY) || "pl";

  function setLanguage(lang) {
    if (!window.I18N || !window.I18N[lang]) return;
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

  if (window.renderSkillGroups) window.renderSkillGroups();
  setLanguage(currentLang);

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".nav-toggle");
  const navPanel = document.querySelector(".nav-panel");

  if (toggle && navPanel) {
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
  }

  const grid = document.getElementById("gallery-grid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = lightbox && lightbox.querySelector(".lightbox-close");

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = "";
    if (lightboxCaption) {
      lightboxCaption.textContent = "";
      lightboxCaption.hidden = true;
    }
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  if (grid) {
    grid.addEventListener("click", (e) => {
      const item = e.target.closest(".gallery-item");
      if (!item) return;
      const img = item.querySelector("img");
      if (img) openLightbox(img.src);
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
  });

  const header = document.querySelector(".header");
  const progress = document.getElementById("scroll-progress");
  const navAnchors = document.querySelectorAll(".nav-links a[data-nav]");
  const sections = ["o-mnie", "projekty", "galeria", "kontakt"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function onScroll() {
    if (!header || !progress) return;
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
