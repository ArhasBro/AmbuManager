# EVIDENCES

## Preuves factuelles — RBAC-03

---

## 1. Cadrage officiel utile à l’audit

### 1.1 Permissions fines ALPHA attendues
Preuves documentaires :
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:385-410`

Constat :
- le cadrage attend 18 permissions fines applicatives ALPHA ;
- leur statut officiel est déjà `partiel`.

### 1.2 Modèle d’accès à l’audit attendu
Preuves documentaires :
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:412-420`

Constat :
- l’accès à l’audit doit combiner des rôles natifs et la permission dédiée `consulter audit`.

### 1.3 Consultation planning et dashboard
Preuves documentaires :
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:323-330`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:931-959`

Constat :
- la consultation du planning dépend de permissions ;
- le dashboard doit être un portail d’accès aux modules autorisés, différencié selon le profil.

### 1.4 Séquencement officiel du plan
Preuves documentaires :
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:247-255`

Constat :
- `RBAC-03` est bien une session d’audit préalable aux sessions de complétion/correction des permissions.

### 1.5 Permissions déjà confirmées par décision officielle
Preuves documentaires :
- `docs/1-master/REGISTRE_DECISIONS.md:28-34`

Constat :
- le registre confirme explicitement seulement deux permissions seedées :
  - `PLANNING_AUTOSCHEDULE`
  - `PLANNING_AUTOSCHEDULE_PUBLISH`

---

## 2. Socle technique RBAC réellement présent dans le code

### 2.1 Session enrichie avec rôle et société
Preuves code :
- `lib/auth.ts:43-65`
- `lib/auth.ts:71-113`
- `types/next-auth.d.ts:5-27`

Constat :
- `role` et `companyId` sont bien propagés jusqu’à `session.user` ;
- le typage est aligné.

### 2.2 Helper minimal de rôle
Preuves code :
- `lib/rbac.ts:1-4`

Constat :
- le contrôle par rôle central réellement présent est minimal : inclusion du rôle courant dans une liste autorisée.

### 2.3 Modèle Permission / UserPermission
Preuves code :
- `prisma/schema.prisma:151-169`
- `prisma/migrations/20260226173250_add_permissions/migration.sql:1-31`

Constat :
- la persistance des permissions existe réellement en base.

### 2.4 Helpers de permissions réellement consommés
Preuves code :
- `lib/permissions.ts:3-22`

Constat :
- seuls deux usages de permission sont réellement codés :
  - `PLANNING_AUTOSCHEDULE`
  - `PLANNING_AUTOSCHEDULE_PUBLISH`

### 2.5 Permissions réellement seedées
Preuves code :
- `prisma/seed.ts:88-114`
- `prisma/seed.ts:189-206`
- `prisma/seed.ts:261-284`

Constat :
- seules deux permissions sont créées par le seed ;
- elles sont réellement attribuées à des utilisateurs de test.

---

## 3. Contrôles d’accès réellement prouvés par zone fonctionnelle

### 3.1 Dashboard
Preuves code :
- `proxy.ts:1-10`
- `app/dashboard/page.tsx:7-23`

Constat :
- la zone `/dashboard` exige une session ;
- le lien vers `/users` est affiché seulement pour `ADMIN` / `GERANT`.

Qualification :
- contrôle d’accès prouvé ;
- permission fine `accéder au dashboard admin` non matérialisée comme permission distincte.

### 3.2 Module users
Preuves code :
- `app/users/page.tsx:10-31`
- `app/api/users/route.ts:24-57`
- `app/api/users/[id]/reset-password/route.ts:36-107`

Constat :
- la page users, la liste users et le reset password sont réservés à `ADMIN` / `GERANT`.

Qualification :
- capacité partiellement prouvée pour `gérer utilisateurs` ;
- absence de permission fine distincte ;
- absence de gestion complète des rôles/permissions.

### 3.3 Module véhicules
Preuves code :
- `app/vehicles/page.tsx:9-42`
- `app/api/vehicles/route.ts:24-130`

Constat :
- lecture véhicules : `ADMIN` / `GERANT` ;
- création et suppression API : `ADMIN` uniquement.

Qualification :
- capacité partielle `gérer véhicules` ;
- asymétrie réelle `GERANT` / `ADMIN` ;
- aucune permission fine distincte prouvée.

### 3.4 Règles société
Preuves code :
- `app/api/company/rules/route.ts:8-135`
- `app/planning/planning-client.tsx:565-635`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:15-16`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:183-204`

Constat :
- lecture de règles : tous utilisateurs authentifiés ;
- écriture : `ADMIN` / `GERANT` ;
- usage prouvé au moins pour `PLANNING_VIEW_MODE` et `PLANNING_MIN_REST_HOURS`.

Qualification :
- capacité partielle `gérer règles métier` ;
- pas de permission fine distincte prouvée.

### 3.5 Consultation planning
Preuves code :
- `app/planning/page.tsx:8-18`
- `app/api/planning/shifts/route.ts:40-121`

Constat :
- toute session avec `id` + `companyId` peut accéder à la page planning et lire les shifts de la société.

Qualification :
- consultation planning global prouvée comme capacité ;
- distinction `consulter son planning` / `consulter le planning global` non prouvée comme permissions distinctes.

### 3.6 Modification planning par assignation
Preuves code :
- `app/api/planning/shifts/[id]/assign/route.ts:35-256`
- `lib/services/planning/assign-shift.ts:53-199`
- `lib/services/planning/assign-draftshift.ts:53-196`
- `app/planning/planning-client.tsx:1079-1135`
- `app/planning/planning-client.tsx:1493-1517`

Constat :
- l’assignation manuelle existe réellement sur draft shift et shift publié ;
- l’accès est réservé à `ADMIN` / `GERANT`.

Qualification :
- `modifier le planning` : partiel ;
- `modifier un shift publié` : partiel ;
- `créer un shift manuel` : non prouvé ;
- `supprimer / annuler métier un shift publié` : non prouvé.

### 3.7 Autoschedule / matching / runs
Preuves code :
- `app/api/planning/autoschedule/day/route.ts:68-84`
- `app/api/planning/autoschedule/week/route.ts:93-108`
- `app/api/planning/autoschedule/runs/route.ts:59-70`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts:46-58`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:307-324`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts:8-25`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts:19-41`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts:48-70`
- `lib/permissions.ts:15-22`

