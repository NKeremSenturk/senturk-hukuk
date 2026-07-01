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
├── index.html              # Ana sayfa (4 slaytlı hero slider, intro+Sinem imzası, hizmetler, marka şeridi, neden biz, makale önizleme, alıntı, inline iletişim formu) — istatistik YOK
├── hakkinda.html           # Hakkında (Sinem profili, eğitim, değerler, kurucu ortaklar/ekip)
├── calisma-alanlari.html   # Çalışma alanları (8 alan akordeon + marka tescili vurgusu)
├── marka-tescili.html      # Marka/tasarım/coğrafi işaret: aşamalar, alt hizmetler, bilgi notları, başvuru formu
├── makaleler.html          # Makaleler / blog (marka & IP odaklı örnek kartlar)
├── iletisim.html           # İletişim (form + talep türü + bilgiler + Google Maps embed)
├── kvkk.html               # KVKK aydınlatma + gizlilik politikası (taslak; noindex)
├── css/
│   └── style.css           # TÜM stiller + tasarım sistemi (tek dosya)
├── js/
│   └── main.js             # TÜM etkileşimler (menü, dil, animasyon, form)
├── assets/                 # Görseller buraya (portre, büro foto, logo)
├── .github/workflows/
│   └── pages.yml           # GitHub Pages otomatik yayın
├── README.md               # GitHub vitrini + kurulum
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

**SİTEYE GÖMÜLDÜ (Haziran 2026, Kerem tercihi = SERİF):** Tüm 7 sayfanın header
ve footer `.logo`'su artık **inline SVG ikon (beyaz, şeffaf bölünmüş küre + Ş) +
ŞENTÜRK wordmark (serif) + iki dilli alt satır** yatay kilidi. Wordmark fontu için
`:root`'a `--font-logo` (Cormorant Garamond) eklendi ve Google Fonts linkine
`Cormorant+Garamond` katıldı (7 sayfada). Favicon `assets/logo/e5-icon-dark.svg`.
Header'da dikey E5 yerine **ikon+wordmark** kullanıldı (slim header + mobil uyumu).
Serif yalnız logoda; gövde metni hâlâ sans (Plus Jakarta + Inter). Sans logo dosyaları
(`e5-*-sans.svg`) envanterde duruyor; font kararı değişirse `--font-logo` tek satırda döner.

**Portre fotoğrafları EKLENDİ (Haziran 2026, Kerem):** Sinem ve Yasin'in gerçek
portreleri geldi. Kaynaklar kök dizinde (`Sinem.jpg`, `Yasin.jpeg` — repoya GİRMEZ);
işlenmiş web sürümleri `assets/team/sinem.jpg` ve `assets/team/yasin.jpg` (siyah bant
kırpıldı, 4/5'e yakın portre, ~760px, ~60KB). `hakkinda.html`'de: (a) Sinem spotlight
`.frame-placeholder` → gerçek `<img>`; (b) eski küçük avatarlı **"Kurucu Ortaklar"**
bölümü, solda Sinem / sağda Yasin, **büyük portre üstte + bilgi altta** olan 50/50
`.founders-grid`/`.founder-card` düzenine çevrildi (760px altında tek sütun, hover zoom).
Eski `.team-grid/.team-card/.team-photo` CSS'i kaldırıldı. Yasin'in adı (Kerem onayı) tam
hâliyle "Av. Yasin Emre Özbaş" korundu.

**Hâlâ Sinem'den beklenenler (geldiğinde işlenecek):**
- **Kesin renk/stil tercihi** → Sinem net renk/logoyu iletince `:root` ince ayarı yapılır.
- Sosyal medya `href="#"` (LinkedIn / Instagram) → gerçek bağlantılar.
- Gerçek makale metinleri → `makaleler.html` (şu an örnek başlıklar).
- KVKK metni → `kvkk.html` taslağı büro tarafından onaylanmalı.
- **Sinem'in el yazısı imzası (SVG)** → hero/intro'da kalemle çizilme animasyonu
  (`stroke-dashoffset`, saf CSS). İmza gelince `.intro-signature`'a gömülecek. (İMZA HAREKETİ)

> **Soyadı notu:** "Şentürk" doğrulandı (form Q2). İstatistik bölümü Sinem'in talebiyle
> **kaldırıldı** (form Q29 = Hayır) — `data-target` sayaçları artık kullanılmıyor.

---

## 6. Sık Yapılacak İşler (Claude'a komut örnekleri)

- "İletişim bilgilerini şu gerçek bilgilerle güncelle: ..." → tüm sayfalardaki yer tutucular
- "Çalışma alanlarına 'KVKK ve Bilişim Hukuku' ekle" → calisma-alanlari.html akordeon + index.html kart
- "Makaleler sayfasına şu yeni yazıyı ekle" → makaleler.html'e yeni `.article-card`
- "Renk paletini biraz daha koyu/açık yap" → sadece css `:root` değişkenleri
- "Portre fotoğrafını ekledim, yerine koy" → `.frame-placeholder` → `<img src="assets/...">`

---

## 7. Kurallar / Konvansiyonlar

1. **Tek CSS, tek JS dosyası** — yeni dosya açma, mevcutları genişlet.
2. **Header ve footer her sayfada aynıdır.** Birinde değişiklik yaparsan **7 sayfada da** uygula
   (index, hakkinda, calisma-alanlari, marka-tescili, makaleler, iletisim, kvkk). Header nav 6 öğelidir.
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

**G. İmza hareketinin kalbi — el yazısı imza animasyonu:** Sinem'in gerçek imzası gelince
   yapılacak (bkz. Bölüm 5 "beklenenler"). Şimdilik beklemede.

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
