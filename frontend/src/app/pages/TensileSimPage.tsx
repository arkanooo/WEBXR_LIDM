import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import PageShell from "../components/PageShell";
import VRAccessCard from "../components/VRAccessCard";
import { QuizModal } from "../components/QuizModal";
import { MODUL_LIST } from "../data/modul";
import {
  MATERIALS,
  L0,
  A0,
  initTensile,
  stepTensile,
  computeResults,
  stressAt,
  toTrue,
  trueStressAt,
  neckFactorAt,
  samplePoints,
  type TensileState,
  type Material,
} from "../sim/tensile";


const MM = 0.01; 
const GAUGE = L0 * MM; 
const RAD = (12.5 / 2) * MM;

const CENTER_Y = 1.15; 
const TOP_GRIP_Y = CENTER_Y + GAUGE / 2 + 0.16; 

function buildUTM(scene: THREE.Scene, specimenColor: number) {
  const steel = new THREE.MeshStandardMaterial({ color: 0xb8c0cc, metalness: 0.65, roughness: 0.3 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x5a626f, metalness: 0.45, roughness: 0.55 });
  const darker = new THREE.MeshStandardMaterial({ color: 0x353a44, metalness: 0.4, roughness: 0.6 });
  const specMat = new THREE.MeshStandardMaterial({ color: specimenColor, metalness: 0.6, roughness: 0.35 });

  
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(2.3, 48),
    new THREE.MeshStandardMaterial({ color: 0x0e1013, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.5;
  scene.add(ground);

  
  const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 1.0), dark);
  base.position.y = -0.25;
  const basePlate = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.06, 1.12), darker);
  basePlate.position.y = 0.03;
  scene.add(base, basePlate);
  for (let i = 0; i < 3; i++) {
    const vent = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.03, 0.01), darker);
    vent.position.set(-0.35, -0.14 - i * 0.09, 0.505);
    scene.add(vent);
  }
  const powerLight = new THREE.Mesh(
    new THREE.SphereGeometry(0.025, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xbffd44, emissive: 0x86b322, emissiveIntensity: 0.4 })
  );
  powerLight.position.set(0.55, -0.12, 0.505);
  scene.add(powerLight);

  
  const console3d = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.52, 0.3), dark);
  console3d.position.set(1.12, 0.26, 0.15);
  console3d.rotation.y = -0.35;
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x0a0f0a, emissive: 0x1c2a10, emissiveIntensity: 0.8,
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.18), screenMat);
  screen.position.set(1.06, 0.36, 0.31);
  screen.rotation.y = -0.35;
  scene.add(console3d, screen);

  
  const colGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.1, 20);
  const colL = new THREE.Mesh(colGeo, steel); colL.position.set(-0.45, 1.05, 0.1);
  const colR = new THREE.Mesh(colGeo, steel); colR.position.set(0.45, 1.05, 0.1);
  const screwGeo = new THREE.CylinderGeometry(0.024, 0.024, 2.0, 12);
  const screwMat = new THREE.MeshStandardMaterial({ color: 0x8b93a1, metalness: 0.8, roughness: 0.25 });
  const screwL = new THREE.Mesh(screwGeo, screwMat); screwL.position.set(-0.45, 1.0, -0.14);
  const screwR = new THREE.Mesh(screwGeo, screwMat); screwR.position.set(0.45, 1.0, -0.14);
  
  const threadGeo = new THREE.TorusGeometry(0.03, 0.006, 6, 14);
  [screwL, screwR].forEach((s) => {
    for (let i = -8; i <= 8; i++) {
      const t = new THREE.Mesh(threadGeo, screwMat);
      t.rotation.x = Math.PI / 2;
      t.position.y = i * 0.11;
      s.add(t);
    }
  });
  scene.add(colL, colR, screwL, screwR);

  
  const upperCross = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.18, 0.38), steel);
  upperCross.position.y = 2.0;
  const loadCell = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.12, 24), darker);
  loadCell.position.y = 1.85;
  
  const upperRodLen = 1.79 - (TOP_GRIP_Y + 0.12);
  const upperRod = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, upperRodLen, 16), steel);
  upperRod.position.y = TOP_GRIP_Y + 0.12 + upperRodLen / 2;
  scene.add(upperCross, loadCell, upperRod);

  
  const lowerCross = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.16, 0.34), steel);
  scene.add(lowerCross);

  
  const ramGeo = new THREE.CylinderGeometry(0.09, 0.09, 1, 24);
  ramGeo.translate(0, 0.5, 0); 
  const ram = new THREE.Mesh(ramGeo, darker);
  ram.position.y = 0.06;
  const ramCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.1, 24), dark);
  ramCollar.position.y = 0.1;
  scene.add(ram, ramCollar);

  
  function makeHalf(): { group: THREE.Group; gauge: THREE.Mesh } {
    const g = new THREE.Group();
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(RAD * 1.6, RAD * 1.6, 0.22, 20), specMat.clone());
    grip.position.y = 0.11 + GAUGE / 2 + 0.05;
    const shoulder = new THREE.Mesh(new THREE.CylinderGeometry(RAD * 1.6, RAD, 0.05, 20), specMat.clone());
    shoulder.position.y = GAUGE / 2 + 0.025;
    
    
    const gaugeGeo = new THREE.CylinderGeometry(RAD, RAD, GAUGE / 2, 20);
    gaugeGeo.translate(0, -GAUGE / 4, 0); 
    const gauge = new THREE.Mesh(gaugeGeo, specMat.clone());
    gauge.position.y = GAUGE / 2; 
    g.add(grip, shoulder, gauge);
    return { group: g, gauge };
  }
  const top = makeHalf();
  const bottom = makeHalf();
  bottom.group.rotation.z = Math.PI; 
  scene.add(top.group, bottom.group);

  
  function makeGrip(): THREE.Group {
    const g = new THREE.Group();
    const block = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.24, 0.3), dark);
    const jawL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.26, 0.2), darker);
    jawL.position.set(-0.1, 0, 0.02);
    const jawR = jawL.clone(); jawR.position.x = 0.1;
    g.add(block, jawL, jawR);
    const boltGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.02, 10);
    for (const sx of [-0.09, 0.09]) for (const sy of [-0.07, 0.07]) {
      const b = new THREE.Mesh(boltGeo, steel);
      b.rotation.x = Math.PI / 2;
      b.position.set(sx, sy, 0.155);
      g.add(b);
    }
    return g;
  }
  const upperGrip = makeGrip();
  const lowerGrip = makeGrip();
  scene.add(upperGrip, lowerGrip);

  
  const lowerRod = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.16, 16), steel);
  scene.add(lowerRod);

  
  const flash = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffb066, transparent: true, opacity: 0 })
  );
  scene.add(flash);

  return { top, bottom, lowerCross, upperGrip, lowerGrip, lowerRod, ram, screwL, screwR, screen: screenMat, powerLight, flash, specMat };
}


