# REBASAGE-36 — Audit page Audit / Traçabilité / Journal d’audit

## 1. Objet du document
Ce document audite l’état réel de la page Audit / Traçabilité / Journal d’audit dans le cadre du rebasage global Alpha.

L’audit porte sur la lecture, l’exploitation et la couverture réelle de la traçabilité, sans correction code.

## 2. Règles de lecture
- Audit en lecture seule.
- En cas de contradiction : code réel > documentation.
- Aucune correction code pendant cette session.
- Toute information non prouvée reste `INFORMATION NON FOURNIE — À CONFIRMER`.
- Les accents français normaux sont conservés lorsque l’encodage est propre.

## 3. Sources lues
### Documentation
- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-25_CLASSEMENT_DETTES_PRIORITES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-26_INVENTAIRE_PAGES_ROUTES_APPLICATIVES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-30_AUDIT_PAGE_UTILISATEURS_RH.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-31_AUDIT_PAGE_VEHICULES_FLOTTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-32_AUDIT_PAGE_TEMPLATES_MODELES_SHIFTS.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-33_AUDIT_PAGE_SOCIETE_PROFIL_BASES_DEPOTS.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-34_AUDIT_PAGE_DEPOTS_BASES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-35_AUDIT_PAGE_ONBOARDING.md`

### Code
- `app/audit/page.tsx`
- `app/audit/audit-client.tsx`
- `app/api/audit/route.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `lib/auth.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `lib/services/audit/audit-context.ts`
- `lib/services/audit/login-audit.ts`
- `lib/services/audit/personal-data-audit.ts`
- `lib/services/audit/support-action-trace.ts`
- `lib/services/planning/planning-audit.ts`
- fichiers d’usage de traçabilité identifiés via recherche (`app/api/planning/**`, `app/api/users/**`, `app/api/vehicles/**`, `lib/services/users/**`, `lib/services/vehicles/**`, `lib/services/depots/**`, `lib/services/planning/**`)
- `prisma/schema.prisma`

## 4. Routes / pages identifiées
- `/audit` : page de consultation consolidée des journaux d’audit planning + connexions ; statut : confirmé.
- `/api/audit` : endpoint de lecture des entrées d’audit ; statut : confirmé.
- `/api/auth/[...nextauth]` + `lib/auth.ts` : source d’écriture des traces de connexion ; statut : confirmé.
- Routes planning avec exposition partielle d’historique (`/api/planning/shifts`, `/api/planning/autoschedule/runs/[id]`) ; statut : partiel.
- Route/API dédiée export audit : `INFORMATION NON FOURNIE — À CONFIRMER`.

## 5. Fichiers principaux identifiés
- Page : `app/audit/page.tsx`
- Client component : `app/audit/audit-client.tsx`
- API audit : `app/api/audit/route.ts`
- Services/helpers audit :
  - `lib/services/planning/planning-audit.ts`
  - `lib/services/audit/login-audit.ts`
  - `lib/services/audit/personal-data-audit.ts`
  - `lib/services/audit/support-action-trace.ts`
  - `lib/services/audit/audit-context.ts`
- Validators éventuels : schéma Zod query dans `app/api/audit/route.ts` (pas de fichier validator dédié audit trouvé)
- Permissions/RBAC :
  - `canViewAudit` dans `lib/permissions.ts`
  - permission `AUDIT_VIEW` dans `lib/permission-catalog.ts`
  - support global via `isGlobalSupport` (`lib/rbac.ts`, `lib/services/audit/audit-context.ts`)
- Modèles Prisma concernés : `PlanningAuditLog`, `LoginAuditLog`, liens `companyId`, `actorUserId`, `runId`.

## 6. Rôle réel de la page Audit / Traçabilité
Rôle constaté dans le code :
- consultation centralisée des entrées issues de deux sources (`PLANNING_AUDIT`, `LOGIN_AUDIT`) ;
- filtres UI côté client (source, action, acteur, recherche libre, entité/type) ;
- détail d’une entrée dans panneau latéral (résumé + payload JSON) ;
- filtre companyId (éditable uniquement pour support global) ;
- pas de pagination serveur dédiée (seulement `limit`), pas d’export d’audit prouvé.

Capacités prouvées : consultation, filtres, recherche libre, détail événement.

Capacités non prouvées :
- pagination avancée (curseur/pages) ;
- tri serveur multi-colonnes ;
- export d’audit ;
- couverture exhaustive de tous modules métier.

## 7. Fonctionnalités observées
| Fonctionnalité | Présence dans le code | Présence UI | Présence API | Dépendances | Statut | Commentaire court |
| --- | --- | --- | --- | --- | --- | --- |
| Accès à la page Audit | oui | oui | non | session NextAuth | incomplet | redirection login si non connecté |
| Restriction par rôle/permission | oui | partiel | oui | `canViewAudit`, `AUDIT_VIEW` | incomplet | modèle mixte rôle natif + permissions |
| Permission dédiée de consultation audit | oui | partiel | oui | `AUDIT_VIEW` | conforme | permission explicitement présente |
| Liste des événements d’audit | oui | oui | oui | `/api/audit` | incomplet | consolidée planning + login uniquement |
| Détail d’un événement | oui | oui | partiel | payload JSON | incomplet | détail panneau latéral présent |
| Filtre par utilisateur | oui | oui | partiel | `actorFilter` client | incomplet | filtre client, pas paramètre API dédié acteur |
| Filtre par module | oui | oui | partiel | source/action/entityType | incomplet | via source + type entité |
| Filtre par action | oui | oui | partiel | actionFilter client | incomplet | filtrage client |
| Filtre par période | partiel | partiel | non | date locale affichée | à confirmer | période réelle côté backend non prouvée |
| Pagination | partiel | partiel | partiel | `limit` API (max 500) | incomplet | pas de pagination par page/cursor |
| Recherche | oui | oui | non | recherche client normalisée | incomplet | recherche full-text côté API non prouvée |
| Tri | partiel | partiel | partiel | tri date desc côté API | incomplet | tri UI personnalisable non prouvé |
| Export audit | non constaté | non constaté | non constaté | N/A | à confirmer | `INFORMATION NON FOURNIE — À CONFIRMER` |
| Audit des utilisateurs | oui | partiel | oui | `writePersonalDataAudit` | incomplet | create/update/archive/reset/absences/depot visibles dans écritures |
| Audit des véhicules | oui | partiel | oui | `traceSupportAction` | incomplet | traces surtout sur actions support |
| Audit des dépôts | oui | partiel | oui | `traceSupportAction` | incomplet | create/update/archive tracés côté support |
| Audit des templates | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | à confirmer | aucune écriture explicitement trouvée |
| Audit du planning | oui | oui | oui | `writePlanningAudit` | incomplet | forte couverture planning/autoschedule |
| Audit onboarding/imports | partiel | partiel | partiel | imports/onboarding + audit existant | à confirmer | aucune action onboarding dédiée clairement identifiée |
| Audit auth/connexions | oui | oui | oui | `writeLoginAudit`, `LOGIN_AUDIT` | incomplet | login success/failure tracé, logout non prouvé |
| Audit support | oui | partiel | oui | `traceSupportAction` | incomplet | seulement quand acteur `SUPPORT` + raison obligatoire |
| Cohérence multi-tenant / companyId | oui | partiel | oui | `resolveAuditCompanyId`, filtres companyId | incomplet | isolation visible, preuve exhaustive à confirmer |
| Cohérence session / permissions | oui | partiel | oui | NextAuth + `canViewAudit` | incomplet | logique présente, non validée e2e |

## 8. Couverture réelle par module
### 8.1 Utilisateurs / RH
Prouvé :
- création utilisateur (`USER_CREATE`) ;
- modification utilisateur (`USER_UPDATE`) ;
- archivage utilisateur (`USER_ARCHIVE`) ;
- absences (`USER_ABSENCE_CREATE/UPDATE/DELETE`) ;
- rattachement dépôt utilisateur (`USER_ASSIGN_DEPOT`) ;
- reset password (`USER_RESET_PASSWORD`) ;
- traces support associées (`SUPPORT_ARCHIVE_USER`, `SUPPORT_ASSIGN_USER_DEPOT`, `SUPPORT_RESET_USER_PASSWORD`).

Non prouvé :
- couverture de toutes actions RH UI possibles hors flux identifiés.

### 8.2 Véhicules / Flotte
Prouvé :
- création/modification véhicules via traces support (`SUPPORT_CREATE_VEHICLE`, `SUPPORT_UPDATE_VEHICLE`) ;
- archivage (`SUPPORT_ARCHIVE_VEHICLE`) ;
- rattachement dépôt (`SUPPORT_ASSIGN_VEHICLE_DEPOT`).

Non prouvé :
- traces non-support (acteur métier non support) sur toutes actions véhicules ;
- traçabilité spécifique conformité documentaire véhicule.

### 8.3 Dépôts / Bases
Prouvé :
- création (`SUPPORT_CREATE_DEPOT`) ;
- modification (`SUPPORT_UPDATE_DEPOT`) ;
- archivage (`SUPPORT_ARCHIVE_DEPOT`) ;
- rattachements indirects via users/vehicles.

Non prouvé :
- couverture d’actions dépôts hors contexte support.

### 8.4 Templates / Modèles de shifts
Prouvé :
- `INFORMATION NON FOURNIE — À CONFIRMER` pour écritures d’audit explicites templates.

Non prouvé :
- création/modification/archivage templates tracés dans `PlanningAuditLog` ou `LoginAuditLog` via pattern explicite.

### 8.5 Planning / Shifts
Prouvé :
- création shift manuel (`SHIFT_CREATED_MANUALLY`) ;
- modification shift (`SHIFT_UPDATED_MANUALLY`) ;
- annulation logique (`SHIFT_CANCELLED_MANUALLY`) ;
- assignations manuelles (`SHIFT_ASSIGNED_MANUALLY`, `DRAFT_SHIFT_ASSIGNED_MANUALLY`) ;
- autoschedule (run created, match applied, publish, cancel).

Non prouvé :
- couverture explicite d’un journal matching indépendant du planning audit principal.

### 8.6 Onboarding / Imports
Prouvé :
- imports utilisés dans onboarding (`/api/imports`) ;
- traces d’import onboarding dédiées explicites non trouvées.

Non prouvé :
- preview/commit import tracés avec actions audit spécifiques ;
- progression onboarding tracée en tant qu’événement dédié.

### 8.7 Auth / Connexions
Prouvé :
- connexions réussies/échouées dans `LoginAuditLog` via `writeLoginAudit`.

Non prouvé :
- déconnexions tracées ;
- suivi explicite des sessions expirées ;
- trace reset password côté login audit (celles observées passent par planning audit via données personnelles).

### 8.8 Support
Prouvé :
- actions support tracées via `traceSupportAction` si acteur `SUPPORT` et raison fournie ;
- intégration dans `PlanningAuditLog`.

Non prouvé :
- exposition UI dédiée “actions support” séparée d’un filtre texte/acteur ;
- visibilité client de toutes actions support en conditions réelles multi-rôles.

## 9. Modèle de données et cohérence multi-tenant
Prouvé :
- modèle audit séparé en deux tables : `PlanningAuditLog` et `LoginAuditLog` ;
- présence de `companyId` indexé dans les deux modèles ;
- `actorUserId` nullable, relation vers `User` ;
- champs `action`, `entityType`, `entityId`, `summary`, `payload`, `createdAt` ;
- sélection company ciblée par `resolveAuditCompanyId` dans `/api/audit`.

Risques constatés (lecture seule) :
- couverture audit éclatée entre deux sources uniquement (planning/login) ;
- certaines actions métier peuvent exister sans écriture audit homogène ;
- contrôle d’accès support/companyId dépend d’un flux de résolution qui reste à valider e2e.

Statut global multi-tenant audit : **incomplet** (structure solide, preuve exhaustive non fournie).

## 10. Écarts et risques méthodologiques
- Page Audit existante mais couverture d’événements hétérogène selon modules.
- Certaines écritures audit sont bien présentes (planning/users/support), d’autres non prouvées (templates, onboarding/imports dédiés).
- Filtres surtout côté client ; risque de volume et lisibilité en charge.
- Pagination avancée et export non prouvés.
- Risque de considérer la traçabilité “complète” alors que seuls certains flux sont explicitement tracés.
- Risque de confusion entre audit planning et audit produit global multi-modules.

## 11. Ce qui semble à conserver
- Permission dédiée `AUDIT_VIEW` et garde `canViewAudit`.
- Agrégation API audit de deux sources utiles (`PLANNING_AUDIT`, `LOGIN_AUDIT`).
- Détail payload JSON lisible dans la page Audit.
- Traces planning riches (manual + autoschedule) et mécanisme support avec raison obligatoire.

## 12. Ce qui semble à corriger plus tard
- Uniformiser la stratégie de traçabilité entre modules (notamment templates, onboarding/imports).
- Renforcer les filtres serveur (acteur, période, recherche) pour éviter la dépendance aux filtres client uniquement.
- Clarifier la nomenclature des actions audit pour lecture métier homogène.

## 13. Ce qui semble à compléter plus tard
- Pagination/tri avancés côté API audit.
- Export des journaux d’audit si confirmé dans le cadrage.
- Couverture explicite des événements manquants (logout, onboarding progression, imports preview/commit, templates).
- Validation e2e multi-tenant/support sur la visibilité des entrées.

## 14. Ce qui pourrait être supprimé ou simplifié plus tard
- Éléments UI redondants dans le panneau détail si surcharge de lecture : `À VALIDER AVANT ACTION`.
- Statistiques agrégées non exploitées opérationnellement : `À VALIDER AVANT ACTION`.
- Règles de présentation “source/action” trop techniques pour utilisateurs finaux : `À VALIDER AVANT ACTION`.

## 15. Verdict d’audit page Audit / Traçabilité
Verdict : **incomplet**.

Justification : la page Audit et son API existent avec un socle crédible (permissions, agrégation planning/login, détail des entrées). Toutefois la couverture réelle de la traçabilité reste partielle selon modules, avec des zones non prouvées (templates, onboarding/imports dédiés, export/pagination avancée, certaines traces auth), ce qui empêche un verdict de conformité complète.

## 16. Prochaine étape recommandée
REBASAGE-37 — audit page Privacy / Mentions d’information.
