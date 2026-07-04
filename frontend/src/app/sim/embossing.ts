// Model simulasi sederhana Percobaan 4 — Embossing Machine.
// One-way FCV dimodelkan sebagai throttle + check valve (BUKAN pressure-
// compensated), sehingga waktu langkah berubah saat tekanan inlet/outlet
// divariasikan — sesuai kesimpulan yang dituju modul.

export type SimState = {
  pumpOn: boolean;
  shutOffOpen: boolean; // 0V2
  prv0V1: number; // bar, 10–60 (tekanan sistem)
  prv1V3: number; // bar, 5–50 (counter-holding)
  fcvOpen: number; // %, 5–100 (bukaan 1V2)
  leverExtend: boolean; // posisi katup 4/2 (1V1)
  pistonPos: number; // 0 (atas) .. 1 (bawah/extend penuh)
  strokeTimer: number; // detik berjalan sejak tuas ditarik
  lastStrokeTime: number | null; // hasil stopwatch langkah terakhir
  lastStrokeGauges: Gauges | null; // pembacaan gauge SAAT silinder bergerak (untuk dicatat)
  stamping: boolean; // stempel baru menyentuh foil (untuk efek visual)
};

export type Gauges = {
  p0Z2: number; // tekanan sistem setelah shut-off
  p1Z1: number; // sebelum FCV
  p1Z3: number; // setelah FCV
  p1Z4: number; // counter-holding
};

export const PUMP_MAX = 60; // bar — pompa & pump safety valve (0Z1)

// Silinder kerja ganda tipikal kit hidrolik Festo: piston Ø16 mm, rod Ø10 mm.
// A_piston = π/4·16² ≈ 201 mm² ; A_annulus = A_piston − π/4·10² ≈ 122,6 mm².
// Kesetimbangan gaya saat maju (steady): p3·A_p = p4·A_r + gesekan
//   → p3 ≈ p4·(A_r/A_p) + Δp_gesek
const AREA_RATIO = 122.6 / 201; // ≈ 0,61
const FRICTION_BAR = 2; // ekivalen gesekan seal + berat stempel

export function initialState(): SimState {
  return {
    pumpOn: false,
    shutOffOpen: true,
    prv0V1: 50,
    prv1V3: 10,
    fcvOpen: 50,
    leverExtend: false,
    pistonPos: 0,
    strokeTimer: 0,
    lastStrokeTime: null,
    lastStrokeGauges: null,
    stamping: false,
  };
}

export function computeGauges(s: SimState): Gauges {
  const supply = s.pumpOn ? Math.min(PUMP_MAX, s.prv0V1) : 0;
  const p0Z2 = s.pumpOn ? supply : 0;
  const p1Z1 = s.pumpOn && s.shutOffOpen ? supply : 0;
  // Counter-holding valve (PRV 1V3) menahan sisi rod pada tekanan setelannya
  // selama oli mengalir keluar melewatinya (silinder bergerak turun).
  const p1Z4 = p1Z1 > 0 && s.leverExtend ? Math.min(s.prv1V3, p1Z1 / AREA_RATIO) : 0;
  // Saat bergerak: p3 dari kesetimbangan gaya piston (rasio luas + gesekan);
  // saat diam: tekanan menyamakan diri dengan inlet (tidak ada drop di FCV).
  const moving = isMoving(s);
  const p1Z3 = moving ? Math.min(p1Z1, p1Z4 * AREA_RATIO + FRICTION_BAR) : p1Z1;
  return { p0Z2, p1Z1, p1Z3, p1Z4 };
}

export function isMoving(s: SimState): boolean {
  if (!s.pumpOn || !s.shutOffOpen || !s.leverExtend || s.pistonPos >= 1) return false;
  const p1Z1 = Math.min(PUMP_MAX, s.prv0V1);
  // Bergerak hanya jika tekanan suplai mampu melampaui tekanan yang dibutuhkan
  // untuk melawan counter-pressure di sisi rod (dikonversi lewat rasio luas).
  const p3Needed = Math.min(s.prv1V3, p1Z1 / AREA_RATIO) * AREA_RATIO + FRICTION_BAR;
  return p1Z1 - p3Needed > 0.5;
}

/** Kecepatan maju piston (fraksi langkah per detik).
 *  Orifice FCV: Q = Cd·A(bukaan)·√(2ΔP/ρ) → v ∝ bukaan × √(p1Z1 − p1Z3).
 *  Konstanta dikalibrasi agar setelan modul (50/10 bar, FCV 50%) → langkah ±3 s. */
export function advanceSpeed(s: SimState): number {
  const g = computeGauges(s);
  const dP = Math.max(0, g.p1Z1 - g.p1Z3);
  return 0.103 * (s.fcvOpen / 100) * Math.sqrt(dP);
}

/** Majukan simulasi sebesar dt detik (mutasi salinan, kembalikan state baru). */
export function step(prev: SimState, dt: number): SimState {
  const s = { ...prev, stamping: false };

  if (s.leverExtend) {
    if (isMoving(s)) {
      const v = advanceSpeed(s);
      const next = Math.min(1, s.pistonPos + v * dt);
      if (s.pistonPos < 1) s.strokeTimer += dt;
      if (next >= 1 && s.pistonPos < 1) {
        s.lastStrokeTime = s.strokeTimer; // stopwatch berhenti saat extend penuh
        s.lastStrokeGauges = computeGauges(prev); // bekukan pembacaan fase gerak
        s.stamping = true;
      }
      s.pistonPos = next;
    }
  } else {
    // retract cepat (sisi rod langsung ke tangki lewat check valve FCV)
    if (s.pistonPos > 0) s.pistonPos = Math.max(0, s.pistonPos - 0.6 * dt);
    s.strokeTimer = 0;
  }
  return s;
}

/** Tarik/lepas tuas 4/2 — menarik tuas dari posisi atas memulai stopwatch. */
export function setLever(prev: SimState, extend: boolean): SimState {
  const s = { ...prev, leverExtend: extend };
  if (extend && prev.pistonPos === 0) s.strokeTimer = 0;
  return s;
}

export type DataRow = { p1z1: number; p1z3: number; p1z4: number; t: number | null };
