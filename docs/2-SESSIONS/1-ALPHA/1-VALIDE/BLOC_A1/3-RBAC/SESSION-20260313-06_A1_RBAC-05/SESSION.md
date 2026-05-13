# SESSION

## ID SESSION

SESSION-20260313-06_A1_RBAC-05

## Date

13/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A1  
Type : COMPLÉTION

## Intitulé

RBAC-05 — COMPLÉTION — Ajout de la permission dédiée `consulter audit`

## Objectif

Compléter strictement `RBAC-05` à partir du cadrage `06.5` et `06.6`, en ajoutant la permission dédiée `consulter audit`, en vérifiant sa matérialisation réelle dans le catalogue déjà en place, et en la branchant minimalement sur un contrôle de consultation d’audit déjà existant dans le dépôt, sans ouvrir le modèle complet d’accès audit réservé à `RBAC-06`.

## Références réellement utilisées

### Documentation officielle
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/STRUCTURE_PROJET.md`

### Sessions précédentes utiles
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-04_A1_RBAC-03/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-05_A1_RBAC-04/*`

### Code réel inspecté
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `lib/auth.ts`
- `types/next-auth.d.ts`
- `lib/services/planning/planning-audit.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`

## Rappel du rôle exact d’une session COMPLÉTION

Une session de type `COMPLÉTION` :
- part d’un besoin officiellement validé ;
- vérifie si une complétion minimale autonome est réellement faisable dans le dépôt ;
- produit un patch borné seulement si cette complétion est prouvable sans ouvrir une autre session ;
- n’invente ni modèle complet futur, ni matrice d’attribution globale, ni écran hors périmètre.

Conséquence pour `RBAC-05` :
- la permission dédiée devait être ajoutée ;
- le branchement devait rester minimal et factuellement rattaché à la consultation d’audit déjà existante ;
- le modèle complet `rôle + permission + support propriétaire + harmonisation globale audit` restait hors périmètre.

## Stratégie de complétion retenue

La complétion minimale autonome strictement `RBAC-05` a été jugée faisable avec la stratégie suivante :
- ajouter la permission dédiée au catalogue central existant sous un code cohérent : `AUDIT_VIEW` ;
- réutiliser le mécanisme déjà en place dans `prisma/seed.ts`, qui upsert toutes les permissions du catalogue, sans ouvrir de migration Prisma ni de seed spécifique supplémentaire ;
- ajouter un helper dédié `canViewAudit()` dans `lib/permissions.ts` ;
- réaligner uniquement le contrôle existant de lecture du détail run / audit planning (`GET /api/planning/autoschedule/runs/[id]`) sur ce helper ;
- conserver l’accès natif `ADMIN` / `GERANT` via le helper commun ;
- ne pas inventer d’attribution seed globale de `AUDIT_VIEW` à des rôles ou utilisateurs de démonstration ;
- ne pas créer de route audit supplémentaire ni de page audit dédiée.

## Résultat synthétique de session

La session produit un patch code minimal réel et recevable.

Résultat prouvé :
- la permission dédiée `consulter audit` est matérialisée dans le catalogue sous le code `AUDIT_VIEW` ;
- cette permission est réinjectée dans le seed via le mécanisme existant `ensurePermissions()` ;
- un helper dédié `canViewAudit()` est ajouté ;
- le contrôle existant de consultation de l’audit planning du run courant passe désormais par cette permission dédiée ;
- le filtre multi-tenant existant par `companyId` est conservé ;
- aucun support propriétaire n’est inventé ;
- aucune route ou page audit complète supplémentaire n’est créée.

Limite explicitement conservée :
- le contrôle réellement réaligné reste le détail run existant, qui porte à la fois l’audit du run courant et d’autres informations du run ; cela ne vaut donc pas mise à niveau complète et propre du modèle d’accès audit global.

Cette limite relève du bornage assumé de `RBAC-05` et non d’une non-conformité sur le périmètre exact de la session.

## Liste exacte des fichiers code modifiés

- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`

## Vérifications techniques réellement exécutées

État réel désormais prouvé sur le dépôt cible :
- le `.diff` a bien été appliqué sans erreur ;
- `npm run lint` : `OK` ;
- `npm run build` : `OK`.

Conclusion technique honnête :
- le patch est appliqué ;
- la validation technique finale `lint/build` est prouvée sur le dépôt cible ;
- aucun résultat technique n’est inventé.

## Conclusion de session

Une complétion minimale autonome strictement `RBAC-05` est bien prouvée et réalisée.

La session est **conforme** sur son périmètre exact :
- la permission dédiée est ajoutée ;
- elle est matérialisée dans le catalogue / seed existant ;
- elle est consommée par un contrôle réel déjà présent ;
- le périmètre reste strictement borné sans glisser vers `RBAC-06`.
