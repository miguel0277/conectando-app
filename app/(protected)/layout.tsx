import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  AUTH_COOKIE_NAME,
  getSessionUserFromToken,
} from "@/lib/auth";
import { AuthProvider } from "@/components/auth-provider";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;

  const user = await getSessionUserFromToken(token);

  if (!user) {
    redirect("/");
  }

  return <AuthProvider initialUser={user}>{children}</AuthProvider>;
}
