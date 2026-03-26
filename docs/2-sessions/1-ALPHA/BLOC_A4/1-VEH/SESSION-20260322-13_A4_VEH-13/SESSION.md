# SESSION — SESSION-20260322-13_A4_VEH-13

## Date
26/03/2026

## Contexte
Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A4  
Type : CORRECTION  
Intitulé : Correction/remise à niveau de l’affectation véhicule si nécessaire

## Objectif de la session
Corriger uniquement les résiduels réels confirmés sur le flux existant d’affectation véhicule au planning, de façon minimale et traçable, sans rouvrir le sujet 07.7 ni refondre le module planning.

## Périmètre exact traité
### Code modifié
- `app/api/vehicles/route.ts`
- `app/planning/planning-client.tsx`

### Code contrôlé sans modification
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/planning/page.tsx`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/validators/planning-assign.ts`

### Documentation relue
- `docs/1-master/*`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`

## Résultat synthétique
Le résiduel VEH-13 était bien réel dans le code :
- la page `/planning` charge la liste véhicules depuis `/api/vehicles?limit=500` ;
- cet endpoint refusait l’accès sans `VEHICLES_MANAGE`, alors que l’édition planning repose sur `PLANNING_EDIT` ;
- l’UI d’affectation gérait encore `USER_CONFLICT` / `VEHICLE_CONFLICT`, alors que l’API renvoie `USER_OVERLAP_CONFLICT` / `VEHICLE_OVERLAP_CONFLICT`.

Correctif minimal appliqué :
- `GET /api/vehicles` accepte désormais la lecture si l’utilisateur a **soit** `VEHICLES_MANAGE`, **soit** `PLANNING_EDIT` ;
- l’UI planning accepte désormais les codes réels `USER_OVERLAP_CONFLICT` et `VEHICLE_OVERLAP_CONFLICT`, tout en conservant la compatibilité avec les anciens codes UI ;
- aucun élargissement vers le statut véhicule `MAINTENANCE / OUT_OF_SERVICE` n’a été introduit dans cette session.

## Validation réelle retenue
- `git apply --check` : OK ;
- `git apply` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.

## Emplacements de référence
- Session : `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-13_A4_VEH-13/`
- Patchs : `docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-13_A4_VEH-13/`
