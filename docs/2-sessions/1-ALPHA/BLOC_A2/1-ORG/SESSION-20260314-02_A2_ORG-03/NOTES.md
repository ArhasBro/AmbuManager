# NOTES

## Nature de la session

Session de type **COMPLÉTION**.
Le périmètre est strictement borné à `ORG-03` et ne couvre que l’**édition UI minimale du profil société ALPHA**.

La session ne rouvre pas :
- `A1` ;
- `ORG-04` ;
- `BASE-*` ;
- `SUP-*`.

## Point de départ retenu

`ORG-01` a prouvé qu’aucune UI dédiée au profil société n’était visible dans le dépôt.
`ORG-02` a ensuite rendu disponibles côté modèle les champs minimaux :
- `name`
- `managerNames`
- `address`
- `phone`
- `siret`

La présente session part strictement de cet état validé.

## Logique de complétion retenue

Le besoin produit `03.2 Profil société` demande une gestion minimale de la société avec au moins :
- nom société ;
- nom des gérants ;
- adresse ;
- téléphone ;
- SIRET.

Comme `ORG-03` est explicitement une session UI, la mise en œuvre retenue a été :
- un point d’entrée clair depuis le dashboard existant ;
- une page dédiée ;
- un formulaire client minimal ;
- une route `PATCH` minimale pour enregistrer les modifications.

## Choix d’accès retenu

Le cadrage cible `gérant` et `admin`.
Le contrôle retenu a donc été volontairement minimal et explicite :
- accès autorisé uniquement à `ADMIN` et `GERANT` ;
- lecture/écriture uniquement sur la société de la session via `companyId` ;
- aucune logique multi-sociétés ;
- aucun rôle support ouvert dans cette session.

## Pourquoi une route dédiée a été ajoutée

La page serveur peut lire la société courante directement, mais l’édition nécessite une écriture côté client.
La route `PATCH /api/company/profile` a donc été ajoutée comme **brique technique strictement nécessaire** à la UI.

Cette route reste bornée :
- un seul usage ;
- un seul périmètre ;
- aucun champ hors besoin ;
- contrat API officiel conservé.

## Ce que la session ne fait pas

La session `ORG-03` ne fait pas :
- d’onboarding société ;
- de gestion documentaire ;
- d’email société ;
- de logo ;
- de suppression/désactivation société ;
- de gestion multi-sociétés ;
- de permissions fines nouvelles ;
- de refonte large du dashboard.

## Vérifications de fin

`npm run lint` passe dans l’environnement extrait.
`npm run build` a bien été tenté mais échoue sur un point Prisma existant hors logique métier `ORG-03`, le premier blocage remonté étant l’import `RuleMode` depuis `@prisma/client` dans `app/api/company/rules/route.ts`.

## Conclusion de travail

`ORG-03` doit être comprise comme une **complétion UI minimale** du profil société ALPHA :
- écran dédié ;
- formulaire exploitable ;
- écriture bornée à `companyId` ;
- accès réservé aux profils légitimes ;
- aucun élargissement fonctionnel annexe.
