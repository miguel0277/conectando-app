"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { SessionUser } from "@/lib/auth";

type Evento = {
  id: string;
  titulo: string;
  fecha: string;
  lugar: string;
  descripcionLarga: string;
  imagenPrincipal: string;
};

type EventsClientProps = {
  initialEventos: Evento[];
  initialUser: SessionUser | null;
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

const topBarEnterIcon: CSSProperties = {
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  backgroundColor: "#fef2e4",
  color: "#b86a26",
  display: "grid",
  placeItems: "center",
  fontWeight: 600,
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
  padding: "40px 24px 72px",
};

const headerStyle: CSSProperties = {
  maxWidth: "1180px",
  margin: "0 auto 32px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const headerTextBlock: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const greetingStyle: CSSProperties = {
  fontSize: "0.9rem",
  margin: 0,
  fontWeight: 600,
  color: "#616d37",
  textTransform: "uppercase",
  letterSpacing: "1.6px",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "2.2rem",
  fontWeight: 700,
  color: "#29371c",
};

const subtitleStyle: CSSProperties = {
  margin: 0,
  color: "#616d37",
  fontSize: "1rem",
  maxWidth: "640px",
  lineHeight: 1.6,
};

const actionsStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const primaryButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 18px",
  borderRadius: "12px",
  background: "linear-gradient(135deg,#bc6d24,#dda25d)",
  color: "#fefae0",
  fontWeight: 600,
  fontSize: "0.95rem",
  textDecoration: "none",
  boxShadow: "0 12px 26px rgba(188,109,36,0.25)",
};

const loadingSectionStyle: CSSProperties = {
  display: "grid",
  gap: "24px",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  maxWidth: "1180px",
  margin: "0 auto",
};

const loadingCardStyle: CSSProperties = {
  height: "320px",
  borderRadius: "20px",
  background:
    "linear-gradient(100deg, rgba(188,109,36,0.16) 25%, rgba(97,109,55,0.18) 50%, rgba(188,109,36,0.16) 75%)",
  backgroundSize: "400% 100%",
};

const gridStyle: CSSProperties = {
  display: "grid",
  gap: "24px",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  maxWidth: "1180px",
  margin: "0 auto",
};

const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  borderRadius: "20px",
  backgroundColor: "#fff9ed",
  boxShadow: "0 24px 40px rgba(41,55,28,0.12)",
  overflow: "hidden",
  border: "1px solid rgba(188,109,36,0.24)",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
};

const imageWrapperStyle: CSSProperties = {
  position: "relative",
  padding: "18px 18px 0",
};

const imageStyle: CSSProperties = {
  borderRadius: "16px",
  height: "180px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: "#bc6d24",
};

const badgeStyle: CSSProperties = {
  position: "absolute",
  top: "24px",
  left: "32px",
  backgroundColor: "rgba(97,109,55,0.88)",
  color: "#fefae0",
  padding: "6px 12px",
  borderRadius: "30px",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const cardContentStyle: CSSProperties = {
  padding: "20px 24px 12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  flexGrow: 1,
};

const cardTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#303030",
};

const metaStyle: CSSProperties = {
  margin: 0,
  color: "#616d37",
  fontSize: "0.9rem",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  fontWeight: 500,
};

const descriptionStyle: CSSProperties = {
  margin: 0,
  color: "#616d37",
  lineHeight: 1.6,
  fontSize: "0.92rem",
};

const detailsButtonStyle: CSSProperties = {
  margin: "0 24px 24px",
  border: "none",
  borderRadius: "12px",
  padding: "12px",
  fontWeight: 600,
  fontSize: "0.95rem",
  textAlign: "center",
  background:
    "linear-gradient(135deg, rgba(97,109,55,1), rgba(41,55,28,1))",
  color: "#fefae0",
  textDecoration: "none",
  boxShadow: "0 14px 30px rgba(41,55,28,0.28)",
};

const emptyStateStyle: CSSProperties = {
  gridColumn: "1 / -1",
  padding: "48px",
  borderRadius: "20px",
  border: "1px dashed rgba(97,109,55,0.4)",
  backgroundColor: "rgba(188,109,36,0.08)",
  textAlign: "center",
  color: "#616d37",
};

