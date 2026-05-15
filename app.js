import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, set, push, update, remove, query, orderByChild, limitToLast, equalTo } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6PoHGLzZZKix8E8y2YVU6c8nThuGInAY",
  authDomain: "digimap-roxy-square-jember.firebaseapp.com",
  databaseURL: "https://digimap-roxy-square-jember-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "digimap-roxy-square-jember",
  storageBucket: "digimap-roxy-square-jember.firebasestorage.app",
  messagingSenderId: "901305100636",
  appId: "1:901305100636:web:88332450725205cb217999"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const SESSION_KEY = 'digimap_session';
const THEME_KEY = 'digimap_theme';
const MODE_KEY = 'digimap_mode';
const GSHEET_KEY = 'digimap_gsheet_url';
const SUPER_USER = 'kiki';

let myChart = null;
let currentUser = null;
let isSuperUser = false;

const formatRp = (n) => new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0 }).format(n);

// ===== THEME PRESETS — 32 warna =====
const THEMES = [
  { id: 'blue',       name: 'Biru iOS',     color: '#0a84ff' },
  { id: 'ocean',      name: 'Ocean',        color: '#0077be' },
  { id: 'navy',       name: 'Navy',         color: '#1e3a8a' },
  { id: 'indigo',     name: 'Indigo',       color: '#5e5ce6' },
  { id: 'purple',     name: 'Ungu',         color: '#bf5af2' },
  { id: 'violet',     name: 'Violet',       color: '#8b5cf6' },
  { id: 'magenta',    name: 'Magenta',      color: '#d946ef' },
  { id: 'pink',       name: 'Pink',         color: '#ff375f' },
  { id: 'rose',       name: 'Rose',         color: '#f43f5e' },
  { id: 'red',        name: 'Merah',        color: '#ff453a' },
  { id: 'crimson',    name: 'Crimson',      color: '#dc2626' },
  { id: 'maroon',     name: 'Maroon',       color: '#7f1d1d' },
  { id: 'orange',     name: 'Oranye',       color: '#ff9f0a' },
  { id: 'coral',      name: 'Coral',        color: '#fb7185' },
  { id: 'amber',      name: 'Amber',        color: '#f59e0b' },
  { id: 'yellow',     name: 'Kuning',       color: '#ffd60a' },
  { id: 'gold',       name: 'Gold',         color: '#eab308' },
  { id: 'lime',       name: 'Lime',         color: '#84cc16' },
  { id: 'green',      name: 'Hijau iOS',    color: '#30d158' },
  { id: 'emerald',    name: 'Emerald',      color: '#10b981' },
  { id: 'forest',     name: 'Forest',       color: '#166534' },
  { id: 'teal',       name: 'Teal',         color: '#14b8a6' },
  { id: 'mint',       name: 'Mint',         color: '#63e6e2' },
  { id: 'cyan',       name: 'Cyan',         color: '#06b6d4' },
  { id: 'sky',        name: 'Sky',          color: '#5ac8fa' },
  { id: 'slate',      name: 'Slate',        color: '#64748b' },
  { id: 'gray',       name: 'Gray',         color: '#71717a' },
  { id: 'stone',      name: 'Stone',        color: '#78716c' },
  { id: 'brown',      name: 'Brown',        color: '#92400e' },
  { id: 'bronze',     name: 'Bronze',       color: '#a16207' },
  { id: 'black',      name: 'Hitam',        color: '#1c1c1e' },
  { id: 'silver',     name: 'Silver',       color: '#a8a29e' }
];

