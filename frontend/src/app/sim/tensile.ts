



export const L0 = 50; 
export const D0 = 12.5; 
export const A0 = (Math.PI / 4) * D0 * D0; 

export type Material = {
  id: string;
  nama: string;
  jenis: "ductile" | "brittle";
  warna: string;
  E: number; 
  sigmaY: number; 
  sigmaUTS: number; 
  epsUTS: number; 
  epsF: number; 
  sigmaF: number; 
  neckDepth: number; 
};


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
    neckDepth: 0.38, 
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
    neckDepth: 0.26, 
  },
  {
    id: "besi-cor",
    nama: "Besi Cor Kelabu",
    jenis: "brittle",
    warna: "#fb7943",
    E: 11000,
    sigmaY: 24.5, 
    sigmaUTS: 25,
    epsUTS: 0.0052,
    epsF: 0.0052, 
    sigmaF: 25,
    neckDepth: 0, 
  },
];


export function stressAt(m: Material, eps: number): number {
  const epsY = m.sigmaY / m.E;
  if (eps <= 0) return 0;
  if (eps <= epsY) return m.E * eps; 
  if (m.jenis === "brittle") {
    
    const t = Math.min(1, (eps - epsY) / (m.epsF - epsY));
    return m.sigmaY + (m.sigmaUTS - m.sigmaY) * (2 * t - t * t);
  }
  if (eps <= m.epsUTS) {
    
    const t = (eps - epsY) / (m.epsUTS - epsY);
    return m.sigmaY + (m.sigmaUTS - m.sigmaY) * (2 * t - t * t);
  }
  
  const t = Math.min(1, (eps - m.epsUTS) / (m.epsF - m.epsUTS));
  return m.sigmaUTS - (m.sigmaUTS - m.sigmaF) * t * t;
}

export type Sample = { eps: number; sigma: number };

export type Phase = "idle" | "elastic" | "plastic" | "necking" | "fractured";

export type TensileState = {
  material: Material;
  running: boolean;
  eps: number; 
  phase: Phase;
  samples: Sample[]; 
  
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


export function computeResults(m: Material) {
  const epsY = m.sigmaY / m.E;
  return {
    sigmaY: m.sigmaY,
    epsY,
    sigmaUTS: m.sigmaUTS,
    epsUTS: m.epsUTS,
    E: m.E,
    U: 0.5 * m.sigmaY * epsY, 
    Fmax: m.sigmaUTS * A0, 
    Li: L0 * (1 + m.epsF), 
  };
}


export function neckFactorAt(m: Material, eps: number): number {
  if (m.jenis !== "ductile" || eps <= m.epsUTS) return 1;
  const t = Math.min(1, (eps - m.epsUTS) / (m.epsF - m.epsUTS));
  return 1 - m.neckDepth * t;
}


export function trueStressAt(m: Material, eps: number, sigmaE: number): number {
  if (eps <= m.epsUTS || m.jenis === "brittle") return sigmaE * (1 + eps);
  const n = neckFactorAt(m, eps);
  return (sigmaE * (1 + m.epsUTS)) / (n * n);
}


export function toTrue(m: Material, s: Sample): Sample {
  return { eps: Math.log(1 + s.eps), sigma: trueStressAt(m, s.eps, s.sigma) };
}


export function samplePoints(samples: Sample[], n = 30): Sample[] {
  if (samples.length <= n) return samples;
  const out: Sample[] = [];
  for (let i = 0; i < n; i++) {
    out.push(samples[Math.round((i / (n - 1)) * (samples.length - 1))]);
  }
  return out;
}
