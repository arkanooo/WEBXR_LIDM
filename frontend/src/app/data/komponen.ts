import type { ComponentType } from "react";
import {
  NutIcon,
  BoltIcon,
  NutBoltIcon,
  ScrewIcon,
  GearIcon,
  BevelGearIcon,
  StudIcon,
  BoxedStudIcon,
  BearingIcon,
  RodIcon,
  SpringIcon,
  ConeSpringIcon,
} from "../components/ComponentIcons";

export type Category = "Pengencang" | "Transmisi" | "Bantalan" | "Elastis & Lainnya";

export type Spec = { label: string; value: string };

export type Komponen = {
  no: number;
  nama: string;
  namaEn: string;
  category: Category;
  Icon: ComponentType<{ className?: string }>;
  desc: string;
  specs: Spec[];
};

// Sumber data: "Layout ARPeGa Final" — modul praktikum Penyederhanaan Gambar
// (Menggambar Teknik, Teknik Mesin). Semua gambar tanpa skala, satuan milimeter,
// sistem proyeksi sudut ketiga.
export const KOMPONEN: Komponen[] = [
  {
    no: 1,
    nama: "Mur",
    namaEn: "Nut",
    category: "Pengencang",
    Icon: NutIcon,
    desc: "Mur segi enam sebagai pasangan baut untuk mengikat komponen.",
    specs: [
      { label: "Lebar kunci", value: "24 mm" },
      { label: "Ø ulir", value: "16 mm" },
      { label: "Tebal", value: "13 mm" },
    ],
  },
  {
    no: 2,
    nama: "Baut",
    namaEn: "Bolt",
    category: "Pengencang",
    Icon: BoltIcon,
    desc: "Baut kepala segi enam dengan batang berulir sebagian.",
    specs: [
      { label: "Panjang total", value: "57 mm" },
      { label: "Panjang ulir", value: "44 mm" },
      { label: "Ø batang", value: "16 mm" },
      { label: "Tinggi kepala", value: "13 mm" },
    ],
  },
  {
    no: 3,
    nama: "Mur dan Baut",
    namaEn: "Nut and Bolt",
    category: "Pengencang",
    Icon: NutBoltIcon,
    desc: "Rakitan baut dan mur dalam kondisi terpasang.",
    specs: [
      { label: "Panjang", value: "72 mm" },
      { label: "Ø batang", value: "16 mm" },
      { label: "Lebar kunci", value: "24 mm" },
    ],
  },
  {
    no: 4,
    nama: "Baut Kepala Silinder",
    namaEn: "Counterbore Head Screw",
    category: "Pengencang",
    Icon: ScrewIcon,
    desc: "Baut kepala silinder bersoket untuk pemasangan tersembunyi (counterbore).",
    specs: [
      { label: "Panjang total", value: "60 mm" },
      { label: "Panjang ulir", value: "45 mm" },
      { label: "Ø kepala", value: "32 mm" },
      { label: "Ø batang", value: "16 mm" },
    ],
  },
  {
    no: 5,
    nama: "Baut Kepala Benam",
    namaEn: "Countersink Head Screw",
    category: "Pengencang",
    Icon: ScrewIcon,
    desc: "Baut kepala tirus yang rata dengan permukaan (countersink).",
    specs: [
      { label: "Panjang total", value: "70 mm" },
      { label: "Panjang ulir", value: "45 mm" },
      { label: "Ø kepala", value: "35 mm" },
      { label: "Ø batang", value: "16 mm" },
    ],
  },
  {
    no: 6,
    nama: "Roda Gigi Lurus",
    namaEn: "Spur Gear",
    category: "Transmisi",
    Icon: GearIcon,
    desc: "Roda gigi lurus untuk meneruskan putaran antar poros sejajar.",
    specs: [
      { label: "Jumlah gigi", value: "18" },
      { label: "Modul", value: "2" },
      { label: "Sudut tekan", value: "20°" },
      { label: "Ø luar", value: "42,4 mm" },
      { label: "Ø pitch", value: "38,1 mm" },
      { label: "Ø bore", value: "19 mm" },
    ],
  },
  {
    no: 7,
    nama: "Roda Gigi Payung Lurus",
    namaEn: "Straight Bevel Gear",
    category: "Transmisi",
    Icon: BevelGearIcon,
    desc: "Roda gigi payung untuk meneruskan putaran antar poros bersudut.",
    specs: [
      { label: "Jumlah gigi", value: "20" },
      { label: "Rasio", value: "2:1" },
      { label: "Ø luar", value: "71,1 mm" },
      { label: "Ø pitch", value: "63,5 mm" },
      { label: "Ø bore", value: "25,4 mm" },
    ],
  },
  {
    no: 8,
    nama: "Stud",
    namaEn: "Stud",
    category: "Pengencang",
    Icon: StudIcon,
    desc: "Batang berulir pada kedua ujung tanpa kepala.",
    specs: [
      { label: "Panjang", value: "96 mm" },
      { label: "Ø batang", value: "20 mm" },
      { label: "Ulir ujung", value: "30 & 46 mm" },
    ],
  },
  {
    no: 9,
    nama: "Boxed Stud",
    namaEn: "Boxed Stud",
    category: "Pengencang",
    Icon: BoxedStudIcon,
    desc: "Stud dengan bagian tengah berpenampang kotak untuk kunci pas.",
    specs: [
      { label: "Panjang", value: "96 mm" },
      { label: "Ø batang", value: "20 mm" },
      { label: "Ulir ujung", value: "30 & 46 mm" },
    ],
  },
  {
    no: 10,
    nama: "Bantalan",
    namaEn: "Bearing",
    category: "Bantalan",
    Icon: BearingIcon,
    desc: "Bantalan bola untuk menopang poros dan mengurangi gesekan.",
    specs: [
      { label: "Ø luar", value: "62 mm" },
      { label: "Ø dalam", value: "30 mm" },
      { label: "Lebar", value: "16 mm" },
      { label: "Ø lintasan bola", value: "46 mm" },
    ],
  },
  {
    no: 11,
    nama: "Rod",
    namaEn: "Rod",
    category: "Elastis & Lainnya",
    Icon: RodIcon,
    desc: "Batang bengkok dengan radius tekuk, contoh penyederhanaan bentuk.",
    specs: [
      { label: "Panjang lurus", value: "450 mm" },
      { label: "Ø batang", value: "12 mm" },
      { label: "Radius tekuk", value: "R100" },
      { label: "Sudut", value: "30°" },
    ],
  },
  {
    no: 12,
    nama: "Pegas Lurus",
    namaEn: "Straight Spring",
    category: "Elastis & Lainnya",
    Icon: SpringIcon,
    desc: "Pegas tekan silindris dengan pitch seragam.",
    specs: [
      { label: "Tinggi", value: "60 mm" },
      { label: "Ø kawat", value: "4 mm" },
      { label: "Pitch", value: "5 mm" },
      { label: "Lebar", value: "46 mm" },
    ],
  },
  {
    no: 13,
    nama: "Pegas Kerucut",
    namaEn: "Cone Spring",
    category: "Elastis & Lainnya",
    Icon: ConeSpringIcon,
    desc: "Pegas berbentuk kerucut dengan diameter mengecil ke atas.",
    specs: [
      { label: "Tinggi", value: "62 mm" },
      { label: "Ø kawat", value: "4 mm" },
      { label: "Ø bawah", value: "58 mm" },
      { label: "Ø atas", value: "25 mm" },
    ],
  },
];

export const CATEGORIES: Category[] = [
  "Pengencang",
  "Transmisi",
  "Bantalan",
  "Elastis & Lainnya",
];
