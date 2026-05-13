# RESULTATS.md

## SESSION
- ID : `SESSION-20260318-01_A2_SUP-01`
- Stage : `1-ALPHA`
- Bloc : `A2`
- Type : `AUDIT`
- Intitulé : `Audit du besoin réel support propriétaire dans l’existant`

## Sources réellement inspectées

### Référentiel projet
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/4-templates/TEMPLATE_RECAP_SESSION.md`
- `docs/4-templates/TEMPLATE_DOD_4_4.md`

### Code réellement inspecté
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `types/next-auth.d.ts`
- `lib/auth.ts`
- `lib/rbac.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/services/depots/*.ts`
- `lib/services/users/assign-user-depot.ts`
- `lib/services/vehicles/assign-vehicle-depot.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/planning-audit.ts`
- l’ensemble des routes `app/api/**/route.ts`
- les pages UI serveur principales `app/dashboard/page.tsx`, `app/company/page.tsx`, `app/depots/page.tsx`, `app/users/page.tsx`, `app/vehicles/page.tsx`, `app/planning/page.tsx`, `app/login/page.tsx`

---

# 1. ÉTAT ACTUEL

## 1.1 Référence produit
Le cadrage officiel confirme explicitement que le **rôle support propriétaire / assistance globale** fait partie du produit cible, mais avec un **statut actuel = manquant** sur les points clés : rôle distinct, accès multi-sociétés, compte nominatif, visibilité côté client et audit renforcé (`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:59-107`).

Le plan de développement confirme que `SUP-01` est bien un **audit préalable** avant toute modélisation (`SUP-02`) et toute traçabilité renforcée (`SUP-05`) (`docs/1-master/PLAN_DE_DEVELOPPEMENT.md:328-360`).

## 1.2 Authentification
La structure d’authentification repose sur **NextAuth + CredentialsProvider + session JWT** (`lib/auth.ts:21-123`, `app/api/auth/[...nextauth]/route.ts:1-6`).

Au login, le code charge en base :
- `id`
- `email`
- `name`
- `role`
- `companyId`

puis les injecte dans le token et la session (`lib/auth.ts:43-66`, `lib/auth.ts:71-117`).

La session applicative enrichie contient donc réellement :
- `session.user.id`
- `session.user.role`
- `session.user.companyId`

(`types/next-auth.d.ts:6-27`, `lib/auth.ts:107-117`).

**Constat d’audit :** la session est bien enrichie, mais elle ne transporte **aucun marqueur de rôle global plateforme** distinct d’un rôle métier de société.

## 1.3 Modèle User
Le modèle Prisma `User` contient :
- un champ `role`
- un champ `companyId`
- une relation obligatoire vers `Company`

(`prisma/schema.prisma:145-183`).

Le champ `role` est un **enum Prisma `Role`** et non une string libre. Les valeurs visibles sont :
- `ADMIN`
- `GERANT`
- `BUREAU`
- `ADE`
- `AA`
- `TAXI`
- `REGULATEUR`

(`prisma/schema.prisma:12-20`).

Le champ `companyId` est **obligatoire** en base (`prisma/schema.prisma:150-152`).

**Conclusion technique stricte :**
- un user sans société n’est **pas modélisé** dans le schéma actuel ;
- un compte “hors company” n’est donc **pas supporté techniquement** par la structure Prisma actuelle ;
- la typage TypeScript rend `companyId` optionnel dans la session/JWT (`types/next-auth.d.ts:11-12`, `types/next-auth.d.ts:18-19`, `types/next-auth.d.ts:25-26`), mais côté persistance réelle le `User` reste rattaché à une société.

## 1.4 RBAC actuel
Le RBAC visible est de trois natures :

1. **Contrôles directs par rôle**
- ex. `ADMIN` / `GERANT` pour profil société et dépôts (`app/company/page.tsx:18-27`, `app/depots/page.tsx:10-19`, `app/api/company/profile/route.ts:19-44`, `app/api/depots/route.ts:11-29`).

2. **Helper minimal `requireRole`**
- simple inclusion dans une liste autorisée (`lib/rbac.ts:1-4`).

3. **RBAC par permissions avec accès natif ADMIN/GERANT**
- `hasNativeAccess(role) => ADMIN || GERANT`
- puis permissions additionnelles par `userPermission`

(`lib/permissions.ts:4-41`).

Les helpers métier (`canManageUsers`, `canManageVehicles`, `canAutoSchedule`, `canEditPlanning`, etc.) n’introduisent **aucune notion de rôle plateforme global** (`lib/permissions.ts:43-81`).

**Constat d’audit :**
- `ADMIN` est un **admin de tenant**, pas un super-admin plateforme ;
- aucun code n’exprime un rôle `SUPPORT`, `SUPER_ADMIN`, `OWNER`, `PLATFORM_ADMIN` ou équivalent ;
- le RBAC actuel est intégralement pensé autour d’un utilisateur rattaché à une société.

## 1.5 Multi-tenant
Le produit est explicitement cadré en **multi-tenant strict via `companyId`** (`docs/1-master/DOCUMENT_MAITRE.md:45-53`, `docs/1-master/REGISTRE_DECISIONS.md:25-29`).

Le schéma Prisma rattache les entités métier à `companyId` :
- `User`
- `Depot`
- `Vehicle`
- `CompanyRule`
- `ShiftTemplate`
- `MaintenanceType`
- `AutoScheduleRun`
- `DraftShift`
- `Shift`
- `PlanningAuditLog`

(`prisma/schema.prisma`, notamment `61-86`, `123-143`, `145-183`, `206-250`, `274-412`).

Les services inspectés appliquent aussi le filtrage tenant :
- dépôts via `id + companyId` (`lib/services/depots/archive-depot.ts:28-44`, `lib/services/depots/update-depot.ts:10-37`)
- rattachement user/dépôt via `userId + companyId` et `depotId + companyId` (`lib/services/users/assign-user-depot.ts:48-87`)
- rattachement véhicule/dépôt via `vehicleId + companyId` et `depotId + companyId` (`lib/services/vehicles/assign-vehicle-depot.ts:48-88`)
- matching planning via `run.companyId`, `user.companyId`, `shift.companyId` (`lib/services/planning/matching.service.ts:96-257`)

**Constat d’audit :** l’architecture actuelle protège la séparation des sociétés par répétition systématique de `companyId`.

## 1.6 API
Sur les routes API inspectées, toutes les routes métier lisent la session puis récupèrent `session.user.companyId`, avec rejet en 401 si absent. Exemples représentatifs :
- véhicules (`app/api/vehicles/route.ts:43-76`, `105-123`)
- utilisateurs (`app/api/users/route.ts:24-45`)
- dépôts (`app/api/depots/route.ts:23-39`, `app/api/depots/[id]/route.ts:28-50`, `app/api/depots/[id]/archive/route.ts:29-45`)
- profil société (`app/api/company/profile/route.ts:37-60`)
- planning / runs / shifts (`app/api/planning/autoschedule/day/route.ts:76-180`, `app/api/planning/shifts/route.ts:41-98`, `app/api/planning/shifts/[id]/assign/route.ts:32-159`)
- santé Prisma (`app/api/health/prisma/route.ts:8-29`)

Aucun endpoint métier inspecté ne contient un **bypass global cross-company** du type :
- ignorer `companyId`
- lister toutes les sociétés
- requêter une autre société depuis un rôle spécial plateforme
- forcer un accès global si `role === ADMIN`

**Constat d’audit :**
- **bypass admin global : non visible** ;
- **accès cross-company applicatif : non visible** ;
- `ADMIN` reste borné à sa société, car toutes les requêtes métier demeurent filtrées par `companyId`.

## 1.7 UI
L’UI inspectée ne montre aucun espace global plateforme.

Le dashboard expose uniquement des entrées locales à la société courante :
- planning
- profil société
- bases / dépôts
- utilisateurs
- véhicules

(`app/dashboard/page.tsx:31-52`).

Chaque page métier chargée côté serveur relit la session et filtre par `user.companyId` :
- company (`app/company/page.tsx:22-42`)
- depots (`app/depots/page.tsx:14-32`)
- users (`app/users/page.tsx:12-27`)
- vehicles (`app/vehicles/page.tsx:9-50`)
- planning (`app/planning/page.tsx:9-23`)

Aucun sélecteur de société, aucune liste globale de clients, aucun “mode support”, aucun back-office propriétaire n’est visible.

**Constat d’audit :**
- espace global : **non** ;
- éléments visibles cross-company : **non**.

## 1.8 Logique métier / support implicite
Le besoin support n’est pas implémenté, mais il est **implicitement réel** à plusieurs endroits :

1. Le cadrage produit le demande explicitement (`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:59-107`).
2. Le bloc A2 du plan le positionne comme brique d’exploitation future (`docs/1-master/PLAN_DE_DEVELOPPEMENT.md:328-360`).
3. Le module “réinitialisation de mot de passe” existe déjà, mais il ne peut être exercé que dans le tenant courant (`app/api/users/[id]/reset-password/route.ts:36-99`).
4. L’audit planning existant trace `companyId`, `actorUserId`, `action`, `entityType`, `entityId`, `summary`, `payload`, mais **pas** un statut “intervention support”, pas de motif obligatoire, pas d’ancienne/nouvelle valeur dédiées, pas de distinction support/client (`prisma/schema.prisma:61-86`, `lib/services/planning/planning-audit.ts:5-28`).

---

# 2. CAPACITÉS EXISTANTES

Le système permet déjà réellement :

- une authentification centralisée NextAuth ;
- une session enrichie avec `role` et `companyId` ;
- un cloisonnement tenant strict sur le périmètre API/UI inspecté ;
- des rôles métier de société + permissions fines par utilisateur ;
- des actions d’administration **dans la société courante** ;
- une traçabilité planning minimale par utilisateur acteur.

En revanche, le système ne permet pas actuellement :

- de définir un utilisateur plateforme hors société ;
- de définir un rôle support global distinct des rôles client ;
- de voir ou administrer plusieurs sociétés depuis un seul compte ;
- de distinguer clairement dans l’audit une action support propriétaire d’une action client.

---

# 3. LIMITES STRUCTURELLES

## 3.1 Le modèle `User` empêche un vrai compte support global
Le point le plus structurant est le suivant :

- `User.companyId` est obligatoire ;
- chaque user appartient à une seule société ;
- aucun modèle alternatif de compte plateforme n’existe.

Donc, dans l’existant, un “support propriétaire global” ne peut pas être représenté proprement.

## 3.2 Le rôle `ADMIN` n’est pas un rôle plateforme
Le mot `ADMIN` peut prêter à confusion, mais dans le code réel il s’agit d’un **admin local de société** :
- il a des accès natifs ;
- mais ses requêtes restent tenant-scope par `companyId`.

Il ne s’agit pas d’un super-admin SaaS.

## 3.3 Le RBAC n’a aucune branche globale multi-tenant
Les contrôles natifs sont centrés sur `ADMIN` / `GERANT`, et les permissions sont évaluées à partir d’un `userId` déjà lié à une société (`lib/permissions.ts:4-41`).

Il n’existe pas de couche d’autorisation exprimant :
- un accès global lecture seule ;
- un accès global d’assistance ;
- un accès global conditionné au motif d’intervention.

## 3.4 Le multi-tenant est fort, mais distribué
Le cloisonnement repose sur des checks répétés route par route, service par service.

Cela protège bien aujourd’hui, mais crée une limite structurelle :
- l’accès global support ne peut pas être ajouté proprement par simple “petit bypass” local ;
- inversement, un futur oubli de filtre `companyId` dans une nouvelle route resterait possible faute de garde centralisée unique.

## 3.5 L’audit existant est insuffisant pour des actions support
L’audit planning minimal ne couvre pas les exigences du cadrage support :
- pas de motif obligatoire ;
- pas de flag “action support/propriétaire” ;
- pas de différenciation explicite support vs client ;
- pas de traçabilité uniforme hors planning.

---

# 4. RISQUES ACTUELS

## 4.1 Risque principal : support applicatif impossible sans contournement
Dans l’état actuel, si une assistance propriétaire devait intervenir sur un tenant client, l’application ne fournit pas de voie propre, nominative et gouvernée.

Le seul levier applicatif visible est l’usage d’un **compte local de société**. Le seed montre d’ailleurs des comptes `ADMIN` distincts par société (`prisma/seed.ts:206-315`), mais **aucun compte support global**.

**Interprétation d’audit :** le contournement le plus plausible serait d’utiliser des comptes admin tenant par tenant ou d’intervenir hors application. Cette procédure n’est **pas prouvée comme officielle dans le dépôt**.

## 4.2 Risque de gouvernance
Sans rôle support distinct :
- le propriétaire devrait agir comme un client ;
- l’intervention ne serait pas clairement lisible côté audit ;
- la séparation entre exploitation client et exploitation produit resterait floue.

## 4.3 Risque sécurité / dérive future
Aujourd’hui, l’absence de bypass global réduit le risque de fuite inter-tenant immédiate.

Mais si un accès support devait être ajouté rapidement sans refonte structurée :
- un bypass improvisé pourrait fragiliser le cloisonnement ;
- l’absence de modèle global propre pousserait vers des exceptions dispersées ;
- l’absence d’audit renforcé rendrait ces exceptions difficiles à gouverner.

## 4.4 Risque produit / support commercial
Le cadrage officiel positionne ce rôle comme **indispensable pré-version commerciale** (`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:61-107`).

Donc :
- pour une société pilote interne, l’absence n’empêche pas tout usage local ;
- pour un SaaS multi-clients exploité sérieusement, l’absence devient un vrai manque opérationnel.

---

# 5. BESOIN RÉEL

## Conclusion claire
### Support global nécessaire ou non ?
**Oui, le besoin réel d’un support propriétaire global est confirmé.**

Raisons :
- il est explicitement porté par le cadrage produit ;
- le produit est pensé multi-tenant ;
- les mécanismes actuels sont volontairement bornés à la société courante ;
- aucune capacité propre d’assistance cross-company n’existe aujourd’hui.

### Niveau de privilège attendu
Le besoin réel n’est **pas** celui d’un simple `ADMIN` supplémentaire.

Le niveau attendu est celui d’un **rôle distinct, hors hiérarchie client, à portée multi-sociétés**, mais gouverné et traçable.

Autrement dit :
- plus qu’un admin de société ;
- moins qu’un accès sauvage non journalisé ;
- un accès propriétaire/support encadré par le produit.

---

# 6. RECOMMANDATION POUR SUP-02

Sans anticiper l’implémentation, l’audit conduit à l’orientation suivante :

1. **Ne pas réutiliser `ADMIN`** comme pseudo super-admin.
2. **Ne pas bricoler un bypass ponctuel** dans quelques routes.
3. **Traiter le support comme une notion de plateforme distincte** du RBAC client.
4. **Préserver le multi-tenant strict comme règle par défaut**, avec une exception support explicitement gouvernée.
5. **Prévoir la traçabilité dédiée** comme dépendance immédiate du futur rôle support.

---

# 7. VERDICT FINAL D’AUDIT

## Verdict
L’existant applicatif **ne contient pas** de notion réelle de “support propriétaire / super-admin global”, ni explicitement, ni implicitement au niveau de la structure d’accès.

Ce qui existe aujourd’hui est un système **tenant-first**, correctement centré sur :
- une session enrichie `role + companyId`
- des rôles métier de société
- des permissions locales
- un cloisonnement par société sans bypass global visible

Le besoin support est toutefois **réel et confirmé** par le produit cible et par les limites structurelles observées.

## Synthèse courte
- rôle global : **absent**
- compte hors company : **absent / non modélisé**
- accès cross-company : **absent**
- bypass admin global : **absent**
- support traçable : **absent**
- besoin support propriétaire : **confirmé**

## Exploitabilité pour SUP-02
Audit **clair et exploitable** : `SUP-02` devra créer une vraie notion de support plateforme distincte du RBAC client, sans remise en cause du cloisonnement multi-tenant comme règle par défaut.
