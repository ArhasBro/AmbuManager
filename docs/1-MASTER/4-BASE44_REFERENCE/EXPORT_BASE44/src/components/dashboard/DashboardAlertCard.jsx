import React from "react";
import { cn } from "@/lib/utils";

export default function DashboardAlertCard({ icon: Icon, iconColor, title, items, emptyLabel }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={15} className={cn("flex-shrink-0", iconColor)} />
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
      {items && items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0", iconColor.replace("text-", "bg-"))} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      )}
    </div>
  );
}