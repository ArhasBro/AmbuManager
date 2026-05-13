# SESSION — SESSION-20260322-10_A4_VEH-10

## Date
26/03/2026

## Contexte
Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A4  
Type : VALIDATION  
Intitulé : Contrôle de la non-suppression physique non souhaitée

## Objet de la session
Contrôler, sur l’état réel du module `vehicles` après VEH-01 à VEH-09, si le dépôt introduit encore une suppression physique véhicule non souhaitée ou insuffisamment encadrée dans le flux standard société.

## Périmètre retenu
- `app/api/vehicles/route.ts` ;
- `app/vehicles/vehicles-client.tsx` ;
- `app/vehicles/page.tsx` ;
- `app/api/vehicles/[id]/archive/route.ts` en lecture ;
- `lib/services/vehicles/archive-vehicle.ts` en lecture ;
- `app/api/vehicles/[id]/route.ts` en lecture d’alignement ;
- `lib/validators/vehicle.ts` en lecture ;
- `lib/permissions.ts` en lecture ;
- `lib/permission-catalog.ts` en lecture ;
- `prisma/schema.prisma` en lecture.

## Hors périmètre confirmé
- aucune correction du flux de suppression physique par défaut ;
- aucune refonte de `/vehicles` ;
- aucune modification Prisma ;
- aucune migration ;
- aucune modification de l’API d’archivage ;
- aucune ouverture vers VEH-11 à VEH-17 ou A5.

## Résultat synthétique
La suppression physique véhicule est encore réellement exposée dans le flux standard société :
- côté API via `DELETE /api/vehicles` ;
- côté UI via l’action `Supprimer` de `/vehicles`.

Cette suppression physique coexiste avec l’archivage logique VEH-08 / VEH-09. Aucun garde-fou explicite « véhicule jamais utilisé » n’a été trouvé avant suppression. La session conclut donc à un résiduel réel de suppression physique insuffisamment encadrée. La livraison se fait en `NO_PATCH`, car la session est une validation et non une correction.

## Emplacements de référence
- session : `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-10_A4_VEH-10/`
- patch : `docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-10_A4_VEH-10/`
