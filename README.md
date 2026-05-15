# Digimap Roxy Square Jember

Aplikasi web pencatatan penjualan harian counter HP dengan dashboard real-time, leaderboard, dan panel admin. Dibuat dengan HTML/CSS/JS murni + Firebase Realtime Database.

![Status](https://img.shields.io/badge/status-production-green) ![License](https://img.shields.io/badge/license-MIT-blue)

---

## Fitur

- **Login PIN** per anggota (4 digit)
- **Input penjualan harian** per kategori: Device, Accessories, Qoala, Telkomsel, Indosat, XL, Airpods
- **Histori** dengan edit inline per kolom
- **Leaderboard** ranking penjualan dengan avatar
- **Grafik bulanan** penjualan
- **Dark mode / Light mode** dengan animasi halus
- **32 preset warna aksen** + color picker bebas
- **18 preset background** + color picker bebas (gradient & solid)
- **Panel Admin (Super User)**:
  - Tambah / hapus anggota
  - Ganti nama tampilan
  - Ganti PIN
  - Ganti foto profil (auto-resize ke base64)
  - Ubah tema & background global
  - Export Excel dengan filter per anggota & per bulan
  - Export langsung ke Google Sheets via Apps Script
- **Permission**: anggota hanya bisa lihat/edit data sendiri; super user bisa lihat semua
- **PWA-ready** (iOS-style UI, mobile-first, glassmorphism)

---

## Stack

- **Frontend**: HTML5, CSS3 (CSS Variables), Vanilla JS (ES Modules)
- **Backend**: Firebase Realtime Database (no auth — pakai PIN)
- **Library**: Chart.js, SweetAlert2, SheetJS (xlsx), Font Awesome
- **Font**: Inter (Google Fonts)

Tidak ada build step, tidak perlu npm, langsung jalan di browser.

---

## Cara Setup (untuk pemilik baru)

Berikut langkah lengkap kalau Anda ingin pakai aplikasi ini untuk usaha Anda sendiri.

### 1. Fork / Clone repo ini

```bash
git clone https://github.com/editormpi/Digimap-Roxy-Square-Jember.git
cd Digimap-Roxy-Square-Jember
```

Atau klik tombol **Fork** di pojok kanan atas GitHub.

### 2. Buat project Firebase

1. Buka https://console.firebase.google.com → **Add project**
2. Beri nama (mis. `counter-saya`) → ikuti wizard sampai selesai
3. Di sidebar kiri pilih **Build → Realtime Database** → **Create Database**
4. Pilih lokasi (rekomendasi: **Singapore** `asia-southeast1` untuk Indonesia)
5. Pilih mode **Start in test mode** (kita ganti rules nanti)

### 3. Daftarkan Web App di Firebase

1. Di halaman **Project Overview**, klik ikon **`</>`** (Web)
2. Beri nama app (mis. `Digimap Web`) → **Register app**
3. Akan muncul kode `firebaseConfig`. **Copy seluruh objek itu** — bentuknya seperti:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "counter-saya.firebaseapp.com",
  databaseURL: "https://counter-saya-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "counter-saya",
  storageBucket: "counter-saya.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123:web:abcdef"
};
```

### 4. Tempel config ke aplikasi

1. Buka [`app.js`](app.js) dengan text editor
2. Cari baris yang dimulai dengan `const firebaseConfig = {` (sekitar baris 4-12)
3. **Ganti seluruh objek** dengan config milik Anda dari langkah 3
4. **Save**

### 5. Pasang Security Rules di Firebase

1. Di Firebase Console → **Realtime Database** → tab **Rules**
2. Hapus seluruh isi editor
3. Paste isi file [`firebase-rules.json`](firebase-rules.json):

```json
{
  "rules": {
    "members": {
      ".read": true,
      ".write": true
    },
    "settings": {
      ".read": true,
      ".write": true
    },
    "sales": {
      ".read": true,
      ".write": true,
      ".indexOn": ["timestamp", "nama"]
    }
  }
}
```

4. Klik **Publish**

> ⚠️ Rules ini terbuka untuk siapa saja yang tahu URL database. Cocok untuk tim internal kecil yang sudah dilindungi PIN login. Untuk publik / multi-tenant, perlu migrasi ke Firebase Authentication.

### 6. Buat Super User pertama (`kiki`)

Karena aplikasi butuh minimal 1 super user untuk akses panel admin, tambahkan node `members/kiki` di Firebase:

**Cara A — Otomatis lewat aplikasi:**

Jalankan aplikasi (lihat langkah 7). Saat halaman dimuat, kode `ensureSuperUser()` akan auto-membuat `kiki` dengan PIN default `1234`.

**Cara B — Manual via Firebase Console (lebih aman):**

1. Di Firebase Console → **Realtime Database** → tab **Data**
2. Klik root → tambah child **`members`**
3. Di dalam `members` → tambah child **`kiki`** (huruf kecil semua)
4. Di dalam `kiki` → tambah 4 field:

| Field | Tipe | Value |
|---|---|---|
| `pin` | string | `1234` (atau PIN pilihan Anda) |
| `isSuperUser` | boolean | `true` |
| `displayName` | string | `Admin Saya` |
| `photo` | string | (kosongkan) |

> **PENTING**: Field `pin` harus disimpan sebagai **string**, bukan number. Kalau Firebase otomatis ubah jadi number, hapus dan ketik ulang.

### 7. Jalankan aplikasi

Aplikasi adalah static HTML — tidak perlu server backend. Pilih salah satu cara:

**A) Lokal via XAMPP / live server:**
- Copy folder ini ke `htdocs/` XAMPP
- Buka http://localhost/Digimap-Roxy-Square-Jember/

**B) GitHub Pages (gratis, online):**
1. Push folder ini ke repo GitHub Anda
2. Di repo → **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main`, folder: `/ (root)` → **Save**
5. Tunggu ~1 menit → aplikasi tersedia di `https://<username>.github.io/<repo-name>/`

**C) Netlify / Vercel (gratis):**
- Drag-and-drop folder ke https://app.netlify.com/drop, atau
- Connect repo GitHub di https://vercel.com → deploy

