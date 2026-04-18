# Qualité ALPHA — Smoke tests et tests ciblés

## Objectif

Ce document décrit les scripts qualité légers ajoutés pour le bloc A13 :
- **smoke tests API critiques** ;
- **tests automatisés ciblés sur blocs sensibles**.

Ces scripts évitent l’introduction d’une stack de test lourde et restent compatibles avec l’état actuel du dépôt.

## Commandes

```bash
npm run test:smoke
npm run test:targeted
npm run test:quality
```

## 1. Smoke tests API critiques

Script : `scripts/quality/smoke-api-critical-contracts.test.mjs`

Nature des contrôles :
- tests contractuels sur le code source des routes critiques ;
- vérification des garde-fous essentiels :
  - session obligatoire ;
  - permission obligatoire ;
  - cloisonnement `companyId` ;
  - absence de confiance dans un `companyId` client ;
  - contrôle des scopes ou curseurs selon la route ;
  - flux standard véhicule recentré sur l’archivage logique.

Routes couvertes :
- `/api/users`
- `/api/templates`
- `/api/planning/shifts`
- `/api/planning/exports`
- `/api/planning/autoschedule/runs`
- `/api/vehicles` + UI `/vehicles`

## 2. Tests ciblés sur blocs sensibles

Script : `scripts/quality/targeted-sensitive-blocks.test.mjs`

Nature des contrôles :
- exécution réelle de fonctions stables et sensibles ;
- vérification de comportements à forte valeur probante.

Blocs couverts :
- `lib/api/response.ts`
- `lib/serializers.ts`
- `lib/templates/template-rules.ts`
- `lib/services/planning/matching-quality.ts`

## Limites honnêtes

- ce n’est pas une suite e2e complète ;
- les smoke tests API actuels sont **contractuels** plutôt que branchés sur un serveur démarré ;
- la couverture reste volontairement ciblée et non exhaustive.
