import { useState } from "react";
import { useNavigate } from "react-router";
import PageShell from "../components/PageShell";
import { PRAKTIKUM_OPTIONS, MODUL_LIST, type PraktikumKind } from "../data/modul";

export default function ModulPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PraktikumKind>("pneumatik-hidrolik");

  const aktif = PRAKTIKUM_OPTIONS.find((p) => p.id === selected)!;
  const daftar = MODUL_LIST.filter((m) => m.praktikum === selected);

  return (
    <PageShell>
      <section className="mx-auto max-w-[1440px] px-6 pt-16 pb-8 md:px-10" style={{ fontFamily: "'Chivo', sans-serif" }}>
        <p className="text-[15px] font-light uppercase tracking-[0.3em] text-[#BFFD44]">
          Materi Pembelajaran · VR Lab
        </p>
        <h1 className="mt-3 text-[56px] font-black uppercase leading-[0.95] text-white md:text-[88px]">
          Modul
        </h1>
        <p className="mt-6 max-w-3xl text-[17px] font-light leading-relaxed text-white/70">
          Pilih jenis praktikum, lalu buka modulnya. Setiap modul memuat tujuan, peralatan,
          prosedur, tabel data — dan <span className="text-white">rancangan pelaksanaannya dalam
          Virtual Reality</span> sehingga percobaan dapat dijalankan tanpa risiko kerusakan alat.
        </p>

        {/* Pemilih praktikum */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 max-w-3xl">
          {PRAKTIKUM_OPTIONS.map((p) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`relative rounded-2xl border p-6 text-left backdrop-blur-md transition-all duration-300 ${
                  active
                    ? "border-[#BFFD44] bg-white/[0.07] shadow-[0_0_36px_-8px_rgba(191,253,68,0.45)]"
                    : "border-white/12 bg-white/[0.03] hover:border-white/35"
                }`}
              >
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: p.accent }}
                />
                <h2 className="mt-3 text-[24px] font-bold leading-tight text-white">{p.nama}</h2>
                <p className="mt-2 text-[14px] font-light leading-relaxed text-white/60">{p.desc}</p>
                <span
                  className={`mt-4 inline-block rounded-full border px-3 py-1 text-[12px] font-bold ${
                    p.available
                      ? "border-[#BFFD44]/50 bg-[#BFFD44]/10 text-[#BFFD44]"
                      : "border-white/20 bg-white/5 text-white/50"
                  }`}
                >
                  {p.available ? `${MODUL_LIST.filter((m) => m.praktikum === p.id).length} modul tersedia` : "Segera hadir"}
                </span>
                {active && (
                  <span className="absolute right-5 top-5 text-[13px] font-bold text-[#BFFD44]">Dipilih ✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Daftar modul */}
        <div className="mt-12">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.25em] text-white/40">
            Modul {aktif.nama}
          </h3>

          {daftar.length === 0 ? (
            <div className="mt-4 max-w-3xl rounded-2xl border border-white/12 bg-white/[0.03] p-8 backdrop-blur-md">
              <p className="text-[16px] font-light text-white/60">
                Modul untuk praktikum <span className="text-white">{aktif.nama}</span> sedang
                disusun dan akan segera tersedia.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {daftar.map((m) => (
                <article
                  key={m.id}
                  onClick={() => navigate(`/modul/${m.id}`)}
                  className="group cursor-pointer rounded-2xl border border-white/12 bg-white/[0.04] p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#BFFD44]/70 hover:shadow-[0_0_40px_-8px_rgba(191,253,68,0.35)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-light text-white/60">
                      {m.percobaan}
                    </span>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-light text-white/60">
                      {m.durasi}
                    </span>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-light text-white/60">
                      {m.tingkat}
                    </span>
                  </div>
                  <h2 className="mt-4 text-[30px] font-black leading-tight text-white">{m.judul}</h2>
                  <p className="mt-3 line-clamp-3 text-[14px] font-light leading-relaxed text-white/65">
                    {m.deskripsi}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-[13px] font-light text-white/45">
                      {m.prosedur.length} langkah · {m.peralatan.length} peralatan · {m.vrStages.length} tahap VR
                    </span>
                    <span className="text-[13px] font-bold text-[#BFFD44] transition-transform group-hover:translate-x-1">
                      Buka modul →
                    </span>
                  </div>
                  <a
                    href={m.pdfUrl}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 inline-flex items-center gap-2 text-[13px] font-light text-white/50 transition-colors hover:text-white"
                  >
                    ⬇ Unduh lembar modul (PDF)
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
