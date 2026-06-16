import Link from "next/link";
import { ShieldAlert } from "lucide-react";

import ErrorMessage from "./error-message";

type AccessDeniedStateProps = {
  message?: string;
};

const DEFAULT_MESSAGE = "Vous êtes connecté, mais vous ne disposez pas des permissions nécessaires pour accéder à cette page.";

export default function AccessDeniedState({ message = DEFAULT_MESSAGE }: AccessDeniedStateProps) {
  return (
    <ErrorMessage
      className="ui-error-message--access-denied"
      icon={<ShieldAlert size={18} strokeWidth={2.2} />}
      title="Accès refusé"
      message={message}
      details={(
        <Link href="/dashboard" className="ui-error-message__link">
          Retour au tableau de bord
        </Link>
      )}
    />
  );
}
