import { type ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  message: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export default function EmptyState({ title, message, icon, action, className }: EmptyStateProps) {
  const classes = ["ui-empty-state", className].filter(Boolean).join(" ");

  return (
    <section className={classes}>
      {icon ? (
        <div className="ui-empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <h2 className="ui-empty-state__title">{title}</h2>
      <p className="ui-empty-state__message">{message}</p>
      {action ? <div className="ui-empty-state__action">{action}</div> : null}
    </section>
  );
}
