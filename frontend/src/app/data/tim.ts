


export const KARYA = {
  nama: "3DUTOPIA",
  kepanjangan: "3D Universal Training for Operational Practice and Industrial Application",
  deskripsi:
    "Platform praktikum manufaktur imersif berbasis WebXR yang dirancang untuk meningkatkan keterampilan mahasiswa teknik melalui simulasi virtual. Platform ini memungkinkan mahasiswa mempelajari komponen mesin, memahami prosedur operasional standar (SOP), serta melakukan simulasi pengoperasian praktikum dalam lab virtual tiga dimensi yang aman dan interaktif melalui perangkat VR. Dengan begitu mahasiswa dapat benar-benar siap sebelum memasuki laboratorium fisik.",
  fitur: [
    { icon: "🔩", judul: "Komponen Mesin 3D + AR", desc: "Pelajari 13 komponen mesin lengkap dengan marker AR untuk Meta Quest 2." },
    { icon: "📖", judul: "Modul & SOP", desc: "Materi praktikum terstruktur dengan prosedur operasional standar yang dapat diunduh." },
    { icon: "🥽", judul: "Simulasi Lab VR", desc: "Jalankan percobaan di lab virtual — atur katup, baca gauge, catat data tanpa risiko." },
  ],
};

export type Anggota = {
  id: string;
  nama: string;
  role: string;
  jurusan: string;
  angkatan: string;
  foto: string;
  accent: string;
  prestasi: string[];
  project: string[];
  organisasi: string[];
};

export const TIM: Anggota[] = [
  {
    id: "rian",
    nama: "Rian Abdul Hafidz",
    role: "Ketua Tim",
    jurusan: "Teknologi Rekayasa Manufaktur",
    angkatan: "2025",
    foto: "/profil/rian-abdul-hafidz.jpg",
    accent: "#bffd44",
    prestasi: [
      "Finalis Literasi Awards Radar Bromo × PT. Paiton Energy 2023",
      "Juara 2 PROCOMMIT V12",
      "Best Paper PROCOMMIT V12",
      "Top 5 Futurest Business Case Competition 2026",
      "Juara Harapan 1 IPLN 2026",
    ],
    project: [
      "Nalar Project — kolaborasi Jajak Majapahit × KPP Mining 2025",
      "FoodVerse — Virtual Food Cooking Lab Metaverse 2022",
    ],
    organisasi: ["UKM Penalaran ITS"],
  },
  {
    id: "arkan",
    nama: "Mohamad Arkan Zahir Asyafiq",
    role: "Anggota",
    jurusan: "Teknologi Informasi",
    angkatan: "2024",
    foto: "/profil/arkan-zahir.jpg",
    accent: "#7c4dff",
    prestasi: [
      "Juara 3 & Most Enterprise Ready Solution — Cyberhack 2026",
      "Juara 1 MABACUP MLBB",
      "Juara 2 Elite × Pesraf MLBB",
      "Juara 3 Competitive Programming CompIT",
      "Atlet ITS MLBB — Pomprov 2025",
    ],
    project: [
      "Maza — chatbot WhatsApp",
      "Cryptowatch",
      "Extension Chrome pendeteksi judi online",
      "Deteksi teks review AI",
    ],
    organisasi: [],
  },
  {
    id: "arfa",
    nama: "Arfa Raza Aqeela",
    role: "Anggota",
    jurusan: "Teknik Elektro",
    angkatan: "2025",
    foto: "/profil/arfa-raza-aqeela.jpg",
    accent: "#ffbf00",
    prestasi: [
      "Champion SRE InterCollab",
      "Juara 1 Science Project and Innovation EPW 15th",
      "Silver Medal AISEEF 6th",
      "Juara 3 El-Semar Elektro UNS 12th",
    ],
    project: [
      "Saqa-Bot — Solar-Powered Semi-Autonomous IoT Vessel Prototype (ESP32)",
    ],
    organisasi: ["UKM Penalaran"],
  },
  {
    id: "faqih",
    nama: "M. Faqih Ridho",
    role: "Anggota",
    jurusan: "Teknologi Informasi",
    angkatan: "2024",
    foto: "/profil/m-faqih-ridho.jpg",
    accent: "#00cba0",
    prestasi: [],
    project: [
      "Barunastra Internship — Programming Division",
      "Virtual Internship Big Data Analytics — Kimia Farma",
      "Bootcamp SOC for Beginner — Jagoan Siber",
    ],
    organisasi: ["CSSMORA ITS"],
  },
];

export const DOSEN: Anggota = {
  id: "rivai",
  nama: "Rivai Wardhani",
  role: "Dosen Pembimbing",
  jurusan: "Teknik Mesin Industri",
  angkatan: "ITS Surabaya",
  foto: "https://ui-avatars.com/api/?name=Rivai+Wardhani&background=ff5252&color=fff&size=512",
  accent: "#ff5252",
  prestasi: [
    "S1 Teknik Mesin - Institut Teknologi Bandung (ITB)",
    "S2 Production and Logistics - Universität Duisburg Essen, Germany",
  ],
  project: [
    "Dosen Departemen Teknik Mesin Industri",
  ],
  organisasi: [
    "Laboratorium Manufaktur Industri",
  ],
};
