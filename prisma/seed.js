// prisma/seed.js
const { prisma } = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");

async function main() {
  console.log("🧹 Limpiando base...");
  await prisma.reserva.deleteMany();
  await prisma.evento.deleteMany();
  await prisma.usuario.deleteMany();

  console.log("👤 Creando usuarios base...");
  const admin = await prisma.usuario.create({
    data: {
      correo: "admin@universidad.edu",
      usuario: "admin",
      hashedPassword: await bcrypt.hash("admin123", 10),
      rol: "ADMIN",
    },
  });

  const usuario = await prisma.usuario.create({
    data: {
      correo: "estudiante@universidad.edu",
      usuario: "estudiante",
      hashedPassword: await bcrypt.hash("usuario123", 10),
      rol: "USUARIO",
    },
  });

  console.log(
    `   Admin: ${admin.usuario} / admin123\n   Usuario: ${usuario.usuario} / usuario123`
  );

  console.log("📦 Insertando eventos iniciales...");
  await prisma.evento.createMany({
    data: [
      {
        id: "1",
        titulo: "Semana de la Innovación",
        fecha: "28 Oct 2025 - 10:00 AM",
        lugar: "Auditorio Principal, Bloque A",
        descripcionLarga:
          "Charlas sobre inteligencia artificial aplicada, robótica y proyectos de emprendimiento universitario.",
        imagenPrincipal: "/evento-innovacion.png",
        responsable: "Dirección de Investigación y Transferencia",
        cupo: "150 asistentes",
        imagenesSecundarias:
          "/evento-innovacion.png,/evento-innovacion.png",
        creadoPorId: admin.id,
      },
      {
        id: "2",
        titulo: "Feria de Bienestar Universitario",
        fecha: "30 Oct 2025 - 2:00 PM",
        lugar: "Plazoleta Central",
        descripcionLarga:
          "Actividades de salud, cultura y deporte. Espacios de inclusión y bienestar para toda la comunidad.",
        imagenPrincipal: "/feria-bienestar.png",
        responsable: "Bienestar Universitario",
        cupo: "Abierto a toda la comunidad",
        imagenesSecundarias:
          "/feria-bienestar.png,/feria-bienestar.png",
        creadoPorId: admin.id,
      },
      {
        id: "3",
        titulo: "Taller de Empleabilidad",
        fecha: "2 Nov 2025 - 8:00 AM",
        lugar: "Sala de Sistemas 204",
        descripcionLarga:
          "Entrenamiento práctico para mejorar hoja de vida y entrevistas técnicas.",
        imagenPrincipal: "/taller-empleo.png",
        responsable: "Oficina de Egresados",
        cupo: "30 cupos",
        imagenesSecundarias:
          "/taller-empleo.png,/taller-empleo.png",
        creadoPorId: admin.id,
      },
    ],
  });

  console.log("✅ Listo: eventos insertados.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
