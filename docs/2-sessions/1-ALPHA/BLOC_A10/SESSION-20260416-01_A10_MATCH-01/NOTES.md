# NOTES

Notes de travail de la session.

---

## Méthode / observations

1. Relecture des masters et des documents de protocole pour caler le scope A10 sans dérive vers correction, validation ou clôture.
2. Contrôle ciblé du moteur réel :
   - routes preview/apply ;
   - service de matching ;
   - calcul du score qualité ;
   - règles template ;
   - schéma Prisma ;
   - UI `/planning`.
3. Contrôle complémentaire limité à la cohérence run/audit/permissions/multi-tenant.

## Observations factuelles principales

### 1) Scoring qualité réellement présent
`app/api/planning/autoschedule/runs/[id]/match/preview/route.ts` appelle :
- `computeDraftShiftMatchingByRole(...)`
- puis `computePlanningQuality(plan)`
- et renvoie bien `{ plan, quality }`.

### 2) Métriques réellement calculées
`lib/services/planning/matching-quality.ts` calcule :
- `coverage`
- `vehicleCoverage`
- `stability`
- `equity`
- `overall`
- `countsByReason`
- `explanations`

Pondérations réellement codées :
- `coverage = 0.4`
- `vehicleCoverage = 0.2`
- `stability = 0.25`
- `equity = 0.15`

### 3) Équilibrage de charge réellement présent
`lib/services/planning/matching.service.ts` trie les candidats employés puis véhicules par compteur d’affectations existantes :
- `userAssignmentCounts`
- `vehicleAssignmentCounts`

Le candidat au plus faible compteur est choisi en priorité.

### 4) Composition minimale d’équipe réellement exploitée
Le moteur s’appuie sur :
- `minStaffCount`
- `requiredRole`
- `secondaryAllowedRoles`

La logique réelle passe par :
- `resolveTemplateMinStaffCount`
- `getAllowedRolesForFirstSlot`
- `getAllowedRolesForSecondSlot`
- `getMissingSlots`
- `chooseBestUser`

### 5) Véhicules requis réellement exploités
Le moteur s’appuie sur :
- `requiredVehicleType`
- véhicules actifs de bon type
- indisponibilité / chevauchement véhicule
- restriction rôle ↔ véhicule

La logique réelle passe par :
- `vehiclesByType`
- `chooseBestVehicle`
- `validateAssignedRolesForVehicle`

### 6) Variantes simples absentes
Aucune structure de données, aucun paramètre API, aucune UI et aucune boucle de calcul ne produisent 2 à 3 variantes simples.
Le dépôt ne fournit qu’un plan unique.

### 7) Visibilité du score
La UI `/planning` affiche après preview :
- score global run ;
- sous-scores ;
- explications.

En revanche, aucun score numérique par shift n’est calculé ni affiché.
La table affiche des lignes par cible (`USER_1`, `USER_2`, `VEHICLE`) avec signalement, pas un score par shift.

### 8) Cohérence documentaire partielle
Le registre des décisions et les documents historiques 4.6 / 4.7 confirment bien l’existence du preview avec `quality` et de l’affichage UI, mais ils ne sont plus totalement alignés sur les détails actuels du calcul :
- ajout de `vehicleCoverage`
- pondérations différentes
- stabilité calculée sur d’autres raisons que la seule notion historique `USER_CONFLICT`.
