# SESSION

## ID SESSION

`SESSION-20260319-10_A3_USERS-02`

## Date

19/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : `1-ALPHA`  
Bloc : `A3`  
Code session : `USERS-02`  
Type : `VALIDATION`  
Intitulé : `Vérification de la liste utilisateurs existante`

## Objectif de la session

Valider strictement l’existant de la **liste utilisateurs** afin de déterminer, sur la base du dépôt réel, si elle constitue déjà :

- une fonctionnalité identifiable ;
- une liste réellement administrable au niveau attendu du bloc A3 ;
- ou seulement une source de données minimale nécessitant bien une correction / stabilisation via `USERS-03`.

## Sources de référence relues avant validation

- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`

## Périmètre exact traité

Validation en lecture seule des éléments réellement impliqués par la liste utilisateurs existante :

- `app/api/users/route.ts`
- `app/users/page.tsx`
- `app/users/reset-password-client.tsx`
- `app/users/user-depot-assignment-client.tsx`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/planning/planning-client.tsx`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/auth.ts`
- `lib/rbac.ts`
- `prisma/schema.prisma`
- `lib/validators/user.ts`
- `lib/api/response.ts`
- `app/dashboard/page.tsx`

## Résultat synthétique de session

La liste utilisateurs **existe réellement**, mais **pas comme vraie liste d’administration validable pour le bloc A3**.

État réel confirmé :

- une route `GET /api/users` existe ;
- cette route est protégée par session + permission `canManageUsers(...)` ;
- elle applique bien un cloisonnement multi-tenant ;
- elle exclut les comptes support globaux ;
- elle ne propose qu’un seul paramètre d’entrée : `limit` ;
- le tri est fixe par `name asc` ;
- il n’existe pas de pagination réelle ;
- l’UI `/users` n’affiche pas une table dédiée : elle assemble uniquement deux widgets consommateurs de cette source ;
- la même source est également réutilisée côté planning ;
- la fonctionnalité prouvée est donc une **source de sélection partagée**, pas une **liste utilisateurs administrable complète**.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-10_A3_USERS-02/`
- Patch : `docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-10_A3_USERS-02/`

## Règle de session respectée

- validation strictement en lecture seule ;
- aucun changement code applicatif ;
- aucun changement Prisma ;
- aucun changement RBAC ;
- aucun patch fonctionnel ;
- aucune implémentation de `USERS-03` dans cette session.
