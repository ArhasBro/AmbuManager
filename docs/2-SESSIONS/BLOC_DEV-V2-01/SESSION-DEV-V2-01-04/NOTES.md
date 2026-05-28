# NOTES

Notes de travail de la session.

---

## Methode / observations

- Continuites relues: `PLAN_DE_DEVELOPPEMENT_V2.md`, `README_SESSIONS.md`, `TEMPLATE_SESSION.md`, session locale `DEV-V2-01-04`, et sessions bloc precedentes utiles (`DEV-V2-01-02`, `DEV-V2-01-03`).
- Configuration Tailwind reelle verifiee:
  - `package.json` contient `tailwindcss:^4` et `@tailwindcss/postcss:^4`.
  - `postcss.config.mjs` active `"@tailwindcss/postcss"`.
  - `app/globals.css` commence par `@import "tailwindcss"`.
- Aucune configuration `tailwind.config.*` trouvee dans le repo.
- Usage Tailwind constate:
  - 1 directive Tailwind v4 specifique: `@theme inline` (dans `app/globals.css`).
  - aucune directive `@utility`, `@apply`, `@layer`, `@custom-variant`.
  - aucun usage detecte des classes utilitaires Tailwind standard (`flex`, `grid`, `text-*`, `bg-*`, `p-*`, etc.) en `className` dans les fichiers TSX scannes.
- Strategie active en pratique: design system CSS semantique local (tokens `--ui-*` + classes `ui-*` et classes metier), pas utilitaire Tailwind-first.

## Tokens identifies (etat actuel)

Base/light + dark equivalents (dans `:root` et `:root[data-theme="dark"]`):
- Surface/layout: `--ui-bg`, `--ui-surface`, `--ui-surface-soft`, `--ui-surface-strong`.
- Texte: `--ui-text`, `--ui-text-muted`.
- Bordures/focus: `--ui-border`, `--ui-border-strong`, `--ui-focus`.
- Interaction: `--ui-link`, `--ui-primary`, `--ui-primary-contrast`.
- Etats: `--ui-success-*`, `--ui-warning-*`, `--ui-danger-*`.
- Selection/ombre: `--ui-selected-row`, `--ui-shadow`.

Mapping Tailwind v4 via `@theme inline`:
- `--color-background`, `--color-foreground`, `--font-sans`, `--font-mono`.

## Socle minimal de coherence UI (sans refonte)

1. Ne pas introduire de nouveau theme complet.
2. Reutiliser en priorite les composants partages `app/ui`:
- `PageHeader`, `ActionButton`, `StatusBadge`, `EmptyState`, `ErrorMessage`, `StatCard`, `FilterBar`, `DataTable`.
3. Pour les nouveaux ajustements UI du bloc:
- appui sur tokens `--ui-*` existants,
- classes semantiques existantes (`ui-*`, `app-shell*`, classes module),
- pas de duplication d un composant deja disponible dans `app/ui`.
4. Si un nouveau token est strictement necessaire:
- ajout minimal,
- nommage coherent `--ui-*`,
- declinaison light/dark simultanee,
- justification explicite dans la session de correction concernee.

## Limites a ne pas depasser dans les corrections suivantes

- Pas de migration massive vers classes utilitaires Tailwind.
- Pas de creation de `tailwind.config.*` sans besoin prouve sur un bloc correction.
- Pas de renommage global des classes CSS existantes.
- Pas de refonte graphique (palette, structure shell, look global).
- Pas de factorisation speculative hors composants deja identifies comme transverses.

## Points a confirmer

- INFORMATION NON FOURNIE — A CONFIRMER: decision humaine sur l opportunite future d introduire `tailwind.config.*` pour centraliser davantage de tokens (`--color-*`, spacing, radius) au dela du socle minimal actuel.
