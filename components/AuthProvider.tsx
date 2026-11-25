"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { AuthUser } from "@/lib/api";

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  ready: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const t = localStorage.getItem("jobhub_token");
      const u = localStorage.getItem("jobhub_user");
      if (t && u) {
        setToken(t);
        setUser(JSON.parse(u));
      }
    } catch {
      localStorage.removeItem("jobhub_token");
      localStorage.removeItem("jobhub_user");
    }
    setReady(true);
  }, []);

  const login = (t: string, u: AuthUser) => {
    localStorage.setItem("jobhub_token", t);
    localStorage.setItem("jobhub_user", JSON.stringify(u));
    setToken(t);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("jobhub_token");
    localStorage.removeItem("jobhub_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}