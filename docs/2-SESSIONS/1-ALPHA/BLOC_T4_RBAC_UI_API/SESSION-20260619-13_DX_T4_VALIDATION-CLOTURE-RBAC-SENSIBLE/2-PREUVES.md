# 2 - Preuves

## 1. Etat Git initial

Commande :

```text
git status --short
```

Resultat visible :

```text
<vide>
```

## 2. Scripts qualite identifies

Commande :

```text
node -e "const p=require('./package.json'); console.log(JSON.stringify(p.scripts,null,2))"
```

Scripts identifies :

- `lint`
- `build`
- `test:smoke`
- `test:targeted`
- `test:quality`
- `docs:encoding`
- scripts DB `db:seed`, `db:migrate`, `db:studio`, `db:backup`, `db:restore`, `db:reset`

`test:quality` est compose de `npm run test:smoke && npm run test:targeted`.

## 3. Resultat de `npm run test:quality`

Commande :

```text
npm run test:quality
```

Resultat visible :

- `test:smoke` a commence et a echoue sur 1 assertion.
- 7 tests sur 8 ont passe dans `smoke-api-critical-contracts.test.mjs`.
- L echec concerne la page privacy, pas les contrats RBAC T4.

Extrait visible :

```text
- FAIL: privacy mentions stay reachable from login
AssertionError [ERR_ASSERTION]: privacy page must expose RGPD information
```

Interpretation :

- Ecart non bloquant pour cette session RBAC.
- Ecart hors perimetre T4 sensible.

## 4. Resultat de `npm run test:targeted`

Commande :

```text
npm run test:targeted
```

Resultat visible :

- 7 tests sur 7 ont passe.
- Un warning Node sur le type de module a ete affiche, sans impact fonctionnel.

Extrait visible :

```text
- PASS: API response helpers return the expected status codes and shapes
- PASS: serializeDates converts nested Date values into ISO strings
- PASS: template rules keep ALPHA defaults and normalize colors
- PASS: template slot and vehicle role compatibility stays coherent
- PASS: planning quality calculation keeps a meaningful quality score and explanations
- PASS: password policy rejects weak passwords and accepts hardened ones
- PASS: proxy covers sensitive authenticated application pages
```

## 5. Extraits RBAC serveur

### 5.1 `lib/permissions.ts`

- `hasPermissionAccess` court-circuite les comptes support globaux via `isGlobalSupport`.
- Les helpers sensibles `canManageUsers`, `canManageDepots`, `canManageVehicles`, `canManageTemplates`, `canManageCompanyRules`, `canEditPlanning`, `canExportPlanning`, `canAutoSchedule`, `canPublishAutoSchedule`, `canCancelAutoSchedule` passent par ce gate.
- `canViewAudit` est le seul helper qui autorise explicitement le support via `allowSupport: true`.
- `canCreateVehicle` renvoie `false` pour le support global.

### 5.2 `lib/rbac.ts`

- `requireRole` n autorise le support global que si `allowGlobalSupport` est vrai.
- Aucun contournement implicite n est present.

### 5.3 Routes API sensibles users

- `app/api/users/route.ts` utilise `canManageUsers`.
- `app/api/users/[id]/route.ts` utilise `canManageUsers` pour GET et PATCH.
- `app/api/users/[id]/archive/route.ts` utilise `canManageUsers`.
- `app/api/users/[id]/depot/route.ts` utilise `canManageUsers`.
- `app/api/users/[id]/reset-password/route.ts` utilise `canManageUsers`.
- `app/api/users/[id]/absences/route.ts` et `app/api/users/[id]/absences/[absenceId]/route.ts` utilisent aussi `canManageUsers`.
- Les mutations users gardent une trace de type `writePersonalDataAudit`.
- La delegation `COMPANY_RULES_MANAGE` est verouillee pour les comptes non natifs de gouvernance via `canGovernCompanyRulesDelegation`.

### 5.4 Routes API sensibles depots

- `app/api/depots/route.ts` utilise `canManageDepots`.
- `app/api/depots/[id]/route.ts` utilise `canManageDepots`.
- `app/api/depots/[id]/archive/route.ts` utilise `canManageDepots`.
- Les services depots appellent `traceSupportAction`, mais cette trace ne peut pas s executer sans un acteur support reel, et les gates amont denient le support.

### 5.5 Routes API sensibles vehicles

- `app/api/vehicles/route.ts` utilise `canManageVehicles` pour la liste et `canCreateVehicle` pour la creation.
- `app/api/vehicles/[id]/route.ts` utilise `canManageVehicles`.
- `app/api/vehicles/[id]/archive/route.ts` utilise `canManageVehicles`.
- `app/api/vehicles/[id]/depot/route.ts` utilise `canManageVehicles`.
- Le support global est exclu de la creation via `canCreateVehicle`.

### 5.6 Routes API sensibles templates et planning

