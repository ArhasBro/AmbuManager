"use client";

import {
  AlertTriangle,
  Ambulance,
  CalendarDays,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
    description: "Organisez vos équipes et vos interventions",
    Icon: CalendarDays,
  },
  {
    title: "Flotte optimisée",
    description: "Suivez vos véhicules et équipements",
    Icon: Ambulance,
  },
  {
    title: "Équipes connectées",
    description: "Gérez vos utilisateurs et compétences",
    Icon: UsersRound,
  },
  {
    title: "Conformité & sécurité",
    description: "Données sécurisées et tracées",
    Icon: ShieldCheck,
  },
] as const;

function LoginPageContent() {
  const searchParams = useSearchParams();
  const { status } = useSession();

  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    // Force un rechargement serveur pour obtenir un shell coherent apres login.
    window.location.replace(callbackUrl);
  }, [status, callbackUrl]);

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
      setError("L'adresse email ou le mot de passe est incorrect.");
      return;
    }

    const target = getSafeRouterTarget(res?.url ?? null, callbackUrl);
    window.location.replace(target);
  }

  return (
    <main className="login-page">
      <section className="login-page__showcase" aria-label="Présentation de la plateforme">
        <div className="login-page__brand">
          <span className="login-page__brand-icon" aria-hidden="true">
            <Ambulance size={44} strokeWidth={2.1} />
          </span>
          <p className="login-page__brand-title">
            <span>Ambulance</span> <span>Manager</span>
          </p>
          <span className="login-page__brand-chip">ALPHA</span>
        </div>

        <div className="login-page__intro">
          <h1 className="login-page__intro-title">
            Simplifiez la gestion
            <br />
            opérationnelle de votre
            <br />
            société de transport
            <br />
            sanitaire.
          </h1>
          <span className="login-page__intro-rule" aria-hidden="true" />
        </div>

        <ul className="login-page__highlights" aria-label="Points clés">
          {loginHighlights.map((item) => (
            <li key={item.title}>
              <span className="login-page__highlight-icon" aria-hidden="true">
                <item.Icon size={24} strokeWidth={2.05} />
              </span>
              <div>
                <p className="login-page__highlight-title">{item.title}</p>
                <p className="login-page__highlight-description">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="login-page__security-note">
          <span className="login-page__security-icon" aria-hidden="true">
            <LockKeyhole size={20} strokeWidth={2.2} />
          </span>
          <div>
            <p className="login-page__security-title">Accès réservé aux utilisateurs autorisés</p>
            <p className="login-page__security-description">
              Vos données sont hébergées en France
              <br />
              et protégées conformément au RGPD.
            </p>
          </div>
        </div>
      </section>

      <section className="login-page__form-area" aria-label="Formulaire de connexion">
        <article className="login-card">
          <div className="login-card__icon" aria-hidden="true">
            <Ambulance size={56} strokeWidth={2.1} />
          </div>

          <h2 className="login-card__title">Connexion</h2>
          <p className="login-card__subtitle">Accédez à votre espace Ambulance Manager</p>
          <span className="login-card__divider" aria-hidden="true" />

          <form onSubmit={onSubmit} className="login-form">
            <label className="login-field">
              <span className="login-field__label">Adresse email</span>
              <span className="login-field__control">
                <Mail size={17} strokeWidth={2.1} aria-hidden="true" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="exemple@ambulances.fr"
                />
              </span>
            </label>

            <label className="login-field">
              <span className="login-field__label">Mot de passe</span>
              <span className="login-field__control">
                <LockKeyhole size={17} strokeWidth={2.1} aria-hidden="true" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Votre mot de passe"
                />
                <button
                  type="button"
                  className="login-field__toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff size={17} strokeWidth={2.1} /> : <Eye size={17} strokeWidth={2.1} />}
                </button>
              </span>
            </label>

            <label className="login-checkbox">
              <input type="checkbox" defaultChecked />
              <span className="login-checkbox__mark" aria-hidden="true">
                <Check size={13} strokeWidth={2.6} />
              </span>
              <span className="login-checkbox__label">Se souvenir de moi</span>
            </label>

            <button disabled={loading} type="submit" className="login-submit">
              <LockKeyhole size={17} strokeWidth={2.2} aria-hidden="true" />
              {loading ? "Connexion..." : "Connexion"}
            </button>

            {error ? (
              <p className="login-error" role="alert">
                <span className="login-error__icon" aria-hidden="true">
                  <AlertTriangle size={18} strokeWidth={2.2} />
                </span>
                <span className="login-error__copy">
                  <span className="login-error__title">Identifiants invalides</span>
                  <span className="login-error__description">{error}</span>
                </span>
              </p>
            ) : null}
          </form>

          <span className="login-card__divider" aria-hidden="true" />
          <p className="login-card__privacy-note">
            En vous connectant, vous acceptez les
            <br />
            <Link href="/privacy">Mentions d&apos;information</Link>
          </p>
        </article>

        <div className="login-page__bottom-note" role="note" aria-label="Conformité et hébergement">
          <span className="login-page__badge-fr" aria-hidden="true" />
          <span>Hébergé en France</span>
          <span className="login-page__badge-divider" aria-hidden="true" />
          <ShieldCheck size={16} strokeWidth={2.2} aria-hidden="true" />
          <span>Conforme RGPD</span>
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}

