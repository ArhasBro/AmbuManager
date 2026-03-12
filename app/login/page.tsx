"use client";

import { signIn, useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const DEFAULT_LOGIN_REDIRECT = "/dashboard";

function isSafeInternalPath(value: string | null): value is string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//");
}

function getSafeCallbackUrl(value: string | null): string {
  return isSafeInternalPath(value) ? value : DEFAULT_LOGIN_REDIRECT;
}

function getSafeRouterTarget(value: string | null, fallback: string): string {
  if (!value) return fallback;

  if (isSafeInternalPath(value)) {
    return value;
  }

  try {
    const parsed = new URL(value);

    if (typeof window !== "undefined" && parsed.origin === window.location.origin) {
      const candidate = `${parsed.pathname}${parsed.search}${parsed.hash}`;
      return isSafeInternalPath(candidate) ? candidate : fallback;
    }
  } catch {
    return fallback;
  }

  return fallback;
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Si déjà connecté -> go vers une destination interne sûre, sinon dashboard
  useEffect(() => {
    if (status === "authenticated") router.replace(callbackUrl);
  }, [status, router, callbackUrl]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (!res?.ok) {
      setError("Identifiants invalides.");
      return;
    }

    router.push(getSafeRouterTarget(res?.url ?? null, callbackUrl));
  }

  if (status === "loading") {
    return <div style={{ padding: 16 }}>Chargement...</div>;
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1>Connexion</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            style={{ width: "100%", padding: 10 }}
          />
        </label>

        <label>
          Mot de passe
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            style={{ width: "100%", padding: 10 }}
          />
        </label>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <button disabled={loading} type="submit" style={{ padding: 10 }}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>Chargement...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
