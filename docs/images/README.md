# 📸 Panduan Screenshot untuk README

Folder ini berisi gambar yang digunakan di [README.md](../../README.md) utama. README akan menampilkan placeholder kosong sampai Anda upload gambar dengan nama yang sesuai.

## File yang perlu Anda buat

Letakkan semua file di folder ini (`docs/images/`) dengan nama persis seperti di tabel. Format **PNG** atau **JPG** boleh.

### 🎨 Banner & Branding

| Nama File | Ukuran | Isi |
|---|---|---|
| `banner.png` | 1200×400 | Banner utama di atas README. Bisa berupa: logo aplikasi + mockup HP yang menampilkan UI |

### 📱 Screenshot Aplikasi

Ambil screenshot dari **mode mobile** (tekan F12 → toggle device toolbar → pilih iPhone) untuk hasil yang sesuai dengan desain mobile-first.

| Nama File | Ukuran Saran | Isi |
|---|---|---|
| `screenshot-login.png` | 400×800 | Halaman login dengan dropdown nama + PIN box |
| `screenshot-input.png` | 400×800 | Tab Input penjualan (Device, Acc, dst + total + tombol Simpan) |
| `screenshot-history.png` | 400×800 | Tab Histori dengan beberapa card transaksi |
| `screenshot-rank.png` | 400×800 | Tab Rank dengan top 3 medal + avatar |
| `screenshot-admin.png` | 400×800 | Tab Admin: daftar anggota dengan tombol aksi |
| `screenshot-theme.png` | 400×800 | Tab Admin section "Tampilan" — preset warna + color picker |

### 📖 Petunjuk Setup (Tutorial Visual)

Screenshot dari halaman web Firebase Console / Apps Script untuk panduan setup.

| Nama File | Ukuran Saran | Isi |
|---|---|---|
| `guide-firebase-create.png` | 1200×600 | Halaman "Create a project" Firebase Console |
| `guide-firebase-webapp.png` | 1200×600 | Modal "Register your app" dengan icon `</>` web |
| `guide-firebase-rules.png` | 1200×600 | Tab Rules Realtime Database dengan editor JSON terbuka |
| `guide-firebase-superuser.png` | 1200×600 | Tab Data Realtime Database — struktur `members/kiki` |
| `guide-appsscript.png` | 1200×600 | Editor Google Apps Script dengan tombol Deploy |

---

## Cara Ambil Screenshot

### 📱 Untuk Mobile Screenshots
1. Buka aplikasi di browser Chrome / Edge
2. Tekan **F12** untuk buka DevTools
3. Klik ikon **Toggle device toolbar** (Ctrl+Shift+M) — atau pilih device "iPhone 12 Pro"
4. Resize jendela aplikasi
5. Tekan **Ctrl+Shift+P** → ketik "screenshot" → pilih **Capture screenshot** atau **Capture full size screenshot**

### 🖥️ Untuk Desktop / Firebase Screenshots
- **Windows:** Tekan **Win + Shift + S** → pilih area → otomatis tersimpan ke clipboard → paste ke Paint → save sebagai PNG
- **Mac:** **Cmd + Shift + 4** → pilih area
- **Tool alternatif:** Lightshot, ShareX, Greenshot

### 🎨 Tips untuk Hasil Cantik

1. **Gunakan data dummy yang realistis** sebelum screenshot
   - Tambahkan beberapa anggota dengan nama bagus
   - Isi beberapa transaksi penjualan dengan angka realistis
2. **Pakai tema yang menarik**
   - Mode gelap + warna aksen biru/ungu biasanya paling fotogenik
   - Background Midnight atau Cosmic memberi kesan premium
3. **Crop bagian browser** kalau ada — fokus ke isi aplikasi
4. **Compress sebelum upload** untuk hemat space repo
   - Tool gratis: [tinypng.com](https://tinypng.com), [squoosh.app](https://squoosh.app)

---

## Setelah Upload Gambar

Commit dan push:

```bash
git add docs/images/
git commit -m "Add README screenshots"
git push origin main
```

GitHub akan langsung me-render gambar di README utama. Bisa langsung dilihat di halaman repo.

---

## 🎨 Mau Banner Gampang?

Coba tools online gratis untuk bikin banner:

- [Canva](https://canva.com) — pilih template "GitHub Banner"
- [Figma](https://figma.com) — gratis dengan custom design
- [Cover.gallery](https://cover.gallery) — generator otomatis
- [Banner Generator](https://banners.beyondco.de) — text-based banner sederhana

Ukuran standar: **1280×640** atau **1200×400** pixel.
