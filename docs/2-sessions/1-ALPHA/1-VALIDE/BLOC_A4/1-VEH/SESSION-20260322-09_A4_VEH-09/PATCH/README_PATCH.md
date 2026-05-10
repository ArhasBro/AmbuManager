# README_PATCH

## Session liée
SESSION-20260322-09_A4_VEH-09

## Type
COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-09_A4_VEH-09`

## Patch officiel
`PATCH__SESSION-20260322-09_A4_VEH-09.diff`

## Fichiers inclus dans le patch
- `app/vehicles/vehicles-client.tsx`

## Objet du patch
- ajouter une action UI réelle d’archivage logique véhicule dans la liste existante ;
- confirmer l’action avant archivage ;
- appeler l’endpoint existant `POST /api/vehicles/[id]/archive` ;
- retirer immédiatement le véhicule archivé de la liste active affichée ;
- nettoyer l’état local associé et fermer l’édition locale si nécessaire ;
- conserver la séparation produit entre archivage logique et suppression définitive.

## Commandes d'application et validations retenues

Commandes terminales réelles consignées :

```bash
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-09_A4_VEH-09\\PATCH__SESSION-20260322-09_A4_VEH-09.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-09_A4_VEH-09\\PATCH__SESSION-20260322-09_A4_VEH-09.diff"
npm run lint
npm run build
```

Résultats réels finaux consignés pour la documentation finale :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Statut
- Patch principal produit et validé.
- Aucun patch correctif supplémentaire nécessaire à ce stade.
- Documentation finale de session mise à jour.
