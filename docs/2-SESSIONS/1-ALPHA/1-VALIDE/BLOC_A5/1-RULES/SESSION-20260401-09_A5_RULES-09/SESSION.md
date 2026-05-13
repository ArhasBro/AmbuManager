# SESSION

## ID SESSION

SESSION-20260401-09_A5_RULES-09

## Date

01/04/2026

## Contexte

Projet : Investissement
Sous-projet : Ambulance Manager
Maturité : 1-ALPHA
Bloc : A5
Type : VALIDATION
Intitulé : Validation du bloc règles métier

## Objectif de la session

Valider factuellement l’état réel du bloc A5 après `RULES-01` à `RULES-08`, à partir du code réellement présent, des patchs réellement livrés, des documents de session réellement disponibles et des validations terminales réellement prouvées, sans ouvrir la clôture de bloc `CLOTURE_A5`.

## Périmètre exact traité

### Documents contrôlés
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- sessions `RULES-01` à `RULES-08`
- patchs `RULES-01` à `RULES-08`

### Code contrôlé
- `app/api/company/rules/route.ts`
- `app/company/page.tsx`
- `app/company/company-rules-panel.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/users/page.tsx`
- `app/users/user-edit-client.tsx`
- `app/users/user-creation-client.tsx`
- `lib/company-rules/catalog.ts`
- `lib/company-rules/api.ts`
- `lib/company-rules/runtime.ts`
- `lib/company-rules/governance.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`

## Résultat synthétique de session

Le bloc A5 est retenu comme **partiellement conforme** au résultat attendu du plan.

Validation factuelle retenue :
- le stockage `CompanyRule` a bien été re-présenté côté produit sous forme de paramètres métier ALPHA lisibles via une couche dédiée (`catalog` + `api` + UI société) ;
- la cohérence moteur / API / UI est réellement atteinte sur le périmètre effectivement branché :
  - `PLANNING_MIN_REST_HOURS` pour la règle métier réelle ;
  - `PLANNING_VIEW_MODE` pour le réglage UI / exploitation ;
- la gouvernance minimale du droit `COMPANY_RULES_MANAGE` est réellement traitée sans refonte globale du RBAC ;
- un résiduel prouvé subsiste toutefois : la page société qui porte l’UI A5 reste verrouillée par rôle `ADMIN` / `GERANT`, alors que l’autorité d’écriture réelle des règles est `COMPANY_RULES_MANAGE`.

Conséquence :
- **pas de patch code légitime** dans `RULES-09` ;
- verdict retenu : **NO_PATCH — BLOC A5 PARTIELLEMENT CONFORME**.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-09_A5_RULES-09`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-09_A5_RULES-09`