### 8. Login pertama

1. Buka URL aplikasi
2. Pilih **Kiki (Admin)** di dropdown
3. Masukkan PIN **`1234`** (atau yang Anda set di langkah 6)
4. Setelah masuk, **WAJIB SEGERA**:
   - Tab **Admin** → klik ikon kunci di samping kiki → ganti PIN baru
   - Tambah anggota tim lewat tombol **Tambah Anggota**

### 9. (Opsional) Setup Google Sheets Export

Kalau ingin tombol "Kirim ke Google Sheet" berfungsi:

1. Buka Google Sheets baru — beri nama (mis. "Laporan Counter")
2. **Extensions → Apps Script**
3. Hapus isi default → copy seluruh isi file [`apps-script-template.gs`](apps-script-template.gs)
4. **Deploy → New deployment → Type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Klik **Deploy** → izinkan akses → **copy Web app URL** yang muncul
6. Di aplikasi → tab Admin → **Kirim ke Google Sheet** → paste URL → Kirim

URL akan tersimpan di browser, tidak perlu paste ulang.

---

## Struktur File

```
Digimap-Roxy-Square-Jember/
├── index.html              # Markup utama (login + app shell)
├── style.css               # Semua styling (CSS Variables untuk theming)
├── app.js                  # Logika aplikasi (ES Module, import Firebase)
├── firebase-rules.json     # Template Security Rules
├── apps-script-template.gs # Template Apps Script untuk export Sheets
└── README.md               # File ini
```

Untuk kustomisasi:
- **Ganti nama kategori penjualan** (Device, Accessories, dst): edit `index.html` (cari section "field-grid") dan `app.js` (fungsi `submitForm` dan `loadHistory`).
- **Ganti nama brand / judul**: edit `index.html` (cari `<title>`, `<h1>Digimap</h1>`, dan `Roxy Square Jember`).
- **Ganti palette default**: edit array `THEMES` dan `BACKGROUNDS` di `app.js`.

---

## Struktur Database

```
your-firebase-db/
├── members/
│   ├── kiki/
│   │   ├── pin: "1234"
│   │   ├── isSuperUser: true
│   │   ├── displayName: "Kiki (Admin)"
│   │   └── photo: "data:image/jpeg;base64,..."
│   └── nama-anggota/
│       ├── pin: "9876"
│       ├── isSuperUser: false
│       ├── displayName: "Nama Lengkap"
│       └── photo: ""
├── sales/
│   └── <auto-id>/
│       ├── nama: "nama-anggota"
│       ├── tanggal: "15/05/2026"
│       ├── waktu: "14:30:25"
│       ├── timestamp: 1747318225000
│       ├── device: 1500000
│       ├── acc: 250000
│       ├── qoala: 0
│       ├── tsel: 100000
│       ├── isat: 50000
│       ├── xl: 0
│       └── airpods: 2
└── settings/
    ├── theme: "#0a84ff"
    └── background: "midnight"
```

---

## Tips & Troubleshooting

**Q: Error `PERMISSION_DENIED` saat upload foto / ganti tema**
→ Rules Firebase belum di-update. Pasang isi `firebase-rules.json` di tab Rules.

**Q: PIN tidak diterima padahal sudah benar**
→ Cek di Firebase Console, pastikan field `pin` tipe **string** (ada tanda kutip), bukan number.

**Q: Dropdown nama kosong**
→ Belum ada anggota di node `members`. Buat manual atau biarkan kode auto-create kiki.

**Q: Foto terlalu besar bikin DB cepat penuh**
→ Foto sudah di-resize otomatis ke 240px JPEG kualitas 78%. Kalau mau lebih kecil, ubah parameter di `resizeImage()` di `app.js`. Untuk skala besar, pertimbangkan migrasi ke Firebase Storage.

**Q: Gimana cara backup data?**
→ Firebase Console → Realtime Database → titik tiga di kanan atas → **Export JSON**.

**Q: Gimana cara restore?**
→ Sebaliknya: **Import JSON** di node root.

---

## Lisensi

MIT — bebas dipakai, dimodif, dijual ulang. Atribusi tidak wajib tapi diapresiasi.

---

## Kredit

Dikembangkan untuk Digimap Roxy Square Jember.
Kontribusi & issue: silakan buka di repo asli.
