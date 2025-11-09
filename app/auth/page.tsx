import AuthClient from "./auth-client";

type AuthPageProps = {
  searchParams: Promise<{
    mode?: string;
    redirect?: string;
  }>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const resolvedParams = await searchParams;

  const modeParam =
    resolvedParams?.mode === "register" ? "register" : "login";
  const redirectRaw =
    typeof resolvedParams?.redirect === "string"
      ? decodeURIComponent(resolvedParams.redirect)
      : "";
  const redirectSafe =
    redirectRaw.startsWith("/") && !redirectRaw.startsWith("//")
      ? redirectRaw
      : "/eventos";

  return (
    <AuthClient initialMode={modeParam} redirectTo={redirectSafe} />
  );
}
