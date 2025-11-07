-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "lugar" TEXT NOT NULL,
    "descripcionLarga" TEXT NOT NULL,
    "imagenPrincipal" TEXT NOT NULL,
    "responsable" TEXT NOT NULL,
    "cupo" TEXT NOT NULL,
    "imagenesSecundarias" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reserva" (
    "idReserva" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "eventoId" TEXT NOT NULL,
    CONSTRAINT "Reserva_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
