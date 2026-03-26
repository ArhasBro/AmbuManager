# README_PATCH

## Session liée
SESSION-20260322-06_A4_VEH-06

## Type
COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-06_A4_VEH-06`

## Patch officiel
`PATCH__SESSION-20260322-06_A4_VEH-06.diff`

## Fichiers inclus dans le patch
- `app/api/vehicles/[id]/route.ts`
- `lib/validators/vehicle.ts`

## Objet du patch
- ajouter l’endpoint réel `PATCH /api/vehicles/[id]` ;
- permettre l’édition de `immatriculation`, `type`, `status` ;
- conserver le cloisonnement par `companyId` ;
- exclure `depotId` de l’édition générale ;
- garder une réponse homogène et une traçabilité support cohérente avec le module.

## Commandes d'application et validations retenues

Commandes reproductibles attendues depuis la racine projet :

```bash
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-06_A4_VEH-06\\PATCH__SESSION-20260322-06_A4_VEH-06.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-06_A4_VEH-06\\PATCH__SESSION-20260322-06_A4_VEH-06.diff"
npm run lint
npm run build
```

Résultats réels à jour consignés pour la documentation finale :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Statut
- Patch principal produit.
- Aucun patch correctif supplémentaire nécessaire à ce stade.
- Documentation finale de session mise à jour.
