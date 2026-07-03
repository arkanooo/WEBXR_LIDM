import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import PageShell from "../components/PageShell";
import { KOMPONEN, CATEGORIES, type Category, type Komponen } from "../data/komponen";

const FILTERS: ("Semua" | Category)[] = ["Semua", ...CATEGORIES];

function KomponenCard({ item }: { item: Komponen }) {
  const { Icon } = item;
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/komponen/${item.no}`)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#BFFD44]/70 hover:bg-white/[0.07] hover:shadow-[0_0_40px_-8px_rgba(191,253,68,0.35)]"
      style={{ fontFamily: "'Chivo', sans-serif" }}
    >
      {/* number badge */}
      <span className="absolute right-5 top-5 text-[13px] font-bold tabular-nums text-white/25 group-hover:text-[#BFFD44]/60 transition-colors">
        {String(item.no).padStart(2, "0")}
      </span>

      {/* icon */}
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-white/12 bg-black/30 text-white/80 transition-colors group-hover:border-[#BFFD44]/50 group-hover:text-[#BFFD44]">
        <Icon className="h-9 w-9" />
      </div>

      {/* title */}
      <h3 className="text-[22px] font-bold leading-tight text-white">{item.nama}</h3>
      <p className="mt-0.5 text-[14px] font-light italic text-[#BFFD44]/90">{item.namaEn}</p>

      <p className="mt-3 text-[14px] font-light leading-relaxed text-white/65">{item.desc}</p>

      {/* specs */}
      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/10 pt-4">
        {item.specs.map((s) => (
          <div key={s.label} className="flex flex-col">
            <dt className="text-[11px] uppercase tracking-wide text-white/40">{s.label}</dt>
            <dd className="text-[15px] font-bold text-white">{s.value}</dd>
          </div>
        ))}
      </dl>

      {/* footer chip */}
      <div className="mt-5 flex items-center justify-between">
        <span className="rounded-full border border-white/12 px-3 py-1 text-[11px] font-light text-white/60">
          {item.category}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#BFFD44]/40 bg-[#BFFD44]/10 px-3 py-1 text-[11px] font-bold text-[#BFFD44]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#BFFD44]" />
          Lihat 3D / AR
        </span>
      </div>
    </article>
  );
}

export default function KomponenPage() {
  const [active, setActive] = useState<"Semua" | Category>("Semua");

  const filtered = useMemo(
    () => (active === "Semua" ? KOMPONEN : KOMPONEN.filter((k) => k.category === active)),
    [active]
  );

  return (
    <PageShell>
      <section className="mx-auto max-w-[1440px] px-6 pt-16 pb-8 md:px-10">
        {/* Header */}
        <p
          className="text-[15px] font-light uppercase tracking-[0.3em] text-[#BFFD44]"
          style={{ fontFamily: "'Chivo', sans-serif" }}
        >
          ARPeGa · Augmented Reality
        </p>
        <h1
          className="mt-3 text-[56px] font-black uppercase leading-[0.95] text-white md:text-[88px]"
          style={{ fontFamily: "'Chivo', sans-serif" }}
        >
          Komponen
        </h1>

        <p
          className="mt-6 max-w-3xl text-[17px] font-light leading-relaxed text-white/70"
          style={{ fontFamily: "'Chivo', sans-serif" }}
        >
          Kumpulan komponen mesin pada modul praktikum{" "}
          <span className="text-white">Penyederhanaan Gambar (simplified representation)</span> untuk
          Mata Kuliah Menggambar Teknik. Tiap komponen menyajikan gambar teknik 2 dimensi, model 3D,
          dan marker yang dapat dipindai lewat aplikasi Augmented Reality. Seluruh gambar dibuat{" "}
          <span className="text-white">tanpa skala</span>, bersatuan{" "}
          <span className="text-white">milimeter</span>, dengan sistem proyeksi{" "}
          <span className="text-white">sudut ketiga</span>.
        </p>

        {/* Stat row */}
        <div className="mt-8 flex flex-wrap gap-8" style={{ fontFamily: "'Chivo', sans-serif" }}>
          {[
            { v: `${KOMPONEN.length}`, l: "Komponen 3D" },
            { v: `${CATEGORIES.length}`, l: "Kategori" },
            { v: "AR", l: "Marker Interaktif" },
          ].map((s) => (
            <div key={s.l} className="flex items-baseline gap-3">
              <span className="text-[40px] font-bold text-[#BFFD44]">{s.v}</span>
              <span className="text-[15px] font-light text-white/60">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-wrap gap-3" style={{ fontFamily: "'Chivo', sans-serif" }}>
          {FILTERS.map((f) => {
            const isActive = active === f;
            const count = f === "Semua" ? KOMPONEN.length : KOMPONEN.filter((k) => k.category === f).length;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full border px-5 py-2 text-[15px] transition-all cursor-pointer ${
                  isActive
                    ? "border-[#BFFD44] bg-[#BFFD44] font-bold text-black"
                    : "border-white/15 bg-white/5 font-light text-white/75 hover:border-white/40 hover:text-white"
                }`}
              >
                {f}
                <span className={isActive ? "ml-2 text-black/60" : "ml-2 text-white/40"}>{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1440px] px-6 pt-8 md:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <KomponenCard key={item.no} item={item} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
