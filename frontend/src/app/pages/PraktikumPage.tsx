import { useNavigate } from "react-router";
import PageShell from "../components/PageShell";

const OPSI = [
  {
    id: "pneumatik-hidrolik",
    nama: "Pneumatik & Hidrolik",
    desc: "Simulasi rangkaian katup, silinder, dan pengaturan tekanan.",
    accent: "#00cba0",
    sims: [
      {
        id: "embossing-machine",
        judul: "Embossing Machine",
        sub: "Percobaan 4 · One-Way Flow Control Valve",
        ready: true,
      },
    ],
  },
  {
    id: "tensile-test",
    nama: "Tensile Test",
    desc: "Pengujian tarik material dengan kurva tegangan-regangan.",
    accent: "#fb7943",
    sims: [],
  },
];

export default function PraktikumPage() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <section className="mx-auto max-w-[1440px] px-6 pt-16 pb-8 md:px-10" style={{ fontFamily: "'Chivo', sans-serif" }}>
        <p className="text-[15px] font-light uppercase tracking-[0.3em] text-[#BFFD44]">
          Virtual Lab · WebXR
        </p>
        <h1 className="mt-3 text-[56px] font-black uppercase leading-[0.95] text-white md:text-[88px]">
          Praktikum
        </h1>
        <p className="mt-6 max-w-3xl text-[17px] font-light leading-relaxed text-white/70">
          Jalankan percobaan secara virtual — atur katup, baca gauge, dan catat data seperti di lab
          nyata. Bisa dijalankan di browser desktop, dan mendukung mode <span className="text-white">VR
          (Meta Quest 2)</span>. Pelajari teorinya lebih dulu di halaman Modul.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {OPSI.map((o) => (
            <div key={o.id} className="rounded-3xl border border-white/12 bg-white/[0.03] p-7 backdrop-blur-md">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: o.accent }} />
              <h2 className="mt-3 text-[28px] font-black leading-tight text-white">{o.nama}</h2>
              <p className="mt-2 text-[14px] font-light text-white/60">{o.desc}</p>

              <div className="mt-6 flex flex-col gap-3">
                {o.sims.length === 0 ? (
                  <div className="rounded-xl border border-white/10 bg-black/25 p-5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[12px] font-bold text-white/50">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                      Segera hadir
                    </span>
                    <p className="mt-3 text-[13px] font-light text-white/45">
                      Simulasi percobaan {o.nama} sedang dikembangkan.
                    </p>
                  </div>
                ) : (
                  o.sims.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => navigate(`/praktikum/${s.id}`)}
                      className="group flex items-center justify-between rounded-xl border border-white/12 bg-black/25 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-[#BFFD44]/70 hover:shadow-[0_0_32px_-8px_rgba(191,253,68,0.4)]"
                    >
                      <span>
                        <span className="block text-[19px] font-bold text-white">{s.judul}</span>
                        <span className="mt-0.5 block text-[13px] font-light text-white/50">{s.sub}</span>
                      </span>
                      <span className="shrink-0 rounded-full bg-[#BFFD44] px-4 py-2 text-[13px] font-bold text-black transition-transform group-hover:scale-105">
                        Mulai →
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
