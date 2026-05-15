<div align="center">

# 🍎 Digimap Roxy Square Jember

### Aplikasi Pencatatan Penjualan Counter HP — Mobile-First, iOS Style

[![Status](https://img.shields.io/badge/status-production-success?style=for-the-badge)](https://github.com/editormpi/Digimap-Roxy-Square-Jember)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chartdotjs&logoColor=white)](https://www.chartjs.org)

**[🌐 Live Demo](https://editormpi.github.io/Digimap-Roxy-Square-Jember/)** • **[📖 Dokumentasi](#-cara-setup-untuk-pemilik-baru)** • **[🐛 Report Bug](https://github.com/editormpi/Digimap-Roxy-Square-Jember/issues)**

![Banner](docs/images/banner.svg)

</div>

---

## 📑 Daftar Isi

- [✨ Fitur Unggulan](#-fitur-unggulan)
- [📸 Tampilan Aplikasi](#-tampilan-aplikasi)
- [🛠️ Teknologi](#%EF%B8%8F-teknologi)
- [🚀 Cara Setup (Untuk Pemilik Baru)](#-cara-setup-untuk-pemilik-baru)
- [📁 Struktur File](#-struktur-file)
- [🗂️ Struktur Database](#%EF%B8%8F-struktur-database)
- [💡 Tips & Troubleshooting](#-tips--troubleshooting)
- [📄 Lisensi](#-lisensi)

---

## ✨ Fitur Unggulan

<table>
<tr>
<td width="50%">

### 👥 Untuk Anggota
- 🔐 Login dengan PIN 4-digit
- 📝 Input penjualan per kategori
- 📊 Lihat histori sendiri
- 🏆 Cek ranking leaderboard
- 📈 Grafik penjualan bulanan
- ✏️ Edit inline data sendiri

</td>
<td width="50%">

### 👑 Untuk Super Admin
- ➕ Tambah / hapus anggota
- 🔑 Ganti PIN anggota
- 📸 Upload foto profil (auto-resize)
- 🗑️ Hapus histori penjualan
- 🎨 Ubah tema & background global
- 📤 Export Excel & Google Sheets

</td>
</tr>
</table>

<table>
<tr>
<td width="33%" align="center">

### 🎨
**Tema Lengkap**

32 preset warna aksen<br>
18 preset background<br>
+ color picker bebas

</td>
<td width="33%" align="center">

### 🌓
**Dark / Light Mode**

Glassmorphism iOS-style<br>
Smooth transition<br>
Persisten per device

</td>
<td width="33%" align="center">

### 📱
**Mobile-First**

PWA-ready<br>
Touch-optimized<br>
Safe-area iOS

</td>
</tr>
</table>

---

## 📸 Tampilan Aplikasi

<div align="center">

### 🔐 Login Screen
<img src="docs/images/screenshot-login.png" alt="Login Screen" width="300"/>

### 📝 Input Penjualan
<img src="docs/images/screenshot-input.png" alt="Input Form" width="300"/>

### 📊 Histori & Ranking
<table>
<tr>
<td><img src="docs/images/screenshot-history.png" alt="History" width="280"/></td>
<td><img src="docs/images/screenshot-rank.png" alt="Ranking" width="280"/></td>
</tr>
</table>

### 👑 Panel Admin
<img src="docs/images/screenshot-admin.png" alt="Admin Panel" width="300"/>

### 🎨 Tema & Background
<img src="docs/images/screenshot-theme.png" alt="Theme Picker" width="300"/>

</div>

> 💡 Screenshots di atas adalah placeholder. Ganti dengan tangkapan layar aplikasi Anda di folder [`docs/images/`](docs/images/).

---

## 🛠️ Teknologi

```
┌─────────────────────────────────────────────────┐
│  Frontend  │  HTML5 + CSS3 + Vanilla JS (ESM)   │
│  Backend   │  Firebase Realtime Database         │
│  Auth      │  PIN-based (no Firebase Auth)       │
│  Charts    │  Chart.js                           │
│  Alerts    │  SweetAlert2                        │
│  Export    │  SheetJS (xlsx) + Apps Script       │
│  Icons     │  Font Awesome 6                     │
│  Fonts     │  Inter (Google Fonts)               │
└─────────────────────────────────────────────────┘
```

> ⚡ **Zero build step.** Tidak perlu npm, webpack, atau bundler — langsung jalan di browser modern.

---

## 🚀 Cara Setup (Untuk Pemilik Baru)

> 👋 Ingin pakai aplikasi ini untuk usaha Anda sendiri? Ikuti **9 langkah** berikut.

### 📥 Langkah 1: Fork / Clone Repository

<details>
<summary><b>Klik di sini untuk lihat detail</b></summary>

#### Option A — Fork (Recommended)
1. Buka https://github.com/editormpi/Digimap-Roxy-Square-Jember
2. Klik tombol **Fork** di pojok kanan atas
3. Pilih akun Anda sebagai destination

#### Option B — Clone Manual
```bash
git clone https://github.com/editormpi/Digimap-Roxy-Square-Jember.git
cd Digimap-Roxy-Square-Jember
```

</details>

---

### 🔥 Langkah 2: Buat Project Firebase

| Langkah | Aksi |
|:---:|:---|
| 1️⃣ | Buka [Firebase Console](https://console.firebase.google.com) |
| 2️⃣ | Klik **Add project** → ikuti wizard |
| 3️⃣ | Beri nama (mis. `counter-saya`) |
| 4️⃣ | Pilih sidebar **Build → Realtime Database** |
| 5️⃣ | Klik **Create Database** |
| 6️⃣ | Pilih lokasi **`asia-southeast1` (Singapore)** untuk Indonesia |
| 7️⃣ | Pilih mode **Start in test mode** |

📸 **Petunjuk Visual:**
<img src="docs/images/guide-firebase-create.png" alt="Create Firebase Project" width="600"/>

---

### 🌐 Langkah 3: Daftarkan Web App

1. Di halaman **Project Overview**, klik ikon **`</>`** (Web)
2. Beri nama app (mis. `Digimap Web`)
3. Klik **Register app**
4. **Copy seluruh objek** `firebaseConfig` yang muncul

📸 **Petunjuk Visual:**
<img src="docs/images/guide-firebase-webapp.png" alt="Register Web App" width="600"/>

Bentuknya seperti ini:

```javascript
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

---

### 📋 Langkah 4: Tempel Config ke Aplikasi

1. Buka file [`app.js`](app.js) dengan text editor (mis. VSCode, Notepad++)
2. Cari baris yang dimulai dengan `const firebaseConfig = {` (sekitar baris 4-12)
3. **Replace seluruh objek** dengan config milik Anda dari Langkah 3
4. **Save**

```diff
- const firebaseConfig = {
-   apiKey: "AIzaSyC6PoHGLzZZKix8E8y2YVU6c8nThuGInAY",
-   // ... config lama
- };
+ const firebaseConfig = {
+   apiKey: "AIza...config_baru_anda",
+   // ... config baru
+ };
```

---

### 🛡️ Langkah 5: Pasang Security Rules

| | |
|:---:|:---|
| 1️⃣ | Buka **Firebase Console → Realtime Database → tab Rules** |
| 2️⃣ | Hapus seluruh isi editor (Ctrl+A → Delete) |
| 3️⃣ | Paste isi rules di bawah |
| 4️⃣ | Klik **Publish** |

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

📸 **Petunjuk Visual:**
<img src="docs/images/guide-firebase-rules.png" alt="Set Firebase Rules" width="600"/>

> ⚠️ **Catatan Keamanan:** Rules ini terbuka untuk siapa pun yang tahu URL database. Cocok untuk **tim internal kecil** yang sudah dilindungi PIN login. Untuk skala publik, perlu migrasi ke Firebase Authentication.

---

### 👑 Langkah 6: Buat Super User Pertama

Aplikasi butuh minimal 1 super user untuk akses panel admin. Pilih salah satu:

#### Cara A — Otomatis (Recommended)
Jalankan aplikasi (Langkah 7). Saat halaman pertama dimuat, kode `ensureSuperUser()` akan auto-membuat user `kiki` dengan PIN default **`1234`**.

> ⚠️ **WAJIB ganti PIN setelah login pertama!**

#### Cara B — Manual via Firebase Console
1. Buka **Realtime Database → tab Data**
2. Klik root → tambah child `members`
3. Di dalam `members` → tambah child `kiki` (huruf kecil semua)
4. Di dalam `kiki` → tambah field berikut:

| Field | Tipe | Value | Catatan |
|---|---|---|---|
| `pin` | **string** | `1234` | ⚠️ Harus string, bukan number |
| `isSuperUser` | boolean | `true` | |
| `displayName` | string | `Admin` | Nama yang ditampilkan di UI |
| `photo` | string | (kosong) | Akan diisi saat upload foto |

📸 **Petunjuk Visual:**
<img src="docs/images/guide-firebase-superuser.png" alt="Create Super User" width="600"/>

---

### 🌍 Langkah 7: Deploy Aplikasi

Aplikasi adalah **static HTML** — tidak perlu server backend. Pilih hosting:

<details>
<summary><b>🏠 Option A — Lokal via XAMPP / Live Server</b></summary>

```bash
# Copy folder ke htdocs XAMPP
cp -r Digimap-Roxy-Square-Jember/ /xampp/htdocs/

# Akses di browser
http://localhost/Digimap-Roxy-Square-Jember/
```

</details>

<details>
<summary><b>🐙 Option B — GitHub Pages (Gratis, Online)</b></summary>

1. Push folder ke repo GitHub Anda
2. Di repo → **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main`, folder: `/ (root)`
5. Klik **Save**
6. Tunggu ~1 menit
7. URL: `https://<username>.github.io/<repo-name>/`

</details>

<details>
<summary><b>⚡ Option C — Netlify / Vercel (Gratis, Cepat)</b></summary>

**Netlify:**
- Drag-and-drop folder ke https://app.netlify.com/drop

**Vercel:**
- Connect repo GitHub di https://vercel.com → deploy

</details>

---

### 🎉 Langkah 8: Login Pertama

```
1. Buka URL aplikasi Anda
2. Pilih "Admin" di dropdown nama
3. Masukkan PIN: 1234
4. Setelah masuk:
   ✅ Tab Admin → ganti PIN kiki dengan PIN aman
   ✅ Tambah anggota tim lewat tombol "Tambah Anggota"
   ✅ Ganti tema & background sesuai brand Anda
```

---

### 📊 Langkah 9 (Opsional): Setup Google Sheets Export

<details>
<summary><b>Klik untuk lihat cara setup integrasi Google Sheets</b></summary>

1. Buka Google Sheets baru — beri nama (mis. "Laporan Counter")
2. Menu **Extensions → Apps Script**
3. Hapus isi default → copy seluruh isi [`apps-script-template.gs`](apps-script-template.gs)
4. **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Klik **Deploy** → izinkan akses
6. **Copy Web app URL** yang muncul (berakhiran `/exec`)
7. Di aplikasi → tab Admin → **Kirim ke Google Sheet** → paste URL → Kirim

URL akan tersimpan di browser, tidak perlu paste ulang next time.

📸 **Petunjuk Visual:**
<img src="docs/images/guide-appsscript.png" alt="Apps Script Setup" width="600"/>

</details>

---

## 📁 Struktur File

```
📦 Digimap-Roxy-Square-Jember/
 ┣ 📜 index.html              # Markup utama (login + app shell)
 ┣ 🎨 style.css               # Semua styling + CSS Variables untuk theming
 ┣ ⚡ app.js                  # Logika aplikasi (ES Module + Firebase)
 ┣ 🛡️ firebase-rules.json     # Template Security Rules
 ┣ 📊 apps-script-template.gs # Template untuk Google Sheets integration
 ┣ 📖 README.md               # File ini
 ┗ 📂 docs/
   ┗ 📂 images/               # Screenshots & gambar petunjuk
```

### 🔧 Kustomisasi Cepat

| Mau ganti... | Edit file | Cari... |
|---|---|---|
| Nama kategori penjualan | `index.html` | `class="field-grid"` |
| Logic penyimpanan | `app.js` | function `submitForm` |
| Judul / brand | `index.html` | `<title>`, `<h1>` |
| Palette warna default | `app.js` | array `THEMES` |
| Preset background | `app.js` | array `BACKGROUNDS` |

---

## 🗂️ Struktur Database

```
🔥 your-firebase-db/
 ┣ 👥 members/
 ┃ ┣ kiki/
 ┃ ┃ ┣ pin: "1234"
 ┃ ┃ ┣ isSuperUser: true
 ┃ ┃ ┣ displayName: "Kiki (Admin)"
 ┃ ┃ ┗ photo: "data:image/jpeg;base64,..."
 ┃ ┗ nama-anggota/
 ┃   ┣ pin: "9876"
 ┃   ┣ isSuperUser: false
 ┃   ┣ displayName: "Nama Lengkap"
 ┃   ┗ photo: ""
 ┣ 💰 sales/
 ┃ ┗ <auto-id>/
 ┃   ┣ nama: "nama-anggota"
 ┃   ┣ tanggal: "15/05/2026"
 ┃   ┣ waktu: "14:30:25"
 ┃   ┣ timestamp: 1747318225000
 ┃   ┣ device: 1500000
 ┃   ┣ acc: 250000
 ┃   ┣ qoala: 0
 ┃   ┣ tsel: 100000
 ┃   ┣ isat: 50000
 ┃   ┣ xl: 0
 ┃   ┗ airpods: 2
 ┗ ⚙️ settings/
   ┣ theme: "#0a84ff"
   ┗ background: "midnight"
```

---

## 💡 Tips & Troubleshooting

<details>
<summary><b>❌ Error: <code>PERMISSION_DENIED</code> saat upload foto / ganti tema</b></summary>

**Penyebab:** Rules Firebase belum di-update.

**Solusi:** Buka **Firebase Console → Realtime Database → tab Rules** → paste isi dari [Langkah 5](#%EF%B8%8F-langkah-5-pasang-security-rules) → klik **Publish**.

</details>

<details>
<summary><b>❌ PIN tidak diterima padahal sudah benar</b></summary>

**Penyebab:** Field `pin` tersimpan sebagai **number**, bukan string.

**Solusi:** Di Firebase Console → klik field `pin` → hapus → ketik ulang. Pastikan ada tanda kutip `"1234"`.

</details>

<details>
<summary><b>❌ Dropdown nama kosong</b></summary>

**Penyebab:** Belum ada anggota di node `members`.

**Solusi:**
- Refresh halaman (kiki akan auto-dibuat), atau
- Tambah manual lewat Firebase Console seperti [Langkah 6](#-langkah-6-buat-super-user-pertama)

</details>

<details>
<summary><b>📦 Foto bikin database cepat penuh</b></summary>

Foto sudah di-resize otomatis ke **240px** dengan kualitas JPEG **78%**. Untuk skala besar:

- Edit `resizeImage()` di `app.js` — turunkan parameter ke `200` atau `180`
- Atau migrasi ke **Firebase Storage** (perlu enable di Firebase Console)

</details>

<details>
<summary><b>💾 Cara backup / restore data?</b></summary>

**Backup:** Firebase Console → Realtime Database → titik tiga di kanan atas → **Export JSON**

**Restore:** Sama, tapi pilih **Import JSON** di node root

> ⚠️ Import akan **menimpa** seluruh data di node tujuan. Pastikan klik node yang tepat sebelum import.

</details>

<details>
<summary><b>🔄 Cara update kode kalau ada fitur baru dari repo asli?</b></summary>

Kalau Anda fork repo ini:
```bash
git remote add upstream https://github.com/editormpi/Digimap-Roxy-Square-Jember.git
git fetch upstream
git merge upstream/main
```

> ⚠️ Jangan lupa cek `app.js` — jangan sampai `firebaseConfig` Anda ke-overwrite.

</details>

---

## 🤝 Kontribusi

Pull request & issue selalu welcome! Kalau Anda menambah fitur keren, share ke komunitas dengan submit PR.

```bash
# Fork → Clone → Branch → Code → PR
git checkout -b feature/nama-fitur-keren
git commit -m "Add: deskripsi fitur"
git push origin feature/nama-fitur-keren
```

---

## 📄 Lisensi

**MIT License** — bebas dipakai, dimodifikasi, dijual ulang.
Atribusi tidak wajib tapi diapresiasi 🙏

---

<div align="center">

### Made with ❤️ for Digimap Roxy Square Jember

⭐ Jika project ini membantu, jangan lupa **star** repo-nya!

[![Star History Chart](https://api.star-history.com/svg?repos=editormpi/Digimap-Roxy-Square-Jember&type=Date)](https://star-history.com/#editormpi/Digimap-Roxy-Square-Jember&Date)

</div>
