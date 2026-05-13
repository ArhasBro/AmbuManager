# SESSION

## ID SESSION

`SESSION-20260316-09_A2_BASE-08`

## Date

`2026-03-16`

## Contexte

Projet : `Investissement`  
Sous-projet : `Ambulance Manager`  
Maturité : `1-ALPHA`  
Bloc : `A2`  
Type : `COMPLÉTION`  
Intitulé : `Rattachement d’un utilisateur à une base`

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
- `BASE-06` : UI minimale `/depots`
- `BASE-07` : rattachement minimal `Vehicle -> Depot`

## Objectif exact de BASE-08

Ajouter strictement le rattachement minimal `User -> Depot`, sans ouvrir d’édition générique large du module utilisateurs.

Le comportement cible retenu est :
- `1 utilisateur = 0 ou 1 dépôt` ;
- un gestionnaire autorisé peut voir la base actuelle d’un utilisateur ;
- un gestionnaire autorisé peut rattacher ou désaffecter une base ;
- aucun rattachement inter-sociétés n’est possible ;
- aucun `companyId` ne vient du client.

## Périmètre exact traité

### Travail effectivement retenu
- ajout du champ relationnel nullable `User.depotId` ;
- ajout de la relation inverse minimale `Depot.users` ;
- ajout de la migration SQL dédiée ;
- ajout d’une validation Zod minimale pour le body d’affectation ;
- ajout d’un service minimal d’affectation/désaffectation ;
- ajout d’une route dédiée `PATCH /api/users/[id]/depot` ;
- enrichissement minimal de `GET /api/users` avec le dépôt courant ;
- adaptation minimale de l’UI `/users` avec affichage + sélecteur + enregistrement.

### Hors périmètre explicite
- aucune réouverture `BASE-01` à `BASE-07` hors bornage ;
- aucune ouverture `BASE-09+` ;
- aucune édition générique complète d’un utilisateur ;
- aucun rattachement `Shift`, `DraftShift`, `Template` ou `Vehicle` supplémentaire ;
- aucun multi-base par utilisateur ;
- aucun historique d’affectation ;
- aucune réactivation de dépôt ;
- aucune modification des documents master.

## Modélisation retenue

### Règle métier portée par le schéma
- `1 utilisateur = 0 ou 1 dépôt`
- `1 dépôt = 0..n utilisateurs`

### Implémentation Prisma retenue
- `User.depotId : String? @db.Uuid`
- `User.depot : Depot?`
- `Depot.users : User[]`
- suppression du dépôt => `User.depotId` remis à `null` via `onDelete: SetNull`
- index ajouté sur `User.depotId`

## API minimale retenue

### Route dédiée ajoutée
- `PATCH /api/users/[id]/depot`

### Body accepté
```json
{ "depotId": "uuid" | null }
```

### Contrat conservé
- succès : `{ ok:true, data }`
- erreur : `{ ok:false, error, details? }`

## Auth / RBAC / multi-tenant retenus

### Auth
- session requise ;
- `companyId` et `actorUserId` viennent exclusivement de la session.

### RBAC
- alignement sur le module utilisateurs existant via `canManageUsers(actorUserId, role)` ;
- aucun nouveau système de permission ajouté.

### Multi-tenant
- l’utilisateur cible est recherché avec `id + session.user.companyId` ;
- le dépôt cible est recherché avec `id + session.user.companyId + isActive:true` ;
- aucun `companyId` n’est accepté depuis le client ;
- toute tentative cross-tenant aboutit à `404` sans fuite d’information.

## UI minimale retenue

Sur `/users` :
- affichage du dépôt actuel de l’utilisateur sélectionné ;
- sélecteur des dépôts actifs de la société courante ;
- option `Aucune base` pour désaffecter ;
- bouton `Enregistrer la base` ;
- conservation du module existant de réinitialisation de mot de passe.

## Validation réelle de session

### Patch principal produit
- `BASE-08.diff`

### Vérifications terminales obtenues
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Résultat final de session

### Patchs produits
- patch principal code : `BASE-08.diff`
- patch documentaire final : `PATCH__SESSION-20260316-09_A2_BASE-08_DOCS-01.diff`

### Conclusion de session
Le patch `BASE-08` est validé, borné et documenté.
Le rattachement minimal `User -> Depot` est en place, l’UI minimale est intégrée, et les validations terminales projet sont obtenues sans réserve.

## Verdict retenu

Verdict final de la session : **`conforme`**.
