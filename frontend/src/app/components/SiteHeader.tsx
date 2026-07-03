import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

const NAV_ITEMS: { label: string; path: string }[] = [
  { label: "Home", path: "/" },
  { label: "Praktikum", path: "/praktikum" },
  { label: "Modul", path: "/modul" },
  { label: "Komponen", path: "/komponen" },
  { label: "About", path: "/about" },
];

function LogoMark() {
  return (
    <svg width="50" height="29" viewBox="0 0 50 28.5369" fill="none" className="shrink-0">
      <path
        d="M1 6 L24 1 L49 6 L49 22 L24 27.5 L1 22 Z"
        stroke="white"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <rect x="6" y="9" width="16" height="11" rx="1.5" fill="#BFFD44" />
      <rect x="28" y="9" width="16" height="11" rx="1.5" fill="#BFFD44" opacity="0.85" />
    </svg>
  );
}

export default function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 h-[80px] flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <LogoMark />
          <span
            className="text-[24px] md:text-[28px] font-black uppercase tracking-widest text-white group-hover:text-[#BFFD44] transition-colors"
            style={{ fontFamily: "'Chivo', sans-serif" }}
          >
            3DUTOPIA
          </span>
        </button>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-9 text-[18px]"
          style={{ fontFamily: "'Chivo', sans-serif" }}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative transition-colors cursor-pointer ${
                  active ? "text-[#BFFD44] font-bold" : "text-white/90 font-light hover:text-white"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-[#BFFD44] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
          aria-label="Menu"
        >
          <span className="block w-6 h-[2px] bg-white rounded" />
          <span className="block w-6 h-[2px] bg-white rounded" />
          <span className="block w-6 h-[2px] bg-white rounded" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur-md px-6 py-4 flex flex-col gap-3"
          style={{ fontFamily: "'Chivo', sans-serif" }}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                className={`text-left text-[18px] py-1 transition-colors ${
                  active ? "text-[#BFFD44] font-bold" : "text-white/90 font-light"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
