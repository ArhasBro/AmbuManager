import { type ReactNode } from "react";

type FilterBarProps = {
  children: ReactNode;
  summary?: ReactNode;
  actions?: ReactNode;
  busy?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function FilterBar({ children, summary, actions, busy = false, disabled = false, className }: FilterBarProps) {
  const classes = ["ui-filter-bar", className].filter(Boolean).join(" ");

  return (
    <section
      className={classes}
      aria-busy={busy || undefined}
      data-busy={busy || undefined}
      data-disabled={disabled || undefined}
    >
      {summary || actions ? (
        <div className="ui-filter-bar__meta">
          <div className="ui-filter-bar__summary">{summary}</div>
          {actions ? <div className="ui-filter-bar__actions">{actions}</div> : null}
        </div>
      ) : null}
      <fieldset
        className="ui-filter-bar__controls"
        disabled={disabled}
        style={{
          border: 0,
          margin: 0,
          minWidth: 0,
          padding: 0,
        }}
      >
        {children}
      </fieldset>
    </section>
  );
}
