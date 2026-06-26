# BAKIM RAPORU — Otomatik Çoklu-Ajan Çalışması

**Tarih:** 26 Haziran 2026
**Çalışma şekli:** 1 koordinatör (orchestrator) + her turda 3 paralel alt-ajan.
**Tur sayısı:** 3 tur (toplam 9 ajan görevi). Ardından koordinatör doğrulaması.
**Çakışma önleme:** Ajanlar yalnızca dosya düzenledi; **tüm `git commit` işlemlerini koordinatör yaptı** (paralel `index.lock` yarışını önlemek için). Her turda ajanlara **ayrık (disjoint) dosya kümeleri** verildi.

> **MUTLAK KURALLARA UYUM:** `git push` yapılmadı (yalnızca yerel commit). Sadece bu proje klasöründe çalışıldı. Yıkıcı komut (rm -rf, reset --hard, rebase, force) kullanılmadı. CLAUDE.md Bölüm 10 kararlarına uyuldu: lacivert+beyaz palet korundu, serif yalnız logoda, ağır JS / GSAP / Three.js eklenmedi, müvekkil yorumu / istatistik sayacı / aciliyet dili EKLENMEDİ. Header/footer 7 sayfada da senkron tutuldu. Her yeni metin iki dilli (data-lang-tr + data-lang-en) yazıldı — parite 7 sayfada da **tr=en** olarak doğrulandı.

---

## 1. Tur tur özet

