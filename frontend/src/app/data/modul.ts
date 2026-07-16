



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
    available: true,
  },
];

export type Equipment = { item: string; qty: number; desc: string };
export type DataTableRow = { p1z1: string; p1z4: string };

export type VRStage = {
  no: number;
  judul: string;
  icon: string; 
  ringkas: string;
  detail: string[];
};

export type QuizItem = {
  q: string;
  options: string[];
  answerIndex: number;
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
  tabelInlet?: DataTableRow[];
  tabelOutlet?: DataTableRow[];
  
  dimensi?: { param: string; inch: string; mm: string }[];
  pertanyaan: string[];
  quiz?: QuizItem[];
  vrStages: VRStage[];
  pdfUrl: string;
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
    pretest: [
      {
        q: "Apa fungsi utama dari One Way Flow Control Valve (1V2) pada sistem sirkuit Embossing Machine?",
        options: [
          "Mengatur kecepatan gerakan stempel ke bawah agar sesuai dengan kecepatan pergerakan foil.",
          "Membatasi tekanan kerja maksimum di dalam seluruh sistem sirkuit.",
          "Menghentikan total aliran fluida dari pompa hidrolik secara manual.",
          "Mengubah arah aliran fluida untuk menggerakkan silinder bolak-balik."
        ],
        answerIndex: 0
      },
      {
        q: "Untuk mencegah stempel jatuh ke bawah akibat beratnya sendiri pada mesin emboss hidrolik, komponen apa yang dipasang sebagai katup penahan balik (counter-holding valve)?",
        options: [
          "Pressure Relief Valve (1V3)",
          "Shut-off Valve (0V2)",
          "Directional 4/2-way Valve (1V1)",
          "Hydraulic Power Pack (0Z1)"
        ],
        answerIndex: 0
      },
      {
        q: "Berapakah batas tekanan maksimum yang diatur pada Katup Pengaman Pompa (Pump Safety Valve) sesuai dengan spesifikasi diagram sirkuit di modul?",
        options: [
          "60 bar (6 MPa)",
          "50 bar (5 MPa)",
          "10 bar (1 MPa)",
          "100 bar (10 MPa)"
        ],
        answerIndex: 0
      },
      {
        q: "Manakah jenis katup pengarah yang digunakan untuk mengontrol maju-mundurnya silinder kerja ganda secara manual pada praktikum ini?",
        options: [
          "4/2-way valve, manually operated",
          "3/2-way valve, solenoid operated",
          "One-way flow control valve",
          "Non-return valve"
        ],
        answerIndex: 0
      },
      {
        q: "Apa perbedaan mendasar antara One-way Flow Control Valve dengan Throttle Valve biasa dalam aplikasinya?",
        options: [
          "One-way FCV hanya mencekik aliran pada satu arah dan membebaskan aliran penuh pada arah sebaliknya melalui check valve internal.",
          "Throttle valve mampu menjaga debit aliran tetap konstan meskipun terjadi fluktuasi beban mekanis.",
          "One-way FCV membatasi tekanan, sedangkan throttle valve membatasi volume fluida di tangki.",
          "Throttle valve tidak memiliki sekrup penyetel manual sedangkan One-way FCV memilikinya."
        ],
        answerIndex: 0
      }
    ],
    posttest: [
      {
        q: "Pada pengujian fluktuasi tekanan inlet, jika tekanan P1Z1 diturunkan dari 50 bar menuju 20 bar sedangkan bukaan katup FCV tetap, bagaimana pengaruhnya terhadap waktu langkah maju silinder (t->)?",
        options: [
          "Waktu gerakan maju silinder menjadi lebih lama (gerakan melambat).",
          "Waktu gerakan maju silinder menjadi lebih cepat (gerakan mempercepat).",
          "Waktu gerakan maju silinder tetap konstan tanpa perubahan.",
          "Silinder akan langsung berhenti total dan terkunci di tengah."
        ],
        answerIndex: 0
      },
      {
        q: "Tekanan pada manometer P1Z4 menunjukkan nilai tekanan dari titik sirkuit yang mana?",
        options: [
          "Tekanan pada saluran keluar silinder sebelum katup penahan balik (counter-holding valve).",
          "Tekanan suplai utama yang keluar langsung dari pompa hidrolik.",
          "Tekanan minyak setelah melewati katup pengarah 4/2-way valve menuju tangki.",
          "Tekanan tepat di area masukan sebelum fluida masuk ke One-way Flow Control Valve."
        ],
        answerIndex: 0
      },
      {
        q: "Berapakah target durasi waktu langkah maju silinder (t->) yang harus dikalibrasi pertama kali menggunakan stopwatch pada langkah awal prosedur praktikum?",
        options: [
          "± 3 detik",
          "± 10 detik",
          "± 15 detik",
          "± 5 detik"
        ],
        answerIndex: 0
      },
      {
        q: "Sebelum menyalakan pompa dan mengatur tekanan sistem melalui PRV 0V1 ke nilai 50 bar, langkah pengondisian katup apa yang harus dilakukan sesuai prosedur?",
        options: [
          "Menutup shut-off valve (0V2).",
          "Membuka penuh katup penahan balik (1V3).",
          "Melepas selang saluran return menuju tangki.",
          "Menyetel FCV pada bukaan minimum (tertutup rapat)."
        ],
        answerIndex: 0
      },
      {
        q: "Mengapa kenaikan tekanan balik outlet (P1Z4) dari 10 bar menuju 50 bar menyebabkan perpanjangan waktu kayuh silinder meskipun tekanan inlet konstan?",
        options: [
          "Karena perbedaan tekanan efektif (Delta P) penentu debit aliran pada silinder menjadi semakin kecil akibat besarnya gaya lawan.",
          "Karena fluida hidrolik mengalami kompresi volume yang ekstrem akibat tekanan balik.",
          "Karena pompa otomatis menurunkan suplai debit oli ketika mendeteksi hambatan balik.",
          "Karena katup FCV mengalami malafungsi mekanis tersumbat total."
        ],
        answerIndex: 0
      }
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
    pdfUrl: "/docs/Embossing-Machine.pdf",
  },
  {
    id: "tensile-test",
    praktikum: "tensile-test",
    percobaan: "Chapter 3 · ASTM E-8",
    judul: "Tensile Test",
    durasi: "± 120 menit",
    tingkat: "Menengah",
    tujuan: [
      "Memahami perilaku material terhadap beban tarik aksial melalui diagram Force (F) – Elongation (ΔL).",
      "Mengonversi diagram F–ΔL menjadi Stress–Strain Engineering Diagram dan True Diagram, serta menentukan Yield Point, Ultimate Tensile Strength, Modulus Elastisitas, dan Modulus Resilien.",
      "Membedakan karakteristik material ductile dan brittle berdasarkan bentuk kurva, fenomena necking, dan titik fracture.",
    ],
    deskripsi:
      "Kekuatan tarik adalah sifat mekanik yang paling dominan dalam perancangan konstruksi dan proses manufaktur. Pada Tensile Test, benda kerja standar (ASTM E8) diberi beban aksial yang terus membesar hingga patah; mesin mencatat diagram Force–Elongation yang kemudian dikonversi menjadi diagram tegangan-regangan. Dari kurva ini dibaca Proportional Limit, Elastic Limit, Yield Point (dengan Offset Method 0,2% untuk material brittle), Ultimate Tensile Strength, fenomena necking, hingga fracture.",
    peralatan: [
      { item: "1", qty: 1, desc: "Universal Testing Machine (16 komponen: upper/lower grip, crosshead, column, ram cylinder, dll.)" },
      { item: "2", qty: 1, desc: "Vernier calliper" },
      { item: "3", qty: 1, desc: "Timbangan" },
      { item: "—", qty: 1, desc: "Benda kerja Tensile Test standar ASTM E8" },
    ],
    prosedur: [
      "Tekan Switch Power On pada Universal Testing Machine (Personal Computer otomatis menyala).",
      "Buka program U-60 di Personal Computer.",
      "Ukur dan catat dimensi benda kerja meliputi Width (plat) / Diameter (round), Thickness, Gauge Length, Grip Length, dan Weight.",
      "Input data dimensi benda kerja dan metode pengujian pada program U-60.",
      "Cekam benda kerja pada ragum bagian atas, naikkan ragum bagian bawah (tekan push button up), lalu cekam juga dengan ragum bawah. Pastikan pencekaman sempurna!",
      "Klik ikon Test pada program U-60 — proses penarikan benda kerja dimulai.",
      "Tunggu hingga benda kerja patah (fracture).",
      "Simpan data pengujian (Print Preview, Save) berupa diagram Force–Elongation dan nilai properties benda kerja.",
      "Lepaskan benda kerja dari ragum atas dan bawah.",
      "Ukur dan catat perubahan dimensi benda kerja (terutama Gauge Length dan diameter minimum pada necking sector).",
      "Shutdown Personal Computer, lalu tekan Switch Power Off pada Universal Testing Machine.",
    ],
    ukuran: [
      { simbol: "σE = F/A₀", arti: "Engineering stress (kgf/mm²) — gaya dibagi luas penampang awal" },
      { simbol: "εE = ΔL/L₀", arti: "Engineering strain (mm/mm) — pertambahan panjang relatif" },
      { simbol: "σT = σE(1+εE)", arti: "True stress — memperhitungkan pengecilan penampang aktual" },
      { simbol: "εT = ln(1+εE)", arti: "True strain (mm/mm)" },
      { simbol: "E = σy/εy", arti: "Modulus Elastisitas — kekakuan (stiffness) material (kgf/mm²)" },
      { simbol: "U = ½·σy·εy", arti: "Modulus Resilien — energi terserap tanpa deformasi plastis" },
    ],
    dimensi: [
      { param: "G (Gage length)", inch: "2.00 ± 0.005 in", mm: "50,0 ± 0,10 mm" },
      { param: "D (Diameter)", inch: "0.5 ± 0.01 in", mm: "12,5 ± 0,25 mm" },
      { param: "R (Radius of fillet)", inch: "3/8 in", mm: "10 mm" },
      { param: "A (Length of Red. Sector)", inch: "2 1/3 in", mm: "60 mm" },
    ],
    pertanyaan: [
      "Konversi Force (F) – Elongation (ΔL) Diagram hasil Tensile Test menjadi Stress (σE) – Strain (εE) Engineering Diagram!",
      "Jelaskan jenis benda kerja termasuk Brittle atau Ductile!",
      "Berapa besar nilai Stress (σY) dan Strain (εY) di titik Yield Point, Stress (σUTS) dan Strain (εUTS) di titik Ultimate Tensile Strength, Modulus Elastis, dan Modulus Resilien? Hitung menggunakan rumus!",
      "Konversi Stress (σE) – Strain (εE) Engineering Diagram menjadi Stress (σT) – Strain (εT) True Diagram!",
      "Jelaskan mengapa pada Tensile Test terdapat dua diagram: Engineering Diagram dan True Diagram!",
      "Jelaskan yang dimaksud dengan Strain Hardening dan Poisson Ratio!",
    ],
    pretest: [
      {
        q: "Standar dimensi pengujian spesimen manakah yang diaplikasikan secara spesifik pada panduan praktikum uji tarik logam di modul ini?",
        options: ["ASTM E8", "ASTM A36", "ISO 9001", "JIS B1180"],
        answerIndex: 0
      },
      {
        q: "Apa perbedaan asumsi mendasar dalam menghitung Tegangan Teknik (Engineering Stress) dibandingkan dengan Tegangan Sebenarnya (True Stress)?",
        options: [
          "Tegangan teknik mengasumsikan luas penampang spesimen selalu konstan menggunakan nilai luas awal (A0).",
          "Tegangan sebenarnya menggunakan nilai panjang akhir total sebagai pembagi gaya beban.",
          "Tegangan teknik mengukur deformasi atom secara mikroskopis sedangkan tegangan sebenarnya tidak.",
          "Tegangan teknik nilainya selalu lebih tinggi daripada tegangan sebenarnya setelah melewati UTS."
        ],
        answerIndex: 0
      },
      {
        q: "Sifat mekanik apakah yang digambarkan secara langsung oleh besaran nilai kemiringan daerah linier awal (Modulus Elastisitas / E) pada material?",
        options: [
          "Kekakuan (stiffness) dari material tersebut.",
          "Keuletan (ductility) material untuk ditarik menjadi kawat.",
          "Tingkat kekerasan permukaan logam terhadap goresan.",
          "Batas energi maksimum yang diserap sampai benda kerja pecah."
        ],
        answerIndex: 0
      },
      {
        q: "Bagaimanakah cara menentukan lokasi Titik Luluh (Yield Point) pada material getas (brittle) yang kurva tegangan-regangannya tidak menunjukkan batas luluh yang jelas?",
        options: [
          "Menggunakan Offset Method dengan menarik garis sejajar daerah elastis pada jarak regangan 0,2% (0,002).",
          "Membagi nilai beban patah akhir dengan akar kuadrat luas penampang mula-mula.",
          "Mengambil nilai titik puncak tertinggi dari kurva beban-perpanjangan.",
          "Mengukur sudut kemiringan grafik secara langsung dari titik awal koordinat nol."
        ],
        answerIndex: 0
      },
      {
        q: "Berdasarkan skema komponen Universal Testing Machine pada Gambar 16 di modul, bagian bernomor (2) dan (13) secara berurutan adalah...",
        options: [
          "Ragum atas (Upper Grip) dan Ragum bawah (Lower Grip)",
          "Base (Alas mesin) dan Upper Crosshead",
          "Vernier Calliper dan Timbangan Digital",
          "Grip Crank dan Shaft Adapter"
        ],
        answerIndex: 0
      }
    ],
    posttest: [
      {
        q: "Apakah istilah untuk fenomena terjadinya pengecilan luas penampang secara lokal atau setempat pada material ulet setelah melewati batas pembebanan maksimum (UTS)?",
        options: ["Necking", "Fracture", "Yielding", "Strain Hardening"],
        answerIndex: 0
      },
      {
        q: "Manakah formula yang tepat digunakan untuk menghitung Modulus Resilien (U) berdasarkan data titik luluh elastis benda uji?",
        options: [
          "U = 0.5 x tegangan luluh x regangan luluh",
          "U = tegangan luluh ÷ regangan luluh",
          "U = tegangan teknik x (1 + regangan teknik)",
          "U = ln(1 + regangan teknik)"
        ],
        answerIndex: 0
      },
      {
        q: "Mengapa kurva True Stress-Strain cenderung terus bergerak naik secara kontinyu pasca melewati titik UTS, berbeda dengan Engineering Diagram yang melengkung turun?",
        options: [
          "Karena perhitungan True Stress membagi gaya dengan luas penampang aktual (Ai) yang mengecil drastis akibat necking.",
          "Karena material mengalami pendinginan mendadak akibat regangan tinggi.",
          "Karena mesin Universal Testing Machine otomatis menaikkan kecepatan beban penarikan secara masif.",
          "Karena efek slip batas butir kristal yang berhenti total."
        ],
        answerIndex: 0
      },
      {
        q: "Persamaan manakah yang valid digunakan untuk mengonversi Regangan Teknik menjadi Regangan Sebenarnya (True Strain) sebelum daerah necking terjadi?",
        options: [
          "Regangan Sebenarnya = ln(1 + Regangan Teknik)",
          "Regangan Sebenarnya = Regangan Teknik x (1 + Tegangan Teknik)",
          "Regangan Sebenarnya = Tegangan Luluh ÷ Modulus Elastisitas",
          "Regangan Sebenarnya = ln(Panjang Awal ÷ Panjang Aktual)"
        ],
        answerIndex: 0
      },
      {
        q: "Tindakan apa yang wajib dilakukan praktikan segera setelah benda uji mengalami patah (fracture) dan mesin Universal Testing Machine berhenti menarik?",
        options: [
          "Melepaskan spesimen lalu mengukur panjang gauge length akhir dan diameter minimum pada sektor necking.",
          "Langsung menekan tombol darurat (Emergency Stop) dan mencabut kabel listrik utama.",
          "Membersihkan pecahan logam dengan tangan kosong tanpa alat bantu pelindung.",
          "Menginput ulang data dimensi awal ke program komputer U-60."
        ],
        answerIndex: 0
      }
    ],
    vrStages: [
      {
        no: 1,
        judul: "Briefing & APD",
        icon: "🦺",
        ringkas: "Orientasi Universal Testing Machine dan alat pelindung diri.",
        detail: [
          "Mahasiswa berdiri di depan Universal Testing Machine 3D; ke-16 komponennya (grip, crosshead, column, ram cylinder…) berlabel dan bisa disorot satu per satu.",
          "Panel keselamatan mengingatkan penggunaan APD sebelum tombol lanjut aktif — sesuai peringatan pada prosedur modul.",
        ],
      },
      {
        no: 2,
        judul: "Pengukuran Benda Kerja",
        icon: "📏",
        ringkas: "Ukur dimensi spesimen ASTM E8 dengan vernier calliper virtual.",
        detail: [
          "Mahasiswa mengukur Gauge Length, Diameter, dan berat spesimen memakai calliper & timbangan virtual; nilai harus dicatat benar sebelum lanjut.",
          "Sistem membandingkan hasil ukur dengan toleransi ASTM E8 (50,0 ± 0,10 mm; 12,5 ± 0,25 mm).",
        ],
      },
      {
        no: 3,
        judul: "Input Data & Pencekaman",
        icon: "🗜️",
        ringkas: "Masukkan dimensi ke program U-60 lalu cekam spesimen di kedua ragum.",
        detail: [
          "Layar PC virtual menampilkan program U-60; data dimensi diinput lewat panel.",
          "Spesimen dicekam ke ragum atas, ragum bawah dinaikkan (push button up), lalu dicekam — urutan salah memicu peringatan 'pencekaman tidak sempurna'.",
        ],
      },
      {
        no: 4,
        judul: "Eksekusi Uji Tarik",
        icon: "▶️",
        ringkas: "Klik Test — crosshead menarik spesimen hingga patah.",
        detail: [
          "Spesimen meregang secara nyata; kurva Force–Elongation tergambar live di layar U-60 virtual.",
          "Mahasiswa mengamati fase elastis, yield, strain hardening, necking (pada material ductile), sampai fracture — masing-masing ditandai pada kurva.",
        ],
      },
      {
        no: 5,
        judul: "Pengamatan Necking & Fracture",
        icon: "🔬",
        ringkas: "Amati pengecilan penampang setempat dan pola patahan dari dekat.",
        detail: [
          "Setelah patah, spesimen bisa diambil dan diamati dari dekat: cup-and-cone (ductile) vs patah datar (brittle).",
          "Mode perbandingan menampilkan dua spesimen material berbeda berdampingan.",
        ],
      },
      {
        no: 6,
        judul: "Pengukuran Akhir & Konversi Data",
        icon: "🧮",
        ringkas: "Ukur Li dan diameter necking, konversi F–ΔL → σ–ε.",
        detail: [
          "Gauge length akhir dan diameter minimum diukur ulang dengan calliper.",
          "Panel perhitungan memandu konversi 30 titik ke Engineering & True Diagram, lalu menghitung σY, εY, σUTS, E, dan U dengan rumus modul.",
        ],
      },
      {
        no: 7,
        judul: "Analisis & Laporan",
        icon: "🎓",
        ringkas: "Jawab 6 pertanyaan pembahasan, data siap diekspor.",
        detail: [
          "Keenam pertanyaan pembahasan modul dijawab langsung di panel dengan bantuan kurva yang telah terbentuk.",
          "Seluruh data pengujian dapat diekspor (CSV) untuk penyusunan laporan praktikum.",
        ],
      },
    ],
    pdfUrl: "/docs/Tensile-Test.pdf",
  },
];
