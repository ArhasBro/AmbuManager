# README_PATCH

## Session liée

`SESSION-20260316-06_A2_BASE-05`

## Type

`COMPLÉTION`

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/`

## Patch d’origine

`BASE-05.diff`

## Patch documentaire complémentaire

`PATCH__SESSION-20260316-06_A2_BASE-05_DOCS-01.diff`

## Objet exact

Le patch d’origine `BASE-05.diff` porte le code métier de la session :
- route `POST /api/depots/[id]/archive`
- service minimal d’archivage logique
- usage du champ existant `Depot.isActive`

Le patch documentaire complémentaire porte uniquement la finalisation de la traçabilité obligatoire dans le dépôt réel :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
- `README_PATCH.md`

## Périmètre exact retenu

`BASE-05` reste strictement limité à l’ajout de l’API d’archivage logique d’un dépôt existant, sans réouverture du code métier déjà validé lors de la correction documentaire.

## Fichiers code de la session `BASE-05`

- `app/api/depots/[id]/archive/route.ts`
- `lib/services/depots/archive-depot.ts`

## Fichiers inclus dans le patch documentaire

- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/FIN_SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/README_PATCH.md`

## Éléments volontairement exclus du patch documentaire

- `app/api/depots/[id]/archive/route.ts`
- `lib/services/depots/archive-depot.ts`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- toute UI bases/dépôts
- toute route de listing
- toute suppression physique
- toute réactivation
- tout rattachement `Vehicle`, `User`, `Shift`, `DraftShift`, `ShiftTemplate`
- tout périmètre `BASE-06+`
- toute documentation master

## Résultats terminaux confirmés

- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Commandes d’application

### Patch code d’origine

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/BASE-05.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/BASE-05.diff"
```

### Patch documentaire complémentaire

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/PATCH__SESSION-20260316-06_A2_BASE-05_DOCS-01.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/PATCH__SESSION-20260316-06_A2_BASE-05_DOCS-01.diff"
```

## Statut final

- code `BASE-05` conservé et validé
- validations terminales réelles confirmées `OK`
- documentation obligatoire intégrée
- session clôturée proprement
