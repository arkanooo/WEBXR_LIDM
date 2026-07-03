import { useParams, useNavigate } from "react-router";
import { QRCodeSVG } from "qrcode.react";
import PageShell from "../components/PageShell";
import ComponentViewer from "../three/ComponentViewer";
import { KOMPONEN } from "../data/komponen";

export default function KomponenDetailPage() {
  const { no } = useParams();
  const navigate = useNavigate();
  const item = KOMPONEN.find((k) => String(k.no) === no);

  if (!item) {
    return (
      <PageShell>
        <section className="mx-auto max-w-[1440px] px-6 py-32 md:px-10" style={{ fontFamily: "'Chivo', sans-serif" }}>
          <h1 className="text-[40px] font-black text-white">Komponen tidak ditemukan</h1>
          <button
            onClick={() => navigate("/komponen")}
            className="mt-6 rounded-full border border-[#BFFD44] bg-[#BFFD44] px-5 py-2 font-bold text-black"
          >
            ← Kembali ke Komponen
          </button>
        </section>
      </PageShell>
    );
  }

  const arUrl = `${window.location.origin}/#/komponen/${item.no}`;
  const { Icon } = item;

  return (
    <PageShell>
      <section
        className="mx-auto max-w-[1440px] px-6 pt-12 pb-8 md:px-10"
        style={{ fontFamily: "'Chivo', sans-serif" }}
      >
        <button
          onClick={() => navigate("/komponen")}
          className="mb-8 inline-flex items-center gap-2 text-[15px] font-light text-white/60 transition-colors hover:text-[#BFFD44]"
        >
          ← Semua Komponen
        </button>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left: 3D / AR viewer */}
          <div>
            <ComponentViewer no={item.no} />
          </div>

          {/* Right: info */}
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#BFFD44]/50 bg-black/40 text-[#BFFD44]">
                <Icon className="h-8 w-8" />
              </div>
              <span className="rounded-full border border-white/12 px-3 py-1 text-[12px] font-light text-white/60">
                {item.category}
              </span>
              <span className="text-[13px] font-bold tabular-nums text-white/30">
                {String(item.no).padStart(2, "0")} / {String(KOMPONEN.length).padStart(2, "0")}
              </span>
            </div>

            <h1 className="mt-5 text-[48px] font-black uppercase leading-[0.95] text-white md:text-[64px]">
              {item.nama}
            </h1>
            <p className="mt-1 text-[20px] font-light italic text-[#BFFD44]/90">{item.namaEn}</p>
            <p className="mt-4 max-w-xl text-[16px] font-light leading-relaxed text-white/70">
              {item.desc}
            </p>

            {/* Specs */}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              {item.specs.map((s) => (
                <div key={s.label} className="border-l-2 border-[#BFFD44]/40 pl-3">
                  <dt className="text-[11px] uppercase tracking-wide text-white/40">{s.label}</dt>
                  <dd className="text-[20px] font-bold text-white">{s.value}</dd>
                </div>
              ))}
            </dl>

            {/* AR marker / QR */}
            <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md sm:flex-row sm:items-center">
              <div className="rounded-xl bg-white p-3">
                <QRCodeSVG value={arUrl} size={128} level="M" includeMargin={false} />
              </div>
              <div>
                <p className="text-[13px] font-bold uppercase tracking-widest text-[#BFFD44]">
                  Marker AR — Meta Quest 2
                </p>
                <p className="mt-2 max-w-sm text-[14px] font-light leading-relaxed text-white/70">
                  Pindai QR ini dari headset atau buka tautannya di browser Meta Quest 2, lalu tekan{" "}
                  <b className="text-white">Masuk AR</b> untuk menampilkan model{" "}
                  <span className="text-white">{item.nama}</span> dalam mode passthrough.
                </p>
                <p className="mt-2 break-all text-[11px] font-light text-white/35">{arUrl}</p>
              </div>
            </div>

            <p className="mt-4 text-[12px] font-light text-white/35">
              Sumber: modul praktikum Penyederhanaan Gambar (ARPeGa) · Tanpa skala · Satuan mm ·
              Proyeksi sudut ketiga
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
