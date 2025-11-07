import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  AUTH_COOKIE_NAME,
  getSessionUserFromToken,
} from "@/lib/auth";
import { AdminEventosClient } from "./admin-client";

export default async function AdministrarEventosPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = await getSessionUserFromToken(token);

  if (!user || user.rol !== "ADMIN") {
    redirect("/eventos");
  }

  return <AdminEventosClient />;
}
