/*
  Warnings:

  - You are about to alter the column `timestamp` on the `Reserva` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.

*/
-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "correo" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Evento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "lugar" TEXT NOT NULL,
    "descripcionLarga" TEXT NOT NULL,
    "imagenPrincipal" TEXT NOT NULL,
    "responsable" TEXT NOT NULL,
    "cupo" TEXT NOT NULL,
    "imagenesSecundarias" TEXT NOT NULL,
    "creadoPorId" TEXT,
    CONSTRAINT "Evento_creadoPorId_fkey" FOREIGN KEY ("creadoPorId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Evento" ("cupo", "descripcionLarga", "fecha", "id", "imagenPrincipal", "imagenesSecundarias", "lugar", "responsable", "titulo") SELECT "cupo", "descripcionLarga", "fecha", "id", "imagenPrincipal", "imagenesSecundarias", "lugar", "responsable", "titulo" FROM "Evento";
DROP TABLE "Evento";
ALTER TABLE "new_Evento" RENAME TO "Evento";
CREATE TABLE "new_Reserva" (
    "idReserva" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventoId" TEXT NOT NULL,
    "usuarioId" TEXT,
    CONSTRAINT "Reserva_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reserva_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Reserva" ("correo", "documento", "eventoId", "idReserva", "nombre", "timestamp") SELECT "correo", "documento", "eventoId", "idReserva", "nombre", "timestamp" FROM "Reserva";
DROP TABLE "Reserva";
ALTER TABLE "new_Reserva" RENAME TO "Reserva";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");
