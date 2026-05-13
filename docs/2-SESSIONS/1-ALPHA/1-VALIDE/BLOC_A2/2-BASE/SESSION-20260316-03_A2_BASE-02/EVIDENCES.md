# EVIDENCES

## Sources utilisées

### Documentation officielle relue
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

### Sessions antérieures reprises comme bornage
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-02_A2_BASE-01/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-02_A2_BASE-01/RESULTATS.md`

## Extraits documentaires déterminants

### Cadrage produit — module bases / dépôts
`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

- `04.1 Entité base / dépôt administrable` : une base/dépôt est un **lieu de départ des véhicules**, administrable comme entité propre.
- `04.4 Désactivation / archivage d’une base / dépôt` : la désactivation doit être possible **sans casser l’historique**.

Conséquence directe pour `BASE-02` :
- créer une entité propre ;
- prévoir un support minimal de désactivation ;
- ne pas ouvrir encore les rattachements métiers futurs.

### Plan de développement
`docs/1-master/PLAN_DE_DEVELOPPEMENT.md`

Le plan officiel sépare explicitement :
- `BASE-02 — COMPLÉTION — Création du modèle base/dépôt`
- `BASE-03 — COMPLÉTION — API création base/dépôt`
- `BASE-04 — COMPLÉTION — API modification base/dépôt`
- `BASE-05 — COMPLÉTION — API désactivation/archivage base/dépôt`

Conséquence directe :
- `BASE-02` doit rester **modèle uniquement**.

### Audit précédent
`BASE-01` a conclu :
- **aucun modèle Prisma dédié** n’était visible ;
- **aucune API** dédiée n’était visible ;
- **aucune UI** dédiée n’était visible ;
- verdict d’audit : **`absent`**.

## État réel du code après complétion

### `prisma/schema.prisma`
Ajouts réels :
- relation inverse `depots Depot[]` sur `Company` ;
- nouveau modèle `Depot` avec :
  - `id`
  - `companyId`
  - `company`
  - `name`
  - `address`
  - `isActive`
  - `createdAt`
  - `updatedAt`
- contraintes :
  - `@@unique([companyId, name])`
  - `@@index([companyId])`
  - `@@index([companyId, isActive])`

### Migration dédiée
Référence attendue par le patch :
- `prisma/migrations/20260316153000_base02_create_depot_model/migration.sql`

Constat réel d’intégration :
- le dossier `prisma/migrations/20260316153000_base02_create_depot_model/` n’existait pas dans le dépôt initial ;
- il a fallu le créer avant application du patch ;
- le fichier `migration.sql` a ensuite été créé dans ce dossier ;
- après cette préparation, le patch s’applique correctement.

Contenu structurel de la migration :
- création de la table `Depot` ;
- index tenant-aware ;
- unicité tenant-aware ;
- clé étrangère vers `Company(id)` avec suppression en cascade.

### Seed
Constat :
- `prisma/seed.ts` non modifié ;
- décision volontaire car aucun dépôt initial n’est requis pour la cohérence structurelle du dépôt.

## Preuves d’intégration du patch

### Vérifications patch
- `git apply --check` : **OK après création du dossier migration** ;
- `git apply` : **OK**.

### Vérifications terminales finales
- `npm run lint` : **OK** ;
- `npm run build` : **OK**.

## Conclusion probante

`BASE-02` est effectivement intégré dans le dépôt réel, avec un modèle `Depot` minimal, multi-tenant, cohérent avec le cadrage produit, sans débordement vers API, UI, RBAC, seed ou rattachements métier.

Le seul point documentaire important à conserver est le suivant : le patch était **métier correct**, mais **non auto-applicable directement** tant que le dossier cible de migration n’avait pas été créé.