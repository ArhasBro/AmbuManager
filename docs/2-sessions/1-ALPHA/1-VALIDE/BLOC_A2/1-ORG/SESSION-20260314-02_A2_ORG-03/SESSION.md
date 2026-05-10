# SESSION

## ID SESSION

`SESSION-20260314-02_A2_ORG-03`

## Date

`14/03/2026`

## Contexte

- Projet : `Investissement`
- Sous-projet : `Ambulance Manager`
- Stage : `1-ALPHA`
- Bloc : `A2`
- Type : `COMPLÉTION`
- Intitulé : `Édition UI du profil société`

## Objectif de session

Ajouter une UI minimale permettant à la société connectée d'afficher et modifier son profil société ALPHA sur les champs :
- `name`
- `managerNames`
- `address`
- `phone`
- `siret`

## Périmètre final retenu

- UI minimale profil société ALPHA ;
- cohérence de lecture / écriture sur la société courante via `companyId` ;
- aucun changement de schéma Prisma ;
- aucune migration ;
- aucun élargissement vers `ORG-04`, `BASE-*`, `SUP-*`, onboarding ou multi-sociétés.

## Clôture réelle de session

`ORG-03` est finalement validée via un **hotfix code-only** de référence :
`ORG-03-codehotfix-01.diff`

Ce patch final validé ne modifie pas la documentation et ne touche qu'au correctif technique minimal nécessaire sur le code déjà présent.
