"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";

type ThemeMode = "system" | "light" | "dark";
export type AppShellNavLink = {
  href: string;
  label: string;
};

const THEME_STORAGE_KEY = "ambulance-manager-theme";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;

  if (mode === "system") {
    root.removeAttribute("data-theme");
    return;
  }

  root.setAttribute("data-theme", mode);
}

function getSavedThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "system";

  const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (raw === "light" || raw === "dark" || raw === "system") {
    return raw;
  }

  return "system";
}

function getThemeLabel(mode: ThemeMode): string {
  if (mode === "light") return "Clair";
  if (mode === "dark") return "Sombre";
  return "Auto";
}

export default function AppShell({
  children,
  navLinks,
}: {
  children: ReactNode;
  navLinks: readonly AppShellNavLink[];
}) {
  const pathname = usePathname();
  const [themeMode, setThemeMode] = useState<ThemeMode>(getSavedThemeMode);

  useEffect(() => {
    applyTheme(themeMode);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    }
  }, [themeMode]);

  const isLoginScreen = pathname === "/login";

  const activePrefix = useMemo(() => {
    if (!pathname) return "";
    const match = navLinks.find((link) => pathname === link.href || pathname.startsWith(`${link.href}/`));
    return match?.href ?? "";
  }, [navLinks, pathname]);

  if (isLoginScreen) {
    return <>{children}</>;
  }

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__brand">
          <span className="app-shell__brand-title">Ambulance Manager</span>
          <span className="app-shell__chip">ALPHA</span>
        </div>

        <nav className="app-shell__nav" aria-label="Navigation principale">
          {navLinks.map((link) => {
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
          })}
        </nav>

        <div className="app-shell__actions">
          <span className="app-shell__actions-label">Theme</span>
          <div className="app-shell__theme-switch" role="group" aria-label="Mode de theme">
            {(["system", "light", "dark"] as ThemeMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                className={`app-shell__theme-button${themeMode === mode ? " is-active" : ""}`}
                onClick={() => setThemeMode(mode)}
                aria-label={`Passer le theme en mode ${getThemeLabel(mode)}`}
              >
                {getThemeLabel(mode)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="app-shell__main">{children}</main>
    </div>
  );
}