type ChartMode = "F-dL" | "engineering" | "true";

function drawChart(
  cv: HTMLCanvasElement,
  s: TensileState,
  mode: ChartMode
) {
  const ctx = cv.getContext("2d")!;
  const W = cv.width, H = cv.height;
  ctx.clearRect(0, 0, W, H);
  const m = s.material;
  const pad = { l: 54, r: 14, t: 16, b: 40 };

  
  const sigmaTMax = trueStressAt(m, m.epsF, stressAt(m, m.epsF));
  const xMax0 = mode === "F-dL" ? m.epsF * L0 * 1.08 : mode === "true" ? Math.log(1 + m.epsF) * 1.08 : m.epsF * 1.08;
  const yMax0 =
    mode === "F-dL" ? m.sigmaUTS * A0 * 1.15 : mode === "true" ? sigmaTMax * 1.1 : m.sigmaUTS * 1.15;
  const X = (x: number) => pad.l + (x / xMax0) * (W - pad.l - pad.r);
  const Y = (y: number) => H - pad.b - (y / yMax0) * (H - pad.t - pad.b);

  
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) {
    const gy = pad.t + ((H - pad.t - pad.b) * i) / 4;
    ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(W - pad.r, gy); ctx.stroke();
  }
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.beginPath();
  ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, H - pad.b); ctx.lineTo(W - pad.r, H - pad.b);
  ctx.stroke();

  const labels: Record<ChartMode, [string, string]> = {
    "F-dL": ["ΔL (mm)", "F (kgf)"],
    engineering: ["εE (mm/mm)", "σE (kgf/mm²)"],
    true: ["εT (mm/mm)", "σT (kgf/mm²)"],
  };
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "11px Chivo, sans-serif";
  ctx.fillText(labels[mode][0], W - pad.r - 70, H - 8);
  ctx.save(); ctx.translate(12, pad.t + 76); ctx.rotate(-Math.PI / 2); ctx.fillText(labels[mode][1], 0, 0); ctx.restore();

  
  const pt = (eps: number, sigma: number): [number, number] => {
    if (mode === "F-dL") return [eps * L0, sigma * A0];
    if (mode === "true") { const t = toTrue(m, { eps, sigma }); return [t.eps, t.sigma]; }
    return [eps, sigma];
  };

  
  ctx.strokeStyle = m.warna;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  s.samples.forEach((p, i) => {
    const [x, y] = pt(p.eps, p.sigma);
    i === 0 ? ctx.moveTo(X(x), Y(y)) : ctx.lineTo(X(x), Y(y));
  });
  ctx.stroke();

  
  const mark = (eps: number, sigma: number, label: string, on: boolean) => {
    if (!on) return;
    const [x, y] = pt(eps, sigma);
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(X(x), Y(y), 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "bold 11px Chivo, sans-serif";
    ctx.fillText(label, Math.min(X(x) + 7, W - 66), Y(y) - 6);
  };
  const epsY = m.sigmaY / m.E;
  mark(epsY, m.sigmaY, "Yield", s.hitYield);
  mark(m.epsUTS, m.sigmaUTS, "UTS", s.hitUTS);
  mark(m.epsF, stressAt(m, m.epsF), "Fracture", s.fractured);

  
  if (!s.fractured && s.eps > 0) {
    const [x, y] = pt(s.eps, stressAt(m, s.eps));
    ctx.fillStyle = m.warna;
    ctx.beginPath(); ctx.arc(X(x), Y(y), 5, 0, Math.PI * 2); ctx.fill();
  }
}


