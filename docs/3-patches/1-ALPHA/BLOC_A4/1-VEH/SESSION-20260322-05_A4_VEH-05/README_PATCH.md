# README_PATCH

## Session liée
SESSION-20260322-05_A4_VEH-05

## Type
CORRECTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-05_A4_VEH-05`

## Patch officiel
`PATCH__SESSION-20260322-05_A4_VEH-05.diff`

## Fichiers inclus dans le patch
- `app/api/vehicles/route.ts`
- `app/vehicles/add-vehicle-form.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/vehicles/page.tsx`
- `lib/validators/vehicle.ts`

## Objet du patch
- ajouter la gestion réelle du `status` dans le flux de création véhicule ;
- conserver le flux de rafraîchissement existant après création ;
- aligner l’exposition UI de la création avec la restriction API réelle à `ADMIN`.

## Commandes d'application et validations retenues

```bash
git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A4\1-VEH\SESSION-20260322-05_A4_VEH-05\PATCH__SESSION-20260322-05_A4_VEH-05.diff"
git apply ".\docs\3-patches\1-ALPHA\BLOC_A4\1-VEH\SESSION-20260322-05_A4_VEH-05\PATCH__SESSION-20260322-05_A4_VEH-05.diff"
npm run lint
npm run build
```

Résultats réels consignés :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Statut
- Patch principal produit et validé.
- Aucun patch correctif supplémentaire nécessaire à ce stade.
- Documentation finale de session mise à jour séparément.
