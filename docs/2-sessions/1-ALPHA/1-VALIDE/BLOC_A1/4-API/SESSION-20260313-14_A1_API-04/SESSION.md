# SESSION

## ID SESSION

SESSION-20260313-14_A1_API-04

## Date

13/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A1  
Type : CORRECTION  
Intitulé : Harmonisation minimale des erreurs critiques

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
- sessions précédentes utiles `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01`, `API-02`, `API-03`
- code réel du dépôt

Contexte de reprise imposé :
- `AUTH-03` a validé la présence et la cohérence de `role` et `companyId` dans auth / JWT / session / typings ;
- `TENANT-04` a validé le cloisonnement multi-tenant ALPHA sur le périmètre inspecté ;
- `RBAC-09` a retenu le bloc rôles / permissions ALPHA comme `partiellement conforme` sans réouverture ici ;
- `API-01` a prouvé le contrat cible officiel :
  - succès : `{ ok:true, data }`
  - erreur : `{ ok:false, error, details? }` ;
- `API-02` a corrigé les écarts structurels et a été validée comme conforme sur son périmètre ;
- `API-03` a prouvé que la structure externe des erreurs est globalement cohérente mais que la sémantique du champ `error` reste hétérogène.

## Objectif de la session

Corriger strictement les incohérences critiques encore ouvertes après `API-03`, sans réouvrir `API-02`, sans refonte globale de l’API et sans ouvrir `API-05`.

L’objectif exact retenu est :
- fixer une doctrine minimale `error = code symbolique uppercase` sur les helpers génériques ;
- réaligner le mapping Prisma minimal partagé sur cette doctrine ;
- corriger uniquement les routes encore dépendantes du helper texte ou d’un message libre critique ;
- conserver les statuts HTTP et la logique métier existante ;
- basculer les explications utiles en `details` quand cela est nécessaire.

## Périmètre exact traité

### Documentation inspectée
- relecture transversale de l’ensemble des fichiers `.md` sous `./docs` via scan global du corpus documentaire ;
- lecture détaillée prioritaire des documents `docs/1-master` ;
- lecture détaillée des documents racine `docs/SOURCES_AUTORISEES.md`, `docs/PROTOCOLE_SESSION.md`, `docs/STRUCTURE_DOCS.md` ;
- lecture du template `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` ;
- lecture détaillée des sessions utiles `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01`, `API-02`, `API-03`.

### Code inspecté en priorité
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- `app/api/health/prisma/route.ts`
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

### Fichiers code réellement modifiés
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`

### Fichiers relus mais non modifiés
- `app/api/health/prisma/route.ts`
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

Motif du non-changement :
- doctrine déjà majoritairement symbolique uppercase ;
- structure déjà conforme au contrat `{ ok:false, error, details? }` ;
- écarts restants non critiques ou déjà hors cible `API-04`.

### Hors périmètre explicitement respecté
- réouverture de `API-01`
- réouverture de `API-02`
- réaudit complet `API-03`
- ouverture anticipée de `API-05`
- refonte exhaustive des validations
- nouvelle politique HTTP théorique
- changement UI
- réouverture auth / RBAC / tenant
- refactor global d’architecture

## Résultat synthétique de session

Constat retenu après inspection du code réel :
- la doctrine dominante du dépôt sur les routes autoschedule, planning et company est déjà `error = code symbolique uppercase` ;
- l’incohérence critique restante venait surtout du helper `lib/api/response.ts`, encore en messages texte anglais ;
- cette incohérence se propageait directement sur `health/prisma`, `users`, `users/[id]/reset-password` et `vehicles` ;
- `lib/api/prisma-error.ts` restait lui aussi en messages texte (`Duplicate`, `Not found`) ;
- `vehicles` conservait un message métier libre dans `error` (`Véhicule déjà existant`) ;
- certaines validations critiques sur `users`, `reset-password` et `vehicles` exposaient encore `error` sous forme libre (`Invalid query`, `Invalid body`, `Invalid JSON`).

Correction retenue :
- `lib/api/response.ts` réaligné sur : `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `SERVER_ERROR` ;
- `badRequest()` doté d’un défaut `BAD_REQUEST` pour éviter un retour implicite libre ;
- `lib/api/prisma-error.ts` réaligné sur `CONFLICT` / `NOT_FOUND` ;
- `users` réaligné sur `VALIDATION_ERROR` pour la validation de requête ;
- `users/[id]/reset-password` réaligné sur `INVALID_JSON`, `VALIDATION_ERROR`, `BAD_REQUEST`, avec les explications utiles déplacées sous `details.message` ;
- `vehicles` réaligné sur `VALIDATION_ERROR` et sur `CONFLICT` avec explication métier conservée en `details.message`.

État obtenu sur le périmètre corrigé :
- les helpers génériques suivent désormais la même doctrine que la majorité du dépôt ;
- le mapping Prisma partagé n’introduit plus de wording concurrent ;
- les routes critiques encore dépendantes du helper texte ne renvoient plus de messages libres dans `error` ;
- aucune route déjà cohérente symboliquement n’a été retouchée inutilement ;
- les statuts HTTP existants ont été conservés.

Verdict retenu à ce stade :
- **conforme**

Portée du verdict :
- strictement bornée à `API-04` ;
- sans préjuger d’une harmonisation exhaustive de tous les wording secondaires ;
- sans validation API/UI qui relève de `API-05`.

## Fichiers principaux inspectés

### Documentation
- documents maîtres `docs/1-master`
- sessions utiles `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01`, `API-02`, `API-03`

### Code
- helpers API partagés `lib/api/response.ts`, `lib/api/prisma-error.ts`
- routes listées dans le périmètre exact ci-dessus

## Livrable principal

- correction code minimale sur 5 fichiers ;
- aucun changement UI ;
- aucun changement auth / RBAC / tenant ;
- patch officiel `.diff` produit ;
- `README_PATCH.md` produit ;
- vérification de patch prouvée via `git apply --check` et `git apply` sur copie propre.

## Limites de preuve

- `npm run lint` a été réellement exécuté avec succès après installation locale des dépendances ;
- `npm run build` a été réellement exécuté et échoue hors périmètre `API-04` sur `app/api/company/rules/route.ts` (`RuleMode` non exporté par `@prisma/client`) ;
- toute information non visible dans les sources relues reste : **INFORMATION NON FOURNIE — À CONFIRMER**.

## Dossiers liés

- Session : `./docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-14_A1_API-04`
- Patch : `./docs/3-patches/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-14_A1_API-04`
