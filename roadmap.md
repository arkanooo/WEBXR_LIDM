# Roadmap Desain Lanjutan 3DUTOPIA (SpatialForge)

Fokus utama: **Interaktivitas Dinamis dan Sinkronisasi UI (Command Center Logic)**

## 1. Sinkronisasi Modul Carousel, Badge, dan Metrik
Mengubah bagian bawah layar (*slider*) menjadi pusat kendali utama (*command center*) yang saling terhubung secara terpusat.

**Skenario Logika:**

*   **State 1 (Modul Pembelajaran):**
    *   **Carousel Aktif:** Modul Pembelajaran
    *   **Teks Badge Bergerigi:** "START MODUL PEMBELAJARAN"
    *   **Teks Metrik Utama:** "15+"
    *   **Sub-teks Metrik:** "Modul Praktikum Siap Pakai"

*   **State 2 (Komponen Mesin):**
    *   **Carousel Aktif:** Komponen Mesin
    *   **Teks Badge Bergerigi:** "START KOMPONEN MESIN"
    *   **Teks Metrik Utama:** "50+"
    *   **Sub-teks Metrik:** "Komponen Mesin 3D Interaktif"

*   **State 3 (Simulasi Lab):**
    *   **Carousel Aktif:** Simulasi Lab
    *   **Teks Badge Bergerigi:** "MULAI SIMULASI LAB VIRTUAL"
    *   **Teks Metrik Utama:** "500+"
    *   **Sub-teks Metrik:** "Mahasiswa aktif di lab ini"

## 2. Transisi ke Simulasi Lab Virtual
Menyempurnakan efek visual dan navigasi (yang saat ini masih berupa `alert("Menuju ke Simulasi Lab Virtual...")`) menjadi transisi halaman atau efek visual yang sesungguhnya saat *badge* tersebut diklik, dengan parameter berdasarkan *state* yang sedang aktif.

## 3. Pengembangan Seksi Selanjutnya (Opsional)
Mulai mendesain tata letak bagian bawah halaman seperti seksi *Products*, *Features*, *Support*, dan *About* yang dapat dilihat apabila pengguna melakukan *scroll* ke bawah halaman utama.
