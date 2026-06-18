# 2 - Preuves

## 1. Fichiers lus

### MASTER et session de cadrage precedente

- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-08_DX_T4_CADRAGE-BLOC-SESSIONS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-08_DX_T4_CADRAGE-BLOC-SESSIONS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-08_DX_T4_CADRAGE-BLOC-SESSIONS/3-FIN_DE_SESSION.md`

### RBAC, gouvernance et audit serveur

- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `lib/company-rules/governance.ts`
- `lib/services/audit/support-action-trace.ts`
- `lib/services/audit/audit-context.ts`

### Pages et shell

- `app/layout.tsx`
- `app/dashboard/page.tsx`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/company/company-rules-panel.tsx`
- `app/depots/page.tsx`
- `app/depots/depots-client.tsx`
- `app/users/page.tsx`
- `app/users/users-list-client.tsx`
- `app/users/users-side-panel-client.tsx`
- `app/users/user-creation-client.tsx`
- `app/users/user-edit-client.tsx`
- `app/users/user-archive-client.tsx`
- `app/users/user-depot-assignment-client.tsx`
- `app/users/user-absence-client.tsx`
- `app/users/reset-password-client.tsx`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/templates/page.tsx`
- `app/templates/templates-client.tsx`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/audit/page.tsx`
- `app/audit/audit-client.tsx`
- `app/login/page.tsx`
- `app/privacy/page.tsx`

### API sensibles

