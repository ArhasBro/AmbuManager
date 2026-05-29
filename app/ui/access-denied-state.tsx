import Link from "next/link";

import ErrorMessage from "./error-message";

type AccessDeniedStateProps = {
  message?: string;
};

const DEFAULT_MESSAGE = "Vous êtes connecté, mais vous ne disposez pas des permissions nécessaires pour accéder à cette page.";

export default function AccessDeniedState({ message = DEFAULT_MESSAGE }: AccessDeniedStateProps) {
  return (
    <ErrorMessage
      title="Accès refusé"
      message={message}
      details={(
        <Link href="/dashboard">
          Retour au tableau de bord
        </Link>
      )}
    />
  );
}
