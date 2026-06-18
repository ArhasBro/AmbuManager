import { type ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: ReactNode;
  title: string;
  description?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export default function PageHeader({ eyebrow, title, description, meta, actions, className }: PageHeaderProps) {
  const classes = ["ui-page-header", className].filter(Boolean).join(" ");

  return (
    <header className={classes}>
      {eyebrow ? <p className="ui-page-header__eyebrow">{eyebrow}</p> : null}
      <div className="ui-page-header__body">
        <h1 className="ui-page-header__title">{title}</h1>
        {description ? <p className="ui-page-header__description">{description}</p> : null}
        {meta ? <div className="ui-page-header__meta">{meta}</div> : null}
      </div>

      {actions ? <div className="ui-page-header__actions">{actions}</div> : null}
    </header>
  );
}
