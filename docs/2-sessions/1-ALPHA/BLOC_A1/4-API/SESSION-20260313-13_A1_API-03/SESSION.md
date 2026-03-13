# SESSION

## ID SESSION

`SESSION-20260313-13_A1_API-03`

## Date

`2026-03-13`

## Contexte

Projet : `Investissement`  
Sous-projet : `Ambulance Manager`  
Maturité : `1-ALPHA`  
Bloc : `A1`  
Type : `AUDIT`  
Intitulé : `Audit de cohérence des erreurs API`

Cette session est un **audit documentaire et factuel** de la cohérence des erreurs API réellement présentes sur le dépôt après `API-02`.
Elle **ne corrige rien**, **ne produit aucun `.diff`**, **ne produit aucun `README_PATCH.md`**, et clôture le dossier patch en mode `NO_PATCH`.

## Références de travail retenues

### Références documentaires prioritaires
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

### Historique prouvé repris sans réouverture
- `docs/2-sessions/1-ALPHA/BLOC_A1/1-AUTH/SESSION-20260312-02_A1_AUTH-03/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/2-TENANT/SESSION-20260313-01_A1_TENANT-04/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/3-RBAC/SESSION-20260313-10_A1_RBAC-09/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-11_A1_API-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-12_A1_API-02/*`

### Code réel inspecté
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

### Route explicitement exclue du jugement de cohérence métier
- `app/api/auth/[...nextauth]/route.ts`
  - route framework `NextAuth(authOptions)` ;
  - le format HTTP/JSON y est piloté par NextAuth et non par le socle API métier propre au produit.

## Objectif exact

Auditer strictement, à partir du cadrage officiel, de l’historique prouvé et du code réel, la **cohérence des erreurs API** sur les routes métier ALPHA réellement présentes, afin de distinguer :
- ce qui est déjà cohérent ;
- ce qui reste hétérogène ;
- ce qui relève d’un simple écart de wording ;
- ce qui relève d’un problème plus profond de structure d’erreur ;
- ce qui justifie ou non une future session `API-04`.

## Périmètre exact traité

### Ce qui est audité
- la structure actuelle des payloads d’erreur ;
- l’usage actuel du champ `error` ;
- les statuts HTTP associés aux erreurs ;
- les payloads de validation (`Zod`, JSON invalide, params invalides) ;
- les mappings Prisma / base / métier visibles ;
- l’usage réel de `lib/api/response.ts` ;
- l’usage réel de `lib/api/prisma-error.ts`.

### Ce qui n’est pas rouvert
- `AUTH-03`
- `TENANT-04`
- `RBAC-09`
- la correction structurelle déjà validée par `API-02`
- une harmonisation effective des erreurs relevant de `API-04`
- une validation API/UI relevant de `API-05`
- toute correction code, tout `.diff`, tout `README_PATCH.md`

## Méthode appliquée

1. relecture des documents `.md` demandés avec priorité absolue à `docs/1-master` ;
2. reprise du cadrage officiel module `18 — API / conventions` ;
3. reprise de l’historique prouvé `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01`, `API-02` sans les rouvrir ;
4. inspection statique des **16 routes métier** réellement présentes dans `app/api` hors route NextAuth ;
5. séparation explicite entre :
   - cohérence de structure ;
   - cohérence du vocabulaire ;
   - cohérence des statuts HTTP ;
   - cohérence des validations ;
   - cohérence du mapping Prisma / métier ;
   - cohérence d’usage des helpers ;
6. clôture documentaire en mode `NO_PATCH`.

## Résultat synthétique de session

L’état réel après `API-02` est le suivant :

### Point positif désormais prouvé
Sur les routes métier inspectées, la **structure externe d’erreur** suit désormais le contrat cible `{ ok:false, error, details? }`.
Aucun écart encore prouvé de type top-level `message`, `debug` ou `runId` n’a été retrouvé dans les réponses d’erreur inspectées.

### Limite principale désormais prouvée
La **cohérence sémantique** des erreurs reste seulement **partielle** :
- le champ `error` n’est pas stabilisé sur une seule doctrine ;
- plusieurs routes utilisent des **codes symboliques uppercase** ;
- d’autres utilisent des **messages texte anglais capitalisés** ;
- `vehicles` introduit même un **message métier français** dans `error` ;
- les validations d’entrée et les mappings Prisma restent portés par plusieurs stratégies concurrentes.

### Lecture correcte de l’état réel
- `API-02` a bien corrigé le **problème structurel** ;
- `API-03` prouve qu’il reste un **problème de cohérence des erreurs**, mais plus principalement de forme externe ;
- les écarts restants sont assez réels pour justifier une future `API-04`, sans imposer de rouvrir `API-02`.

## Verdict retenu

Verdict final de la session : **`partiellement conforme`**.
