# ============================================================
#  Şentürk Hukuk Bürosu — GitHub Kurulum Scripti (Windows)
#  Bu dosyaya sağ tık → "PowerShell ile çalıştır"
#  Git deposunu başlatır, ilk commit'i atar ve GitHub'a bağlar.
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

Write-Host ""
Write-Host "===== Senturk Hukuk Burosu - GitHub Kurulumu =====" -ForegroundColor Cyan
Write-Host ""

# 1. Git kurulu mu?
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "HATA: Git kurulu degil." -ForegroundColor Red
    Write-Host "Once https://git-scm.com/download/win adresinden Git'i kurun, sonra tekrar calistirin."
    Read-Host "Cikmak icin Enter'a basin"
    exit 1
}

# 2. Kullanici bilgileri
$user = Read-Host "GitHub kullanici adiniz (orn: nkeremsenturk)"
$repo = Read-Host "Depo adi (Enter = senturk-hukuk)"
if ([string]::IsNullOrWhiteSpace($repo)) { $repo = "senturk-hukuk" }

# 3. Git deposu baslat
if (-not (Test-Path ".git")) {
    git init | Out-Null
    Write-Host "[OK] Git deposu baslatildi." -ForegroundColor Green
} else {
    Write-Host "[i] Git deposu zaten var, devam ediliyor." -ForegroundColor Yellow
}

git add .
git commit -m "Ilk surum: Senturk Hukuk Burosu web sitesi" 2>$null
git branch -M main
Write-Host "[OK] Dosyalar commit'lendi." -ForegroundColor Green

# 4. GitHub'a baglama
$remoteUrl = "https://github.com/$user/$repo.git"

if (Get-Command gh -ErrorAction SilentlyContinue) {
    # GitHub CLI varsa depoyu otomatik olustur ve push et
    Write-Host "[i] GitHub CLI bulundu, depo olusturuluyor..." -ForegroundColor Yellow
    gh repo create "$user/$repo" --public --source=. --remote=origin --push
    Write-Host "[OK] Depo olusturuldu ve push edildi." -ForegroundColor Green
} else {
    # gh yoksa: kullanici depoyu elle olusturmali
    Write-Host ""
    Write-Host "GitHub CLI kurulu degil. Lutfen su adimlari yapin:" -ForegroundColor Yellow
    Write-Host "  1) https://github.com/new adresine gidin"
    Write-Host "  2) Repository name: $repo  (README/license EKLEMEYIN)"
    Write-Host "  3) Create repository'ye basin"
    Write-Host ""
    Read-Host "Depoyu olusturduysaniz Enter'a basin"

    git remote remove origin 2>$null
    git remote add origin $remoteUrl
    Write-Host "[i] GitHub'a push ediliyor (giris istenebilir)..." -ForegroundColor Yellow
    git push -u origin main
    Write-Host "[OK] Push tamamlandi." -ForegroundColor Green
}

Write-Host ""
Write-Host "===== TAMAMLANDI =====" -ForegroundColor Cyan
Write-Host "Depo:  https://github.com/$user/$repo"
Write-Host "Site (Pages acildiktan sonra):  https://$user.github.io/$repo/"
Write-Host ""
Write-Host "SON ADIM - GitHub Pages'i acin:" -ForegroundColor Yellow
Write-Host "  Depo > Settings > Pages > Source: 'GitHub Actions' secin."
Write-Host ""
Read-Host "Cikmak icin Enter'a basin"
