"use client";

import Link from "next/link";
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

const loginHighlights = [
  {
    title: "Planning intelligent",
    description: "Organisez vos equipes et vos interventions en toute clarte.",
  },
  {
    title: "Flotte optimisee",
    description: "Suivez vos vehicules et vos equipements sans perte d'information.",
  },
  {
    title: "Conformite et securite",
    description: "Donnees tracees et acces reserves aux utilisateurs autorises.",
  },
] as const;

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
    return <div className="login-loading">Chargement...</div>;
  }

  return (
    <main className="login-page">
      <section className="login-page__showcase" aria-label="Presentation de la plateforme">
        <div className="login-page__brand">
          <p className="login-page__brand-title">Ambulance Manager</p>
          <span className="login-page__brand-chip">ALPHA</span>
        </div>

        <div className="login-page__intro">
          <h1 className="login-page__intro-title">Simplifiez la gestion operationnelle de votre societe.</h1>
          <p className="login-page__intro-description">
            Un espace clair et fiable pour piloter equipes, planning et conformite depuis une seule interface.
          </p>
        </div>

        <ul className="login-page__highlights" aria-label="Points cles">
          {loginHighlights.map((item) => (
            <li key={item.title}>
              <p className="login-page__highlight-title">{item.title}</p>
              <p className="login-page__highlight-description">{item.description}</p>
            </li>
          ))}
        </ul>

        <p className="login-page__security-note">Acces reserve aux utilisateurs autorises.</p>
      </section>

      <section className="login-page__form-area" aria-label="Formulaire de connexion">
        <article className="login-card">
          <div className="login-card__icon" aria-hidden="true">
            AM
          </div>

          <h2 className="login-card__title">Connexion</h2>
          <p className="login-card__subtitle">Accedez a votre espace Ambulance Manager.</p>

          <form onSubmit={onSubmit} className="login-form">
            <label className="login-field">
              <span className="login-field__label">Adresse email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                placeholder="exemple@ambulances.fr"
              />
            </label>

            <label className="login-field">
              <span className="login-field__label">Mot de passe</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                required
                placeholder="Votre mot de passe"
              />
            </label>

            {error ? (
              <p className="login-error" role="alert">
                {error}
              </p>
            ) : null}

            <button disabled={loading} type="submit" className="login-submit">
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="login-card__privacy-note">
            Consultez les <Link href="/privacy">mentions d&apos;information</Link>.
          </p>
        </article>

        <p className="login-page__bottom-note">Application professionnelle de transport sanitaire</p>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="login-loading">Chargement...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}

