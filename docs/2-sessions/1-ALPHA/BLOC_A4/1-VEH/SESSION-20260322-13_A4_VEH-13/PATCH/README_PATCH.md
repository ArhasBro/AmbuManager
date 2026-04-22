# README_PATCH — SESSION-20260322-13_A4_VEH-13

## Session liée
`SESSION-20260322-13_A4_VEH-13`

## Type
`CORRECTION`

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-13_A4_VEH-13/`

## Patch officiel
`PATCH__SESSION-20260322-13_A4_VEH-13.diff`

## Périmètre du patch officiel
Le patch officiel contient uniquement le correctif code minimal VEH-13 :
- `app/api/vehicles/route.ts`
- `app/planning/planning-client.tsx`

Les fichiers documentaires de session sont mis à jour séparément dans leurs dossiers respectifs et ne sont pas mélangés au patch principal code.

## Commandes d’application vérifiées
```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-13_A4_VEH-13/PATCH__SESSION-20260322-13_A4_VEH-13.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-13_A4_VEH-13/PATCH__SESSION-20260322-13_A4_VEH-13.diff"
npm run lint
npm run build
```

## Statut
- patch officiel produit ;
- `git apply --check` : OK ;
- `git apply` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.
