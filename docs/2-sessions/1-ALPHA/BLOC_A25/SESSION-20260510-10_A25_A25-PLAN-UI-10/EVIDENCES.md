# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

- docs/1-master/DOCUMENT_MAITRE.md
- docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md
- docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2.png
- docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png
- app/planning/planning-client.tsx
- app/globals.css

## Preuves terminales

### Patch

- Patch produit : `docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-10_A25_A25-PLAN-UI-10/PATCH/PATCH__SESSION-20260510-10_A25_A25-PLAN-UI-10.diff`
- Début du patch vérifié : `diff --git`
- Encodage patch : UTF-8 sans BOM (`BOM: NO`)

### Preuve `git apply --check`

- Vérification directe sur arbre courant : échec attendu (patch déjà appliqué localement).
- Vérification réelle sur snapshot propre HEAD reconstruit en `.tmp_patch_check` :
  - commande : `git apply --check --directory ".tmp_patch_check" "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-10_A25_A25-PLAN-UI-10/PATCH/PATCH__SESSION-20260510-10_A25_A25-PLAN-UI-10.diff"`
  - sortie : `exit_code=0`

### `npm run lint`

Commande :

```powershell
npm run lint
```

Sortie complète :

```txt
> ambulance-manager@0.1.0 lint
> eslint .
```

Code retour : `0`

### `npm run build`

Commande :

```powershell
npm run build
```

Sortie complète :

```txt
> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 18.4s
  Running TypeScript ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/29) ...
  Generating static pages using 15 workers (7/29) 
  Generating static pages using 15 workers (14/29) 
  Generating static pages using 15 workers (21/29) 
✓ Generating static pages using 15 workers (29/29) in 1320.1ms
  Finalizing page optimization ...
```

Code retour : `0`