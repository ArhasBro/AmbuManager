# EVIDENCES

## Sources utilisées

### Documentation de référence
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`

### Références amont du bloc support
- `docs/2-sessions/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-01_A2_SUP-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-02_A2_SUP-02/*`
- `docs/2-sessions/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-03_A2_SUP-03/*`

### Code inspecté
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `lib/services/users/assign-user-depot.ts`
- `app/users/page.tsx`
- `app/users/reset-password-client.tsx`
- `app/users/user-depot-assignment-client.tsx`
- `app/dashboard/page.tsx`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `lib/auth.ts`
- `prisma/schema.prisma`

### Patch final retenu
- `docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-04_A2_SUP-04/SUP-04.diff`

## Constats factuels avant correctif

### 1. Le garde-fou support existait déjà côté permissions, mais n’était pas toujours utilisé
Constat relevé dans `lib/permissions.ts` :
- `hasPermissionAccess(...)` renvoie `false` pour `isGlobalSupport(platformRole)`.
Constat relevé dans les surfaces users :
- plusieurs appels à `canManageUsers(...)` ne transmettaient pas encore `platformRole`.

### 2. La liste `/api/users` restait bornée au seul `companyId`
Constat relevé dans `app/api/users/route.ts` avant correctif :
- `findMany({ where: { companyId } })`
- aucune exclusion explicite des comptes plateforme ;
- aucune exigence explicite d’un `role` tenant non nul.

### 3. Les flux de mutation users ciblaient encore uniquement `id + companyId`
Constat relevé avant correctif :
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `lib/services/users/assign-user-depot.ts`

Ces flux ne formulaient pas explicitement que la cible devait être un utilisateur de société administrable.

### 4. Le dépôt ne contient pas d’UI complète d’attribution de rôles client
Constat relevé sur les surfaces présentes :
- la page utilisateurs couvre surtout le reset mot de passe et le rattachement dépôt ;
- aucune UI complète de création/édition de rôles client n’a été trouvée ;
- aucune surface future n’a donc été ajoutée dans `SUP-04`.

## Correctif code effectivement retenu

### Fichiers modifiés
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `lib/services/users/assign-user-depot.ts`
- `app/users/page.tsx`
- `app/users/reset-password-client.tsx`
- `app/users/user-depot-assignment-client.tsx`

### Correctifs effectivement introduits
- passage explicite de `platformRole` dans les contrôles `canManageUsers(...)` des surfaces users ciblées ;
- filtrage `/api/users` sur :
  - `companyId`
  - `platformRole: null`
  - `role: { not: null }`
- durcissement de la cible `reset-password` sur les mêmes critères ;
- durcissement de la cible `assign-user-depot` sur les mêmes critères ;
- clarification minimale des textes UI côté client pour expliciter l’exclusion des comptes support globaux.

## Validation réellement obtenue


### Validation d’application du patch
- `git apply --check` du patch `SUP-04.diff` sur une copie propre du dépôt : **OK**
- `git apply` du patch `SUP-04.diff` sur une copie propre du dépôt : **OK**

### Validation terminale dans ce conteneur

### Installation préalable
- `npm ci` : **NOK dans ce conteneur**
- motif observé : interruption par `SIGTERM` pendant `reify`

### Journaux relevés
- `/home/oai/.npm/_logs/2026-03-19T13_12_25_972Z-debug-0.log`
- `/home/oai/.npm/_logs/2026-03-19T13_14_25_205Z-debug-0.log`

### Conséquence
Les validations terminales obligatoires suivantes ne sont **pas confirmées** dans ce conteneur :
- `npx prisma validate`
- `npx prisma generate`
- `npm run lint`
- `npm run build`

## Conclusion factuelle

Le patch `SUP-04` répond au périmètre fonctionnel demandé sur les surfaces client réellement présentes :
- le support global n’est plus remonté comme utilisateur de société administrable via la source `/api/users` ;
- les flux client existants de reset mot de passe et de rattachement dépôt sont explicitement bornés aux utilisateurs de société ;
- aucun droit global implicite supplémentaire n’est accordé.

En revanche, les validations terminales obligatoires ne sont pas obtenues dans ce conteneur en raison d’un blocage npm local.
