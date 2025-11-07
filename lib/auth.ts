import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

export const AUTH_COOKIE_NAME = "eventos_token";
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

export const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: AUTH_COOKIE_MAX_AGE,
};

type SessionPayload = {
  userId: string;
  rol: "ADMIN" | "USUARIO";
};

export type SessionUser = {
  id: string;
  correo: string;
  usuario: string;
  rol: "ADMIN" | "USUARIO";
};

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_SECRET no está definido. Configúralo en tu archivo .env"
    );
  }
  return secret;
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}

export function signSessionToken(payload: SessionPayload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifySessionToken(
  token: string
): SessionPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as SessionPayload;
  } catch (error) {
    console.error("Token inválido:", error);
    return null;
  }
}

export async function getSessionUserFromToken(
  token?: string | null
): Promise<SessionUser | null> {
  if (!token) {
    return null;
  }

  const payload = verifySessionToken(token);

  if (!payload) {
    return null;
  }

  const user = await prisma.usuario.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      correo: true,
      usuario: true,
      rol: true,
    },
  });

  return user ?? null;
}
