# SESSION

## ID SESSION

SESSION-20260313-05_A1_RBAC-04

## Date

13/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A1  
Type : COMPLÉTION

## Intitulé

RBAC-04 — COMPLÉTION — Ajout / réalignement des permissions fines ALPHA validées

## Objectif

Compléter et réaligner strictement `RBAC-04` à partir du cadrage `06.5`, sans rouvrir l’audit `RBAC-03`, sans implémenter la permission dédiée `consulter audit`, et sans ouvrir une refonte RBAC générale.

La session doit distinguer explicitement :
- les permissions fines ALPHA réellement ajoutées / matérialisées ;
- les permissions réellement rebranchées sur des contrôles déjà présents ;
- les permissions seulement préparées / cataloguées ;
- ce qui reste volontairement hors périmètre car réservé aux sessions suivantes ou à des modules encore absents.

## Références réellement utilisées

### Documentation officielle
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/STRUCTURE_PROJET.md`

### Sessions précédentes utiles
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-03_A1_RBAC-02/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-04_A1_RBAC-03/*`

### Code réel modifié / inspecté
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `prisma/seed.ts`
- `app/users/page.tsx`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/vehicles/page.tsx`
- `app/api/vehicles/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/dashboard/page.tsx`

## Rappel du rôle exact d’une session COMPLÉTION

Une session de type `COMPLÉTION` :
- part d’un besoin officiellement validé ;
- vérifie si une complétion minimale autonome est réellement faisable dans le dépôt ;
- produit un patch borné seulement si cette complétion est prouvable sans ouvrir d’autre session ;
- n’invente ni matrice théorique d’attribution, ni nouveaux écrans, ni permissions hors cadrage.

Conséquence pour `RBAC-04` :
- la permission `consulter audit` reste exclue ;
- les modules absents (`templates`, gestion rôles/permissions, export, dashboard terrain, création manuelle de shift, suppression métier d’un shift publié) ne sont pas créés ici ;
- les permissions correspondantes peuvent être préparées / cataloguées, mais pas surqualifiées comme pleinement consommées si aucun contrôle produit distinct n’existe.

## Stratégie de complétion retenue

La complétion minimale autonome strictement `RBAC-04` a été jugée faisable avec la stratégie suivante :
- créer un catalogue central des permissions ALPHA **hors audit** ;
- conserver strictement les codes déjà validés :
  - `PLANNING_AUTOSCHEDULE`
  - `PLANNING_AUTOSCHEDULE_PUBLISH`
- ajouter les autres permissions `06.5` hors audit avec des codes cohérents au style existant ;
- réaligner quelques contrôles déjà présents vers des helpers permissionnels dédiés lorsqu’un branchement propre était possible sans refonte ;
- conserver les accès natifs `ADMIN` / `GERANT` pour ne pas casser l’existant validé ;
- ne pas inventer d’attribution seed globale des nouvelles permissions à des rôles ou utilisateurs au-delà de l’existant déjà présent.

## Résultat synthétique de session

La session produit un patch minimal réel.

Résultat prouvé :
- un catalogue central de **17 permissions ALPHA hors audit** est matérialisé ;
- les permissions existantes `PLANNING_AUTOSCHEDULE` et `PLANNING_AUTOSCHEDULE_PUBLISH` sont conservées ;
- des helpers permissionnels bornés sont ajoutés pour :
  - autoschedule
  - publish
  - cancel run
  - gestion utilisateurs
  - gestion véhicules
  - gestion règles métier
  - modification du planning
  - accès dashboard admin
- des contrôles déjà présents sont réalignés vers ces helpers sur les zones réellement existantes du dépôt ;
- aucune permission hors `06.5` n’est ajoutée ;
- la permission `consulter audit` n’est pas implémentée ;
- aucune matrice d’attribution complète n’est inventée dans le seed.

## Liste exacte des fichiers code modifiés

- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `prisma/seed.ts`
- `app/users/page.tsx`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/vehicles/page.tsx`
- `app/api/vehicles/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/dashboard/page.tsx`

## Vérifications techniques réellement exécutées

Commandes réellement lancées dans le dépôt cible :
- `npm run lint`
- `npm run build`

Résultat réel :
- `npm run lint` : `OK`
- `npm run build` : `OK`

Contrôle technique complémentaire réellement exécuté :
- contrôle syntaxique local via `TypeScript transpileModule` sur tous les fichiers modifiés : `OK`

Conclusion technique honnête :
- la syntaxe des fichiers modifiés a été recontrôlée localement ;
- la validation `lint/build` est désormais prouvée sur le dépôt cible.

## Conclusion de session

Une complétion minimale autonome strictement `RBAC-04` est bien prouvée et réalisée.

Elle reste toutefois **partielle** au regard de l’alignement global final attendu sur tout `06.5`, parce que :
- plusieurs permissions sont seulement cataloguées / préparées ;
- certains modules ou contrôles distincts n’existent pas encore dans le dépôt ;
- la validation technique `lint/build` est désormais prouvée sur le dépôt cible.
