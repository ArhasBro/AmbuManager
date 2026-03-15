# README_PATCH

## Patch

Patch rectificatif officiel : `ORG-03-rectif-01.diff`

## Objet du patch

Ce patch livre l'état rectifié de `SESSION-20260314-02_A2_ORG-03` :
- UI minimale profil société ;
- formulaire d'édition ;
- route API minimale de mise à jour ;
- correction ciblée du blocage `managerNames` dans `app/api/company/profile/route.ts` ;
- documentation de session réalignée sur les résultats réels.

## Application

```bash
git apply --check docs/3-patches/1-ALPHA/BLOC_A2/1-ORG/SESSION-20260314-02_A2_ORG-03/ORG-03-rectif-01.diff
git apply docs/3-patches/1-ALPHA/BLOC_A2/1-ORG/SESSION-20260314-02_A2_ORG-03/ORG-03-rectif-01.diff
```

## Vérifications réellement observées

- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : échec
  - premier blocage : `./app/api/company/rules/route.ts:4:10`
  - message : `Module '"@prisma/client"' has no exported member 'RuleMode'`

## Périmètre strict

Le patch reste borné à `ORG-03` et n'ouvre pas `ORG-04`, `BASE-*`, `SUP-*`.
