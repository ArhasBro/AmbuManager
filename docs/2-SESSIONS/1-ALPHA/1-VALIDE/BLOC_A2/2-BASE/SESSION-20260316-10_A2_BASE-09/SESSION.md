# SESSION

## ID SESSION

`SESSION-20260316-10_A2_BASE-09`

## Date

`2026-03-16`

## Contexte

Projet : `Investissement`  
Sous-projet : `Ambulance Manager`  
Stage : `1-ALPHA`  
Bloc : `A2`  
Type : `COMPLÉTION`  
Intitulé : `Rattachement d’un shift à une base`

## Références de travail retenues

### Références documentaires prioritaires
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Références de bornage déjà acquises
- `BASE-02` : modèle Prisma `Depot`
- `BASE-03` : `POST /api/depots`
- `BASE-04` : `PATCH /api/depots/[id]`
- `BASE-05` : `POST /api/depots/[id]/archive`
- `BASE-06` : UI minimale de gestion des dépôts
- `BASE-07` : rattachement minimal `Vehicle -> Depot`
- `BASE-08` : rattachement minimal `User -> Depot`

## Objectif exact de BASE-09

Ajouter strictement le rattachement minimal `Shift -> Depot`, sans rouvrir le périmètre planning plus large.

Le comportement cible retenu est :
- `1 shift = 0 ou 1 dépôt` ;
- un utilisateur autorisé peut voir la base actuelle d’un shift publié ;
- un utilisateur autorisé peut rattacher ou désaffecter une base sur un shift publié ;
- aucun rattachement inter-sociétés n’est possible ;
- aucun `companyId` ne vient du client ;
- l’existant reste compatible si un shift doit rester sans base.

## Périmètre exact traité

### Travail effectivement retenu
- ajout du champ relationnel nullable `Shift.depotId` ;
- ajout de la relation inverse minimale `Depot.shifts` ;
- ajout de la migration SQL dédiée ;
- adaptation minimale de `PATCH /api/planning/shifts/[id]/assign` pour accepter `depotId` ;
- adaptation minimale du service `assignShift` pour persister et auditer le rattachement dépôt ;
- enrichissement minimal de `GET /api/planning/shifts` avec le dépôt courant ;
- adaptation minimale de `/planning` pour afficher la base actuelle et proposer un sélecteur des dépôts actifs.

### Hors périmètre explicite
- aucune réouverture `BASE-01` à `BASE-08` hors bornage ;
- aucune ouverture `BASE-10+` ;
- aucun rattachement `Template -> Depot` ;
- aucune refonte large du planning ;
- aucun nouveau système de permission ;
- aucune modification des documents master ;
- aucune suppression/réactivation de dépôt ;
- aucun historique d’affectation ;
- aucune extension produit vers `DraftShift`.

## Modélisation retenue

### Règle métier portée par le schéma
- `1 shift = 0 ou 1 dépôt`
- `1 dépôt = 0..n shifts`

### Implémentation Prisma retenue
- `Shift.depotId : String? @db.Uuid`
- `Shift.depot : Depot?`
- `Depot.shifts : Shift[]`
- suppression du dépôt => `Shift.depotId` remis à `null` via `onDelete: SetNull`
- index ajouté sur `Shift.depotId`

## API minimale retenue

### Route adaptée
- `PATCH /api/planning/shifts/[id]/assign`

### Body accepté
```json
{ "depotId": "uuid" | null }
```

### Contrat conservé
- succès : `{ ok:true, data }`
- erreur : `{ ok:false, error, details? }`

### Bornage `DraftShift` conservé
- si l’identifiant pointe un `DraftShift` et que `depotId` est fourni, la route renvoie `400` avec `DEPOT_ASSIGNMENT_NOT_SUPPORTED_ON_DRAFT` ;
- aucun champ dépôt n’est ajouté à `DraftShift`.

## Auth / RBAC / multi-tenant retenus

### Auth
- session requise ;
- `companyId` et `actorUserId` viennent exclusivement de la session.

### RBAC
- alignement sur l’autorité planning existante via `canEditPlanning(actorUserId, userRole)` ;
- aucun nouveau système de permission ajouté.

### Multi-tenant
- le shift publié est recherché avec `id + session.user.companyId` ;
- le dépôt cible est recherché avec `id + session.user.companyId + isActive:true` ;
- aucun `companyId` n’est accepté depuis le client ;
- tout rattachement cross-tenant est bloqué.

## UI minimale retenue

Sur `/planning` :
- affichage de la base actuelle sur chaque carte de shift ;
- sélecteur `Base` ;
- option `Aucune base` pour désaffecter ;
- liste alimentée par les dépôts actifs de la société courante, avec conservation d’affichage si un dépôt déjà rattaché devient inactif.

## Validation réelle de session

### Patch principal validé
- `BASE-09.diff`

### Vérifications terminales réellement obtenues
- `git apply --check BASE-09.diff` : **OK**
- `git apply BASE-09.diff` : **OK**
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Résultat final de session

### Patchs produits
- patch principal code : `BASE-09.diff`
- patch documentaire final : `PATCH__SESSION-20260316-10_A2_BASE-09_DOCS-01.diff`

### Conclusion de session
Le patch `BASE-09` est produit, validé et documenté.
Le rattachement minimal `Shift -> Depot` est intégré sur le planning publié, sans extension fonctionnelle vers `DraftShift`.

## Verdict retenu

Verdict final de la session : **`conforme`**.
