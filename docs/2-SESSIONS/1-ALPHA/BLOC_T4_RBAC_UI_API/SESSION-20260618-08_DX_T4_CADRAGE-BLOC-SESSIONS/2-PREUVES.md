# 2 - Preuves

## 1. Fichiers lus

### MASTER

- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`

### RBAC et support

- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `lib/company-rules/governance.ts`
- `lib/services/audit/support-action-trace.ts`
- `lib/services/audit/audit-context.ts`

### Pages et API sensibles

- `app/layout.tsx`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/depots/page.tsx`
- `app/depots/depots-client.tsx`
- `app/users/page.tsx`
- `app/users/user-creation-client.tsx`
- `app/users/user-edit-client.tsx`
- `app/users/user-archive-client.tsx`
- `app/users/user-depot-assignment-client.tsx`
- `app/users/reset-password-client.tsx`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/audit/page.tsx`
- `app/audit/audit-client.tsx`
- `app/api/audit/route.ts`
- `app/api/company/profile/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/shifts/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/[id]/archive/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/[id]/archive/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`

### Base44 et fiches metier

- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/lib/userPermissions.js`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/lib/AuthContext.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/components/ProtectedRoute.jsx`
- `docs/1-MASTER/3-FONCTIONNALITES/8-FONCTIONNALITES_DETAILLEES_SOCIETE_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/6.1-FONCTIONNALITES_DETAILLEES_SUIVI_DES_VEHICULES_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/10-FONCTIONNALITES_DETAILLEES_AUDIT_V1.md`

## 2. Commandes executees

- `git status --short`
- `Get-ChildItem -LiteralPath "docs/1-MASTER" -Recurse -File`
- `Get-ChildItem -LiteralPath "docs/2-SESSIONS/1-ALPHA" -Recurse -File`
- `Get-ChildItem -LiteralPath "lib" -Recurse -File`
- `Get-ChildItem -LiteralPath "app/api" -Recurse -File`
- `Get-ChildItem -LiteralPath "scripts/quality" -Recurse -File`
- `Get-Content -LiteralPath "docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md" -Raw`
- `Get-Content -LiteralPath "docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md" -Raw`
- `Get-Content -LiteralPath "docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-08_DX_T4_CADRAGE-BLOC-SESSIONS/1-SESSION.md" -Raw`
- `Get-Content -LiteralPath "docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-08_DX_T4_CADRAGE-BLOC-SESSIONS/3-FIN_DE_SESSION.md" -Raw`
- `Get-Content -LiteralPath "docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-08_DX_T4_CADRAGE-BLOC-SESSIONS/2-PREUVES.md" -Raw`
- `Get-Content -LiteralPath "lib/permission-catalog.ts" -Raw`
- `Get-Content -LiteralPath "lib/permissions.ts" -Raw`
- `Get-Content -LiteralPath "lib/rbac.ts" -Raw`
- `Get-Content -LiteralPath "scripts/quality/smoke-api-critical-contracts.test.mjs" -Raw`
- `Get-Content -LiteralPath "scripts/quality/targeted-sensitive-blocks.test.mjs" -Raw`
- `rg -n "BLOC T4|DX_T4_|T4 - RBAC" "docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md"`
- `rg -n "canManage|canView|canAccess|canEdit|Permission|permission" "app" "lib"`
- `rg -n "PlatformRole|SUPPORT|allowSupport|isGlobalSupport|role === \"ADMIN\"|role === \"GERANT\"" "app" "lib"`
- `rg -n "DashboardPreference|CompanyContact|VehicleCheck|VehicleAnomaly|Disinfection|availability|contact" "app" "lib" "docs/1-MASTER/3-FONCTIONNALITES" "docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src"`
- `rg -n "DEPOTS_MANAGE|VEHICLES_AVAILABILITY|VEHICLES_CHECK|USERS_PASSWORD_RESET|USERS_ROLES_EDIT|TEMPLATES_ARCHIVE|TEMPLATES_RESTORE|COMPANY_MANAGE|PLANNING_PUBLISH|PLANNING_CANCEL" "docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/lib/userPermissions.js"`
- `rg -n "userPermissions|can\\(" "docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src"`
- `rg -n "correction UI|separ|separa" "docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-08_DX_T4_CADRAGE-BLOC-SESSIONS/2-PREUVES.md"`
- `rg -n "Ã|é|è|ê|à|ç|ù|â|î|ô|û" "docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-08_DX_T4_CADRAGE-BLOC-SESSIONS/2-PREUVES.md"`

## 3. Synthese du bloc T4

- T4 reste un bloc RBAC UI/API progressif.
- L API est la barriere reelle de securite.
- Base44 est seulement une reference fonctionnelle, metier et visuelle.
- Les sujets `contacts societe`, `suivi vehicules` et `dashboard preferences` sont hors T4 et restent reportes vers les blocs P concernes.
- Les arbitrages restants avant audit T4 sont maintenant fixes:
  - `DEPOTS_MANAGE` = permission dediee pour les actions sensibles sur depots / bases.
  - `COMPANY_MANAGE` = droit large conserve pour le noyau societe.
  - `reset password` = action administrative actuelle a garder, sans nouvelle permission.
  - `archive/restoration` = archive-only dans T4.
  - `disponibilite vehicule` = reportee vers P-VEHICULES / P-SUIVI-VEHICULES.
  - `ROLES_PERMISSIONS_MANAGE` = dormant en Alpha.
- Il ne reste pas de question bloquante de principe sur le RBAC T4.

## 4. Tableau d analyse des sessions prevues

| Session | Nature | Type metier | Objectif | Diagnostic | Taille estimee | Risque | Action recommandee | Justification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `DX_T4_CADRAGE-BLOC-SESSIONS` | DX | AUDIT+CADRAGE | Analyser la coherence du bloc T4 et de ses sessions avant demarrage. | Session juste et necessaire. | Petite | Faible | CONSERVER | C est la bonne session de gate pour verrouiller le perimetre T4 sans toucher au code. |
| `DX_T4_AUDIT-MATRICE-RBAC` | DX | AUDIT | Cartographier roles, permissions, helpers et endpoints sensibles. | Utile et maintenant bien bornee par les decisions d arbitrage. | Moyenne | Moyen | CONSERVER | La matrice peut etre auditee sans rouvrir les sujets reportes hors T4. |
| `DX_T4_CADRAGE-PERMISSIONS-MANQUANTES` | DX | CADRAGE | Preparer les decisions sur permissions manquantes ou trop larges. | Encore utile, mais sa portee doit rester centree sur les decisions deja tranchees et leurs consequences. | Petite a moyenne | Faible | COMPLETER | La session sert surtout a documenter le cadrage final, pas a reouvrir les points sortis de T4. |
| `CX_T4_CORRECTION-ENDPOINTS-CRITIQUES` | CX | CORRECTION | Corriger les endpoints sensibles dont le controle serveur est incoherent avec la matrice validee. | Trop large si elle reste transversale. | Grande | Eleve | DECOUPER | La correction doit se faire par domaine, avec API et UI dans le meme lot. |
| `CX_T4_CORRECTION-ACTIONS-UI` | CX | CORRECTION | Aligner visibilite et disabled des actions UI sur la matrice validee. | Redondante comme session autonome. | Grande | Eleve | SUPPRIMER | Les corrections UI doivent etre absorbees dans les lots de domaine. |
| `DX_T4_VALIDATION-CLOTURE-RBAC-SENSIBLE` | DX | VALIDATION+CLOTURE | Controler les contrats RBAC critiques sans correction. | Necessaire en cloture. | Petite | Faible | CONSERVER | La validation finale doit confirmer la barriere serveur, la trace support et les reports. |

## 5. Sessions a conserver

- `DX_T4_CADRAGE-BLOC-SESSIONS`
- `DX_T4_AUDIT-MATRICE-RBAC`
- `DX_T4_VALIDATION-CLOTURE-RBAC-SENSIBLE`

## 6. Sessions a completer

- `DX_T4_CADRAGE-PERMISSIONS-MANQUANTES` doit enregistrer les decisions finales et leurs impacts, sans reouvrir les sujets reportes.
- `DX_T4_AUDIT-MATRICE-RBAC` doit verifier que les actions sensibles restantes sont bien bornees par l API.

## 7. Sessions a decouper

- `CX_T4_CORRECTION-ENDPOINTS-CRITIQUES`

## 8. Sessions a fusionner

- `CX_T4_CORRECTION-ACTIONS-UI` doit etre absorbee dans les lots de correction par domaine.

## 9. Sessions a reporter

- `contacts societe` est reporte hors T4.
- `suivi vehicules` est reporte hors T4.
- `dashboard preferences` est reporte apres stabilisation du portail.
- Tout cadrage qui tente de reintroduire ces sujets dans T4 doit etre reporte vers les blocs P concernes.

## 10. Sessions a supprimer

- `CX_T4_CORRECTION-ACTIONS-UI` comme session autonome.

## 11. Sessions manquantes proposees

| Session proposee | Nature | Type metier | Pourquoi elle manque |
| --- | --- | --- | --- |
| `CX_T4_CORRECTION-RBAC-REFERENTIELS` | CX | CORRECTION | Pour corriger les surfaces users, company et depots dans un lot suffisamment petit. |
| `CX_T4_CORRECTION-RBAC-VEHICULES` | CX | CORRECTION | Pour corriger les actions vehicles deja existantes sans deborder vers la disponibilite avancee ou le suivi. |

## 12. Ordre d execution recommande

1. `DX_T4_CADRAGE-BLOC-SESSIONS`
2. `DX_T4_AUDIT-MATRICE-RBAC`
3. `DX_T4_CADRAGE-PERMISSIONS-MANQUANTES`
4. `CX_T4_CORRECTION-RBAC-REFERENTIELS`
5. `CX_T4_CORRECTION-RBAC-VEHICULES`
6. `DX_T4_VALIDATION-CLOTURE-RBAC-SENSIBLE`

## 13. Questions a arbitrer

### BLOQUANT AVANT DEVELOPPEMENT

| Question | Pourquoi c est important | Impact si non arbitre | Session concernee | Recommandation eventuelle |
| --- | --- | --- | --- | --- |
| Aucune question bloquante restante. | Les decisions T4 sont maintenant tranchees. | Aucun impact de cadrage supplementaire sur le demarrage T4. | N/A | Lancer les sessions de cadrage et d audit prevues. |

### A CONFIRMER MAIS NON BLOQUANT

| Question | Pourquoi c est important | Impact si non arbitre | Session concernee | Recommandation eventuelle |
| --- | --- | --- | --- | --- |
| Faut-il signaler `ROLES_PERMISSIONS_MANAGE` comme permission existante non utilisee ou comme permission a confirmer dans les notes d audit ? | Cela clarifie la lecture du catalogue sans rouvrir la gouvernance. | Aucun impact sur le demarrage T4. | `DX_T4_AUDIT-MATRICE-RBAC` | Le signaler comme dormant / a confirmer. |

### PEUT ETRE DECIDE PLUS TARD

| Question | Pourquoi c est important | Impact si non arbitre | Session concernee | Recommandation eventuelle |
| --- | --- | --- | --- | --- |
| Les blocs P-SOCIETE, P-DEPOTS-BASES, P-VEHICULES, P-SUIVI-VEHICULES et P-DASHBOARD doivent-ils recevoir un rappel explicite "Point a ne pas oublier pendant la session AUDIT+CADRAGE" ? | Cela ancre les reports hors T4 dans les futurs cadrages. | Aucun impact sur T4 lui-meme. | Blocs P concernes | Ajouter ces rappels dans les blocs concernes lors de leur preparation. |

## 14. Risques de perimetre

- Le bloc T4 ne doit pas deborder vers P-SOCIETE, P-VEHICULES, P-SUIVI-VEHICULES ou P-DASHBOARD.
- Les sujets reportes ne doivent pas reentrer dans T4 sous forme de faux arbitrages.
- La correction UI ne doit pas rester isolee de la correction API.
- Le support global doit rester limite et trace.
- L archive-only ne doit pas etre confondue avec une restauration implicite.

## 15. Risques de surconsommation de credits

- Une session UI autonome de plus alimente des passes inutiles.
- Les sujets reportes hors T4 font gonfler le nombre de sessions sans benefice RBAC.
- Les corrections API et UI non fusionnees par domaine multiplient les revues.
- Les arbitrages deja fixes ne doivent pas etre reposes dans une nouvelle session de cadrage.

## 16. Limites et informations non fournies

- Aucune information bloquante supplementaire dans T4 apres arbitrage.
- Les details des blocs P reportes doivent etre traites dans leurs propres sessions de cadrage.

## 17. Absence de modification applicative

- Aucun fichier applicatif n a ete modifie.
- Aucun fichier MASTER n a ete modifie.
- Aucun build, aucun dev server, aucun navigateur et aucune capture n ont ete lances.
- Session documentaire uniquement.

## 18. Git status

```text
?? docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/
```
