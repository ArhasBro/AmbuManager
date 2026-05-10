# NOTES

## Méthode / observations

Session menée strictement comme **session dédiée de clôture de bloc** :

1. relecture des masters et du protocole ;
2. relecture des documents A11 réellement présents ;
3. relecture des patchs A11 réellement présents ;
4. contrôle du code courant sur le périmètre explicitement demandé ;
5. recoupement des validations terminales réellement prouvées ;
6. décision finale entre `NO_PATCH` et correctif final minimal unique.

Aucun patch code n’a été produit dans cette session, car les écarts restants ne relèvent pas d’un unique correctif final minimal compatible avec une clôture propre.

## Références cadrage A11 retenues

- `01.5 Audit renforcé des actions support`
- `06.6 Modèle d’accès à l’audit`
- `13.1 Audit planning et opérations critiques`
- `13.2 Audit des connexions`
- `13.3 Page dédiée audit`
- `13.4 Traçabilité détaillée des modifications après publication`

## Observations structurantes

### 1. Le noyau A11 existe réellement

Le bloc n’est plus au stade prévu ou vide :

- infrastructure persistante audit réelle ;
- audit planning réellement écrit sur plusieurs opérations critiques ;
- lecture du run courant réellement exposée ;
- route dédiée `/api/audit` réellement présente ;
- page `/audit` réellement présente ;
- audit des connexions réellement persistant ;
- historique shift protégé par `canViewAudit(...)`.

### 2. Le bloc reste toutefois non homogène sur le hors-planning

Le sous-périmètre planning est le plus abouti. En revanche, sur users / vehicles / depots :

- l’audit standard métier n’est pas homogène ;
- la trace hors-planning repose essentiellement sur des actions `SUPPORT_*` ;
- ces traces ne couvrent pas les acteurs métier standards ;
- les routes contrôlées n’ouvrent pas réellement un usage support global de bout en bout.

### 3. Le support global lecteur existe, l’opérabilité support ne suit pas

Le support global peut lire l’audit via `canViewAudit(..., allowSupport: true)` et `/api/audit?companyId=...`.

En revanche, les routes métier contrôlées :

- exigent fréquemment `session.user.companyId` non nul ;
- ou utilisent `requireRole(...)` sans `allowGlobalSupport` ;
- ou utilisent `canManageUsers(...)` / `canManageVehicles(...)` sans ouverture support ;
- et les appels à `traceSupportAction(...)` ne transmettent pas `supportReason` alors qu’il est obligatoire.

Conséquence : l’audit renforcé des actions support n’est pas réellement opérable de bout en bout sur le périmètre contrôlé.

### 4. Les validations terminales A11 sont documentées de manière non parfaitement cohérente

`AUDIT-LOT-02-09` documente une chaîne finale cohérente avec `git apply --check`, `git apply`, `npx prisma generate`, `npx prisma validate`, `npm run lint`, `npm run build` tous **OK**, avec un `FIX-03` intermédiaire en `build KO` puis `FIX-04` final en `build OK`.

`AUDIT-10` documente au contraire une relance locale en environnement dégradé avec `prisma`, `eslint` et `next` introuvables.

La clôture doit donc retenir :

- les validations de livrabilité réellement acquises du patch livré : **celles de `AUDIT-LOT-02-09`** ;
- la présente session n’a relancé **aucune commande** ;
- la documentation A11 n’est pas parfaitement cohérente sur la manière de présenter les validations terminales.

### 5. Pourquoi `NO_PATCH` est retenu ici

Un correctif final minimal acceptable devrait rester borné et local.

Or, pour rendre A11 clôturable définitivement, il faudrait au minimum réaligner de manière cohérente :

- le modèle support propriétaire / support global ;
- l’accès support aux routes métier users / vehicles / depots ;
- la collecte obligatoire du motif support ;
- la couverture audit users / vehicles / depots pour les acteurs standards et pas seulement support ;
- possiblement la documentation finale des validations.

Cela dépasse le cadre d’un unique correctif final minimal de clôture.
