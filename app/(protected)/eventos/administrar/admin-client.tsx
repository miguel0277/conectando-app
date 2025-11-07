"use client";

import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormState = {
  titulo: string;
  fecha: string;
  lugar: string;
  descripcionLarga: string;
  imagenPrincipal: string;
  responsable: string;
  cupo: string;
  imagenesSecundarias: string;
};

const initialState: FormState = {
  titulo: "",
  fecha: "",
  lugar: "",
  descripcionLarga: "",
  imagenPrincipal: "",
  responsable: "",
  cupo: "",
  imagenesSecundarias: "",
};

export function AdminEventosClient() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>(initialState);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const camposIncompletos = useMemo(() => {
    const { imagenesSecundarias, ...resto } = formData;
    return Object.values(resto).some((valor) => valor.trim() === "");
  }, [formData]);

  const handleChange = (
    campo: keyof FormState,
    valor: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    if (camposIncompletos) {
      setError("Completa todos los campos requeridos antes de guardar.");
      return;
    }

    setEnviando(true);

    try {
      const respuesta = await fetch("/api/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await respuesta.json();

      if (!respuesta.ok || !data.ok) {
        throw new Error(data.error ?? "No se pudo crear el evento.");
      }

      setMensaje("Evento publicado correctamente.");
      setFormData(initialState);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo crear el evento. Intenta nuevamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main style={mainStyle}>
      <section style={layoutStyle}>
        <header style={headerStyle}>
          <div>
            <h1 style={titleStyle}>Agregar nuevo evento</h1>
            <p style={subtitleStyle}>
              Completa la información para publicar un evento visible para toda
              la comunidad universitaria.
            </p>
          </div>
          <Link href="/eventos" style={backLinkStyle}>
            ← Volver a la lista
          </Link>
        </header>

        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={fieldsGridStyle}>
            <label style={labelStyle}>
              Título del evento *
              <input
                style={inputStyle}
                placeholder="Ej: Semana de la Innovación"
                value={formData.titulo}
                onChange={(e) => handleChange("titulo", e.target.value)}
              />
            </label>

            <label style={labelStyle}>
              Fecha y hora *
              <input
                style={inputStyle}
                placeholder="Ej: 12 Nov 2025 - 8:00 AM"
                value={formData.fecha}
                onChange={(e) => handleChange("fecha", e.target.value)}
              />
            </label>

            <label style={labelStyle}>
              Lugar *
              <input
                style={inputStyle}
                placeholder="Ej: Auditorio Central"
                value={formData.lugar}
                onChange={(e) => handleChange("lugar", e.target.value)}
              />
            </label>

            <label style={labelStyle}>
              Responsable *
              <input
                style={inputStyle}
                placeholder="Coordinación de..."
                value={formData.responsable}
                onChange={(e) => handleChange("responsable", e.target.value)}
              />
            </label>

            <label style={labelStyle}>
              Cupo disponible *
              <input
                style={inputStyle}
                placeholder="Ej: 120 asistentes"
                value={formData.cupo}
                onChange={(e) => handleChange("cupo", e.target.value)}
              />
            </label>

            <label style={labelStyle}>
              Imagen principal (URL) *
              <input
                style={inputStyle}
                placeholder="/imagenes/evento.png"
                value={formData.imagenPrincipal}
                onChange={(e) =>
                  handleChange("imagenPrincipal", e.target.value)
                }
              />
            </label>
          </div>

          <label style={labelStyle}>
            Descripción detallada *
            <textarea
              style={textareaStyle}
              rows={6}
              placeholder="Describe los objetivos, agenda, participantes y beneficios del evento..."
              value={formData.descripcionLarga}
              onChange={(e) =>
                handleChange("descripcionLarga", e.target.value)
              }
            />
          </label>

          <label style={labelStyle}>
            Imágenes secundarias (opcional)
            <textarea
              style={textareaStyle}
              rows={3}
              placeholder="Una URL por línea. Se mostrarán en la galería del evento."
              value={formData.imagenesSecundarias}
              onChange={(e) =>
                handleChange("imagenesSecundarias", e.target.value)
              }
            />
          </label>

          {error && <p style={errorStyle}>{error}</p>}
          {mensaje && <p style={successStyle}>{mensaje}</p>}

          <div style={actionsStyle}>
            <button
              type="submit"
              style={submitButtonStyle(enviando)}
              disabled={enviando}
            >
              {enviando ? "Publicando..." : "Publicar evento"}
            </button>
            <button
              type="button"
              style={clearButtonStyle}
              onClick={() => setFormData(initialState)}
              disabled={enviando}
            >
              Limpiar campos
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

const mainStyle: CSSProperties = {
  minHeight: "100vh",
  padding: "40px 20px 64px",
  background: "linear-gradient(180deg,#f7fbff 0%,#ffffff 50%)",
  fontFamily: "Inter, system-ui, sans-serif",
};

const layoutStyle: CSSProperties = {
  maxWidth: "960px",
  margin: "0 auto",
  backgroundColor: "white",
  borderRadius: "24px",
  padding: "32px",
  boxShadow: "0 24px 50px rgba(15,23,42,0.12)",
  border: "1px solid rgba(148,163,184,0.18)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  marginBottom: "28px",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "2rem",
  fontWeight: 700,
  color: "#0f172a",
};

const subtitleStyle: CSSProperties = {
  margin: "10px 0 0",
  color: "#475569",
  maxWidth: "540px",
  lineHeight: 1.5,
};

const backLinkStyle: CSSProperties = {
  color: "#2563eb",
  fontWeight: 600,
  textDecoration: "none",
  fontSize: "0.95rem",
};

const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "22px",
};

const fieldsGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "18px",
};

const labelStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  color: "#0f172a",
  fontWeight: 600,
  fontSize: "0.9rem",
};

const inputStyle: CSSProperties = {
  borderRadius: "12px",
  border: "1px solid rgba(148,163,184,0.6)",
  padding: "12px 14px",
  fontSize: "0.95rem",
  backgroundColor: "rgba(248,250,252,0.8)",
};

const textareaStyle: CSSProperties = {
  ...inputStyle,
  minHeight: "96px",
  resize: "vertical",
};

const errorStyle: CSSProperties = {
  backgroundColor: "rgba(248,113,113,0.12)",
  border: "1px solid rgba(248,113,113,0.35)",
  color: "#991b1b",
  padding: "12px 14px",
  borderRadius: "12px",
  fontSize: "0.9rem",
  margin: 0,
};

const successStyle: CSSProperties = {
  backgroundColor: "rgba(34,197,94,0.12)",
  border: "1px solid rgba(34,197,94,0.3)",
  color: "#166534",
  padding: "12px 14px",
  borderRadius: "12px",
  fontSize: "0.9rem",
  margin: 0,
};

const actionsStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
};

const submitButtonStyle = (loading: boolean): CSSProperties => ({
  border: "none",
  borderRadius: "12px",
  padding: "12px 22px",
  fontWeight: 700,
  fontSize: "1rem",
  color: "white",
  background:
    "linear-gradient(135deg, rgba(34,197,94,1), rgba(59,130,246,1))",
  cursor: loading ? "not-allowed" : "pointer",
  opacity: loading ? 0.75 : 1,
  boxShadow: "0 16px 28px rgba(37,99,235,0.25)",
});

const clearButtonStyle: CSSProperties = {
  borderRadius: "12px",
  padding: "12px 22px",
  fontWeight: 600,
  fontSize: "0.95rem",
  border: "1px solid rgba(148,163,184,0.6)",
  backgroundColor: "white",
  color: "#1e293b",
  cursor: "pointer",
};
