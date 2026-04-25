import { type ReactNode } from "react";

export type StatusBadgeVariant = "neutral" | "info" | "success" | "warning" | "danger";

type StatusBadgeProps = {
  children: ReactNode;
  variant?: StatusBadgeVariant;
  className?: string;
};

const VARIANT_CLASS: Record<StatusBadgeVariant, string> = {
  neutral: "ui-status-badge--neutral",
  info: "ui-status-badge--info",
  success: "ui-status-badge--success",
  warning: "ui-status-badge--warning",
  danger: "ui-status-badge--danger",
};

export default function StatusBadge({ children, variant = "neutral", className }: StatusBadgeProps) {
  const classes = ["ui-status-badge", VARIANT_CLASS[variant], className].filter(Boolean).join(" ");

  return <span className={classes}>{children}</span>;
}
