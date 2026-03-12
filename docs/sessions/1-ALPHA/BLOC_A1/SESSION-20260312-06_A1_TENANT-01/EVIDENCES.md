# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

### Documentation officielle
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/master/ETAT_GLOBAL_PROJET.md`
- sessions précédentes utiles `AUTH-01`, `AUTH-03`, `AUTH-05`, `AUTH-06`

### Code réel inspecté
- auth / session : `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`, `types/next-auth.d.ts`, `proxy.ts`
- persistance : `prisma/schema.prisma`
- permissions : `lib/permissions.ts`
- API users / véhicules / règles / planning / health
- pages `/users`, `/vehicles`, `/planning`, `/dashboard`
- services planning portant le filtrage tenant

## 1. Attendu officiel du multi-tenant

### 1.1 Document maître
Source : `docs/master/DOCUMENT_MAITRE.md`

Preuves :
- ligne 20 : fonctionnement multi-tenant strict visé
- lignes 45 à 47 : `Multi-tenant strict via companyId` et `Cloisonnement par société`

Constat :
- le dépôt n’a pas seulement un souhait d’isolation ;
- le cloisonnement strict fait partie des principes non négociables.

### 1.2 Registre des décisions
Source : `docs/master/REGISTRE_DECISIONS.md`

Preuves :
- ligne 25 : `Multi-tenant strict via companyId`
- ligne 28 : `NextAuth (JWT) session enrichie (role, companyId)`

Constat :
- l’attendu officiel combine bien portage du tenant et contrôle applicatif.

### 1.3 Cadrage fonctionnel
Source : `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Preuves :
- lignes 151 à 160 : `03.1 Isolation stricte par société`, statut `partiel`
- lignes 1098 à 1105 : `18.2 Cloisonnement multi-tenant uniforme`, statut `partiel`

Constat :
- le cadrage reconnaît explicitement que l’isolation est présente mais non encore prouvée uniformément partout.

## 2. Représentation et propagation réelle du tenant

### 2.1 Chargement du tenant dans l’auth
Source : `lib/auth.ts` (lignes 43 à 65)

Preuves :
- `authorize()` charge `companyId: true` depuis `prisma.user.findUnique`
- la valeur est renvoyée dans l’objet utilisateur authentifié

Constat :
- le tenant est porté dès le login.

### 2.2 Portage dans le JWT
Source : `lib/auth.ts` (lignes 72 à 104)

Preuves :
- `if (isNonEmptyString(u.companyId)) token.companyId = u.companyId;`
- réhydratation DB possible si `companyId` manque ensuite

Constat :
- le tenant reste disponible au-delà de la première requête.

### 2.3 Portage dans la session finale
Sources :
- `lib/auth.ts` (lignes 107 à 116)
- `types/next-auth.d.ts` (lignes 6 à 27)

Preuves :
- `session.user.companyId = ...`
- `Session.user.companyId?: string`
- `User.companyId?: string`
- `JWT.companyId?: string`

Constat :
- `companyId` n’est pas théorique ; il est réellement exposé à l’application.

### 2.4 Protection des pages applicatives
Source : `proxy.ts` (lignes 1 à 10)

Preuves :
- middleware `withAuth`
- matcher : `"/dashboard/:path*", "/vehicles/:path*", "/planning/:path*", "/users/:path*"`

Constat :
- les pages principales du périmètre inspecté sont protégées à l’entrée.

## 3. Persistance Prisma réellement tenantisée

Source : `prisma/schema.prisma`

### 3.1 Modèles métier avec `companyId`
Preuves :
- `PlanningAuditLog` lignes 61 à 86
- `User` lignes 116 à 149
- `CompanyRule` lignes 172 à 185
- `ShiftTemplate` lignes 187 à 216
- `MaintenanceType` lignes 218 à 231
- `Vehicle` lignes 234 à 253
- `AutoScheduleRun` lignes 257 à 286
- `DraftShift` lignes 289 à 327
- `Shift` lignes 330 à 371

Constat :
- la majorité des données métier actuellement livrées portent un `companyId` explicite avec relation `Company`.

### 3.2 Modèles sans `companyId` explicite
Preuves :
- `Permission` lignes 151 à 159
- `UserPermission` lignes 161 à 170
- `Company` est l’entité racine, sans `companyId` par définition

Constat :
- la persistance permissions n’exprime pas directement le tenant ;
- le rattachement au tenant y est indirect via `User`.

## 4. Preuves API — lectures et écritures bornées

### 4.1 Listing utilisateurs
Source : `app/api/users/route.ts` (lignes 24 à 57)

