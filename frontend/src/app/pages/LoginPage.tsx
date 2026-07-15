import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth, ACCOUNTS } from "../auth";

function LogoMark() {
  return (
    <svg width="44" height="26" viewBox="0 0 50 28.5369" fill="none">
      <path d="M1 6 L24 1 L49 6 L49 22 L24 27.5 L1 22 Z" stroke="white" strokeWidth="1" fill="none" opacity="0.6" />
      <rect x="6" y="9" width="16" height="11" rx="1.5" fill="#BFFD44" />
      <rect x="28" y="9" width="16" height="11" rx="1.5" fill="#BFFD44" opacity="0.85" />
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState(ACCOUNTS[0].username);
  const [password, setPassword] = useState(ACCOUNTS[0].password);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/");
    } else {
      setError("Username atau password salah. Coba salah satu akun demo di bawah.");
    }
  };

  const pick = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError("");
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        backgroundImage:
          "linear-gradient(119.498deg, rgb(84, 38, 27) 1.3746%, rgb(0, 0, 2) 36.02%)",
        fontFamily: "'Chivo', sans-serif",
      }}
    >
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-40 blur-[230px]" style={{ background: "#FB7A43" }} />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full opacity-30 blur-[230px]" style={{ background: "#BFFD44" }} />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full opacity-20 blur-[230px]" style={{ background: "#00A3FF" }} />

      <button
        onClick={() => navigate("/")}
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[15px] font-light text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white md:left-8 md:top-8"
      >
        ← Kembali
      </button>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-3xl border border-white/12 bg-white/[0.05] p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="text-[22px] font-black uppercase tracking-widest">3DUTOPIA</span>
          </div>

          <h1 className="mt-7 text-[40px] font-black leading-none">Masuk</h1>
          <p className="mt-3 text-[15px] font-light leading-relaxed text-white/65">
            Masuk untuk menjelajahi modul pembelajaran, komponen mesin 3D + AR, dan lab virtual.
          </p>

          <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] uppercase tracking-wide text-white/50">Username</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-[16px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#BFFD44]"
                placeholder="username"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] uppercase tracking-wide text-white/50">Password</span>
              <div className="flex items-center rounded-xl border border-white/15 bg-black/30 transition-colors focus-within:border-[#BFFD44]">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="flex-1 bg-transparent px-4 py-3 text-[16px] text-white outline-none placeholder:text-white/30"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="px-4 text-[13px] font-light text-white/50 transition-colors hover:text-[#BFFD44]"
                >
                  {show ? "Sembunyikan" : "Lihat"}
                </button>
              </div>
            </label>

            {error && (
              <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-[13px] text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-1 rounded-xl bg-[#BFFD44] px-4 py-3 text-[16px] font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              Masuk →
            </button>
          </form>

          <div className="mt-7 border-t border-white/10 pt-5">
            <p className="text-[12px] uppercase tracking-wide text-white/40">Akun demo (klik untuk isi)</p>
            <div className="mt-3 flex flex-col gap-2">
              {ACCOUNTS.map((a) => (
                <button
                  key={a.username}
                  type="button"
                  onClick={() => pick(a.username, a.password)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left transition-all ${
                    username === a.username
                      ? "border-[#BFFD44]/60 bg-[#BFFD44]/10"
                      : "border-white/12 bg-white/[0.03] hover:border-white/30"
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="text-[15px] font-bold text-white">{a.username}</span>
                    <span className="text-[12px] font-light text-white/50">{a.role}</span>
                  </span>
                  <span className="font-mono text-[13px] text-[#BFFD44]/90">{a.password}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
