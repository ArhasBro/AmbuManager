import { Ban } from "lucide-react";
import { type ReactNode } from "react";

import EmptyState from "./empty-state";

type DisabledStateProps = {
  title?: string;
  message?: string;
  action?: ReactNode;
  className?: string;
};

export default function DisabledState({
  title = "Elément désactivé",
  message = "Cette zone n'est pas disponible dans l'état actuel.",
  action,
  className,
}: DisabledStateProps) {
  return (
    <div className={["ui-disabled-state", className].filter(Boolean).join(" ")}>
      <EmptyState
        className="ui-disabled-state__content"
        icon={<Ban size={18} strokeWidth={2.2} aria-hidden="true" />}
        title={title}
        message={message}
        action={action}
      />
    </div>
  );
}