Preuves :
- `if (!session?.user?.companyId) return unauthorized();`
- `const companyId = session.user.companyId;`
- `prisma.user.findMany({ where: { companyId } ... })`

Constat :
- lecture intra-société prouvée.

### 4.2 Reset password d’un autre utilisateur
Source : `app/api/users/[id]/reset-password/route.ts` (lignes 36 à 93)

Preuves :
- session exige `actorUserId` + `companyId`
- recherche cible : `where: { id: targetUserId, companyId }`
- mise à jour finale ensuite par `where: { id: targetUser.id }`

Constat :
- la cible est bien bornée à la société courante avant mutation ;
- la mutation finale n’est cependant pas rebornée par `companyId` dans la requête d’écriture elle-même.

### 4.3 API véhicules
Source : `app/api/vehicles/route.ts` (lignes 26 à 131)

Preuves :
- GET : `findMany({ where: { companyId } })`
- POST : `create({ data: { companyId, ... } })`
- DELETE : prélecture `findFirst({ where: { id, companyId } })`, puis `delete({ where: { id } })`

Constat :
- lecture et création sont explicitement tenantisées ;
- la suppression finale repose sur une pré-vérification bornée.

### 4.4 API règles société
Source : `app/api/company/rules/route.ts` (lignes 25 à 135)

Preuves :
- GET : `findMany({ where: { companyId, ... } })`
- PATCH : `upsert({ where: { companyId_key: { companyId, key } } ... create: { companyId, ... } })`

Constat :
- lecture et écriture sont explicitement tenantisées.

### 4.5 API shifts publiés
Source : `app/api/planning/shifts/route.ts` (lignes 40 à 117)

Preuves :
- session exige `companyId`
- `let where: Prisma.ShiftWhereInput = { companyId }`
- `prisma.shift.findMany({ where, ... })`

Constat :
- lecture planning publié bornée à la société courante.

### 4.6 API assignation d’un shift / draft
Source : `app/api/planning/shifts/[id]/assign/route.ts` (lignes 31 à 289)

Preuves :
- recherche prioritaire du `DraftShift` : `where: { id, companyId }`
- sinon `Shift` : `where: { id, companyId }`
- validation des utilisateurs / véhicules proposés : `findFirst({ where: { id: uid, companyId } })`
- refetch final borné sur `companyId`

Constat :
- l’API ne laisse pas affecter un user / véhicule d’une autre société sur le périmètre inspecté.

### 4.7 Services d’assignation planning
Sources :
- `lib/services/planning/assign-draftshift.ts` (lignes 52 à 259)
- `lib/services/planning/assign-shift.ts` (lignes 52 à 260)

Preuves :
- chargement initial par `findFirst({ where: { id: ..., companyId } })`
- recherches de conflits `shift` / `draftShift` filtrées par `companyId`
- règles société chargées par clé composite `companyId_key`
- écriture d’audit avec `companyId`
- update final par `id` seul après lecture bornée

Constat :
- les contrôles métier inter-tenant sont présents ;
- l’écriture finale reste fondée sur une pré-vérification applicative.

### 4.8 Génération autoschedule DAY
Source : `app/api/planning/autoschedule/day/route.ts` (lignes 68 à 199)

Preuves :
- session : lecture de `companyId`
- run DRAFT existant recherché avec `companyId`
- templates recherchés avec `companyId`
- `autoScheduleRun.create({ data: { companyId, ... } })`
- `draftShift.createMany()` avec `companyId` injecté dans chaque draft
- read final : `findFirst({ where: { id: run.id, companyId } })`

Constat :
- création DAY tenantisée de bout en bout sur le périmètre inspecté.

### 4.9 Génération autoschedule WEEK
Source : `app/api/planning/autoschedule/week/route.ts` (lignes 93 à 240)

Preuves :
- même logique que DAY : session `companyId`, recherche run existant par `companyId`, templates filtrés par `companyId`, créations `run` + `drafts` avec `companyId`, relecture finale bornée

Constat :
- création WEEK tenantisée de bout en bout sur le périmètre inspecté.

### 4.10 Liste des runs autoschedule
Source : `app/api/planning/autoschedule/runs/route.ts` (lignes 56 à 153)

Preuves :
- `const where: Prisma.AutoScheduleRunWhereInput = { companyId, ... }`
- `prisma.autoScheduleRun.findMany({ where, ... })`

Constat :
- listing des runs borné à la société courante.

### 4.11 Détail d’un run autoschedule
Source : `app/api/planning/autoschedule/runs/[id]/route.ts` (lignes 47 à 154)

