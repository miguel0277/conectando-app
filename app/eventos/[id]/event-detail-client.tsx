"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { SessionUser } from "@/lib/auth";

type Evento = {
  id: string;
  titulo: string;
  fecha: string;
  lugar: string;
  descripcionLarga: string;
  imagenPrincipal: string;
  responsable: string;
  cupo: string;
  imagenesSecundarias: string;
};

type EventDetailClientProps = {
  evento: Evento;
  user: SessionUser;
};

const pageWrapperStyle: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#fefae0",
  fontFamily: "Inter, system-ui, sans-serif",
  display: "flex",
  flexDirection: "column",
};

const topBarStyle: CSSProperties = {
  backgroundColor: "#b86a26",
  color: "#fef2e4",
  padding: "24px 40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "28px",
  flexWrap: "wrap",
};

const topBarLinksStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
  fontSize: "1rem",
};

const topBarLinkStyle: CSSProperties = {
  color: "#fef2e4",
  textDecoration: "none",
  fontWeight: 500,
};

const topBarUserArea: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const topBarButtonStyle: CSSProperties = {
  border: "none",
  backgroundColor: "#fef2e4",
  color: "#b86a26",
  borderRadius: "18px",
  padding: "10px 18px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
};

const topBarUserLabel: CSSProperties = {
  color: "#fef2e4",
  fontWeight: 600,
};

const mainStyle: CSSProperties = {
  flex: 1,
  padding: "32px 16px 72px",
};

const wrapperStyle: CSSProperties = {
  width: "100%",
  maxWidth: "1100px",
  margin: "0 auto",
};

const backButtonStyle: CSSProperties = {
  border: "none",
  background: "none",
  color: "#bc6d24",
  fontWeight: 600,
  cursor: "pointer",
  marginBottom: "18px",
  fontSize: "0.95rem",
};

const cardStyle: CSSProperties = {
  backgroundColor: "#fff9ed",
  borderRadius: "24px",
  boxShadow: "0 24px 50px rgba(41,55,28,0.16)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

const heroWrapperStyle: CSSProperties = {
  position: "relative",
  backgroundColor: "#29371c",
  minHeight: "260px",
};

const heroImageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  minHeight: "260px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(0.75)",
};

const heroOverlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  padding: "38px 36px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: "12px",
  color: "#fefae0",
};

const heroBadgeStyle: CSSProperties = {
  alignSelf: "flex-start",
  backgroundColor: "rgba(188,109,36,0.95)",
  borderRadius: "999px",
  padding: "8px 16px",
  fontSize: "0.8rem",
  fontWeight: 600,
  letterSpacing: "1px",
  textTransform: "uppercase",
};

const heroTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "2.1rem",
  fontWeight: 700,
};

const heroMetaStyle: CSSProperties = {
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  fontSize: "1rem",
  fontWeight: 500,
};

const contentWrapperStyle: CSSProperties = {
  display: "grid",
  gap: "32px",
  gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
  padding: "32px 36px 42px",
};

const descriptionColumnStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const sectionTitleStyle: CSSProperties = {
  margin: "0 0 12px",
  fontSize: "1.4rem",
  color: "#29371c",
  fontWeight: 700,
};

const descriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: "1rem",
  color: "#616d37",
  lineHeight: 1.8,
  whiteSpace: "pre-line",
};

const sectionSubtitleStyle: CSSProperties = {
  margin: "12px 0 4px",
  fontSize: "0.95rem",
  fontWeight: 700,
  color: "#303030",
};

const infoTextStyle: CSSProperties = {
  margin: 0,
  color: "#616d37",
  fontSize: "0.95rem",
};

const galleryStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: "12px",
};

const galleryImageStyle: CSSProperties = {
  height: "100px",
  borderRadius: "14px",
  backgroundColor: "#dda25d",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const formCardStyle: CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(188,109,36,0.12) 0%, rgba(97,109,55,0.12) 100%)",
  borderRadius: "20px",
  padding: "24px 26px",
  border: "1px solid rgba(188,109,36,0.28)",
  boxShadow: "0 18px 40px rgba(41,55,28,0.18)",
  alignSelf: "flex-start",
};

const formTitleStyle: CSSProperties = {
  margin: "0 0 6px",
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "#29371c",
};

const formSubtitleStyle: CSSProperties = {
  margin: 0,
  color: "#616d37",
  fontSize: "0.95rem",
  lineHeight: 1.5,
};

