# SESSION

## ID SESSION

`SESSION-20260316-06_A2_BASE-05`

## Date

`2026-03-16`

## Contexte

Projet : `Investissement`  
Sous-projet : `Ambulance Manager`  
Maturité : `1-ALPHA`  
Bloc : `A2`  
Type : `COMPLÉTION`  
Intitulé : `API désactivation/archivage base/dépôt`

Cette session reste une **complétion strictement bornée à `BASE-05`**.
Elle reprend comme acquis de bornage :
- `BASE-01` : audit du module bases/dépôts ;
- `BASE-02` : modèle Prisma canonique `Depot` avec `isActive` ;
- `BASE-03` : route `POST /api/depots` et briques associées ;
- `BASE-04` : route `PATCH /api/depots/[id]` bornée à la modification.

La présente finalisation porte sur **l’intégration documentaire obligatoire dans le dépôt réel**, sans réouverture du code métier déjà validé.

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
- `ORG-*`, `BASE-01`, `BASE-02`, `BASE-03` et `BASE-04` sont repris uniquement pour le bornage ;
- aucune session `BASE-06+` n’est ouverte ;
- aucun périmètre `SUP-*` n’est ouvert.

### Code réellement concerné par `BASE-05`
- `app/api/depots/[id]/archive/route.ts`
- `lib/services/depots/archive-depot.ts`

### Documents intégrés / complétés dans cette correction ciblée
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/FIN_SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/README_PATCH.md`

## Objectif exact

Ajouter et clôturer proprement la traçabilité documentaire obligatoire de `BASE-05`, en conservant le code métier déjà validé de l’API minimale de désactivation / archivage d’un dépôt existant via `Depot.isActive = false`.

## Périmètre exact traité

### Travail effectivement retenu sur la session
- route d’action dédiée `POST app/api/depots/[id]/archive/route.ts` validée sur le fond ;
- service minimal `archiveDepot` validé sur le fond ;
- validation Zod stricte des params uniquement ;
- archivage logique via `isActive = false` ;
- comportement idempotent accepté si le dépôt est déjà inactif.

### Fichiers code de la session `BASE-05`
- `app/api/depots/[id]/archive/route.ts`
- `lib/services/depots/archive-depot.ts`

### Fichiers documentaires intégrés / complétés
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
- `README_PATCH.md`

### Hors périmètre explicite
- aucune UI bases/dépôts ;
- aucune route de listing ;
- aucune suppression physique ;
- aucune route de restauration / réactivation ;
- aucun rattachement `Vehicle`, `User`, `Shift`, `DraftShift`, `ShiftTemplate` ;
- aucune permission catalogue dédiée ;
- aucune modification de `prisma/schema.prisma` ;
- aucune modification de `prisma/seed.ts` ;
- aucune modification des documents master ;
- aucune réécriture de `BASE-03` ou `BASE-04`.

## Contrat API retenu

### Route
- `POST /api/depots/[id]/archive`

### Entrée acceptée
- aucun body métier requis ;
- params limités à `id` UUID validé via Zod.

### Champs refusés côté client
- aucun `companyId` n’est consommé ;
- aucun body n’est utilisé pour piloter l’archivage.

## Auth / RBAC / multi-tenant retenus

### Auth
- `401` si session absente ou `companyId` absent.

### RBAC
- accès limité à `ADMIN` et `GERANT` ;
- aucune permission dédiée n’est introduite dans cette session.

### Multi-tenant
- le dépôt ciblé est recherché avec le couple `id + companyId` ;
- si le dépôt n’appartient pas au tenant courant, la route répond `404` ;
- aucune valeur client ne peut substituer le tenant serveur.

## Gestion des erreurs retenue

- `400` : `VALIDATION_ERROR` sur params invalides ;
- `401` : `UNAUTHORIZED` ;
- `403` : `FORBIDDEN` ;
- `404` : `NOT_FOUND` si dépôt introuvable dans le tenant ;
- `500` : `SERVER_ERROR` sur erreur non prévue.

## Format de succès retenu

- HTTP `200`
- payload : `{ ok:true, data }`

Données retournées sur succès :
- `id`
- `companyId`
- `name`
- `address`
- `isActive`
- `createdAt`
- `updatedAt`

## Résultat terminal confirmé pour le dépôt réel

Validations terminales réelles confirmées :
- `npx prisma validate` : **OK** ;
- `npx prisma generate` : **OK** ;
- `npm run lint` : **OK** ;
- `npm run build` : **OK**.

## Résultat synthétique de session

Le dépôt contient une **API minimale d’archivage logique de dépôt** cohérente avec `Depot.isActive`, strictement multi-tenant, conforme au cadrage `BASE-05`, et désormais **documentée dans le dépôt réel** sans réouverture du code métier déjà validé.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/`
- Patch : `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/`

## Verdict retenu

Verdict final de la session : **`conforme`**.
