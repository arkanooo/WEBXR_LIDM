import { QRCodeSVG } from "qrcode.react";


export default function VRAccessCard({
  judul,
  vrSlotRef,
}: {
  judul: string;
  vrSlotRef: React.RefObject<HTMLDivElement | null>;
}) {
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="mt-4 flex flex-col gap-5 rounded-2xl border border-[#BFFD44]/30 bg-[#BFFD44]/[0.05] p-6 backdrop-blur-md sm:flex-row sm:items-center">
      <div className="shrink-0 rounded-xl bg-white p-3">
        <QRCodeSVG value={url} size={112} level="M" includeMargin={false} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-[#BFFD44]">
          🥽 Mode VR — Meta Quest 2
        </p>
        <p className="mt-2 max-w-md text-[14px] font-light leading-relaxed text-white/70">
          Pindai QR ini dari headset, atau buka tautan halaman ini di{" "}
          <b className="text-white">browser Meta Quest 2</b>, lalu tekan{" "}
          <b className="text-white">Masuk VR</b> untuk menjalankan simulasi{" "}
          <span className="text-white">{judul}</span> dalam ruang 3D penuh.
        </p>
        <p className="mt-2 break-all text-[11px] font-light text-white/35">{url}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3" ref={vrSlotRef} />
      </div>
    </div>
  );
}
