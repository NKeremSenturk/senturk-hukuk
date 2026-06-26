/* ============================================================
   Av. Sinem Şentürk — Hukuk Bürosu  |  main.js
   Tüm etkileşimler: menü, dil, animasyon, sayaç, form
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. Yapışkan header ---------- */
  const header = document.querySelector(".header");
  const onScroll = () => {
    if (header) {
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }

    const toTop = document.querySelector(".to-top");
    if (toTop) {
      if (window.scrollY > 600) toTop.classList.add("show");
      else toTop.classList.remove("show");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Mobil menü ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
    document.querySelectorAll(".nav-links a").forEach((a) =>
      a.addEventListener("click", () => document.body.classList.remove("nav-open"))
    );
  }

  /* ---------- 3. Dil değiştirme (TR / EN) ---------- */
  const STORAGE_KEY = "ssh-lang";
  function setLang(lang) {
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll(".lang-switch button").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === lang);
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    // Form placeholder / option metinlerini güncelle
    document.querySelectorAll("[data-ph-tr]").forEach((el) => {
      el.setAttribute("placeholder", lang === "en" ? el.dataset.phEn : el.dataset.phTr);
    });
    // Görsel alt metinlerini güncelle (iki dilli)
    document.querySelectorAll("img[data-alt-tr]").forEach((el) => {
      el.setAttribute("alt", lang === "en" ? el.dataset.altEn : el.dataset.altTr);
    });
  }
  document.querySelectorAll(".lang-switch button").forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });
  let saved = "tr";
  try { saved = localStorage.getItem(STORAGE_KEY) || "tr"; } catch (e) {}
  setLang(saved);

  /* ---------- 4. Scroll-reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 5. (Kaldırıldı) İstatistik sayaçları — Sinem talebiyle istatistik
     bölümü siteden çıkarıldı (CLAUDE.md §10.5); .stat-num[data-target] artık
     hiçbir sayfada yok, sayaç JS'i ölü koddu ve temizlendi. ---------- */

  /* ---------- 6. Akordeon ---------- */
  document.querySelectorAll(".acc-head").forEach((head) => {
    head.addEventListener("click", () => {
      const item = head.closest(".acc-item");
      if (!item) return;
      const body = item.querySelector(".acc-body");
      if (!body) return;
      const isOpen = item.classList.contains("open");
      // Tek seferde tek açık (isteğe bağlı: tümünü kapat)
      item.parentElement.querySelectorAll(".acc-item.open").forEach((other) => {
        if (other !== item) {
          other.classList.remove("open");
          const ob = other.querySelector(".acc-body");
          if (ob) ob.style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        body.style.maxHeight = null;
      } else {
        item.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });

  /* ---------- 7. İletişim formu (backend yok — mailto/uyarı) ---------- */
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      const lang = document.documentElement.getAttribute("lang");
      if (status) {
        status.textContent =
          lang === "en"
            ? "Thank you. This is a demo form — connect it to an email service or backend to receive messages."
            : "Teşekkürler. Bu bir demo formdur — mesaj alabilmek için bir e-posta servisine veya backend'e bağlanması gerekir.";
        status.style.color = "var(--success)";
      }
      form.reset();
    });
  }

  /* ---------- 8. Aktif menü bağlantısı ---------- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "index.html" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* ---------- 9. Yumuşak çapa kaydırma ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const t = document.querySelector(id);
        if (t) {
          e.preventDefault();
          window.scrollTo({ top: t.offsetTop - 80, behavior: "smooth" });
        }
      }
    });
  });

  /* ---------- 10. Yıl ---------- */
  document.querySelectorAll(".js-year").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- 11. Hero slider (saf CSS + kontrol) ---------- */
  const hero = document.querySelector(".hero");
  if (hero) {
    const slides = Array.prototype.slice.call(hero.querySelectorAll(".hero-slide"));
    const media = Array.prototype.slice.call(hero.querySelectorAll(".hero-media-slide"));
    const dots = Array.prototype.slice.call(hero.querySelectorAll(".hero-dot"));
    const prevBtn = hero.querySelector(".hero-arrow--prev");
    const nextBtn = hero.querySelector(".hero-arrow--next");
    if (slides.length > 1) {
      let idx = 0;
      let timer = null;
      const INTERVAL = 3500;
      // Hareketi azalt tercihine saygı: otomatik geçişi kapat (manuel ok/nokta çalışır)
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const show = (n) => {
        idx = (n + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle("is-active", i === idx));
        media.forEach((m, i) => m.classList.toggle("is-active", i === idx));
        dots.forEach((d, i) => {
          d.classList.toggle("is-active", i === idx);
          d.setAttribute("aria-selected", i === idx ? "true" : "false");
        });
      };
      // Aktif noktanın ilerleme çubuğunu sıfırdan başlat
      const restartFill = () => {
        const dot = dots[idx];
        const fill = dot && dot.querySelector(".hero-dot-fill");
        if (fill) { fill.style.animation = "none"; void fill.offsetWidth; fill.style.animation = ""; }
      };
      const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
      const start = () => { if (reduce) return; stop(); restartFill(); timer = setInterval(() => show(idx + 1), INTERVAL); };
      const go = (n) => { show(n); start(); };

      dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
      if (prevBtn) prevBtn.addEventListener("click", () => go(idx - 1));
      if (nextBtn) nextBtn.addEventListener("click", () => go(idx + 1));
      hero.addEventListener("mouseenter", stop);
      hero.addEventListener("mouseleave", start);
      document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

      start();
    }
  }

  // ----- Çerçeve slider (ana sayfa "Büromuz Hakkında": İstanbul & global akan görseller) -----
  document.querySelectorAll("[data-slider]").forEach((slider) => {
    const track = slider.querySelector(".frame-track");
    const slides = Array.prototype.slice.call(slider.querySelectorAll(".frame-slide"));
    const dotsWrap = slider.querySelector(".frame-dots");
    if (!track || slides.length < 2) return;

    const INTERVAL = parseInt(slider.dataset.sliderInterval, 10) || 5000;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let idx = 0;
    let timer = null;

    // Noktaları oluştur
    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Görsel " + (i + 1));
      b.addEventListener("click", () => go(i));
      if (dotsWrap) dotsWrap.appendChild(b);
      return b;
    });

    function show(n) {
      idx = (n + slides.length) % slides.length;
      track.style.transform = "translateX(" + (-idx * 100) + "%)";
      slides.forEach((s, i) => s.classList.toggle("is-active", i === idx));
      dots.forEach((d, i) => {
        d.classList.toggle("is-active", i === idx);
        d.setAttribute("aria-selected", i === idx ? "true" : "false");
      });
    }
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const start = () => { if (reduce) return; stop(); timer = setInterval(() => show(idx + 1), INTERVAL); };
    function go(n) { show(n); start(); }

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

    show(0);
    start();
  });
})();
