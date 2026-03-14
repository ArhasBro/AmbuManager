# NOTES

## Nature de la session

Session de type **COMPLÉTION**.
Le périmètre est strictement borné à `ORG-02` et ne couvre que le **profil société minimal ALPHA** au niveau :
- du modèle Prisma ;
- du stockage via migration ;
- du seed / bootstrap.

Aucune UI et aucune API dédiée au profil société ne sont produites dans cette session.

## Point de départ retenu

`ORG-01` a déjà établi que :
- une entité `Company` réelle existe ;
- cette entité est déjà utilisée comme pivot multi-tenant ;
- le champ `name` existe déjà ;
- le profil société minimal attendu par `03.2 Profil société` n’est pas encore couvert car plusieurs champs manquent.

La présente session ne ré-audite pas ce constat : elle le complète par correction ciblée.

## Logique de correction retenue

La correction a été volontairement minimale et stable.
Le besoin fonctionnel imposé était de couvrir explicitement, dans l’entité société, les champs suivants :
- nom des gérants ;
- adresse ;
- téléphone ;
- SIRET.

Le choix retenu a été d’ajouter directement sur `Company` les champs :
- `managerNames`
- `address`
- `phone`
- `siret`

Ce choix respecte les bornes de session :
- nommage simple ;
- pas de sous-structure complexe ;
- pas de refonte transverse ;
- pas d’élargissement UI/API.

## Impact sur le schéma et la persistance

Le schéma Prisma a été complété pour que `Company` porte explicitement les champs minimaux attendus.
Une migration dédiée a été ajoutée afin que le stockage PostgreSQL soit aligné avec le schéma courant.

La stratégie retenue reste additive et bornée :
- aucune réécriture de migration historique ;
- aucune suppression de structure existante ;
- aucun changement hors `Company`.

## Impact sur le seed / bootstrap

Le seed a été réaligné de manière strictement nécessaire :
- le type local `SeedCompany` a été enrichi ;
- la fonction d’upsert société écrit désormais les nouveaux champs ;
- les données seedées restent cohérentes avec le nouveau minimum attendu.

Cette correction seed ne vaut pas mise en place d’un onboarding société complet.
Elle garantit uniquement la cohérence du bootstrap après évolution du schéma.

## Ce que la session ne fait pas

La session `ORG-02` ne fait pas :
- d’écran de consultation / édition de la fiche société ;
- de route API métier dédiée au profil société ;
- de validations métier avancées sur le téléphone ou le SIRET ;
- de gestion documentaire ou administrative élargie de la société ;
- d’ouverture des blocs `ORG-03`, `ORG-04`, `BASE-*`, `SUP-*`.

## Conclusion de travail

`ORG-02` doit être comprise comme une **mise à niveau structurelle minimale** du profil société ALPHA.
Le besoin minimal de `03.2 Profil société` est désormais couvert côté :
- modèle `Company` ;
- migration ;
- seed.

Le reste du produit société demeure hors périmètre de cette session.
