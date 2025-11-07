import AuthClient from "./auth-client";

type AuthPageProps = {
  searchParams?: {
    mode?: string;
    redirect?: string;
  };
};

export default function AuthPage({ searchParams }: AuthPageProps) {
  const modeParam = searchParams?.mode === "register" ? "register" : "login";
  const redirectRaw =
    typeof searchParams?.redirect === "string"
      ? decodeURIComponent(searchParams.redirect)
      : "";
  const redirectSafe =
    redirectRaw.startsWith("/") && !redirectRaw.startsWith("//")
      ? redirectRaw
      : "/eventos";

  return (
    <AuthClient initialMode={modeParam} redirectTo={redirectSafe} />
  );
}
