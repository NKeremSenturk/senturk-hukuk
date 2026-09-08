# CLAUDE.md — Proje Rehberi

Bu dosya, **Claude Code**, **Cowork** ve **Claude chat** için projenin tek referans noktasıdır.
Hangi ortamda çalışırsan çalış, önce bu dosyayı oku; proje yapısı, kurallar ve yapılacaklar burada.

---

## 1. Proje Nedir?

**Şentürk Marka ve Hukuk Bürosu** (EN: **Şentürk Law & IP**) — Av. & Marka Vekili Sinem Şentürk
ve kurucu ortağı Av. Yasin Emre Özbaş için hazırlanmış; çok sayfalı, iki dilli (TR/EN),
tamamen **statik** (HTML + CSS + JavaScript) bir hukuk bürosu tanıtım web sitesi.
Çerçeve (framework) yok, derleme (build) adımı yok. Dosyalar doğrudan sitenin kendisidir.

**Konumlandırma:** Fikri ve sınai haklar / marka tescili öne çıkar; ancak büro yabancılar, aile,
iş, ceza, gayrimenkul, icra-iflas ve sözleşmeler hukuku alanlarında da hizmet verir. SEO için
İstanbul (adres) ve Balıkesir vurgulanır; hizmet Türkiye geneli.

**Hosting:** GitHub Pages (ücretsiz). `main` dalına push → otomatik yayın.

---

## 2. Dosya Yapısı

```
.
├── index.html              # Ana sayfa (4 slaytlı hero slider, intro+Sinem imzası, görselli 6 alan kartı, marka şeridi, neden biz, makale önizleme, alıntı, inline iletişim formu) — istatistik YOK
├── hakkinda.html           # Hakkında (Sinem profili, eğitim, değerler, kurucu ortaklar/ekip)
├── calisma-alanlari.html   # Çalışma alanları (8 alan akordeon + marka tescili vurgusu)
├── marka-tescili.html      # Marka/tasarım/coğrafi işaret: aşamalar, alt hizmetler, bilgi notları, başvuru formu
├── makaleler.html          # Makaleler / blog (3 GERÇEK makale kartı — Temmuz 2026)
├── makale-marka-tescili-neden-onemlidir.html        # Makale 1 (Sinem'in metni, TR+EN)
├── makale-neden-marka-vekili-ile-calismalisiniz.html # Makale 2 (Sinem'in metni, TR+EN)
├── makale-cografi-isaret-ve-tasarim-tescili.html    # Makale 3 (Sinem'in metni, TR+EN)
├── iletisim.html           # İletişim (form + talep türü + bilgiler + Google Maps embed)
├── kvkk.html               # KVKK aydınlatma + gizlilik politikası (taslak; noindex)
├── css/
│   └── style.css           # TÜM stiller + tasarım sistemi (tek dosya)
├── js/
│   └── main.js             # TÜM etkileşimler (menü, dil, animasyon, form)
├── assets/                 # Görseller: team/ (portreler), alanlar/ (6 alan kartı JPG), about/ (slider), logo/, fonts/ + vCard & QR
├── gorsel-uretim/          # AI görsel üretim scriptleri (.bat + py) — .gitignore'da, repoya GİRMEZ
├── .github/workflows/
│   └── pages.yml           # GitHub Pages otomatik yayın
├── README.md               # GitHub vitrini + kurulum
├── BAKIM_RAPORU.md         # 26 Haz 2026 çoklu-ajan bakım turu raporu (arşiv)
├── SINEM-NOTLAR-ANALIZ-11-TEM-2026.md  # Sinem'in değişiklik dokümanının analizi (uygulandı, arşiv)
└── CLAUDE.md               # (bu dosya)
```

---

## 3. Tasarım Sistemi (css/style.css)