// ===== BACKGROUND PRESETS =====
const BACKGROUNDS = [
  { id: 'default-dark',   name: 'Default Gelap',  type: 'default', mode: 'dark' },
  { id: 'default-light',  name: 'Default Terang', type: 'default', mode: 'light' },
  { id: 'midnight',       name: 'Midnight',       css: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },
  { id: 'sunset',         name: 'Sunset',         css: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)' },
  { id: 'ocean',          name: 'Ocean',          css: 'linear-gradient(135deg, #2e3192 0%, #1bffff 100%)' },
  { id: 'aurora',         name: 'Aurora',         css: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)' },
  { id: 'forest',         name: 'Forest',         css: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)' },
  { id: 'lavender',       name: 'Lavender',       css: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { id: 'peach',          name: 'Peach',          css: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: 'mint',           name: 'Mint',           css: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
  { id: 'rose-gold',      name: 'Rose Gold',      css: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)' },
  { id: 'cosmic',         name: 'Cosmic',         css: 'linear-gradient(135deg, #4776e6 0%, #8e54e9 100%)' },
  { id: 'fire',           name: 'Fire',           css: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)' },
  { id: 'emerald',        name: 'Emerald',        css: 'linear-gradient(135deg, #348f50 0%, #56b4d3 100%)' },
  { id: 'royal',          name: 'Royal',          css: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)' },
  { id: 'cherry',         name: 'Cherry',         css: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)' },
  { id: 'mono-black',     name: 'Solid Hitam',    css: '#000000' },
  { id: 'mono-white',     name: 'Solid Putih',    css: '#f2f2f7' }
];

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

function applyAccent(color) {
  const rgb = hexToRgb(color);
  document.documentElement.style.setProperty('--accent', color);
  document.documentElement.style.setProperty('--accent-rgb', rgb);
  localStorage.setItem(THEME_KEY, color);
  document.querySelectorAll('.theme-swatch').forEach(s => s.classList.toggle('active', s.dataset.color === color));
  const inp = document.getElementById('custom_accent');
  if (inp) inp.value = color;
}

function applyBackground(bgId) {
  const root = document.documentElement;
  if (!bgId || bgId === 'default-dark' || bgId === 'default-light') {
    root.style.removeProperty('--bg-custom');
    if (bgId === 'default-light') applyMode('light');
    if (bgId === 'default-dark') applyMode('dark');
    localStorage.setItem('digimap_bg', bgId || '');
  } else if (bgId.startsWith('#')) {
    root.style.setProperty('--bg-custom', bgId);
    localStorage.setItem('digimap_bg', bgId);
  } else {
    const bg = BACKGROUNDS.find(b => b.id === bgId);
    if (bg && bg.css) {
      root.style.setProperty('--bg-custom', bg.css);
      localStorage.setItem('digimap_bg', bgId);
    }
  }
  document.querySelectorAll('.bg-swatch').forEach(s => s.classList.toggle('active', s.dataset.bg === bgId));
}

// Legacy alias
function applyTheme(input) {
  // Accept old preset id or hex
  if (typeof input === 'string' && input.startsWith('#')) {
    applyAccent(input);
  } else {
    const t = THEMES.find(x => x.id === input);
    applyAccent(t ? t.color : '#0a84ff');
  }
}
function applyMode(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem(MODE_KEY, mode);
  const icon = document.querySelector('#btn_theme i');
  if (icon) icon.className = mode === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
}
async function loadGlobalTheme() {
  try {
    const snap = await get(ref(db, 'settings'));
    const s = snap.exists() ? snap.val() : {};
    applyTheme(s.theme || localStorage.getItem(THEME_KEY) || '#0a84ff');
    if (s.background) applyBackground(s.background);
    else {
      const local = localStorage.getItem('digimap_bg');
      if (local) applyBackground(local);
    }
  } catch {
    applyTheme(localStorage.getItem(THEME_KEY) || '#0a84ff');
    const local = localStorage.getItem('digimap_bg');
    if (local) applyBackground(local);
  }
}
applyMode(localStorage.getItem(MODE_KEY) || 'dark');

// iOS-style SweetAlert preset (light-aware)
function swalBase() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  return {
    background: isLight ? '#fff' : '#1c1c1e',
    color: isLight ? '#1c1c1e' : '#fff',
    confirmButtonColor: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#0a84ff',
    cancelButtonColor: isLight ? '#aeaeb2' : '#3a3a3c'
  };
}
const swal = (opts) => Swal.fire({ ...swalBase(), ...opts });

function getSession() { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch(e) { return null; } }
function setSession(nama) { localStorage.setItem(SESSION_KEY, JSON.stringify({ nama, loginAt: Date.now() })); }
function clearSession() { localStorage.removeItem(SESSION_KEY); }

// ===== BOOTSTRAP super user =====
async function ensureSuperUser() {
  try {
    const snap = await get(ref(db, `members/${SUPER_USER}`));
    if (!snap.exists()) {
      await set(ref(db, `members/${SUPER_USER}`), {
        pin: '1234',
        isSuperUser: true,
        displayName: 'Kiki (Admin)',
        photo: ''
      });
    } else if (!snap.val().isSuperUser) {
      await update(ref(db, `members/${SUPER_USER}`), { isSuperUser: true });
    }
  } catch (e) { console.error('ensureSuperUser:', e); }
}

(async () => {
  await ensureSuperUser();
  await loadGlobalTheme();
  const session = getSession();
  if (session && session.nama) showApp(session.nama); else showLogin();
})();

function showLogin() {
  document.getElementById('view_app').classList.add('hidden');
  document.getElementById('view_login').classList.remove('hidden');
  loadMembers();
  setupPinInputs();
}

async function loadMembers() {
  const select = document.getElementById('login_nama');
  try {
    const snap = await get(ref(db, 'members'));
    select.innerHTML = '<option value="">-- Pilih Nama --</option>';
    if (snap.exists()) {
      Object.keys(snap.val()).sort().forEach(nama => {
        const o = document.createElement('option');
        o.value = nama;
        const m = snap.val()[nama];
        o.textContent = m.displayName || nama;
        select.appendChild(o);
      });
    }
  } catch (err) { swal({ title: 'Error', text: err.message, icon: 'error' }); }
}

function setupPinInputs() {
  const boxes = document.querySelectorAll('.pin-box');
  boxes.forEach((box, i) => {
    box.value = '';
    box.oninput = function() {
      this.value = this.value.replace(/\D/g, '').slice(0, 1);
      if (this.value && i < boxes.length - 1) boxes[i + 1].focus();
    };
    box.onkeydown = function(e) {
      if (e.key === 'Backspace' && !this.value && i > 0) boxes[i - 1].focus();
      if (e.key === 'Enter') doLogin();
    };
  });
  setTimeout(() => boxes[0].focus(), 200);
}

function getPinValue() {
  return Array.from(document.querySelectorAll('.pin-box')).map(b => b.value).join('');
}

async function doLogin() {
  const nama = document.getElementById('login_nama').value;
  const pin = getPinValue();
  if (!nama) return swal({ title: 'Oops', text: 'Pilih nama dulu.', icon: 'warning' });
  if (!/^\d{4}$/.test(pin)) return swal({ title: 'Oops', text: 'PIN harus 4 digit.', icon: 'warning' });

  const btn = document.getElementById('btn_login');
  const ori = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Memeriksa...'; btn.disabled = true;
  try {
    const snap = await get(ref(db, `members/${nama}`));
    if (!snap.exists()) {
      swal({ title: 'Login Gagal', text: 'Nama tidak ditemukan.', icon: 'error' });
    } else if (snap.val().pin !== pin) {
      swal({ title: 'Login Gagal', text: 'PIN salah.', icon: 'error' });
      document.querySelectorAll('.pin-box').forEach(b => b.value = '');
      document.querySelectorAll('.pin-box')[0].focus();
    } else {
      setSession(nama);
      swal({ title: 'Berhasil!', text: 'Hi, ' + (snap.val().displayName || nama), icon: 'success', timer: 1000, showConfirmButton: false })
        .then(() => showApp(nama));
    }
  } catch (err) { swal({ title: 'Error', text: err.message, icon: 'error' }); }
  finally { btn.innerHTML = ori; btn.disabled = false; }
}

async function showApp(nama) {
  document.getElementById('view_login').classList.add('hidden');
  document.getElementById('view_app').classList.remove('hidden');
  currentUser = nama;

  try {
    const snap = await get(ref(db, `members/${nama}`));
    const m = snap.exists() ? snap.val() : {};
    isSuperUser = !!m.isSuperUser;
    document.getElementById('user_name').innerText = m.displayName || nama;
    renderAvatar(document.getElementById('user_avatar_wrap'), m.photo, m.displayName || nama, false);
  } catch {
    isSuperUser = false;
    document.getElementById('user_name').innerText = nama;
  }

  document.getElementById('tab_admin').classList.toggle('hidden', !isSuperUser);
  // Tombol export di toolbar history: hanya untuk admin
  document.getElementById('btn_export').classList.toggle('hidden', !isSuperUser);
  setupUangInputs();
  switchTab('input');
}

function renderAvatar(el, photoUrl, name, isLarge) {
  if (!el) return;
  const cls = isLarge ? 'avatar avatar-lg' : 'avatar';
  if (photoUrl) {
    el.outerHTML = `<img class="${cls}" id="${el.id || ''}" src="${photoUrl}" alt="${name}">`;
  } else {
    const initial = (name || '?').trim().charAt(0).toUpperCase();
    const fbCls = isLarge ? 'avatar-fallback avatar-lg' : 'avatar-fallback';
    el.outerHTML = `<div class="${fbCls}" id="${el.id || ''}">${initial}</div>`;
  }
}

function doLogout() {
  swal({ title: 'Logout?', text: 'Yakin mau keluar?', icon: 'question', showCancelButton: true, confirmButtonText: 'Ya, Logout', cancelButtonText: 'Batal', confirmButtonColor: '#ff453a' })
    .then(res => { if (res.isConfirmed) { clearSession(); currentUser = null; isSuperUser = false; location.reload(); } });
}

function switchTab(tab) {
  ['input','history','rank','chart','admin'].forEach(t => {
    const el = document.getElementById('view_' + t);
    if (el) el.classList.add('hidden');
  });
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const v = document.getElementById('view_' + tab);
  if (v) v.classList.remove('hidden');
  const btn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
  if (btn) btn.classList.add('active');
  if (tab === 'history') loadHistory();
  if (tab === 'rank') loadRank();
  if (tab === 'chart') loadChart();
  if (tab === 'admin') loadAdmin();
}

function setupUangInputs() {
  document.querySelectorAll('.uang-input').forEach(input => {
    input.oninput = function() {
      let v = this.value.replace(/[^,\d]/g, '');
      this.value = v ? parseInt(v, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
      hitungTotal();
    };
  });
}

function cleanNumber(str) { return str ? Number(str.replace(/\./g, '')) : 0; }
function hitungTotal() {
  const t = cleanNumber(document.getElementById('val_device').value)
          + cleanNumber(document.getElementById('val_accessories').value)
          + cleanNumber(document.getElementById('val_qoala').value)
          + cleanNumber(document.getElementById('val_telkomsel').value)
          + cleanNumber(document.getElementById('val_indosat').value)
          + cleanNumber(document.getElementById('val_xl').value);
  document.getElementById('total_display').innerText = 'Rp ' + formatRp(t);
}

async function submitForm() {
  const session = getSession();
  if (!session) return doLogout();
  const btn = document.getElementById('btn_submit');
  const ori = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Menyimpan...'; btn.disabled = true;

  const now = new Date();
  const payload = {
    nama: session.nama,
    tanggal: now.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    waktu: now.toLocaleTimeString('id-ID', { hour12: false }),
    timestamp: now.getTime(),
    device: cleanNumber(document.getElementById('val_device').value),
    acc: cleanNumber(document.getElementById('val_accessories').value),
    qoala: cleanNumber(document.getElementById('val_qoala').value),
    tsel: cleanNumber(document.getElementById('val_telkomsel').value),
    isat: cleanNumber(document.getElementById('val_indosat').value),
    xl: cleanNumber(document.getElementById('val_xl').value),
    airpods: Number(document.getElementById('val_airpods').value) || 0
  };

  try {
    await push(ref(db, 'sales'), payload);
    swal({ title: 'Berhasil!', text: 'Data tersimpan.', icon: 'success', timer: 1200, showConfirmButton: false });
    document.querySelectorAll('.uang-input').forEach(i => i.value = '');
    document.getElementById('val_airpods').value = '';
    hitungTotal();
  } catch (err) { swal({ title: 'Error', text: err.message, icon: 'error' }); }
  finally { btn.innerHTML = ori; btn.disabled = false; }
}

async function loadHistory() {
  const limit = parseInt(document.getElementById('limit_history').value, 10);
  const c = document.getElementById('history_container');
  c.innerHTML = '<div class="loading"><i class="fas fa-circle-notch fa-spin"></i></div>';
  try {
    // Non-admin: query hanya entries milik sendiri (by nama), supaya limit tidak terpotong data orang lain.
    const q = isSuperUser
      ? query(ref(db, 'sales'), orderByChild('timestamp'), limitToLast(limit))
      : query(ref(db, 'sales'), orderByChild('nama'), equalTo(currentUser));
    const snap = await get(q);
    if (!snap.exists()) { c.innerHTML = '<div class="empty-state">Belum ada histori.</div>'; return; }
    const items = [];
    snap.forEach(child => { items.push({ id: child.key, ...child.val() }); });
    // Untuk non-admin: sort by timestamp desc dan potong sesuai limit dropdown
    if (!isSuperUser) {
      items.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      items.length = Math.min(items.length, limit);
    } else {
      items.reverse();
    }
    const filtered = items;

    if (!filtered.length) { c.innerHTML = '<div class="empty-state">Belum ada histori.</div>'; return; }

    let html = '';
    filtered.forEach(item => {
      const delBtn = isSuperUser
        ? `<button class="hist-del" data-del="${item.id}|${item.nama}|${item.tanggal}" title="Hapus histori"><i class="fas fa-trash"></i></button>`
        : '';
      html += `<div class="history-card glass"><div class="history-card-head"><div><p class="name">${item.nama}</p><p class="meta">${item.tanggal} • ${item.waktu}</p></div><div class="hist-head-acts"><span class="id-tag">${item.id.slice(-6)}</span>${delBtn}</div></div><div class="history-grid"><div class="history-item" data-edit="${item.id}|device|Device|${item.device||0}"><span class="key">Device</span><span class="value">${formatRp(item.device||0)} <i class="fas fa-pen" style="font-size:9px"></i></span></div><div class="history-item" data-edit="${item.id}|acc|Accessories|${item.acc||0}"><span class="key">Acc</span><span class="value">${formatRp(item.acc||0)} <i class="fas fa-pen" style="font-size:9px"></i></span></div><div class="history-item" data-edit="${item.id}|qoala|Qoala|${item.qoala||0}"><span class="key">Qoala</span><span class="value">${formatRp(item.qoala||0)} <i class="fas fa-pen" style="font-size:9px"></i></span></div><div class="history-item" data-edit="${item.id}|tsel|Telkomsel|${item.tsel||0}"><span class="key">Tsel</span><span class="value">${formatRp(item.tsel||0)} <i class="fas fa-pen" style="font-size:9px"></i></span></div><div class="history-item" data-edit="${item.id}|isat|Indosat|${item.isat||0}"><span class="key">Isat</span><span class="value">${formatRp(item.isat||0)} <i class="fas fa-pen" style="font-size:9px"></i></span></div><div class="history-item" data-edit="${item.id}|xl|XL|${item.xl||0}"><span class="key">XL</span><span class="value">${formatRp(item.xl||0)} <i class="fas fa-pen" style="font-size:9px"></i></span></div><div class="history-item airpods" data-edit="${item.id}|airpods|Airpods (Qty)|${item.airpods||0}"><span class="key">Airpods (Qty)</span><span class="value">${item.airpods||0} <i class="fas fa-pen" style="font-size:9px"></i></span></div></div></div>`;
    });
    c.innerHTML = html;
    c.querySelectorAll('[data-edit]').forEach(el => {
      el.onclick = () => {
        const [id, col, label, oldVal] = el.dataset.edit.split('|');
        promptEdit(id, col, label, Number(oldVal));
      };
    });
    c.querySelectorAll('[data-del]').forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation();
        const [id, nama, tanggal] = el.dataset.del.split('|');
        deleteHistory(id, nama, tanggal);
      };
    });
  } catch (err) { c.innerHTML = '<div class="empty-state" style="color:#ff453a">' + err.message + '</div>'; }
}

