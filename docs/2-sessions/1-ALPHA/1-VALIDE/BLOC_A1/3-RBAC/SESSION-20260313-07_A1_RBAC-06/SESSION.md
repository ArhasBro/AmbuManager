# SESSION

## ID SESSION

SESSION-20260313-07_A1_RBAC-06

## Date

13/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A1  
Type : COMPLÉTION

## Intitulé

RBAC-06 — COMPLÉTION — Mise à niveau du modèle d’accès à l’audit (rôle + permission)

## Objectif exact de la session

À partir du cadrage officiel `06.5` et `06.6`, vérifier si le modèle d’accès à l’audit est réellement atteint après `RBAC-05`, puis corriger minimalement le dépôt si nécessaire, sans rouvrir `RBAC-05`, sans créer de page audit complète, sans créer de route audit dédiée, sans inventer de support propriétaire et sans ouvrir le multi-rôle.

## Relectures préalables effectivement réalisées

Les références `./docs/1-master` ont été relues avant conclusion, avec priorité sur :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`

Les sessions précédentes utiles ont aussi été relues :
- `RBAC-01`
- `RBAC-03`
- `RBAC-04`
- `RBAC-05`

## Point de départ réel retenu

Après `RBAC-05`, l’état réellement prouvé était le suivant :
- la permission dédiée `consulter audit` existe sous le code `AUDIT_VIEW` ;
- un helper `canViewAudit()` existe ;
- `GET /api/planning/autoschedule/runs/[id]` passe déjà par ce helper ;
- le support réel d’exposition audit reste un support mixte `détail run + audit` ;
- la séparation fine entre accès au run et accès à l’audit n’est pas encore assurée ;
- le support propriétaire reste absent du dépôt réel, déjà prouvé par `RBAC-01`.

## Périmètre strict traité

Inclus :
- vérification du modèle d’accès réel sur le support existant `GET /api/planning/autoschedule/runs/[id]` ;
- distinction réelle entre accès run et accès audit ;
- conservation du filtre multi-tenant `companyId` ;
- ajustement minimal de l’UI `/planning` pour refléter l’état d’accès audit.

Exclus :
- support propriétaire ;
- multi-rôle ;
- page audit complète ;
- route audit dédiée ;
- matrice complète rôles/permissions ;
- attribution UI complète des permissions ;
- `AUDIT-07`, `AUDIT-08`, `RBAC-07`, `RBAC-08`, `RBAC-09`, `SUP-*`.

## Résultat synthétique de session

Une complétion minimale autonome strictement `RBAC-06` est prouvée et réalisée.

Le correctif borne désormais le support mixte existant comme suit :
- accès run via `canAutoSchedule()` ;
- accès audit via `canViewAudit()` ;
- `ADMIN` / `GERANT` conservent l’accès natif via les helpers existants ;
- un profil avec accès run mais sans `AUDIT_VIEW` peut lire le run sans recevoir les logs d’audit ;
- un profil avec `AUDIT_VIEW` mais sans accès run peut lire la partie audit exposée sans recevoir les `draftShifts` ;
- le filtre `companyId` reste conservé.

## Liste exacte des fichiers code modifiés

- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/planning/planning-client.tsx`

## Vérifications techniques réellement prouvées sur le dépôt cible

- `git apply --check` du patch officiel : `OK`
- application du patch officiel : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-07_A1_RBAC-06`
- Patch : `docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-07_A1_RBAC-06`
