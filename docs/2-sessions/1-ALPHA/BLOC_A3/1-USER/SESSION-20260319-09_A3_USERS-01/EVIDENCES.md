# EVIDENCES

## Sources utilisées

### Références produit / plan

- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:398-423`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:267-330`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:385-410`
- `docs/PROTOCOLE_SESSION.md:1-39`
- `docs/SOURCES_AUTORISEES.md:1-39`

### Schéma et auth / permissions

- `prisma/schema.prisma:12-24`
- `prisma/schema.prisma:127-210`
- `lib/auth.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `types/next-auth.d.ts`

### API / UI users

- `app/api/users/route.ts:1-75`
- `app/api/users/[id]/depot/route.ts:1-66`
- `app/api/users/[id]/reset-password/route.ts:1-149`
- `app/users/page.tsx:1-46`
- `app/users/user-depot-assignment-client.tsx:1-303`
- `app/users/reset-password-client.tsx:1-221`
- `lib/services/users/assign-user-depot.ts:1-150`
- `lib/validators/user.ts:1-7`

### Dépendances planning / navigation

- `app/dashboard/page.tsx:20-50`
- `app/planning/page.tsx:9-29`
- `app/api/planning/shifts/route.ts:40-121`
- `app/api/planning/shifts/[id]/assign/route.ts:32-46`

---

## Extraits factuels clés

### 1. Le plan A3 attend une reprise complète du module users

`PLAN_DE_DEVELOPPEMENT.md` pose explicitement :

- `USERS-01 — AUDIT`
- `USERS-02 — VALIDATION — Vérification de la liste utilisateurs existante`
- `USERS-04/05 — création utilisateur`
- `USERS-06/07 — modification utilisateur`
- `USERS-08 — désactivation / archivage`
- `USERS-11 — rattachement utilisateur à une base`
- `USERS-13/14 — absences / indisponibilités`
- `USERS-15 — consultation du planning utilisateur / collègues`

### 2. Le cadrage produit confirme plusieurs manques attendus

`DOCUMENT_CADRAGE_FONCTIONNEL.md:278-329` indique :

- création utilisateur : `Statut actuel : manquant`
- modification utilisateur : `Statut actuel : manquant`
- désactivation / archivage : `Statut actuel : manquant`
- absences / indisponibilités : `Statut actuel : manquant`
- consultation du planning utilisateur : `Statut actuel : partiel`

### 3. Le schéma Prisma users reste minimal

Dans `prisma/schema.prisma:149-189`, le modèle `User` contient principalement :

- `email`
- `password`
- `name`
- `role`
- `platformRole`
- `companyId`
- `depotId`
- timestamps

Aucun champ dédié trouvé pour :

- téléphone
- statut actif/inactif
- archivage
- suppression logique (`deletedAt`)
- absences / indisponibilités

### 4. La liste utilisateurs existe côté API uniquement en GET

`app/api/users/route.ts:24-75` montre :

- route `GET` uniquement ;
- auth obligatoire via session ;
- `companyId` obligatoire ;
- permission `canManageUsers(...)` obligatoire ;
- filtre tenant : `where: { companyId, platformRole: null, role: { not: null } }` ;
- tri fixe : `orderBy: { name: "asc" }` ;
- pagination réelle absente, seul `limit` existe (`min 1`, `max 500`).

### 5. La page `/users` n’est pas une vraie liste d’administration

`app/users/page.tsx:29-44` assemble seulement :

- `<UserDepotAssignmentClient availableDepots={depots} />`
- `<ResetPasswordClient actorUserId={user.id} />`

Le texte d’introduction annonce lui-même une `Gestion minimale ALPHA des utilisateurs de société : réinitialisation de mot de passe et rattachement à une base`.

### 6. Aucune création utilisateur n’a été trouvée

Arborescence réellement présente :

- `app/api/users/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/users/page.tsx`
- `app/users/reset-password-client.tsx`
- `app/users/user-depot-assignment-client.tsx`
- `lib/services/users/assign-user-depot.ts`

Aucune route `POST /api/users` de création n’a été trouvée.  
Aucun composant UI de création utilisateur n’a été trouvé.  
Aucun service `create-user` n’a été trouvé.

### 7. Aucune modification utilisateur générale n’a été trouvée

Aucune route générale du type :

