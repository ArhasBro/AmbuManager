# SESSION

## ID SESSION

SESSION-20260416-01_A10_MATCH-01

## Date

16/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A10 — Matching  
Type : AUDIT  
Intitulé : Audit complet du matching existant : scoring qualité, logique d’équilibre de charge, prise en compte de la composition minimale d’équipe, des véhicules requis, des variantes simples et de la visibilité du score qualité

## Objectif de la session

Auditer le matching réellement présent dans le dépôt pour statuer, sur preuves code + documentation, sur :
- l’existence réelle du scoring qualité ;
- les métriques réellement calculées ;
- la logique réelle d’équilibre de charge ;
- la prise en compte réelle de la composition minimale d’équipe ;
- la prise en compte réelle des véhicules requis ;
- l’existence réelle de variantes simples ;
- la visibilité réelle du score qualité au niveau run et au niveau shift ;
- la cohérence multi-tenant / permissions ;
- la cohérence finale entre documentation A10 attendue et implémentation réelle.

## Périmètre exact traité

Documentation relue :
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

Code contrôlé en priorité :
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`
- `lib/templates/template-rules.ts`
- `prisma/schema.prisma`

Complément strictement nécessaire pour qualification :
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/company-rules/runtime.ts`
- `lib/types/planning.ts`

## Résultat synthétique de session

Le matching réel est partiellement conforme au cadrage A10.

Le cœur existe réellement :
- preview + apply sont présents ;
- le scoring qualité est calculé ;
- une logique simple d’équilibrage de charge existe pour les employés et les véhicules ;
- la composition minimale d’équipe et le type de véhicule requis sont exploités dans la proposition ;
- la UI `/planning` affiche un score global avec sous-scores et explications après preview.

Les écarts strictement prouvés sont :
- aucune variante simple 1 / 2 / 3 n’existe ;
- le score n’est pas matérialisé comme score par shift ;
- le score run est visible en preview UI mais non porté comme donnée durable du run ;
- la documentation historique 4.6 / registre des décisions n’est plus totalement alignée avec l’implémentation actuelle de `computePlanningQuality`.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01`
- Patchs : `docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01`
