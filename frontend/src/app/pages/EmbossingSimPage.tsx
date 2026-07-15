import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import PageShell from "../components/PageShell";
import VRAccessCard from "../components/VRAccessCard";
import {
  initialState,
  computeGauges,
  step,
  setLever,
  isMoving,
  type SimState,
  type DataRow,
} from "../sim/embossing";


function buildMachine(scene: THREE.Scene) {
  const steel = new THREE.MeshStandardMaterial({ color: 0xb8c0cc, metalness: 0.65, roughness: 0.35 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x5a626f, metalness: 0.45, roughness: 0.55 });
  const neon = new THREE.MeshStandardMaterial({ color: 0xbffd44, emissive: 0x86b322, emissiveIntensity: 0.4 });
  const foilMat = new THREE.MeshStandardMaterial({ color: 0xe8ecf1, metalness: 0.85, roughness: 0.22 });

  
  const table = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 1.1), dark);
  table.position.y = -0.04;
  scene.add(table);

  
  const frame = new THREE.Group();
  const colGeo = new THREE.BoxGeometry(0.1, 0.85, 0.12);
  const colL = new THREE.Mesh(colGeo, steel); colL.position.set(-0.33, 0.425, 0);
  const colR = new THREE.Mesh(colGeo, steel); colR.position.set(0.33, 0.425, 0);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.22, 0.3), steel); head.position.y = 0.95;
  frame.add(colL, colR, head);
  scene.add(frame);

  
  const cylBody = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.42, 24), dark);
  cylBody.position.y = 1.18;
  scene.add(cylBody);

  
  
  const rodGeo = new THREE.CylinderGeometry(0.035, 0.035, 1, 16);
  rodGeo.translate(0, 0.5, 0); 
  const rod = new THREE.Mesh(rodGeo, steel);
  scene.add(rod);

  
  const ram = new THREE.Group();
  const die = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.1, 0.24), neon);
  die.position.y = -0.02;
  ram.add(die);
  scene.add(ram);

  
  const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.3, 24), steel);
  roll.rotation.z = Math.PI / 2;
  roll.position.set(-1.0, 0.16, 0);
  scene.add(roll);

  const foil = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.006, 0.26), foilMat);
  foil.position.set(0.05, 0.09, 0);
  scene.add(foil);

  
  const anvil = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.3), dark);
  anvil.position.set(0, 0.05, 0);
  scene.add(anvil);

  
  const stamps = new THREE.Group();
  scene.add(stamps);

  return { ram, rod, roll, die, stamps };
}

const RAM_TOP = 0.62; 
const RAM_BOTTOM = 0.13; 
const ROD_ANCHOR = 1.05; 


function Gauge({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/12 bg-black/40 px-4 py-3 text-center">
      <p className="text-[11px] uppercase tracking-wide text-white/45">{label}</p>
      <p className="mt-1 text-[26px] font-bold tabular-nums leading-none text-[#BFFD44]">
        {value.toFixed(0)}
        <span className="ml-1 text-[12px] font-light text-white/50">bar</span>
      </p>
    </div>
  );
}

function Knob({
  label, value, min, max, unit, onChange,
}: { label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-baseline justify-between text-[13px]">
        <span className="font-light text-white/70">{label}</span>
        <span className="font-bold tabular-nums text-white">{value} {unit}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#BFFD44]"
      />
    </label>
  );
}

