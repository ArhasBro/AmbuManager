# NOTES

Notes de travail de la session.

---

## Methode / observations

- Contexte de continuite relu: DEV-V2-01-01, DEV-V2-01-01B, DEV-V2-01-02.
- Base technique constatee: `app/ui` expose deja `ActionButton`, `StatusBadge`, `DataTable`, `FilterBar`, `EmptyState`, `ErrorMessage`, `PageHeader`, `StatCard` via `app/ui/index.ts`.
- Shell et navigation constates dans `app/app-shell.tsx` et `app/layout.tsx`, avec labels legacy encore presents sur `Templates` et `Onboarding`.
- Decision de session: cadrage documentaire only, sans creation de design system complet et sans refactor global.

## Conventions d usage proposees

1. Nommage
- Fichier composant partage: `kebab-case.tsx` dans `app/ui`.
- Nom exporte: `PascalCase` unique par fichier.
- Prefixe CSS composant: `ui-<nom-composant>` avec variantes `--variant` et etats `is-*`.
- Types exportes: suffixes explicites (`Variant`, `Size`, `Column`).

2. Placement
- Composants transverses reutilisables: `app/ui/`.
- Barrel unique: `app/ui/index.ts` pour les exports publics.
- Composants strictement metier: restent dans le module metier, pas de promotion immediate dans `app/ui`.
- Une promotion vers `app/ui` ne se fait que si le composant est reutilise ou reutilisable sans logique metier cachee.

3. Regle d usage
- Consommer prioritairement les composants depuis `@/app/ui`.
- Eviter la duplication locale d un composant deja disponible dans `app/ui`.
- Si un besoin est partiellement couvert, etendre le composant existant si impact faible, sinon garder local et tracer.
