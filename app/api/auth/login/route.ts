import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  AUTH_COOKIE_NAME,
  authCookieOptions,
  signSessionToken,
  verifyPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identificador = String(body.identificador || "").trim();
    const password = String(body.password || "").trim();

    if (!identificador || !password) {
      return NextResponse.json(
        { ok: false, error: "Correo o usuario y contraseña son requeridos." },
        { status: 400 }
      );
    }

    const correo = identificador.includes("@")
      ? identificador.toLowerCase()
      : null;

    const usuario = correo ? undefined : identificador;

    const usuarioDb = await prisma.usuario.findFirst({
      where: correo
        ? { correo }
        : {
            usuario,
          },
    });

    if (!usuarioDb) {
      return NextResponse.json(
        { ok: false, error: "Credenciales inválidas." },
        { status: 401 }
      );
    }

    const passwordOk = await verifyPassword(
      password,
      usuarioDb.hashedPassword
    );

    if (!passwordOk) {
      return NextResponse.json(
        { ok: false, error: "Credenciales inválidas." },
        { status: 401 }
      );
    }

    const token = signSessionToken({
      userId: usuarioDb.id,
      rol: usuarioDb.rol,
    });

    const { hashedPassword, ...usuarioSeguro } = usuarioDb;

    const response = NextResponse.json(
      { ok: true, user: usuarioSeguro },
      { status: 200 }
    );

    response.cookies.set(AUTH_COOKIE_NAME, token, authCookieOptions);

    return response;
  } catch (error) {
    console.error("[POST /api/auth/login]", error);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