Tüm renk, font ve ölçüler dosyanın başındaki `:root` değişkenlerinde tanımlı. **Asla** sabit
renk kodu (#hex) gömme; mevcut değişkenleri kullan.

- **Palet (Haziran 2026 güncellemesi): Lacivert + Beyaz.** Altın ve bordo **kaldırıldı.**
  - `--navy-900..600` (lacivert ölçeği), `--accent` (çelik mavisi vurgu, `#2f6f9f`), `--white`,
    `--bg` (beyaz), `--bg-alt` (çok açık gri-mavi zemin).
  - **Geriye dönük takma adlar:** `--gold-*`, `--bordeaux`, `--cream` hâlâ tanımlı ama hepsi
    yeni lacivert/accent/beyaz değişkenlere işaret eder. Yeni kod yazarken `--accent`/`--navy-*`/`--bg*` kullan.
- **Fontlar (modern sans-serif):** `--font-display` = **Plus Jakarta Sans** (başlıklar),
  `--font-body` = **Inter** (metin). Playfair/Cormorant (serif) **kullanılmıyor.**
- **Butonlar:** `.btn-primary` (accent dolgu — açık zemin), `.btn-light` (beyaz dolgu — koyu zemin),
  `.btn-outline`, `.btn-dark`. Eski `.btn-gold` = `.btn-primary` ile aynı (alias).
- **Animasyon:** `.reveal` + `is-visible` (scroll ile belirme). Gecikme: `.reveal-delay-1..4`. Hero girişi saf CSS.
- **Bileşenler:** `.btn`, `.card`, `.section`, `.accordion`, `.team-card`, `.steps/.step`, `.chip`,
  `.info-card`, `.frame`, `.wa-float` — yeniden kullan.

---

## 4. İki Dil Sistemi (ÇOK ÖNEMLİ)

Site, JS sözlüğü yerine **çift eleman** yöntemiyle çalışır. Her metin iki kez yazılır:

```html
<h3 data-lang-tr>Aile Hukuku</h3>
<h3 data-lang-en>Family Law</h3>
```

- CSS, aktif dile göre birini gizler (`html[lang]` değerine bakar).
- `js/main.js` sadece `<html lang>` özniteliğini değiştirir ve seçimi `localStorage`'a kaydeder.
- **Kural:** Yeni metin eklerken DAİMA hem `data-lang-tr` hem `data-lang-en` versiyonunu ekle.
- Form alanları için: `data-ph-tr` / `data-ph-en` (placeholder) kullanılır.

---

## 5. Yer Tutucular (Sinem'in bilgi formu ile DOLDURULDU — Haziran 2026)

Form cevaplarıyla işlenenler (artık placeholder değil): büro adı, slogan, ad-unvan
(Av. & Marka Vekili Sinem Şentürk), eğitim (İstanbul Üniversitesi Hukuk Fakültesi),
marka vekilliği, biyografi, değerler, adres (Canan Business Plaza, Ataşehir/İstanbul),
telefon/WhatsApp (+90 534 242 80 81), e-posta (info@senturklawfirm.com), çalışma saatleri
(hafta içi 08:30–17:00), çalışma alanları (8 + marka tescili), kurucu ortak Av. Yasin Emre Özbaş.

**Logo / amblem (Haziran 2026 — üretildi, `assets/logo/`):** Sinem'in gönderdiği
`amblemsinem.jpeg` taslağından **E5** seçildi (bölünmüş küre + ortada wordmark).
Üretilen SVG'ler: `e5-{en,tr}-{light,dark}.svg` (ana logo), `e5-icon-{light,dark}.svg`
(favicon/WhatsApp/mobil), ayrıca alternatif yatay lockup `senturk-{en,tr}-{dark,light}.svg`
ve `icon-{dark,light}.svg` (E3). Wordmark fontu = Cormorant Garamond (serif); proje
sans kararına çekilmesi opsiyonu açık. `onizleme.html` tüm logoları gösterir.
> ⚠ **GÜNCEL DEĞİL (Eylül 2026):** Küre amblemi siteden tamamen kaldırıldı; marka artık
> yalnızca kelime markası (serif ŞENTÜRK + iki dilli alt satır). Bkz. **Bölüm 14, madde 1**.
> `assets/logo/` içindeki küreli SVG'ler envanterde duruyor ama sitede KULLANILMIYOR.

**SİTEYE GÖMÜLDÜ (Haziran 2026, Kerem tercihi = SERİF):** Tüm 7 sayfanın header
ve footer `.logo`'su artık **inline SVG ikon (beyaz, şeffaf bölünmüş küre + Ş) +
ŞENTÜRK wordmark (serif) + iki dilli alt satır** yatay kilidi. Wordmark fontu için
`:root`'a `--font-logo` (Cormorant Garamond) eklendi ve Google Fonts linkine
`Cormorant+Garamond` katıldı (7 sayfada). Favicon `assets/logo/e5-icon-dark.svg`.
Header'da dikey E5 yerine **ikon+wordmark** kullanıldı (slim header + mobil uyumu).
Serif yalnız logoda; gövde metni hâlâ sans (Plus Jakarta + Inter). Sans logo dosyaları
(`e5-*-sans.svg`) envanterde duruyor; font kararı değişirse `--font-logo` tek satırda döner.
> ⚠ **GÜNCEL DEĞİL (Eylül 2026):** `.logo-mark` (inline SVG küre+Ş) 10 sayfanın header ve
> footer'ından silindi, kelime markası büyütüldü. Favicon hâlâ `e5-icon-dark.svg`.
> Ayrıca alt satırın rengi accent-300 → **accent-200** oldu (kontrast, Bölüm 17).

**Portre fotoğrafları EKLENDİ (Haziran 2026, Kerem):** Sinem ve Yasin'in gerçek
portreleri geldi. Kaynaklar kök dizinde (`Sinem.jpg`, `Yasin.jpeg` — repoya GİRMEZ);
işlenmiş web sürümleri `assets/team/sinem.jpg` ve `assets/team/yasin.jpg` (siyah bant
kırpıldı, 4/5'e yakın portre, ~760px, ~60KB). **Eylül 2026 güncellemesi:** `yasin.jpg`
ham dosyanın tam çözünürlüğüne çıkarıldı — **1100×1374, ~112 KB** (bkz. Bölüm 16).
`sinem.jpg` 738×950 kalıyor (ham dosyası zaten 738 px genişlikte).) `hakkinda.html`'de: (a) Sinem spotlight
`.frame-placeholder` → gerçek `<img>`; (b) eski küçük avatarlı **"Kurucu Ortaklar"**
bölümü, solda Sinem / sağda Yasin, **büyük portre üstte + bilgi altta** olan 50/50
`.founders-grid`/`.founder-card` düzenine çevrildi (760px altında tek sütun, hover zoom).
Eski `.team-grid/.team-card/.team-photo` CSS'i kaldırıldı. Yasin'in adı (Kerem onayı) tam
hâliyle "Av. Yasin Emre Özbaş" korundu.

**Bilgi formu sonrası eksikler — durum arşivi (güncel bekleyenler Bölüm 12'de):**
<!-- DİKKAT: Bu bölümde bot anahtar ifadesini (Sinem + apostrof + den + beklenenler, bitişik)
     KULLANMA — WhatsApp hatırlatma botu (sinem-whatsapp-hatirlatma/mesaj-uret.js) dosyadaki
     İLK eşleşmeyi okur; doğru kaynak Bölüm 12'deki temiz listedir. -->
- ~~Kesin renk/stil tercihi~~ ✅ **TAMAMLANDI (5 Tem 2026):** Sinem "koyu şık lacivert-beyaz"
  paletini kesin onayladı; mevcut `:root` değerleri korunuyor, ince ayar gerekmedi.
- Sosyal medya `href="#"` (LinkedIn / Instagram) → gerçek bağlantılar. **(5 Tem 2026 notu:
  hesaplar `av.sinemsenturk@gmail.com` ile açılacak; giriş Kerem'in bilgisayarından yapılacak,
  doğrulama kodu Sinem'in mailine gelecek — Kerem+Sinem birlikte yapacak.)**
- ~~Gerçek makale metinleri~~ ✅ **İŞLENDİ (Temmuz 2026):** Sinem 3 makale gönderdi (Word);
  her biri kendi sayfasına kondu (`makale-*.html`, TR + EN çeviri, BlogPosting JSON-LD,
  sitemap'e eklendi). `makaleler.html` ve ana sayfa kartları bu sayfalara bağlanıyor;
  kalan 3 örnek kart ve "örnek başlıklardır" notları kaldırıldı. Ham `.docx`'ler `.gitignore`'da.
  Yeni makale geldiğinde: mevcut bir `makale-*.html` kopyalanır, içerik değiştirilir,
  `makaleler.html`'e kart + `sitemap.xml`'e URL eklenir.
- KVKK metni → ✅ **HAZIRLANDI (5 Tem 2026, Sinem'in talebiyle biz yazdık):** `kvkk.html`
  genişletildi ve yayında ("taslak" uyarısı kaldırıldı); kontrol kopyası
  `KVKK-Aydinlatma-Metni.docx` (repo dışı, kökte) Sinem'e iletilecek → **onayı bekleniyor**,
  düzeltme isterse ikinci tur yapılır.
- ~~Sinem'in el yazısı imzası (SVG)~~ ❌ **İPTAL (5 Tem 2026):** Sinem "gerek yok" dedi.
  İmza çizim animasyonu yapılmayacak; intro'daki mevcut metin imza (`.intro-signature`) kalıyor.

> **Soyadı notu:** "Şentürk" doğrulandı (form Q2). İstatistik bölümü Sinem'in talebiyle
> **kaldırıldı** (form Q29 = Hayır) — `data-target` sayaçları artık kullanılmıyor.

---

## 6. Sık Yapılacak İşler (Claude'a komut örnekleri)

- "İletişim bilgilerini şu gerçek bilgilerle güncelle: ..." → tüm sayfalardaki yer tutucular
- "Çalışma alanlarına 'KVKK ve Bilişim Hukuku' ekle" → calisma-alanlari.html akordeon + index.html kart
- "Makaleler sayfasına şu yeni yazıyı ekle" → makaleler.html'e yeni `.article-card`
- "Renk paletini biraz daha koyu/açık yap" → sadece css `:root` değişkenleri
- "Portre fotoğrafını ekledim, yerine koy" → ilgili `.frame` içine `<img src="assets/..." width height loading="lazy" decoding="async" alt="" data-alt-tr data-alt-en>`
  (Not: `.frame-placeholder` sınıfı Eylül 2026'da kaldırıldı — sitede yer tutucu kutu kalmadı.)

---

## 7. Kurallar / Konvansiyonlar

1. **Tek CSS, tek JS dosyası** — yeni dosya açma, mevcutları genişlet.
2. **Header ve footer her sayfada aynıdır.** Birinde değişiklik yaparsan **10 sayfada da** uygula
   (index, hakkinda, calisma-alanlari, marka-tescili, makaleler, iletisim, kvkk + 3 makale-*.html).
   Header nav 6 öğelidir.
   Her sayfada `.wa-float` (WhatsApp) + `.to-top` butonları bulunur.
3. Her yeni metin **iki dilli** olmalı (Bölüm 4).
4. İnline SVG ikonlar kullanılıyor (harici ikon kütüphanesi yok).
5. Erişilebilirlik: `aria-label`, anlamlı `alt` metinleri, yeterli kontrast korunmalı.
6. Mobil öncelikli düşün; `css` içinde 980px ve 760px kırılımları var.

---

## 8. Yerel Önizleme

```bash
# Proje klasöründe:
python -m http.server 8000
# Tarayıcı: http://localhost:8000
```

---

## 9. Yayına Alma

`main` dalına push yeterli — `.github/workflows/pages.yml` otomatik yayınlar.
İlk kurulum ve GitHub bağlantısı için **README.md → "Kurulum"** bölümüne bak.

**Repo:** https://github.com/NKeremSenturk/senturk-hukuk.git (origin/main)

> **Push yalnızca kullanıcının kendi terminalinden yapılır.** GitHub kimlik bilgileri
> (credential) kullanıcının makinesindedir; Cowork/sandbox ortamından push edilemez.
> Commit hazırlanabilir, ancak gönderimi (`git push`) kullanıcı terminalden yapar.

> **Stale lock uyarısı:** Bir git işlemi yarıda kesilirse `.git/index.lock` kalıp
> "another git process is running" hatası verebilir. Çözüm: kilidi sil
> (PowerShell: `del .git\index.lock`), sonra işlemi tekrarla.

---

## 10. Alınan Kararlar (Haziran 2026 — proje sohbeti)

Bu kararlar bağlayıcıdır; aksini kullanıcı açıkça istemedikçe uyulur.

1. **Hafiflik önceliği (değişmez ilke).** Siteye ağır JavaScript kütüphanesi eklenmez.
   - **GSAP kullanılmıyor** (saf CSS easing karşılıkları `:root`'ta tanımlı).
   - **Three.js denendi ve bilinçli olarak reddedildi** (~150KB+ gzip + sürekli WebGL
     render maliyeti; "hızlı açılma" ilkesiyle çelişiyor).
   - Tüm animasyonlar **saf CSS** ile yapılır.

2. **Hero terazisi SADE kalır.** Av. Sinem sade terazi görselini tercih etti.
   `index.html`'deki hero `.hero-ornament` SVG'si olduğu gibi bırakılır; 3B / gösterişli /
   scroll-etkileşimli (WebGL/particle) versiyon **yapılmayacak**.
   - **GÜNCELLEME (Haziran 2026, Kerem talebiyle):** Hero artık **4 slaytlı, saf-CSS
     fade geçişli bir slider** (mesaj rotasyonu: Marka → Fikri-Sınai → Yabancılar →
     Genel danışmanlık). Bu, "sade kalır" kararıyla çelişmez: ağır JS yok (sadece birkaç
     satır kontrol JS'i), otomatik geçiş hover'da durur ve `prefers-reduced-motion`'da kapanır.
     `.hero-slide` / `.hero-dots` sınıfları + `main.js` §11. Terazi `.hero-ornament` korundu.

3. **Bilgi toplama formu.** Proje kökündeki `Sinem-Bilgi-Formu.xlsx`, Sinem'den bilgi ve
   tercih toplamak içindir (büro adı, iletişim, çalışma alanları, istatistik sayıları,
   ön yüz renk/stil tercihleri vb.). Sinem doldurup gönderince, **Bölüm 5'teki yer
   tutucular** bu cevaplarla doldurulur. Dosya `.gitignore`'da — **yayına/repoya girmez.**

4. **Ajan notu.** Bir ajana (subagent) iş verirken yarıda **Esc** ile kesmek, dosya
   yazımını yarıda bırakıp bozabilir. Kesilirse `git status` ve dosya sonunu kontrol et;
   gerekiyorsa `git restore <dosya>` ile son sağlam sürüme dön.

5. **Sinem'in bilgi formu işlendi (Haziran 2026).** Form cevaplarına göre alınan kararlar:
   - **Palet lacivert + beyaz** oldu; **altın ve bordo kaldırıldı** (Sinem: sade, şık, göz yormayan;
     lacivert = ciddiyet/profesyonellik, beyaz = güven/şeffaflık). Stil: **modern & sade**, his:
     güvenilir/ciddi/şeffaf. Kesin renk/logo Sinem'den gelince `:root` ince ayarı yapılacak.
   - **Yazı tipi modern sans-serif** (Plus Jakarta Sans + Inter); serif kaldırıldı.
   - **İstatistik bölümü kaldırıldı** (form Q29 = Hayır).
   - **Marka tescili ayrı sayfa** (`marka-tescili.html`): aşamalar, alt hizmetler, "Marka nedir?" bilgi
     notları, marka/tasarım/coğrafi işaret başvuru formu. İlham: mukellef.co/tr/marka-tescil.
   - **Kurucu ortak Av. Yasin Emre Özbaş** eklendi (hakkinda.html ekip bölümü + footer imza).
   - **SEO:** İstanbul (adres) + Balıkesir vurgusu; index.html'de LegalService JSON-LD.
   - **WhatsApp** yüzen butonu tüm sayfalarda (`wa.me/905342428081`).
   - **Marka önde ama tek alan değil:** fikri-sınai/marka öne çıkar; diğer 7 alan da görünür.

6. **Marka kimliği.** Görünen ad: TR "Şentürk Marka ve Hukuk Bürosu" / EN "Şentürk Law & IP".
   Logo alt yazısı: TR "Marka & Hukuk Bürosu" / EN "Law & IP". İmza: "Av. & Marka Vekili Sinem Şentürk
   • Av. Yasin Emre Özbaş". Baro bilgisi **gösterilmiyor** (form: gerek yok).

7. **Ana sayfa geliştirmeleri (Haziran 2026 — zenlawpartners.com kıyaslaması sonrası).**
   Referans site bölüm bölüm incelendi; öneriler "ekle değil kıyasla" gözüyle süzüldü.
   Eklenenler: (a) 4 slaytlı hero slider (bkz. karar #2 güncellemesi); (b) ana sayfada
   **makale önizleme** bölümü (makaleler.html'den 3 kart + "Tüm Makaleler"); (c) ana sayfada
   **inline iletişim formu** (`#iletisim`: Ad, E-posta, Telefon, Konu select, Mesaj — eski
   `cta-band` bununla **değiştirildi**); (d) intro'da **Sinem imzalı** kısa misyon dokunuşu
   (`.intro-signature`).
   - **Bilinçli olarak EKLENMEDİ (avukatlık reklam yasağı / TBB meslek kuralları gereği):**
     müvekkil yorumları/testimonials, başarı oranı/istatistik sayaçları, "ücretsiz değerlendirme",
     "X dakikada dönüş" gibi aciliyet/pazarlama dili. Dil ölçülü ve kurumsal tutulur.

---

## 11. Temmuz 2026 — "İmza hareketi" / altyapı geliştirme kararları (Kerem sohbeti)

Bu kararlar bağlayıcıdır. Kerem tek tek onayladı; sıra ve gerekçeler aşağıda.

**A. İletişim formu artık gerçekten çalışacak (EN YÜKSEK ÖNCELİK — "kanayan yara").**
   - Şu an 3 form da (`index.html`, `iletisim.html`, `marka-tescili.html`) demo; mesaj yok oluyor
     (`js/main.js` §7). Düzeltilecek.
   - **Kanal 1 — WhatsApp/e-posta derin bağlantısı:** form içeriği düzenli metne dönüşüp
     `wa.me/905342428081`'e ve/veya `mailto:`'ya hazır açılır (backendsiz, %100 çalışır).
   - **Kanal 2 — Ücretsiz form servisi (Web3Forms/Formspree):** mesaj gerçek bir gelen kutusuna
     düşer + KVKK onay kutusu eklenir.
   - ⚠️ **GEÇİCİ ADRES NOTU (sonra değişecek):** Sinem'in henüz kurumsal maili YOK. Form ve
     tüm bağlantılar **şimdilik kişisel adrese** gider: **e-posta `17ssenturk@gmail.com`**,
     **telefon/WhatsApp `+90 534 242 80 81` (905342428081)**. Kurumsal mail + kurumsal telefon
     alınınca bu iki değer TEK yerden güncellenecek (mümkünse bir sabit/`:root` benzeri tek kaynak).

**B. Gizli, çerezsiz analytics eklenecek (Kerem: "işin hacmini ölçmek istiyoruz").**
   - Ekranda GÖSTERİLMEZ (istatistik yasağı + Sinem tercihi korunur). Sadece büro görür.
   - Öneri: **Cloudflare Web Analytics** (bedava, çerezsiz, cookie-banner gerektirmez, GitHub
     Pages uyumlu) veya GoatCounter. Tek `<script>` satırı, 7 sayfaya eklenir.

**C. Fontlar kendine host edilecek ("yazılımcı imzası" — Lighthouse 100 hedefi).**
   - KVKK gerekçesi doğrulandı (Temmuz 2026 araştırma): TR'de IP kişisel veri; Google Fonts =
     yurt dışına aktarım. TR'de Almanya gibi emsal dava yok + Google'ın KVKK aktarım izni var,
     yani risk düşük AMA host etmek bedava + siteyi hızlandırıyor → tartışmayı sıfırlar. Karar: HOST ET.
   - Plus Jakarta Sans + Inter + Cormorant Garamond (logo) `assets/fonts/`'a indirilecek,
     `@font-face` ile tanımlanacak, `index.html:21-23` Google Fonts `<link>`'leri kaldırılacak (7 sayfada).

**D. vCard + QR "Kişilerime Ekle" (iletişim sayfası) — imza hareketine yakın pratik özellik.**
   - `.vcf` indirme + önceden üretilmiş QR (SVG). Şimdilik mevcut numara `905342428081` ve
     `17ssenturk@gmail.com` ile; kurumsal bilgiler gelince güncellenecek (bkz. A notu).

**E. "Markanız tescile uygun mu?" 5 soruluk mini sihirbaz (saf JS) + TÜRKPATENT sorgu bağlantısı.**
   - `marka-tescili.html`'e; söz/garanti vermeden bilgilendirici, sonunda iletişime yönlendirir
     (avukatlık reklam yasağına dikkat: vaat YOK).

**F. Zarif karanlık mod.** Lacivert palet uygun; dil geçişi gibi `localStorage` ile hatırlanır, ağırlıksız.

**G. ~~İmza hareketinin kalbi — el yazısı imza animasyonu~~ ❌ İPTAL (5 Tem 2026):**
   Sinem gerek görmedi; yapılmayacak.

### Uygulama durumu (Temmuz 2026 — tarayıcıda test edildi)

- **A. Form ✅ ÇALIŞIYOR.** `js/main.js` §7 forma-bağımsız handler (etiket okur, 3 formun farklı
  alan adlarına rağmen çalışır). Her formda KVKK onay kutusu + "WhatsApp'tan Gönder" butonu
  (`iletisim/index/marka-tescili`). Anahtar yoksa mailto ile açılır (mesaj kaybolmaz).
  → **BEKLEYEN (Kerem):** web3forms.com'dan `17ssenturk@gmail.com` ile Access Key al →
  `main.js` `CONTACT.web3formsKey` satırına yapıştır. `CONTACT` = tek kaynak (mail+telefon).
- **C. Fontlar ✅ HOST EDİLDİ.** `assets/fonts/` içinde 6 variable woff2 (latin+latin-ext, 247KB).
  `style.css` başında `@font-face`. 7 HTML'den Google Fonts `<link>`'leri kaldırıldı. Türkçe tam.
- **D. vCard + QR ✅.** `assets/sinem-senturk.vcf` + `assets/qr-site.svg` (segno, lacivert).
  `iletisim.html`'de "Kişilerime Ekle" + QR bloğu. QR site URL'ini kodlar (github.io — domain
  değişince yeniden üret).
- **E. Marka sihirbazı ✅.** `marka-tescili.html` #on-degerlendirme, `main.js` §12 (veri-güdümlü,
  5 soru, dil değişince yeniden çizer). TÜRKPATENT linki + #basvuru CTA. Reklam yasağına uygun (vaat yok).
- **F. Karanlık mod ✅.** `data-theme="dark"`, header'da tema butonu (7 sayfa), `<head>`'de
  FOUC-önleyen satır-içi script, `localStorage 'ssh-theme'`. Yeni semantik token `--surface`
  (yüzeyler); dark'ta başlıklar/metin aydınlatılır, navy-900 zeminler koyu kalır.
- **B. Analytics ⏳ PLACEHOLDER.** 7 sayfada `</body>` öncesi Cloudflare Web Analytics snippet'i
  **yorum içinde** (konsol hatası yok). → **BEKLEYEN (Kerem):** dash.cloudflare.com → Web Analytics
  → token al → snippet'e yapıştır + yorum işaretlerini kaldır.

**Ayrıca gözden geçirilecek:** İletişim sayfasında **görünen** e-posta hâlâ `info@senturklawfirm.com`
(vCard'da da bu). Bu kutu aktif değilse gelen mail'ler kaybolur — Sinem bu adresi açacak mı, yoksa
şimdilik `17ssenturk@gmail.com` mı gösterilsin, karara bağlı.

---

## 12. Sinem'in 5 Temmuz 2026 güncellemeleri (WhatsApp) — durum listesi

Sinem'den gelen kararlar ve hatırlatmalar; her maddenin durumu işaretli.

**Yapıldı (5 Tem 2026):**
1. ✅ **Hakkımızda kurucu ortaklar ALT ALTA.** Sinem: yan yana 50/50 düzen "çiftmişiz gibi
   anlaşılıyor" → her kurucu tam genişlik satır (foto solda ~300px, bilgi sağda; Sinem üstte,
   Yasin altta; 760px altında foto üste geçer). CSS: `.founders-grid`/`.founder-card`.
2. ✅ **KVKK metni** hazırlandı, sitede yayında + Word kontrol kopyası (bkz. Bölüm 5).
3. ✅ Renk/stil kesinleşti, imza SVG iptal (bkz. Bölüm 5).

**Sinem'den beklenenler (WhatsApp hatırlatma botu BU listeyi okur — temiz tut!):**
- Ana sayfadaki "Av. & Marka Vekili Sinem Şentürk" imza satırı kalsın mı? (Kerem sordu, cevap bekleniyor)
- Yeni telefon hattı bilgisi
- Domain ve kurumsal e-posta bilgisi
- Bu haftaki 3 makale: Türk vatandaşlığı, anlaşmalı boşanma, telif hakları
- KVKK metninin kontrolü (Word dosyası Kerem'de, iletilecek)
- Çalışma alanları listesinin gözden geçirilmesi (ekleme olacak mı?)

**Kerem'den beklenenler (WhatsApp hatırlatma botu BU listeyi de okur — temiz tut!):**
- Web3Forms anahtarını alıp iletişim formuna bağlamak (mesajlar e-postaya düşecek)
- Cloudflare Analytics kurulumu (gizli ziyaretçi sayacı)
- KVKK Word dosyasını Sinem'e iletmek
- Sosyal medya hesap açılışı (Sinem'le birlikte, doğrulama kodu adımı)

**Yeni eklenenler (bot okur — Sinem'e vitrin; en fazla ~6 madde tut, eskiyenleri sil):**
- Notlar dokümanındaki TÜM metin değişiklikleri işlendi (hero, ana sayfa, çalışma alanları, yazım düzeltmeleri)
- Yasin'in tanıtım yazısı Hakkımızda sayfasında (İngilizce çevirisiyle)
- Yeni yasal adres (No:4/20) sitede ve kartvizit dosyasında güncellendi
- "Hakkında" her yerde "Hakkımızda" oldu
- "Neden Biz" bölümüne Ulaşılabilirlik (İstanbul & Balıkesir, Türkiye geneli) eklendi
- 6 çalışma alanı görseli üretildi ve ana sayfa kartlarına eklendi (onayladığın açık stil; koyu temada otomatik karartma)

> **Bot sözleşmesi:** `sinem-whatsapp-hatirlatma/mesaj-uret.js`, `config.json`'daki üç anahtar
> ifadeyi ("Sinem'den beklenenler", "Kerem'den beklenenler", "Yeni eklenenler") CLAUDE.md'de
> arar; her biri için İLK eşleşen satırdan sonraki `- ` maddelerini ilk boş satıra kadar okur ve
> hafta içi 10:00'da tek gruplu WhatsApp mesajına çevirir. **Biten maddeyi listeden SİL**
> (üstünü çizme; bot ✅/❌/⏳/~~ içeren maddeleri atlar ama listeler temiz kalsın). Boş kalan grup
> mesaja girmez. Maddeler insan-okur olmalı; teknik detaylar aşağıdaki bölümde. Bu anahtar
> ifadeleri CLAUDE.md'nin daha üst kısımlarında KULLANMA (ilk eşleşme kazanır).

**Teknik bekleyenler — geldiğinde ne güncellenecek (Claude için):**
4. ✅ **Yasin tanıtım yazısı İŞLENDİ (11 Tem 2026):** "WEB SAYFAM İÇİN NOTLARIM.docx" ile geldi;
   `hakkinda.html` founder kartına 3 paragraf TR+EN eklendi.
5. ✅ **"Genel değişiklikler" dosyası GELDİ ve İŞLENDİ (11 Tem 2026):** "WEB SAYFAM İÇİN
   NOTLARIM.docx" (kökte, .gitignore'da). Tüm metin/yazım değişiklikleri uygulandı; analiz
   `SINEM-NOTLAR-ANALIZ-11-TEM-2026.md`. ⚠️ İmza adı satırı (`.intro-signature-name`) Sinem'in
   cevabına göre kalacak/kaldırılacak (alıntı cümlesi kaldırıldı).
6. ✅ **Adres güncellendi (11 Tem 2026):** "Küçükbakkalköy Mahallesi Selvili Sokak No:4/20,
   Ataşehir/İstanbul" — index (JSON-LD+footer), iletisim, kvkk, vCard. Harita embed'i bina
   düzeyinde (No:4) bırakıldı, geocoding bozulmasın diye.
7. ⏳ **Yeni telefon hattı** — gelince: `main.js CONTACT` + görünen tüm tel/wa.me linkleri
   (10 sayfa), vCard, QR, JSON-LD, KVKK.
8. ⏳ **Domain + kurumsal e-posta** — alınınca: canonical/OG/sitemap/robots URL'leri,
   QR yeniden üret, vCard, form mailto, footer e-postaları, `main.js CONTACT`.
9. ⏳ **Çalışma alanları gözden geçirme** — ekleme olabilir (akordeon + index kartı + footer).
10. ⏳ **LOGO DEĞİŞECEK — HATIRLATMA:** bu konuda daha önce ilerlenen bir çalışma vardı
    (`assets/logo/` envanteri + amblemsinem.jpeg süreci). Zamanı gelince Kerem'le tekrar
    konuşulacak; şimdilik dokunma.
11. ⏳ **3 yeni makale bu hafta:** Türk vatandaşlığının kazanılması · Anlaşmalı boşanma süreci ·
    Telif hakları ve eser sahibinin korunması. (Not: bunlar Temmuz'da kaldırılan 3 örnek kartın
    konuları — geldiklerinde mevcut `makale-*.html` şablonuyla eklenir, kartlar geri gelir.)
12. ✅ **Hukuk alanlarına görseller TAMAM (13 Tem 2026):** 6 görsel üretildi (A1111,
    `gorsel-uretim/` scriptleri; yabancilar+gayrimenkul 2. turda, ceza+is-sosyal 3. turda
    konuya özel yenilendi: tokmak+flu mahkeme kürsüsü, lacivert baret — Kerem talebi).
    Optimize JPG'ler repoda: `assets/alanlar/alan-<slug>.jpg` (880x636, 58-84KB; ham PNG'ler
    .gitignore'da). **index.html 6 alan kartına `.card-media` ile entegre edildi**; CSS'te
    `.card-media` stilleri (hover zoom, `prefers-reduced-motion` saygısı, koyu temada
    `brightness(0.78)` filtresi — ayrı koyu set YOK). Alt metinler iki dilli (`data-alt-tr/en`,
    main.js çeviriyor). NOT: `calisma-alanlari.html` akordeonuna görsel EKLENMEDİ (bilinçli;
    istenirse aynı JPG'ler kullanılır). Yabancilar görselindeki küçük yapay pasaport yazısı
    kabul edildi; rahatsız ederse tek başına yeniden üretilebilir.
13. ✅ **11 Tem 2026 sohbet kararları:** "Hakkımızda" nav 10 sayfada güncellendi; "sicilli" →
    "sicile kayıtlı" (index hero-trust, marka-tescili meta+gövde, hakkinda bio) her yerde düzeltildi.

## 13. Eylül 2026 — Sinem'in banner/görsel/metin istekleri (UYGULANDI, yayın onayı bekliyor)

Kaynak: `Sinem İstekler/` (e-posta ekleri; zip'ler + `_acilan/` + `_secenekler/` gitignore'da).
Rapor: `DEGISIKLIK-RAPORU-01-EYL-2026.md` · Geri dönüş: `GERI-DONUS-PLANI.md` · Öncesi kopya: `_yedek/2026-09-01-oncesi/`.

**Fotoğraflı sayfa başlığı sistemi (`.page-hero--photo`, CSS Bölüm 16b):**
- Yapı: `<section class="page-hero page-hero--photo" style="--hero-pos: X% Y%">` → `<div class="hero-bg"><img class="hero-photo" src=".../hero-<ad>-1600.jpg" srcset="...-960.jpg 960w, ...-1600.jpg 1600w" sizes="100vw" width height alt="" fetchpriority="high" decoding="async"></div>`; `<head>`'de `<link rel="preload" as="image" imagesrcset imagesizes>`.
- Görseller `assets/hero/hero-{hakkimizda,calisma-alanlari,marka-tescili,makaleler,iletisim}-{1600,960}.jpg` (Sinem'in YAZISIZ banner'larından, 60-140 KB). 8 sayfada kullanılıyor: 5 ana iç sayfa + 3 `makale-*.html` (Makaleler görseli). `kvkk.html` bilinçli olarak düz gradyan.
- Metin HTML'de kalır (iki dil/SEO/erişilebilirlik); overlay `::after` lacivert gradyan
  (⚠ overlay yoğunluğu **Bölüm 17**'de ölçülerek açıldı — oradaki değerler geçerlidir). **YAZILI banner sürümleri asla kullanılmaz** (çevrilemez, h1 kaybolur, "vekilli.iiğiyle" render hatası, altın+serif palet sapması).
- Yeni sayfaya fotoğraf eklemek = yukarıdaki 3 satır; kaldırmak = sınıfı ve img/preload satırlarını silmek.

**Alan kartları (`assets/alanlar/`):** aile, yabancilar, fikri-sinai görselleri yenilendi (880×636, parlaklık/kontrast ton düzeltmeli). **KURAL: sitede kullanılan hiçbir görselde kurum/marka logosu, resmî belge görüntüsü veya belge numarası bulunmaz** — yapay üretim görsellerde bu tür öğeler çıkarılır (fikri-sinai görselinde uygulandı). Gerekçe ve kullanılmayan sürümler repo dışındaki iç raporda. Alt metinler (`data-alt-tr/en`) yenilendi.

**Metin:** `makaleler.html` h1 "Makaleler"/"Articles" + yeni lead (TR Sinem'in, EN bizim); `iletisim.html` yeni lead (TR Sinem'in, EN bizim). Sinem'in onayı bekleniyor (`SINEM-SORULAR-01-EYL-2026.md`, 8 madde).

**Yapılmayanlar (bilinçli):** İletişim'e "Bizimle İletişime Geçin" ara satırı; ana sayfa makaleler bölüm başlığı; akordeona görsel; KVKK'ya fotoğraf. Gerekçeler raporda.

**Yayın akışı:** Kerem `git-etiketle-ve-commit.cmd` ile `v1.0-eylul-oncesi` etiketi + tek commit + isteğe bağlı push. Geri alma: `git revert HEAD`.

## 14. Eylül 2026 (2. tur) — Sinem'in "YENİ DÜZELTİLECEKLER" listesi (UYGULANDI)

Kaynak: `Sinem İstekler/web sitesi YENİ DÜZELTİLECEKLER.docx` (6 madde + ekran görüntüleri).
Öncesi kopya: `_yedek/2026-09-07-oncesi/` (GIT-HEAD `2da997a`).

**1) Logo — küre + Ş amblemi kaldırıldı.** `.logo-mark` SVG'si 10 sayfanın hem header hem
footer'ından silindi (20 blok). Kelime markası büyütüldü ve sola dayandı:
`.logo-name` header `clamp(1.85rem, 2.3vw, 2.15rem)` / footer `2.3rem`, `.logo-sub` `0.66rem`
+ `white-space: nowrap`. Mobilde (≤760px) bir tık küçültülür.
**KURAL: sitede küre/amblem yok — marka yalnızca kelime markasıdır (serif ŞENTÜRK + alt satır).**
Sinem'in gönderdiği "küreli" referans denenmedi; kendi ifadesiyle "küre içindeki Ş kesinlikle kalksın".

**2) Footer alt barı.** İsimler `&nbsp;` ile yapıştırıldığı için dar ekranda kırpılıyordu
(Sinem: "Yasin Emre Özbaş'ta Ş eksik kalmış" — aslında taşma). Ayırıcılar `<span class="fb-dot">`
oldu, `.footer-bottom > span { min-width:0; overflow-wrap:break-word }` eklendi. 390px'te sarıyor,
1024px+'ta tek satır.

**3) Hakkımızda başlığı.** `Av. & Marka Vekili<br />Sinem Şentürk` (TR ve EN aynı düzende) —
"Şentürk" tek başına alt satıra kaymıyor.

**4) "Mesleki birikim" bölümü kaldırıldı** (hakkinda.html, EĞİTİM & UNVAN section'ı komple).
`.credential*` CSS'i geride bırakıldı (geri istenirse hazır, kullanılmıyor).

**5) Kurucu ortaklar kartı — foto metnin üstüne biniyordu.** Sebep: `.founder-photo` hem
`aspect-ratio: 4/5` hem `height: 100%` alıyordu; Yasin'in uzun biyografisi kartı uzatınca
genişlik de (yükseklik × 0,8) büyüyüp sütunu aşıyordu. Satır düzeninde oran kaldırıldı
(`width:100%; height:100%; min-height:340px`), oran yalnızca mobil tek sütunda uygulanıyor.
`.founder-body`'ye `min-width: 0`. **Yeni bir kurucu eklenirse bu kuralı bozmayın.**

**6) Çalışma alanları kapanış metni** Sinem'in yeni metniyle değiştirildi (TR onun, EN bizim).

**7) Ana sayfa "Neden Biz" yer tutucusu** → `assets/about/neden-biz-kutuphane.jpg`
(900×900, `assets/hero-2.jpg`'nin kare kadrajı). `.frame-placeholder` artık hiçbir sayfada
kullanılmıyor. Sinem "ne koyacağımı bilemedim, sana bırakıyorum" dedi — değiştirilebilir.

**8) Karanlık mod okunabilirliği.** `.chip` metni sabit `--navy-800` olduğu için koyu zeminde
kayboluyordu. Koyu tema bloğuna eklenenler: `.chip` (+hover, +svg), `.feature-item h4`,
`.step h4`, `.credential .det h4`, `.vcard-block h4`, `.info-card h3`, `.wiz-result h3`,
`.wiz-q`, `.intro-signature-line`, `.contact-info-item p`, `.field-consent .consent`.
**KURAL: bileşen metnine sabit `--navy-*` verirseniz koyu tema bloğuna karşılığını da yazın.**

**9) (Sinem istemedi, biz bulduk) Yatay menü ~1150px altında taşıyordu** — bağlantılar
"ANA / SAYFA" gibi ikiye bölünüyor, tema butonu kırpılıyordu. `.nav-links a { white-space: nowrap }`
eklendi ve hamburger eşiği **760px → 1150px**'e çekildi (yeni `@media (max-width: 1150px)` bloğu;
760px bloğunda yalnızca diğer düzen kuralları kaldı). 1040px bloğundaki ölü menü kuralları silindi.

**Doğrulama:** 10 sayfa × 4 genişlik (1440/1160/1024/390) × açık+koyu tema × TR+EN
başsız Chromium ile tarandı: yatay taşma yok, kırık görsel yok, JS konsol hatası yok.

## 15. Eylül 2026 (3. tur) — TELEFON GÖRÜNÜMÜ düzeltmeleri (UYGULANDI)

Kerem "telefonda ekran okunur değil, doğru boyut vermiyor" dedi. Gerçek cihaz emülasyonuyla
(Chromium, `is_mobile`, dokunma, 320/360/375/390/412/430 px) tarandı. Bulunan 4 sorunun
**hepsi bu turdan önce de vardı**, hiçbiri 7 Eylül değişikliklerinden kaynaklanmıyordu.

**1) ⚠ EN KRİTİK — Hamburger menü butonu telefonda EKRAN DIŞINDAYDI.**
`.header .container` satırı ~446 px genişlik istiyordu (logo + TR/EN + tema + hamburger +
`.lang-switch`'e verilmiş gereksiz `margin-right: 50px` + 28 px kenar boşluğu × 2).
430 px'ten dar HER telefonda bu satır taşıyor, `body { overflow-x: hidden }` taşan kısmı
kırpıyor ve menü butonu erişilemez hale geliyordu. **Yani sitenin menüsü hiçbir telefonda
açılamıyordu.** Playwright "element is outside of the viewport" diyerek tıklayamadı.
Düzeltme: `margin-right: 50px` kaldırıldı; telefonda kenar boşluğu 28→20 px (≤380 px'te 15 px),
logo 1.5rem (≤380 px'te 1.3rem), `.lang-switch` düğme dolgusu ve `.nav` boşluğu küçültüldü.
Sonuç: 320 px'te bile hamburger ekran içinde, sağda 15 px pay var.
**KURAL: bu bloktaki ölçüleri büyütmeden önce 320 px'te hamburger'in ekranda kaldığını doğrulayın.**

**2) iOS'ta form alanına dokununca sayfa kendiliğinden yakınlaşıyordu.**
`.field input/textarea/select` yazı boyutu `0.96rem` = 15,4 px idi. iOS Safari, 16 px'in
ALTINDAKİ bir alana odaklanınca sayfayı otomatik yakınlaştırır ve geri uzaklaştırmaz —
kullanıcı siteyi "yanlış boyutta" görür. Telefonda tüm form alanları 16 px'e sabitlendi.
**KURAL: telefonda hiçbir input/select/textarea 16 px'in altına inmemeli.**

**3) Dokunma hedefleri çok küçüktü.** Ölçülen: footer bağlantıları 16-20 px, kart "İncele"
bağlantıları 21 px, TR/EN düğmeleri 24 px, hero slayt noktaları 4 px, çerçeve noktaları 11 px,
hamburger 26×22 px. Görünüm değiştirilmeden dokunma alanları büyütüldü (şeffaf `::after`
alanı veya dikey iç boşluk): footer 41 px, kart bağlantıları 39 px, TR/EN 32 px,
hamburger 50×46 px, hero noktaları 36 px.

**4) Yüzen WhatsApp / yukarı-çık butonları footer'ın son satırını kapatıyordu**
("Av. Yasin Emre Özbaş" görünmüyordu). `.footer-bottom`'a telefonda `padding-bottom: 84px`.

**Doğrulama:** 10 sayfa × 6 genişlik (1440/1160/1024/768/390/320) × açık+koyu tema × TR+EN.
Yatay taşma 0, kırık görsel 0, JS hatası 0. Menü 320/360/390 px'te açılıp kapanıyor.
Masaüstü tarafında değişiklik yok (≥1160 px yatay menü aynı; ≤1150 px'te 44 px pay kazanıldı).

**Bilinen, düzeltilmemiş:** ana sayfa mobil LCP ~8 sn (bkz. `SEO-DENETIM-RAPORU-02-EYL-2026.md`,
Dalga 1). Telefonda "yavaş açılıyor" hissinin kaynağı bu; ayrı bir iş olarak duruyor.

## 16. Eylül 2026 — Görsel kalite denetimi (Sinem'in görselleri bozuldu mu?)

Rapor: `GORSEL-KALITE-DENETIMI-07-EYL-2026.md`. **Sonuç: Sinem'in görselleri bozulmadı.**
Kaynak PNG ↔ site JPG karşılaştırması PSNR **38,9–46,3 dB** (40+ = gözle ayırt edilemez).
Büyütme yok, en-boy oranları birebir, kadraj korunmuş.

**Keskinlik tavanı kaynak çözünürlüğü.** Sinem'in banner'ları 1672–1915 px genişlikte.
Tam ekran hero, 1440 px retina ekranda 2880 px ister → o ekranda yumuşak görünür.
Bu işlemeden değil kaynaktan gelir. **Daha net hero isteniyorsa Sinem'in banner'ları
≥2400 px genişlikte yeniden üretilmeli; büyütmek çözüm değil (sahte piksel).**
Not: sitedeki en bulanık görseller Sinem'inkiler değil, BİZİM `assets/hero-1…4.jpg`
(1344×768; retinada 0,41 telefonda 0,27 yeterlilik).

**Denetimde çıkan ve düzeltilen 2 kusur:**
1. `assets/about/neden-biz-kutuphane.jpg` 768×768 kırpımdan 900×900'e **büyütülmüştü**
   (7 Eyl'de ben yapmıştım) → gerçek ölçüye döndürüldü, 119→100 KB.
2. `assets/team/yasin.jpg` ham `Yasin.jpeg` 1122×1402 iken **760×950'ye küçültülmüştü**
   (kırpma değil düz küçültme, PSNR 43,1 dB) → 1100×1374, kadraj aynı.
   Telefonda keskinlik 0,73 → 1,05. `sinem.jpg` DEĞİŞTİRİLMEDİ (hamı zaten 738 px + rötuşlu).
3. Portrelere ve neden-biz görseline `width`/`height` nitelikleri eklendi (CLS azaltır).

**Bilinçli dokunulmayan:** alan kartları (aile/yabancılar/fikri-sinai) 880 px'te kalıyor.
Kaynakları 1503–1536 px ama bu 3 dosyaya 880 px'te işlem yapılmış (aile +6, yabancılar +23
ortalama RGB ton düzeltmesi; fikri-sinai'den logo silinmiş). Yüksek çözünürlüklü sürüm
üretmek bu işlemleri baştan yapmayı gerektirir → Sinem'in onayladığı görüntü değişebilir.
Sitedeki 3 dosya `Sinem İstekler/_secenekler/*-2-sitede-kullanilan-*` ile birebir aynı (99 dB).

**KURAL: siteye görsel eklerken (a) asla büyütme, (b) ham dosyanın tam çözünürlüğünü kullan,
(c) `width`/`height` niteliklerini gerçek ölçüyle yaz, (d) telefonda (DPR3) keskinlik
yeterliliğini kontrol et: dosya genişliği ÷ (CSS genişliği × 3) ≥ 1 olmalı.**

## 17. Eylül 2026 — HERO/BANNER yeniden dengelenmesi (UYGULANDI, Sinem'e sorulmadı)

Kerem'in kararı: "Sinem'den dönüş almayalım, en iyisini yapalım." Rapor:
`HERO-DUZENLEME-RAPORU-07-EYL-2026.md`. Yedek: `_yedek/2026-09-07-oncesi/css/style-hero-oncesi.css`.

**Sorun (ölçüldü):** overlay opaklığı ortada ~%70, kenarlarda ~%78 idi; Sinem'in banner'larının
parlaklığının yalnızca %22-30'u geçiyordu. Marka Tescili ve Makaleler sayfalarında görsel
neredeyse tamamen kayboluyordu. Telefonda ayrıca banner'ın yalnızca %30-42'si görünüyordu.

**Yapılan 6 değişiklik:**
1. **İç sayfa hero overlay'i açıldı** (`.page-hero--photo .hero-bg::after`). Yeni yaklaşım:
   üst ve alt şeritler header'ı ve metni korumak için koyu kalır (0,58 / 0,48), ORTA bant açılır
   (0,18-0,22), başlığın oturduğu merkez ayrıca radyal scrim ile korunur (0,46).
2. **Ana sayfa hero overlay'i açıldı** (`.hero-media-slide::after`). Sol taraf logo/menü için
   koyu bırakıldı (120deg 0,72), sağ ve orta açıldı; merkeze radyal scrim (0,62).
3. **Header kendi koruma katmanını kazandı** (`.header::after`, `.scrolled` olunca kalkar).
   Overlay açıldığı için menü/logo artık hero fotoğrafına doğrudan oturuyordu.
4. **Telefonda sayfa bazlı yatay kadraj:** `--hero-pos-m` değişkeni. Marka Tescili 88%
   ("R" tescil mührü kadraja girsin), Makaleler 60%, Çalışma 55%, İletişim 52%, Hakkımızda 64%.
5. **Telefonda hero dolgusu küçültüldü** (üst +38px, alt 60px). Hero ekranı daha az kaplıyor ve
   banner'ın görünen oranı %30-42'den **%33-47**'ye çıktı.
6. **Kontrast düzeltmeleri** (overlay açılınca gerekli oldu, ama zaten AA altındaydılar):
   `--accent-100 (#c9deee)` eklendi; `.hero .eyebrow` ve `.page-hero .eyebrow` accent-300 →
   accent-100 (2,4:1 → 4,6:1); `.logo-sub` accent-300 → accent-200 (3,3:1 → 5,0:1);
   `.page-hero .breadcrumb` 0,62 → 0,82 opaklık; `.section-dark .eyebrow` accent → accent-200.

**Ölçüm yöntemi — GLİF MASKELİ KONTRAST (bunu kullanın):** sayfayı iki kez ekran görüntüsü al —
biri normal, biri metin rengi `transparent` yapılmış hâliyle. İkisinin farkı glif maskesini verir;
dekoratif çizgiler (`.eyebrow::before/::after`, `.divider-gold`) ÖNCEDEN gizlenmeli. Maskeli
piksellerde arka planı boş görüntüden, metin rengini CSS'ten al, piksel bazlı kontrastın 5.
yüzdeliğini raporla. Kutu ortalaması ya da yüzdelik-renk yöntemi YANILTIR (parlak tekil pikseller
ve anti-aliasing kenarları sonucu bozar).

**Doğrulanan kontrast (WCAG AA = 4,5:1) — en düşük değerler:**
masaüstü 1440 **4,6:1**, telefon 390 **4,6:1**. Önceki durum: eyebrow 2,4/2,8 ve logo-alt 3,3/3,4
ile **AA'nın ALTINDAYDI**. Yani site artık hem görselleri gösteriyor hem daha erişilebilir.

**KURAL: overlay değerlerine dokunmadan önce glif maskeli kontrast ölçümünü çalıştırın; en düşük
değer 4,5:1'in altına inmemeli. Overlay'i açmak istiyorsanız önce radyal scrim'i güçlendirin.**

## 18. Eylül 2026 — Bakım turu: ölü kod, ölü bağlantı, doküman tazeleme

7 Eylül'deki dört turdan (Bölüm 14-17) sonra yapılan temizlik. Rapor:
`BAKIM-TURU-07-EYL-2026.md`. Açık işler tek dosyada: **`ACIK-ISLER.md`**.

**1) Ölü sosyal medya bağlantıları kaldırıldı.** Footer'daki LinkedIn ve Instagram
simgeleri `href="#"` idi — tıklanınca hiçbir şey olmuyordu (10 sayfa × 2 = 20 ölü bağlantı;
2 Eylül SEO denetiminin bulgusuydu). Kaldırıldı. Footer'da yalnızca çalışan iki bağlantı
kaldı: WhatsApp ve e-posta. **Sinem hesap adreslerini verince** `.footer-social` içine şu
kalıpla geri eklenir (10 sayfada):
```html
<a href="https://www.linkedin.com/in/KULLANICI" target="_blank" rel="noopener" aria-label="LinkedIn"><svg …></svg></a>
```
Simge SVG'leri commit `6ddcf62`'de duruyor.

**2) "Yukarı çık" `<a href="#">` yerine `<button>` oldu.** Gezinme değil kontrol; adres
çubuğuna `#` eklemiyor, geri tuşunu kirletmiyor. Kaydırmayı `js/main.js` yapıyor ve
`prefers-reduced-motion` saygılı. CSS'te `.to-top`'a `border:0; padding:0; cursor:pointer; font:inherit`
eklendi (buton varsayılanlarını sıfırlamak için).

**3) Ölü CSS silindi.** `.frame-placeholder` (son kullanımı Bölüm 14'te gerçek görselle
değişti) ve `.credential*` (Bölüm 14'te "Mesleki birikim" bölümü silindi). Yerlerine geri
dönüş adresini söyleyen yorum satırı bırakıldı.

**4) Eskiyen doküman ifadeleri işaretlendi.** Bölüm 5'teki logo/amblem anlatımı, portre
çözünürlüğü, Bölüm 6'daki `.frame-placeholder` rehberi ve Bölüm 13'teki overlay cümlesi
artık geçerli bölüme yönlendiriyor. `css/style.css` içindeki "%75-80 lacivert" yorumu da
güncellendi.

**KURAL: bir bölümü geçersiz kılan bir değişiklik yaptığınızda eski bölümü SİLMEYİN —
altına `> ⚠ GÜNCEL DEĞİL (tarih): … Bkz. Bölüm N` satırı ekleyin. Bu dosya kronolojik
bir kayıt; silmek geçmişi kaybettirir, düzeltmemek yanlış yönlendirir.**
