# NOTES

## Méthode / observations
Travail mené en validation factuelle stricte :
1. lecture des documents maîtres et méthodologiques requis ;
2. contrôle du modèle `ShiftTemplate` dans `prisma/schema.prisma` ;
3. contrôle de la chaîne de migrations imposée par la session ;
4. contrôle des usages réels dans le seed, l’autoschedule, le publish, l’assignation, le matching et l’API planning ;
5. distinction stricte entre :
   - cohérence du schéma actuel ;
   - écarts produit déjà connus mais explicitement hors scope de `TPL-02`.

## Observations structurantes
### 1. Cohérence du modèle template
Le modèle actuel porte exactement les champs réellement consommés :
- `id`
- `companyId`
- `name`
- `category`
- `requiredRole`
- `isActive`
- `startTime`
- `endTime`
- `crossesMidnight`
- `createdAt`
- `updatedAt`

### 2. Cohérence des relations
Les relations suivantes sont réelles et cohérentes :
- `ShiftTemplate` -> `DraftShift[]`
- `ShiftTemplate` -> `Shift[]`
- `DraftShift.templateId` -> `ShiftTemplate.id` en `ON DELETE SET NULL`
- `Shift.templateId` -> `ShiftTemplate.id` en `ON DELETE SET NULL`

Cette modélisation est cohérente avec un historique de planning devant survivre à la désactivation future d’un template.

### 3. Cohérence migrations / état actuel
Pour le **modèle template lui-même**, l’état actuel est expliqué par :
- `20260226173545_add_shift_templates`
- `20260226181203_autoschedule_planning_v4_1_1`

Pour la **chaîne template -> draft -> shift**, les relations sont expliquées par :
- `20260226181203_autoschedule_planning_v4_1_1`
- `20260226193652_add_shift_model`

Pour la **forme complète actuelle** de `DraftShift` / `Shift`, des migrations ultérieures ajoutent :
- index de conflits ;
- `user2Id` ;
- `depotId` sur `Shift`.

Ces ajouts n’invalident pas le schéma template et ne justifient pas une correction de `TPL-02`.

### 4. Observations non bloquantes
Points notés mais non qualifiables ici comme défauts de schéma bloquants :
- `startTime` / `endTime` sont stockés en `String` et validés surtout au runtime ;
- les lectures autoschedule filtrent sur `companyId + isActive (+ category)` sans index dédié sur `isActive` ;
- un script ponctuel vise un ancien cas de template corrompu, sans preuve qu’un défaut de schéma actuel doive être corrigé dans cette session.

Aucun de ces points ne suffit, sur les preuves du dépôt contrôlé, à justifier un patch de correction immédiat en `TPL-02`.

## Éléments explicitement hors scope
Relèvent d’autres sessions du bloc A6 :
- `TPL-03` : correction de modèle **uniquement si** un défaut de schéma réel est prouvé ;
- `TPL-09` : composition minimale d’équipe ;
- `TPL-10` : type de véhicule requis ;
- `TPL-11` : nombre minimal de personnes requis ;
- `TPL-12` : support des shifts non horodatés ;
- `TPL-13` : couleurs libres / lisibilité visuelle.

Relèvent aussi hors `TPL-02` :
- API templates (`TPL-04` à `TPL-07`) ;
- UI templates (`TPL-08`) ;
- vrai archivage métier distinct de `isActive` (`TPL-07`) ;
- branchement produit réel de `TEMPLATES_MANAGE` (sessions API/UI, pas `TPL-02`).

Concernant la récurrence hebdomadaire, le besoin existe au cadrage module 09.8, mais aucune session dédiée n’est explicitement identifiée dans l’extrait A6 fourni. Ce point est donc **hors `TPL-02`** sans être rattachable avec certitude à `TPL-03`, `TPL-09`, `TPL-10`, `TPL-11`, `TPL-12` ou `TPL-13`.
