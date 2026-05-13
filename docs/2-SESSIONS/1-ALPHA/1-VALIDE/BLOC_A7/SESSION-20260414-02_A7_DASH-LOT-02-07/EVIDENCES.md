# EVIDENCES

## Sources utilisées

### Documentation officielle
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code réellement inspecté
- `app/dashboard/page.tsx`
- `app/page.tsx`
- `app/login/page.tsx`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `app/planning/page.tsx`
- `app/company/page.tsx`
- `app/depots/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/templates/page.tsx`

## Extraits documentaires déterminants

### 1. Cadrage officiel dashboard
`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:931-959`
- 14.1 : le dashboard doit être une page d’accueil donnant accès aux modules autorisés ;
- 14.2 : les indicateurs doivent rester simples ;
- 14.3 : le dashboard doit être différencié par rôle.

### 2. Règle verrouillée du bloc A7
`docs/1-master/PLAN_DE_DEVELOPPEMENT.md:515-544`
- le dashboard ALPHA doit commencer comme portail d’accès stable ;
- il ne doit pas commencer comme cockpit analytique riche ;
- `DASH-02` à `DASH-07` couvrent exactement le périmètre traité ici.

## Extraits de code déterminants

### 1. La racine applicative devient une vraie entrée contextualisée
`app/page.tsx:1-10`
- la route `/` détecte désormais la session ;
- elle redirige vers `/dashboard` si la session existe ;
- elle conserve `/login` sinon.

### 2. Le dashboard consomme les permissions réellement utiles au portail
`app/dashboard/page.tsx:79-97`
- `canAccessAdminDashboard`
- `canAccessTerrainDashboard`
- `canViewSelfPlanning`
- `canViewGlobalPlanning`
- `canManageUsers`
- `canManageVehicles`
- `canManageTemplates`
- `canManageCompanyRules`

### 3. Le lien planning n’est plus publié sans preuve d’accès réel
`app/dashboard/page.tsx:99-154`
- prise en compte de `companyId` ;
- calcul de `planningAllowed` ;
- publication du lien planning seulement dans `terrainLinks`.

### 4. Les indicateurs simples sont limités à des données stables
`app/dashboard/page.tsx:104-142`
- compteurs Prisma simples uniquement ;
- `user`, `vehicle`, `depot`, `shiftTemplate` ;
- aucun calcul planning avancé.

### 5. Les liens admin sont publiés selon les droits réels des pages cibles
`app/dashboard/page.tsx:156-201`
- `/company` : rôle natif de profil société ou `COMPANY_RULES_MANAGE` ;
- `/depots` : `ADMIN` / `GERANT` ;
- `/users` : `USERS_MANAGE` ;
- `/vehicles` : `VEHICLES_MANAGE` ;
- `/templates` : `TEMPLATES_MANAGE` ;
- le tout seulement si la session est rattachée à une société.

### 6. La différenciation par rôle est matérialisée dans le rendu
`app/dashboard/page.tsx:203-358`
- section d’accueil générale ;
- section `Vue terrain` ;
- section `Vue admin / gérance` ;
- message explicite si la session n’a pas de société ;
- message explicite si aucun module n’est exploitable.

### 7. La permission terrain est désormais matérialisée par un helper réel
`lib/permissions.ts:109-115`
- `canAccessAdminDashboard()` déjà existant ;
- `canAccessTerrainDashboard()` ajouté pour `DASHBOARD_TERRAIN_ACCESS`.

## Justification croisée avec les pages cibles

### Planning
`app/planning/page.tsx:20-40`
- exige `user.id` et `user.companyId` ;
- refuse la consultation sans `PLANNING_VIEW_SELF` ou `PLANNING_VIEW_GLOBAL`.

### Société
`app/company/page.tsx:28-33`
- exige `user.id` et `user.companyId` ;
- refuse l’accès si ni profil société natif ni `COMPANY_RULES_MANAGE`.

### Dépôts
`app/depots/page.tsx:18-20`
- exige `user.id`, `user.companyId` et rôle `ADMIN` / `GERANT`.

### Utilisateurs
`app/users/page.tsx:22-24`
- exige `user.id`, `user.companyId` et `USERS_MANAGE`.

### Véhicules
`app/vehicles/page.tsx:17-20`
- exige `user.id`, `VEHICLES_MANAGE` et `companyId`.

### Templates
`app/templates/page.tsx:16-17`
- exige `user.id`, `companyId` et `TEMPLATES_MANAGE`.

## Validations réellement exécutées

### Contrôle du patch
- `git apply --check /mnt/data/patches/PATCH__SESSION-20260414-02_A7_DASH-LOT-02-07.diff`
- Résultat : **OK** sur une extraction propre du ZIP fourni.

### `npm run lint`
Exécutée : OUI  
Résultat : **OK**

### `npm run build`
Exécutée : OUI  
Résultat : **OK**

### Interprétation
Les validations applicatives sont prouvées par les logs fournis pour cette session : `npm run lint` et `npm run build` sont **OK**.
