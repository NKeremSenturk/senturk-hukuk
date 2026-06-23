/* ============================================================
   Av. Sinem Şentürk — Hukuk Bürosu  |  main.js
   Tüm etkileşimler: menü, dil, animasyon, sayaç, form
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. Yapışkan header ---------- */
  const header = document.querySelector(".header");
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

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

  /* ---------- 5. İstatistik sayaçları ---------- */
  const counters = document.querySelectorAll(".stat-num[data-target]");
  if (counters.length && "IntersectionObserver" in window) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      const dur = 1800;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.floor(eased * target);
        el.innerHTML = val.toLocaleString("tr-TR") + (suffix ? '<span class="suffix">' + suffix + "</span>" : "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => cio.observe(c));
  }

  /* ---------- 6. Akordeon ---------- */
  document.querySelectorAll(".acc-head").forEach((head) => {
    head.addEventListener("click", () => {
      const item = head.closest(".acc-item");
      const body = item.querySelector(".acc-body");
      const isOpen = item.classList.contains("open");
      // Tek seferde tek açık (isteğe bağlı: tümünü kapat)
      item.parentElement.querySelectorAll(".acc-item.open").forEach((other) => {
        if (other !== item) {
          other.classList.remove("open");
          other.querySelector(".acc-body").style.maxHeight = null;
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
        status.style.color = "#1b7a45";
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
      const INTERVAL = 6500;

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
      const start = () => { stop(); restartFill(); timer = setInterval(() => show(idx + 1), INTERVAL); };
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
})();
