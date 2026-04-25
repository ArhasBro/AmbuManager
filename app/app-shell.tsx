"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ReactNode, useMemo } from "react";

export type AppShellNavLink = {
  href: string;
  label: string;
};

export type AppShellContext = {
  companyLabel: string;
  userLabel: string;
  roleLabel: string;
  canLogout: boolean;
};

const PUBLIC_ROUTES = new Set(["/login", "/privacy"]);

function isPublicRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return PUBLIC_ROUTES.has(pathname);
}

export default function AppShell({
  children,
  navLinks,
  context,
}: {
  children: ReactNode;
  navLinks: readonly AppShellNavLink[];
  context: AppShellContext;
}) {
  const pathname = usePathname();

  const activePrefix = useMemo(() => {
    if (!pathname) return "";
    const match = navLinks.find((link) => pathname === link.href || pathname.startsWith(`${link.href}/`));
    return match?.href ?? "";
  }, [navLinks, pathname]);

  if (isPublicRoute(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar" aria-label="Navigation principale">
        <div className="app-shell__brand">
          <span className="app-shell__brand-title">Ambulance Manager</span>
          <span className="app-shell__chip">ALPHA</span>
        </div>

        <nav className="app-shell__nav" aria-label="Navigation des modules">
          {navLinks.length > 0 ? (
            navLinks.map((link) => {
              const isActive = activePrefix === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`app-shell__nav-link${isActive ? " is-active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })
          ) : (
            <p className="app-shell__sidebar-empty">Aucun module disponible.</p>
          )}
        </nav>

        <div className="app-shell__sidebar-footer">
          <span className="app-shell__sidebar-note">Espace connecte</span>
        </div>
      </aside>

      <section className="app-shell__content">
        <header className="app-shell__topbar">
          <div>
            <p className="app-shell__topbar-eyebrow">Societe courante</p>
            <p className="app-shell__topbar-title">{context.companyLabel}</p>
          </div>

          <div className="app-shell__topbar-meta">
            <div className="app-shell__meta-list">
              <span className="app-shell__meta-chip">
                <strong>Utilisateur</strong>
                <span>{context.userLabel}</span>
              </span>
              <span className="app-shell__meta-chip">
                <strong>Profil</strong>
                <span>{context.roleLabel}</span>
              </span>
            </div>

            {context.canLogout ? (
              <button
                type="button"
                className="app-shell__logout"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Deconnexion
              </button>
            ) : null}
          </div>
        </header>

        <main className="app-shell__main">{children}</main>
      </section>
    </div>
  );
}