# README_PATCH

## Session liée
SESSION-20260322-07_A4_VEH-07

## Type
COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-07_A4_VEH-07`

## Patch officiel
`PATCH__SESSION-20260322-07_A4_VEH-07.diff`

## Fichiers inclus dans le patch
- `app/vehicles/vehicles-client.tsx`

## Objet du patch
- ajouter une UI réelle de modification véhicule dans `/vehicles` ;
- préremplir les valeurs du véhicule sélectionné ;
- permettre l’édition de `immatriculation`, `type`, `status` ;
- appeler l’endpoint existant `PATCH /api/vehicles/[id]` ;
- afficher un état cohérent de chargement / erreur / succès ;
- mettre à jour la liste locale après succès ;
- conserver le flux `depotId` séparé de l’édition générale.

## Commandes d'application et validations retenues

Commandes reproductibles attendues depuis la racine projet :

```bash
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-07_A4_VEH-07\\PATCH__SESSION-20260322-07_A4_VEH-07.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-07_A4_VEH-07\\PATCH__SESSION-20260322-07_A4_VEH-07.diff"
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
