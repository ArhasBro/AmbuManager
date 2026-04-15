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
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `app/login/page.tsx`
- `app/planning/page.tsx`
- `app/company/page.tsx`
- `app/depots/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/templates/page.tsx`

### Documentation A7 réellement comparée
- `docs/2-sessions/1-ALPHA/BLOC_A7/SESSION-20260414-01_A7_DASH-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A7/SESSION-20260414-02_A7_DASH-LOT-02-07/*`
- `docs/3-patches/1-ALPHA/BLOC_A7/SESSION-20260414-01_A7_DASH-01/*`
- `docs/3-patches/1-ALPHA/BLOC_A7/SESSION-20260414-02_A7_DASH-LOT-02-07/*`

## Extraits documentaires déterminants

### 1. Cadrage officiel dashboard
`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:931-958`
- 14.1 : le dashboard doit être une page d’accueil donnant accès aux modules autorisés ;
- 14.2 : les indicateurs doivent rester simples ;
- 14.3 : le dashboard doit être différencié par rôle.

### 2. Règle verrouillée du bloc A7
`docs/1-master/PLAN_DE_DEVELOPPEMENT.md:513-544`
- portail d’accès ;
- point d’entrée ;
- distribution des accès selon permissions ;
- orientation utilisateur selon rôle ;
- pas de cockpit analytique ni d’écran dépendant de données instables.

## Extraits de code déterminants

### 1. La racine produit renvoie bien vers le portail réel
`app/page.tsx:1-10`
- session existante => redirection vers `/dashboard` ;
- pas de session => redirection vers `/login`.

### 2. La connexion conserve `/dashboard` comme entrée sûre par défaut
`app/login/page.tsx:7-18, 60-75`
- destination interne sûre par défaut : `/dashboard`.

### 3. Le dashboard consomme les contrôles utiles au portail
`app/dashboard/page.tsx:62-82`
- `canAccessAdminDashboard`
- `canAccessTerrainDashboard`
- `canViewSelfPlanning`
- `canViewGlobalPlanning`
- `canManageUsers`
- `canManageVehicles`
- `canManageTemplates`
- `canManageCompanyRules`

### 4. Le planning n’est publié qu’avec preuve d’accès réel
`app/dashboard/page.tsx:84-157`
- `companyId` requis ;
- `planningAllowed` calculé ;
- lien planning injecté seulement si `canViewSelfPlanning` ou `canViewGlobalPlanning`.

### 5. Les liens admin reflètent les pages cibles
`app/dashboard/page.tsx:159-201`
- `/company` selon rôle natif profil société ou `COMPANY_RULES_MANAGE` ;
- `/depots` selon `ADMIN` / `GERANT` ;
- `/users` selon `USERS_MANAGE` ;
- `/vehicles` selon `VEHICLES_MANAGE` ;
- `/templates` selon `TEMPLATES_MANAGE`.

### 6. La différenciation par rôle est visible dans le rendu
`app/dashboard/page.tsx:203-361`
- résumé de profil ;
- message session sans société ;
- section `Vue terrain` ;
- section `Vue admin / gérance` ;
- message explicite si aucun module n’est exploitable.

### 7. Les indicateurs restent simples
`app/dashboard/page.tsx:91-145, 310-329`
- seulement 4 compteurs ;
- uniquement sur `user`, `vehicle`, `depot`, `shiftTemplate` ;
- aucune logique analytique avancée.

## Justification croisée avec les pages cibles

### Planning
`app/planning/page.tsx:16-34`
- exige `user.id` et `user.companyId` ;
- refuse la consultation si ni `PLANNING_VIEW_SELF` ni `PLANNING_VIEW_GLOBAL`.

### Société
`app/company/page.tsx:26-33`
- exige `user.id` et `user.companyId` ;
- autorise via rôle natif profil société ou `COMPANY_RULES_MANAGE`.

### Dépôts
`app/depots/page.tsx:15-20`
- exige `user.id`, `user.companyId` et rôle `ADMIN` / `GERANT`.

### Utilisateurs
`app/users/page.tsx:19-24`
- exige `user.id`, `user.companyId` et `canManageUsers()`.

### Véhicules
`app/vehicles/page.tsx:9-20`
- exige session ;
- exige `canManageVehicles()` ;
- exige `companyId`.

### Templates
`app/templates/page.tsx:12-17`
- exige `user.id`, `companyId` et `canManageTemplates()`.

## Vérification du lot précédent

### Patch du lot `DASH-02` à `DASH-07`
Revalidation réellement exécutée sur copie temporaire du dépôt :
1. `git apply --reverse --check` du patch du lot : **OK**
2. `git apply --reverse` du patch du lot : **OK**
3. `git apply --check` du patch du lot sur l’état reconstitué : **OK**

Interprétation :
- le patch du lot précédent correspond bien au delta réellement intégré dans le code courant ;
- la documentation du lot reflète donc correctement le correctif produit sur le fond.

## Validations réellement exécutées

### `npm run lint`
Exécutée : OUI  
Résultat : KO  
Sortie réelle :
```text
> ambulance-manager@0.1.0 lint
> eslint .

sh: 1: eslint: not found
```

### `npm run build`
Exécutée : OUI  
Résultat : KO  
Sortie réelle :
```text
> ambulance-manager@0.1.0 build
> next build

sh: 1: next: not found
```

### Interprétation de validation
- les commandes ont été réellement lancées dans l’environnement présent ;
- l’extraction ZIP fournie ne contient pas les dépendances d’exécution ;
- il n’est donc pas possible, depuis cet environnement seul, de re-prouver localement les `OK` applicatifs annoncés pour le lot précédent ;
- cette limite de preuve locale ne révèle pas de résiduel dashboard strict dans le code contrôlé.
