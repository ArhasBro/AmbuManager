# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2.png`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/globals.css`

## Patchs

- Patch principal : `PATCH/PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08.diff`
- Patch correctif : `PATCH/PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08_FIX-01.diff`

## Commandes exécutées (preuves)

### Vérification patch principal

```powershell
git worktree add --detach <tmp-main> HEAD
git -C <tmp-main> apply --check "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-08_A25_A25-PLAN-UI-08/PATCH/PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08.diff"
git worktree remove <tmp-main> --force
```

Résultat : `EXIT_CODE=0`

### Vérification FIX-01 (sur base HEAD + patch principal)

```powershell
git worktree add --detach <tmp-fix> HEAD
git -C <tmp-fix> apply "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-08_A25_A25-PLAN-UI-08/PATCH/PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08.diff"
git -C <tmp-fix> apply --check "docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-08_A25_A25-PLAN-UI-08/PATCH/PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08_FIX-01.diff"
git worktree remove <tmp-fix> --force
```

Résultat : `EXIT_CODE=0`

Preuve détaillée : `APPLY_CHECK_OUTPUT.txt`

### Validation terminale

```powershell
npm run lint
npm run build
```

Résultats :
- `npm run lint` → `EXIT_CODE=0`
- `npm run build` → `EXIT_CODE=0`

Sorties complètes :
- `LINT_OUTPUT.txt`
- `BUILD_OUTPUT.txt`

## Preuve encodage UTF-8 sans BOM

Contrôle réalisé sur les fichiers `.md` et `.txt` utiles de la session.  
Résultat : `BOM=False` pour chaque fichier contrôlé.