import { type ReactNode } from "react";

type ErrorMessageProps = {
  message: string;
  title?: string;
  details?: ReactNode;
  className?: string;
};

export default function ErrorMessage({
  message,
  title = "Une erreur est survenue",
  details,
  className,
}: ErrorMessageProps) {
  const classes = ["ui-error-message", className].filter(Boolean).join(" ");

  return (
    <section className={classes} role="alert">
      <h2 className="ui-error-message__title">{title}</h2>
      <p className="ui-error-message__message">{message}</p>
      {details ? <div className="ui-error-message__details">{details}</div> : null}
    </section>
  );
}