- `PATCH /api/users/[id]`
- `PUT /api/users/[id]`
- `app/users/edit-*`
- `lib/services/users/update-*`

n’a été trouvée dans les zones inspectées.

Les seuls changements utilisateur réellement disponibles sont :

- changement de `depotId`
- reset du mot de passe

### 8. Aucun mécanisme de désactivation / archivage / suppression n’a été trouvé

Aucun champ ou route users lié à :

- `isActive`
- `archivedAt`
- `deletedAt`
- `archive`
- `delete`

n’a été trouvé dans les fichiers du module users inspectés.

### 9. Le rattachement utilisateur à une base existe réellement

Preuves :

- schéma `User.depotId` et relation `Depot` : `prisma/schema.prisma:159-160`
- validator Zod : `lib/validators/user.ts:3-6`
- route PATCH dédiée : `app/api/users/[id]/depot/route.ts:27-64`
- service métier : `lib/services/users/assign-user-depot.ts:76-150`
- UI dédiée : `app/users/user-depot-assignment-client.tsx:199-303`

Règles prouvées par le code :

- user cible dans la société courante ;
- exclusion des comptes plateforme globaux ;
- dépôt actif de la société courante uniquement ;
- `depotId: null` autorisé ;
- retour de l’utilisateur mis à jour.

### 10. Le reset mot de passe existe réellement, avec garde-fous limités

Preuves :

- route dédiée : `app/api/users/[id]/reset-password/route.ts:37-149`
- UI dédiée : `app/users/reset-password-client.tsx:107-221`

Garde-fous constatés :

- auth + `canManageUsers(...)` ;
- cible limitée à la société courante ;
- exclusion des comptes plateforme globaux ;
- auto-reset interdit via cette route.

Dette constatée :

- validation mot de passe très faible : `newPassword` et `confirmPassword` sont seulement `min(1)` ;
- pas de validation UUID du paramètre `id` dans cette route, contrairement à la route dépôt.

### 11. Les rôles et permissions existent, mais pas leur administration users

Preuves :

- enum `Role` : `prisma/schema.prisma:12-20`
- enum `PlatformRole` : `prisma/schema.prisma:22-24`
- tables `Permission` et `UserPermission` : `prisma/schema.prisma:191-210`
- catalogue permissions, dont `USERS_MANAGE` : `lib/permission-catalog.ts`
- helper `canManageUsers(...)` : `lib/permissions.ts:64-65`

Limites constatées :

- `GET /api/users` n’expose pas les permissions utilisateur ;
- aucune UI d’édition rôle / permissions n’est présente ;
- aucune route de mise à jour du rôle principal n’a été trouvée.

### 12. Le support global est explicitement refusé par `canManageUsers`

Dans `lib/permissions.ts:37-44`, `hasPermissionAccess(...)` retourne `false` si `isGlobalSupport(platformRole)` est vrai.

Conséquence dans le module users :

- `app/api/users/route.ts:32-33`
- `app/api/users/[id]/depot/route.ts:35`
- `app/api/users/[id]/reset-password/route.ts:45`
- `app/users/page.tsx:17`

Ces flux refusent donc le support global côté client users actuel.

### 13. Les absences / indisponibilités utilisateur sont absentes du dépôt audité

Aucun modèle Prisma dédié users absences n’a été trouvé.  
Aucune route API users absences n’a été trouvée.  
Aucune UI users absences n’a été trouvée.

Les services planning observés utilisent des conflits temporels et le repos minimal, mais pas une source d’indisponibilités déclaratives.

### 14. La consultation du planning existe partiellement hors module users

`app/planning/page.tsx:13-28` et `app/api/planning/shifts/route.ts:40-118` montrent :

- accès lecture du planning accordé à tout utilisateur authentifié ayant `companyId` ;
- lecture multi-tenant par `companyId` ;
- inclusion des collègues (`user`, `user2`) dans la réponse.

En revanche, la route de lecture observée ne branche pas les permissions fines `PLANNING_VIEW_SELF` / `PLANNING_VIEW_GLOBAL` pourtant prévues au catalogue.

### 15. Aucun test dédié users n’a été identifié dans le dépôt inspecté

La recherche dans les zones usuelles de tests et dans les fichiers users inspectés n’a pas mis en évidence de tests dédiés au module users.