Constat :
- `canAutoSchedule()` protège day/week/runs/cancel/match ;
- `canPublishAutoSchedule()` protège publish ;
- `ADMIN` / `GERANT` ont un accès natif ;
- d’autres rôles peuvent passer par permission DB dédiée.

Qualification :
- `lancer autoschedule` : prouvée ;
- `publier un run` : prouvée ;
- `annuler un run` : partielle car réutilise `PLANNING_AUTOSCHEDULE` au lieu d’une permission distincte.

### 3.8 Lecture détaillée d’un run et audit planning
Preuves code :
- `app/api/planning/autoschedule/runs/[id]/route.ts:47-127`
- `lib/services/planning/planning-audit.ts:1-28`
- `prisma/schema.prisma:46-83`

Constat :
- des logs d’audit planning sont bien écrits ;
- ils sont relus dans l’endpoint détail run ;
- cet endpoint est limité à `ADMIN` / `GERANT`.

Qualification :
- consultation d’éléments d’audit partiellement prouvée ;
- permission dédiée `consulter audit` absente ;
- page audit dédiée absente.

---

## 4. Zones explicitement absentes ou non démontrées

### 4.1 Gestion rôles / permissions
Recherche utile :
- aucune route/page de gestion dédiée trouvée dans `app/` ou `lib/`.

Conclusion :
- permission `gérer rôles/permissions` non prouvée.

### 4.2 Gestion templates
Recherche utile :
- `ShiftTemplate` existe en schéma/seed ;
- aucun module de gestion prouvé dans les routes/pages inspectées.

Conclusion :
- permission `gérer templates` non prouvée.

### 4.3 Création manuelle / suppression métier / export planning
Recherche utile :
- aucune route API `POST /api/planning/shifts` de création manuelle ;
- aucune suppression logique de shift publié prouvée ;
- aucun export planning prouvé.

Conclusion :
- ces permissions restent absentes sur le périmètre inspecté.

---

## 5. Distinction conservée entre RBAC et multi-tenant

Preuves code :
- `lib/auth.ts:83-113`
- `app/api/*` inspectées avec consommation de `companyId`

Constat :
- le dépôt applique largement `companyId` dans les routes et services ;
- ce mécanisme borne les données par société ;
- il ne constitue pas, à lui seul, une permission RBAC métier distincte.

Conclusion méthodologique :
- le multi-tenant contribue au contrôle d’accès ;
- il n’a pas été comptabilisé comme permission fine ALPHA.