const formStyle: CSSProperties = {
  marginTop: "18px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const labelStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  color: "#303030",
  fontWeight: 600,
  fontSize: "0.9rem",
};

const inputStyle: CSSProperties = {
  borderRadius: "12px",
  border: "1px solid rgba(188,109,36,0.4)",
  padding: "12px 14px",
  fontSize: "0.95rem",
  transition: "border-color 0.2s ease",
  backgroundColor: "#fffaf0",
  color: "#303030",
};

const submitButtonStyle = (loading: boolean): CSSProperties => ({
  marginTop: "4px",
  border: "none",
  borderRadius: "12px",
  padding: "12px",
  fontWeight: 700,
  fontSize: "1rem",
  color: "#fefae0",
  background:
    "linear-gradient(135deg, rgba(188,109,36,1) 0%, rgba(221,162,93,1) 100%)",
  cursor: loading ? "not-allowed" : "pointer",
  opacity: loading ? 0.7 : 1,
  boxShadow: "0 16px 28px rgba(188,109,36,0.3)",
});

const errorMessageStyle: CSSProperties = {
  marginTop: "12px",
  color: "#bc6d24",
  backgroundColor: "rgba(188,109,36,0.12)",
  border: "1px solid rgba(188,109,36,0.3)",
  padding: "10px 12px",
  borderRadius: "10px",
  fontSize: "0.85rem",
};

const privacyNoteStyle: CSSProperties = {
  marginTop: "12px",
  color: "#616d37",
  fontSize: "0.8rem",
  lineHeight: 1.6,
};

const modalOverlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(41,55,28,0.45)",
  display: "grid",
  placeItems: "center",
  padding: "20px",
};

const modalCardStyle: CSSProperties = {
  backgroundColor: "#fff9ed",
  borderRadius: "20px",
  padding: "26px 30px",
  maxWidth: "360px",
  width: "100%",
  boxShadow: "0 24px 48px rgba(41,55,28,0.26)",
  textAlign: "center",
};

const modalActionsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "20px",
};

const modalPrimaryButtonStyle: CSSProperties = {
  border: "none",
  padding: "12px",
  borderRadius: "12px",
  fontWeight: 600,
  fontSize: "0.95rem",
  background: "linear-gradient(135deg,#29371c,#616d37)",
  color: "#fefae0",
  cursor: "pointer",
};

const modalSecondaryButtonStyle: CSSProperties = {
  border: "1px solid rgba(188,109,36,0.4)",
  padding: "12px",
  borderRadius: "12px",
  fontWeight: 600,
  fontSize: "0.95rem",
  backgroundColor: "#fefae0",
  color: "#29371c",
  cursor: "pointer",
};

