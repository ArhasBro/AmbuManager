# NOTES

## Méthode / observations
- Relecture des sources documentaires obligatoires avant toute modification.
- Contrôle du schéma Prisma pour confirmer les champs réellement présents sur `ShiftTemplate`.
- Contrôle des helpers RBAC existants pour rester aligné avec les conventions runtime du dépôt.
- Contrôle des routes API existantes (`vehicles`, `users`, `autoschedule`) pour reproduire le format `{ ok:true, data } / { ok:false, error, details? }`, la logique session et le cloisonnement multi-tenant.
- Choix retenu : ajouter une route dédiée `app/api/templates/route.ts` et un helper minimal `canManageTemplates(...)` dans `lib/permissions.ts`.

## Arbitrages retenus
- `companyId` n’est pas exposé dans la liste, car non nécessaire au besoin de lecture côté produit et explicitement non justifié dans le scope.
- La route reste **GET uniquement**.
- Des filtres minimaux ont été retenus car ils restent dans le périmètre strict de liste et sont directement utiles :
  - `limit`
  - `isActive`
  - `category`
- Aucun tri métier nouveau n’a été introduit : ordre stable `name asc`, `id asc`.

## Hors scope explicitement respecté
- aucune création template ;
- aucune modification template ;
- aucun archivage / désactivation métier ;
- aucune UI templates ;
- aucun enrichissement métier template ;
- aucune refonte planning / autoschedule / matching.
