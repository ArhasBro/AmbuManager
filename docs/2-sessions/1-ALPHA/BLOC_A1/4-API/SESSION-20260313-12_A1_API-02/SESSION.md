# SESSION

## ID SESSION

SESSION-20260313-12_A1_API-02

## Date

13/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A1  
Type : CORRECTION  
Intitulé : Correction des routes non conformes au format API cible

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
- sessions précédentes utiles `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01`
- code réel du dépôt

Contexte de reprise imposé :
- `AUTH-03` a validé la présence et la cohérence de `role` et `companyId` dans auth / JWT / session / typings ;
- `TENANT-04` a validé le cloisonnement multi-tenant ALPHA sur le périmètre inspecté ;
- `RBAC-09` a retenu le bloc rôles / permissions ALPHA comme `partiellement conforme` sans réouverture ici ;
- `API-01` a retenu le socle API ALPHA comme `partiellement conforme` et a prouvé un format cible officiel :
  - succès : `{ ok:true, data }`
  - erreur : `{ ok:false, error, details? }` ;
- `API-02` est strictement bornée à la correction des écarts de **structure** encore visibles sur les routes réellement non conformes.

## Objectif de la session

Corriger uniquement les réponses HTTP/JSON réellement non conformes au contrat cible officiel sur le périmètre ALPHA inspecté, sans transformer `API-02` en refonte globale du format API ni en harmonisation fine des erreurs relevant de `API-03` / `API-04`.

## Périmètre exact traité

### Documentation inspectée
- documents maîtres `docs/1-master`
- `docs/SOURCES_AUTORISEES.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- sessions utiles `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01`

### Code inspecté en priorité
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
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
- `app/api/health/prisma/route.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`

### Routes réellement corrigées
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`

### Routes relues mais non modifiées
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/health/prisma/route.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`

Motif du non-changement :
- structure déjà conforme au contrat cible ;
- ou écarts restants relevant du wording / harmonisation fine / validation API-UI hors périmètre `API-02`.

### Hors périmètre explicitement respecté
- réouverture de `API-01`
- harmonisation exhaustive des codes / messages d’erreur
- politique `422`
- refonte auth / RBAC / tenant
- changement métier non requis par le format API
- modification UI
- extension BETA
- `API-03`, `API-04`, `API-05`

## Résultat synthétique de session

Constat principal après relecture du code réel :
- les succès respectaient déjà majoritairement `{ ok:true, data }` ;
- les écarts encore réellement non conformes sur le périmètre audité concernaient surtout des champs top-level d’erreur hors contrat :
  - `runId`
  - `message`
  - `debug`
- ces écarts étaient concentrés sur six routes autoschedule.

Correction retenue :
- conservation des statuts HTTP existants ;
- conservation de la logique métier existante ;
- déplacement des informations utiles sous `details` quand leur conservation était nécessaire (`runId`, message métier, contexte debug) ;
- absence volontaire de refactor global vers `lib/api/response.ts` afin de rester sur un patch minimal et localisé.

État obtenu sur le périmètre corrigé :
- les routes modifiées renvoient désormais :
  - succès : `{ ok:true, data }`
  - erreur : `{ ok:false, error, details? }`
- aucune route déjà structurellement conforme n’a été retouchée inutilement.

Verdict retenu à ce stade :
- **conforme**

Portée de ce verdict :
- strictement bornée à la correction structurelle des routes réellement non conformes traitées dans `API-02` ;
- sans préjuger des harmonisations plus fines restant à contrôler en `API-03` / `API-04` ni de la cohérence API/UI qui relève de `API-05`.

## Fichiers principaux inspectés

### Documentation
- documents maîtres `docs/1-master`
- sessions utiles `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01`

### Code
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- routes API listées dans le périmètre exact ci-dessus

## Livrable principal

- correction code minimale sur 6 routes autoschedule ;
- aucun changement UI ;
- aucun changement auth / RBAC / tenant ;
- patch officiel `.diff` produit ;
- `README_PATCH.md` produit ;
- vérification de patch prouvée via `git apply --check` et `git apply` sur copie propre ;
- `npm run lint` : `OK` ;
- `npm run build` : `OK`.

## Limites de preuve

- cette session ne prouve pas la cohérence API/UI finale ;
- cette session ne traite pas l’harmonisation fine des codes/messages d’erreur ;
- toute information absente des sources relues reste : **INFORMATION NON FOURNIE — À CONFIRMER**.

## Dossiers liés

- Session : `./docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-12_A1_API-02`
- Patch : `./docs/3-patches/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-12_A1_API-02`
