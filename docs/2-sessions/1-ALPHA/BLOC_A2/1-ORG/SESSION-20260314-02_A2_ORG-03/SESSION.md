# SESSION

## ID SESSION

SESSION-20260314-02_A2_ORG-03

## Date

14/03/2026

## Contexte

- Projet : Investissement
- Sous-projet : Ambulance Manager
- Maturité : 1-ALPHA
- Bloc : A2
- Type : COMPLÉTION
- Intitulé : Édition UI du profil société

## Objectif de la session

Ajouter une UI minimale permettant à la société connectée d'afficher et modifier son profil société ALPHA sur les champs `name`, `managerNames`, `address`, `phone` et `siret`.

## Périmètre exact traité

- ajout d'un lien `Profil société` dans le dashboard admin ;
- ajout d'une page dédiée `/company` ;
- ajout d'un formulaire client minimal ;
- ajout d'une route `PATCH /api/company/profile` ;
- ajout de la validation Zod minimale associée ;
- bornage strict à la société courante via `companyId` ;
- accès borné à `ADMIN` / `GERANT`.

## Résultat synthétique de session

Complétion minimale `ORG-03` livrée sur le ZIP effectivement reçu. Le correctif évite l'usage Prisma typé sur `managerNames` dans le code ajouté afin de ne pas réintroduire le blocage TypeScript déjà constaté sur ce champ.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A2/1-ORG/SESSION-20260314-02_A2_ORG-03`
- Patchs : `docs/3-patches/1-ALPHA/BLOC_A2/1-ORG/SESSION-20260314-02_A2_ORG-03`
