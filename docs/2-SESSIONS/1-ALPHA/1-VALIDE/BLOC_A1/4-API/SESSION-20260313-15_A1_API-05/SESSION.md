# SESSION

## ID SESSION

SESSION-20260313-15_A1_API-05

## Date

13/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A1  
Type : VALIDATION  
Intitulé : Vérification de cohérence API/UI sur les modules déjà présents

Références officielles utilisées :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- sessions précédentes utiles `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01`, `API-02`, `API-03`, `API-04`
- code réel du dépôt

Contexte de reprise imposé :
- `AUTH-03` a validé la présence et la cohérence de `role` et `companyId` dans auth / JWT / session / typings ;
- `TENANT-04` a validé le cloisonnement multi-tenant ALPHA sur le périmètre inspecté ;
- `RBAC-09` a retenu le bloc rôles / permissions ALPHA comme `partiellement conforme` sans réouverture ici ;
- `API-01` a validé le contrat cible officiel :
  - succès : `{ ok:true, data }`
  - erreur : `{ ok:false, error, details? }` ;
- `API-02` a corrigé les écarts structurels sur son périmètre ;
- `API-03` a prouvé une hétérogénéité sémantique résiduelle du champ `error` ;
- `API-04` a harmonisé minimalement les erreurs critiques avec doctrine dominante `error = code symbolique uppercase`.

## Objectif de la session

Valider, sur les modules UI réellement présents et connectés aux routes déjà en place, si la consommation frontend est cohérente avec le contrat API effectif du dépôt après `API-04`, sans corriger le code et sans transformer la session en refonte.

L’objectif exact retenu est :
- partir des appels API réellement faits par l’UI existante ;
- comparer la structure effectivement renvoyée par les routes avec la manière dont l’UI teste `ok`, lit `data`, exploite `error` et, quand elles existent, lit `details` ;
- distinguer ce qui est conforme, ce qui reste seulement partiellement conforme, ce qui n’est pas prouvé et ce qui est hors périmètre.

## Périmètre exact traité

### Documentation inspectée
- Relecture documentaire ciblée réalisée sur les documents pertinents de `./docs`, avec priorité donnée au dossier `./docs/1-master` conformément aux règles du dépôt ;
- lecture détaillée prioritaire des documents `docs/1-master` ;
- lecture détaillée des documents racine `docs/SOURCES_AUTORISEES.md`, `docs/PROTOCOLE_SESSION.md`, `docs/STRUCTURE_DOCS.md` ;
- lecture du template `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` ;
- lecture détaillée des sessions utiles `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01`, `API-02`, `API-03`, `API-04`.

### Code inspecté en priorité
#### Routes API métier inspectées
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`

#### Consommateurs UI réellement inspectés
- `app/planning/planning-client.tsx`
- `app/planning/page.tsx`
- `app/users/page.tsx`
- `app/users/reset-password-client.tsx`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/vehicles/add-vehicle-form.tsx`

### Routes réellement couvertes par l’UI inspectée
- `GET /api/users?limit=500`
- `POST /api/users/[id]/reset-password`
- `GET /api/vehicles?limit=500`
- `POST /api/vehicles`
- `DELETE /api/vehicles?id=...`
- `GET /api/company/rules?keys=PLANNING_VIEW_MODE`
- `PATCH /api/company/rules`
- `GET /api/planning/shifts?weekStart=...`
- `PATCH /api/planning/shifts/[id]/assign`
- `POST /api/planning/autoschedule/week`
- `POST /api/planning/autoschedule/day`
- `GET /api/planning/autoschedule/runs/[id]`
- `POST /api/planning/autoschedule/runs/[id]/match/preview`
- `POST /api/planning/autoschedule/runs/[id]/match/apply`
- `POST /api/planning/autoschedule/runs/[id]/publish`
- `POST /api/planning/autoschedule/runs/[id]/cancel`

### Routes relues mais non couvertes UI sur le périmètre inspecté
- `GET /api/planning/autoschedule/runs`
- `GET /api/planning/autoschedule/runs/[id]/match` (route dépréciée)

### Hors périmètre explicite
- toute correction code ;
- toute refonte API ;
- toute réouverture de `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01` à `API-04` ;
- toute conclusion négative sur une route simplement non consommée par l’UI présente ;
- le contrat de `/api/auth/session`, route NextAuth auxiliaire utilisée par `planning-client`, qui ne relève pas du contrat métier `{ ok:true, data } / { ok:false, error, details? }` validé par `API-01`.

### Fichiers code réellement modifiés
Aucun fichier code modifié.

## Résultat synthétique de session

Constat retenu après croisement du code réel API/UI :
- la consommation UI des modules présents est **globalement compatible** avec le contrat validé par `API-01` et réaligné par `API-04` ;
- l’UI teste très souvent `res.ok` et/ou `json.ok`, puis lit `json.data` sur les succès ;
- l’UI lit réellement `details` sur certains cas critiques du planning, notamment `MIN_REST_BLOCKED`, `CONFLICT_USER` et `CONFLICT_VEHICLE` lors du publish ;
- plusieurs écrans restent néanmoins sur une exploitation **partielle** des erreurs harmonisées, avec affichage du `error` brut sans exploiter `details.message` ;
- deux fragilités factuellement prouvées restent ouvertes côté cohérence API/UI :
  - `planning-client` attend `runId` au niveau racine sur `DRAFT_ALREADY_EXISTS` pour la génération jour/semaine, alors que l’API renvoie `details.runId` ;
  - `planning-client` attend `USER_CONFLICT` / `VEHICLE_CONFLICT` pour l’assignation, alors que la route renvoie `USER_OVERLAP_CONFLICT` / `VEHICLE_OVERLAP_CONFLICT`.

Conséquence :
- il n’y a pas de rupture généralisée du contrat API/UI sur les modules présents ;
- mais la cohérence n’est pas totalement robuste ni uniformément exploitée ;
- le verdict retenu est donc **partiellement conforme**.

## Fichiers principaux inspectés

### Documentation
- documents maîtres `docs/1-master`
- sessions utiles `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01`, `API-02`, `API-03`, `API-04`

### Code
- routes API listées dans le périmètre exact ci-dessus
- consommateurs UI listés dans le périmètre exact ci-dessus

## Livrable principal

- validation documentaire bornée à `API-05` ;
- aucun patch code ;
- aucune réouverture des sessions précédentes ;
- mise à jour des 5 documents de session attendus ;
- maintien du mode `NO_PATCH`.

## Limites de preuve

- relecture documentaire ciblée sur les documents pertinents ;
- inspection statique du code réel ;

Tentative d'exécution de vérification technique dans l'environnement extrait :
- `npm run lint` → échec (`eslint: not found`)
- `npm run build` → échec (`next: not found`)

Ces vérifications n'ont donc pas pu être exécutées dans cet environnement.

- l’analyse repose donc sur relecture documentaire + inspection statique du code réel ;
- toute information absente des sources relues reste : **INFORMATION NON FOURNIE — À CONFIRMER**.

## Dossiers liés

- Session : `./docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-15_A1_API-05`
- Patch : `./docs/3-patches/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-15_A1_API-05`
