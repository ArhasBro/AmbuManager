# README_PATCH

## Patch

Patch officiel : `ORG-03-rectif-02.diff`

## Objet

Ce patch s'applique sur le ZIP réellement reçu pour ajouter la UI minimale `ORG-03` et la documentation de session correspondante.

## Application

```bash
git apply --check docs/3-patches/1-ALPHA/BLOC_A2/1-ORG/SESSION-20260314-02_A2_ORG-03/ORG-03-rectif-02.diff
git apply docs/3-patches/1-ALPHA/BLOC_A2/1-ORG/SESSION-20260314-02_A2_ORG-03/ORG-03-rectif-02.diff
```

## Vérifications observées

- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : ECHEC
  - premier blocage : `./app/api/company/rules/route.ts:4:10`
  - message : `Module '"@prisma/client"' has no exported member 'RuleMode'`
