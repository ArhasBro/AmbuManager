# 2 - Preuves

## 1. Fichiers lus

- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/3-FIN_DE_SESSION.md`
- `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md`
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/[id]/archive/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/vehicles/add-vehicle-form.tsx`

## 2. Fichiers utilises comme reference

- La session d'audit T4 pour la matrice RBAC vehicules.
- La session de cadrage T4 pour les decisions restantes.
- La fiche fonctionnelle vehicules pour la regle de creation Admin + Gerant.
- Le helper RBAC existant dans `lib/permissions.ts`.
- Les routes et pages vehicules deja presentes dans le repo officiel.

## 3. Fichiers crees

- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/PATCH/README_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/PATCH/PATCH__SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES.diff`

## 4. Fichiers modifies

- `lib/permissions.ts`
- `app/api/vehicles/route.ts`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`

## 5. Fichiers supprimes

- Aucun.

## 6. Fichiers deplaces ou renommes

- Aucun.

## 7. Dossiers explicitement non modifies

- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/[id]/archive/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `app/vehicles/add-vehicle-form.tsx`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `docs/1-MASTER/**`
- `prisma/**`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `app/api/vehicles/**` hors route create
- `app/vehicles/**` hors page et client principal
- `app/planning/**`
- `app/dashboard/**`
- `app/company/**`
- `app/users/**`
- components communs et navigation
- disponibilite avancee vehicule
- suivi vehicule

## 8. Commandes executees

- `git status --short`
- `Get-ChildItem -Force`
- `rg -n "DX_T4_AUDIT-MATRICE-RBAC|DX_T4_CADRAGE-PERMISSIONS-MANQUANTES|README_SESSIONS|TEMPLATE_SESSION_CODEX|session T4|BLOC_T4_RBAC_UI_API" docs create_session.ps1`
- `Get-ChildItem -Recurse -File docs | Select-Object -ExpandProperty FullName`
- `Get-Content -Raw -LiteralPath 'docs/2-SESSIONS/README_SESSIONS.md'`
- `Get-Content -Raw -LiteralPath 'docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md'`
- `Get-Content -TotalCount 260 -LiteralPath 'create_session.ps1'`
- `powershell -NoProfile -ExecutionPolicy Bypass -File .\create_session.ps1 -Stage 1-ALPHA -Block BLOC_T4_RBAC_UI_API -SessionCode CORRECTION-RBAC-VEHICULES -Type CX -Title "Correction RBAC vehicules"`
- `Get-ChildItem -Force 'docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES'`
- `rg -n "VEHICLE|VEHICULE|DEPOT|archive|archiv|create|edit|update|assign|affect|permission|RBAC|ROLES_PERMISSIONS_MANAGE|DEPOTS_MANAGE|VEHICLES_MANAGE|VEHICLES|DEPOTS" lib app/api app`
- `Get-Content -Raw -LiteralPath 'docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/1-SESSION.md'`
- `Get-Content -Raw -LiteralPath 'docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/1-SESSION.md'`
- `Get-Content -Raw -LiteralPath 'docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS/1-SESSION.md'`
- `Get-Content -Raw -LiteralPath 'lib/permission-catalog.ts'`
- `Get-Content -Raw -LiteralPath 'lib/permissions.ts'`
- `Get-Content -Raw -LiteralPath 'lib/rbac.ts'`
- `Get-Content -Raw -LiteralPath 'app/api/vehicles/route.ts'`
- `Get-Content -Raw -LiteralPath 'app/api/vehicles/[id]/route.ts'`
- `Get-Content -Raw -LiteralPath 'app/api/vehicles/[id]/archive/route.ts'`
- `Get-Content -Raw -LiteralPath 'app/vehicles/page.tsx'`
- `Get-Content -Raw -LiteralPath 'app/vehicles/vehicles-client.tsx'`
- `Get-Content -Raw -LiteralPath 'app/vehicles/add-vehicle-form.tsx'`
- `Get-Content -Raw -LiteralPath 'app/api/vehicles/[id]/depot/route.ts'`
- `rg -n -C 3 "canCreateVehicle|showCreateVehicleForm|openEditVehicle|handleSaveDepot|handleArchiveVehicle|Modifier|Archiver|Ajouter le vehicule|Enregistrer" 'app/vehicles/vehicles-client.tsx'`
- `rg -n -C 3 "canCreateVehicle|canManageVehicles|canEditPlanning|Vehicle|createVehicle|archiveVehicle|depot" 'app/vehicles/page.tsx' 'app/api/vehicles/route.ts' 'app/api/vehicles/[id]/route.ts' 'app/api/vehicles/[id]/archive/route.ts' 'app/api/vehicles/[id]/depot/route.ts'`
- `rg -n -C 4 "VEHICLES_MANAGE|DEPOTS_MANAGE|archive|affect|depot|vehicle" 'docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/2-PREUVES.md' 'docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/2-PREUVES.md'`
- `rg -n -C 4 "creation|creation|archiv|archive|depot|affectation|modifier" 'docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md'`
- `npx eslint lib/permissions.ts app/api/vehicles/route.ts app/vehicles/page.tsx app/vehicles/vehicles-client.tsx`
- `git diff -- lib/permissions.ts app/api/vehicles/route.ts app/vehicles/page.tsx app/vehicles/vehicles-client.tsx`
- `git diff --name-only`
- `git diff --ignore-space-at-eol --ignore-cr-at-eol --no-ext-diff --no-color --unified=3 -- lib/permissions.ts app/api/vehicles/route.ts app/vehicles/page.tsx app/vehicles/vehicles-client.tsx`
- `git apply --check "docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/PATCH/PATCH__SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES.diff"`
- `git apply --check --cached "docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/PATCH/PATCH__SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES.diff"`
- `git apply --check --cached --ignore-space-change --ignore-whitespace "docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/PATCH/PATCH__SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES.diff"`
- `git status --short -uall`
- `Get-ChildItem -Recurse -File 'docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES' | Select-Object -ExpandProperty FullName`