Preuves :
- `prisma.autoScheduleRun.findFirst({ where: { id: runId, companyId } ... })`
- `draftShifts` et `planningAuditLogs` sont lus à partir du run déjà borné

Constat :
- lecture détaillée d’un run bornée à la société courante.

### 4.12 Cancel d’un run autoschedule
Source : `app/api/planning/autoschedule/runs/[id]/cancel/route.ts` (lignes 93 à 130)

Preuves :
- prélecture du run : `findFirst({ where: { id: runId, companyId } })`
- update final : `update({ where: { id: runId } ... })`
- audit écrit avec `companyId`

Constat :
- la possession tenant est vérifiée avant mutation ;
- la mutation finale n’est pas rebornée directement.

### 4.13 Publish d’un run autoschedule
Source : `app/api/planning/autoschedule/runs/[id]/publish/route.ts` (lignes 358 à 450)

Preuves :
- run : `findFirst({ where: { id: runId, companyId } })`
- drafts : `findMany({ where: { runId: run.id, companyId } })`
- contrôles de conflits et repos minimum reçoivent `companyId`
- publication : `shift.createMany({ data: drafts.map(d => ({ companyId: d.companyId, ... })) })`
- clôture du run : `updateMany({ where: { id: run.id, companyId } ... })`

Constat :
- publication bornée au tenant, y compris sur la création des `Shift` publiés.

### 4.14 Matching preview / apply
Sources :
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts` (lignes 19 à 75)
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts` (lignes 48 à 132)
- `lib/services/planning/matching.service.ts` (lignes 96 à 327)

Preuves :
- preview / apply refusent l’absence de `companyId`
- le service lit `draftShift.findMany({ where: { runId, run: { companyId } } })`
- les users candidats sont cherchés avec `where: { companyId, role: ... }`
- l’apply met à jour via `updateMany` avec `run: { companyId }`

Constat :
- matching planning tenantisé sur le périmètre inspecté.

### 4.15 Permissions applicatives indirectes
Source : `lib/permissions.ts` (lignes 1 à 22)

Preuves :
- `hasPermission(userId, code)` filtre `userPermission` par `userId` + `permission.code`
- aucun `companyId` dans cette requête

Constat :
- le contrôle repose ici sur l’identité utilisateur déjà authentifiée ;
- le tenant y est indirect, pas explicite dans la requête permissions.

## 5. Preuves UI / consommation réelle du tenant

### 5.1 Page véhicules
Source : `app/vehicles/page.tsx` (lignes 9 à 43)

Preuves :
- page exige session + rôle + `user.companyId`
- lecture Prisma : `findMany({ where: { companyId } })`

Constat :
- consommation serveur réelle de `companyId` sur une page métier.

### 5.2 Page utilisateurs
Source : `app/users/page.tsx` (lignes 10 à 32)

Preuves :
- `if (!user?.id || !user.companyId) redirect("/login")`
- accès réservé `ADMIN` / `GERANT`

Constat :
- l’UI du périmètre users dépend bien d’une session tenantisée.

### 5.3 Page planning
Source : `app/planning/page.tsx` (lignes 1 à 9)

Preuves :
- aucune lecture directe base / session dans cette page
- protection portée par `proxy.ts` + APIs planning

Constat :
- pas de fuite directe prouvée ici ;
- cloisonnement UI plus indirect que sur `/vehicles`.

## 6. Preuve négative / risque réel

### 6.1 Route health non uniformément cloisonnée
Source : `app/api/health/prisma/route.ts` (lignes 8 à 25)

Preuves :
- session exige `session.user.companyId`
- mais les données renvoyées sont :
  - `const companies = await prisma.company.count();`
  - `const users = await prisma.user.count();`
- aucun `where: { companyId }`

Constat :
- cette route renvoie des agrégats globaux et non les comptes de la société courante ;
- il s’agit d’une preuve réelle de non-uniformité du cloisonnement multi-tenant.

## 7. Conclusion de preuve

Conclusion factuelle retenue :
1. `companyId` est bien le porteur tenant réel du dépôt inspecté.
2. Le portage `auth -> JWT -> session -> API/services` est prouvé.
3. Les principaux modèles métier livrés sont tenantisés en persistance.
4. Les principales routes métier inspectées sont bien cloisonnées en lecture et en création.
5. Les protections contre lecture / modification inter-tenant sont globalement présentes sur le périmètre inspecté.
6. Le cloisonnement n’est cependant pas uniforme : au moins une route inspectée (`/api/health/prisma`) expose une vue globale non filtrée.
7. Certaines mutations restent sûres surtout par pré-vérification applicative, avec un bornage tenant moins explicite sur la requête d’écriture finale.
