# NOTES

## Méthode / observations

- Le problème signalé a été confirmé : le patch principal précédent utilisait des chemins erronés et n’était pas applicable sur le dépôt cible.
- Les chemins réels du dépôt sont bien :
  - `lib/validators/depot.ts`
  - `app/api/depots/[id]/route.ts`
  - `lib/services/depots/update-depot.ts`
- Le correctif a été limité strictement à la suppression de `isActive` dans le flux PATCH `BASE-04`.
- Aucun débordement n’a été introduit vers `BASE-03`, `BASE-05`, UI, archivage ou Prisma.

## Point important sur la validation terminale

Les commandes Prisma ne passent pas dans le conteneur utilisé pour cette session car le CLI tente de joindre `binaries.prisma.sh` et échoue en résolution DNS (`getaddrinfo EAI_AGAIN`).

Le build ne peut donc pas être validé à `OK` dans cet environnement ; il échoue ensuite sur un import `RuleMode` dans `app/api/company/rules/route.ts` parce que le client Prisma généré localement n’est pas à jour.
