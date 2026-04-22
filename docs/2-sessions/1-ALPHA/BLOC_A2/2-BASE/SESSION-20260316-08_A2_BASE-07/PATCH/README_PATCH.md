# README_PATCH

## Session liée

`SESSION-20260316-08_A2_BASE-07`

## Type de clôture

`DOCUMENTATION`

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-08_A2_BASE-07/`

## Fichiers patch de référence

### 1. Patch principal code
`BASE-07.diff`

Contenu :
- modélisation Prisma minimale du lien `Vehicle -> Depot` ;
- migration SQL dédiée ;
- validation Zod dédiée ;
- service minimal d’affectation ;
- route dédiée `PATCH /api/vehicles/[id]/depot` ;
- adaptation minimale de `/vehicles` pour afficher et modifier la base d’un véhicule.

### 2. Patch correctif minimal postérieur
`PATCH__SESSION-20260316-08_A2_BASE-07_FIX-01.diff`

Contenu :
- correction strictement ciblée du blocage TypeScript dans `app/vehicles/vehicles-client.tsx` ;
- explicitation du guard nullable sur `v.depot` ;
- aucun changement fonctionnel ;
- aucun élargissement de périmètre.

### 3. Patch documentaire final
`PATCH__SESSION-20260316-08_A2_BASE-07_DOCS-01.diff`

Contenu :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
- `README_PATCH.md`

## Séquence de validation réelle

La séquence validée pour BASE-07 est la suivante :
1. application du patch principal ;
2. détection d’un blocage build TypeScript ;
3. application du fix minimal séparé ;
4. validation finale complète réussie ;
5. clôture documentaire finale.

## Résultats des validations finales

Après application de `BASE-07.diff` puis `PATCH__SESSION-20260316-08_A2_BASE-07_FIX-01.diff` :
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Périmètre exact retenu

`BASE-07` reste strictement limité au rattachement d’un véhicule à une base, sans ouverture vers :
- `BASE-08+` ;
- rattachement `User`, `Shift`, `Template` ;
- édition générique large de véhicule ;
- historique complexe d’affectation ;
- multi-base.

## Commandes d’application

### Patch principal code

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-08_A2_BASE-07/BASE-07.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-08_A2_BASE-07/BASE-07.diff"
```

### Patch correctif minimal

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-08_A2_BASE-07/PATCH__SESSION-20260316-08_A2_BASE-07_FIX-01.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-08_A2_BASE-07/PATCH__SESSION-20260316-08_A2_BASE-07_FIX-01.diff"
```

### Patch documentaire final

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-08_A2_BASE-07/PATCH__SESSION-20260316-08_A2_BASE-07_DOCS-01.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-08_A2_BASE-07/PATCH__SESSION-20260316-08_A2_BASE-07_DOCS-01.diff"
```

## Contrôle documentaire

Le patch documentaire final doit contenir uniquement des fichiers `.md`.
Aucun fichier code ne doit être inclus dans `PATCH__SESSION-20260316-08_A2_BASE-07_DOCS-01.diff`.

## Statut final

- patch principal produit ;
- fix minimal produit ;
- validations terminales complètes réussies ;
- documentation finale produite ;
- clôture documentaire sans réouverture de code.