- `app/api/templates/route.ts`, `app/api/templates/[id]/route.ts`, `app/api/templates/[id]/archive/route.ts` utilisent `canManageTemplates`.
- `app/api/planning/shifts/route.ts` combine `canViewSelfPlanning`, `canViewGlobalPlanning` et `canViewAudit`.
- `app/api/planning/shifts/[id]/route.ts`, `app/api/planning/shifts/[id]/cancel/route.ts` et `app/api/planning/shifts/[id]/assign/route.ts` utilisent `canEditPlanning`.
- `app/api/planning/exports/route.ts` utilise `canExportPlanning`.
- `app/api/planning/autoschedule/day/route.ts`, `week/route.ts`, `runs/[id]/route.ts`, `runs/[id]/cancel/route.ts`, `runs/[id]/publish/route.ts`, `runs/[id]/match/route.ts`, `runs/[id]/match/preview/route.ts`, `runs/[id]/match/apply/route.ts` utilisent `canAutoSchedule`, `canPublishAutoSchedule` ou `canCancelAutoSchedule` selon l action.

### 5.7 Routes API societe et audit

- `app/api/company/rules/route.ts` utilise `canManageCompanyRules`.
- `app/api/company/profile/route.ts` reste sur un gate role only `ADMIN` / `GERANT` avec `companyId` requis.
- `app/api/audit/route.ts` utilise `canViewAudit` et `resolveAuditCompanyId`.
- Le support global est autorise en lecture d audit seulement.

## 6. Extraits UI critiques

### 6.1 Navigation et dashboard

- `app/layout.tsx` masque les entrees sensibles selon les memes drapeaux que le serveur.
- `auditNavAllowed` autorise le support global seulement pour l audit.
- `companyNavAllowed`, `depotsNavAllowed` et `onboardingNavAllowed` restent relies a la societe courante et aux roles autorises.
- `app/dashboard/page.tsx` reprend la meme logique d exposition.

### 6.2 Users

- `app/users/page.tsx` bloque la page si `canManageUsers` est faux.
- `app/users/user-creation-client.tsx` verrouille la case `COMPANY_RULES_MANAGE` si `canGovernCompanyRules` est faux.
- `app/users/user-edit-client.tsx` verrouille le role et la permission `COMPANY_RULES_MANAGE` pour les comptes non natifs de gouvernance.
- `app/users/user-depot-assignment-client.tsx` indique explicitement que les comptes support globaux sont exclus.
- `app/users/reset-password-client.tsx` et `app/users/user-archive-client.tsx` restent des operations RH admin uniquement.

### 6.3 Vehicles

- `app/vehicles/page.tsx` bloque la page si `canManageVehicles` est faux.
- `app/vehicles/vehicles-client.tsx` desactive le bouton de creation si `canCreateVehicle` est faux.
- La creation, la modification, l archivage et l affectation de depot restent alignees avec le serveur.

### 6.4 Planning

- `app/planning/page.tsx` bloque l acces si l utilisateur ne peut ni voir son planning ni le planning global.
- `app/planning/planning-client.tsx` desactive les onglets et actions selon `canAutoSchedule`, `canEditPlanning`, `canViewAudit` et `canExportPlanning`.
- `app/planning/manual-planning-panel.tsx` masque l historique si `canViewAudit` est faux.

### 6.5 Societe et audit

- `app/company/page.tsx` expose le profil societe uniquement pour les roles natifs ou les regles metier autorisees.
- `app/company/company-profile-form.tsx` ne publie qu un PATCH vers la route serveur protegee.
- `app/company/company-rules-panel.tsx` est purement consultatif.
- `app/audit/page.tsx` transmet `isGlobalSupport` au client audit.
- `app/audit/audit-client.tsx` permet de changer de societe seulement quand `isGlobalSupport` est vrai.

## 7. Verification support

Commande et lecture :

```text
rg -n -C 4 "SUPPORT|platformRole: PlatformRole.SUPPORT|companyId: null|role: null" prisma/seed.ts
```

Resultat visible :

- Le support seed est cree avec `platformRole=SUPPORT`.
- Le support seed a `role=null`.
- Le support seed a `companyId=null`.
- Le support seed a `depotId=null`.

Conclusion support :

- Le support global est prevu comme compte hors societe.
- Les mutateurs sensibles denient le support via les helpers RBAC.
- L unique exception fonctionnelle volontaire est la lecture d audit.

## 8. Classification des ecarts

### Bloquants

- Aucun ecart bloquant prouve.

### Non bloquants

- `npm run test:quality` echoue sur une assertion privacy hors perimetre T4.
- Un warning Node sur le type de module apparait dans `npm run test:targeted`, sans impact fonctionnel.
- Quelques gates role only de societe / onboarding / listing autoschedule restent relies au fait que le support global soit hors societe (`companyId=null`), ce qui est conforme au seed courant mais reste a revalider si le modele support evolue.

## 9. Etat Git final

Commande :

```text
git status --short
```

Resultat :

```text
?? docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260619-13_DX_T4_VALIDATION-CLOTURE-RBAC-SENSIBLE/
```
