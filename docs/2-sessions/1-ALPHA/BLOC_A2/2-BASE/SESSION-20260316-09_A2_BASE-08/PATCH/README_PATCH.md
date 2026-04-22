# README_PATCH

## Session liée

`SESSION-20260316-09_A2_BASE-08`

## Type

`COMPLÉTION`

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-09_A2_BASE-08/`

## Fichiers patch de référence

### 1. Patch principal code
`BASE-08.diff`

Contenu :
- modélisation Prisma minimale du lien `User -> Depot` ;
- migration SQL dédiée ;
- validation Zod dédiée ;
- service minimal d’affectation ;
- route dédiée `PATCH /api/users/[id]/depot` ;
- enrichissement minimal de `GET /api/users` ;
- adaptation minimale de `/users` pour afficher et modifier la base d’un utilisateur.

### 2. Patch documentaire final
`PATCH__SESSION-20260316-09_A2_BASE-08_DOCS-01.diff`

Contenu :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
- `README_PATCH.md`

## Commandes d’application

### Patch principal code

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-09_A2_BASE-08/BASE-08.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-09_A2_BASE-08/BASE-08.diff"
```

### Patch documentaire final

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-09_A2_BASE-08/PATCH__SESSION-20260316-09_A2_BASE-08_DOCS-01.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-09_A2_BASE-08/PATCH__SESSION-20260316-09_A2_BASE-08_DOCS-01.diff"
```

## Séquence réelle de validation

La séquence retenue pour la session est la suivante :
1. production du patch principal `BASE-08.diff` ;
2. validation du patch code ;
3. exécution des vérifications terminales ;
4. clôture documentaire finale sans réserve.

## Résultats des validations obtenues

- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Périmètre exact retenu

`BASE-08` reste strictement limité au rattachement d’un utilisateur à une base, sans ouverture vers :
- `BASE-09+` ;
- rattachement `Shift / DraftShift / Template` ;
- édition générique large d’utilisateur ;
- historique complexe d’affectation ;
- multi-base.

## Contrôle documentaire

Le patch documentaire final contient uniquement des fichiers `.md`.
Aucun fichier code n’est inclus dans `PATCH__SESSION-20260316-09_A2_BASE-08_DOCS-01.diff`.

## Statut final

- patch principal validé ;
- documentation finale produite ;
- validations terminales obtenues ;
- clôture documentaire sans réserve.
