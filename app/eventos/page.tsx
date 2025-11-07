import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  AUTH_COOKIE_NAME,
  getSessionUserFromToken,
} from "@/lib/auth";
import EventsClient from "./events-client";

export default async function EventosPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = await getSessionUserFromToken(token);

  const eventos = await prisma.evento.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <EventsClient initialEventos={eventos} initialUser={user} />
  );
}
