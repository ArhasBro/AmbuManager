import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function DashboardWidgetCard({ icon: Icon, iconColor, title, children, actionLabel, to }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2.5">
        {Icon && (
          <Icon size={15} className={cn("flex-shrink-0", iconColor || "text-muted-foreground")} />
        )}
        <span className="text-xs font-semibold text-foreground">{title}</span>
      </div>
      <div className="flex-1 text-sm text-foreground">{children}</div>
      {actionLabel && to && (
        <Button asChild variant="outline" size="sm" className="mt-3 h-7 text-xs justify-between w-full">
          <Link to={to}>
            {actionLabel}
            <ArrowRight size={12} />
          </Link>
        </Button>
      )}
    </div>
  );
}