import { type ReactNode } from "react";

type FilterBarProps = {
  children: ReactNode;
  summary?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export default function FilterBar({ children, summary, actions, className }: FilterBarProps) {
  const classes = ["ui-filter-bar", className].filter(Boolean).join(" ");

  return (
    <section className={classes}>
      {summary || actions ? (
        <div className="ui-filter-bar__meta">
          <div className="ui-filter-bar__summary">{summary}</div>
          {actions ? <div className="ui-filter-bar__actions">{actions}</div> : null}
        </div>
      ) : null}
      <div className="ui-filter-bar__controls">{children}</div>
    </section>
  );
}
