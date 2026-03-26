# RESULTATS — SESSION-20260322-04_A4_VEH-04

## Résultat de la validation
La création véhicule existante est **partiellement conforme** au besoin `07.2 Création d’un véhicule`.

## Ce qui est réellement couvert
- API `POST /api/vehicles` existante
- validation minimale réelle de `immatriculation` et `type`
- contrôle d’accès API réel côté création
- formulaire UI réel de création
- chaîne UI -> API -> mise à jour immédiate de la liste réellement présente
- cohérence de base avec le modèle `Vehicle` et unicité `companyId + immatriculation`

## Ce qui n’est pas complètement couvert
- le `statut` n’est pas saisi à la création ; il est forcé à `ACTIVE` côté serveur
- la surface UI de création n’est pas alignée avec la restriction produit/API à `admin`

## Patch
Aucun patch code produit dans cette session.

## Suite logique
Reporter les écarts constatés vers `VEH-05` sans corriger dans `VEH-04`.
