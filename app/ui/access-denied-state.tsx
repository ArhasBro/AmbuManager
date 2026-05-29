import Link from "next/link";

import ErrorMessage from "./error-message";

type AccessDeniedStateProps = {
  message?: string;
};

const DEFAULT_MESSAGE = "Vous etes authentifie, mais vous n'avez pas les autorisations necessaires pour acceder a cette page.";

export default function AccessDeniedState({ message = DEFAULT_MESSAGE }: AccessDeniedStateProps) {
  return (
    <ErrorMessage
      title="Acces refuse"
      message={message}
      details={(
        <Link href="/dashboard">
          Retourner au dashboard
        </Link>
      )}
    />
  );
}
