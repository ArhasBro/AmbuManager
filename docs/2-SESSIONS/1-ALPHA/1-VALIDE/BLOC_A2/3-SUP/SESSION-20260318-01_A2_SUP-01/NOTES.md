# NOTES.md

## Notes de méthode
- Audit réalisé en **lecture seule** sur le ZIP fourni.
- Aucun patch produit.
- Aucun changement code.
- Aucun changement Prisma.
- Aucune anticipation d’implémentation détaillée de `SUP-02`.

## Points de preuve clés

### Auth / session
- `lib/auth.ts:43-66` : le login hydrate `role` et `companyId` depuis `User`.
- `lib/auth.ts:107-117` : la session expose `session.user.id`, `session.user.role`, `session.user.companyId`.
- `types/next-auth.d.ts:6-27` : types session/JWT enrichis.

### Modèle User
- `prisma/schema.prisma:12-20` : enum `Role` sans rôle support global.
- `prisma/schema.prisma:145-183` : `User.companyId` obligatoire + relation obligatoire vers `Company`.

### RBAC
- `lib/rbac.ts:1-4` : helper minimal par liste de rôles.
- `lib/permissions.ts:4-41` : accès natif réservé à `ADMIN` / `GERANT`, sans notion plateforme.
- `lib/permissions.ts:43-81` : helpers de permissions liés à un `userId` déjà tenantisé.

### Tenant scoping
- `app/api/users/route.ts:24-45` : liste users bornée à `companyId`.
- `app/api/vehicles/route.ts:43-76` : liste véhicules bornée à `companyId`.
- `app/api/company/profile/route.ts:37-60` : update société borné à la société de session.
- `app/api/planning/shifts/[id]/assign/route.ts:68-159` : draft/shift + ownership checks via `companyId`.
- `lib/services/users/assign-user-depot.ts:48-87` : user et dépôt bornés au tenant.
- `lib/services/vehicles/assign-vehicle-depot.ts:48-88` : véhicule et dépôt bornés au tenant.

### UI
- `app/dashboard/page.tsx:31-52` : dashboard sans espace global multi-sociétés.
- `app/company/page.tsx:22-42`, `app/depots/page.tsx:14-32`, `app/users/page.tsx:12-27`, `app/vehicles/page.tsx:9-50`, `app/planning/page.tsx:9-23` : pages toutes bornées à `user.companyId`.

### Audit existant
- `prisma/schema.prisma:61-86` : `PlanningAuditLog` minimal, centré planning.
- `lib/services/planning/planning-audit.ts:5-28` : écriture audit sans notion support, sans motif obligatoire.

### Seed / contournement visible
- `prisma/seed.ts:206-315` : présence de comptes `ADMIN` par société A/B.
- Aucun compte support global dédié n’est visible dans le seed.

## Réponse stricte aux points d’audit obligatoires

### 1. Authentification
- structure NextAuth : **oui**
- contenu réel de session `session.user` : `id`, `role`, `companyId`, plus `email`/`name`
- rôle global : **non visible**
- compte hors company : **non visible**

### 2. Modèle User
- champ `role` : **oui**
- nature : **enum Prisma**
- champ `companyId` : **oui**
- user sans company : **non supporté par le schéma**

### 3. RBAC actuel
- rôles utilisés : **comparaisons directes + helpers permissions**
- checks `ADMIN` / `USER` : **ADMIN / GERANT oui ; USER au sens générique non**
- notion globale multi-tenant : **non**

### 4. Multi-tenant
- vérification `companyId` : **oui, largement visible**
- accès cross-company : **non visible**
- mécanismes de sécurité actuels : **session enrichie + filtres `companyId` + checks rôle/permissions**

### 5. API
- bypass admin global : **non visible**
- routes bornées au tenant : **oui sur le périmètre API métier inspecté**

### 6. UI
- espace global : **non**
- éléments cross-company : **non**

### 7. Logique métier
- besoin support implicite : **oui, confirmé par le cadrage et les limites actuelles**
- contournements actuels éventuels : **aucun mécanisme officiel visible ; usage de comptes admin tenant par tenant seulement plausible, non prouvé comme procédure officielle**

## Point volontairement non affirmé
La procédure opérationnelle réellement utilisée aujourd’hui par le propriétaire pour dépanner un client n’est pas visible dans le dépôt.

Formulation conforme protocole :
**INFORMATION NON FOURNIE — À CONFIRMER**
