// Data modul praktikum. Sumber: "Embossing Machine.pdf" — Percobaan 4,
// Praktikum Sistem Hidrolik, Laboratorium Sistem Pneumatik dan Hidrolik,
// Departemen Teknik Mesin Industri ITS.

export type PraktikumKind = "pneumatik-hidrolik" | "tensile-test";

export type PraktikumOption = {
  id: PraktikumKind;
  nama: string;
  desc: string;
  accent: string;
  available: boolean;
};

export const PRAKTIKUM_OPTIONS: PraktikumOption[] = [
  {
    id: "pneumatik-hidrolik",
    nama: "Pneumatik & Hidrolik",
    desc: "Rangkaian katup, silinder, dan pengaturan tekanan pada sistem pneumatik-hidrolik.",
    accent: "#00cba0",
    available: true,
  },
  {
    id: "tensile-test",
    nama: "Tensile Test",
    desc: "Pengujian tarik material: kurva tegangan-regangan, kekuatan luluh, dan kekuatan tarik.",
    accent: "#fb7943",
    available: false,
  },
];

export type Equipment = { item: string; qty: number; desc: string };
export type DataTableRow = { p1z1: string; p1z4: string };

export type VRStage = {
  no: number;
  judul: string;
  icon: string; // emoji sederhana untuk tiap tahap
  ringkas: string;
  detail: string[];
};

export type Modul = {
  id: string;
  praktikum: PraktikumKind;
  percobaan: string;
  judul: string;
  durasi: string;
  tingkat: string;
  tujuan: string[];
  deskripsi: string;
  peralatan: Equipment[];
  prosedur: string[];
  ukuran: { simbol: string; arti: string }[];
  tabelInlet: DataTableRow[];
  tabelOutlet: DataTableRow[];
  pertanyaan: string[];
  vrStages: VRStage[];
};

