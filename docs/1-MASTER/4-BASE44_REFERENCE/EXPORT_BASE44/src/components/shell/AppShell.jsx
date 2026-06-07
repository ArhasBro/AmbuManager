import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import {
  LayoutDashboard, CalendarDays, Users, Truck, ClipboardCheck,
  Clock, Building2, MapPin, Rocket, Shield, LogOut,
  Menu, X, SunMedium, MoonStar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AccessDeniedState from "@/components/shell/AccessDeniedState";
import { roleLabel, getCurrentBusinessRole } from "@/lib/userPermissions";

// roles: identifiants techniques (sans accent). undefined = visible par tous.
const NAV_ITEMS = [
  { path: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { path: "/planning", label: "Planning", icon: CalendarDays, roles: ["ADMIN", "GERANT", "BUREAU", "REGULATEUR"] },
  { path: "/utilisateurs", label: "Utilisateurs / RH", icon: Users, roles: ["ADMIN", "GERANT", "BUREAU"] },
  { path: "/vehicules", label: "Véhicules", icon: Truck },
  { path: "/suivi-vehicules", label: "Suivi des véhicules", icon: ClipboardCheck },
  { path: "/modeles-horaires", label: "Modèles horaires", icon: Clock, roles: ["ADMIN", "GERANT", "BUREAU"] },
  { path: "/societe", label: "Société", icon: Building2, roles: ["ADMIN", "GERANT"] },
  { path: "/depots", label: "Dépôts / Bases", icon: MapPin, roles: ["ADMIN", "GERANT", "BUREAU"] },
  { path: "/mise-en-route", label: "Mise en route", icon: Rocket, roles: ["ADMIN", "GERANT"] },
  { path: "/audit", label: "Audit", icon: Shield, roles: ["ADMIN"] },
];

const THEME_KEY = "ambulance-manager-theme";

const getInitials = (name) => {
  if (!name) return "U";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
};

export default function AppShell() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { data: company } = useQuery({
    queryKey: ["company", user?.company_id],
    queryFn: () => user?.company_id ? base44.entities.Company.get(user.company_id) : Promise.resolve(null),
    enabled: !!user?.company_id,
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Rôle métier : source unique, pas de fallback automatique Admin.
  // Un utilisateur sans business_role valide obtiendra null → accès limité.
  const userBusinessRole = getCurrentBusinessRole(user);

  const filteredNavItems = NAV_ITEMS.filter(
    (item) => !item.roles || (userBusinessRole && item.roles.includes(userBusinessRole))
  );

  // Vérification de la permission de la route actuelle (accès direct par URL)
  const currentNavItem = NAV_ITEMS.find((n) =>
    n.path === "/" ? location.pathname === "/" : location.pathname.startsWith(n.path)
  );
  const hasAccessToCurrentRoute =
    !currentNavItem || !currentNavItem.roles ||
    (userBusinessRole != null && currentNavItem.roles.includes(userBusinessRole));

  return (
    <div className="flex h-screen bg-background overflow-hidden font-body">
      {/* Sidebar gauche rétractable */}
      <aside className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border flex-shrink-0 transition-all duration-200",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        {/* Identité / Logo de la marque + Toggle */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-sidebar-border min-h-[70px]">
          <div className={cn("flex items-center gap-2.5 flex-1 min-w-0", sidebarCollapsed && "justify-center")}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Truck size={18} className="text-primary-foreground" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground leading-none tracking-tight">Ambulance</span>
                  <span className="text-[10px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded leading-none">ALPHA</span>
                </div>
                <span className="text-xs font-semibold text-primary leading-tight mt-0.5">Manager</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-lg hover:bg-sidebar-accent text-muted-foreground hover:text-foreground transition-colors ml-2 flex-shrink-0"
            title={sidebarCollapsed ? "Déployer" : "Rétracter"}
          >
            {sidebarCollapsed ? <Menu size={16} /> : <X size={16} />}
          </button>
        </div>

        {/* Navigation principale */}
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto px-2">
          {filteredNavItems.map(({ path, label, icon: Icon }) => {
            const active = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                title={sidebarCollapsed ? label : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  sidebarCollapsed && "justify-center",
                  active
                    ? "bg-sidebar-accent text-primary font-medium"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                )}
              >
                <Icon size={16} className={cn("flex-shrink-0", active ? "text-primary" : "text-muted-foreground")} />
                {!sidebarCollapsed && <span className="truncate">{label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Colonne droite de contenu */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar horizontale */}
        <header className="flex items-center justify-between px-6 border-b border-border bg-card flex-shrink-0 h-16">
          {/* Contexte Société */}
          <div className="flex items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/40 text-xs font-medium text-foreground">
              <Building2 size={14} className="text-primary" />
              <span>{company?.name || "Société non renseignée"}</span>
            </div>
          </div>

          {/* Contrôles de session et déconnexion */}
          <div className="flex items-center gap-4">
            {/* Profil topbar compact */}
            <div className="flex items-center gap-2 border-l border-border pl-4">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-bold text-white">{getInitials(user?.full_name)}</span>
              </div>
              <div className="flex-col text-left hidden sm:flex">
                <span className="text-xs font-semibold text-foreground leading-tight">
                  {user?.full_name || "Utilisateur"}
                </span>
                <span className="text-[10px] text-muted-foreground capitalize leading-none">{roleLabel(userBusinessRole)}</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => logout(true)}
              className="gap-1.5 text-muted-foreground hover:text-destructive h-8 px-2.5 transition-colors"
              title="Se déconnecter"
            >
              <LogOut size={14} />
              <span className="text-xs font-medium">Déconnexion</span>
            </Button>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto bg-muted/10">
          {hasAccessToCurrentRoute ? <Outlet /> : <AccessDeniedState />}
        </main>
      </div>
    </div>
  );
}