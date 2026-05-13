# NOTES

## Écarts initiaux hérités de `A13-01`

La session `SESSION-20260416-13_A13_A13-01` avait établi les écarts réels suivants :

- scénarios manuels documentés hétérogènes et incomplets ;
- absence de smoke tests API critiques réellement présents ;
- absence de tests ciblés réellement présents sur blocs sensibles ;
- absence de documentation d’usage exploitable pour `users`, `véhicules`, `templates`, `planning/autoschedule` ;
- `README.md` racine présent mais générique ;
- cohérence finale ALPHA non atteinte à ce stade.

## Logique de correction retenue

La logique retenue a été volontairement légère, prouvable et strictement bornée au lot `A13-LOT-02-13` :

- compléter la documentation produit sans réécrire le cadrage ;
- homogénéiser les scénarios manuels en format rejouable ALPHA ;
- ajouter des smoke tests API critiques simples et exploitables ;
- ajouter des tests ciblés sur blocs stables et sensibles ;
- n’appliquer une correction code que si elle était directement nécessaire à la cohérence entre documentation, tests et flux standard réellement exposé.

## Justification de la correction minimale sur le flux véhicules

Une correction minimale a été retenue sur le flux véhicules parce qu’un écart réel et directement prouvé subsistait : le dépôt exposait encore un flux standard de suppression destructive, alors que la logique fonctionnelle cohérente côté produit et côté usage standard devait rester l’archivage logique.

La correction a donc consisté à :
- retirer l’exposition du flux destructif standard sur `app/api/vehicles/route.ts` ;
- retirer l’action UI de suppression dans `app/vehicles/vehicles-client.tsx` ;
- conserver le cycle standard d’archivage logique.

Cette correction est minimale, localisée et justifiée par la cohérence finale ALPHA sur le périmètre contrôlé.

## Justification des smoke tests API

Les smoke tests API ont été retenus comme des tests légers, explicites et utiles, couvrant des routes critiques minimales sans introduire de stack lourde supplémentaire.

Ils permettent de prouver des comportements à forte valeur probante :
- garde d’authentification ;
- garde de permissions ;
- cloisonnement `companyId` ;
- cohérence de certaines règles critiques ;
- maintien du flux standard véhicule basé sur l’archivage.

## Justification des tests ciblés

Les tests ciblés ont été concentrés sur des blocs sensibles et suffisamment stables pour produire une preuve utile sans dispersion :
- helpers de réponse API ;
- sérialisation de dates ;
- règles templates ;
- calcul de qualité planning.

L’objectif n’était pas de gonfler artificiellement la couverture mais de consolider les points les plus probants du périmètre ALPHA traité.

## Justification de la documentation d’usage

La documentation d’usage a été produite pour combler un manque réel du dépôt : une société pilote ALPHA devait pouvoir disposer d’un socle d’utilisation clair pour les modules `users`, `véhicules`, `templates`, `planning/autoschedule`.

Les documents ajoutés ont donc été rédigés à partir du code réel et non à partir d’une projection théorique, avec un niveau de détail compatible avec une utilisation et une vérification ALPHA.

## Rappel sur Prisma

Aucune modification Prisma n’a été réalisée dans cette session ni dans le fix validé de référence.

Conséquence documentaire :
- `npx prisma validate` : `NON EXÉCUTÉ`
- `npx prisma generate` : `NON EXÉCUTÉ`

Justification : `aucune modification Prisma dans ce fix`.

## Warning Node non bloquant

Le contrôle a signalé, lors de `npm run test:targeted`, un warning Node non bloquant de type `MODULE_TYPELESS_PACKAGE_JSON`.

Ce warning n’a pas remis en cause le résultat de validation :
- `npm run test:targeted` → `OK`
- `5 pass / 0 fail`
