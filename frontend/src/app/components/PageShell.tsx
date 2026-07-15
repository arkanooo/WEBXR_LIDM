import { ReactNode } from "react";
import SiteHeader from "./SiteHeader";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden text-white"
      style={{
        backgroundImage:
          "linear-gradient(119.498deg, rgb(84, 38, 27) 1.3746%, rgb(0, 0, 2) 36.02%)",
      }}
    >
      <div
        className="pointer-events-none fixed -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-[230px] opacity-40"
        style={{ background: "#FB7A43" }}
      />
      <div
        className="pointer-events-none fixed top-1/3 -right-40 h-[520px] w-[520px] rounded-full blur-[230px] opacity-30"
        style={{ background: "#BFFD44" }}
      />
      <div
        className="pointer-events-none fixed bottom-0 left-1/4 h-[420px] w-[420px] rounded-full blur-[230px] opacity-20"
        style={{ background: "#00A3FF" }}
      />

      <SiteHeader />
      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 mt-24 border-t border-white/10 py-8 text-center">
        <p className="text-white/50 text-sm" style={{ fontFamily: "'Chivo', sans-serif" }}>
          3DUTOPIA · SpatialForge — Virtual Praktikum · spatialforge.id
        </p>
      </footer>
    </div>
  );
}
