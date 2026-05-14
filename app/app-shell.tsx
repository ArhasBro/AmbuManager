"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Ambulance,
  Building2,
  CalendarDays,
  ChevronDown,
  FileText,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  LogOut,
  MoonStar,
  ShieldCheck,
  SunMedium,
  type LucideIcon,
  UsersRound,
} from "lucide-react";
import { ReactNode, useEffect, useMemo, useState } from "react";

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

const PUBLIC_ROUTES = new Set(["/login"]);

const THEME_KEY = "ambulance-manager-theme";

const NAV_ICON_BY_ROUTE: Record<string, LucideIcon> = {
  "/dashboard": LayoutDashboard,
  "/planning": CalendarDays,
  "/users": UsersRound,
  "/vehicles": Ambulance,
  "/templates": FileText,
  "/company": Building2,
  "/depots": Landmark,
  "/onboarding": GraduationCap,
  "/audit": ShieldCheck,
};

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
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const activeHref = useMemo(() => {
    if (!pathname) return "";

    const matches = navLinks
      .filter((link) => pathname === link.href || pathname.startsWith(`${link.href}/`))
      .map((link) => link.href);

    if (matches.length === 0) return "";

    return matches.reduce((best, current) => (current.length > best.length ? current : best), matches[0]);
  }, [navLinks, pathname]);

  if (isPublicRoute(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar" aria-label="Navigation principale">
        <div className="app-shell__brand">
          <span className="app-shell__brand-mark" aria-hidden="true">
            <Ambulance size={18} strokeWidth={2.2} />
          </span>
          <div className="app-shell__brand-copy">
            <span className="app-shell__brand-title">Ambulance</span>
            <span className="app-shell__brand-title">Manager</span>
            <span className="app-shell__chip">ALPHA</span>
          </div>
        </div>

        <nav className="app-shell__nav" aria-label="Navigation des modules">
          {navLinks.length > 0 ? (
            navLinks.map((link) => {
              const isActive = activeHref === link.href;
              const NavIcon = NAV_ICON_BY_ROUTE[link.href] ?? Ambulance;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`app-shell__nav-link${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="app-shell__nav-icon" aria-hidden="true">
                    <NavIcon size={16} strokeWidth={2.2} />
                  </span>
                  <span>{link.label}</span>
                </Link>
              );
            })
          ) : (
            <p className="app-shell__sidebar-empty">Aucun module disponible.</p>
          )}
        </nav>

        <div className="app-shell__sidebar-footer">
          <button
            type="button"
            className="app-shell__sidebar-theme"
            onClick={() => setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))}
            aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
          >
            <span className="app-shell__sidebar-theme-label">Thème</span>
            <span className="app-shell__sidebar-theme-icons" aria-hidden="true">
              <SunMedium size={14} />
              <span className={`app-shell__sidebar-theme-track${theme === "dark" ? " is-dark" : ""}`} />
              <MoonStar size={14} />
            </span>
          </button>
          <div className="app-shell__user-card" aria-label="Profil utilisateur">
            <span className="app-shell__user-avatar" aria-hidden="true">
              {context.userLabel.trim().charAt(0).toUpperCase()}
            </span>
            <strong className="app-shell__user-name">{context.userLabel}</strong>
            <span className="app-shell__user-role">{context.roleLabel}</span>
            <ChevronDown size={14} className="app-shell__user-chevron" aria-hidden="true" />
          </div>
        </div>
      </aside>

      <section className="app-shell__content">
        <header className="app-shell__topbar">
          <div className="app-shell__topbar-meta">
            <button type="button" className="app-shell__company-selector" aria-label="Société courante">
              <span className="app-shell__company-icon" aria-hidden="true">
                <Building2 size={15} />
              </span>
              <span className="app-shell__company-text">{context.companyLabel}</span>
              <ChevronDown size={14} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="app-shell__theme-toggle"
              onClick={() => setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))}
              aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
            >
              {theme === "light" ? <MoonStar size={16} /> : <SunMedium size={16} />}
            </button>

            <div className="app-shell__topbar-user" aria-label="Utilisateur connecté">
              <span className="app-shell__topbar-avatar" aria-hidden="true">
                {context.userLabel.trim().charAt(0).toUpperCase()}
              </span>
              <span className="app-shell__topbar-user-copy">
                <span>{context.userLabel}</span>
                <small>{context.roleLabel}</small>
              </span>
              <ChevronDown size={14} aria-hidden="true" />
            </div>

            {context.canLogout ? (
              <button
                type="button"
                className="app-shell__logout"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut size={16} aria-hidden="true" />
                Déconnexion
              </button>
            ) : null}
          </div>
        </header>

        <main className="app-shell__main">{children}</main>
      </section>
    </div>
  );
}
