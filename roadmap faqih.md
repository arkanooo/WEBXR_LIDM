# Roadmap Lanjutan — Catatan Faqih untuk Tim

Dokumen ini merangkum **apa yang sudah dikerjakan** dan **apa yang perlu dilakukan teman saya selanjutnya**. Fokus terbaru: **Halaman Komponen (ARPeGa) + fitur QR → AR WebXR untuk Meta Quest 2**, serta **penyesuaian responsif**.

---

## ✅ Yang sudah selesai

### 1. Navigasi & Routing
- Header diubah menjadi **Home · Praktikum · Modul · Komponen · About**.
- Routing memakai **`HashRouter`** (`react-router`) — dipilih agar **aman di Vercel tanpa konfigurasi server** (tidak 404 saat refresh / share link, contoh: `.../#/komponen/6`).
- Nav aktif punya indikator (garis/teks hijau `#BFFD44`). Header punya **menu mobile** (hamburger).
- File: [`src/app/components/SiteHeader.tsx`](frontend/src/app/components/SiteHeader.tsx), [`src/app/components/PageShell.tsx`](frontend/src/app/components/PageShell.tsx).

### 2. Halaman Komponen (dari PDF "Layout ARPeGa Final")
- Berisi **13 komponen** mesin: Mur, Baut, Mur & Baut, Baut Kepala Silinder/Benam, Roda Gigi Lurus & Payung, Stud, Boxed Stud, Bantalan, Rod, Pegas Lurus & Kerucut.
- Ada **filter kategori** (Pengencang / Transmisi / Bantalan / Elastis & Lainnya), kartu spesifikasi dimensi (tanpa skala, mm, proyeksi sudut ketiga) — semua bertema UI existing (dark gradient, neon green, glassmorphism, font Chivo).
- Data terpusat di [`src/app/data/komponen.ts`](frontend/src/app/data/komponen.ts) — **tinggal edit di sini** untuk mengubah teks/spek.
- File: [`src/app/pages/KomponenPage.tsx`](frontend/src/app/pages/KomponenPage.tsx).

### 3. Fitur 3D + AR (WebXR / Meta Quest 2)
- Tiap komponen punya **halaman detail** `#/komponen/:no` dengan **viewer 3D interaktif** (three.js) dan tombol **Masuk AR**.
- Tombol AR memakai `ARButton` three.js → memulai sesi **WebXR `immersive-ar` (passthrough)** yang didukung **Meta Quest 2 Browser**. Teks tombol sudah dilokalkan ke Indonesia.
- **QR code** per komponen (`qrcode.react`) di halaman detail — mengenkode URL absolut halaman AR komponen itu, jadi bisa dipindai/dibuka dari headset.
- Model 3D three.js di-**code-split** (lazy load) agar halaman lain tetap ringan.
- File: [`src/app/pages/KomponenDetailPage.tsx`](frontend/src/app/pages/KomponenDetailPage.tsx), [`src/app/three/ComponentViewer.tsx`](frontend/src/app/three/ComponentViewer.tsx), [`src/app/three/models.ts`](frontend/src/app/three/models.ts).

### 4. Responsif
- **Halaman Komponen, Detail, Placeholder, dan Header** sudah **responsif penuh** (breakpoint Tailwind + menu mobile). Sudah dites di 390px, 820px, 1440px.
- **Home** diperbaiki: hero (desain fixed 1440px) kini **dipusatkan vertikal** dengan latar gradient hero, sehingga di layar kecil **tidak ada lagi "void" hitam** di bawah. Tampilan desktop tetap sama.

---

## 🔧 Yang HARUS dilakukan selanjutnya (untuk teman saya)

### PRIORITAS 1 — Ganti model 3D prosedural dengan model asli (.glb)
Model 3D saat ini di [`src/app/three/models.ts`](frontend/src/app/three/models.ts) masih **aproksimasi prosedural** (bukan CAD presisi) — hanya placeholder yang berfungsi.
- **Tugas:** siapkan file **`.glb`** asli tiap komponen (ekspor dari CAD/SolidWorks/Blender), letakkan di `frontend/public/models/`.
- **Ubah viewer** agar memuat `.glb` pakai `GLTFLoader` three.js (ganti pemanggilan `buildModel(no)` di `ComponentViewer.tsx`), atau lebih mudah: pertimbangkan pindah ke web component **`<model-viewer>`** (`@google/model-viewer`) yang sudah menyediakan orbit + AR (Scene Viewer Android + Quick Look iOS + WebXR) sekaligus.

### PRIORITAS 2 — Uji AR langsung di Meta Quest 2
- **WebXR wajib HTTPS.** Deploy dulu ke Vercel (otomatis HTTPS), atau pakai HTTPS tunnel (ngrok) untuk dev.
- Buka halaman komponen di **Meta Quest Browser** → tekan **Masuk AR** → cek model muncul di passthrough, ukuran & posisi enak dilihat (atur di `ComponentViewer.tsx` bagian `onSessionStart`: `position` & `scale`).
- **iOS Safari TIDAK mendukung WebXR `immersive-ar`.** Jika perlu dukung iPhone/iPad, tambahkan file **`.usdz`** + `<model-viewer>` (Quick Look), atau beri pesan fallback yang jelas.

### PRIORITAS 3 — Rombak hero Home menjadi benar-benar fluid (responsive murni)
- Home saat ini adalah **satu desain Figma fixed 1440px yang di-scale** — di mobile jadi kecil (billboard), belum layout fluid yang ideal.
- **Tugas:** buat versi mobile hero yang menyusun ulang elemen (judul, karakter VR, carousel) secara vertikal dengan breakpoint, bukan sekadar di-scale. Referensi elemen ada di `OculusDesign` dalam [`src/app/App.tsx`](frontend/src/app/App.tsx).

### PRIORITAS 4 — Isi halaman Praktikum, Modul, About
- Sekarang masih **placeholder "Segera hadir"** ([`src/app/pages/PlaceholderPage.tsx`](frontend/src/app/pages/PlaceholderPage.tsx)).
- Isi dengan konten nyata sesuai kebutuhan (Praktikum = lab virtual, Modul = materi daring, About = profil tim/ITS).

### PRIORITAS 5 — Lanjutkan roadmap lama (lihat `roadmap.md`)
- Sinkronisasi carousel–badge–metrik (command center), transisi klik badge (ganti `alert(...)` jadi navigasi asli), seksi bawah halaman utama.

---

## 🚀 Catatan Deploy Vercel
- **Root Directory** = `frontend` (bukan root repo).
- Build command: `npm run build` · Output dir: `dist`.
- Karena pakai `HashRouter`, **tidak perlu** rewrite/`vercel.json` khusus SPA.
- Pastikan HTTPS aktif (default Vercel) agar fitur **WebXR AR** jalan.

## 📁 Peta file penting
| Fitur | File |
|---|---|
| Router & Home hero | `frontend/src/app/App.tsx` |
| Header + shell + ikon | `frontend/src/app/components/` |
| Data 13 komponen | `frontend/src/app/data/komponen.ts` |
| Halaman Komponen / Detail | `frontend/src/app/pages/` |
| Model 3D & viewer AR | `frontend/src/app/three/` |
