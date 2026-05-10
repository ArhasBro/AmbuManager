# EVIDENCES

## Sources utilisées

### Documentation
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- sessions utiles `AUTH-03`, `RBAC-01` à `RBAC-07`

### Code
- `prisma/schema.prisma`
- `prisma/migrations/20260224175839_init/migration.sql`
- `prisma/migrations/20260313120000_rename_role_dea_to_ade/migration.sql`
- `prisma/seed.ts`
- `lib/auth.ts`
- `types/next-auth.d.ts`
- `lib/rbac.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/users/page.tsx`
- `app/users/reset-password-client.tsx`

---

## 1. Cadrage officiel

### 1.1 Rôle principal obligatoire
Le cadrage `06.4` impose :
- chaque utilisateur doit avoir un rôle principal unique.

### 1.2 Permissions additionnelles distinctes du rôle principal
Le cadrage `06.3` précise :
- `ADE`, `AA`, `TAXI` restent des rôles métier ;
- des permissions applicatives additionnelles peuvent s’y ajouter.

### 1.3 Bornage planifié
Le plan officiel prévoit explicitement :
- `RBAC-07` = validation du rôle principal obligatoire ;
- `RBAC-08` = correction si nécessaire ;
- `USERS-10` = affectation rôle principal + permissions lors de l’édition.

---

## 2. Preuves sur le rôle principal

### 2.1 Prisma
Dans `prisma/schema.prisma` :
- `model User` porte `role      Role` ;
- le commentaire précise : `on garde 1 rôle POUR L’INSTANT`.

### 2.2 SQL initial
Dans `prisma/migrations/20260224175839_init/migration.sql` :
- la table `User` crée bien `"role" "Role" NOT NULL`.

### 2.3 Session enrichie
Dans `lib/auth.ts` :
- `authorize()` charge `role` et `companyId` ;
- le callback `jwt()` transporte `role` et `companyId` ;
- le callback `session()` réinjecte `session.user.role` et `session.user.companyId`.

Dans `types/next-auth.d.ts` :
- `Session.user.role` et `JWT.role` sont bien typés.

Conclusion :
- aucun nouvel écart prouvé sur le rôle principal lui-même.

---

## 3. Flux users réellement présents

### 3.1 API users
Dans `app/api/users/route.ts` :
- route `GET` uniquement ;
- lecture bornée à `companyId` ;
- sélection de `role`, mais aucune écriture du rôle principal ni des permissions.

### 3.2 Reset password
Dans `app/api/users/[id]/reset-password/route.ts` :
- la route ne modifie que le mot de passe ;
- aucune écriture sur `role` ;
- aucune écriture sur `UserPermission`.

### 3.3 UI users
Dans `app/users/page.tsx` et `app/users/reset-password-client.tsx` :
- UI dédiée au reset password ;
- aucun écran complet d’édition rôle + permissions.

Conclusion :
- hors seed, aucun flux réellement présent ne stabilise ni ne déstabilise directement l’affectation rôle + permissions.

---

## 4. Preuve de la faiblesse sur le seed

### 4.1 État avant correction
Avant correction, `prisma/seed.ts` contenait :
- `if (permissionCodes.length === 0) return;`
- récupération des permissions via `findMany` ;
- ajout relationnel via `userPermission.upsert(...)` ;
- aucune suppression des permissions absentes de la nouvelle liste.

### 4.2 Conséquence factuelle
Le code précédent prouvait que :
- si un utilisateur seedé avait déjà des permissions supplémentaires en base ;
- et que la configuration seed courante en demandait moins, ou aucune ;
- alors un reseed ne revenait pas à l’état souhaité.

Cas le plus net :
- un utilisateur avec `permissions: []` n’était jamais purgé.

### 4.3 Caractère borné du correctif
La faiblesse est :
- réelle ;
- limitée au flux seed ;
- directement liée à l’affectation des permissions additionnelles ;
- corrigeable sans ouvrir `USERS-10` ni modifier le modèle `User.role`.

---

## 5. Correction réellement appliquée

Dans `prisma/seed.ts`, la fonction `setUserPermissions()` :
- déduplique désormais les codes ;
- vérifie que tous les codes demandés existent bien dans le catalogue persisté ;
- supprime les permissions non désirées pour l’utilisateur ;
- gère correctement le cas d’une liste vide ;
- recrée / conserve exactement les permissions demandées via `createMany(..., skipDuplicates: true)`.

Effet attendu :
- l’état final des `UserPermission` d’un utilisateur seedé correspond exactement à la configuration courante du seed.

---

## 6. Vérifications techniques réellement prouvées

Vérifications prouvées :
- génération du patch officiel `.diff` ;
- `git apply --check` sur le dépôt cible : `OK` ;
- application du patch sur le dépôt cible : `OK` ;
- `npm run lint` sur le dépôt cible : `OK` ;
- `npm run build` sur le dépôt cible : `OK`.
