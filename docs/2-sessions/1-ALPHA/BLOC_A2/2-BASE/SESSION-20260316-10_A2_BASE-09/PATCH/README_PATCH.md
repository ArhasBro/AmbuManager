# README_PATCH

## Session liée

`SESSION-20260316-10_A2_BASE-09`

## Type

`COMPLÉTION`

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-10_A2_BASE-09/`

## Fichiers patch de référence

### 1. Patch principal code
`BASE-09.diff`

Contenu :
- modélisation Prisma minimale du lien `Shift -> Depot` ;
- migration SQL dédiée ;
- adaptation minimale de `PATCH /api/planning/shifts/[id]/assign` ;
- adaptation minimale du service `assignShift` ;
- enrichissement minimal de `GET /api/planning/shifts` ;
- adaptation minimale de `/planning` pour afficher et modifier la base d’un shift publié.

### 2. Patch documentaire final
`PATCH__SESSION-20260316-10_A2_BASE-09_DOCS-01.diff`

Contenu :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
- `README_PATCH.md`

## Ordre correct d’application

1. appliquer `BASE-09.diff` ;
2. exécuter les validations terminales du patch code ;
3. appliquer `PATCH__SESSION-20260316-10_A2_BASE-09_DOCS-01.diff`.

## Commandes exactes d’application

### Patch principal code

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-10_A2_BASE-09/BASE-09.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-10_A2_BASE-09/BASE-09.diff"
```

### Validations terminales du patch code

```bash
npx prisma validate
npx prisma generate
npm run lint
npm run build
```

### Patch documentaire final

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-10_A2_BASE-09/PATCH__SESSION-20260316-10_A2_BASE-09_DOCS-01.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-10_A2_BASE-09/PATCH__SESSION-20260316-10_A2_BASE-09_DOCS-01.diff"
```

## Résultats des validations obtenues

- `git apply --check BASE-09.diff` : **OK**
- `git apply BASE-09.diff` : **OK**
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Périmètre exact retenu

`BASE-09` reste strictement limité au rattachement d’un shift publié à une base, sans ouverture vers :
- `BASE-10+` ;
- rattachement `DraftShift` ou `Template` ;
- refonte large du planning ;
- historique complexe d’affectation ;
- multi-base.

## Contrôle documentaire

Le patch documentaire final contient uniquement des fichiers `.md`.
Aucun fichier code n’est inclus dans `PATCH__SESSION-20260316-10_A2_BASE-09_DOCS-01.diff`.

## Statut final

- patch principal produit et validé ;
- documentation finale produite ;
- validations terminales obtenues ;
- clôture documentaire conforme.
