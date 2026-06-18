import { type ReactNode } from "react";

type StatCardTone = "neutral" | "info" | "success" | "warning" | "danger";

type StatCardProps = {
  title: string;
  value: ReactNode;
  hint?: ReactNode;
  footer?: ReactNode;
  tone?: StatCardTone;
  icon?: ReactNode;
  className?: string;
};

const TONE_CLASS: Record<StatCardTone, string> = {
  neutral: "ui-stat-card--neutral",
  info: "ui-stat-card--info",
  success: "ui-stat-card--success",
  warning: "ui-stat-card--warning",
  danger: "ui-stat-card--danger",
};

export default function StatCard({
  title,
  value,
  hint,
  footer,
  tone = "neutral",
  icon,
  className,
}: StatCardProps) {
  const classes = ["ui-stat-card", TONE_CLASS[tone], className].filter(Boolean).join(" ");

  return (
    <article className={classes}>
      <div className="ui-stat-card__head">
        <p className="ui-stat-card__title">{title}</p>
        {icon ? (
          <span className="ui-stat-card__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
      </div>
      <strong className="ui-stat-card__value">{value}</strong>
      {hint ? <p className="ui-stat-card__hint">{hint}</p> : null}
      {footer ? <div className="ui-stat-card__footer">{footer}</div> : null}
    </article>
  );
}
