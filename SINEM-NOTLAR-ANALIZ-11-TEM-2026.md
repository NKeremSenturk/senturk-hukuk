# Sinem'in "WEB SAYFAM İÇİN NOTLARIM.docx" Analizi — 11 Temmuz 2026

Kaynak: Sinem'in ilettiği Word dosyası (proje kökünde, 18 gömülü görsel içeriyor).
Tüm maddeler mevcut kodla eşleştirildi; dosya/satır konumları aşağıda.
**Not:** Her metin değişikliği çift dilli sistemde hem `data-lang-tr` hem `data-lang-en` güncellemesi gerektirir (EN çevirilerini biz yapacağız).

---

## A. Adres değişikliği (YENİ YASAL ADRES)

**Eski:** Canan Business Plaza, Küçükbakkalköy, Selvili Sok. No:4 Kat:3, 34750 Ataşehir / İstanbul
**Yeni:** Canan Business Plaza, Küçükbakkalköy Mahallesi Selvili Sokak **No:4/20** Ataşehir – İstanbul

Güncellenecek yerler (grep ile doğrulandı):

- `index.html` → JSON-LD `streetAddress` (satır ~40) + footer (satır ~655)
- `iletisim.html` → bilgi kartı (~90), **Google Maps embed sorgusu** (~145), footer (~271)
- `kvkk.html` → TR metin (~85), EN metin (~131), footer (~224)
- `assets/sinem-senturk.vcf` → ADR satırı
- Diğer sayfaların footer'ında adres var mı tek tek kontrol edilmeli (Kural #2: header/footer 10 sayfada aynı)

Bu, CLAUDE.md Bölüm 12'deki "Ofis adresinin doğrulanması" bekleyenini **kapatır**.

## B. Hero slider — 4 slaytın metin revizyonu (`index.html`)

| Slayt | Başlık | Alt metin |
|---|---|---|
| 1 | Aynı kalıyor: "FİKİRLERİNİZİ KORUYOR, MARKANIZI GÜÇLENDİRİYORUZ" | **Yeni:** "Marka, tasarım ve coğrafi işaret haklarının tescilini, sicile kayıtlı marka vekilliği ve stratejik danışmanlık anlayışıyla yönetiyoruz." |
| 2 | **Yeni:** "HAKLARINIZI TESCİLDEN **ETKİN** KORUMAYA KADAR YÖNETİYORUZ." | **Yeni:** "Marka ihlalleri, itiraz süreçleri, iptal ve hükümsüzlük davaları; telif hakları ve FSEK kapsamındaki uyuşmazlıklarda fikri değerlerinizin korunması için kapsamlı hukuki danışmanlık sunuyoruz." |
| 3 | **Yeni:** "TÜRKİYE'DE İKAMET, ÇALIŞMA İZNİ VE VATANDAŞLIK SÜREÇLERİNDE YANINIZDA" | **Yeni:** "İkamet ve çalışma izni, vatandaşlık süreçlerinde; yabancı müvekkillere şeffaf ve güven esaslı danışmanlık." (not: "yerli ve yabancı" → sadece "yabancı"; gayrimenkul ibaresi çıktı) |
| 4 | **Yeni:** "BOŞANMA, İŞ, CEZA VE GAYRİMENKUL UYUŞMAZLIKLARINDA GÜÇLÜ TEMSİL" (eski: "AİLE... GÜVENİLİR TEMSİL") | **Yeni:** "Her dosyayı kendi dinamikleri içinde değerlendirir, size özel bir yol haritası çıkarırız. Sürecin her aşamasında açık iletişim, titiz hukuki takip anlayışıyla düzenli bilgilendirilirsiniz." (mevcut: index.html ~182) |

## C. Ana sayfa diğer değişiklikler (`index.html`)

