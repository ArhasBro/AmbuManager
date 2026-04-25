import { type ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export default function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  const classes = ["ui-page-header", className].filter(Boolean).join(" ");

  return (
    <header className={classes}>
      <div className="ui-page-header__body">
        <h1 className="ui-page-header__title">{title}</h1>
        {description ? <p className="ui-page-header__description">{description}</p> : null}
      </div>

      {actions ? <div className="ui-page-header__actions">{actions}</div> : null}
    </header>
  );
}
