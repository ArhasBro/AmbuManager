# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## 1. Sources documentaires autorisées utilisées

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-03_A1_RBAC-02/RESULTATS.md`

## 2. Cadrage documentaire — preuves utiles

### 2.1 Le produit exige bien un rôle principal en session
Source : `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Preuve utile :
- `02.2` précise que la session contient au minimum l’identité, le rôle principal et l’identifiant société.

Constat :
- la cohérence `rôle principal ↔ session` fait bien partie du cadrage officiel.

### 2.2 Le produit exige bien un rôle principal unique
Source : `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Preuve utile :
- `06.4` : chaque utilisateur doit avoir un rôle principal unique.

Constat :
- la règle à valider dans `RBAC-07` est explicite.

### 2.3 Le plan borne strictement `RBAC-07`
Source : `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`

Preuves utiles :
- `RBAC-07` = validation du rôle principal obligatoire ;
- `RBAC-08` = correction si nécessaire.

Constat :
- `RBAC-07` ne doit ni corriger, ni ouvrir le multi-rôle.

## 3. Preuves issues des sessions précédentes

### 3.1 `AUTH-03` a déjà validé le portage de `role` et `companyId`
Source : `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md`

Constat :
- la chaîne `auth → JWT → session` est déjà prouvée sur le périmètre `role` + `companyId`.

### 3.2 `RBAC-01` a déjà constaté un rôle principal obligatoire
Source : `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/RESULTATS.md`

Constat :
- l’audit rôles a déjà identifié `User.role` comme champ obligatoire et support du rôle principal.

### 3.3 `RBAC-02` a réaligné `DEA` vers `ADE`
Source : `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-03_A1_RBAC-02/RESULTATS.md`

Constat :
- le catalogue courant porte désormais `ADE`.

## 4. Preuves code — modèle et persistance

### 4.1 Enum de rôles réellement présente
Sources :
- `prisma/schema.prisma`
- `prisma/migrations/20260224175839_init/migration.sql`

Constats :
- un enum `Role` existe réellement dans Prisma ;
- un type PostgreSQL `Role` existe réellement dans la migration initiale.

### 4.2 Champ `User.role` obligatoire et unique
Sources :
- `prisma/schema.prisma`
- `prisma/migrations/20260224175839_init/migration.sql`

Constats :
- `User.role` est un champ scalaire `Role` ;
- la migration initiale impose `"role" "Role" NOT NULL` ;
- aucune relation ou table de composition multi-rôle n’est visible sur `User`.

### 4.3 Évolution ADE correctement portée
Source : `prisma/migrations/20260313120000_rename_role_dea_to_ade/migration.sql`

Constat :
- la migration de renommage `DEA` → `ADE` existe réellement.

## 5. Preuves code — seed et flux utilisateurs

### 5.1 Seed utilisateur cohérent avec un rôle unique
Source : `prisma/seed.ts`

Constats :
- `upsertUser()` prend un unique `role: Role` ;
- les écritures Prisma reprennent `role: params.role` ;
- les seeds inspectés créent des comptes à rôle unique (`ADMIN`, `BUREAU`).

### 5.2 Flux users API cohérents
Sources :
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`

Constats :
- la liste users renvoie un unique `role` ;
- le reset password ne modifie pas le rôle ;
- aucun flux multi-rôle n’y est introduit.

### 5.3 Flux users UI cohérents
Sources :
- `app/users/page.tsx`
- `app/users/reset-password-client.tsx`

Constats :
- l’accès page repose sur un unique `user.role` ;
- l’UI affiche un unique rôle par utilisateur.

## 6. Preuves code — auth / session

### 6.1 Chargement du rôle depuis la base
Source : `lib/auth.ts`

Constat :
- `authorize()` sélectionne explicitement `role` et `companyId`.

### 6.2 Hydratation JWT puis session
Sources :
- `lib/auth.ts`
- `types/next-auth.d.ts`

Constats :
- `token.role` et `token.companyId` sont alimentés ;
- `session.user.role` et `session.user.companyId` sont exposés ;
- le typage NextAuth reflète ce portage.

### 6.3 Cohérence avec un modèle à rôle unique
Sources :
- `lib/auth.ts`
- `types/next-auth.d.ts`

Constat :
- aucun tableau de rôles ni structure multi-rôle n’est transporté par la session.

## 7. Preuves code — usage métier complémentaire

### 7.1 Matching planning fondé sur le rôle unique de l’utilisateur
Source : `lib/services/planning/matching.service.ts`

Constat :
- la recherche des utilisateurs se fait par `User.role` avec `role: { in: requiredRoles }` ;
- le moteur métier continue donc à s’appuyer sur un rôle principal unique stocké sur `User`.

## 8. Vérifications techniques réellement exécutées

### 8.1 Recherche textuelle d’une structure multi-rôle active
Commande exécutée :
- recherche `UserRole`, `userRoles`, `roles[]`, `Role[]`, `assignedRoles`, `multi-rôle` dans `prisma`, `lib`, `app`, `types`

Résultat réellement obtenu :
- aucune structure active trouvée ;
- seule une mention de futur multi-rôle apparaît dans le commentaire de `prisma/schema.prisma`.

### 8.2 Recherche textuelle des écritures utilisateur liées au rôle
Commande exécutée :
- recherche `upsertUser`, `role: params.role`, `role: Role.*`, `prisma.user.create|upsert|update|updateMany`

Résultat réellement obtenu :
- l’écriture de rôle réellement visible est portée par le seed ;
- `reset-password` met à jour le mot de passe seulement ;
- aucun flux utilisateur inspecté n’écrit plusieurs rôles.

### 8.3 `npm run lint` / `npm run build`
Résultat :
- non exécutés dans cette session.

Raison factuelle :
- `node_modules` est absent de l’environnement de travail extrait ;
- relancer ces commandes n’était pas réellement faisable ici sans installation préalable hors périmètre.

## 9. Ce qui reste explicitement non prouvé

N’est pas prouvé dans cette session :
- une UI complète de création / édition utilisateur ;
- un contrôle runtime sur une base déjà peuplée en dehors du code fourni ;
- une future modélisation multi-rôle.

Ces points ne remettent pas en cause la validation du périmètre exact `RBAC-07`.