async function deleteHistory(id, nama, tanggal) {
  if (!isSuperUser) return;
  const r = await swal({
    title: 'Hapus Histori?',
    html: `Yakin hapus data <b>${nama}</b><br>tanggal <b>${tanggal}</b>?<br><small style="opacity:0.6">Tidak bisa dibatalkan.</small>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Hapus',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#ff453a'
  });
  if (!r.isConfirmed) return;
  swal({ title: 'Menghapus...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
  try {
    await remove(ref(db, `sales/${id}`));
    swal({ title: 'Dihapus', icon: 'success', timer: 800, showConfirmButton: false });
    loadHistory();
  } catch (err) { swal({ title: 'Error', text: err.message, icon: 'error' }); }
}

async function promptEdit(id, col, label, oldVal) {
  // Defensif: non-admin hanya boleh edit data sendiri
  if (!isSuperUser) {
    try {
      const own = await get(ref(db, `sales/${id}/nama`));
      if (!own.exists() || own.val() !== currentUser) {
        return swal({ title: 'Tidak diizinkan', text: 'Anda hanya bisa mengedit data sendiri.', icon: 'warning' });
      }
    } catch (e) { return swal({ title: 'Error', text: e.message, icon: 'error' }); }
  }
  const r = await swal({ title: `Koreksi ${label}`, text: `Angka lama: ${oldVal}`, input: 'number', inputValue: oldVal, showCancelButton: true, confirmButtonText: 'Simpan', cancelButtonText: 'Batal' });
  if (!r.isConfirmed) return;
  swal({ title: 'Memproses...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
  try {
    await update(ref(db, `sales/${id}`), { [col]: Number(r.value) || 0 });
    swal({ title: 'Sukses', icon: 'success', timer: 800, showConfirmButton: false });
    loadHistory();
  } catch (err) { swal({ title: 'Error', text: err.message, icon: 'error' }); }
}

async function loadRank() {
  const c = document.getElementById('rank_container');
  c.innerHTML = '<div class="loading"><i class="fas fa-circle-notch fa-spin"></i></div>';
  try {
    const [salesSnap, memSnap] = await Promise.all([
      get(ref(db, 'sales')),
      get(ref(db, 'members'))
    ]);
    const members = memSnap.exists() ? memSnap.val() : {};
    const leaders = {};
    if (salesSnap.exists()) {
      salesSnap.forEach(child => {
        const r = child.val();
        if (members[r.nama]?.isSuperUser) return; // exclude super user
        const total = (r.device||0)+(r.acc||0)+(r.qoala||0)+(r.tsel||0)+(r.isat||0)+(r.xl||0);
        if (!leaders[r.nama]) leaders[r.nama] = { total: 0, airpods: 0 };
        leaders[r.nama].total += total;
        leaders[r.nama].airpods += (r.airpods || 0);
      });
    }
    const arr = Object.keys(leaders).map(k => ({
      name: k,
      displayName: members[k]?.displayName || k,
      photo: members[k]?.photo || '',
      ...leaders[k]
    })).sort((a,b) => b.total - a.total);
    let html = '';
    arr.forEach((item, i) => {
      let badge = `<span style="color:${i<3?'var(--ios-text)':'var(--ios-text-3)'}">${i + 1}</span>`;
      if (i === 0) badge = `<i class="fas fa-medal" style="color:#ffd60a"></i>`;
      if (i === 1) badge = `<i class="fas fa-medal" style="color:#aeaeb2"></i>`;
      if (i === 2) badge = `<i class="fas fa-medal" style="color:#a2734c"></i>`;
      const avatarHtml = item.photo
        ? `<img class="avatar" src="${item.photo}" alt="">`
        : `<div class="avatar-fallback">${item.displayName.charAt(0).toUpperCase()}</div>`;
      html += `<div class="rank-card glass"><div class="rank-badge">${badge}</div>${avatarHtml}<div class="rank-info"><p class="name">${item.displayName}</p><p class="sub"><i class="fas fa-headphones"></i> ${item.airpods} Airpods</p></div><div class="rank-total"><p class="l">Penjualan</p><p class="v">Rp ${formatRp(item.total)}</p></div></div>`;
    });
    if (!html) html = '<div class="empty-state">Belum ada data.</div>';
    c.innerHTML = html;
  } catch (err) { c.innerHTML = '<div class="empty-state" style="color:#ff453a">' + err.message + '</div>'; }
}

async function loadChart() {
  try {
    const snap = await get(ref(db, 'sales'));
    const monthly = {};
    const monthNames = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
    if (snap.exists()) {
      snap.forEach(child => {
        const r = child.val();
        const d = new Date(r.timestamp);
        const key = monthNames[d.getMonth()] + ' ' + d.getFullYear();
        const total = (r.device||0)+(r.acc||0)+(r.qoala||0)+(r.tsel||0)+(r.isat||0)+(r.xl||0);
        // Non-admin: hanya data sendiri
        if (!isSuperUser && r.nama !== currentUser) return;
        monthly[key] = (monthly[key] || 0) + total;
      });
    }
    const labels = Object.keys(monthly);
    const data = labels.map(k => monthly[k]);
    const ctx = document.getElementById('monthlyChart').getContext('2d');
    if (myChart) myChart.destroy();
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#0a84ff';
    const accentRgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '10, 132, 255';
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Total (Rp)', data,
          backgroundColor: c => {
            const g = c.chart.ctx.createLinearGradient(0, 0, 0, 300);
            g.addColorStop(0, accent); g.addColorStop(1, `rgba(${accentRgb}, 0.2)`);
            return g;
          },
          borderRadius: 8, borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' }, ticks: { color: isLight ? '#666' : '#999', callback: v => v >= 1000000 ? (v/1000000) + 'Jt' : v >= 1000 ? (v/1000) + 'Rb' : v, font: { size: 10 } } },
          x: { grid: { display: false }, ticks: { color: isLight ? '#666' : '#999', font: { size: 10 } } }
        }
      }
    });
  } catch (err) { swal({ title: 'Error', text: err.message, icon: 'error' }); }
}

async function exportExcel() {
  swal({ title: 'Menyiapkan file...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
  try {
    const rows = await collectExportRows();
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Penjualan');
    XLSX.writeFile(wb, `Digimap_Penjualan_${new Date().toISOString().slice(0,10)}.xlsx`);
    Swal.close();
  } catch (err) { swal({ title: 'Error', text: err.message, icon: 'error' }); }
}

async function collectExportRows() {
  const filterMember = document.getElementById('filter_member')?.value || '';
  const filterMonth = document.getElementById('filter_month')?.value || '';
  const snap = await get(ref(db, 'sales'));
  const rows = [];
  if (snap.exists()) {
    snap.forEach(child => {
      const r = child.val();
      if (filterMember && r.nama !== filterMember) return;
      if (filterMonth) {
        const d = new Date(r.timestamp);
        const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        if (ym !== filterMonth) return;
      }
      rows.push({
        Tanggal: r.tanggal, Waktu: r.waktu, 'Nama Staff': r.nama,
        Device: r.device || 0, Accessories: r.acc || 0, Qoala: r.qoala || 0,
        Telkomsel: r.tsel || 0, Indosat: r.isat || 0, XL: r.xl || 0,
        'Airpods (Qty)': r.airpods || 0,
        Total: (r.device||0)+(r.acc||0)+(r.qoala||0)+(r.tsel||0)+(r.isat||0)+(r.xl||0)
      });
    });
  }
  rows.sort((a, b) => {
    const [da, ma, ya] = a.Tanggal.split('/'); const [db_, mb, yb] = b.Tanggal.split('/');
    return new Date(`${ya}-${ma}-${da} ${a.Waktu}`) - new Date(`${yb}-${mb}-${db_} ${b.Waktu}`);
  });
  return rows;
}

async function exportGoogleSheet() {
  let url = localStorage.getItem(GSHEET_KEY) || '';
  const inp = await swal({
    title: 'Google Apps Script URL',
    html: 'Paste URL Web App Apps Script Anda.<br><small style="opacity:0.7">Template script ada di <code>apps-script-template.gs</code></small>',
    input: 'url',
    inputValue: url,
    inputPlaceholder: 'https://script.google.com/macros/s/.../exec',
    showCancelButton: true,
    confirmButtonText: 'Kirim',
    cancelButtonText: 'Batal'
  });
  if (!inp.isConfirmed || !inp.value) return;
  url = inp.value.trim();
  localStorage.setItem(GSHEET_KEY, url);

  swal({ title: 'Mengirim...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
  try {
    const rows = await collectExportRows();
    const res = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ rows })
    });
    swal({ title: 'Terkirim!', text: 'Data dikirim ke Google Sheet. Cek spreadsheet Anda.', icon: 'success' });
  } catch (err) { swal({ title: 'Error', text: err.message, icon: 'error' }); }
}

// ===== ADMIN PANEL =====
async function loadAdmin() {
  if (!isSuperUser) return;
  // Theme presets — render 32 swatches
  const grid = document.getElementById('theme_grid');
  grid.innerHTML = THEMES.map(t => `
    <div class="theme-swatch" data-color="${t.color}" title="${t.name}"
         style="background: linear-gradient(135deg, ${t.color} 0%, ${t.color}99 100%);">
    </div>`).join('');
  grid.querySelectorAll('.theme-swatch').forEach(sw => {
    sw.onclick = async () => {
      applyAccent(sw.dataset.color);
      try { await set(ref(db, 'settings/theme'), sw.dataset.color); } catch (e) { console.error(e); }
    };
  });

  // Background presets — render swatches
  const bgGrid = document.getElementById('bg_grid');
  if (bgGrid) {
    bgGrid.innerHTML = BACKGROUNDS.map(b => {
      const preview = b.type === 'default'
        ? (b.mode === 'light' ? '#f2f2f7' : '#000')
        : b.css;
      return `<div class="bg-swatch" data-bg="${b.id}" title="${b.name}" style="background: ${preview};"></div>`;
    }).join('');
    bgGrid.querySelectorAll('.bg-swatch').forEach(sw => {
      sw.onclick = async () => {
        applyBackground(sw.dataset.bg);
        try { await set(ref(db, 'settings/background'), sw.dataset.bg); } catch (e) { console.error(e); }
      };
    });
  }

  // Custom accent color picker (live)
  const customAccent = document.getElementById('custom_accent');
  if (customAccent) {
    customAccent.value = (localStorage.getItem(THEME_KEY) || '#0a84ff').startsWith('#')
      ? localStorage.getItem(THEME_KEY) : '#0a84ff';
    customAccent.oninput = () => applyAccent(customAccent.value);
    customAccent.onchange = async () => {
      try { await set(ref(db, 'settings/theme'), customAccent.value); } catch (e) { console.error(e); }
    };
  }
  const resetAccent = document.getElementById('reset_accent');
  if (resetAccent) resetAccent.onclick = async () => {
    applyAccent('#0a84ff');
    try { await set(ref(db, 'settings/theme'), '#0a84ff'); } catch (e) { console.error(e); }
  };

  // Custom background color picker
  const customBg = document.getElementById('custom_bg');
  if (customBg) {
    const cur = localStorage.getItem('digimap_bg') || '';
    if (cur.startsWith('#')) customBg.value = cur;
    customBg.oninput = () => applyBackground(customBg.value);
    customBg.onchange = async () => {
      try { await set(ref(db, 'settings/background'), customBg.value); } catch (e) { console.error(e); }
    };
  }
  const resetBg = document.getElementById('reset_bg');
  if (resetBg) resetBg.onclick = async () => {
    applyBackground('');
    try { await remove(ref(db, 'settings/background')); } catch (e) { console.error(e); }
  };

  applyMode(localStorage.getItem(MODE_KEY) || 'dark');

  // Member list
  await renderMemberList();

  // Filter dropdown
  const selM = document.getElementById('filter_member');
  try {
    const snap = await get(ref(db, 'members'));
    selM.innerHTML = '<option value="">Semua Anggota</option>';
    if (snap.exists()) {
      Object.keys(snap.val()).sort().forEach(nama => {
        if (snap.val()[nama].isSuperUser) return;
        const o = document.createElement('option');
        o.value = nama; o.textContent = snap.val()[nama].displayName || nama;
        selM.appendChild(o);
      });
    }
  } catch (e) { console.error(e); }
}

async function renderMemberList() {
  const c = document.getElementById('member_list');
  c.innerHTML = '<div class="loading"><i class="fas fa-circle-notch fa-spin"></i></div>';
  try {
    const snap = await get(ref(db, 'members'));
    if (!snap.exists()) { c.innerHTML = '<div class="empty-state">Belum ada anggota.</div>'; return; }
    const data = snap.val();
    let html = '';
    Object.keys(data).sort().forEach(key => {
      const m = data[key];
      const avatarHtml = m.photo
        ? `<img class="avatar" src="${m.photo}" alt="">`
        : `<div class="avatar-fallback">${(m.displayName || key).charAt(0).toUpperCase()}</div>`;
      const isSU = m.isSuperUser;
      html += `<div class="member-row">
        ${avatarHtml}
        <div class="info">
          <p class="nm">${m.displayName || key}</p>
          <p class="rl">@${key}${isSU ? ' • <span style="color:var(--accent)">Super User</span>' : ''}</p>
        </div>
        <div class="acts">
          <button class="mini-btn" data-act="photo" data-key="${key}" title="Ganti foto"><i class="fas fa-camera"></i></button>
          <button class="mini-btn" data-act="name" data-key="${key}" title="Ganti nama"><i class="fas fa-pen"></i></button>
          <button class="mini-btn" data-act="pin" data-key="${key}" title="Ganti PIN"><i class="fas fa-key"></i></button>
          ${isSU ? '' : `<button class="mini-btn danger" data-act="del" data-key="${key}" title="Hapus"><i class="fas fa-trash"></i></button>`}
        </div>
      </div>`;
    });
    c.innerHTML = html;
    c.querySelectorAll('[data-act]').forEach(b => {
      b.onclick = () => memberAction(b.dataset.act, b.dataset.key);
    });
  } catch (err) { c.innerHTML = '<div class="empty-state" style="color:#ff453a">' + err.message + '</div>'; }
}

async function memberAction(act, key) {
  if (act === 'del') {
    const r = await swal({ title: `Hapus ${key}?`, text: 'Anggota akan dihapus permanen.', icon: 'warning', showCancelButton: true, confirmButtonText: 'Ya, Hapus', cancelButtonText: 'Batal', confirmButtonColor: '#ff453a' });
    if (!r.isConfirmed) return;
    try {
      await remove(ref(db, `members/${key}`));
      swal({ title: 'Dihapus', icon: 'success', timer: 700, showConfirmButton: false });
      renderMemberList();
    } catch (e) { swal({ title: 'Error', text: e.message, icon: 'error' }); }
    return;
  }
  if (act === 'name') {
    const snap = await get(ref(db, `members/${key}`));
    const cur = snap.val()?.displayName || key;
    const r = await swal({ title: 'Ganti Nama Tampilan', input: 'text', inputValue: cur, showCancelButton: true, confirmButtonText: 'Simpan', cancelButtonText: 'Batal' });
    if (!r.isConfirmed || !r.value) return;
    try {
      await update(ref(db, `members/${key}`), { displayName: r.value.trim() });
      swal({ title: 'Tersimpan', icon: 'success', timer: 700, showConfirmButton: false });
      renderMemberList();
    } catch (e) { swal({ title: 'Error', text: e.message, icon: 'error' }); }
    return;
  }
  if (act === 'pin') {
    const r = await swal({ title: `Ganti PIN untuk ${key}`, input: 'text', inputAttributes: { maxlength: 4, inputmode: 'numeric' }, inputPlaceholder: '4 digit', showCancelButton: true, confirmButtonText: 'Simpan', cancelButtonText: 'Batal' });
    if (!r.isConfirmed) return;
    if (!/^\d{4}$/.test(r.value || '')) return swal({ title: 'Format salah', text: 'PIN harus 4 digit.', icon: 'warning' });
    try {
      await update(ref(db, `members/${key}`), { pin: r.value });
      swal({ title: 'PIN diubah', icon: 'success', timer: 700, showConfirmButton: false });
    } catch (e) { swal({ title: 'Error', text: e.message, icon: 'error' }); }
    return;
  }
  if (act === 'photo') {
    pickAndUploadPhoto(key);
    return;
  }
}

function pickAndUploadPhoto(key) {
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = 'image/*';
  inp.onchange = async () => {
    const file = inp.files[0];
    if (!file) return;
    try {
      swal({ title: 'Memproses foto...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      const dataUrl = await resizeImage(file, 240);
      await update(ref(db, `members/${key}`), { photo: dataUrl });
      swal({ title: 'Foto diperbarui', icon: 'success', timer: 700, showConfirmButton: false });
      renderMemberList();
    } catch (e) { swal({ title: 'Error', text: e.message, icon: 'error' }); }
  };
  inp.click();
}

function resizeImage(file, maxSize) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > height) { if (width > maxSize) { height *= maxSize / width; width = maxSize; } }
        else { if (height > maxSize) { width *= maxSize / height; height = maxSize; } }
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.78));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function addMember() {
  const r = await swal({
    title: 'Tambah Anggota',
    html: `
      <input id="sw_key" class="swal2-input" placeholder="Username (huruf kecil, tanpa spasi)">
      <input id="sw_name" class="swal2-input" placeholder="Nama tampilan">
      <input id="sw_pin" class="swal2-input" placeholder="PIN 4 digit" maxlength="4" inputmode="numeric">
    `,
    showCancelButton: true, confirmButtonText: 'Tambah', cancelButtonText: 'Batal',
    focusConfirm: false,
    preConfirm: () => {
      const key = document.getElementById('sw_key').value.trim().toLowerCase().replace(/\s+/g, '');
      const name = document.getElementById('sw_name').value.trim();
      const pin = document.getElementById('sw_pin').value.trim();
      if (!key || !/^[a-z0-9_]+$/.test(key)) { Swal.showValidationMessage('Username hanya huruf kecil/angka/underscore'); return false; }
      if (!name) { Swal.showValidationMessage('Nama wajib diisi'); return false; }
      if (!/^\d{4}$/.test(pin)) { Swal.showValidationMessage('PIN harus 4 digit angka'); return false; }
      return { key, name, pin };
    }
  });
  if (!r.isConfirmed) return;
  try {
    const exist = await get(ref(db, `members/${r.value.key}`));
    if (exist.exists()) return swal({ title: 'Username sudah dipakai', icon: 'warning' });
    await set(ref(db, `members/${r.value.key}`), {
      pin: r.value.pin,
      displayName: r.value.name,
      photo: '',
      isSuperUser: false
    });
    swal({ title: 'Ditambahkan', icon: 'success', timer: 800, showConfirmButton: false });
    renderMemberList();
  } catch (e) { swal({ title: 'Error', text: e.message, icon: 'error' }); }
}

// ===== EVENT BINDINGS =====
document.getElementById('btn_login').onclick = doLogin;
document.getElementById('btn_logout').onclick = doLogout;
document.getElementById('btn_submit').onclick = submitForm;
document.getElementById('btn_export').onclick = exportExcel;
document.getElementById('limit_history').onchange = loadHistory;
document.querySelectorAll('.tab-btn').forEach(b => b.onclick = () => switchTab(b.dataset.tab));

document.getElementById('btn_theme').onclick = () => {
  const cur = document.documentElement.getAttribute('data-theme') || 'dark';
  applyMode(cur === 'dark' ? 'light' : 'dark');
};

// Admin bindings (elements exist regardless of role; handlers no-op if not super user)
document.getElementById('btn_add_member').onclick = () => { if (isSuperUser) addMember(); };
document.getElementById('btn_export_xlsx').onclick = () => { if (isSuperUser) exportExcel(); };
document.getElementById('btn_export_gsheet').onclick = () => { if (isSuperUser) exportGoogleSheet(); };
document.addEventListener('click', (e) => {
  if (e.target.closest('.mode-btn')) {
    const btn = e.target.closest('.mode-btn');
    applyMode(btn.dataset.mode);
  }
});
