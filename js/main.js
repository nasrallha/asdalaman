/* =========================================================
   Asad Al Amn — main script
   ========================================================= */

/* إعدادات سهلة التعديل — Easy-to-change settings */
const CONFIG = {
  whatsappNumber: "966558070567", // رقم واتساب الشركة بالصيغة الدولية بدون + أو أصفار
  defaultLang: "ar"
};

(function () {
  "use strict";

  const html = document.documentElement;
  const navbar = document.getElementById("navbar");
  const navMenu = document.getElementById("navMenu");
  const menuBtn = document.getElementById("menuToggle");
  const langBtn = document.getElementById("langToggle");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  let currentLang = CONFIG.defaultLang;

  /* ---------- Language ---------- */
  function t(key) {
    const dict = TRANSLATIONS[currentLang] || {};
    return dict[key] !== undefined ? dict[key] : (TRANSLATIONS.ar[key] || "");
  }

  function applyLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = CONFIG.defaultLang;
    currentLang = lang;

    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    // Reset any horizontal offset kept from the previous direction
    document.querySelectorAll(".hero, .hero-bg, .coverage, .service-img").forEach(function (el) { el.scrollLeft = 0; });
    window.scrollTo(0, window.scrollY);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const val = t(el.dataset.i18n);
      if (val) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.alt = t(el.dataset.i18nAlt);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });

    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));

    try { localStorage.setItem("asad-lang", lang); } catch (e) { /* storage unavailable */ }
  }

  function initialLanguage() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl && TRANSLATIONS[fromUrl]) return fromUrl;
    try {
      const saved = localStorage.getItem("asad-lang");
      if (saved && TRANSLATIONS[saved]) return saved;
    } catch (e) { /* ignore */ }
    return CONFIG.defaultLang;
  }

  langBtn.addEventListener("click", function () {
    applyLanguage(currentLang === "ar" ? "en" : "ar");
  });

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    navMenu.classList.toggle("open", open);
    menuBtn.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  }
  menuBtn.addEventListener("click", function () {
    setMenu(!navMenu.classList.contains("open"));
  });
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) setMenu(false);
  });

  /* ---------- Navbar style on scroll + back-to-top ---------- */
  const toTop = document.getElementById("toTop");
  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 30);
    toTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll spy: highlight current section ---------- */
  const sections = navLinks
    .map(function (l) { return document.querySelector(l.getAttribute("href")); })
    .filter(Boolean);

  function spy() {
    const offset = navbar.offsetHeight + 120;
    let current = sections[0];
    sections.forEach(function (sec) {
      if (sec.getBoundingClientRect().top - offset <= 0) current = sec;
    });
    // Reached bottom of page → last section
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    navLinks.forEach(function (l) {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current.id);
    });
  }
  window.addEventListener("scroll", spy, { passive: true });
  spy();

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- WhatsApp ---------- */
  function waLink(text) {
    return "https://wa.me/" + CONFIG.whatsappNumber + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  document.getElementById("waFab").href = waLink();

  const form = document.getElementById("contactForm");
  const formError = document.getElementById("formError");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const fName = document.getElementById("fName");
    const fPhone = document.getElementById("fPhone");
    const fService = document.getElementById("fService");
    const fMessage = document.getElementById("fMessage");
    const name = fName.value.trim();
    const phone = fPhone.value.trim();
    const service = fService.value.trim();
    const message = fMessage.value.trim();

    [fName, fPhone, fMessage].forEach(function (f) {
      f.classList.toggle("invalid", !f.value.trim());
    });
    if (!name || !phone || !message) {
      formError.hidden = false;
      return;
    }
    formError.hidden = true;

    const lines = [
      t("wa.intro"),
      t("wa.name") + ": " + name,
      t("wa.phone") + ": " + phone
    ];
    if (service) lines.push(t("wa.service") + ": " + service);
    lines.push(t("wa.message") + ": " + message);

    window.open(waLink(lines.join("\n")), "_blank", "noopener");
    form.reset();
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Start ---------- */
  applyLanguage(initialLanguage());
})();