- `app/api/company/profile/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/[id]/archive/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/users/[id]/absences/route.ts`
- `app/api/users/[id]/absences/[absenceId]/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/[id]/archive/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `app/api/templates/route.ts`
- `app/api/templates/[id]/route.ts`
- `app/api/templates/[id]/archive/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/shifts/[id]/cancel/route.ts`
- `app/api/planning/exports/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/audit/route.ts`
- `app/api/imports/route.ts`

### Qualite et reference Base44

- `scripts/quality/smoke-api-critical-contracts.test.mjs`
- `scripts/quality/targeted-sensitive-blocks.test.mjs`
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/lib/userPermissions.js`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/lib/AuthContext.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/components/ProtectedRoute.jsx`
- `docs/1-MASTER/3-FONCTIONNALITES/5-FONCTIONNALITES_DETAILLEES_UTILISATEURS_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/7-FONCTIONNALITES_DETAILLEES_DEPOTS_BASES_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/8-FONCTIONNALITES_DETAILLEES_SOCIETE_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/10-FONCTIONNALITES_DETAILLEES_AUDIT_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/LISTE_FONCTIONNALITES_V1.1.md`

## 2. Commandes executees

- `git status --short`
- `Get-ChildItem -LiteralPath 'docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API' -Recurse -File`
- `Get-ChildItem -LiteralPath 'app' -Recurse -File`
- `Get-ChildItem -LiteralPath 'lib' -Recurse -File`
- `Get-ChildItem -LiteralPath 'scripts/quality' -Recurse -File`
- `Get-Content -LiteralPath 'docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md' -Raw`
- `Get-Content -LiteralPath 'docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md' -Raw`
- `Get-Content -LiteralPath 'docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-08_DX_T4_CADRAGE-BLOC-SESSIONS/1-SESSION.md' -Raw`
- `Get-Content -LiteralPath 'docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-08_DX_T4_CADRAGE-BLOC-SESSIONS/2-PREUVES.md' -Raw`
- `Get-Content -LiteralPath 'docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-08_DX_T4_CADRAGE-BLOC-SESSIONS/3-FIN_DE_SESSION.md' -Raw`
- `Get-Content -LiteralPath 'lib/permissions.ts' -Raw`
- `Get-Content -LiteralPath 'lib/permission-catalog.ts' -Raw`
- `Get-Content -LiteralPath 'lib/rbac.ts' -Raw`
- `Get-Content -LiteralPath 'lib/company-rules/governance.ts' -Raw`
- `Get-Content -LiteralPath 'lib/services/audit/support-action-trace.ts' -Raw`
- `Get-Content -LiteralPath 'lib/services/audit/audit-context.ts' -Raw`
- `Get-Content -LiteralPath 'app/layout.tsx' -Raw`
- `Get-Content -LiteralPath 'app/company/page.tsx' -Raw`
- `Get-Content -LiteralPath 'app/depots/page.tsx' -Raw`
- `Get-Content -LiteralPath 'app/users/page.tsx' -Raw`
- `Get-Content -LiteralPath 'app/vehicles/page.tsx' -Raw`
- `Get-Content -LiteralPath 'app/planning/page.tsx' -Raw`
- `Get-Content -LiteralPath 'app/audit/page.tsx' -Raw`
- `Get-Content -LiteralPath 'app/dashboard/page.tsx' -Raw`
- `Get-Content -LiteralPath 'app/login/page.tsx' -Raw`
- `Get-Content -LiteralPath 'app/privacy/page.tsx' -Raw`
- `Get-Content -LiteralPath 'app/company/company-profile-form.tsx' -Raw`
- `Get-Content -LiteralPath 'app/company/company-rules-panel.tsx' -Raw`
- `Get-Content -LiteralPath 'app/depots/depots-client.tsx' -Raw`
- `Get-Content -LiteralPath 'app/templates/page.tsx' -Raw`
- `Get-Content -LiteralPath 'app/onboarding/page.tsx' -Raw`
- `Get-Content -LiteralPath 'app/planning/planning-client.tsx' -Raw`
- `Get-Content -LiteralPath 'app/planning/manual-planning-panel.tsx' -Raw`
- `Get-Content -LiteralPath 'app/templates/templates-client.tsx' -Raw`
- `Get-Content -LiteralPath 'app/users/user-creation-client.tsx' -Raw`
- `Get-Content -LiteralPath 'app/users/user-edit-client.tsx' -Raw`
- `Get-Content -LiteralPath 'app/users/user-archive-client.tsx' -Raw`
- `Get-Content -LiteralPath 'app/users/user-depot-assignment-client.tsx' -Raw`
- `Get-Content -LiteralPath 'app/users/reset-password-client.tsx' -Raw`
- `Get-Content -LiteralPath 'app/users/user-absence-client.tsx' -Raw`
- `Get-Content -LiteralPath 'app/users/users-list-client.tsx' -Raw`
- `Get-Content -LiteralPath 'app/users/users-side-panel-client.tsx' -Raw`
- `Get-Content -LiteralPath 'app/vehicles/vehicles-client.tsx' -Raw`
- `Get-Content -LiteralPath 'app/api/company/profile/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/company/rules/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/depots/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/depots/[id]/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/depots/[id]/archive/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/users/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/users/[id]/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/users/[id]/archive/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/users/[id]/depot/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/users/[id]/reset-password/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/vehicles/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/vehicles/[id]/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/vehicles/[id]/archive/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/vehicles/[id]/depot/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/templates/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/templates/[id]/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/templates/[id]/archive/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/shifts/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/shifts/[id]/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/shifts/[id]/assign/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/shifts/[id]/cancel/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/exports/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/autoschedule/day/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/autoschedule/week/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/autoschedule/runs/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/autoschedule/runs/[id]/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/autoschedule/runs/[id]/cancel/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/autoschedule/runs/[id]/publish/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/autoschedule/runs/[id]/match/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/autoschedule/runs/[id]/match/preview/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/planning/autoschedule/runs/[id]/match/apply/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/audit/route.ts' -Raw`
- `Get-Content -LiteralPath 'app/api/imports/route.ts' -Raw`
- `Get-Content -LiteralPath 'scripts/quality/smoke-api-critical-contracts.test.mjs' -Raw`
- `Get-Content -LiteralPath 'scripts/quality/targeted-sensitive-blocks.test.mjs' -Raw`
- `rg -n "..."` sur les catalogues de permissions, les appels `can*`, les routes sensibles, et les references Base44 pour obtenir les preuves de correspondance et de divergence.

## 3. Catalogue des permissions existantes

| Code | Statut | Preuves observees |
| --- | --- | --- |
| `PLANNING_VIEW_SELF` | Utilise | `app/layout.tsx`, `app/dashboard/page.tsx`, `app/planning/page.tsx`, `app/api/planning/shifts/route.ts`, `app/api/planning/exports/route.ts` |
| `PLANNING_VIEW_GLOBAL` | Utilise | `app/layout.tsx`, `app/dashboard/page.tsx`, `app/planning/page.tsx`, `app/api/planning/shifts/route.ts`, `app/api/planning/exports/route.ts` |
| `PLANNING_EDIT` | Utilise | `app/planning/page.tsx`, `app/planning/planning-client.tsx`, `app/api/planning/shifts/route.ts`, `app/api/planning/shifts/[id]/route.ts`, `app/api/planning/shifts/[id]/assign/route.ts`, `app/api/planning/shifts/[id]/cancel/route.ts`, `app/api/vehicles/route.ts` |
| `PLANNING_SHIFT_CREATE_MANUAL` | Dormant | Present dans le catalogue, aucune consommation app/API observee |
| `PLANNING_SHIFT_EDIT_PUBLISHED` | Dormant | Present dans le catalogue, aucune consommation app/API observee |
| `PLANNING_SHIFT_CANCEL_PUBLISHED` | Dormant | Present dans le catalogue, aucune consommation app/API observee |
| `PLANNING_AUTOSCHEDULE` | Utilise | `app/planning/page.tsx`, `app/planning/planning-client.tsx`, `app/api/planning/autoschedule/day/route.ts`, `week/route.ts`, `runs/route.ts`, `runs/[id]/route.ts`, `runs/[id]/match/*` |
| `PLANNING_AUTOSCHEDULE_PUBLISH` | Utilise | `app/api/planning/autoschedule/runs/[id]/publish/route.ts` |
| `PLANNING_AUTOSCHEDULE_CANCEL` | Utilise | `app/api/planning/autoschedule/runs/[id]/cancel/route.ts` |
| `USERS_MANAGE` | Utilise | `app/layout.tsx`, `app/dashboard/page.tsx`, `app/users/page.tsx`, `app/api/users/*`, `app/onboarding/page.tsx` |
| `ROLES_PERMISSIONS_MANAGE` | Dormant | Present dans le catalogue et expose dans l UI des permissions utilisateur, mais aucun endpoint serveur ne le consomme |
| `VEHICLES_MANAGE` | Utilise | `app/layout.tsx`, `app/dashboard/page.tsx`, `app/vehicles/page.tsx`, `app/api/vehicles/*`, `app/onboarding/page.tsx`, `app/planning/planning-client.tsx` |
| `TEMPLATES_MANAGE` | Utilise | `app/layout.tsx`, `app/dashboard/page.tsx`, `app/templates/page.tsx`, `app/api/templates/*`, `app/onboarding/page.tsx`, `app/planning/manual-planning-panel.tsx` |
| `COMPANY_RULES_MANAGE` | Utilise | `app/layout.tsx`, `app/dashboard/page.tsx`, `app/company/page.tsx`, `app/api/company/rules/route.ts`, `app/planning/page.tsx`, `app/planning/planning-client.tsx`, `app/users/user-creation-client.tsx`, `app/users/user-edit-client.tsx` |
| `AUDIT_VIEW` | Utilise | `app/layout.tsx`, `app/dashboard/page.tsx`, `app/audit/page.tsx`, `app/api/audit/route.ts`, `app/api/planning/shifts/route.ts`, `app/api/planning/exports/route.ts`, `app/api/planning/autoschedule/runs/[id]/route.ts`, `app/planning/page.tsx`, `app/planning/manual-planning-panel.tsx`, `app/planning/planning-client.tsx` |
| `PLANNING_EXPORT` | Utilise | `app/layout.tsx`, `app/dashboard/page.tsx`, `app/planning/page.tsx`, `app/planning/planning-client.tsx`, `app/planning/manual-planning-panel.tsx`, `app/api/planning/exports/route.ts` |
| `DASHBOARD_ADMIN_ACCESS` | Utilise | `app/layout.tsx`, `app/dashboard/page.tsx` |
| `DASHBOARD_TERRAIN_ACCESS` | Utilise | `app/layout.tsx`, `app/dashboard/page.tsx` |

## 4. Matrice roles / permissions

| Role | Mode RBAC observe | Commentaire |
| --- | --- | --- |
| `ADMIN` | Native broad access | Passe automatiquement les checks de permissions applicatives dans `lib/permissions.ts` ; reste aussi gate natif pour le profil societe, les depots et la creation vehicule |
| `GERANT` | Native broad access | Meme logique que `ADMIN` pour les checks de permissions, avec les memes acces UI/API observes sur la societe, les depots, les users, les templates, le planning et l audit |
| `BUREAU` | Permission-driven | Aucun acces natif observe ; doit recevoir des permissions explicites |
| `ADE` | Permission-driven | Aucun acces natif observe ; souvent cible du planning personnel |
| `AA` | Permission-driven | Aucun acces natif observe |
| `TAXI` | Permission-driven | Aucun acces natif observe |
| `REGULATEUR` | Permission-driven | Aucun acces natif observe |
| `SUPPORT` (platformRole) | Support only | N obtient des droits que via `allowSupport` sur `AUDIT_VIEW`; exclusion sur les fonctions metier et la gouvernance societe |

## 5. Matrice UI / API

| Domaine | UI observee | API observee | Lecture d audit |
| --- | --- | --- | --- |
| Societe | Page visible si profil natif ou permission de regles; formulaire profil visible pour `ADMIN`/`GERANT`; panneau regles visible si `COMPANY_RULES_MANAGE` | `PATCH /api/company/profile` role-only; `GET/PATCH /api/company/rules` session company + permission pour l ecriture | Modifs sensibles tracees via services metier, audit complet reserve a la page Audit |
| Depots / Bases | Page visible seulement `ADMIN`/`GERANT`; create/edit/archive visibles dans le module | `POST/PATCH/POST archive` role-only, sans permission dediee | Historique recent possible via UI, audit complet reserve |
| Utilisateurs / RH | Page visible si `USERS_MANAGE`; creation, edition, archive, rattachement depot, reset password et absences exposes; `COMPANY_RULES_MANAGE` verrouille dans les forms | `GET/POST/PATCH/archive/depot/reset-password/absences` gardes par `canManageUsers`; gouvernance rgles metier renforcee par le serveur | Toutes les mutations sensibles utilisent des audits perso/donnees sensibles |
| Vehicules | Page visible si `VEHICLES_MANAGE`; creation visible seulement pour `ADMIN`; edition/archive/rattachement depot exposes; pas de restauration | `GET` accepte `VEHICLES_MANAGE` ou `PLANNING_EDIT`; `POST` admin-only; `PATCH/archive/depot` via `VEHICLES_MANAGE` | Support traces sur mutations vehicules |
| Templates / modeles horaires | Page visible si `TEMPLATES_MANAGE`; creation, duplication, edition, archive visibles; archive-only, pas de restauration | `GET/POST/PATCH/archive` via `canManageTemplates`; pas de DELETE ni restore | Audit metier via services templates |
| Planning | Pages et onglets conditionnes par `PLANNING_VIEW_SELF`, `PLANNING_VIEW_GLOBAL`, `PLANNING_EDIT`, `PLANNING_AUTOSCHEDULE`, `PLANNING_EXPORT`, `AUDIT_VIEW`; `COMPANY_RULES_MANAGE` debloque le mode societe | `GET /api/planning/shifts` self/global + audit history; `POST/PATCH/cancel/assign` via `PLANNING_EDIT`; `exports` via `PLANNING_EXPORT`; autoschedule day/week/runs/publish/cancel/match via `PLANNING_AUTOSCHEDULE` et ses sous-permissions | Les historiques de planning sont lisibles si `AUDIT_VIEW` |
| Audit | Page et nav visibles via `AUDIT_VIEW`; support global autorise | `GET /api/audit` via `canViewAudit`; support cross-company possible via `requestedCompanyId` | Audit central et traces support renforcees |
| Dashboard | Les cartes et liens sont conditionnes par les permissions module; aucun gate serveur specifique | Pas d API propre; page de portail | Pas d audit propre, seulement les modules cibles |
| Onboarding | Page role-only pour le profil societe; liens vers users/vehicles/templates conditionnes par permissions | `POST /api/imports` role-only `ADMIN`/`GERANT` | Non cible T4, mais utilise comme portail d administration |

## 6. Analyse par domaine

### 6.1 Societe

- `app/company/page.tsx` garde le profil societe par role natif `ADMIN`/`GERANT`.
- Le panneau de regles est gouverne par `COMPANY_RULES_MANAGE`.
- `app/api/company/profile/route.ts` reste role-only, sans permission dediee.
- `app/api/company/rules/route.ts` est volontairement plus large en lecture pour alimenter le planning et la page societe.
- Point de vigilance : aucun `COMPANY_MANAGE` effectif n est observe dans le code; le noyau societe repose encore sur les roles natifs.

### 6.2 Depots / Bases

- `app/depots/page.tsx` et `app/api/depots/*` reposent encore sur `ADMIN`/`GERANT`.
- Le code ne consomme aucune permission dediee de depots.
- Le lot archive-only est respecte: pas de restauration exposee.
- Point de tension T4: la decision projet valide `DEPOTS_MANAGE` comme permission dediee, mais le repo officiel ne l applique pas encore.

### 6.3 Utilisateurs

- `app/users/page.tsx` et `app/api/users/*` sont coherents sur `USERS_MANAGE`.
- Les permissions applicatives sont creees et modifiees dans la foulee, avec filtrage sur le catalogue ALPHA reel.
- `COMPANY_RULES_MANAGE` reste verrouillee pour les comptes non natifs de gouvernance.
- Le reset password reste une action administrative actuelle sans nouvelle permission T4.
- `ROLES_PERMISSIONS_MANAGE` est present mais dormant: visible comme code de catalogue, sans consommateur serveur.

### 6.4 Vehicules

- `app/vehicles/page.tsx` et `app/api/vehicles/*` sont globalement coherents sur `VEHICLES_MANAGE`.
- La creation reste admin-only dans l UI comme dans l API.
- L endpoint GET des vehicules est volontairement un peu plus large que la page, car le planning en depend pour ses listes.
- Archive-only observe, pas de restore.

### 6.5 Planning / autoschedule

- Le planning manuel repose sur `PLANNING_VIEW_SELF`, `PLANNING_VIEW_GLOBAL`, `PLANNING_EDIT`, `PLANNING_EXPORT`, `AUDIT_VIEW` et `COMPANY_RULES_MANAGE`.
- Les actions de creation/edition/annulation/affectation d un shift publie restent sous `PLANNING_EDIT`.
- Les variantes autoschedule utilisent `PLANNING_AUTOSCHEDULE`, `PLANNING_AUTOSCHEDULE_PUBLISH` et `PLANNING_AUTOSCHEDULE_CANCEL`.
- Les permissions plus fines `PLANNING_SHIFT_CREATE_MANUAL`, `PLANNING_SHIFT_EDIT_PUBLISHED` et `PLANNING_SHIFT_CANCEL_PUBLISHED` sont dans le catalogue mais restent dormantes.

### 6.6 Audit / support

- `AUDIT_VIEW` est la seule permission explicitement support-enabled.
- `app/api/audit/route.ts` accepte la consultation cross-company pour le support, avec resoluton de societe controlee.
- Les mutations sensibles de users, vehicles, templates, planning et support passent par des traces metier ou support.

## 7. Ecarts detectes

| Priorite | Ecart | Constat |
| --- | --- | --- |
| P1 | `DEPOTS_MANAGE` attendu mais absent du code effectif | La validation projet l autorise comme permission dediee, mais le repo continue de proteger les depots par role natif `ADMIN`/`GERANT` |
| P2 | Permissions planning fines dormantes | `PLANNING_SHIFT_CREATE_MANUAL`, `PLANNING_SHIFT_EDIT_PUBLISHED`, `PLANNING_SHIFT_CANCEL_PUBLISHED` ne pilotent aucune UI/API |
| P2 | `ROLES_PERMISSIONS_MANAGE` dormant | La permission est visible dans le catalogue et les forms utilisateurs, mais sans consommateur serveur |
| P2 | Vehicules create plus strict que manage | `VEHICLES_MANAGE` couvre edition/archive/rattachement, mais la creation reste admin-only |
| P3 | Planning editors dependants de listes de reference | Le panneau planning charge `/api/users?limit=500` et `/api/vehicles?limit=500`; `vehicles` est compatible avec `PLANNING_EDIT`, `users` reste plus strict |
| P3 | Autoschedule list route moins uniforme | `app/api/planning/autoschedule/runs/route.ts` ne propage pas `platformRole` comme les routes autoschedule voisines ; le support y est donc potentiellement moins explicite |

## 8. Corrections futures recommandees

- `CX_T4_CORRECTION-RBAC-REFERENTIELS` doit prioriser le passage des surfaces societe / depots sur des permissions explicites et non seulement sur les roles natifs.
- `CX_T4_CORRECTION-RBAC-VEHICULES` doit traiter l asymetrie create vs manage, ainsi que la cohérence read/list pour les usages planning.
- Les permissions dormantes de planning restent a documenter comme such, sans reouvrir la refonte globale du planning dans cette session.

## 9. Sujets reportes hors T4

- Contacts societe.
- Suivi vehicules.
- Dashboard preferences.
- Disponibilite vehicule avancee.
- Refonte planning.
- Gestion dynamique complete des roles et permissions.

## 10. Informations non fournies

- `INFORMATION NON FOURNIE — A CONFIRMER` : niveau cible de granularite future pour les permissions planning fines.
- `INFORMATION NON FOURNIE — A CONFIRMER` : duree de conservation et de diffusion des traces audit au-dela des usages observes.
- `INFORMATION NON FOURNIE — A CONFIRMER` : politique definitive de substitution role natif / permission dediee pour les depots.
- `INFORMATION NON FOURNIE — A CONFIRMER` : si `VEHICLES_MANAGE` doit couvrir la creation ou rester limitee a la gestion courante.

## 11. Points de vigilance

- L API reste bien la barriere reelle de securite; les masquages UI ne suffisent jamais seuls.
- Le support global est volontairement traite comme cas particulier d audit.
- Les pages de portail peuvent afficher des liens conditionnels sans constituer une vraie permission de donnees.
- Aucun navigateur, aucun build et aucune correction n ont ete lances dans cette session.

## 12. Controle perimetre

- Session creee dans `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API`.
- Aucun fichier applicatif modifie.
- Aucun fichier MASTER modifie.
- Aucun `.diff` applicatif produit.

## 13. Git status final

```text
?? docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/
```
