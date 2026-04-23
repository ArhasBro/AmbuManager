# NOTES

Notes de travail de la session.

---

## Méthode / observations

Méthode :

- lecture des fichiers `.md` de `docs/1-master` ;
- inspection statique du code frontend réel ;
- aucun audit runtime ;
- aucun élargissement vers A14, A16, A19 ou A21 ;
- aucune correction frontend ;
- aucune complétion frontend ;
- aucun patch code.

Constats majeurs retenus :

1. Absence de shell global.
   - `app/layout.tsx` rend uniquement `Providers` et `children`.
   - La navigation reste portée page par page.

2. Thème light only.
   - `app/globals.css` force `color-scheme: light`.
   - Les variables globales observées restent limitées à `--background` / `--foreground`.

3. Styles inline dispersés.
   - Styles locaux observés dans `app/dashboard/page.tsx`, `app/users/users-list-client.tsx`, `app/vehicles/vehicles-client.tsx`, `app/templates/templates-client.tsx`, `app/planning/planning-client.tsx` et `app/planning/manual-planning-panel.tsx`.

4. Hétérogénéité visuelle inter-modules.
   - `vehicles` utilise une structure très simple avec `padding: 40`.
   - `users`, `templates`, `dashboard` et `planning` utilisent chacun leurs propres structures de sections, bordures, espacements et retours.

5. Planning trop massif et hybride.
   - `app/planning/planning-client.tsx` concentre une grande surface client.
   - Une zone `legacy / autoschedule` reste présente, masquée par état local.

Points à confirmer :

- Profondeur exacte du traitement dark mode : `INFORMATION NON FOURNIE — À CONFIRMER`
- Niveau exact attendu pour la séparation A15 / A21 : `INFORMATION NON FOURNIE — À CONFIRMER`
- Contenu définitif des indicateurs dashboard par rôle : `INFORMATION NON FOURNIE — À CONFIRMER`

