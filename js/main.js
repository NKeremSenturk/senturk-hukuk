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

  /* ---------- 3b. Tema (açık / koyu) ----------
     İlk tema <head>'deki satır-içi script ile FOUC olmadan uygulanır;
     burada yalnızca değiştirme butonu ve kalıcılık yönetilir. */
  const THEME_KEY = "ssh-theme";
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    document.querySelectorAll(".theme-toggle").forEach((b) =>
      b.setAttribute("aria-pressed", t === "dark" ? "true" : "false")
    );
  }
  if (!document.documentElement.getAttribute("data-theme")) setTheme("light");
  document.querySelectorAll(".theme-toggle").forEach((b) =>
    b.addEventListener("click", () =>
      setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark")
    )
  );

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
          const oh = other.querySelector(".acc-head");
          if (oh) oh.setAttribute("aria-expanded", "false");
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        body.style.maxHeight = null;
        head.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
        head.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- 7. İletişim formu — Web3Forms + WhatsApp + mailto (Temmuz 2026) ----------
     GEÇİCİ iletişim hedefleri: kurumsal mail/telefon gelince TEK yerden güncellenecek
     (bkz. CLAUDE.md §11-A). Web3Forms anahtarı henüz yoksa mailto ile açılır, mesaj kaybolmaz. */
  const CONTACT = {
    email: "17ssenturk@gmail.com",
    whatsapp: "905342428081",
    // web3forms.com'dan 17ssenturk@gmail.com ile alınan ücretsiz anahtar buraya yapıştırılır:
    web3formsKey: "WEB3FORMS_ACCESS_KEY"
  };

  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    const isEN = () => document.documentElement.getAttribute("lang") === "en";
    const T = (tr, en) => (isEN() ? en : tr);

    // Bir alanın o anki dildeki görünür etiketini bulur (iki farklı etiket düzenini de destekler)
    function labelFor(el) {
      const suf = isEN() ? "en" : "tr";
      const labels = contactForm.querySelectorAll('label[for="' + el.id + '"]');
      for (const lb of labels) {
        if (lb.hasAttribute("data-lang-" + suf)) return lb.textContent.trim();
        const span = lb.querySelector("[data-lang-" + suf + "]");
        if (span) return span.textContent.trim();
      }
      if (labels[0]) return labels[0].textContent.trim();
      return el.name || el.id || "";
    }

    // Formu "Etiket: değer" satırlarına çevirir; ayrıca ad/e-posta yakalar
    function collect() {
      const lines = [];
      let name = "", email = "";
      contactForm.querySelectorAll("input, select, textarea").forEach((el) => {
        if (["hidden", "submit", "button", "checkbox"].indexOf(el.type) !== -1) return;
        let val;
        if (el.tagName === "SELECT") {
          const opt = el.options[el.selectedIndex];
          val = opt ? opt.textContent.trim() : (el.value || "").trim();
        } else {
          val = (el.value || "").trim();
        }
        if (!val) return;
        if (el.type === "email" && !email) email = val;
        if (!name && /^(ad|name)$/i.test(el.name || "")) name = val;
        lines.push(labelFor(el) + ": " + val);
      });
      return { name: name, email: email, text: lines.join("\n") };
    }

    function setStatus(msg, ok) {
      const s = contactForm.querySelector(".form-status");
      if (!s) return;
      s.textContent = msg;
      s.style.color = ok ? "var(--success)" : "var(--accent)";
    }

    // Zorunlu alan + KVKK onayı kontrolü (index formunda novalidate var → elle kontrol)
    function validate() {
      const need = contactForm.querySelectorAll("[required]");
      for (const el of need) {
        const empty = el.type === "checkbox" ? !el.checked : !(el.value || "").trim();
        if (empty) {
          setStatus(
            T("Lütfen zorunlu alanları doldurun ve KVKK onay kutusunu işaretleyin.",
              "Please fill in the required fields and tick the consent box."),
            false
          );
          if (el.focus) el.focus();
          return false;
        }
      }
      return true;
    }

    // WhatsApp'a hazır mesajla yönlendir
    function toWhatsApp() {
      if (!validate()) return;
      const data = collect();
      const intro = T("Merhaba, web sitesi üzerinden iletişime geçmek istiyorum.",
                      "Hello, I would like to get in touch via your website.");
      const url = "https://wa.me/" + CONTACT.whatsapp +
                  "?text=" + encodeURIComponent(intro + "\n\n" + data.text);
      window.open(url, "_blank", "noopener");
    }

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validate()) return;
      const data = collect();
      const subject = T("Web sitesi — Yeni iletişim talebi", "Website — New contact request");
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      // Anahtar henüz konmadıysa: mailto ile aç (mesaj kaybolmaz)
      if (!CONTACT.web3formsKey || CONTACT.web3formsKey === "WEB3FORMS_ACCESS_KEY") {
        window.location.href = "mailto:" + CONTACT.email +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(data.text);
        setStatus(
          T("E-posta uygulamanız hazır mesajla açıldı. Dilerseniz WhatsApp'tan da gönderebilirsiniz.",
            "Your email app opened with a prepared message. You can also send via WhatsApp."),
          true
        );
        return;
      }

      // Web3Forms'a gönder
      try {
        if (submitBtn) submitBtn.disabled = true;
        setStatus(T("Gönderiliyor…", "Sending…"), true);
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: CONTACT.web3formsKey,
            subject: subject,
            from_name: data.name || T("Web sitesi ziyaretçisi", "Website visitor"),
            email: data.email || CONTACT.email,
            message: data.text
          })
        });
        const out = await res.json();
        if (out.success) {
          setStatus(
            T("Teşekkürler. Mesajınız iletildi; en kısa sürede dönüş yapacağız.",
              "Thank you. Your message has been sent; we will get back to you shortly."),
            true
          );
          contactForm.reset();
        } else {
          throw new Error(out.message || "error");
        }
      } catch (err) {
        setStatus(
          T("Gönderim sırasında bir sorun oldu. WhatsApp ile veya doğrudan e-posta ile ulaşabilirsiniz.",
            "Something went wrong. Please reach us via WhatsApp or email directly."),
          false
        );
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });

    // WhatsApp butonu/butonları
    contactForm.querySelectorAll(".form-wa").forEach((b) =>
      b.addEventListener("click", toWhatsApp)
    );
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

  /* ---------- 12. Marka uygunluk sihirbazı (marka-tescili.html) ----------
     Bilgilendiricidir; hukuki görüş/garanti değildir (avukatlık reklam yasağı).
     Veri-güdümlü; dil değişince otomatik yeniden çizilir. */
  const wiz = document.querySelector("#mt-wizard");
  if (wiz) {
    const EN = () => document.documentElement.getAttribute("lang") === "en";
    const TURKPATENT = "https://www.turkpatent.gov.tr/arastirma-yap";
    const Q = [
      {
        tr: "Marka adınız, sattığınız ürün ya da hizmetin cinsini doğrudan anlatan genel bir kelime mi?",
        en: "Is your brand name a generic word that directly describes the product or service you sell?",
        opts: [
          { tr: "Hayır, özgün ve ayırt edici", en: "No, it is original and distinctive", s: 0 },
          { tr: "Kısmen", en: "Partly", s: 1 },
          { tr: "Evet, tanımlayıcı bir kelime", en: "Yes, it is descriptive", s: 2 }
        ]
      },
      {
        tr: "Aynı ya da benzer bir markanın tescilli olup olmadığını araştırdınız mı?",
        en: "Have you checked whether an identical or similar mark is already registered?",
        opts: [
          { tr: "Evet, benzerine rastlamadım", en: "Yes, and found nothing similar", s: 0 },
          { tr: "Hayır, henüz bakmadım", en: "No, not yet", s: 1 },
          { tr: "Benzer bir marka var gibi", en: "There seems to be a similar mark", s: 2 }
        ]
      },
      {
        tr: "Markayı hangi mal ve hizmet sınıflarında kullanacağınızı biliyor musunuz?",
        en: "Do you know in which goods and services classes you will use the mark?",
        opts: [
          { tr: "Evet, netleştirdim", en: "Yes, clearly", s: 0 },
          { tr: "Kısmen", en: "Partly", s: 1 },
          { tr: "Hayır, emin değilim", en: "No, not sure", s: 2 }
        ]
      },
      {
        tr: "Marka; bayrak, resmî amblem, coğrafi yer adı veya yanıltıcı bir ifade içeriyor mu?",
        en: "Does the mark include a flag, official emblem, geographical name or a misleading term?",
        opts: [
          { tr: "Hayır, içermiyor", en: "No, it does not", s: 0 },
          { tr: "Emin değilim", en: "I'm not sure", s: 1 },
          { tr: "Evet, içeriyor", en: "Yes, it does", s: 2 }
        ]
      },
      {
        tr: "Markayı ticari olarak kullanıyor ya da yakında kullanmayı planlıyor musunuz?",
        en: "Are you using the mark commercially, or planning to soon?",
        opts: [
          { tr: "Evet, kullanıyorum/planlıyorum", en: "Yes, I use it / plan to", s: 0 },
          { tr: "Henüz kararsızım", en: "Still undecided", s: 1 }
        ]
      }
    ];
    const OUT = [
      {
        max: 2,
        tr: { t: "Markanız tesciline uygun bir aday görünüyor.", d: "Yanıtlarınız olumlu. Yine de doğru sınıflandırma ve resmî sicilde ayrıntılı araştırma, başvurunun sağlıklı ilerlemesi için önemlidir." },
        en: { t: "Your brand looks like a good candidate for registration.", d: "Your answers are encouraging. Even so, correct classification and a detailed official search matter for a smooth application." }
      },
      {
        max: 5,
        tr: { t: "Genel olarak umut verici; birkaç nokta netleştirilmeli.", d: "Bazı başlıklarda belirsizlik var. Başvuru öncesi araştırma ve doğru sınıf seçimi, olası ret ve itiraz risklerini azaltır." },
        en: { t: "Promising overall — a few points need clarifying.", d: "Some areas are uncertain. Pre-filing research and correct class selection reduce the risk of refusal or opposition." }
      },
      {
        max: 99,
        tr: { t: "Başvuru öncesi uzman değerlendirmesi özellikle önemli.", d: "Yanıtlarınız, dikkat gerektiren noktalara işaret ediyor. Bir marka vekiliyle ön görüşme, sürecinizi güvenle planlamanıza yardımcı olur." },
        en: { t: "A professional assessment before filing is especially important.", d: "Your answers point to areas that need attention. A preliminary talk with a trademark attorney helps you plan the process with confidence." }
      }
    ];

    let i = 0;
    const ans = [];
    function render() {
      const en = EN();
      if (i < Q.length) {
        const q = Q[i];
        wiz.innerHTML =
          '<div class="wiz-progress">' + (en ? "Question " : "Soru ") + (i + 1) + " / " + Q.length + "</div>" +
          '<h3 class="wiz-q">' + (en ? q.en : q.tr) + "</h3>" +
          '<div class="wiz-opts">' +
          q.opts.map((o, k) => '<button type="button" class="wiz-opt" data-k="' + k + '">' + (en ? o.en : o.tr) + "</button>").join("") +
          "</div>" +
          (i > 0 ? '<button type="button" class="wiz-back">' + (en ? "← Back" : "← Geri") + "</button>" : "");
        wiz.querySelectorAll(".wiz-opt").forEach((b) =>
          b.addEventListener("click", () => { ans[i] = q.opts[+b.dataset.k].s; i++; render(); })
        );
        const bk = wiz.querySelector(".wiz-back");
        if (bk) bk.addEventListener("click", () => { i--; render(); });
      } else {
        const total = ans.reduce((a, b) => a + b, 0);
        const out = OUT.find((o) => total <= o.max);
        const c = en ? out.en : out.tr;
        wiz.innerHTML =
          '<div class="wiz-result">' +
          "<h3>" + c.t + "</h3><p>" + c.d + "</p>" +
          '<div class="wiz-actions">' +
          '<a class="btn btn-primary" href="#basvuru">' + (en ? "Get a detailed assessment" : "Detaylı değerlendirme alın") + "</a>" +
          '<a class="btn btn-outline" href="' + TURKPATENT + '" target="_blank" rel="noopener">' + (en ? "Search on TÜRKPATENT" : "TÜRKPATENT’te sorgula") + "</a>" +
          "</div>" +
          '<button type="button" class="wiz-restart">' + (en ? "Start over" : "Baştan başla") + "</button>" +
          '<p class="wiz-note">' + (en ? "This informational result is not legal advice." : "Bu bilgilendirici sonuç hukuki görüş niteliği taşımaz.") + "</p>" +
          "</div>";
        wiz.querySelector(".wiz-restart").addEventListener("click", () => { i = 0; ans.length = 0; render(); });
      }
    }
    render();
    // Dil değişince mevcut adımı yeni dilde yeniden çiz
    new MutationObserver(() => render()).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
})();
