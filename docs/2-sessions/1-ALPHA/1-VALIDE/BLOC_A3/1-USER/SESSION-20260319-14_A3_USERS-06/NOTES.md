# NOTES — SESSION-20260319-14_A3_USERS-06

## Méthode suivie
1. Relecture des routes users existantes :
   - `app/api/users/route.ts`
   - `app/api/users/[id]/reset-password/route.ts`
   - `app/api/users/[id]/depot/route.ts`
2. Relecture des validateurs et helpers :
   - `lib/validators/user.ts`
   - `lib/api/response.ts`
   - `lib/api/prisma-error.ts`
   - `lib/permissions.ts`
3. Implémentation minimale d’une route `PATCH` cohérente avec le pattern réel du dépôt.
4. Génération d’un patch code seul.
5. Vérification d’application du patch sur copie propre.
6. Lancement des validations terminales possibles dans le container.

## Observations
- Le dépôt source du ZIP ne contenait pas encore `app/api/users/[id]/route.ts`.
- Le validateur user ne contenait qu’un schéma de création et un schéma d’assignation dépôt.
- Le multi-tenant users déjà en place repose sur `companyId` et l’exclusion des comptes support globaux.
- La session reste volontairement bornée à l’API et n’introduit aucune logique UI.

## Décisions de bornage
- pas de service dédié supplémentaire : la route reste minimale ;
- pas d’édition du `depotId` ;
- pas d’édition du `password` ;
- pas d’exposition de `platformRole`.
