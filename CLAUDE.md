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

**Hâlâ Sinem'den beklenenler (geldiğinde işlenecek):**
- **Logo dosyası** → `assets/` içine; header/footer `.logo` yazı tabanlı logoyla değiştirilebilir.
- **Kesin renk/stil tercihi** → Sinem net renk/logoyu iletince `:root` ince ayarı yapılır.
- **Portre fotoğrafı** (Sinem) → `.frame-placeholder` / `.team-photo` yerine `<img>`.
- Sosyal medya `href="#"` (LinkedIn / Instagram) → gerçek bağlantılar.
- Gerçek makale metinleri → `makaleler.html` (şu an örnek başlıklar).
- KVKK metni → `kvkk.html` taslağı büro tarafından onaylanmalı.

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