function Toggle({ label, on, onToggle, danger }: { label: string; on: boolean; onToggle: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-[14px] transition-colors ${
        on
          ? danger
            ? "border-[#FB7943] bg-[#FB7943]/15 text-white"
            : "border-[#BFFD44]/60 bg-[#BFFD44]/10 text-white"
          : "border-white/15 bg-white/[0.04] text-white/60 hover:border-white/35"
      }`}
    >
      <span className="font-light">{label}</span>
      <span className={`text-[12px] font-bold ${on ? (danger ? "text-[#FB7943]" : "text-[#BFFD44]") : "text-white/40"}`}>
        {on ? "ON" : "OFF"}
      </span>
    </button>
  );
}


export default function EmbossingSimPage() {
  const navigate = useNavigate();
  const mountRef = useRef<HTMLDivElement>(null);
  const vrSlotRef = useRef<HTMLDivElement>(null);
  const vrObserverRef = useRef<MutationObserver | null>(null);
  const simRef = useRef<SimState>(initialState());
  const [ui, setUi] = useState<SimState>(simRef.current);
  const [rows, setRows] = useState<DataRow[]>([]);
  const [emboss, setEmboss] = useState(0);

  
  const update = (patch: Partial<SimState>) => {
    simRef.current = { ...simRef.current, ...patch };
    setUi(simRef.current);
  };

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x14161b);
    scene.fog = new THREE.Fog(0x14161b, 5, 11);

    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.05, 30);
    camera.position.set(1.6, 1.15, 2.2);

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
    const rim = new THREE.DirectionalLight(0xbffd44, 0.8);
    rim.position.set(-3, 2, -2);
    scene.add(rim);

    const { ram, rod, roll, die, stamps } = buildMachine(scene);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.55, 0);
    controls.enableDamping = true;
    controls.minDistance = 1.2;
    controls.maxDistance = 5;

    
    if (navigator.xr && vrSlotRef.current) {
      const btn = VRButton.createButton(renderer);
      btn.style.position = "static";
      btn.style.margin = "0";
      btn.style.width = "auto";
      btn.style.padding = "10px 20px";
      btn.style.borderRadius = "9999px";
      btn.style.border = "1px solid #BFFD44";
      btn.style.background = "rgba(191,253,68,0.12)";
      btn.style.color = "#BFFD44";
      btn.style.font = "700 13px 'Chivo', sans-serif";
      const localize = () => {
        const t = btn.textContent?.toUpperCase() ?? "";
        if (t.includes("NOT SUPPORTED") && btn.textContent !== "VR tidak didukung — buka di Quest 2")
          btn.textContent = "VR tidak didukung — buka di Quest 2";
        else if (t.includes("ENTER VR")) btn.textContent = "Masuk VR (Quest 2)";
        else if (t.includes("EXIT VR")) btn.textContent = "Keluar VR";
      };
      localize();
      const obs = new MutationObserver(localize);
      obs.observe(btn, { childList: true, characterData: true, subtree: true });
      vrObserverRef.current = obs;
      vrSlotRef.current.appendChild(btn);
    }

    let uiSync = 0;
    const clock = new THREE.Clock();
    let stampFlash = 0;
    let pendingShift = false; 
    let embossTotal = 0;
    const stampMat = new THREE.MeshStandardMaterial({
      color: 0x2e3440,
      metalness: 0.6,
      roughness: 0.5,
    });
    const logoGeo = new THREE.BoxGeometry(0.17, 0.012, 0.15);

    renderer.setAnimationLoop(() => {
      const dt = Math.min(clock.getDelta(), 0.05);
      simRef.current = step(simRef.current, dt);
      const s = simRef.current;

      
      const ramY = RAM_TOP - (RAM_TOP - RAM_BOTTOM) * s.pistonPos;
      ram.position.y = ramY;
      rod.position.y = ramY + 0.03;
      rod.scale.y = ROD_ANCHOR + 0.25 - ramY; 

      if (s.pumpOn) roll.rotation.x += dt * 0.8;

      
      if (s.stamping) {
        stampFlash = 0.5;
        pendingShift = true;
        embossTotal += 1;
        const mark = new THREE.Mesh(logoGeo, stampMat);
        mark.position.set(0, 0.098, 0);
        stamps.add(mark);
      }
      if (stampFlash > 0) {
        stampFlash -= dt;
        (die.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4 + stampFlash * 2.4;
      }

      
      if (pendingShift && !s.leverExtend && s.pistonPos <= 0.02) {
        pendingShift = false;
        stamps.children.forEach((m) => (m.position.x += 0.3));
        for (let i = stamps.children.length - 1; i >= 0; i--) {
          if (stamps.children[i].position.x > 1.05) stamps.remove(stamps.children[i]);
        }
      }

      
      uiSync += dt;
      if (uiSync > 0.1) {
        uiSync = 0;
        setUi({ ...s });
        setEmboss(embossTotal);
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
    };
  }, []);

  const g = computeGauges(ui);
  const moving = isMoving(ui);

  const catat = () => {
    
    
    const fg = ui.lastStrokeGauges;
    if (!fg) return;
    setRows((r) => [...r, { p1z1: fg.p1Z1, p1z3: fg.p1Z3, p1z4: fg.p1Z4, t: ui.lastStrokeTime }]);
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
              Simulasi Praktikum · Percobaan 4
            </p>
            <h1 className="mt-1 text-[38px] font-black uppercase leading-none text-white md:text-[52px]">
              Embossing Machine
            </h1>
          </div>
          <button
            onClick={() => navigate("/modul/embossing-machine")}
            className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-[14px] font-light text-white/75 transition-colors hover:border-[#BFFD44] hover:text-white"
          >
            📖 Buka modul
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div>
            <div
              ref={mountRef}
              className="h-[380px] w-full overflow-hidden rounded-2xl border border-white/12 md:h-[480px]"
            />
            <p className="mt-3 text-[12px] font-light text-white/40">
              Geser untuk memutar pandangan · scroll untuk zoom.
            </p>
            <VRAccessCard judul="Embossing Machine" vrSlotRef={vrSlotRef} />

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Gauge label="0Z2 · Sistem" value={g.p0Z2} />
              <Gauge label="P1Z1 · Pra-FCV" value={g.p1Z1} />
              <Gauge label="P1Z3 · Pasca-FCV" value={g.p1Z3} />
              <Gauge label="P1Z4 · Counter" value={g.p1Z4} />
            </div>

            <div className="mt-3 flex items-center gap-4 rounded-xl border border-white/12 bg-black/30 px-5 py-3">
              <span className="text-[12px] uppercase tracking-wide text-white/45">⏱ Stopwatch langkah maju</span>
              <span className="text-[24px] font-bold tabular-nums text-white">
                {ui.leverExtend && ui.pistonPos < 1 ? ui.strokeTimer.toFixed(1) : (ui.lastStrokeTime?.toFixed(1) ?? "—")}
                <span className="ml-1 text-[13px] font-light text-white/50">s</span>
              </span>
              {moving && <span className="text-[12px] font-bold text-[#BFFD44]">● silinder maju…</span>}
              {ui.pistonPos >= 1 && <span className="text-[12px] font-bold text-[#FB7943]">■ extend penuh</span>}
              <span className="ml-auto flex items-center gap-2 rounded-full border border-[#BFFD44]/40 bg-[#BFFD44]/10 px-4 py-1.5">
                <span className="text-[12px] uppercase tracking-wide text-white/55">🏷 Hasil emboss</span>
                <span className="text-[20px] font-bold tabular-nums text-[#BFFD44]">{emboss}</span>
                <span className="text-[12px] font-light text-white/45">pcs</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md">
              <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-white/45">Panel Kontrol</p>
              <div className="mt-4 grid grid-cols-1 gap-2.5">
                <Toggle label="Pompa hidrolik (60 bar)" on={ui.pumpOn} onToggle={() => update({ pumpOn: !ui.pumpOn })} />
                <Toggle label="Shut-off valve (0V2)" on={ui.shutOffOpen} onToggle={() => update({ shutOffOpen: !ui.shutOffOpen })} />
              </div>
              <div className="mt-5 flex flex-col gap-4">
                <Knob label="PRV 0V1 — tekanan sistem" value={ui.prv0V1} min={10} max={60} unit="bar" onChange={(v) => update({ prv0V1: v })} />
                <Knob label="PRV 1V3 — counter-holding" value={ui.prv1V3} min={5} max={50} unit="bar" onChange={(v) => update({ prv1V3: v })} />
                <Knob label="FCV 1V2 — bukaan" value={ui.fcvOpen} min={5} max={100} unit="%" onChange={(v) => update({ fcvOpen: v })} />
              </div>
              <button
                onClick={() => {
                  simRef.current = setLever(simRef.current, !simRef.current.leverExtend);
                  setUi(simRef.current);
                }}
                className={`mt-5 w-full rounded-xl px-4 py-3.5 text-[16px] font-bold transition-all active:scale-[0.99] ${
                  ui.leverExtend
                    ? "bg-[#FB7943] text-black"
                    : "bg-[#BFFD44] text-black hover:scale-[1.01]"
                }`}
              >
                {ui.leverExtend ? "⬆ Lepas tuas 1V1 (retract)" : "⬇ Tarik tuas 1V1 (extend)"}
              </button>
            </div>

            <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-white/45">Tabel Data</p>
                <div className="flex gap-2">
                  <button
                    onClick={catat}
                    disabled={ui.lastStrokeTime === null}
                    className="rounded-full bg-[#BFFD44] px-4 py-1.5 text-[13px] font-bold text-black transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    + Catat
                  </button>
                  <button
                    onClick={() => setRows([])}
                    className="rounded-full border border-white/20 px-4 py-1.5 text-[13px] font-light text-white/60 hover:border-white/45"
                  >
                    Bersihkan
                  </button>
                </div>
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-center text-[13px]">
                  <thead>
                    <tr className="border-b border-white/12 text-[12px] italic text-white/45">
                      <th className="px-2 py-2 font-normal">p1Z1</th>
                      <th className="px-2 py-2 font-normal">p1Z3</th>
                      <th className="px-2 py-2 font-normal">p1Z4</th>
                      <th className="px-2 py-2 font-normal">t →</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-2 py-5 text-[13px] font-light text-white/35">
                          Selesaikan satu langkah maju penuh, lalu tekan “+ Catat”.
                        </td>
                      </tr>
                    ) : (
                      rows.map((r, i) => (
                        <tr key={i} className="border-b border-white/5 tabular-nums text-white/80 last:border-0">
                          <td className="px-2 py-1.5">{r.p1z1.toFixed(0)} bar</td>
                          <td className="px-2 py-1.5">{r.p1z3.toFixed(0)} bar</td>
                          <td className="px-2 py-1.5">{r.p1z4.toFixed(0)} bar</td>
                          <td className="px-2 py-1.5 font-bold text-[#BFFD44]">{r.t !== null ? `${r.t.toFixed(1)} s` : "—"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-[12px] font-light leading-relaxed text-white/40">
              💡 Ikuti prosedur modul: pompa ON → shut-off tutup → set 0V1 = 50 bar → buka shut-off →
              setel FCV hingga langkah ±3 s → variasikan 0V1 (inlet) lalu 1V3 (outlet) dan catat tiap hasil.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="flex items-center gap-3 text-[22px] font-black uppercase tracking-wide text-white">
            <span className="h-[2px] w-8 rounded-full bg-[#BFFD44]" />
            Keterangan Komponen &amp; Fungsinya dalam Simulasi
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {KETERANGAN.map((k) => (
              <div key={k.judul} className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/35 text-[19px]">{k.icon}</span>
                  <h3 className="text-[17px] font-bold leading-tight text-white">{k.judul}</h3>
                </div>
                <p className="mt-3 text-[13.5px] font-light leading-relaxed text-white/70">{k.apa}</p>
                <p className="mt-3 rounded-lg border-l-2 border-[#BFFD44]/50 bg-black/25 px-3 py-2 text-[13px] font-light leading-relaxed text-white/60">
                  <span className="font-bold text-[#BFFD44]">Dalam simulasi: </span>
                  {k.fungsi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

const KETERANGAN = [
  {
    icon: "⚙️",
    judul: "Pompa Hidrolik (60 bar)",
    apa: "Sumber tenaga sistem (hydraulic power pack 0Z1): memompa oli dari tangki ke rangkaian. Pump safety valve membatasi tekanan maksimum 60 bar agar pompa dan selang aman.",
    fungsi: "Harus ON agar sistem bertekanan. Saat OFF semua gauge menunjuk 0 dan silinder tidak dapat bergerak.",
  },
  {
    icon: "🚰",
    judul: "Shut-off Valve (0V2)",
    apa: "Katup buka/tutup manual yang mengisolasi rangkaian kerja dari power pack — pada prosedur nyata ditutup dahulu saat menyetel tekanan sistem (langkah 6–8), lalu dibuka kembali.",
    fungsi: "OFF memutus aliran ke rangkaian: P1Z1 jatuh ke 0 dan silinder berhenti, walau pompa tetap hidup.",
  },
  {
    icon: "🎚️",
    judul: "Tekanan Sistem (PRV 0V1)",
    apa: "Pressure Relief Valve utama: membuang kelebihan oli ke tangki begitu tekanan melebihi setelannya, sehingga menetapkan tekanan kerja rangkaian (terbaca di P1Z1, sisi masuk FCV).",
    fungsi: "Slider ini = variasi 'inlet pressure' pada tabel data. Menurunkannya membuat ΔP di FCV mengecil → silinder maju lebih lambat.",
  },
  {
    icon: "🛡️",
    judul: "Counter-holding (PRV 1V3)",
    apa: "PRV di sisi rod silinder yang menahan beban stempel agar tidak jatuh oleh beratnya sendiri — oli keluar hanya jika tekanannya melampaui setelan (terbaca di P1Z4).",
    fungsi: "Slider ini = variasi 'outlet pressure'. Semakin tinggi, semakin besar tekanan balik yang harus dilawan piston → langkah maju melambat.",
  },
  {
    icon: "🔩",
    judul: "Bukaan FCV (1V2)",
    apa: "One-Way Flow Control Valve: mencekik (throttle) aliran ke sisi piston saat maju untuk mengatur kecepatan, tetapi membebaskan aliran lewat check valve saat mundur. Debit Q ∝ bukaan × √ΔP — tidak terkompensasi tekanan.",
    fungsi: "Disetel sekali agar langkah ±3 detik (langkah 9), lalu TIDAK diubah selama percobaan — inilah kunci pembeda dengan 2-way FCV.",
  },
  {
    icon: "🕹️",
    judul: "Tuas 1V1 (Katup 4/2)",
    apa: "Katup pengarah 4/2 yang dioperasikan manual: menentukan oli menuju sisi piston (stempel turun / extend) atau sisi rod (stempel naik / retract).",
    fungsi: "Menarik tuas memulai langkah maju sekaligus menghidupkan stopwatch; melepasnya menaikkan stempel dan foil bergeser membawa hasil emboss.",
  },
];
