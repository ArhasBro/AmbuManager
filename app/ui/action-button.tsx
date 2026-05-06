import { type ButtonHTMLAttributes, type ReactNode } from "react";

export type ActionButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ActionButtonSize = "sm" | "md";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

const VARIANT_CLASS: Record<ActionButtonVariant, string> = {
  primary: "ui-action-button--primary",
  secondary: "ui-action-button--secondary",
  ghost: "ui-action-button--ghost",
  danger: "ui-action-button--danger",
};

const SIZE_CLASS: Record<ActionButtonSize, string> = {
  sm: "ui-action-button--sm",
  md: "ui-action-button--md",
};

export default function ActionButton({
  variant = "secondary",
  size = "md",
  type,
  className,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ActionButtonProps) {
  const classes = ["ui-action-button", VARIANT_CLASS[variant], SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type ?? "button"} className={classes} {...props}>
      {leadingIcon ? (
        <span className="ui-action-button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      <span className="ui-action-button__label">{children}</span>
      {trailingIcon ? (
        <span className="ui-action-button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </button>
  );
}
