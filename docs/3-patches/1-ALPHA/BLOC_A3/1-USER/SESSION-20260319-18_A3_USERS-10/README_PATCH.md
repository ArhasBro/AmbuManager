# README_PATCH — SESSION-20260319-18_A3_USERS-10

## Patch concerné
`PATCH__SESSION-20260319-18_A3_USERS-10.diff`

## Objet
Compléter le flux réel d’édition utilisateur pour permettre l’affectation du rôle principal et des permissions applicatives ALPHA lors de la modification d’un utilisateur existant.

## Périmètre couvert
- ajout de la lecture détaillée d’un utilisateur éditable via `GET /api/users/[id]` ;
- extension de `PATCH /api/users/[id]` pour accepter `permissionCodes` ;
- lecture et restitution de l’état réel des permissions ALPHA du compte édité ;
- synchronisation bornée des permissions ALPHA via `UserPermission` ;
- UI d’édition enrichie avec cases à cocher de permissions ALPHA ;
- conservation du rôle principal unique via le champ `role` existant ;
- exclusion maintenue des comptes support globaux et bornage au tenant courant.

## Hors périmètre confirmé
- aucune création utilisateur ;
- aucun reset password ;
- aucun rattachement dépôt ;
- aucun archivage ;
- aucune refonte RBAC globale ;
- aucune création de nouvelles permissions ALPHA ;
- aucune modification Prisma structurelle.

## Validation retenue
Commandes réellement exécutées sur le dépôt de travail :
- `git apply --check` : OK ;
- `git apply` : OK ;
- `npx prisma validate` : ÉCHEC environnement hors-ligne (`getaddrinfo EAI_AGAIN binaries.prisma.sh`) ;
- `npx prisma generate` : ÉCHEC environnement hors-ligne (`getaddrinfo EAI_AGAIN binaries.prisma.sh`) ;
- `npm run lint` : OK ;
- `npm run build` : ÉCHEC en cascade sur client Prisma non régénéré (`@prisma/client` ne contient pas `RuleMode`).

## Statut
Patch applicatif USERS-10 produit et borné, avec validations Prisma bloquées par l’environnement local du ZIP au moment du contrôle.