## 9. Resultats des commandes

- `git status --short` initial : sortie vide.
- La session officielle a ete creee avec `SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES`.
- Le listing du dossier de session montre `1-SESSION.md`, `2-PREUVES.md`, `3-FIN_DE_SESSION.md` et `PATCH/`.
- `lib/permissions.ts` expose maintenant un helper cible `canCreateVehicle`.
- `app/api/vehicles/route.ts` ne garde plus la creation vehicule sur `ADMIN` seul.
- `app/vehicles/page.tsx` passe la visibilite creation au meme garde-fou que le serveur.
- `app/vehicles/vehicles-client.tsx` affiche un libelle aligne sur `ADMIN` et `GERANT`.
- `app/api/vehicles/[id]/route.ts`, `app/api/vehicles/[id]/archive/route.ts` et `app/api/vehicles/[id]/depot/route.ts` restent les points serveur pour modification, archivage et affectation depot, avec le garde `canManageVehicles`.
- La fiche fonctionnelle vehicules confirme la creation autorisee pour `Admin` et `Gerant`.
- `npx eslint` sur les quatre fichiers TS/TSX modifies a passe sans sortie.
- Le patch officiel est stocke dans `PATCH/PATCH__SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES.diff`.
- Le patch a ete regenere avec une diff normalisee pour supprimer le bruit de fins de ligne.
- `git apply --check` strict sur le patch reste non representatif dans ce workspace.
- `git apply --check --cached --ignore-space-change --ignore-whitespace` sur le patch a passe.

## 10. Controles Git

### Git status initial

```text
<vide>
```

### Git status final

```text
 M app/api/vehicles/route.ts
 M app/vehicles/page.tsx
 M app/vehicles/vehicles-client.tsx
 M lib/permissions.ts
?? docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/
```

