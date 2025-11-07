import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  AUTH_COOKIE_NAME,
  getSessionUserFromToken,
} from "@/lib/auth";
import EventDetailClient from "./event-detail-client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventoDetallePage({
  params,
}: PageProps) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = await getSessionUserFromToken(token);

  if (!user) {
    const redirectTo = encodeURIComponent(`/eventos/${id}`);
    redirect(`/auth?mode=login&redirect=${redirectTo}`);
  }

  const evento = await prisma.evento.findUnique({
    where: { id },
  });

  if (!evento) {
    notFound();
  }

  return <EventDetailClient evento={evento} user={user} />;
}
