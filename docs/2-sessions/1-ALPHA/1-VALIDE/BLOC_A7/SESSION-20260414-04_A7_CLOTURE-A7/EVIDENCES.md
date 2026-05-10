# EVIDENCES

## Sources utilisées

### Documentation officielle
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Sessions / patchs A7 réellement comparés
- `docs/2-sessions/1-ALPHA/BLOC_A7/SESSION-20260414-01_A7_DASH-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A7/SESSION-20260414-02_A7_DASH-LOT-02-07/*`
- `docs/2-sessions/1-ALPHA/BLOC_A7/SESSION-20260414-03_A7_DASH-08/*`
- `docs/3-patches/1-ALPHA/BLOC_A7/SESSION-20260414-01_A7_DASH-01/*`
- `docs/3-patches/1-ALPHA/BLOC_A7/SESSION-20260414-02_A7_DASH-LOT-02-07/*`
- `docs/3-patches/1-ALPHA/BLOC_A7/SESSION-20260414-03_A7_DASH-08/*`

### Code réellement inspecté
- `app/dashboard/page.tsx`
- `app/page.tsx`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `app/login/page.tsx`
- `app/planning/page.tsx`
- `app/company/page.tsx`
- `app/depots/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/templates/page.tsx`

## Extraits documentaires déterminants

### 1. Cadrage officiel dashboard
`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:929-958`
- 14.1 : le dashboard doit être une page d’accueil donnant accès aux modules autorisés
- 14.2 : les indicateurs doivent rester simples
- 14.3 : le dashboard doit être différencié par rôle

### 2. Permissions fines ALPHA utiles à A7
`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:385-409`
- présence de `DASHBOARD_ADMIN_ACCESS`
- présence de `DASHBOARD_TERRAIN_ACCESS`
- permissions planning / users / vehicles / templates / règles métier

### 3. Règle verrouillée du bloc A7
`docs/1-master/PLAN_DE_DEVELOPPEMENT.md:513-537`
- portail d’accès
- point d’entrée
- distribution des accès selon permissions
- orientation utilisateur selon rôle
- pas de cockpit analytique
- pas d’écran dépendant de données instables

### 4. Règle de clôture de bloc
`docs/1-master/DOCUMENT_MAITRE.md:52-62`
- clôture sur code réel
- patchs réellement produits
- documentation finale
- validations terminales réellement relancées ou constatées

## Extraits de code déterminants

### 1. `/dashboard` comme vraie entrée authentifiée
`app/page.tsx:1-9`
- session existante => redirection vers `/dashboard`
- sinon => `/login`

### 2. `/login` garde `/dashboard` comme destination sûre par défaut
`app/login/page.tsx:7-15`
`app/login/page.tsx:50-75`
- callback interne par défaut : `/dashboard`
- redirection finale sécurisée vers la cible interne

### 3. Le portail consomme les permissions réelles utiles
`app/dashboard/page.tsx:79-97`
- `canAccessAdminDashboard`
- `canAccessTerrainDashboard`
- `canViewSelfPlanning`
- `canViewGlobalPlanning`
- `canManageUsers`
- `canManageVehicles`
- `canManageTemplates`
- `canManageCompanyRules`

### 4. Le lien planning est publié seulement avec preuve d’accès exploitable
`app/dashboard/page.tsx:99-157`
- `companyId` requis
- `planningAllowed` calculé
- carte planning injectée dans `terrainLinks` uniquement si consultation réelle possible

### 5. Les indicateurs admin / gérance restent simples et stables
`app/dashboard/page.tsx:104-145`
`app/dashboard/page.tsx:310-329`
- 4 compteurs simples
- `user`, `vehicle`, `depot`, `shiftTemplate`
- pas de calcul riche sur planning

### 6. Les liens modules reflètent les gardes des pages cibles
`app/dashboard/page.tsx:159-201`
- `/company` selon rôle natif profil société ou `COMPANY_RULES_MANAGE`
- `/depots` selon `ADMIN` / `GERANT`
- `/users` selon `USERS_MANAGE`
- `/vehicles` selon `VEHICLES_MANAGE`
- `/templates` selon `TEMPLATES_MANAGE`
- tous conditionnés aussi par `companyId`

### 7. La différenciation par rôle est réellement matérialisée
`app/dashboard/page.tsx:203-361`
- résumé de profil
- message session sans société
- `Vue terrain`
- `Vue admin / gérance`
- message explicite si aucun module n’est exploitable

