# NOTES

## Methode de travail

- Lecture documentaire minimale obligatoire executee.
- Inspection du code reel onboarding et du socle UI A22 (`app/ui`, patterns dashboard/company/depots/templates).
- Production d'un patch principal unique UI-only.
- Application du patch via `git apply -p2`.
- Validation terminale executee (`npm.cmd run lint`, `npm.cmd run build`).
- Production d'un patch correctif minimal separé pour erreurs lint JSX.

## Harmonisations UI appliquees

- Adoption de `PageHeader`, `StatCard`, `StatusBadge`, `ActionButton`, `ErrorMessage` pour la coherence A22.
- Structuration de la page onboarding en cartes/panneaux de style socle (`panel`, `panel-soft`).
- Clarification visuelle des etapes onboarding (statut badge, hierarchie titre/description/action).
- Harmonisation des blocs import (formulaire, infos domaine, etats preview/erreur/resultat).
- Ajout CSS onboarding cible dans `app/globals.css` sans impact fonctionnel.

## Exclusions respectees

- Aucune modification Prisma/migrations/seed.
- Aucune modification API onboarding/import.
- Aucune modification RBAC/permissions/auth/multi-tenant.
- Aucune modification logique metier import/validation CSV-XLSX.
- Aucune modification shell/navigation globale hors ecran onboarding.
