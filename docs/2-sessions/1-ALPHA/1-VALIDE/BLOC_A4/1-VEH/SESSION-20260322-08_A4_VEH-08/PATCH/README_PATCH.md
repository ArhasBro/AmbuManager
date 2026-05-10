# README_PATCH

## Session liée
SESSION-20260322-08_A4_VEH-08

## Type
COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-08_A4_VEH-08`

## Patch officiel
`PATCH__SESSION-20260322-08_A4_VEH-08.diff`

## Fichiers inclus dans le patch
- `app/api/vehicles/[id]/archive/route.ts`
- `lib/services/vehicles/archive-vehicle.ts`
- `app/api/vehicles/route.ts`
- `app/vehicles/page.tsx`

## Objet du patch
- ajouter une API réelle d’archivage logique véhicule ;
- archiver via `Vehicle.isActive` sans suppression physique ;
- valider l’identifiant et cloisonner par société ;
- conserver une réponse API homogène avec dates sérialisées ;
- rester cohérent avec `canManageVehicles(...)` ;
- aligner le listing standard pour ne plus remonter les véhicules archivés après rafraîchissement.

## Commandes d'application et validations retenues

Commandes reproductibles attendues depuis la racine projet :

```bash
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-08_A4_VEH-08\\PATCH__SESSION-20260322-08_A4_VEH-08.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-08_A4_VEH-08\\PATCH__SESSION-20260322-08_A4_VEH-08.diff"
npm run lint
npm run build
```

Résultats réels finaux consignés pour la documentation finale :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Statut
- Patch principal produit.
- Aucun patch correctif supplémentaire nécessaire à ce stade.
- Documentation finale de session mise à jour.
