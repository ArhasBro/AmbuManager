# README_PATCH.md

Patch principal: `PATCH__SESSION-DOCS-REORG-01_DOCS.diff`
Patch correctif: `PATCH__SESSION-DOCS-REORG-01_FIX-01_DOCS.diff`
Perimetre: Documentation uniquement (`docs/`)

## Fichiers touches (correctif)
- Nettoyage complet de la racine `docs/` via `git mv`
- Mise a jour de:
  - `docs/README_DOCS.md`
  - `docs/README.md`
  - `docs/1-master/_INDEX_MASTER.md`
  - `docs/1-master/STRUCTURE_PROJET.md`
  - `SESSION-DOCS-REORG-01/EVIDENCES.md`
  - `SESSION-DOCS-REORG-01/RESULTATS.md`
  - `SESSION-DOCS-REORG-01/FIN_SESSION.md`
  - `SESSION-DOCS-REORG-01/PATCH/README_PATCH.md`

## Encodage des patchs
Les deux fichiers `.diff` sont fournis en UTF-8 sans BOM.

## Confirmation de nature du patch
Ce patch est strictement documentaire.
Aucun fichier applicatif n'est modifie (`app/`, `components/`, `lib/`, `prisma/`, `package.json`, `package-lock.json`, fichiers `.ts/.tsx/.js/.css`).

## Commandes de verification recommandees
- `git diff --check`
- `git status --short`
- `Get-ChildItem docs -Force`

## Exclusions
- Aucun changement applicatif
- Aucune suppression de fichier
- Aucun deplacement des fichiers maitres officiels
- Aucun deplacement de `docs/1-master/MAQUETTE/MAQUETTE_DA`