### 8. Le bloc debug ne vit qu’en non-production
`app/dashboard/page.tsx:363-367`
- aucun impact prouvé sur le comportement produit en production

### 9. La permission terrain existe réellement au niveau helper
`lib/permissions.ts:36-45`
`lib/permissions.ts:109-115`
- helper centralisé `hasPermissionAccess`
- helper réel `canAccessTerrainDashboard()`

### 10. Le catalogue de permissions A7 est bien matérialisé
`lib/permission-catalog.ts:82-91`
- `DASHBOARD_ADMIN_ACCESS`
- `DASHBOARD_TERRAIN_ACCESS`

## Justification croisée avec les pages cibles

### Planning
`app/planning/page.tsx:20-40`
- exige `user.id` et `user.companyId`
- refuse la consultation si ni `PLANNING_VIEW_SELF` ni `PLANNING_VIEW_GLOBAL`

### Société
`app/company/page.tsx:28-33`
- exige `user.id` et `user.companyId`
- autorise via rôle natif profil société ou `COMPANY_RULES_MANAGE`

### Dépôts
`app/depots/page.tsx:18-20`
- exige `user.id`, `user.companyId` et rôle `ADMIN` / `GERANT`

### Utilisateurs
`app/users/page.tsx:22-24`
- exige `user.id`, `user.companyId` et `canManageUsers()`

### Véhicules
`app/vehicles/page.tsx:17-18`
- exige `canManageVehicles()` et `companyId`

### Templates
`app/templates/page.tsx:16-17`
- exige `companyId` et `canManageTemplates()`

## Vérification du patch réel A7

### Patch du lot `DASH-02` à `DASH-07`
Fichier contrôlé :
- `docs/3-patches/1-ALPHA/BLOC_A7/SESSION-20260414-02_A7_DASH-LOT-02-07/PATCH__SESSION-20260414-02_A7_DASH-LOT-02-07.diff`

Contrôles réellement exécutés :
```text
git apply --check PATCH__SESSION-20260414-02_A7_DASH-LOT-02-07.diff
=> KO — patch déjà intégré dans le code courant

git apply --reverse --check PATCH__SESSION-20260414-02_A7_DASH-LOT-02-07.diff
=> OK
```

Interprétation :
- le patch du lot correspond bien au delta déjà intégré dans l’état courant
- le code actuel reflète donc le patch réel A7 produit

### Session `DASH-08`
- aucun patch code produit
- aucun `git apply --check` spécifique à exécuter

### Session `CLOTURE-A7`
- aucun patch code produit
- aucun `git apply --check` spécifique à exécuter

## Validations réellement exécutées

### Validations historiques documentées dans A7
Preuves documentaires relues :
- `docs/2-sessions/1-ALPHA/BLOC_A7/SESSION-20260414-02_A7_DASH-LOT-02-07/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A7/SESSION-20260414-02_A7_DASH-LOT-02-07/FIN_SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_A7/SESSION-20260414-02_A7_DASH-LOT-02-07/README_PATCH.md`
- `docs/2-sessions/1-ALPHA/BLOC_A7/SESSION-20260414-03_A7_DASH-08/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A7/SESSION-20260414-03_A7_DASH-08/FIN_SESSION.md`

Ce qui est documenté comme réellement exécuté :
- lot `DASH-02` à `DASH-07` :
  - `git apply --check` du patch : **OK**
  - `npm run lint` : **OK**
  - `npm run build` : **OK**
- `DASH-08` :
  - revalidation structurelle du patch du lot : **OK**
  - `npm run lint` : **KO** — `eslint: not found`
  - `npm run build` : **KO** — `next: not found`

### Rejeu local de clôture réellement exécuté
Sorties réelles constatées :
```text
> ambulance-manager@0.1.0 lint
> eslint .

sh: 1: eslint: not found
```

```text
> ambulance-manager@0.1.0 build
> next build

sh: 1: next: not found
```

Interprétation :
- les commandes ont bien été relancées dans l’environnement courant
- l’extraction ZIP fournie ne contient pas `node_modules`
- le rejeu local complet des validations applicatives `OK` du lot n’est donc pas re-prouvable ici
- cette limite de reproduction n’établit pas de résiduel fonctionnel dashboard dans le code contrôlé