type SoundEngine = {
  setRunning(on: boolean): void;
  setLoad(x: number): void; 
  bang(): void; 
  setMuted(m: boolean): void;
  dispose(): void;
};

function createSound(): SoundEngine {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0.9;
  master.connect(ctx.destination);

  
  const humGain = ctx.createGain();
  humGain.gain.value = 0;
  const humLP = ctx.createBiquadFilter();
  humLP.type = "lowpass";
  humLP.frequency.value = 320;
  const o1 = ctx.createOscillator(); o1.type = "sawtooth"; o1.frequency.value = 55;
  const o2 = ctx.createOscillator(); o2.type = "sawtooth"; o2.frequency.value = 110.5;
  const o2g = ctx.createGain(); o2g.gain.value = 0.4;
  o1.connect(humLP); o2.connect(o2g); o2g.connect(humLP);
  humLP.connect(humGain); humGain.connect(master);
  o1.start(); o2.start();

  
  const noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuf; noise.loop = true;
  const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 700; bp.Q.value = 0.8;
  const noiseGain = ctx.createGain(); noiseGain.gain.value = 0;
  noise.connect(bp); bp.connect(noiseGain); noiseGain.connect(master);
  noise.start();

  return {
    setRunning(on) {
      if (ctx.state === "suspended") void ctx.resume();
      const t = ctx.currentTime;
      humGain.gain.cancelScheduledValues(t);
      noiseGain.gain.cancelScheduledValues(t);
      humGain.gain.linearRampToValueAtTime(on ? 0.055 : 0, t + (on ? 0.4 : 0.25));
      noiseGain.gain.linearRampToValueAtTime(on ? 0.02 : 0, t + (on ? 0.6 : 0.25));
    },
    setLoad(x) {
      const k = 1 + 0.3 * Math.min(1, Math.max(0, x));
      o1.frequency.value = 55 * k;
      o2.frequency.value = 110.5 * k;
      bp.frequency.value = 700 + 800 * x;
    },
    bang() {
      if (ctx.state === "suspended") void ctx.resume();
      const t = ctx.currentTime;
      
      const src = ctx.createBufferSource(); src.buffer = noiseBuf;
      const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 250;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.9, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      src.connect(hp); hp.connect(g); g.connect(master);
      src.start(t); src.stop(t + 0.25);
      
      const th = ctx.createOscillator(); th.type = "sine";
      th.frequency.setValueAtTime(130, t);
      th.frequency.exponentialRampToValueAtTime(42, t + 0.3);
      const tg = ctx.createGain();
      tg.gain.setValueAtTime(0.7, t);
      tg.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
      th.connect(tg); tg.connect(master);
      th.start(t); th.stop(t + 0.4);
      
      const pg = ctx.createGain();
      pg.gain.setValueAtTime(0.18, t + 0.02);
      pg.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      const p = ctx.createOscillator(); p.type = "triangle";
      p.frequency.setValueAtTime(1600, t + 0.02);
      p.frequency.exponentialRampToValueAtTime(900, t + 0.5);
      p.connect(pg); pg.connect(master);
      p.start(t + 0.02); p.stop(t + 0.62);
    },
    setMuted(m) {
      master.gain.value = m ? 0 : 0.9;
    },
    dispose() {
      void ctx.close();
    },
  };
}


