"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { users } from "@/lib/mockData";
import type { User } from "@/lib/types";

const AuthContext = createContext<{ user: User | null; loginAs: (role: "CUSTOMER" | "ADMIN") => void; logout: () => void } | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(users[1]);
  const value = useMemo(() => ({
    user,
    loginAs: (role: "CUSTOMER" | "ADMIN") => setUser(users.find((candidate) => candidate.role === role) ?? null),
    logout: () => setUser(null),
  }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
