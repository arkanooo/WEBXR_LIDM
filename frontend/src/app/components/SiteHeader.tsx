import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../auth";




const EXPLORE: { label: string; path: string }[] = [
  { label: "Praktikum", path: "/praktikum" },
  { label: "Modul", path: "/modul" },
  { label: "Komponen", path: "/komponen" },
];

import logo3d from "../../assets/Logo 3DUTOPIA 2 tes.png";

function LogoMark() {
  return <img src={logo3d} alt="3DUTOPIA Logo" className="shrink-0 h-[64px] w-auto" />;
}

export default function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
  const exploreActive = EXPLORE.some((e) => location.pathname.startsWith(e.path));

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const linkCls = (active: boolean) =>
    `relative transition-colors cursor-pointer ${
      active ? "text-[#BFFD44] font-bold" : "text-white/90 font-light hover:text-white"
    }`;

  const mobileItems = [
    { label: "Home", path: "/" },
    ...(user ? EXPLORE : []),
    { label: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 h-[80px] flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer group">
          <LogoMark />
          <span
            className="text-[24px] md:text-[28px] font-black uppercase tracking-widest text-white group-hover:text-[#BFFD44] transition-colors"
            style={{ fontFamily: "'Chivo', sans-serif" }}
          >
            3DUTOPIA
          </span>
        </button>

        <nav
          className="hidden md:flex items-center gap-9 text-[18px]"
          style={{ fontFamily: "'Chivo', sans-serif" }}
        >
          <button onClick={() => navigate("/")} className={linkCls(isActive("/"))}>
            Home
            {isActive("/") && <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-[#BFFD44] rounded-full" />}
          </button>

          {user && (
            <div className="relative group">
              <button className={`${linkCls(exploreActive)} flex items-center gap-1.5`}>
                Jelajahi
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:rotate-180">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {exploreActive && <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-[#BFFD44] rounded-full" />}
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="flex w-52 flex-col overflow-hidden rounded-xl border border-white/12 bg-black/80 p-1.5 backdrop-blur-lg shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]">
                  {EXPLORE.map((item) => {
                    const active = isActive(item.path);
                    return (
                      <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`rounded-lg px-4 py-2.5 text-left text-[16px] transition-colors ${
                          active ? "bg-[#BFFD44]/15 text-[#BFFD44] font-bold" : "text-white/85 font-light hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <button onClick={() => navigate("/about")} className={linkCls(isActive("/about"))}>
            About
            {isActive("/about") && <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-[#BFFD44] rounded-full" />}
          </button>

          {user ? (
            <div className="flex items-center gap-3 pl-3">
              <span className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BFFD44] text-[15px] font-black uppercase text-black">
                  {user.name.charAt(0)}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[15px] font-bold text-white">{user.name}</span>
                  <span className="text-[12px] font-light text-white/60">{user.role}</span>
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[15px] font-light text-white/80 transition-colors hover:border-[#FB7943] hover:text-white"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="rounded-full bg-[#BFFD44] px-6 py-2 text-[16px] font-bold text-black transition-transform hover:scale-105"
            >
              Login
            </button>
          )}
        </nav>

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

      {open && (
        <nav
          className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur-md px-6 py-4 flex flex-col gap-3"
          style={{ fontFamily: "'Chivo', sans-serif" }}
        >
          {mobileItems.map((item) => {
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
          {user ? (
            <button
              onClick={handleLogout}
              className="mt-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-left text-[16px] font-light text-white/80"
            >
              Keluar ({user.name})
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
              className="mt-2 rounded-xl bg-[#BFFD44] px-4 py-2.5 text-center text-[16px] font-bold text-black"
            >
              Login →
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
