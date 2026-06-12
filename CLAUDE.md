# CLAUDE.md — Proje Rehberi

Bu dosya, **Claude Code**, **Cowork** ve **Claude chat** için projenin tek referans noktasıdır.
Hangi ortamda çalışırsan çalış, önce bu dosyayı oku; proje yapısı, kurallar ve yapılacaklar burada.

---

## 1. Proje Nedir?

**Şentürk Hukuk Bürosu** — Av. Sinem Şentürk için hazırlanmış, çok sayfalı, iki dilli (TR/EN),
tamamen **statik** (HTML + CSS + JavaScript) bir avukat tanıtım web sitesi.
Çerçeve (framework) yok, derleme (build) adımı yok. Dosyalar doğrudan sitenin kendisidir.

**Hosting:** GitHub Pages (ücretsiz). `main` dalına push → otomatik yayın.

---

## 2. Dosya Yapısı

```
.
├── index.html              # Ana sayfa (hero, hizmetler, istatistik, neden biz, CTA)
├── hakkinda.html           # Hakkında (profil, değerler, özgeçmiş)
├── calisma-alanlari.html   # Çalışma alanları (9 alan, akordeon)
├── makaleler.html          # Makaleler / blog (örnek kartlar)
├── iletisim.html           # İletişim (form + bilgiler + harita alanı)
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

- **Renkler:** `--navy-900` (ana koyu), `--gold-500` (altın vurgu), `--bordeaux` (bordo), `--cream` (zemin)
- **Fontlar:** `--font-display` (Playfair Display, başlıklar), `--font-body` (Inter, metin)
- **Animasyon:** `.reveal` sınıfı + `is-visible` (scroll ile belirme). Gecikme: `.reveal-delay-1..4`
- **Bileşenler:** `.btn`, `.card`, `.section`, `.accordion`, `.stat`, `.frame` — yeniden kullan.

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

## 5. Doldurulması Gereken Yer Tutucular

Aşağıdakiler tüm sayfalarda köşeli parantezle işaretli. Gerçek bilgilerle değiştirilmeli:

- `[Büro adresi], [İl / İlçe]` → gerçek adres
- `+90 (000) 000 00 00` → gerçek telefon
- `info@senturkhukuk.com` → gerçek e-posta
- `[Baro] Barosu` / `[Bar Association]` → kayıtlı olunan baro
- `[Üniversite adı]`, `20XX` (hakkinda.html) → eğitim/deneyim bilgileri
- Sosyal medya `href="#"` → gerçek LinkedIn / Instagram bağlantıları
- `assets/` içine: portre fotoğrafı + büro fotoğrafı (HTML'deki `.frame-placeholder` yerine `<img>`)
- İstatistik sayıları (index.html `data-target`) → gerçek rakamlar

> **Soyadı notu:** "Şentürk" varsayılan olarak kullanıldı. Gerçek soyadı farklıysa
> tüm dosyalarda toplu değiştir (`Şentürk` → gerçek soyadı).

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
2. **Header ve footer her sayfada aynıdır.** Birinde değişiklik yaparsan **5 sayfada da** uygula.
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
