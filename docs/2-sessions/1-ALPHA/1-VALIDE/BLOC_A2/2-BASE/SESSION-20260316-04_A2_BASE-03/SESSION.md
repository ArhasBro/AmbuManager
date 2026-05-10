# SESSION

## ID SESSION

`SESSION-20260316-04_A2_BASE-03`

## Date

`2026-03-16`

## Contexte

Projet : `Investissement`  
Sous-projet : `Ambulance Manager`  
Maturité : `1-ALPHA`  
Bloc : `A2`  
Type : `COMPLÉTION`  
Intitulé : `API création base/dépôt`

Cette session est une **complétion strictement bornée à `BASE-03`**.
Elle reprend comme acquis de bornage :
- `BASE-01` : le module bases/dépôts était audité `absent` ;
- `BASE-02` : le modèle Prisma canonique `Depot` et sa migration existent déjà dans le dépôt réel.

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
- `ORG-*`, `BASE-01` et `BASE-02` sont repris uniquement pour le bornage ;
- aucune session `BASE-04+` n’est ouverte ;
- aucun périmètre `SUP-*` n’est ouvert.

### Code réellement concerné
- `app/api/depots/route.ts`
- `lib/services/depots/create-depot.ts`
- `lib/validators/depot.ts`

## Objectif exact

Ajouter l’API minimale de création d’un dépôt, cohérente avec le modèle `Depot` déjà présent, le multi-tenant strict via `session.user.companyId`, et la convention API standard `{ ok:true, data } / { ok:false, error, details? }`.

## Périmètre exact traité

### Travail effectivement réalisé
- ajout d’une route `POST` canonique `app/api/depots/route.ts` ;
- ajout d’un validateur d’entrée strict dédié au body de création ;
- ajout d’un service minimal de création borné au tenant courant ;
- refus des champs client hors contrat, dont `companyId` et `isActive`.

### Fichiers code réellement modifiés
- `app/api/depots/route.ts`
- `lib/services/depots/create-depot.ts`
- `lib/validators/depot.ts`

### Hors périmètre explicite
- aucune UI bases/dépôts ;
- aucune route `GET /api/depots` ;
- aucune route `PATCH /api/depots` ;
- aucune désactivation / archivage ;
- aucune permission catalogue dédiée ;
- aucun rattachement `Vehicle`, `User`, `Shift`, `DraftShift`, `ShiftTemplate` ;
- aucune modification de `prisma/schema.prisma` ;
- aucune modification de `prisma/seed.ts`.

## Contrat API retenu

### Route
- `POST /api/depots`

### Body accepté
- `name` : requis, chaîne non vide, trim, max 160 ;
- `address` : optionnel / nullable, trim, max 255.

### Champs refusés côté client
- `companyId`
- `isActive`
- tout autre champ hors contrat

Le schéma est volontairement `.strict()` pour empêcher toute tentative de pilotage cross-tenant ou de forçage d’état par payload.

## Auth / RBAC / multi-tenant retenus

### Auth
- `401` si session absente ou `companyId` absent.

### RBAC
- accès limité à `ADMIN` et `GERANT` ;
- aucune permission dédiée n’est introduite dans cette session.

### Multi-tenant
- le `companyId` utilisé en création vient exclusivement de `session.user.companyId` ;
- aucune valeur du body ne peut substituer ce tenant ;
- la création reste donc strictement bornée à la société courante.

## Gestion des erreurs retenue

- `400` : `VALIDATION_ERROR` avec `details` issus de Zod ;
- `401` : `UNAUTHORIZED` ;
- `403` : `FORBIDDEN` ;
- `409` : `CONFLICT` si unicité tenant-aware violée sur le dépôt ;
- `500` : `SERVER_ERROR` sur erreur non prévue.

## Format de succès retenu

- HTTP `201`
- payload : `{ ok:true, data }`

Données retournées sur succès :
- `id`
- `companyId`
- `name`
- `address`
- `isActive`
- `createdAt`
- `updatedAt`

## Impact sur le seed / data existante

Le seed **n’a pas été modifié**.

Justification :
- `BASE-03` porte uniquement sur l’API de création ;
- le modèle `Depot` existe déjà via `BASE-02` ;
- aucune donnée initiale supplémentaire n’est strictement nécessaire pour ajouter cette route.

## Résultat terminal validé

Vérifications terminales validées :
- `npx prisma validate` : **OK** ;
- `npx prisma generate` : **OK** ;
- `npm run lint` : **OK** ;
- `npm run build` : **OK**.

Éléments confirmés au terminal :
- Prisma schema chargé ;
- Prisma Client généré ;
- build Next.js réussi ;
- route API détectée : `ƒ /api/depots`.

## Résultat synthétique de session

Le dépôt contient désormais une **API minimale de création de dépôt** cohérente avec `04.2 Création d’une base / dépôt`, strictement multi-tenant, sans ouverture de périmètre vers listing, édition, archivage, UI ou rattachements métier.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-04_A2_BASE-03/`
- Patch : `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-04_A2_BASE-03/`

## Verdict retenu

Verdict final de la session : **`conforme`**.
