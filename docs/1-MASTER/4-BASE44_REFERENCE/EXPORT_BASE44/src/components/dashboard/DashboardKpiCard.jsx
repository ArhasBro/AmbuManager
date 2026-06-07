import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function DashboardKpiCard({ icon: Icon, iconBg, iconColor, label, value, sub, to }) {
  const card = (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3 h-full hover:bg-muted/20 transition-colors">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBg)}>
        <Icon size={20} className={iconColor} />
      </div>
      <div>
        <div className="text-2xl font-bold text-foreground leading-none">{value}</div>
        <div className="text-xs font-medium text-foreground mt-1.5">{label}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
  return to ? <Link to={to} className="block h-full">{card}</Link> : card;
}