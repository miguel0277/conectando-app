"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "register";

type AuthClientProps = {
  initialMode: AuthMode;
  redirectTo: string;
};

export default function AuthClient({
  initialMode,
  redirectTo,
}: AuthClientProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [identificador, setIdentificador] = useState("");
  const [password, setPassword] = useState("");

  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [rol, setRol] = useState<"USUARIO" | "ADMIN">("USUARIO");

  useEffect(() => {
    setMode(initialMode);
    setError(null);
  }, [initialMode]);

  const redirectQuery = useMemo(() => {
    if (!redirectTo || redirectTo === "/eventos") {
      return null;
    }
    return encodeURIComponent(redirectTo);
  }, [redirectTo]);

  const buildAuthUrl = (nextMode: AuthMode) => {
    const params = new URLSearchParams();
    params.set("mode", nextMode);
    if (redirectQuery) {
      params.set("redirect", redirectQuery);
    }
    return `/auth?${params.toString()}`;
  };

  const resetMessages = () => setError(null);

  const handleModeChange = (nextMode: AuthMode) => {
    if (loading || nextMode === mode) {
      return;
    }
    setMode(nextMode);
    setError(null);
    router.replace(buildAuthUrl(nextMode), { scroll: false });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMessages();

    if (!identificador || !password) {
      setError("Ingresa tu correo o usuario y la contraseña.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ identificador, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "No se pudo iniciar sesión.");
      }

      router.push(redirectTo || "/eventos");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo iniciar sesión. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMessages();

    if (!correo || !usuario || !password) {
      setError("Completa todos los campos para registrarte.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          correo,
          usuario,
          rol,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "No se pudo registrar al usuario.");
      }

      router.push(redirectTo || "/eventos");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo completar el registro. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderLogin = () => (
    <form style={formStyle} onSubmit={handleLogin}>
      <label style={labelStyle}>
        Correo o usuario
        <input
          style={inputStyle}
          placeholder="tu correo o usuario"
          value={identificador}
          onChange={(e) => setIdentificador(e.target.value)}
        />
      </label>
      <label style={labelStyle}>
        Contraseña
        <input
          style={inputStyle}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button style={submitButtonStyle(loading)} disabled={loading}>
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </button>
    </form>
  );

  const renderRegister = () => (
    <form style={formStyle} onSubmit={handleRegister}>
      <label style={labelStyle}>
        Correo institucional
        <input
          style={inputStyle}
          type="email"
          placeholder="tu-correo@universidad.edu"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </label>
      <label style={labelStyle}>
        Usuario
        <input
          style={inputStyle}
          placeholder="elige un usuario fácil de recordar"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
      </label>
      <label style={labelStyle}>
        Rol
        <select
          style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
          value={rol}
          onChange={(e) =>
            setRol(e.target.value === "ADMIN" ? "ADMIN" : "USUARIO")
          }
        >
          <option value="USUARIO">Usuario</option>
          <option value="ADMIN">Administrador</option>
        </select>
      </label>
      <label style={labelStyle}>
        Contraseña
        <input
          style={inputStyle}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button style={submitButtonStyle(loading)} disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );

  return (
    <main style={mainStyle}>
      <section style={cardStyle}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>Reserva de eventos universitarios</h1>
          <p style={subtitleStyle}>
            Ingresa con tu cuenta o regístrate para gestionar y reservar eventos.
          </p>
        </header>

        <div style={tabsWrapperStyle}>
          <button
            style={tabButtonStyle(mode === "login")}
            onClick={() => handleModeChange("login")}
            type="button"
          >
            Iniciar sesión
          </button>
          <button
            style={tabButtonStyle(mode === "register")}
            onClick={() => handleModeChange("register")}
            type="button"
          >
            Registrarse
          </button>
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        {mode === "login" ? renderLogin() : renderRegister()}

        <footer style={footerStyle}>
          <p style={{ margin: 0, color: "#556" }}>
            ¿Olvidaste tu contraseña? Contacta al administrador del sistema.
          </p>
        </footer>
      </section>
    </main>
  );
}

const mainStyle: CSSProperties = {
  minHeight: "100vh",
  background:
    "linear-gradient(140deg, rgba(41,55,28,0.92), rgba(97,109,55,0.82))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "32px 16px",
  fontFamily: "Inter, system-ui, sans-serif",
};

const cardStyle: CSSProperties = {
  width: "100%",
  maxWidth: "420px",
  backgroundColor: "#fefae0",
  borderRadius: "22px",
  padding: "36px",
  boxShadow: "0 24px 60px rgba(41,55,28,0.28)",
};

const headerStyle: CSSProperties = {
  marginBottom: "24px",
};

const titleStyle: CSSProperties = {
  fontSize: "1.8rem",
  fontWeight: 700,
  color: "#303030",
  margin: 0,
  lineHeight: 1.3,
};

const subtitleStyle: CSSProperties = {
  marginTop: "8px",
  marginBottom: 0,
  color: "#616d37",
  fontSize: "0.95rem",
};

const tabsWrapperStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  backgroundColor: "#f1e4cc",
  borderRadius: "12px",
  padding: "4px",
  gap: "6px",
  marginBottom: "20px",
};

const tabButtonStyle = (active: boolean): CSSProperties => ({
  border: "none",
  borderRadius: "10px",
  padding: "12px 0",
  fontWeight: 600,
  fontSize: "0.95rem",
  cursor: "pointer",
  transition: "all 0.2s ease",
  backgroundColor: active ? "#bc6d24" : "transparent",
  color: active ? "#fefae0" : "#616d37",
});

const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const labelStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  color: "#303030",
  fontSize: "0.9rem",
  fontWeight: 600,
};

const inputStyle: CSSProperties = {
  width: "100%",
  borderRadius: "10px",
  border: "1px solid rgba(188,109,36,0.45)",
  padding: "12px 14px",
  fontSize: "0.95rem",
  backgroundColor: "#fffaf0",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  color: "#303030",
};

const submitButtonStyle = (loading: boolean): CSSProperties => ({
  marginTop: "6px",
  border: "none",
  borderRadius: "12px",
  padding: "12px",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: loading ? "not-allowed" : "pointer",
  background:
    "linear-gradient(135deg, rgba(188,109,36,1), rgba(221,162,93,1))",
  color: "#fefae0",
  opacity: loading ? 0.7 : 1,
  boxShadow: "0 14px 24px rgba(188,109,36,0.35)",
});

const errorStyle: CSSProperties = {
  backgroundColor: "rgba(188, 109, 36, 0.12)",
  border: "1px solid rgba(188, 109, 36, 0.45)",
  color: "#bc6d24",
  borderRadius: "10px",
  padding: "12px 14px",
  fontSize: "0.9rem",
  marginBottom: "12px",
};

const footerStyle: CSSProperties = {
  marginTop: "24px",
  textAlign: "center",
  fontSize: "0.8rem",
  color: "#616d37",
};
