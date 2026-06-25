# Şentürk — Logo / Amblem Dosyaları

Tüm logolar keskin, ölçeklenebilir **SVG**. Renkler proje paletiyle birebir
(lacivert `#0b1f3a`, accent `#2f6f9f`). Wordmark: Cormorant Garamond (serif),
alt satır/tagline: Inter. Fontlar SVG içinde Google Fonts'tan yüklenir.

## E5 — Sinem'in seçtiği amblem (ANA LOGO)
Bölünmüş küre + ortada wordmark.

| Dosya | Açıklama |
|-------|----------|
| `e5-en-light.svg` | EN (Law & IP) · beyaz zemin |
| `e5-en-dark.svg`  | EN (Law & IP) · lacivert zemin |
| `e5-tr-light.svg` | TR (Marka ve Hukuk Bürosu) · beyaz zemin |
| `e5-tr-dark.svg`  | TR (Marka ve Hukuk Bürosu) · lacivert zemin |
| `e5-icon-light.svg` | Kompakt ikon (yalnız Ş) · beyaz zemin — favicon/WhatsApp/mobil |
| `e5-icon-dark.svg`  | Kompakt ikon (yalnız Ş) · lacivert zemin |

**Font alternatifi:** Yukarıdaki E5 dosyalarının wordmark'ı **serif (Cormorant)**.
Aynı setin **sans (Plus Jakarta Sans)** sürümü `-sans` ekiyle: `e5-en-light-sans.svg`,
`e5-en-dark-sans.svg`, `e5-tr-light-sans.svg`, `e5-tr-dark-sans.svg`,
`e5-icon-light-sans.svg`, `e5-icon-dark-sans.svg`. Hangi font seçilirse diğer set silinebilir.

## 1A/1E & 2A/2E — Yatay lockup (alternatif)
Soluk küre arkada + ŞENTÜRK + alt satır.

| Dosya | Açıklama |
|-------|----------|
| `senturk-en-dark.svg` / `-light.svg` | EN lockup · koyu / açık |
| `senturk-tr-dark.svg` / `-light.svg` | TR lockup · koyu / açık |

## E3 — Daire içinde Ş ikonu (alternatif kompakt)
| Dosya | Açıklama |
|-------|----------|
| `icon-dark.svg` / `icon-light.svg` | Daire + Ş · koyu / açık |

## Önizleme
`onizleme.html` — tüm logoları gerçek boyutlarda (header, footer, favicon) gösterir.
Tarayıcıda aç (internet bağlantısı gerekir; fontlar Google Fonts'tan gelir).

## Notlar
- Zeminler şimdilik dolu (beyaz/lacivert `<rect>`). Siteye gömerken şeffaf zemin
  istenirse ilk `<rect>` kaldırılır.
- Wordmark fontu serif (Cormorant). Projenin sans kararına (Plus Jakarta Sans)
  çekilmesi istenirse tek değişiklikle güncellenir.
