# README_PATCH

## Session liée

`SESSION-20260316-07_A2_BASE-06`

## Type

`COMPLÉTION`

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-07_A2_BASE-06/`

## Patch d’origine

`BASE-06.diff`

## Patch documentaire complémentaire

`PATCH__SESSION-20260316-07_A2_BASE-06_DOCS-01.diff`

## Objet exact

Le patch d’origine `BASE-06.diff` porte le code métier UI de la session :
- ajout du lien dashboard vers `Bases / dépôts` ;
- ajout de la page serveur `app/depots/page.tsx` ;
- ajout du composant client `app/depots/depots-client.tsx` ;
- lecture bornée au tenant courant ;
- création, modification bornée `name` / `address` et archivage via les routes déjà validées.

Le patch documentaire complémentaire porte uniquement la finalisation de la traçabilité obligatoire dans le dépôt réel :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
- `README_PATCH.md`

## Périmètre exact retenu

`BASE-06` reste strictement limité à l’ajout de l’UI minimale de gestion des bases / dépôts, sans réouverture du code déjà validé lors de la finalisation documentaire.

## Fichiers code de la session `BASE-06`

- `app/dashboard/page.tsx`
- `app/depots/page.tsx`
- `app/depots/depots-client.tsx`

## Fichiers inclus dans le patch documentaire

- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-07_A2_BASE-06/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-07_A2_BASE-06/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-07_A2_BASE-06/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-07_A2_BASE-06/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-07_A2_BASE-06/FIN_SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-07_A2_BASE-06/README_PATCH.md`

## Éléments volontairement exclus du patch documentaire

- `app/dashboard/page.tsx`
- `app/depots/page.tsx`
- `app/depots/depots-client.tsx`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- toute suppression physique
- toute réactivation
- tout rattachement `Vehicle`, `User`, `Shift`, `DraftShift`, `ShiftTemplate`
- tout périmètre `BASE-07+`
- toute documentation master

## Résultats terminaux confirmés

- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Commandes d’application

### Patch code d’origine

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-07_A2_BASE-06/BASE-06.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-07_A2_BASE-06/BASE-06.diff"
```

### Patch documentaire complémentaire

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-07_A2_BASE-06/PATCH__SESSION-20260316-07_A2_BASE-06_DOCS-01.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-07_A2_BASE-06/PATCH__SESSION-20260316-07_A2_BASE-06_DOCS-01.diff"
```

## Statut final

- code `BASE-06` conservé et validé
- validations terminales réelles confirmées `OK`
- documentation obligatoire intégrée
- session clôturée proprement
