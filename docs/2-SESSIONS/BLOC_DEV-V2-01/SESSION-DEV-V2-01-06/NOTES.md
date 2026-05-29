# NOTES

Notes de travail de la session.

---

## Methode / observations

1. Variantes constatees avant correction

- Redirection `/login` sur pages privees en cas de permission refusee: `depots`, `vehicles`, `templates`, `users`, `company`, `audit`.
- Redirection `/dashboard` sur `onboarding` pour role non autorise.
- Message inline local dans `planning` via `ErrorMessage` avec formulation differente.

2. Pattern retenu

- Composant partage: `app/ui/access-denied-state.tsx`.
- Message harmonise par defaut: `Vous etes authentifie, mais vous n'avez pas les autorisations necessaires pour acceder a cette page.`
- Titre harmonise: `Acces refuse`.
- Comportement harmonise: rendu dans la page + lien `Retourner au dashboard`.

3. Portee exacte

- Session limitee a la correction frontend de l'etat acces refuse.
- Aucun changement RBAC backend/API.
- Aucune refonte UI globale.

## Correctif controle externe (FIX-01)

- Ecart corrige: le composant `app/ui/access-denied-state.tsx`, necessaire au build et utilise par le patch principal, est maintenant integre dans un patch correctif dedie.
- Patch correctif minimal produit: `PATCH/DEV-V2-01-06_FIX-01.diff`.
- Portee du correctif: creation du fichier `app/ui/access-denied-state.tsx` avec le composant `AccessDeniedState` et libelles harmonises.