const errorBoxStyle: CSSProperties = {
  maxWidth: "1180px",
  margin: "0 auto 24px",
  padding: "16px 20px",
  borderRadius: "16px",
  backgroundColor: "rgba(188,109,36,0.12)",
  border: "1px solid rgba(188,109,36,0.32)",
  color: "#bc6d24",
  fontWeight: 500,
};

export default function EventsClient({
  initialEventos,
  initialUser,
}: EventsClientProps) {
  const [eventos, setEventos] = useState<Evento[]>(initialEventos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<SessionUser | null>(initialUser);

  useEffect(() => {
    let activo = true;

    async function refrescarEventos() {
      setLoading(true);
      setError(null);
      try {
        const respuesta = await fetch("/api/eventos", {
          cache: "no-store",
        });
        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los eventos.");
        }
        const data: Evento[] = await respuesta.json();
        if (activo) {
          setEventos(data);
        }
      } catch (err) {
        if (activo) {
          setError(
            err instanceof Error
              ? err.message
              : "Ocurrió un error al cargar los eventos."
          );
        }
      } finally {
        if (activo) {
          setLoading(false);
        }
      }
    }

    refrescarEventos();

    return () => {
      activo = false;
    };
  }, []);

  const saludo = useMemo(() => {
    if (!user) return "Explora los talleres de la universidad";
    return user.rol === "ADMIN"
      ? `Admin ${user.usuario}, gestiona tus talleres`
      : `Hola ${user.usuario}, reserva tu próximo taller`;
  }, [user]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setUser(null);
      window.location.href = "/eventos";
    }
  };

  const loginUrl = "/auth?mode=login&redirect=%2Feventos";
  const registerUrl = "/auth?mode=register&redirect=%2Feventos";

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
          {user ? (
            <>
              <span style={topBarUserLabel}>{user.usuario}</span>
              <button style={topBarButtonStyle} onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <div style={topBarEnterIcon}>👤</div>
              <Link href={loginUrl} style={topBarLinkStyle}>
                Entrar
              </Link>
              <Link href={registerUrl} style={topBarLinkStyle}>
                Registrarse
              </Link>
            </>
          )}
        </div>
      </header>

      <main style={mainStyle}>
        <header style={headerStyle}>
          <div style={headerTextBlock}>
            <p style={greetingStyle}>{saludo}</p>
            <h1 style={titleStyle}>Talleres disponibles</h1>
            <p style={subtitleStyle}>
              Consulta la agenda académica y cultural. Puedes registrarte con tu
              cuenta institucional para reservar tu cupo y recibir
              notificaciones.
            </p>
          </div>

          <div style={actionsStyle}>
            {user?.rol === "ADMIN" ? (
              <Link href="/eventos/administrar" style={primaryButtonStyle}>
                Agregar evento
              </Link>
            ) : (
              !user && (
                <Link href={registerUrl} style={primaryButtonStyle}>
                  Registrarse
                </Link>
              )
            )}
          </div>
        </header>

        {loading && (
          <section style={loadingSectionStyle}>
            <div style={loadingCardStyle} />
            <div style={loadingCardStyle} />
            <div style={loadingCardStyle} />
          </section>
        )}

        {error && (
          <div style={errorBoxStyle}>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <section style={gridStyle}>
            {eventos.map((evento) => (
              <article key={evento.id} style={cardStyle}>
                <div style={imageWrapperStyle}>
                  <div
                    style={{
                      ...imageStyle,
                      backgroundImage: `url(${evento.imagenPrincipal})`,
                    }}
                  />
                  <div style={badgeStyle}>Taller</div>
                </div>
                <div style={cardContentStyle}>
                  <h2 style={cardTitleStyle}>{evento.titulo}</h2>
                  <p style={metaStyle}>
                    <span>📅 {evento.fecha}</span>
                    <span>📍 {evento.lugar}</span>
                  </p>
                  <p style={descriptionStyle}>
                    {evento.descripcionLarga.length > 140
                      ? `${evento.descripcionLarga.slice(0, 140)}...`
                      : evento.descripcionLarga}
                  </p>
                </div>
                <Link href={`/eventos/${evento.id}`} style={detailsButtonStyle}>
                  Ver detalles
                </Link>
              </article>
            ))}

            {eventos.length === 0 && (
              <div style={emptyStateStyle}>
                Aún no hay talleres publicados.
                {user?.rol === "ADMIN" && " ¡Crea el primero!"}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
