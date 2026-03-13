# SESSION

## ID SESSION

`SESSION-20260313-11_A1_API-01`

## Date

`2026-03-13`

## Contexte

Projet : `Investissement`  
Sous-projet : `Ambulance Manager`  
Maturité : `1-ALPHA`  
Bloc : `A1`  
Type : `AUDIT`  
Intitulé : `Audit du format API existant`

Cette session est un **audit documentaire et factuel** du format API réellement présent sur le périmètre ALPHA livré.
Elle ne doit pas corriger le code, ne doit produire aucun `.diff`, ne doit pas produire de `README_PATCH.md`, et doit clôturer le dossier patch en mode `NO_PATCH`.

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
- `docs/2-sessions/1-ALPHA/BLOC_A1/1-AUTH/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/2-TENANT/SESSION-20260313-01_A1_TENANT-04/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/3-RBAC/SESSION-20260313-10_A1_RBAC-09/RESULTATS.md`

### Code réel inspecté
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- `lib/services/planning/autoschedule-match.ts`
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
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`

### Route explicitement écartée du jugement de normalisation produit
- `app/api/auth/[...nextauth]/route.ts`
  - route framework `NextAuth(authOptions)` ;
  - le format HTTP/JSON y est piloté par NextAuth et non par le socle API métier propre au produit.

## Objectif exact

Auditer strictement, à partir du cadrage officiel et du code réel, le format API actuellement utilisé sur les routes métier réellement présentes afin de déterminer si le socle HTTP/JSON livré est :
- `conforme`
- `partiellement conforme`
- `non conforme`
- `incomplet`

## Questions d’audit à trancher

- existe-t-il un format API homogène réellement identifiable sur le dépôt ?
- les réponses de succès utilisent-elles une structure cohérente ?
- les réponses d’erreur utilisent-elles une structure cohérente ou plusieurs formats concurrents ?
- les statuts HTTP réellement utilisés sont-ils cohérents avec les cas traités ?
- les cas `401`, `403`, `404`, `409`, `422`, `500` sont-ils homogènes ou non ?
- les validations d’entrée réellement présentes produisent-elles un format d’erreur cohérent ?
- les erreurs Prisma / base / métier réellement mappées produisent-elles un format cohérent ?
- existe-t-il des helpers partagés de réponse API ou de mapping d’erreurs ?
- certaines routes sont-elles déjà standardisées alors que d’autres restent hétérogènes ?
- existe-t-il une contradiction prouvée entre le cadrage officiel et le code réel ?

## Bornage de session

Hors périmètre strict :
- correction code ;
- production d’un `.diff` ;
- production d’un `README_PATCH.md` ;
- refonte théorique globale du format API ;
- réouverture artificielle de `AUTH-*`, `TENANT-*`, `RBAC-*`, `USERS-*`, `SUP-*` ou BETA ;
- jugement métier hors sujet sur la logique fonctionnelle quand le problème observé relève seulement du format de réponse.

## Méthode appliquée

1. relecture des documents `.md` demandés avec priorité absolue à `docs/1-master` ;
2. reprise du cadrage officiel module `18 — API / conventions` ;
3. reprise de l’historique prouvé `AUTH-03`, `TENANT-04`, `RBAC-09` sans les rouvrir ;
4. inspection statique des routes métier `app/api/**/*` réellement présentes ;
5. séparation explicite entre :
   - structure de succès ;
   - structure d’erreur ;
   - statuts HTTP ;
   - validation d’entrée ;
   - mapping Prisma / métier ;
   - helpers partagés ;
6. clôture documentaire en mode `NO_PATCH`.

## Résultat synthétique de session

Le dépôt prouve un **socle API partiellement homogène** :
- les réponses de succès des routes métier inspectées suivent globalement le format attendu `{ ok: true, data }` ;
- un helper partagé existe bien dans `lib/api/response.ts` ;
- plusieurs routes `users`, `vehicles`, `health`, `match/preview`, `match/apply` réutilisent au moins une partie de ce socle.

Mais l’audit prouve aussi une **hétérogénéité réelle et non marginale** :
- seulement une partie des routes utilise le helper partagé ;
- de nombreuses routes construisent encore leurs réponses localement avec `NextResponse.json()` ou un helper local ;
- les erreurs alternent entre codes symboliques uppercase (`UNAUTHORIZED`, `NOT_FOUND`, `SERVER_ERROR`) et messages anglais capitalisés (`Unauthorized`, `Not found`, `Server error`) ;
- certaines erreurs ajoutent `details`, d’autres `message`, d’autres `debug`, sans convention réellement unique ;
- le mapping Prisma est dupliqué dans plusieurs routes au lieu d’être centralisé ;
- aucune prise en charge homogène du cas `422` n’a été trouvée.

## Verdict retenu

Verdict final de la session : **`partiellement conforme`**.