### Git status final detail

```text
 M app/api/vehicles/route.ts
 M app/vehicles/page.tsx
 M app/vehicles/vehicles-client.tsx
 M lib/permissions.ts
?? docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/1-SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/2-PREUVES.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/3-FIN_DE_SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/PATCH/PATCH__SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES.diff
?? docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/PATCH/README_PATCH.md
```

### Git diff name only sur les fichiers applicatifs

```text
app/api/vehicles/route.ts
app/vehicles/page.tsx
app/vehicles/vehicles-client.tsx
lib/permissions.ts
```

### Remarque

- Le `git apply --check` strict sur le workspace courant est trop sensible au contexte deja modifie et a la normalisation de fin de ligne. Le check utile pour le patch livre est passe avec `--cached --ignore-space-change --ignore-whitespace`.
- `git diff --name-only` ne liste que les fichiers suivis modifies; les fichiers de session et le patch apparaissent dans `git status --short -uall` parce qu'ils sont encore non suivis.

### Patch check brut

```text
error: patch failed: app/api/vehicles/route.ts:6
error: app/api/vehicles/route.ts: patch does not apply
error: patch failed: app/vehicles/page.tsx:3
error: app/vehicles/page.tsx: patch does not apply
error: patch failed: app/vehicles/vehicles-client.tsx:833
error: app/vehicles/vehicles-client.tsx: patch does not apply
error: patch failed: lib/permissions.ts:60
error: lib/permissions.ts: patch does not apply
```

## 11. Controles techniques

- Le serveur bloque maintenant la creation vehicule via une regle ciblee et partagee avec l'UI.
- Les autres actions vehicules deja presentes restent bornees par leurs routes existantes.
- Les permissions cataloguees n'ont pas ete elargies.
- Aucun changement Prisma, package ou configuration Next.

### Routes vehicules non modifiees

- `app/api/vehicles/[id]/route.ts:125` -> `if (!(await canManageVehicles(actorUserId, role, platformRole))) return forbidden();`
- `app/api/vehicles/[id]/archive/route.ts:35` -> `if (!(await canManageVehicles(actorUserId, role, platformRole))) return forbidden();`
- `app/api/vehicles/[id]/depot/route.ts:35` -> `if (!(await canManageVehicles(actorUserId, role, platformRole))) return forbidden();`

## 12. Controles d'encodage

- Les fichiers de session ont ete re-ecrits en ASCII propre pour eviter le mojibake initial.
- Le patch a ete regenere en UTF-8 sans BOM.
- Aucun outil d'encodage supplementaire n'a ete lance.

## 13. Controles de perimetre

- Aucun navigateur.
- Aucune capture.
- Aucun Playwright.
- Aucun `npm install`.
- Aucun `npm run dev`.
- Aucun Prisma.
- Aucune modification de `app/api/vehicles/[id]/route.ts`, `app/api/vehicles/[id]/archive/route.ts`, `app/api/vehicles/[id]/depot/route.ts`, `app/vehicles/add-vehicle-form.tsx`, `lib/permission-catalog.ts`, `lib/rbac.ts`, `prisma/**`, `package.json`, `package-lock.json` ou `next.config.ts`.
- Aucun lot transversal ouvert vers planning, dashboard, suivi vehicule, disponibilite avancee ou shell.

## 14. Limites / commandes non executees

- `npm run build` non execute : le correctif est tres cible et `npx eslint` a suffi pour la validation technique locale.
- Aucun test navigateur ou parcours web applique.
- Aucun audit global du repo.

## 15. Informations non fournies

- `INFORMATION NON FOURNIE - A CONFIRMER` : existence d'une autre surface de creation vehicule hors `app/vehicles/**` et `app/api/vehicles/**`.
- `INFORMATION NON FOURNIE - A CONFIRMER` : si une future session doit ouvrir la creation vehicule aux profils permission-driven au lieu des seuls roles natifs ADMIN/GERANT.
