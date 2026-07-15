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
  login: (username: string, password: string) => boolean;
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

  const login = (username: string, password: string) => {
    const acc = ACCOUNTS.find(
      (a) => a.username === username.trim().toLowerCase() && a.password === password
    );
    if (acc) {
      setUser({ username: acc.username, name: acc.name, role: acc.role });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}
