# 2 - PREUVES

## 1. Périmètre de cette reprise documentaire

- Session reprise : `CX_T2_CORRECTION-LIBELLES-RESIDUELS`
- Dossier de session conservé tel quel : `SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS`
- Objet de cette reprise : correction documentaire ciblée des réserves de contrôle
- Aucune nouvelle session créée
- Aucun fichier applicatif modifié pendant cette reprise documentaire
- Aucun changement sur le patch applicatif `.diff` existant

## 2. Fichiers relus pour la reprise documentaire

### Dossier de session

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/PATCH/README_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/PATCH/PATCH__SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS.diff`

### Références déjà utilisées par la session T2

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES/2-PREUVES.md`

### Fichiers applicatifs relus en lecture seule

- `app/dashboard/page.tsx`
- `app/depots/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/privacy/page.tsx`
- `app/templates/templates-client.tsx`
- `app/app-shell.tsx`

### `app/ui/` contrôlé en lecture seule

- `app/ui/access-denied-state.tsx`
- `app/ui/action-button.tsx`
- `app/ui/data-table.tsx`
- `app/ui/empty-state.tsx`
- `app/ui/error-message.tsx`
- `app/ui/filter-bar.tsx`
- `app/ui/index.ts`
- `app/ui/page-header.tsx`
- `app/ui/stat-card.tsx`
- `app/ui/status-badge.tsx`

Conclusion `app/ui/` :

- `app/ui/` a été contrôlé en lecture seule.
- Aucun fichier partagé de `app/ui/` n'a nécessité de modification pour cette correction de libellés visibles.

## 3. Fiches fonctionnelles utiles

- Aucune fiche fonctionnelle additionnelle n'a été nécessaire au-delà des références UI/UX et des sessions T2 déjà lues.
- Les arbitrages utiles proviennent des références UI/UX `Modèles horaires`, `Dépôts / Bases`, `Mise en route` et du cadrage T2.

## 4. Fichiers documentaires modifiés par cette reprise

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/PATCH/README_PATCH.md`

## 5. Fichiers applicatifs déjà modifiés par la session initiale

- `app/dashboard/page.tsx`
- `app/depots/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/privacy/page.tsx`
- `app/templates/templates-client.tsx`

## 6. Correction documentaire appliquée à `PATCH/README_PATCH.md`

- Le bloc cassé contenant le caractère de contrôle autour de `ash` a été supprimé.
- Le bloc de commande a été remplacé par un bloc Markdown valide de type `bash`.
- Aucune modification du fichier `.diff` applicatif n'a été faite.

Bloc attendu après correction :

```bash
git apply --check "PATCH__SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS.diff"
git apply "PATCH__SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS.diff"
```

## 7. Justification complémentaire pour `app/privacy/page.tsx`

- La correction dans `app/privacy/page.tsx` concerne uniquement un libellé visible de breadcrumb.
- L'harmonisation porte sur `Mention d'information` vers `Mentions d'information`.
- Aucune route `/privacy` n'a été modifiée.
- Aucun `href` n'a été modifié.
- Aucune URL n'a été modifiée.

## 8. Commandes exécutées pour la reprise documentaire

```powershell
git status --short
git diff --name-only
git ls-files --others --exclude-standard
npm run lint
npx eslint app/dashboard/page.tsx app/depots/page.tsx app/onboarding/onboarding-client.tsx app/privacy/page.tsx app/templates/templates-client.tsx
rg -n "Templates|Template|templates|Onboarding|onboarding|Depots|depots|Dépôts|Dépôt|Depot|Mise en route|Modèles horaires" app/ui app/app-shell.tsx
Get-ChildItem -Path app/ui -Recurse -File | Select-Object -ExpandProperty FullName
```

## 9. Sorties utiles des commandes

### `git status --short`

```text
 M app/dashboard/page.tsx
 M app/depots/page.tsx
 M app/onboarding/onboarding-client.tsx
 M app/privacy/page.tsx
 M app/templates/templates-client.tsx
?? docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/
```

### `git diff --name-only`

```text
app/dashboard/page.tsx
app/depots/page.tsx
app/onboarding/onboarding-client.tsx
app/privacy/page.tsx
app/templates/templates-client.tsx
```

### `git ls-files --others --exclude-standard`

```text
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/1-SESSION.md
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/2-PREUVES.md
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/3-FIN_DE_SESSION.md
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/PATCH/PATCH__SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS.diff
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/PATCH/README_PATCH.md
```

### `rg -n ... app/ui app/app-shell.tsx`

```text
app/app-shell.tsx:44:  "/templates": FileText,
app/app-shell.tsx:46:  "/depots": Landmark,
app/app-shell.tsx:47:  "/onboarding": GraduationCap,
```

Lecture de ce résultat :

- la recherche dans `app/ui/` n'a remonté aucun libellé résiduel à corriger ;
- seuls des segments techniques inchangés sont présents dans `app/app-shell.tsx` ;
- aucun besoin de modifier un composant partagé.

## 10. Preuve lint complétée

### `npm run lint` : extrait utile du second contrôle

```text
> ambulance-manager@0.1.0 lint
> eslint .

C:\Users\arche\ambulance-manager\app\planning\planning-client.tsx
  ... warnings @typescript-eslint/no-unused-vars ...

C:\Users\arche\ambulance-manager\docs\1-MASTER\4-BASE44_REFERENCE\EXPORT_BASE44\...
  ... erreurs et warnings ESLint hors périmètre ...

✖ 90 problems (48 errors, 42 warnings)
```

### Qualification explicite du résultat lint

- Le lint global reste rouge hors périmètre.
- Les fichiers responsables hors périmètre sont :
  - `app/planning/planning-client.tsx`
  - `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/**`
- Aucun des 5 fichiers modifiés par la session T2 n'apparaît dans la sortie du second `npm run lint`.

### Vérification ciblée des 5 fichiers modifiés par la session T2

Commande exécutée :

```powershell
npx eslint app/dashboard/page.tsx app/depots/page.tsx app/onboarding/onboarding-client.tsx app/privacy/page.tsx app/templates/templates-client.tsx
```

Résultat :

- sortie vide
- code de retour `0`

Conclusion :

- aucune erreur lint restante ne concerne les 5 fichiers modifiés par cette session

## 11. Contrôles de périmètre

- Aucune nouvelle session n'a été créée.
- Le dossier de session existant n'a pas été renommé.
- Aucun fichier applicatif n'a été modifié pendant cette reprise documentaire.
- Aucun fichier MASTER n'a été modifié.
- Aucun fichier de `docs/3-TEMPLATES` n'a été modifié.
- Aucun fichier Prisma n'a été modifié.
- Aucun fichier Base44 n'a été modifié.
- Aucun fichier `next.config.ts` n'a été modifié.
- Aucune route n'a été modifiée.
- Aucun `href` n'a été modifié.
- Aucune URL n'a été modifiée.
- Aucune redirection n'a été créée.
- Aucun alias technique n'a été créé.
- Aucun import n'a été modifié.
- Aucun dossier n'a été déplacé ou renommé.

## 12. Contrôle d'encodage

Les fichiers documentaires modifiés pour cette reprise ont été vérifiés en UTF-8 sans BOM :

```text
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/2-PREUVES.md    UTF8-BOM=False
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/3-FIN_DE_SESSION.md    UTF8-BOM=False
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/PATCH/README_PATCH.md    UTF8-BOM=False
```

## 13. Réserves de contrôle levées

- `README_PATCH.md` corrigé
- preuve du second `npm run lint` complétée
- précision explicite que le lint global reste rouge hors périmètre
- confirmation explicite qu'aucune erreur lint restante ne concerne les 5 fichiers modifiés par la session T2
- `app/ui/` clarifié en lecture seule
- fiches fonctionnelles clarifiées
- justification ajoutée pour `app/privacy/page.tsx` comme harmonisation de libellé visible uniquement
- confirmation qu'aucune modification applicative supplémentaire n'a été faite