export const MODUL_LIST: Modul[] = [
  {
    id: "embossing-machine",
    praktikum: "pneumatik-hidrolik",
    percobaan: "Percobaan 4",
    judul: "Embossing Machine",
    durasi: "± 90 menit",
    tingkat: "Menengah",
    tujuan: [
      "Mengenalkan mahasiswa tentang penggunaan katup One Way Flow Control Valve.",
      "Menunjukkan bagaimana cara menjelaskan perbedaan antara katup flow control valve dan throttle valve berdasarkan aplikasi konkret.",
    ],
    deskripsi:
      "Hydraulic Embossing Machine (mesin emboss hidrolik) adalah mesin untuk mencetak simbol atau pola pada foil logam menggunakan tekanan hidrolik. One way flow control valve digunakan untuk mengatur kecepatan gerakan stempel ke bawah sesuai kecepatan pergerakan foil. Untuk mencegah stempel jatuh ke bawah akibat beratnya, digunakan katup pelepas tekanan (Pressure Relief Valve).",
    peralatan: [
      { item: "0Z1", qty: 1, desc: "Hydraulic power pack" },
      { item: "0Z2, 1Z1–1Z4", qty: 5, desc: "Pressure gauge" },
      { item: "0V1, 1V3", qty: 2, desc: "Pressure relief valve" },
      { item: "0V2", qty: 1, desc: "Shut-off valve" },
      { item: "1V1", qty: 1, desc: "4/2-way valve, manually operated" },
      { item: "1V2", qty: 1, desc: "One-way flow control valve" },
      { item: "1A", qty: 1, desc: "Cylinder, double-acting" },
      { item: "1V4", qty: 1, desc: "Non-return valve" },
      { item: "—", qty: 14, desc: "Hose line" },
      { item: "—", qty: 4, desc: "Branch tee" },
      { item: "—", qty: 1, desc: "Stop-watch" },
    ],
    prosedur: [
      "Persiapkan jumlah komponen sesuai dengan alokasinya dalam rangkaian.",
      "Pasang dan rangkai semua komponen dengan benar sesuai dengan sirkuit hidrolik yang dimaksud.",
      "Sambungkan masing-masing komponen secara lengkap dan benar menggunakan selang hidrolik.",
      "Periksa fungsi dan rangkaiannya sebelum menjalankan percobaan.",
      "Nyalakan pompa hidrolik dan pastikan tekanan minyak hidrolik yang digunakan adalah 60 bar.",
      "Tutup katup shut-off (0V2).",
      "Atur tekanan sistem melalui PRV 0V1 ke 50 bar.",
      "Buka kembali shut-off valve dan PRV 1V3 agar sistem siap jalan.",
      "Atur one-way flow control valve hingga silinder maju dalam ±3 detik.",
      "Setelah disetel, jangan ubah posisi FCV selama percobaan.",
      "Atur PRV 1V3 agar tekanan di P1Z4 tetap di 10 bar.",
      "Amati dan catat tekanan di P1Z3 serta waktu cylinder untuk bergerak extend.",
      "Variasikan bukaan PRV 0V1 (50, 40, 30, 20, 10 bar), dan jaga tekanan di P1Z4 agar tetap 10 bar dengan menggunakan PRV 1V3.",
      "Catat semua data yang diperlukan.",
      "Ulangi kembali Langkah 7–12 dengan variasi bukaan PRV 1V3 (10, 20, 30, 40, 50 bar), dan jaga tekanan di P1Z1 tetap 50 bar dengan menggunakan PRV 0V1.",
      "Catat semua data yang diperlukan.",
      "Matikan pompa hidrolik ketika sudah selesai, dan rapikan kembali komponen hidrolik di tempat yang sudah disediakan.",
    ],
    ukuran: [
      { simbol: "P1Z1", arti: "Tekanan sebelum one way flow control valve" },
      { simbol: "P1Z3", arti: "Tekanan setelah one way flow control valve" },
      { simbol: "P1Z4", arti: "Tekanan pada katup penahan balik (counter-holding valve)" },
      { simbol: "t →", arti: "Cylinder advance-stroke time (waktu langkah maju silinder)" },
    ],
    tabelInlet: [
      { p1z1: "50 bar", p1z4: "10 bar" },
      { p1z1: "40 bar", p1z4: "10 bar" },
      { p1z1: "30 bar", p1z4: "10 bar" },
      { p1z1: "20 bar", p1z4: "10 bar" },
      { p1z1: "10 bar", p1z4: "10 bar" },
    ],
    tabelOutlet: [
      { p1z1: "50 bar", p1z4: "10 bar" },
      { p1z1: "50 bar", p1z4: "20 bar" },
      { p1z1: "50 bar", p1z4: "30 bar" },
      { p1z1: "50 bar", p1z4: "40 bar" },
      { p1z1: "50 bar", p1z4: "50 bar" },
    ],
    pertanyaan: [
      "Bagaimana waktu langkah (travel time) berubah ketika tekanan pada sisi masuk (inlet) dan sisi keluar (outlet) divariasikan?",
      "Apa perbedaan sirkuit ini dengan sirkuit yang menggunakan 2-way flow control valve, dan apa alasannya?",
    ],
    vrStages: [
      {
        no: 1,
        judul: "Briefing di Lab Virtual",
        icon: "🎯",
        ringkas: "Orientasi ruang, tujuan, dan demo mesin emboss beranimasi.",
        detail: [
          "Mahasiswa masuk ke lab hidrolik virtual dan berdiri di depan mesin emboss 3D yang sedang beroperasi: roll foil berjalan, stempel naik-turun mencetak pola.",
          "Panel melayang menampilkan tujuan praktikum dan peran One-Way FCV serta PRV pada mesin nyata — mahasiswa melihat langsung 'mengapa' sebelum 'bagaimana'.",
          "Mode sorot-X (cutaway) memperlihatkan aliran oli di dalam sirkuit saat mesin bekerja.",
        ],
      },
      {
        no: 2,
        judul: "Eksplorasi Komponen",
        icon: "🔍",
        ringkas: "Ambil, putar, dan pelajari 11 komponen dengan label interaktif.",
        detail: [
          "Setiap komponen (power pack, PRV, FCV, katup 4/2, silinder, gauge) tersedia di meja virtual — bisa diambil, diputar, dan dilihat penampangnya dengan kontroler.",
          "Menyentuh komponen memunculkan nama, simbol ISO 1219, dan fungsi singkatnya.",
          "Kuis identifikasi cepat: sistem menyebut nama komponen, mahasiswa harus mengambil komponen yang benar sebelum lanjut.",
        ],
      },
      {
        no: 3,
        judul: "Perakitan Sirkuit",
        icon: "🔧",
        ringkas: "Rangkai sirkuit hidrolik sesuai skema dengan validasi otomatis.",
        detail: [
          "Skema sirkuit ditampilkan di panel samping; mahasiswa menarik selang dari port ke port (14 hose line, 4 branch tee) dengan snap-point magnetik.",
          "Sambungan benar berpendar hijau; salah sambung berpendar merah disertai penjelasan mengapa salah — meniru langkah 1–4 prosedur.",
          "Tombol 'Periksa Rangkaian' mensimulasikan pemeriksaan fungsi sebelum percobaan dijalankan.",
        ],
      },
      {
        no: 4,
        judul: "Persiapan & Keselamatan",
        icon: "⚠️",
        ringkas: "Nyalakan pompa 60 bar, tutup shut-off, set PRV 0V1 ke 50 bar.",
        detail: [
          "Mahasiswa menekan tombol pompa, memutar knob PRV, dan menutup katup shut-off dengan gerakan tangan nyata (grab & twist) — urutan harus benar (langkah 5–8).",
          "Gauge virtual bergerak real-time; jika urutan salah (mis. lupa menutup shut-off), sistem menahan dan memberi peringatan keselamatan seperti di lab nyata.",
        ],
      },
      {
        no: 5,
        judul: "Eksperimen & Pengukuran",
        icon: "📊",
        ringkas: "Atur FCV ±3 detik, variasikan PRV, ukur tekanan & waktu.",
        detail: [
          "Mahasiswa menyetel FCV hingga silinder maju ±3 detik — stopwatch virtual menyala otomatis saat tuas katup 4/2 ditarik.",
          "Variasi bukaan PRV 0V1 (50→10 bar) dan PRV 1V3 (10→50 bar) dilakukan persis mengikuti langkah 9–16; gauge P1Z1/P1Z3/P1Z4 dihitung dari model fisika aliran sederhana.",
          "Silinder dan stempel emboss bergerak sesuai hasil perhitungan, sehingga efek 'inlet vs outlet pressure' terlihat—bukan sekadar angka.",
        ],
      },
      {
        no: 6,
        judul: "Pencatatan Data Otomatis",
        icon: "📝",
        ringkas: "Tabel inlet/outlet terisi saat pengukuran, bisa diekspor.",
        detail: [
          "Setiap pengukuran masuk otomatis ke tabel 'fluctuating inlet pressure' dan 'fluctuating outlet pressure' di panel VR — sama persis dengan tabel pada modul cetak.",
          "Grafik tekanan vs waktu-langkah digambar langsung agar tren segera terlihat.",
          "Data dapat diekspor (CSV/laporan) untuk dianalisis di luar VR.",
        ],
      },
      {
        no: 7,
        judul: "Analisis & Evaluasi",
        icon: "🎓",
        ringkas: "Jawab pertanyaan kesimpulan, terima skor kinerja.",
        detail: [
          "Mahasiswa menjawab dua pertanyaan kesimpulan modul langsung di panel VR dengan bantuan grafik yang sudah terbentuk.",
          "Sistem memberi skor: ketepatan perakitan, kepatuhan urutan prosedur, kelengkapan data, dan jawaban analisis.",
          "Sesi dapat diulang tanpa risiko kerusakan alat atau kebocoran oli — keunggulan utama praktikum virtual.",
        ],
      },
    ],
  },
];
