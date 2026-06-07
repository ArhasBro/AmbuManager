import React from "react";
import { cn } from "@/lib/utils";

export default function KpiCard({ icon: Icon, iconBg, iconColor, label, value, sub, className }) {
  return (
    <div className={cn("bg-card border border-border rounded-xl p-4 flex items-center gap-3", className)}>
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", iconBg)}>
        {typeof Icon === "function" && Icon.length === 0
          ? <Icon />
          : Icon
            ? <Icon size={20} className={iconColor} />
            : null}
      </div>
      <div>
        <div className="text-xl font-bold text-foreground">{value}</div>
        <div className="text-xs font-medium text-foreground leading-tight">{label}</div>
        {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
      </div>
    </div>
  );
}