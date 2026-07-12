// Model simulasi Tensile Test (ASTM E-8) — Modul Praktikum Ilmu Bahan ITS.
// Spesimen round ASTM E8: L0 = 50 mm (gauge length), D = 12,5 mm.
// Satuan mengikuti modul: Force dalam kgf, tegangan dalam kgf/mm².

export const L0 = 50; // mm
export const D0 = 12.5; // mm
export const A0 = (Math.PI / 4) * D0 * D0; // ≈ 122,72 mm²

export type Material = {
  id: string;
  nama: string;
  jenis: "ductile" | "brittle";
  warna: string;
  E: number; // modulus elastisitas, kgf/mm²
  sigmaY: number; // yield, kgf/mm²
  sigmaUTS: number; // ultimate, kgf/mm²
  epsUTS: number; // strain di UTS
  epsF: number; // strain saat fracture
  sigmaF: number; // tegangan saat fracture (ductile turun; brittle = UTS)
  neckDepth: number; // reduksi jari-jari leher saat fracture (0–1); ~ dari Reduction of Area nyata
};

// Nilai tipikal (dibulatkan) — cukup akurat untuk pembelajaran perbandingan.
export const MATERIALS: Material[] = [
  {
    id: "baja",
    nama: "Baja Karbon Rendah",
    jenis: "ductile",
    warna: "#bffd44",
    E: 21000,
    sigmaY: 25,
    sigmaUTS: 42,
    epsUTS: 0.2,
    epsF: 0.32,
    sigmaF: 32,
    neckDepth: 0.38, // RA ~62% (baja lunak)
  },
  {
    id: "aluminium",
    nama: "Aluminium 6061-T6",
    jenis: "ductile",
    warna: "#00cba0",
    E: 7000,
    sigmaY: 27.5,
    sigmaUTS: 31.5,
    epsUTS: 0.08,
    epsF: 0.13,
    sigmaF: 24,
    neckDepth: 0.26, // RA ~45% (6061-T6)
  },
  {
    id: "besi-cor",
    nama: "Besi Cor Kelabu",
    jenis: "brittle",
    warna: "#fb7943",
    E: 11000,
    sigmaY: 24.5, // ditentukan via offset 0,2% (yield tidak tampak jelas)
    sigmaUTS: 25,
    epsUTS: 0.0052,
    epsF: 0.0052, // brittle: patah tepat setelah beban maksimum, tanpa necking
    sigmaF: 25,
    neckDepth: 0, // brittle: tidak ada necking
  },
];

/** Engineering stress (kgf/mm²) pada engineering strain ε untuk material m. */
export function stressAt(m: Material, eps: number): number {
  const epsY = m.sigmaY / m.E;
  if (eps <= 0) return 0;
  if (eps <= epsY) return m.E * eps; // daerah elastis — hukum Hooke
  if (m.jenis === "brittle") {
    // sedikit melengkung lalu patah di epsF
    const t = Math.min(1, (eps - epsY) / (m.epsF - epsY));
    return m.sigmaY + (m.sigmaUTS - m.sigmaY) * (2 * t - t * t);
  }
  if (eps <= m.epsUTS) {
    // strain hardening: parabola menuju puncak UTS (gradien 0 di UTS)
    const t = (eps - epsY) / (m.epsUTS - epsY);
    return m.sigmaY + (m.sigmaUTS - m.sigmaY) * (2 * t - t * t);
  }
  // necking: beban turun hingga fracture
  const t = Math.min(1, (eps - m.epsUTS) / (m.epsF - m.epsUTS));
  return m.sigmaUTS - (m.sigmaUTS - m.sigmaF) * t * t;
}

export type Sample = { eps: number; sigma: number };

export type Phase = "idle" | "elastic" | "plastic" | "necking" | "fractured";

export type TensileState = {
  material: Material;
  running: boolean;
  eps: number; // engineering strain saat ini
  phase: Phase;
  samples: Sample[]; // kurva terekam
  // penanda titik penting (terisi saat terlewati)
  hitYield: boolean;
  hitUTS: boolean;
  fractured: boolean;
};

