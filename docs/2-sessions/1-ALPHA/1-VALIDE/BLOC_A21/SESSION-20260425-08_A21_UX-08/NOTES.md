# NOTES

## Rappel de cadre

Session preparatoire uniquement.

Aucun codage UI/UX n'est lance dans cette session.

## Etat frontend observe (synthese)

### Layout / navigation

- Un composant global `app/app-shell.tsx` existe deja et est branche dans `app/layout.tsx`.
- Le shell actuel est un header horizontal (brand + nav + switch theme), pas une structure Sidebar gauche + Topbar conforme a la reference UX-06.
- La navigation shell actuelle expose : Dashboard, Planning, Utilisateurs, Vehicules, Templates, Societe, Depots.
- Les entrees Onboarding et Audit existent en pages, mais ne sont pas dans la navigation shell principale.

### Pages metier observees

- `/dashboard`
- `/planning`
- `/users`
- `/vehicles`
- `/templates`
- `/company`
- `/depots`
- `/onboarding`
- `/audit`
- `/login`
- `/privacy`

### Patterns UI existants

- Classes globales utiles : `page-wrap`, `page-head`, `panel`, `panel-soft`, `status-*`.
- Palette et tokens CSS globaux presents dans `app/globals.css`.
- Forte heterogeneite visuelle : usage massif de `style={{...}}` dans les pages/clients.
- Nombre d'occurrences `style={{...}}` releve : 613.
- Tables/filtres/formulaires existent mais sans composant partage unique.
- Aucun composant `DetailDrawer` detecte.

### Reutilisable immediat

- `AppShell` existant (base technique de depart).
- Tokens CSS de base (`--ui-*`) et classes de surface (`panel`, `status-*`).
- Mecanisme nav conditionnel par permissions dans `app/layout.tsx`.

### A creer dans futures sessions d'integration code (bloc A22)

- `Sidebar` et `Topbar` dedies.
- `PageHeader` partage.
- `ActionButton`, `StatusBadge`, `StatCard`.
- `DataTable` partage + `FilterBar`.
- `DetailDrawer` / panneau droit.
- `FormSection`, `EmptyState`, `ErrorMessage`, `DangerZone`.

## Suite methodologique clarifiee

- A21 reste un bloc documentaire UI/UX (maquettes, reference visuelle, preparation d'integration).
- La prochaine session attendue apres UX-08 est la cloture explicite du bloc A21.
- Les futures sessions de codage UI/UX ne doivent pas etre rattachees a A21.
- Elles doivent etre ouvertes dans un bloc distinct : BLOC_A22 - Integration code UI/UX.
