import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Account = {
  username: string;
  password: string;
  name: string;
  role: string;
};


export const ACCOUNTS: Account[] = [
  { username: "admin", password: "admin123", name: "Administrator", role: "Admin" },
  { username: "dosen", password: "teknik2026", name: "Dosen Teknik Mesin", role: "Dosen" },
  { username: "mahasiswa", password: "praktikum2026", name: "Mahasiswa", role: "Mahasiswa" },
];

export type User = { username: string; name: string; role: string };

type AuthContextValue = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = "3dutopia_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      
    }
  }, [user]);

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser({ username: data.user.email, name: data.user.name, role: data.user.role });
        localStorage.setItem("3dutopia_token", data.token);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login API error:", err);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string, role: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }),
      });
      if (res.ok) {
        return await login(email, password);
      }
      return false;
    } catch (err) {
      console.error("Register API error:", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("3dutopia_token");
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}
