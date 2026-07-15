




export type SimState = {
  pumpOn: boolean;
  shutOffOpen: boolean; 
  prv0V1: number; 
  prv1V3: number; 
  fcvOpen: number; 
  leverExtend: boolean; 
  pistonPos: number; 
  strokeTimer: number; 
  lastStrokeTime: number | null; 
  lastStrokeGauges: Gauges | null; 
  stamping: boolean; 
};

export type Gauges = {
  p0Z2: number; 
  p1Z1: number; 
  p1Z3: number; 
  p1Z4: number; 
};

export const PUMP_MAX = 60; 





const AREA_RATIO = 122.6 / 201; 
const FRICTION_BAR = 2; 

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
  
  
  const p1Z4 = p1Z1 > 0 && s.leverExtend ? Math.min(s.prv1V3, p1Z1 / AREA_RATIO) : 0;
  
  
  const moving = isMoving(s);
  const p1Z3 = moving ? Math.min(p1Z1, p1Z4 * AREA_RATIO + FRICTION_BAR) : p1Z1;
  return { p0Z2, p1Z1, p1Z3, p1Z4 };
}

export function isMoving(s: SimState): boolean {
  if (!s.pumpOn || !s.shutOffOpen || !s.leverExtend || s.pistonPos >= 1) return false;
  const p1Z1 = Math.min(PUMP_MAX, s.prv0V1);
  
  
  const p3Needed = Math.min(s.prv1V3, p1Z1 / AREA_RATIO) * AREA_RATIO + FRICTION_BAR;
  return p1Z1 - p3Needed > 0.5;
}


export function advanceSpeed(s: SimState): number {
  const g = computeGauges(s);
  const dP = Math.max(0, g.p1Z1 - g.p1Z3);
  return 0.103 * (s.fcvOpen / 100) * Math.sqrt(dP);
}


export function step(prev: SimState, dt: number): SimState {
  const s = { ...prev, stamping: false };

  if (s.leverExtend) {
    if (isMoving(s)) {
      const v = advanceSpeed(s);
      const next = Math.min(1, s.pistonPos + v * dt);
      if (s.pistonPos < 1) s.strokeTimer += dt;
      if (next >= 1 && s.pistonPos < 1) {
        s.lastStrokeTime = s.strokeTimer; 
        s.lastStrokeGauges = computeGauges(prev); 
        s.stamping = true;
      }
      s.pistonPos = next;
    }
  } else {
    
    if (s.pistonPos > 0) s.pistonPos = Math.max(0, s.pistonPos - 0.6 * dt);
    s.strokeTimer = 0;
  }
  return s;
}


export function setLever(prev: SimState, extend: boolean): SimState {
  const s = { ...prev, leverExtend: extend };
  if (extend && prev.pistonPos === 0) s.strokeTimer = 0;
  return s;
}

export type DataRow = { p1z1: number; p1z3: number; p1z4: number; t: number | null };
