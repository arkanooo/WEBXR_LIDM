# SpatialForge (3DUTOPIA)

**Lomba Inovasi Digital Mahasiswa (LIDM) 2026**  
**Divisi:** Inovasi Pembelajaran Digital Pendidikan (IPDP)  

SpatialForge adalah *platform* antarmuka pembelajaran spasial masa depan (WebXR) yang dirancang untuk mengubah modul pendidikan konvensional menjadi simulasi 3D dan laboratorium virtual yang imersif. 

## 🚀 Fitur Utama
- **Modul Pembelajaran Interaktif:** Integrasi dengan materi pembelajaran 3D interaktif.
- **Komponen Mesin:** Visualisasi komponen kompleks dalam ruang virtual 3D.
- **Simulasi Lab Virtual:** Praktikum langsung menggunakan teknologi *Virtual Reality* yang terintegrasi di peramban web (WebXR).
- **Desain UI/UX Premium:** Antarmuka bergaya *Dark Cyberpunk* & *Glassmorphism* untuk meningkatkan keterlibatan pengguna (mahasiswa).

## 🛠️ Teknologi
Proyek ini dikembangkan menggunakan *modern web stack*:
- **Frontend:** React, Vite, TypeScript
- **Styling:** TailwindCSS, CSS Modules
- **Animasi & Interaksi:** SVG Animations, Framer Motion (Direkomendasikan)
- **Ekosistem:** Node.js, pnpm (Monorepo setup)

## 📦 Struktur Repositori
Repositori ini sedang dalam tahap restrukturisasi menuju format *Monorepo*:
- `/frontend` - Aplikasi Web React/Vite (*Command Center UI*).
- `/backend` - (Mendatang) Logika server, integrasi *database*, dan *pipeline* kecerdasan buatan.

## ⚙️ Cara Menjalankan (Development)
Karena proyek ini menggunakan arsitektur *Monorepo*, Anda harus menjalankan perintah dari *root directory*.

```bash
# 1. Install semua dependensi untuk seluruh workspace
npm install

# 2. Jalankan server pengembangan untuk frontend (Aplikasi Web)
npm run dev:frontend
```

Buka peramban dan navigasikan ke `http://localhost:5173`.

---
*Dikembangkan oleh Arkanzahir untuk kompetisi LIDM 2026.*