export default function EventDetailClient({
  evento,
  user,
}: EventDetailClientProps) {
  const router = useRouter();
  const [nombre, setNombre] = useState(user.usuario);
  const [correo, setCorreo] = useState(user.correo);
  const [documento, setDocumento] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [reservaExitosa, setReservaExitosa] = useState(false);
  const [reservaId, setReservaId] = useState<string | null>(null);
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  const imagenesSecundarias = useMemo(() => {
    return evento.imagenesSecundarias
      .split(",")
      .map((img) => img.trim())
      .filter(Boolean);
  }, [evento.imagenesSecundarias]);

  const handleReservar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre || !correo || !documento) {
      setMensajeError("Completa todos los campos antes de reservar.");
      return;
    }

    try {
      setMensajeError(null);
      setEnviando(true);

      const respuesta = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          idEvento: evento.id,
          nombre,
          correo,
          documento,
        }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok || !data.ok) {
        throw new Error(data.error ?? "No se pudo registrar la reserva.");
      }

      setReservaId(data.reservaId ?? null);
      setReservaExitosa(true);
      setDocumento("");
    } catch (err) {
      setMensajeError(
        err instanceof Error
          ? err.message
          : "No pudimos completar la reserva. Intenta de nuevo."
      );
    } finally {
      setEnviando(false);
    }
  };

  const volverAEventos = () => {
    router.push("/eventos");
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      router.push("/eventos");
    }
  };

  return (
    <div style={pageWrapperStyle}>
      <header style={topBarStyle}>
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          <Image
            src="/logo.png"
            alt="Conectando logo"
            width={170}
            height={40}
            priority
          />
        </Link>

        <nav style={topBarLinksStyle}>
          <Link href="/" style={topBarLinkStyle}>
            Inicio
          </Link>
          <Link href="/about-us" style={topBarLinkStyle} target="_blank" rel="noopener noreferrer">
            About us
          </Link>
          <Link href="/eventos" style={topBarLinkStyle}>
            Talleres
          </Link>
        </nav>

        <div style={topBarUserArea}>
          <span style={topBarUserLabel}>{user.usuario}</span>
          <button style={topBarButtonStyle} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main style={mainStyle}>
        <section style={wrapperStyle}>
          <button style={backButtonStyle} onClick={volverAEventos}>
            ← Volver a talleres
          </button>

          <article style={cardStyle}>
            <div style={heroWrapperStyle}>
              <div
                style={{
                  ...heroImageStyle,
                  backgroundImage: `url(${evento.imagenPrincipal})`,
                }}
              />
              <div style={heroOverlayStyle}>
                <span style={heroBadgeStyle}>Taller destacado</span>
                <h1 style={heroTitleStyle}>{evento.titulo}</h1>
                <p style={heroMetaStyle}>
                  <span>📅 {evento.fecha}</span>
                  <span>📍 {evento.lugar}</span>
                </p>
              </div>
            </div>

            <div style={contentWrapperStyle}>
              <div style={descriptionColumnStyle}>
                <section>
                  <h2 style={sectionTitleStyle}>Descripción</h2>
                  <p style={descriptionStyle}>{evento.descripcionLarga}</p>
                </section>

                <section style={{ marginTop: "28px" }}>
                  <h3 style={sectionSubtitleStyle}>Responsable</h3>
                  <p style={infoTextStyle}>{evento.responsable}</p>
                  <h3 style={sectionSubtitleStyle}>Cupo</h3>
                  <p style={infoTextStyle}>{evento.cupo}</p>
                </section>

                {imagenesSecundarias.length > 0 && (
                  <section style={{ marginTop: "28px" }}>
                    <h3 style={sectionSubtitleStyle}>Galería</h3>
                    <div style={galleryStyle}>
                      {imagenesSecundarias.map((imagen, idx) => (
                        <div
                          key={`${imagen || "imagen"}-${idx}`}
                          style={{
                            ...galleryImageStyle,
                            backgroundImage: `url(${imagen})`,
                          }}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <aside style={formCardStyle}>
                <h2 style={formTitleStyle}>Reserva tu cupo</h2>
                <p style={formSubtitleStyle}>
                  Registra tu asistencia para recibir confirmaciones y
                  materiales del taller.
                </p>

                <form style={formStyle} onSubmit={handleReservar}>
                  <label style={labelStyle}>
                    Nombre completo
                    <input
                      style={inputStyle}
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </label>

                  <label style={labelStyle}>
                    Correo electrónico
                    <input
                      style={inputStyle}
                      type="email"
                      placeholder="correo@universidad.edu"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </label>

                  <label style={labelStyle}>
                    Documento / ID
                    <input
                      style={inputStyle}
                      placeholder="Número de documento"
                      value={documento}
                      onChange={(e) => setDocumento(e.target.value)}
                    />
                  </label>

                  <button
                    style={submitButtonStyle(enviando)}
                    disabled={enviando}
                  >
                    {enviando ? "Reservando..." : "Reservar asistencia"}
                  </button>
                </form>

                {mensajeError && (
                  <p style={errorMessageStyle}>{mensajeError}</p>
                )}

                <p style={privacyNoteStyle}>
                  Tus datos se usan únicamente para gestionar tu asistencia y
                  comunicación del taller.
                </p>
              </aside>
            </div>
          </article>
        </section>

        {reservaExitosa && (
          <div style={modalOverlayStyle}>
            <div style={modalCardStyle}>
              <h2 style={{ margin: "0 0 10px" }}>Reserva confirmada ✅</h2>
              <p style={{ margin: 0, color: "#334155", lineHeight: 1.5 }}>
                Hemos registrado tu asistencia.
                {reservaId && (
                  <>
                    <br />
                    Código de reserva: <strong>{reservaId}</strong>
                  </>
                )}
              </p>
              <div style={modalActionsStyle}>
                <button
                  style={modalPrimaryButtonStyle}
                  onClick={() => setReservaExitosa(false)}
                >
                  Aceptar
                </button>
                <button
                  style={modalSecondaryButtonStyle}
                  onClick={() => {
                    setReservaExitosa(false);
                    router.push("/eventos");
                  }}
                >
                  Ver otros talleres
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