export default function TensileSimPage() {
  const navigate = useNavigate();
  const mountRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const vrSlotRef = useRef<HTMLDivElement>(null);
  const vrObserverRef = useRef<MutationObserver | null>(null);
  const simRef = useRef<TensileState>(initTensile(MATERIALS[0]));
  const speedRef = useRef(1); 
  const modeRef = useRef<ChartMode>("engineering");
  const soundRef = useRef<SoundEngine | null>(null);
  const mutedRef = useRef(false);
  const [ui, setUi] = useState<TensileState>(simRef.current);
  const [mode, setMode] = useState<ChartMode>("engineering");
  const [speed, setSpeed] = useState(1);
  const [muted, setMutedState] = useState(false);
  const [showPostTest, setShowPostTest] = useState(false);

  const modul = MODUL_LIST.find(m => m.id === "tensile-test");

  const sound = () => {
    if (!soundRef.current) {
      soundRef.current = createSound();
      soundRef.current.setMuted(mutedRef.current);
    }
    return soundRef.current;
  };
  const toggleMute = () => {
    mutedRef.current = !mutedRef.current;
    setMutedState(mutedRef.current);
    soundRef.current?.setMuted(mutedRef.current);
  };

  const setChartMode = (m: ChartMode) => { modeRef.current = m; setMode(m); };
  const setTestSpeed = (v: number) => { speedRef.current = v; setSpeed(v); };

  const pilihMaterial = (m: Material) => {
    if (simRef.current.running) return;
    simRef.current = initTensile(m);
    setUi(simRef.current);
  };
  const mulai = () => {
    if (simRef.current.fractured) simRef.current = initTensile(simRef.current.material);
    simRef.current = { ...simRef.current, running: true };
    setUi(simRef.current);
    sound().setRunning(true); 
  };
  const reset = () => {
    simRef.current = initTensile(simRef.current.material);
    setUi(simRef.current);
    soundRef.current?.setRunning(false);
  };

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x14161b);
    scene.fog = new THREE.Fog(0x14161b, 5, 12);

    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.05, 30);
    camera.position.set(1.9, 1.5, 2.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.xr.enabled = true;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    scene.add(new THREE.HemisphereLight(0xffffff, 0x33402a, 1.4));
    const key = new THREE.DirectionalLight(0xffffff, 2.8);
    key.position.set(3, 4, 2);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xcfe0ff, 1.1);
    fill.position.set(-2.5, 2.5, 3);
    scene.add(fill);

    let rig = buildUTM(scene, new THREE.Color(simRef.current.material.warna).getHex());
    let currentMatId = simRef.current.material.id;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.1, 0);
    controls.enableDamping = true;
    controls.minDistance = 1.2;
    controls.maxDistance = 6;

    if (navigator.xr && vrSlotRef.current) {
      const btn = VRButton.createButton(renderer);
      Object.assign(btn.style, {
        position: "static", margin: "0", width: "auto", padding: "10px 20px",
        borderRadius: "9999px", border: "1px solid #BFFD44",
        background: "rgba(191,253,68,0.12)", color: "#BFFD44",
        font: "700 13px 'Chivo', sans-serif",
      });
      const localize = () => {
        const t = btn.textContent?.toUpperCase() ?? "";
        if (t.includes("NOT SUPPORTED") && btn.textContent !== "VR tidak didukung — buka di Quest 2")
          btn.textContent = "VR tidak didukung — buka di Quest 2";
        else if (t.includes("ENTER VR")) btn.textContent = "Masuk VR (Quest 2)";
        else if (t.includes("EXIT VR")) btn.textContent = "Keluar VR";
      };
      localize();
      vrObserverRef.current = new MutationObserver(localize);
      vrObserverRef.current.observe(btn, { childList: true, characterData: true, subtree: true });
      vrSlotRef.current.appendChild(btn);
    }

    let uiSync = 0;
    let prevFractured = false;
    let flashT = 0;
    const clock = new THREE.Clock();

    renderer.setAnimationLoop(() => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const m = simRef.current.material;

      
      if (m.id !== currentMatId) {
        currentMatId = m.id;
        const c = new THREE.Color(m.warna);
        [rig.top, rig.bottom].forEach((h) =>
          h.group.traverse((o) => {
            if (o instanceof THREE.Mesh) (o.material as THREE.MeshStandardMaterial).color.copy(c);
          })
        );
      }

      
      const rate = (m.epsF / 24) * speedRef.current;
      simRef.current = stepTensile(simRef.current, dt, rate);
      const s = simRef.current;

      
      const dL = s.eps * L0 * MM;
      const gap = s.fractured ? 0.05 : 0;
      const stretch = 1 + s.eps;
      
      const neck = neckFactorAt(m, s.eps);

      rig.top.group.position.y = CENTER_Y + gap / 2;
      rig.bottom.group.position.y = CENTER_Y - dL - gap / 2;
      [rig.top, rig.bottom].forEach((h) => {
        h.gauge.scale.set(neck, stretch, neck);
      });
      
      const botGripY = CENTER_Y - dL - gap - GAUGE / 2 - 0.16;
      rig.upperGrip.position.y = TOP_GRIP_Y;
      rig.lowerGrip.position.y = botGripY;
      rig.lowerRod.position.y = botGripY - 0.12 - 0.08;
      rig.lowerCross.position.y = botGripY - 0.28;
      rig.ram.scale.y = Math.max(0.1, rig.lowerCross.position.y - 0.08 - 0.06);

      
      if (s.running) {
        rig.screwL.rotation.y += dt * 4;
        rig.screwR.rotation.y -= dt * 4;
      }
      rig.screen.emissiveIntensity = s.running ? 2.2 : 0.8;
      rig.screen.emissive.set(s.running ? 0x3f6b1a : 0x1c2a10);
      (rig.powerLight.material as THREE.MeshStandardMaterial).emissiveIntensity = s.running ? 1.6 : 0.4;

      
      if (s.fractured && !prevFractured) {
        prevFractured = true;
        flashT = 0.45;
        rig.flash.position.y = CENTER_Y - dL / 2;
        soundRef.current?.bang();
        soundRef.current?.setRunning(false);
      }
      if (!s.fractured) prevFractured = false;
      if (flashT > 0) {
        flashT -= dt;
        const k = Math.max(0, flashT / 0.45);
        (rig.flash.material as THREE.MeshBasicMaterial).opacity = k * 0.85;
        rig.flash.scale.setScalar(1 + (1 - k) * 2.8);
      } else {
        (rig.flash.material as THREE.MeshBasicMaterial).opacity = 0;
      }

      
      soundRef.current?.setLoad(stressAt(m, s.eps) / m.sigmaUTS);

      
      uiSync += dt;
      if (uiSync > 0.08) {
        uiSync = 0;
        setUi({ ...s });
        if (chartRef.current) drawChart(chartRef.current, s, modeRef.current);
      }

      controls.update();
      renderer.render(scene, camera);
    });

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.setAnimationLoop(null);
      vrObserverRef.current?.disconnect();
      controls.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      vrSlotRef.current?.replaceChildren();
      soundRef.current?.dispose();
      soundRef.current = null;
    };
  }, []);

  const m = ui.material;
  const sigmaNow = stressAt(m, ui.eps);
  const res = computeResults(m);

  const exportCSV = () => {
    const pts = samplePoints(ui.samples, 30);
    const rows = [
      "No,F (kgf),dL (mm),Sigma_E (kgf/mm2),Eps_E,Sigma_T (kgf/mm2),Eps_T",
      ...pts.map((p, i) => {
        const t = toTrue(m, p);
        return [i + 1, (p.sigma * A0).toFixed(1), (p.eps * L0).toFixed(3), p.sigma.toFixed(3), p.eps.toFixed(5), t.sigma.toFixed(3), t.eps.toFixed(5)].join(",");
      }),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([rows], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `tensile-test-${m.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fase: Record<string, { label: string; cls: string }> = {
    idle: { label: "Siap", cls: "text-white/50 border-white/20" },
    elastic: { label: "● Elastis (Hukum Hooke)", cls: "text-[#BFFD44] border-[#BFFD44]/50" },
    plastic: { label: "● Plastis (Strain Hardening)", cls: "text-[#ffbf00] border-[#ffbf00]/50" },
    necking: { label: "● Necking!", cls: "text-[#FB7943] border-[#FB7943]/50" },
    fractured: { label: "■ FRACTURE — spesimen patah", cls: "text-[#FB7943] border-[#FB7943] font-bold" },
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-[1440px] px-6 pt-10 pb-8 md:px-10" style={{ fontFamily: "'Chivo', sans-serif" }}>
        <button
          onClick={() => navigate("/praktikum")}
          className="mb-6 inline-flex items-center gap-2 text-[15px] font-light text-white/60 transition-colors hover:text-[#BFFD44]"
        >
          ← Praktikum
        </button>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-light uppercase tracking-[0.3em] text-[#BFFD44]">
              Simulasi Praktikum · ASTM E-8
            </p>
            <h1 className="mt-1 text-[38px] font-black uppercase leading-none text-white md:text-[52px]">
              Tensile Test
            </h1>
          </div>
          <button
            onClick={() => navigate("/modul/tensile-test")}
            className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-[14px] font-light text-white/75 transition-colors hover:border-[#BFFD44] hover:text-white"
          >
            📖 Buka modul
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div>
            <div ref={mountRef} className="h-[380px] w-full overflow-hidden rounded-2xl border border-white/12 md:h-[440px]" />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={toggleMute}
                className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${
                  muted
                    ? "border-white/20 text-white/45 hover:border-white/40"
                    : "border-[#BFFD44]/50 bg-[#BFFD44]/10 font-bold text-[#BFFD44]"
                }`}
                title={muted ? "Nyalakan suara mesin" : "Matikan suara mesin"}
              >
                {muted ? "🔇 Suara mati" : "🔊 Suara mesin"}
              </button>
              <p className="text-[12px] font-light text-white/40">
                Universal Testing Machine — geser untuk memutar pandangan.
              </p>
            </div>
            <VRAccessCard judul="Tensile Test" vrSlotRef={vrSlotRef} />

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { l: "Force", v: (sigmaNow * A0).toFixed(0), u: "kgf" },
                { l: "Elongation", v: (ui.eps * L0).toFixed(2), u: "mm" },
                { l: "σE", v: sigmaNow.toFixed(1), u: "kgf/mm²" },
                { l: "εE", v: ui.eps.toFixed(4), u: "mm/mm" },
              ].map((g) => (
                <div key={g.l} className="rounded-xl border border-white/12 bg-black/40 px-4 py-3 text-center">
                  <p className="text-[11px] uppercase tracking-wide text-white/45">{g.l}</p>
                  <p className="mt-1 text-[22px] font-bold tabular-nums leading-none text-[#BFFD44]">
                    {g.v} <span className="text-[11px] font-light text-white/50">{g.u}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className={`mt-3 rounded-xl border bg-black/30 px-5 py-3 text-[14px] ${fase[ui.phase].cls}`}>
              {fase[ui.phase].label}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/12 bg-black/40 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-white/45">Diagram Live</p>
                <div className="flex gap-1.5">
                  {([["F-dL", "F–ΔL"], ["engineering", "σE–εE"], ["true", "σT–εT"]] as [ChartMode, string][]).map(([k, l]) => (
                    <button
                      key={k}
                      onClick={() => setChartMode(k)}
                      className={`rounded-full border px-3 py-1 text-[12px] transition-colors ${
                        mode === k ? "border-[#BFFD44] bg-[#BFFD44]/15 font-bold text-[#BFFD44]" : "border-white/15 font-light text-white/60 hover:border-white/40"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <canvas ref={chartRef} width={640} height={330} className="mt-3 w-full" />
            </div>

            <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md">
              <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-white/45">Benda Kerja & Kontrol</p>
              <div className="mt-4 flex gap-3 mb-5">
                <button
                  onClick={() => setShowPostTest(true)}
                  className="w-full rounded-xl bg-[#00cba0] px-4 py-3 text-[15px] font-bold text-black transition-transform hover:scale-[1.02] shadow-[0_0_15px_rgba(0,203,160,0.3)]"
                >
                  Akhiri Praktikum & Ambil Post-test →
                </button>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => pilihMaterial(mat)}
                    disabled={ui.running}
                    className={`rounded-xl border p-3 text-left transition-all disabled:opacity-50 ${
                      m.id === mat.id ? "border-[#BFFD44]/70 bg-[#BFFD44]/10" : "border-white/12 bg-black/25 hover:border-white/35"
                    }`}
                  >
                    <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: mat.warna }} />
                    <span className="mt-1 block text-[14px] font-bold leading-tight text-white">{mat.nama}</span>
                    <span className="text-[11px] font-light uppercase tracking-wide text-white/45">{mat.jenis}</span>
                  </button>
                ))}
              </div>
              <label className="mt-4 flex flex-col gap-1.5">
                <span className="flex justify-between text-[13px]">
                  <span className="font-light text-white/70">Kecepatan uji (simulasi)</span>
                  <span className="font-bold text-white">{speed.toFixed(1)}×</span>
                </span>
                <input
                  type="range" min={0.5} max={3} step={0.5} value={speed}
                  onChange={(e) => setTestSpeed(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#BFFD44]"
                />
              </label>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={mulai}
                  disabled={ui.running}
                  className="flex-1 rounded-xl bg-[#BFFD44] px-4 py-3 text-[16px] font-bold text-black transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40"
                >
                  {ui.fractured ? "🔁 Uji Ulang" : "▶ Mulai Uji Tarik"}
                </button>
                <button
                  onClick={reset}
                  className="rounded-xl border border-white/20 px-5 py-3 text-[15px] font-light text-white/70 hover:border-white/45"
                >
                  Reset
                </button>
              </div>
            </div>

            {ui.fractured && (
              <div className="rounded-2xl border border-[#BFFD44]/30 bg-[#BFFD44]/[0.05] p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#BFFD44]">Hasil Pengujian — {m.nama}</p>
                  <button onClick={exportCSV} className="rounded-full bg-[#BFFD44] px-4 py-1.5 text-[13px] font-bold text-black transition-transform hover:scale-105">
                    ⬇ CSV 30 titik
                  </button>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
                  {[
                    ["σY", `${res.sigmaY.toFixed(1)} kgf/mm²`],
                    ["εY", res.epsY.toFixed(4)],
                    ["σUTS", `${res.sigmaUTS.toFixed(1)} kgf/mm²`],
                    ["εUTS", res.epsUTS.toFixed(3)],
                    ["E", `${res.E.toLocaleString("id")} kgf/mm²`],
                    ["U (Resilien)", `${res.U.toFixed(3)} kgf/mm²`],
                    ["F maks", `${res.Fmax.toFixed(0)} kgf`],
                    ["Li akhir", `${res.Li.toFixed(1)} mm`],
                  ].map(([l, v]) => (
                    <div key={l as string}>
                      <dt className="text-[11px] uppercase tracking-wide text-white/45">{l}</dt>
                      <dd className="text-[16px] font-bold tabular-nums text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 rounded-lg border-l-2 border-[#BFFD44]/50 bg-black/25 px-3 py-2 text-[13px] font-light leading-relaxed text-white/70">
                  {m.jenis === "ductile"
                    ? `Material ductile: kurva menunjukkan yield point jelas, strain hardening hingga UTS, lalu necking (pengecilan penampang setempat) sebelum fracture — perhatikan leher pada spesimen 3D.`
                    : `Material brittle: patah terjadi segera setelah beban maksimum TANPA necking. Yield point tidak tampak jelas sehingga ditentukan dengan Offset Method 0,2%.`}
                </p>
              </div>
            )}

            <p className="text-[12px] font-light leading-relaxed text-white/40">
              💡 Jalankan uji pada ketiga material lalu bandingkan bentuk kurvanya — jawaban
              pertanyaan pembahasan no. 2 & 5 modul ada pada perbandingan tersebut. Spesimen: ASTM
              E8, L₀ = 50 mm, D = 12,5 mm (A₀ ≈ {A0.toFixed(1)} mm²).
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="flex items-center gap-3 text-[22px] font-black uppercase tracking-wide text-white">
            <span className="h-[2px] w-8 rounded-full bg-[#BFFD44]" />
            Titik Penting pada Kurva
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { i: "📐", j: "Proportional & Elastic Limit", d: "Dari 0 sampai titik p berlaku hukum Hooke (σ ∝ ε). Di bawah elastic limit, beban dilepas → spesimen kembali ke panjang semula." },
              { i: "📍", j: "Yield Point", d: "Logam bertambah panjang tanpa pertambahan beban berarti — awal deformasi plastis (permanen). Pada material brittle ditentukan dengan Offset Method 0,2%." },
              { i: "⛰️", j: "Ultimate Tensile Strength", d: "Puncak kurva = beban maksimum. Sampai titik ini deformasi masih homogen di sepanjang benda kerja." },
              { i: "💥", j: "Necking & Fracture", d: "Setelah UTS, material ductile mengalami pengecilan penampang setempat lalu patah; material brittle langsung patah tanpa necking." },
            ].map((c) => (
              <div key={c.j} className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md">
                <span className="text-[24px]">{c.i}</span>
                <h3 className="mt-2 text-[16px] font-bold text-white">{c.j}</h3>
                <p className="mt-2 text-[13px] font-light leading-relaxed text-white/65">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modul?.posttest && (
        <QuizModal
          isOpen={showPostTest}
          onClose={() => {
            setShowPostTest(false);
            navigate("/modul");
          }}
          quiz={modul.posttest}
          type="Post-test"
          onComplete={(score) => {
            // we just let them see the score, onClose will handle navigation
          }}
        />
      )}
    </PageShell>
  );
}