1. **Intro paragrafı yenileniyor** — "Büromuz Hakkında" bölümündeki tanıtım metni Sinem'in yazdığı 2 paragraflık yeni metinle değişecek (fikri mülkiyet vurgusu + diğer alanlar: yabancılar/vatandaşlık, iş, aile-miras, ceza, gayrimenkul).
2. **İmza cümlesi KALDIRILACAK:** "Markanızın ve haklarınızın arkasında, baştan sona aynı özen ve tek bir muhatap." (`.intro-signature-line`, index.html ~251). ⚠️ Altındaki "Av. & Marka Vekili Sinem Şentürk" imza satırının kalıp kalmayacağını Sinem'e sormalı — dokümanda sadece cümle için "kaldırılacak" deniyor.
3. **"Neden Biz" → Şeffaf İletişim:** "Süreç boyunca anlaşılır bir dille, düzenli olarak bilgilendirilirsiniz." → "Süreç boyunca düzenli olarak bilgilendirilirsiniz." (~416)
4. **"Neden Biz"e YENİ MADDE (Sinem'in önerisi):** "Ulaşılabilirlik — İstanbul ve Balıkesir merkezli olmak üzere Türkiye geneli hizmet." (SEO kararıyla da uyumlu)
5. **Makale önizleme açıklaması:** "Marka ve fikri mülkiyet başta olmak üzere hukuki süreçleri daha anlaşılır kılan yazılarımızdan bir seçki." → "Hukuki süreçleri daha anlaşılır kılan güncel makale ve bilgilendirici içeriklerimiz." (~443)

## D. Çalışma Alanları (`calisma-alanlari.html`)

1. Lead metin: "...hukukun farklı **dallarında**..." → "...hukukun farklı **alanlarında**..." (~70)
2. Alt CTA başlığı: "Davanız hangi alanda olursa olsun, yanınızdayız" → "Hukukun her alanında güvenilir ve etkin temsil ile yanınızdayız" (~226)

## E. Hakkında sayfası (`hakkinda.html`)

1. **Sayfa başlığı "HAKKINDA" → "HAKKIMIZDA".** ⚠️ Kapsam kararı: sadece sayfa içi H1 mi, yoksa **header nav etiketi (10 sayfada!) + `<title>` + breadcrumb/OG** da mı? Tutarlılık için hepsinin "Hakkımızda" olması önerilir — Kerem onaylasın.
2. Hero altı: "Büromuz ve Ekibimiz" → "**Ekibimiz**"; açıklama → "Hukuki riskleri öngören, değerleri güvence altına alan ve her süreci stratejik bakış açısıyla yöneten bir hukuk anlayışı benimsiyoruz." (~70 civarı)
3. **Yasin'in tanıtım yazısı GELDİ** (CLAUDE.md Bölüm 12 bekleyeni kapanıyor). Founder kartına eklenecek: başlık "Av. Yasin Emre Özbaş — Ceza Hukuku · Kira Uyuşmazlıkları · Gayrimenkul Hukuku" + 3 paragraf bio (İstanbul Üniversitesi mezunu, ceza ağırlıklı, kira/gayrimenkul, güven-şeffaflık yaklaşımı). Tam metin docx'te; EN çevirisi bizden.
4. Değerler bölümü yazım düzeltmeleri:
   - Şeffaflık: "anlaşılır bir dille ve düzenli olarak" → "düzenli olarak bilgilendirilirsiniz" (~163)
   - Titizlik: "eksiksiz **ayırırız**" → "eksiksiz **sağlarız**" (~175)
   - Güvenilirlik: "**durar**," → "**durur**," (yazım hatası, ~181)
5. Sinem bio düzeltmesi: "Türk Patent ve Marka Kurumu **sicilli** marka vekili" → "**sicile kayıtlı** marka vekili" (~213). ⚠️ Aynı ifade başka sayfalarda da geçiyorsa (index intro, footer) taransın.
6. CTA düzeltmesi: "Hukuki bir konuda **mı destek** arıyorsunuz?" → "Hukuki bir konuda **destek mi** arıyorsunuz?" (~236)

## F. Hukuk alanlarına görseller (CLAUDE.md Bölüm 12, madde 12 — nihayet geldi ama…)

Docx'in sonunda 4 görsel var (image15–18): 6 çalışma alanı kartının **açık ve koyu tema mokapları** (Fikri ve Sınai Haklar, Yabancılar, Aile, İş ve Sosyal Güvenlik, Ceza, Gayrimenkul & Kira — her kartta AI üretimi arka plan görseli).

⚠️ **Sorun:** Bunlar tek tek kullanılabilir görsel dosyaları değil; karta yerleştirilmiş **ekran görüntüsü/mokap** (≈985px, 3'lü kart dizilimi). Yani ya:
- (a) bu tasarım onayı sayılıp 6 alanın görselini **kendimiz üretiriz** (StableDif altyapısı hazır — hero/about görselleri gibi), ya da
- (b) Sinem'den **orijinal tekil görsel dosyaları** istenir.

Öneri: (a) — mokaplar stil referansı olarak birebir kullanılabilir (açık temada altın/krem tonlu, koyu temada lacivert-altın gece tonlu). Kerem karar verecek.

## G. Bilgi amaçlı notlar (şimdi aksiyon yok — CLAUDE.md'de zaten bekliyor)

- "TELEFON HATTI ALACAĞIM" → gelince `main.js CONTACT` + 10 sayfa + vCard + QR + JSON-LD
- "DOMAİN VE MAİL ADRESİ ALINACAK" → gelince canonical/OG/sitemap/robots + QR yeniden üretim + form mailto
- "LOGO DEĞİŞECEK" → mevcut hatırlatma korunuyor, şimdilik dokunulmuyor

---

## Proje güncel durumu (11 Tem 2026)

**GitHub:** `origin/main` ile senkron, working tree temiz, son commit `6b1f57c` (CLAUDE.md hatırlatma botu listeleri, 5 Tem). Site GitHub Pages'te yayında; 5 Temmuz'dan beri kod değişikliği yok.

**Tamamlanmış büyük işler:** 3 gerçek makale (TR+EN) · KVKK sayfası yayında · çalışan iletişim formları (WhatsApp + KVKK onayı) · self-hosted fontlar · vCard+QR · marka sihirbazı · karanlık mod · kurucular alt alta düzeni · erişilebilirlik/SEO turları.

**Bu docx'in kapattığı bekleyenler:** Yasin tanıtım yazısı ✓ · ofis adresi doğrulaması ✓ (yeni adres geldi) · çalışma alanı görselleri (kısmen — mokap olarak) ✓ · muhtemelen "Genel değişiklikler Word dosyası" = bu doküman.

**Hâlâ bekleyenler:** Web3Forms anahtarı (Kerem) · Cloudflare Analytics (Kerem) · KVKK Word kontrolü (Sinem) · 3 yeni makale (vatandaşlık, anlaşmalı boşanma, telif) · telefon/domain/e-posta · logo görüşmesi · sosyal medya hesapları.

## Önerilen uygulama sırası

1. Metin düzeltmeleri paketi (B–E: hero, intro, çalışma alanları, hakkında; TR+EN, tek commit)
2. Adres güncellemesi (A: 4 dosya + harita embed + vCard)
3. Yasin bio ekleme (E3, EN çevirisiyle)
4. "Hakkımızda" kapsam kararı + "Neden Biz"e Ulaşılabilirlik maddesi (Kerem onayı sonrası)
5. Alan görselleri üretimi/entegrasyonu (F — ayrı iş, karar sonrası)
6. CLAUDE.md Bölüm 12 listelerinin güncellenmesi (bot listeleri: biten maddeler silinecek)