| Tur | Ajan A | Ajan B | Ajan C |
|---|---|---|---|
| **1** | Erişilebilirlik düzeltmeleri (7 HTML) | robots.txt + sitemap.xml + denetimler (HTML'e dokunmadan) | CSS/JS sağlığı + perf raporu |
| **2** | Salt-okunur i18n & başlık denetimi (rapor) | OG/Twitter/canonical + JSON-LD (7 HTML head) | skip-link :focus + --success token |
| **3** | — | — | hero h1, akordeon ARIA, select dil deseni (X/Y/Z ajanları) |

---

## 2. Ajan A — Erişilebilirlik & HTML kalitesi (yapılan düzeltmeler)

**7 sayfanın tamamında (header/footer ortak — birebir senkron):**
- **Skip link** eklendi: iki dilli "İçeriğe geç / Skip to content", `href="#main-content"`. Görsel gizli (sr-only), klavye/ekran okuyucuya açık.
- Skip hedefi: ilk içerik bölümüne `id="main-content" tabindex="-1"`.
- **HTML geçerlilik:** footer logosundaki yinelenen `clipPath id="lmk"` → `id="lmk-f"` ile tekilleştirildi (sayfa başına benzersiz id).
- **Dil değiştirici ARIA:** `.lang-switch`'e `role="group"` + `aria-label`, butonlara `type="button"` + `aria-label="Türkçe"/"English"`.

**Form erişilebilirliği — `label`/`for`-`id` ilişkilendirme (18 kontrol):**
- `index.html` inline form: 5 kontrol (`cf-ad, cf-email, cf-telefon, cf-konu, cf-mesaj`).
- `iletisim.html` randevu formu: 6 kontrol (`il-*`).
- `marka-tescili.html` başvuru formu: 7 kontrol (`mt-*`).
- Artık `for`'suz `<label>` yok.

**3. tur yapısal düzeltmeler:**
- **KRİTİK — Hero çoklu `<h1>`:** Slider'da 4 ayrı `<h1>` vardı (tek-h1 / SEO ihlali). Slayt 1 `<h1>` kaldı; slayt 2–4 `<p class="hero-title">` yapıldı. CSS'te ilgili 6 seçici `.hero .hero-title`'ı da kapsayacak şekilde genişletildi → **görünüm birebir korundu**, sayfada tek h1.
- **Hero tab/tabpanel ARIA:** her slayda `role="tabpanel"` + `id="hero-slide-N"` + `aria-labelledby`; her noktaya (tab) `aria-controls`.
- **Akordeon ARIA** (`calisma-alanlari.html`, 8 öğe): butonlara `aria-expanded` + `aria-controls` + `id`; panellere `role="region"` + `id` + `aria-labelledby`. `main.js` akordeon kodu, aç/kapa'da `aria-expanded`'i senkronlar (genel kod olduğu için marka-tescili akordeonunu da olumlu etkiler).
- **`#cf-konu` select** birleşik "TR / EN" option'larından çift-eleman dil desenine (`data-lang-tr`/`data-lang-en`) çevrildi.

---

## 3. Ajan B — SEO, meta & tutarlılık (yapılanlar)

**Yeni dosyalar:**
- **`robots.txt`** — tüm botlara izin; `Sitemap:` satırı; kvkk Disallow edilmedi (zaten meta `noindex`).
- **`sitemap.xml`** — 6 indekslenebilir sayfa (kvkk hariç — noindex). Geçerli XML, `lastmod 2026-06-26`, öncelikler (ana sayfa 1.0, marka-tescili 0.9, …).

**7 sayfa `<head>` — sosyal & kanonik meta (önceden hiçbiri yoktu):**
- `<link rel="canonical">` (mutlak GitHub Pages URL'leri) — 7 sayfa.
- **Open Graph** (og:type, og:site_name, og:locale=tr_TR, og:url, og:title, og:description, og:image) ve **Twitter Card** (summary_large_image) — 6 indekslenen sayfada tam set; **kvkk minimal** (canonical + temel og, twitter/description yok, `noindex` korundu).
- `og:image`/`twitter:image` = `assets/hero-1.jpg` (mutlak URL).

**`index.html` JSON-LD (LegalService) iyileştirildi:**
- `telephone` → E.164 boşluksuz: `+905342428081`.
- Eklenen alanlar: `url`, `logo` (e5-icon-dark.svg), `image` (hero-1.jpg), `openingHours: "Mo-Fr 08:30-17:00"`.
- Mevcut alanlar (name, address, founder, areaServed, email) korundu; JSON geçerliliği doğrulandı.

**Denetimler (rapor):** title/description tüm sayfalarda zaten özgün ve mevcuttu. Header/footer/nav 7 sayfada tutarlı; kırık dahili `.html` linki bulunmadı.

---

## 4. Ajan C — CSS/JS sağlığı, performans & responsive (yapılanlar)

**`js/main.js`:**
- **Ölü kod temizlendi:** çalışmayan istatistik-sayaç bloğu (`.stat-num[data-target]` — istatistik bölümü zaten kaldırılmıştı) silindi.
- **`prefers-reduced-motion`:** hero slider otomatik geçişi artık reduced-motion'da durur (eskiden bu kontrol slider'da eksikti); manuel ok/nokta çalışmaya devam eder.
- **Null-guard'lar:** header scroll handler ve akordeon (`closest`/`querySelector` null kontrolleri) güvenli hale getirildi.
- Form başarı rengi sabiti `#1b7a45` → `var(--success)`.

**`css/style.css`:**
- **skip-link `:focus` görünürlüğü** eklendi (klavye odağında sol-üstte accent zeminli "atlama" bağlantısı belirir; mouse'ta gizli kalır). Inline sr-only stilini `!important` ile geçersiz kılar.
- `:root`'a `--success: #1b7a45` durum token'ı.
- Bölünmüş `.hero-ornament` kuralı tek blokta birleştirildi (render değişmedi).
- **Hex sızıntısı taraması:** palet dışı kaçak lacivert/accent hex'i **bulunmadı**. Kalan sabitler meşru (`#fff`=beyaz, `#25d366`=WhatsApp marka yeşili, rgba gölge/gradyanlar).

**Responsive (980px / 760px):** taşma/yatay-scroll/okunamazlık sorunu görülmedi; grid'ler tek kolona iniyor, nav 760px'te tam ekran overlay.

---

## 5. Atılan commit'ler (bu oturum — hepsi YEREL, push edilmedi)

| Hash | Mesaj (kısalt.) |
|---|---|
| `d392e2d` | Erişilebilirlik (Ajan A): skip-link, form label/for-id (18 kontrol), dil ARIA, clipPath id tekilleştirme — 7 sayfa |
| `f51cf53` | SEO (Ajan B): robots.txt + sitemap.xml |
| `4d48f5e` | CSS/JS (Ajan C): ölü sayaç kodu, reduced-motion, null-guard, .hero-ornament birleştirme |
| `d295db3` | SEO (Ajan B 2.tur): OG/Twitter/canonical 7 sayfa + JSON-LD url/logo/image/openingHours + E.164 |
| `3fcff28` | CSS/JS (Ajan C 2.tur): skip-link :focus + --success token |
| `497d0d6` | Erişilebilirlik (3.tur): hero tek h1 + tab/tabpanel ARIA + #cf-konu dil deseni |
| `82bb908` | Erişilebilirlik (3.tur): akordeon ARIA (8 öğe) + main.js aria-expanded senkronu |

> Bu rapor commit'i bunlara eklenir. **`git push` yapılmadı** — kullanıcı kendi terminalinden gönderecek.

---

## 6. Doğrulama sonuçları (koordinatör)

- **Yerel HTTP smoke test:** 7 sayfa + sitemap.xml + robots.txt + css + js → **hepsi 200**.
- **JS:** `node --check js/main.js` → temiz.
- **CSS:** süslü parantez dengesi 385/385.
- **JSON-LD:** `json.loads` ile geçerli.
- **sitemap.xml:** XML parse geçerli.
- **İki dillilik paritesi:** 7 sayfada `data-lang-tr == data-lang-en` (137/74/71/95/65/64/35).
- **index `<h1>` sayısı:** 1 (tek h1 kuralı sağlandı).

---

## 7. Yapılmayan / kullanıcı kararı gereken konular

1. **Sosyal medya linkleri** (footer LinkedIn + Instagram, 7 sayfada `href="#"`) — gerçek profil URL'leri Sinem/Kerem'den gelmeli. Uydurma link eklenmedi.
2. **`makaleler.html`'de 3 makale kartı `href="#"`** — gerçek makale içerikleri/sayfaları gelince hedeflenmeli (CLAUDE.md §5 "beklenenler" ile uyumlu).
3. **Görsel optimizasyonu (perf):** hero/about JPEG'leri (~1.1 MB toplam) **WebP/AVIF**'e çevrilirse %30–50 tasarruf olur; uygun araç/kalite riski nedeniyle yeniden kodlama YAPILMADI (yalnızca öneri). Ek olarak ilk slayt dışındaki hero arka planları açılışta yükleniyor — JS ile geç (lazy) yükleme mümkün ama "hafiflik" ilkesiyle dengelenmeli (karar kullanıcıda).
4. **OG kapak görseli:** şu an `hero-1.jpg` kullanılıyor; istenirse 1200×630 özel `assets/og-cover.jpg` üretilip tek satırda değiştirilebilir.
5. **Başlık seviye atlamaları (h2→h4):** birkaç sayfada kart/footer başlıkları doğrudan h4 (araya h3 girmeden). CSS etiket adına göre stillediğinden değişim görsel regresyon riski taşır → **bilinçli olarak dokunulmadı**, düşük öncelikli iyileştirme olarak bırakıldı.
6. **KVKK metni** — taslak; büro onayı bekliyor (`noindex` korunuyor).
7. **JSON-LD ek şemalar (öneri):** iletisim→ContactPage, makaleler→Blog, marka-tescili→Service, hakkinda→AboutPage/Person, BreadcrumbList. Uygulanmadı (öneri).
8. **CSS istatistik stilleri** (`.stats`, `.stat-num` vb.) ve `--bg-alt2` token'ı kullanılmıyor ama yazar "opsiyonel" diye işaretlediği için silinmedi (regresyon değil; temizlik isteğe bağlı).
9. **Tam WAI-ARIA tab deseni:** hero slaytlarında statik tab/tabpanel ilişkisi kuruldu; aktif olmayan panellerin `hidden`/`tabindex` ile dinamik yönetimi (main.js) ileri seviye iyileştirme olarak bırakıldı.

---

## 8. Önerilen sonraki adımlar

1. **Push:** `git push origin main` (kullanıcı terminalinden) → GitHub Pages otomatik yayınlar.
2. Sinem'den **sosyal medya URL'leri** + **portre fotoğrafı** gelince işle (CLAUDE.md §5).
3. **Görselleri WebP/AVIF**'e çevir (build adımı olmadan, elle veya tek seferlik araçla) — en yüksek perf kazancı burada.
4. Yayın sonrası **Google Rich Results Test** + **Lighthouse** ile JSON-LD ve erişilebilirlik skorunu doğrula.
5. Gerçek makale içerikleri gelince `makaleler.html` linklerini ve (istenirse) `BlogPosting` şemasını ekle.

---

*Bu rapor otomatik bakım oturumunun çıktısıdır. Tüm değişiklikler yerelde commit'lendi; yayın için push kullanıcı tarafından yapılacaktır.*
