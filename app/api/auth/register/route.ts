import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  AUTH_COOKIE_NAME,
  authCookieOptions,
  hashPassword,
  signSessionToken,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const correo = String(body.correo || "").trim().toLowerCase();
    const usuario = String(body.usuario || "").trim();
    const password = String(body.password || "").trim();
    const rolRaw = String(body.rol || "").trim().toUpperCase();

    if (!correo || !usuario || !password || !rolRaw) {
      return NextResponse.json(
        { ok: false, error: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    if (!correo.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "Correo inválido." },
        { status: 400 }
      );
    }

    const rol =
      rolRaw === "ADMIN" || rolRaw === "USUARIO" ? rolRaw : null;

    if (!rol) {
      return NextResponse.json(
        { ok: false, error: "Rol inválido. Usa ADMIN o USUARIO." },
        { status: 400 }
      );
    }

    const [correoExiste, usuarioExiste] = await Promise.all([
      prisma.usuario.findUnique({ where: { correo } }),
      prisma.usuario.findUnique({ where: { usuario } }),
    ]);

    if (correoExiste) {
      return NextResponse.json(
        { ok: false, error: "El correo ya está registrado." },
        { status: 409 }
      );
    }

    if (usuarioExiste) {
      return NextResponse.json(
        { ok: false, error: "El nombre de usuario ya está en uso." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        correo,
        usuario,
        hashedPassword,
        rol,
      },
      select: {
        id: true,
        correo: true,
        usuario: true,
        rol: true,
      },
    });

    const token = signSessionToken({
      userId: nuevoUsuario.id,
      rol: nuevoUsuario.rol,
    });

    const response = NextResponse.json(
      { ok: true, user: nuevoUsuario },
      { status: 201 }
    );

    response.cookies.set(AUTH_COOKIE_NAME, token, authCookieOptions);

    return response;
  } catch (error) {
    console.error("[POST /api/auth/register]", error);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
