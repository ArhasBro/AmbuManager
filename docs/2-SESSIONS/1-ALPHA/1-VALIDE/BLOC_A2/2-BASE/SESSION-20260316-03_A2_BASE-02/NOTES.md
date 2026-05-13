# NOTES

## Notes de travail de session

### Bornage appliqué
- `BASE-01` repris comme acquis avec verdict `absent`.
- Session limitée au **niveau data / modèle Prisma**.
- Aucun rattachement `Vehicle`, `User`, `Shift`, `DraftShift`, `ShiftTemplate`.
- Aucun travail API, UI, permissions, multi-agences.

### Choix de modélisation retenus
- nom canonique : `Depot` ;
- relation explicite : `Depot.companyId -> Company.id` ;
- modèle minimal : `id`, `companyId`, `company`, `name`, `address`, `isActive`, `createdAt`, `updatedAt` ;
- relation inverse sur `Company` : `depots Depot[]`.

### Justification du modèle minimal
- `name` = minimum administrable ;
- `address` = minimum utile pour représenter un lieu de départ ;
- `isActive` = support minimal pour la future désactivation sans ouvrir `BASE-05` ;
- pas de description, code interne, téléphone, email, responsable local : non justifiés à ce stade.

### Contraintes retenues
- unicité par société sur `name` ;
- index de lecture par `companyId` ;
- index `companyId + isActive` pour les futurs listings actifs / inactifs.

### Seed
- `prisma/seed.ts` laissé inchangé ;
- aucun dépôt de démo requis pour garder la cohérence du dépôt.

### Intégration du patch
- le patch `BASE-02.diff` pointe bien vers `prisma/migrations/20260316153000_base02_create_depot_model/migration.sql` ;
- le contenu métier du patch est correct ;
- mais le dossier de migration n’existait pas dans le dépôt initial ;
- il a fallu créer au préalable `prisma/migrations/20260316153000_base02_create_depot_model/` puis `migration.sql` ;
- après cette préparation, `git apply --check` puis `git apply` passent correctement.

### Vérifications terminales réelles documentées
- `git apply --check` : OK après création du dossier migration ;
- `git apply` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.