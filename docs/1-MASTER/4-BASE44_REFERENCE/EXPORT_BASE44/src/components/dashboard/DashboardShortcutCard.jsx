import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function DashboardShortcutCard({ icon: Icon, iconColor, iconBg, title, desc, to }) {
  return (
    <Link
      to={to}
      className="flex flex-col gap-2 p-3.5 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors h-full focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", iconBg)}>
        <Icon size={18} className={iconColor} />
      </div>
      <div className="text-sm font-semibold text-foreground leading-tight">{title}</div>
      <div className="text-xs text-muted-foreground leading-tight flex-1">{desc}</div>
      <span className="text-xs font-medium text-primary mt-1">Ouvrir →</span>
    </Link>
  );
}