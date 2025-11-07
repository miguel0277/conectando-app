import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

const homeStyle: CSSProperties = {
  minHeight: "100vh",
  fontFamily: "Inter, system-ui, sans-serif",
  backgroundColor: "#fef8f1",
};

const heroStyle: CSSProperties = {
  backgroundColor: "#b86a26",
  color: "#fef2e4",
  padding: "28px 48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "32px",
};

const linksStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "28px",
  fontSize: "1rem",
};

const linkStyle: CSSProperties = {
  color: "#fef2e4",
  textDecoration: "none",
  fontWeight: 500,
};

const enterWrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const enterIconStyle: CSSProperties = {
  width: "26px",
  height: "26px",
  borderRadius: "50%",
  backgroundColor: "#fef2e4",
  color: "#b86a26",
  display: "grid",
  placeItems: "center",
  fontWeight: 600,
};

const enterLinkStyle: CSSProperties = {
  ...linkStyle,
  fontWeight: 600,
};

const mainContentStyle: CSSProperties = {
  paddingBottom: "80px",
};

const highlightStyle: CSSProperties = {
  backgroundColor: "#fff5ea",
  borderRadius: "24px",
  padding: "48px",
  boxShadow: "0 24px 50px rgba(184, 106, 38, 0.2)",
  color: "#71431a",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const highlightTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "2.4rem",
  fontWeight: 700,
  color: "#8b4f1f",
};

const highlightTextStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.06rem",
  lineHeight: 1.7,
};

const ctaRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  marginTop: "12px",
};

const primaryCtaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 28px",
  borderRadius: "999px",
  backgroundColor: "#b86a26",
  color: "#fef2e4",
  textDecoration: "none",
  fontWeight: 600,
  boxShadow: "0 14px 30px rgba(184, 106, 38, 0.24)",
};

const secondaryCtaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 28px",
  borderRadius: "999px",
  border: "2px solid #b86a26",
  color: "#b86a26",
  textDecoration: "none",
  fontWeight: 600,
};

const footerStyle: CSSProperties = {
  marginTop: "60px",
  textAlign: "center",
  color: "#a86b38",
  fontSize: "0.9rem",
};

const heroGalleryWrapper: CSSProperties = {
  position: "relative",
  marginTop: "0",
  minHeight: "520px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

const heroBackground: CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage: "url('/imagenHome.png')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(0.75)",
};

const heroOverlay: CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundColor: "#616d378e",
};

const heroContent: CSSProperties = {
  position: "relative",
  zIndex: 2,
  color: "#fefae0",
  maxWidth: "860px",
  padding: "48px 32px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const heroHeading: CSSProperties = {
  margin: 0,
  fontSize: "2.8rem",
  lineHeight: 1.3,
  fontWeight: 700,
};

const heroSubheading: CSSProperties = {
  margin: 0,
  fontSize: "1.15rem",
  color: "rgba(254,250,224,0.9)",
};

const heroButtonRow: CSSProperties = {
  marginTop: "12px",
};

const heroButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 28px",
  borderRadius: "999px",
  backgroundColor: "#b86a26",
  color: "#fefae0",
  textDecoration: "none",
  fontWeight: 600,
  boxShadow: "0 16px 30px rgba(184, 106, 38, 0.38)",
};

export default function HomePage() {
  return (
    <div style={homeStyle}>
      <header style={heroStyle}>
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          <Image
            src="/logo.png"
            alt="Conectando logo"
            width={200}
            height={48}
            priority
          />
        </Link>

        <nav style={linksStyle}>
          <Link href="#acerca" style={linkStyle}>
            Acerca de
          </Link>
          <Link href="/eventos" style={linkStyle}>
            Talleres
          </Link>
          <Link href="/about-us" style={linkStyle}>
            About us
          </Link>
          <Link href="#comunidad" style={linkStyle}>
            Comunidad
          </Link>
          <Link href="#contacto" style={linkStyle}>
            Contacto
          </Link>
        </nav>

        <div style={enterWrapperStyle}>
          <div style={enterIconStyle}>👤</div>
          <Link
            href="/auth?mode=login&redirect=%2Feventos"
            style={enterLinkStyle}
          >
            Entrar
          </Link>
        </div>
      </header>

      <main style={mainContentStyle}>
        <section style={heroGalleryWrapper}>
          <div style={heroBackground} />
          <div style={heroOverlay} />
          <div style={heroContent}>
            <h1 style={heroHeading}>
              Plataforma dedicada a reservar talleres y espacios enfocados en el
              bienestar y la creatividad
            </h1>
            <p style={heroSubheading}>
              Desconéctate, reconéctate, crece
            </p>
            <div style={heroButtonRow}>
              <Link
                href="/about-us"
                style={heroButtonStyle}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explora
              </Link>
            </div>
          </div>
        </section>

        <section style={highlightStyle} id="acerca">
          <h1 style={highlightTitleStyle}>
            Bienvenido a Conectando
          </h1>
          <p style={highlightTextStyle}>
            Una comunidad universitaria para descubrir experiencias
            presenciales y virtuales. Aquí encontrarás talleres,
            encuentros y actividades que fortalecen las habilidades de la
            comunidad académica.
          </p>
          <p style={highlightTextStyle}>
            Explora nuestros talleres activos y guarda tu cupo.
            Inicia sesión para recibir recordatorios, materiales y
            novedades pensadas para ti.
          </p>

          <div style={ctaRowStyle}>
            <Link href="/eventos" style={primaryCtaStyle}>
              Ver talleres disponibles
            </Link>
            <Link
              href="/auth?mode=register&redirect=%2Feventos"
              style={secondaryCtaStyle}
            >
              Crear cuenta
            </Link>
          </div>
        </section>

        <section id="comunidad" style={{ marginTop: "72px" }}>
          <h2 style={{ color: "#8b4f1f", fontSize: "1.8rem" }}>
            Comunidad conectada
          </h2>
          <p style={highlightTextStyle}>
            Comparte experiencias, amplía tu red y construye proyectos
            colaborativos. Nuestro objetivo es acercar el conocimiento a
            través de talleres prácticos con expertos de la universidad.
          </p>
        </section>

        <section id="contacto" style={{ marginTop: "56px" }}>
          <h2 style={{ color: "#8b4f1f", fontSize: "1.8rem" }}>
            ¿Necesitas ayuda?
          </h2>
          <p style={highlightTextStyle}>
            Escríbenos a{" "}
            <a
              href="mailto:conectando@universidad.edu"
              style={{ color: "#b86a26", fontWeight: 600 }}
            >
              conectando@universidad.edu
            </a>{" "}
            o acércate a Bienestar Universitario para obtener soporte
            personalizado.
          </p>
        </section>

        <p style={footerStyle}>
          © {new Date().getFullYear()} Conectando · Universidad
        </p>
      </main>
    </div>
  );
}
