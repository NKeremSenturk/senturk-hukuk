# Şentürk Marka ve Hukuk Bürosu — Web Sitesi

Av. & Marka Vekili Sinem Şentürk ve kurucu ortağı Av. Yasin Emre Özbaş için hazırlanmış;
çok sayfalı, **iki dilli (TR/EN)**, modern ve sade bir hukuk bürosu tanıtım web sitesi.
Saf HTML + CSS + JavaScript ile geliştirilmiştir — çerçeve yok, derleme yok,
GitHub Pages'te ücretsiz yayınlanır. Fikri ve sınai haklar / marka tescili öne çıkar.

> İçerik Sinem'in bilgi formuyla dolduruldu. Logo, portre ve sosyal medya bağlantıları
> geldiğinde işlenecektir. Ayrıntılar için **[CLAUDE.md](CLAUDE.md)** dosyasına bakın.

---

## Özellikler

- **7 sayfa:** Ana Sayfa · Hakkında · Çalışma Alanları · Marka Tescili · Makaleler · İletişim · KVKK
- **İki dil:** Tek tıkla TR/EN geçişi (tercih hatırlanır)
- **Modern & sade tasarım:** Lacivert + beyaz paleti, çelik mavisi vurgu, sans-serif tipografi
- **Dinamik:** Saf-CSS scroll animasyonları, akordeon, yapışkan menü, WhatsApp butonu, mobil uyumlu
- **8 çalışma alanı + marka tescili:** Fikri/sınai haklar, yabancılar, aile, iş, ceza, gayrimenkul,
  icra-iflas, sözleşmeler; ayrı marka/tasarım/coğrafi işaret tescili sayfası ve başvuru formu
- **SEO dostu:** İstanbul/Balıkesir vurgusu, LegalService JSON-LD, erişilebilir işaretleme

---

## Yerel Önizleme

```bash
python -m http.server 8000
# Tarayıcıda: http://localhost:8000
```
veya `index.html` dosyasına çift tıklayın.

---

## Kurulum — Kendi GitHub Hesabınıza Bağlama

### Yöntem A — Tek script (önerilen)

Windows'ta proje klasöründe **`setup.ps1`** dosyasına sağ tıklayıp
"PowerShell ile çalıştır" deyin. Script; Git deposunu başlatır, ilk commit'i atar
ve GitHub'a bağlar. (GitHub kullanıcı adınızı ve depo adını soracaktır.)

### Yöntem B — Elle (adım adım)

1. **GitHub'da boş bir depo oluşturun:** github.com → New repository →
   ad: `senturk-hukuk` (README/license **eklemeyin**) → Create.
2. **Bu klasörde terminal açıp** şunları çalıştırın
   (`KULLANICI_ADI` ve depo adını kendinize göre değiştirin):

```bash
git init
git add .
git commit -m "İlk sürüm: Şentürk Hukuk Bürosu web sitesi"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADI/senturk-hukuk.git
git push -u origin main
```

3. **GitHub Pages'i açın:** Depo → Settings → Pages →
   *Source: GitHub Actions* seçin. Birkaç dakika içinde site şu adreste yayında olur:
   `https://KULLANICI_ADI.github.io/senturk-hukuk/`

> Not: `.github/workflows/pages.yml` dosyası push sonrası yayını otomatik yapar.

---

## Güncelleme Akışı (Cowork · Claude Code · Chat)

Bu proje **tek kaynak = GitHub** mantığıyla kurgulanmıştır. Nerede çalışırsanız çalışın,
şu döngüyü izleyin:

```
1) Başlamadan:   git pull        (en güncel hali al)
2) Değişiklik yap (Cowork / Claude Code / elle)
3) Bitince:      git add .  &&  git commit -m "açıklama"  &&  git push
```

- **Claude Code:** Bu klasörü `claude` ile açın. CLAUDE.md otomatik okunur.
- **Cowork:** Bu klasör zaten bağlı; doğrudan düzenleyip commit/push yapılabilir.
- **Chat:** Dosya içeriğini yapıştırıp "şunu değiştir" diyebilir, çıktıyı klasöre kaydedebilirsiniz.

Detaylı kurallar ve "yapılacaklar" listesi: **[CLAUDE.md](CLAUDE.md)**

---

## Yapı

```
index.html · hakkinda.html · calisma-alanlari.html · marka-tescili.html
makaleler.html · iletisim.html · kvkk.html
css/style.css        → tüm stiller (tasarım sistemi :root değişkenlerinde)
js/main.js           → tüm etkileşimler
assets/              → görseller (portre, logo)
.github/workflows/   → GitHub Pages otomatik yayın
```

---

## Lisans

Bu site Av. Sinem Şentürk'e aittir. Tüm hakları saklıdır.