export function initTensile(material: Material): TensileState {
  return {
    material,
    running: false,
    eps: 0,
    phase: "idle",
    samples: [{ eps: 0, sigma: 0 }],
    hitYield: false,
    hitUTS: false,
    fractured: false,
  };
}

/** Majukan regangan; speed = laju regangan (strain/detik) dari kecepatan crosshead. */
export function stepTensile(prev: TensileState, dt: number, speed: number): TensileState {
  if (!prev.running || prev.fractured) return prev;
  const m = prev.material;
  const s = { ...prev };
  s.eps = Math.min(m.epsF, s.eps + speed * dt);

  const epsY = m.sigmaY / m.E;
  s.hitYield = s.eps >= epsY;
  s.hitUTS = s.eps >= m.epsUTS;
  s.phase = !s.hitYield ? "elastic" : !s.hitUTS ? "plastic" : "necking";
  if (m.jenis === "brittle" && s.hitYield) s.phase = "plastic";

  // rekam titik (decimasi agar kurva halus tapi hemat)
  const last = s.samples[s.samples.length - 1];
  if (s.eps - last.eps >= m.epsF / 240) {
    s.samples = [...s.samples, { eps: s.eps, sigma: stressAt(m, s.eps) }];
  }

  if (s.eps >= m.epsF) {
    s.fractured = true;
    s.running = false;
    s.phase = "fractured";
    s.samples = [...s.samples, { eps: m.epsF, sigma: stressAt(m, m.epsF) }];
  }
  return s;
}

/** Hasil perhitungan sesuai rumus modul. */
export function computeResults(m: Material) {
  const epsY = m.sigmaY / m.E;
  return {
    sigmaY: m.sigmaY,
    epsY,
    sigmaUTS: m.sigmaUTS,
    epsUTS: m.epsUTS,
    E: m.E,
    U: 0.5 * m.sigmaY * epsY, // Modulus Resilien
    Fmax: m.sigmaUTS * A0, // kgf
    Li: L0 * (1 + m.epsF), // panjang akhir gauge
  };
}

/** Rasio jari-jari leher (necking) terhadap kondisi di UTS (1 → 1−neckDepth saat fracture).
 *  Dipakai bersama oleh model fisika (Ai) dan visual 3D agar konsisten. */
export function neckFactorAt(m: Material, eps: number): number {
  if (m.jenis !== "ductile" || eps <= m.epsUTS) return 1;
  const t = Math.min(1, (eps - m.epsUTS) / (m.epsF - m.epsUTS));
  return 1 - m.neckDepth * t;
}

/** True stress sesuai definisi modul: σT = Fi/Ai.
 *  - Sampai UTS deformasi seragam (volume konstan): Ai = A0/(1+εE) → σT = σE(1+εE).
 *  - Setelah UTS (necking): Ai = [A0/(1+εUTS)]·n², dengan n = rasio jari-jari leher,
 *    sehingga σT = σE(1+εUTS)/n² — kurva True TERUS NAIK hingga fracture,
 *    persis seperti dijelaskan modul (berbeda dengan Engineering yang turun). */
export function trueStressAt(m: Material, eps: number, sigmaE: number): number {
  if (eps <= m.epsUTS || m.jenis === "brittle") return sigmaE * (1 + eps);
  const n = neckFactorAt(m, eps);
  return (sigmaE * (1 + m.epsUTS)) / (n * n);
}

/** Konversi engineering → true untuk satu titik.
 *  εT = ln(Li/L0) = ln(1+εE) — sesuai definisi modul (berbasis gauge length). */
export function toTrue(m: Material, s: Sample): Sample {
  return { eps: Math.log(1 + s.eps), sigma: trueStressAt(m, s.eps, s.sigma) };
}

/** Ambil ~n titik merata dari kurva (untuk tabel 30 titik / ekspor CSV). */
export function samplePoints(samples: Sample[], n = 30): Sample[] {
  if (samples.length <= n) return samples;
  const out: Sample[] = [];
  for (let i = 0; i < n; i++) {
    out.push(samples[Math.round((i / (n - 1)) * (samples.length - 1))]);
  }
  return out;
}
