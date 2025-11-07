"use client";

import { createContext, useContext, useState, useMemo } from "react";
import type { SessionUser } from "@/lib/auth";

type AuthContextValue = {
  user: SessionUser | null;
  setUser: (user: SessionUser | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

type AuthProviderProps = {
  initialUser: SessionUser;
  children: React.ReactNode;
};

export function AuthProvider({
  initialUser,
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(initialUser);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setUser(null);
      window.location.href = "/";
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      setUser,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth debe usarse dentro de un componente AuthProvider"
    );
  }
  return context;
}
