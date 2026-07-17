import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router";
import PageShell from "../components/PageShell";
import { MODUL_LIST, type VRStage } from "../data/modul";
import { QuizModal } from "../components/QuizModal";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-[24px] font-black uppercase tracking-wide text-white">
      <span className="h-[2px] w-8 rounded-full bg-[#BFFD44]" />
      {children}
    </h2>
  );
}

function VRStageCard({ stage, open, onToggle }: { stage: VRStage; open: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-2xl border backdrop-blur-md transition-all duration-300 ${
        open ? "border-[#BFFD44]/60 bg-white/[0.06]" : "border-white/12 bg-white/[0.03] hover:border-white/30"
      }`}
    >
      <button onClick={onToggle} className="flex w-full items-center gap-4 p-5 text-left">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[20px] ${
            open ? "bg-[#BFFD44]/15" : "bg-black/30"
          }`}
        >
          {stage.icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-2">
            <span className="text-[13px] font-bold tabular-nums text-[#BFFD44]">
              {String(stage.no).padStart(2, "0")}
            </span>
            <span className="text-[18px] font-bold text-white">{stage.judul}</span>
          </span>
          <span className="mt-0.5 block text-[13px] font-light text-white/55">{stage.ringkas}</span>
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className={`shrink-0 text-white/50 transition-transform ${open ? "rotate-180 text-[#BFFD44]" : ""}`}
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul className="flex flex-col gap-2.5 border-t border-white/10 px-5 pb-5 pt-4">
          {stage.detail.map((d, i) => (
            <li key={i} className="flex gap-3 text-[14px] font-light leading-relaxed text-white/75">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#BFFD44]/70" />
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ModulDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const modul = MODUL_LIST.find((m) => m.id === id);
  const [openStage, setOpenStage] = useState<number | null>(1);
  const [showPretest, setShowPretest] = useState(false);
  const [passedPretest, setPassedPretest] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleStartSim = () => {
    if (modul?.pretest && !passedPretest) {
      setToastMessage("Harap selesaikan Pre-test terlebih dahulu untuk membuka simulasi.");
      setTimeout(() => {
        setToastMessage("");
        setShowPretest(true);
      }, 2000);
    } else {
      navigate(`/praktikum/${id}`);
    }
  };

  if (!modul) {
    return (
      <PageShell>
        <section className="mx-auto max-w-[1440px] px-6 py-32 md:px-10" style={{ fontFamily: "'Chivo', sans-serif" }}>
          <h1 className="text-[40px] font-black text-white">Modul tidak ditemukan</h1>
          <button
            onClick={() => navigate("/modul")}
            className="mt-6 rounded-full border border-[#BFFD44] bg-[#BFFD44] px-5 py-2 font-bold text-black"
          >
            ← Kembali ke Modul
          </button>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-[1100px] px-6 pt-12 pb-8 md:px-10" style={{ fontFamily: "'Chivo', sans-serif" }}>
        <button
          onClick={() => navigate("/modul")}
          className="mb-8 inline-flex items-center gap-2 text-[15px] font-light text-white/60 transition-colors hover:text-[#BFFD44]"
        >
          ← Semua Modul
        </button>

        <p className="text-[14px] font-light uppercase tracking-[0.3em] text-[#BFFD44]">
          {modul.praktikum === "tensile-test" ? "Praktikum Ilmu Bahan" : "Praktikum Sistem Hidrolik"} · {modul.percobaan}
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="mt-2 text-[44px] font-black uppercase leading-[0.95] text-white md:text-[64px]">
            {modul.judul}
          </h1>
          <a
            href={modul.pdfUrl}
            download
            className="mb-1 inline-flex items-center gap-2 rounded-full border border-[#BFFD44]/50 bg-[#BFFD44]/10 px-5 py-2.5 text-[14px] font-bold text-[#BFFD44] transition-colors hover:bg-[#BFFD44] hover:text-black"
          >
            ⬇ Unduh Modul (PDF)
          </a>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            modul.durasi,
            modul.tingkat,
            modul.praktikum === "tensile-test"
              ? "Lab. Material Teknik & Metalurgi — DTMI ITS"
              : "Lab. Sistem Pneumatik & Hidrolik — DTMI ITS",
          ].map((c) => (
            <span key={c} className="rounded-full border border-white/15 px-3 py-1 text-[12px] font-light text-white/60">
              {c}
            </span>
          ))}
        </div>

        <div className="mt-12">
          <SectionTitle>Tujuan Praktikum</SectionTitle>
          <ol className="mt-5 flex flex-col gap-3">
            {modul.tujuan.map((t, i) => (
              <li key={i} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[15px] font-light leading-relaxed text-white/80">
                <span className="text-[20px] font-black text-[#BFFD44]">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12">
          <SectionTitle>Deskripsi Mesin</SectionTitle>
          <p className="mt-5 max-w-3xl text-[16px] font-light leading-relaxed text-white/75">{modul.deskripsi}</p>
        </div>

        <div className="mt-12">
          <SectionTitle>Peralatan Percobaan</SectionTitle>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-white/12">
            <table className="w-full min-w-[480px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-white/12 bg-white/[0.05] text-[12px] uppercase tracking-wide text-white/50">
                  <th className="px-5 py-3 font-bold">Item no.</th>
                  <th className="px-5 py-3 font-bold">Qty.</th>
                  <th className="px-5 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                {modul.peralatan.map((p, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-2.5 font-mono text-[13px] text-[#BFFD44]/90">{p.item}</td>
                    <td className="px-5 py-2.5 tabular-nums text-white/70">{p.qty}</td>
                    <td className="px-5 py-2.5 font-light text-white/80">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12">
          <SectionTitle>Prosedur Praktikum</SectionTitle>
          <ol className="mt-5 flex flex-col gap-2">
            {modul.prosedur.map((p, i) => (
              <li key={i} className="flex gap-4 rounded-lg px-4 py-2.5 text-[15px] font-light leading-relaxed text-white/80 odd:bg-white/[0.03]">
                <span className="w-6 shrink-0 text-right font-bold tabular-nums text-[#BFFD44]">{i + 1}.</span>
                {p}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12">
          <SectionTitle>Data yang Diukur</SectionTitle>
          <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {modul.ukuran.map((u) => (
              <div key={u.simbol} className="rounded-xl border-l-2 border-[#BFFD44]/50 bg-white/[0.03] p-4">
                <dt className="font-mono text-[15px] font-bold text-[#BFFD44]">{u.simbol}</dt>
                <dd className="mt-1 text-[14px] font-light text-white/70">{u.arti}</dd>
              </div>
            ))}
          </dl>

          {modul.dimensi && (
            <div className="mt-8 overflow-x-auto rounded-2xl border border-white/12">
              <p className="border-b border-white/12 bg-white/[0.05] px-5 py-3 text-[13px] font-bold uppercase tracking-wide text-white/60">
                Dimensi Benda Kerja — ASTM E8
              </p>
              <table className="w-full min-w-[420px] text-left text-[14px]">
                <tbody>
                  {modul.dimensi.map((d) => (
                    <tr key={d.param} className="border-b border-white/5 last:border-0">
                      <td className="px-5 py-2.5 font-light text-white/80">{d.param}</td>
                      <td className="px-5 py-2.5 tabular-nums text-white/60">{d.inch}</td>
                      <td className="px-5 py-2.5 font-bold tabular-nums text-[#BFFD44]">{d.mm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {[
              { judul: "Fluctuating inlet pressure", rows: modul.tabelInlet },
              { judul: "Fluctuating outlet pressure", rows: modul.tabelOutlet },
            ]
              .filter((t): t is { judul: string; rows: NonNullable<typeof t.rows> } => !!t.rows)
              .map((tab) => (
              <div key={tab.judul} className="overflow-x-auto rounded-2xl border border-white/12">
                <p className="border-b border-white/12 bg-white/[0.05] px-5 py-3 text-[13px] font-bold uppercase tracking-wide text-white/60">
                  {tab.judul}
                </p>
                <table className="w-full min-w-[380px] text-center text-[14px]">
                  <thead>
                    <tr className="border-b border-white/12 text-[13px] italic text-white/50">
                      <th className="px-4 py-2.5 font-normal">p1Z1</th>
                      <th className="px-4 py-2.5 font-normal">p1Z3</th>
                      <th className="px-4 py-2.5 font-normal">p1Z4</th>
                      <th className="px-4 py-2.5 font-normal">t →</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tab.rows.map((r, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="px-4 py-2.5 tabular-nums text-white/80">{r.p1z1}</td>
                        <td className="px-4 py-2.5 text-white/25">— isi di VR —</td>
                        <td className="px-4 py-2.5 tabular-nums text-white/80">{r.p1z4}</td>
                        <td className="px-4 py-2.5 text-white/25">— isi di VR —</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-3xl border border-[#BFFD44]/25 bg-[#BFFD44]/[0.04] p-6 md:p-9">
          <p className="text-[13px] font-bold uppercase tracking-[0.3em] text-[#BFFD44]">
            Rancangan Pelaksanaan · Virtual Reality
          </p>
          <h2 className="mt-2 text-[30px] font-black leading-tight text-white md:text-[38px]">
            Alur Praktikum di Headset VR
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] font-light leading-relaxed text-white/70">
            Seluruh materi modul di atas dipetakan menjadi {modul.vrStages.length} tahap interaktif
            di lab virtual (Meta Quest 2). Mahasiswa mengalami percobaan — bukan sekadar
            membacanya: merakit sirkuit, memutar katup, membaca gauge, dan mencatat data, tanpa
            risiko kerusakan alat maupun kebocoran oli.
          </p>
          <div className="mt-7 flex flex-col gap-3">
            {modul.vrStages.map((s) => (
              <VRStageCard
                key={s.no}
                stage={s}
                open={openStage === s.no}
                onToggle={() => setOpenStage(openStage === s.no ? null : s.no)}
              />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={handleStartSim}
              className="rounded-full bg-[#BFFD44] px-7 py-3 text-[16px] font-bold text-black transition-transform hover:scale-105 active:scale-95"
            >
              Mulai Praktikum VR →
            </button>
            <span className="text-[13px] font-light text-white/45">
              Simulasi VR sedang dikembangkan — tahapan di atas adalah rancangan implementasinya.
            </span>
          </div>
        </div>

        <div className="mt-12">
          <SectionTitle>Pertanyaan Kesimpulan</SectionTitle>
          <div className="mt-5 flex flex-col gap-3">
            {modul.pertanyaan.map((q, i) => (
              <div key={i} className="rounded-xl border border-white/12 bg-white/[0.03] p-5">
                <p className="text-[15px] font-light italic leading-relaxed text-white/80">
                  {i + 1}. {q}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-[12px] font-light text-white/35">
          {modul.praktikum === "tensile-test"
            ? "Sumber: Modul Praktikum Ilmu Bahan — Laboratorium Material Teknik & Metalurgi, Departemen Teknik Mesin Industri ITS."
            : "Sumber: Modul Praktikum Sistem Hidrolik — Laboratorium Sistem Pneumatik dan Hidrolik, Departemen Teknik Mesin Industri ITS."}
        </p>
      </section>
      {/* Toast Notification */}
      {toastMessage && typeof document !== "undefined" && createPortal(
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-none">
          <div className="bg-[#BFFD44] text-black font-bold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(191,253,68,0.4)] flex items-center gap-3">
            <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {toastMessage}
          </div>
        </div>,
        document.body
      )}

      {modul.pretest && (
        <QuizModal
          isOpen={showPretest}
          onClose={() => {
            setShowPretest(false);
            if (passedPretest) navigate(`/praktikum/${id}`);
          }}
          quiz={modul.pretest}
          type="Pre-test"
          onComplete={(score) => {
            setPassedPretest(true);
            sessionStorage.setItem(`pretest_${id}`, "true");
          }}
        />
      )}
    </PageShell>
  );
}
