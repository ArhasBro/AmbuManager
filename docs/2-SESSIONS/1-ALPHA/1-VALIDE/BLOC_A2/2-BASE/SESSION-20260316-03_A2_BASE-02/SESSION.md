# SESSION

## ID SESSION

`SESSION-20260316-03_A2_BASE-02`

## Date

`2026-03-16`

## Contexte

Projet : `Investissement`  
Sous-projet : `Ambulance Manager`  
Maturité : `1-ALPHA`  
Bloc : `A2`  
Type : `COMPLÉTION`  
Intitulé : `Création du modèle base/dépôt`

Cette session est une **complétion strictement bornée à `BASE-02`**.
Elle reprend comme acquis `BASE-01`, qui a conclu formellement que le module `Bases / dépôts` était actuellement **`absent`** dans le dépôt réel.

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

### Historique repris sans réouverture
- `A1` n’est pas rouvert ;
- `ORG-*` est repris uniquement pour le bornage méthodologique ;
- `BASE-01` est repris comme acquis d’audit avec verdict `absent` ;
- aucune session `BASE-03+` n’est ouverte implicitement ;
- aucun périmètre `SUP-*` n’est ouvert.

### Code réellement concerné
- `prisma/schema.prisma`
- `prisma/migrations/20260316153000_base02_create_depot_model/migration.sql`

## Objectif exact

Créer strictement, au niveau **modèle Prisma**, l’entité administrable de base/dépôt prévue par `MODULE 04 — Bases / dépôts`, de façon cohérente avec le multi-tenant strict via `companyId` et sans ouvrir l’API, l’UI, les permissions ou les rattachements métiers futurs.

## Périmètre exact traité

### Travail effectivement réalisé
- ajout d’un modèle Prisma dédié `Depot` ;
- rattachement explicite à `Company` via `companyId` ;
- ajout d’une migration Prisma dédiée ;
- ajout des contraintes minimales tenant-aware nécessaires à l’administrabilité de l’entité.

### Fichiers code réellement modifiés
- `prisma/schema.prisma`
- `prisma/migrations/20260316153000_base02_create_depot_model/migration.sql`

### Hors périmètre explicite
- aucune route API bases/dépôts ;
- aucune UI bases/dépôts ;
- aucun `baseId` / `depotId` sur `Vehicle`, `User`, `Shift`, `DraftShift`, `ShiftTemplate` ;
- aucune permission dédiée ;
- aucun arbitrage template ↔ base ;
- aucune logique multi-agences ;
- aucun changement des documents master.

## Modèle canonique retenu

Le nom canonique retenu est `Depot`.

Justification :
- `Base` aurait été trop ambigu dans le code ;
- `Depot` reste directement compréhensible vis-à-vis du cadrage `base / dépôt` ;
- le nom reste simple et suffisamment stable pour les futures sessions `BASE-03` à `BASE-05`.

## Champs retenus et justification

Le modèle `Depot` est volontairement minimal :
- `id` : identifiant technique ;
- `companyId` : rattachement multi-tenant strict ;
- `company` : relation explicite vers `Company` ;
- `name` : libellé administrable du dépôt ;
- `address` : localisation textuelle minimale du lieu de départ ;
- `isActive` : base minimale pour une désactivation future sans suppression immédiate ;
- `createdAt` / `updatedAt` : traçabilité structurelle minimale.

Aucun autre champ n’a été ajouté pour ne pas surconstruire `BASE-02`.

## Contraintes et index retenus

Contraintes ajoutées sur `Depot` :
- `@@unique([companyId, name])` pour éviter les doublons de nom dans une même société ;
- `@@index([companyId])` pour les lectures tenant-aware ;
- `@@index([companyId, isActive])` pour les futurs filtres d’administration / désactivation.

La relation vers `Company` est définie avec `onDelete: Cascade`.

## Impact sur le seed / bootstrap

Le seed **n’a pas été modifié**.

Justification :
- `BASE-02` ne demande pas encore de données de démonstration pour les dépôts ;
- aucun champ obligatoire n’a été ajouté sur des modèles déjà seedés ;
- le dépôt reste cohérent sans création automatique de dépôts à ce stade.

## Intégration réelle du patch

Le patch `BASE-02.diff` a bien été intégré dans le dépôt réel.

Point documentaire important :
- le fichier diff référençait `prisma/migrations/20260316153000_base02_create_depot_model/migration.sql` ;
- mais le dossier `prisma/migrations/20260316153000_base02_create_depot_model/` n’existait pas dans le dépôt initial ;
- il a donc fallu **créer préalablement le dossier de migration et le fichier `migration.sql`** avant application ;
- le contenu métier de `BASE-02` est correct, mais le patch n’était **pas auto-applicable directement** sans cette préparation.

## Résultat synthétique de session

Le dépôt contient désormais une **entité data minimale `Depot`**, rattachée à `Company`, compatible avec le cloisonnement multi-tenant et préparant les futures sessions du module `Bases / dépôts` sans les ouvrir.

La session ne couvre pas :
- création/modification métier via API ;
- désactivation métier via endpoint ;
- écran de gestion ;
- rattachement des autres entités métier aux dépôts.

## Livrable principal

- correctif code strictement borné à `BASE-02` ;
- migration dédiée pour le nouveau modèle ;
- patch git dédié `BASE-02.diff` ;
- clôture documentaire complète de session.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-03_A2_BASE-02/`
- Patch : `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-03_A2_BASE-02/`

## Verdict retenu

Verdict final de la session : **`conforme`**.