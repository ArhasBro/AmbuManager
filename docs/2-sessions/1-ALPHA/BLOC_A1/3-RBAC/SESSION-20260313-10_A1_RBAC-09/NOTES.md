# NOTES

## Nature de la session

Session de type **VALIDATION**.
Aucun correctif code n’est justifié ni ouvert dans `RBAC-09`.
Le travail consiste uniquement à vérifier l’état global réellement atteint du bloc rôles / permissions ALPHA.

## Rappel du cadrage utile

Le cadrage officiel du module 06 fixe les points structurants suivants :
- un catalogue de rôles métier : `GERANT`, `ADMIN`, `REGULATEUR`, `BUREAU`, `ADE`, `AA`, `TAXI` ;
- la possibilité de permissions additionnelles pour certains profils métier ;
- un rôle principal unique obligatoire ;
- un catalogue de permissions fines ALPHA ;
- un modèle d’accès à l’audit reposant sur `rôles natifs + permission dédiée` ;
- le multi-rôle reporté à plus tard.

Conséquence méthodologique :
- la validation ne doit pas exiger un multi-rôle actif ;
- elle doit juger le bloc ALPHA réellement livré, pas une cible théorique complète ;
- l’absence de consommation d’une permission sur un module non encore livré n’est pas automatiquement une non-conformité bloquante ;
- en revanche, lorsqu’un flux existe déjà, son mode de contrôle doit être évalué tel qu’il est réellement implémenté.

## Observations sur le code réel

### 1. Catalogue de rôles
Le dépôt porte désormais bien `ADE` dans l’enum Prisma, et la migration de renommage `DEA` → `ADE` est présente.
Sur ce point, le réalignement attendu par `RBAC-02` est effectif dans l’état courant.

### 2. Rôle principal unique obligatoire
Le modèle réel reste basé sur `User.role` scalaire obligatoire.
Aucune structure multi-rôle active n’a été trouvée dans le périmètre inspecté, ce qui est cohérent avec le cadrage `06.4` / `06.7`.

### 3. Séparation rôle principal / permissions additionnelles
Le dépôt sépare bien :
- le rôle principal sur `User.role` ;
- les permissions fines via `Permission` et `UserPermission`.

Le modèle cible ALPHA n’est donc plus un simple RBAC par rôle unique : une couche permissionnelle additionnelle réelle est présente.

### 4. Catalogue de permissions ALPHA
Le catalogue matérialisé dans `lib/permission-catalog.ts` couvre les permissions fines attendues par `06.5`, y compris :
- autoschedule ;
- publication / annulation de run ;
- gestion utilisateurs ;
- gestion véhicules ;
- gestion règles métier ;
- audit ;
- dashboard admin ;
- dashboard terrain ;
- permissions planning préparées.

Sur le plan purement catalogue, le bloc est cohérent.

### 5. Permissions réellement consommées
Des contrôles permissionnés réels existent sur plusieurs flux :
- gestion utilisateurs ;
- module véhicules en lecture / accès page ;
- règles métier en écriture ;
- édition planning sur l’assignation ;
- autoschedule jour / semaine / runs ;
- publication et annulation d’un run ;
- dashboard admin ;
- consultation audit sur le détail de run.

Cela confirme que le RBAC ALPHA n’est pas seulement déclaratif.

### 6. Permissions encore seulement cataloguées ou insuffisamment branchées
Plusieurs permissions restent sans consommation réelle prouvée dans le dépôt inspecté, notamment :
- `PLANNING_VIEW_SELF`
- `PLANNING_VIEW_GLOBAL`
- `PLANNING_SHIFT_CREATE_MANUAL`
- `PLANNING_SHIFT_EDIT_PUBLISHED`
- `PLANNING_SHIFT_CANCEL_PUBLISHED`
- `ROLES_PERMISSIONS_MANAGE`
- `TEMPLATES_MANAGE`
- `PLANNING_EXPORT`
- `DASHBOARD_TERRAIN_ACCESS`

Impact :
- cela n’annule pas la cohérence structurelle du bloc ;
- mais cela empêche un verdict `conforme`, car le catalogue ALPHA n’est pas encore uniformément consommé sur des contrôles prouvés.

### 7. Cas particulier du planning en lecture
Le point le plus limitant pour le verdict global est que les permissions de lecture planning ne sont pas réellement imposées sur les flux de lecture déjà présents :
- `app/planning/page.tsx` autorise l’accès sur simple session valide ;
- `app/api/planning/shifts/route.ts` filtre par `companyId` mais ne distingue pas `PLANNING_VIEW_SELF` / `PLANNING_VIEW_GLOBAL`.

Ce constat montre qu’une partie du modèle permissionnel planning reste encore incomplètement branchée sur des flux déjà existants.

### 8. Cas particulier du module véhicules
Le module véhicules est partiellement permissionné :
- la page et le `GET` API utilisent `canManageVehicles()` ;
- mais `POST` et `DELETE` restent limités à `session.user.role === "ADMIN"`.

Le module est donc cohérent dans sa direction générale, mais pas encore homogène sur tous ses verbes métier.

### 9. Modèle d’accès audit
Le détail de run distingue bien désormais :
- le droit de voir le run ;
- le droit de voir l’audit.

Un utilisateur peut donc être refusé sur les deux, autorisé sur l’un seul, ou autorisé sur les deux selon le couple rôle / permission.
Ce point est conforme à l’intention validée en `RBAC-06` pour le périmètre réellement présent.

Le cas “support propriétaire” mentionné par le cadrage n’est pas prouvé dans le code inspecté, mais il n’est pas pertinent de le dégrader artificiellement puisque ce support n’est pas présent dans le dépôt courant.

### 10. Seed après RBAC-08
Le seed :
- garantit le catalogue de permissions ;
- stabilise l’affectation des permissions utilisateur ;
- purge les permissions obsolètes lors d’un reseed ;
- gère correctement le cas d’un utilisateur sans permission ;
- conserve le rôle principal séparé des permissions.

Le flux seed est donc cohérent avec l’état attendu après `RBAC-08`.

### 11. Auth / session / typings / usages
La chaîne auth reste cohérente :
- lecture DB de `role` et `companyId` ;
- portage JWT ;
- exposition en session ;
- typage aligné ;
- consommation réelle dans plusieurs pages et routes.

Il n’existe pas de contradiction prouvée entre le bloc RBAC courant et l’état auth/session déjà validé.

## Conclusion de travail

Le bloc rôles / permissions ALPHA est suffisamment matérialisé pour être jugé **au-delà d’un état incomplet**, mais il n’est pas encore **pleinement conforme** sur tout le périmètre permissionnel théorique du module 06.

Le bon verdict de session est donc : **`partiellement conforme`**.
