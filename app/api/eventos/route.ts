import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  AUTH_COOKIE_NAME,
  getSessionUserFromToken,
} from "@/lib/auth";

export async function GET() {
  try {
    const eventos = await prisma.evento.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json(eventos);
  } catch (error) {
    console.error("[GET /api/eventos] Error:", error);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value ?? null;
    const usuario = await getSessionUserFromToken(token);

    if (!usuario || usuario.rol !== "ADMIN") {
      return NextResponse.json(
        { ok: false, error: "No autorizado." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const titulo = String(body.titulo || "").trim();
    const fecha = String(body.fecha || "").trim();
    const lugar = String(body.lugar || "").trim();
    const descripcionLarga = String(body.descripcionLarga || "").trim();
    const imagenPrincipal = String(body.imagenPrincipal || "").trim();
    const responsable = String(body.responsable || "").trim();
    const cupo = String(body.cupo || "").trim();

    if (
      !titulo ||
      !fecha ||
      !lugar ||
      !descripcionLarga ||
      !imagenPrincipal ||
      !responsable ||
      !cupo
    ) {
      return NextResponse.json(
        { ok: false, error: "Todos los campos marcados con * son obligatorios." },
        { status: 400 }
      );
    }

    const imagenes = Array.isArray(body.imagenesSecundarias)
      ? body.imagenesSecundarias
      : String(body.imagenesSecundarias || "")
          .split(/\r?\n|,/)
          .map((img: string) => img.trim())
          .filter(Boolean);

    const evento = await prisma.evento.create({
      data: {
        id: randomUUID(),
        titulo,
        fecha,
        lugar,
        descripcionLarga,
        imagenPrincipal,
        responsable,
        cupo,
        imagenesSecundarias: imagenes.join(","),
        creadoPorId: usuario.id,
      },
    });

    return NextResponse.json({ ok: true, evento }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/eventos] Error:", error);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
