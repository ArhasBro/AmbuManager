# SESSION

## ID SESSION

SESSION-20260313-02_A1_RBAC-01

## Date

13/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A1  
Type : AUDIT  
Intitulé : Audit complet des rôles existants et de leur usage réel

Références officielles utilisées :
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/master/ETAT_GLOBAL_PROJET.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/RECAP_DISCUSSIONS.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-05_A1_AUTH-06/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260313-01_A1_TENANT-04/RESULTATS.md`
- code réel du dépôt

Contexte de reprise imposé :
- `AUTH-03` a validé le portage de `role` et `companyId` dans la session ;
- `AUTH-06` a déjà prouvé l’absence d’un rôle support propriétaire exploitable dans le dépôt ;
- `TENANT-04` a validé le cloisonnement multi-tenant sur le périmètre ALPHA inspecté ;
- `RBAC-01` doit maintenant auditer les rôles réellement présents, leur portée réelle et leur usage réel, sans correction de code.

## Objectif de la session

Établir, sur le périmètre `1-ALPHA`, un état des lieux strictement factuel des rôles réellement présents et de leur usage réel dans le dépôt, en vérifiant notamment :
- quels rôles existent réellement dans le schéma, le seed, l’auth et le typage ;
- où ces rôles sont effectivement injectés dans la session ;
- où ils sont consommés côté pages serveur, routes/API et composants clients ;
- quelles restrictions d’accès sont réellement appliquées ;
- quelles distinctions de rôles restent seulement documentaires, partielles ou non prouvées.

Rappel méthodologique d’une session de type **AUDIT** :
- constater l’existant réel ;
- comparer au cadrage officiel sans corriger ;
- distinguer précisément le prouvé, le partiel, le non prouvé et l’hors périmètre ;
- produire un dossier patch cohérent en `NO_PATCH` lorsqu’aucune correction n’est autorisée ni attendue.

## Périmètre exact traité

### Documentation inspectée
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/master/ETAT_GLOBAL_PROJET.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/RECAP_DISCUSSIONS.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- sessions précédentes utiles `AUTH-03`, `AUTH-06`, `TENANT-04`

### Code inspecté en priorité
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `lib/auth.ts`
- `types/next-auth.d.ts`
- `lib/rbac.ts`
- `lib/permissions.ts`
- `proxy.ts`
- `app/dashboard/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/users/reset-password-client.tsx`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/health/prisma/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `lib/services/planning/matching.service.ts`

### Hors périmètre explicitement respecté
- refonte complète du système RBAC ;
- correction RBAC ;
- complétion RBAC ;
- création utilisateur ;
- reset password hors lien direct avec les rôles ;
- modélisation support propriétaire au-delà du simple constat d’absence déjà prouvé ;
- préparation BETA ;
- hypothèses produit non codées.

## Résultat synthétique de session

Constat principal :
- le dépôt possède bien un catalogue de rôles codé, un rôle principal obligatoire sur `User`, une session enrichie avec `role`, et plusieurs garde-fous d’accès réellement branchés sur ce champ ;
- l’usage réellement prouvé des rôles est toutefois concentré sur `ADMIN` et `GERANT`, avec un complément ponctuel par permissions DB pour l’autoschedule ;
- `BUREAU` est réellement présent dans le seed et peut bénéficier d’autorisations autoschedule via permissions, mais sans distinction produit forte propre à ce rôle ;
- `DEA`, `AA`, `TAXI` et `REGULATEUR` existent dans l’enum et dans certains types, mais aucun usage produit distinct n’a été prouvé pour eux sur le périmètre inspecté ;
- le cadrage officiel vise `ADE` alors que le code porte encore `DEA`, ce qui confirme un décalage déjà anticipé par `RBAC-02` ;
- aucun rôle support propriétaire exploitable n’est présent dans le code réel, en cohérence avec `AUTH-06`.

Conséquence d’audit :
- le socle rôles/RBAC existe réellement ;
- son usage réel reste partiel et incomplet par rapport au cadrage fonctionnel validé ;
- aucune matrice RBAC globale réellement implémentée n’a été trouvée ;
- l’autorité d’accès est répartie entre contrôles directs de rôle (`ADMIN`/`GERANT`) et deux permissions dédiées planning (`PLANNING_AUTOSCHEDULE`, `PLANNING_AUTOSCHEDULE_PUBLISH`).

Verdict retenu :
- **partiellement conforme**

## Fichiers principaux inspectés

### Documentation
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/master/ETAT_GLOBAL_PROJET.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/RECAP_DISCUSSIONS.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-05_A1_AUTH-06/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260313-01_A1_TENANT-04/RESULTATS.md`

### Code
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `lib/auth.ts`
- `types/next-auth.d.ts`
- `lib/rbac.ts`
- `lib/permissions.ts`
- `proxy.ts`
- `app/dashboard/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/users/reset-password-client.tsx`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/health/prisma/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `lib/services/planning/matching.service.ts`

## Livrable principal

- audit documentaire complet du périmètre `RBAC-01` ;
- aucun correctif code ;
- dossier patch cohérent en `NO_PATCH` ;
- aucun fichier `.diff` produit.

## Limites de preuve

- audit mené sur cadrage officiel + sessions utiles + code réel fourni ;
- aucune exécution E2E produit n’est fournie dans cette session ;
- aucun `node_modules` n’est présent dans l’environnement, donc `npm run lint` et `npm run build` échouent par absence de binaires (`eslint: not found`, `next: not found`) ;
- aucune information non présente dans ces sources n’a été extrapolée ;
- toute donnée absente reste : **INFORMATION NON FOURNIE — À CONFIRMER**.

## Dossiers liés

- Session : `./docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01`
- Patch : `./docs/patches/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01`
