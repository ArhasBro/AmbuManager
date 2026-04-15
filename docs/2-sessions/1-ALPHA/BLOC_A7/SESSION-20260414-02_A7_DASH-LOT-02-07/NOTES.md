# NOTES

## Méthode / observations

### 1. Logique de cadrage retenue
Le cadrage officiel et le plan imposent un dashboard ALPHA qui commence comme :
- portail d’accès ;
- point d’entrée ;
- distribution des accès selon permissions ;
- orientation utilisateur selon rôle.

La session a donc volontairement évité :
- tout cockpit analytique ;
- tout graphique ;
- tout indicateur planning fragile ;
- toute création d’un module hors dashboard.

### 2. Correction `DASH-02`
Le lien `Planning` était affiché sans contrôle préalable alors que `app/planning/page.tsx` refuse la consultation sans `PLANNING_VIEW_SELF` ou `PLANNING_VIEW_GLOBAL`.

Décision retenue :
- ne plus afficher le lien planning sans preuve d’accès réel ;
- tenir compte de l’absence de `companyId` pour éviter un lien mort vers `/planning`.

### 3. Portail d’accueil `DASH-03`
Le dashboard a été réécrit comme portail d’accueil lisible, simple et français, avec :
- en-tête d’accueil ;
- résumé de profil ;
- sections distinctes par usage ;
- cartes de navigation simples.

La route racine `/` a aussi été réalignée pour renvoyer :
- vers `/dashboard` si une session existe ;
- vers `/login` sinon.

### 4. Gestion d’accès `DASH-04`
Le portail ne publie plus une entrée sur simple présence d’un module visuel. Chaque lien affiché a été justifié par le code réel de sa page cible :
- `/planning` selon `canViewSelfPlanning` / `canViewGlobalPlanning` + `companyId` ;
- `/company` selon rôle natif `ADMIN` / `GERANT` ou permission `COMPANY_RULES_MANAGE` + `companyId` ;
- `/depots` selon rôle natif `ADMIN` / `GERANT` + `companyId` ;
- `/users` selon `USERS_MANAGE` + `companyId` ;
- `/vehicles` selon `VEHICLES_MANAGE` + `companyId` ;
- `/templates` selon `TEMPLATES_MANAGE` + `companyId`.

La zone admin reste publiée seulement si l’entrée dashboard admin est réellement autorisée via `DASHBOARD_ADMIN_ACCESS`, conformément à la matérialisation déjà présente du bloc RBAC.

### 5. Différenciation par rôle `DASH-05`
La différenciation demandée a été matérialisée au minimum entre :
- **vue terrain** ;
- **vue admin / gérance**.

La vue terrain ne montre que des accès opérationnels simples.  
La vue admin / gérance concentre les accès d’administration réellement disponibles.

### 6. Vue terrain `DASH-07`
Le catalogue contenait déjà `DASHBOARD_TERRAIN_ACCESS`, mais aucun helper ni aucune UI ne le consommaient.

Décision retenue :
- ajouter un helper dédié `canAccessTerrainDashboard()` ;
- matérialiser une section `Vue terrain` ;
- continuer à filtrer le lien planning d’abord par l’accès réel à `/planning`, pour ne pas masquer un accès réellement exploitable ni afficher de faux positifs.

### 7. Indicateurs simples `DASH-06`
Les seuls indicateurs ajoutés sont des compteurs simples, stables et déjà portés par des modèles Prisma existants :
- utilisateurs actifs ;
- véhicules actifs ;
- dépôts actifs ;
- templates actifs.

Restrictions retenues :
- uniquement pour les comptes natifs `ADMIN` / `GERANT` ;
- uniquement avec `companyId` ;
- aucun indicateur analytique planning ;
- aucun graphique.

### 8. Traitement des sessions sans société
Le dashboard affichait auparavant un portail potentiellement vide ou trompeur pour des sessions sans `companyId`.

Décision retenue :
- afficher un message explicite quand la session n’est rattachée à aucune société ;
- ne publier aucun lien module société dans ce cas.
