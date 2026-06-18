import { LoaderCircle } from "lucide-react";
import { type ReactNode } from "react";

import EmptyState from "./empty-state";

type LoadingStateProps = {
  title?: string;
  message?: string;
  action?: ReactNode;
  className?: string;
};

export default function LoadingState({
  title = "Chargement en cours",
  message = "Veuillez patienter pendant le chargement.",
  action,
  className,
}: LoadingStateProps) {
  return (
    <div className={["ui-loading-state", className].filter(Boolean).join(" ")} role="status" aria-live="polite">
      <EmptyState
        className="ui-loading-state__content"
        icon={<LoaderCircle size={18} strokeWidth={2.2} aria-hidden="true" />}
        title={title}
        message={message}
        action={action}
      />
    </div>
  );
}
