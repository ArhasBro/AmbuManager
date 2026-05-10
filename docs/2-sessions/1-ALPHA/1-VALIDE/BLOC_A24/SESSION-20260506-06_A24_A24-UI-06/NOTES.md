# NOTES - SESSION-20260506-06_A24_A24-UI-06

## Sources reellement lues

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md` (sections Utilisateurs/RH + regles badges/drawer)
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-05_A24_A24-UI-05/SESSION.md`

## Perimetre traite

- page Utilisateurs (`/users`)
- liste utilisateurs
- filtres visibles (recherche, role, base, statut, stagiaire)
- creation utilisateur (presentation visuelle)
- edition utilisateur (presentation visuelle)
- fiche utilisateur panneau droit
- badges roles
- badges statuts
- coherence RH visible
- etats visuels
- actions principales/secondaires

## Exclusions respectees

- pas de RH avancee
- pas de paie/primes
- pas de saisie reelle des heures travaillees
- pas de refonte RBAC
- pas de role PSC1 reel
- pas de refonte planning
- pas d'autoschedule
- pas de matching

## Fichiers inspectes

- `app/layout.tsx`
- `app/globals.css`
- `app/a24-vehicles-templates.css`
- `app/users/page.tsx`
- `app/users/users-list-client.tsx`
- `app/users/users-side-panel-client.tsx`
- `app/users/users-client-shared.ts`
- `app/users/user-creation-client.tsx`
- `app/users/user-edit-client.tsx`
- `app/ui/action-button.tsx`
- `app/ui/data-table.tsx`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-05_A24_A24-UI-05/SESSION.md`

## Fichiers modifies (code)

- `app/layout.tsx`
- `app/users/page.tsx`
- `app/users/users-list-client.tsx`
- `app/users/users-side-panel-client.tsx`
- `app/a24-users-rh.css`

## Addendum QC

- Le fichier `app/a24-users-rh.css` existe localement (preuve terminale ajoutee dans `EVIDENCES.md`).
- Aucun patch correctif `_FIX-01.diff` requis.
