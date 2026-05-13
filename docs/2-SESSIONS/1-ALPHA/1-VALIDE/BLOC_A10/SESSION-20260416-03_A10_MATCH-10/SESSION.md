# SESSION

## ID SESSION

SESSION-20260416-03_A10_MATCH-10

## Date

16/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A10  
Type : VALIDATION  
Intitulé : Validation complète du bloc matching ALPHA : cohérence du scoring, prise en compte correcte des contraintes équipe / véhicule / charge, lisibilité du score qualité et disponibilité de variantes simples

## Objectif de la session

Valider sur le code réel, après `MATCH-LOT-02-09`, que le matching ALPHA couvre bien le périmètre fonctionnel attendu par le cadrage A10 (`12.1`, `12.2`, `12.3`, `12.4`) : scoring cohérent, prise en compte correcte de la composition minimale d’équipe et des véhicules requis, logique d’équilibre de charge, disponibilité des variantes simples 1 / 2 / 3, visibilité du score qualité au niveau run et shift, et conservation du bornage multi-tenant / permissions.

## Périmètre exact traité

### Documentation relue
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
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/*`
- `docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/README_PATCH.md`

### Code contrôlé en priorité
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`
- `lib/templates/template-rules.ts`
- `lib/types/planning.ts`

### Dépendances relues si nécessaire
- `lib/services/planning/planning-audit.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/company-rules/runtime.ts`
- `prisma/schema.prisma`

## Résultat synthétique de session

Validation fonctionnelle A10 confirmée sur le code réel contrôlé.

Constats validés :
- scoring qualité cohérent et réellement exploité ;
- métriques cohérentes entre service, API et UI ;
- logique d’équilibre de charge réellement présente ;
- composition minimale d’équipe réellement prise en compte ;
- véhicules requis réellement pris en compte ;
- variantes simples `VARIANT_1` / `VARIANT_2` / `VARIANT_3` réellement disponibles ;
- score qualité visible au niveau du run ;
- score qualité visible au niveau du shift ;
- cohérence multi-tenant / permissions préservée.

Décision patch : `NO_PATCH`.

Résiduel strictement prouvé :
- désalignement documentaire historique dans `docs/1-master/REGISTRE_DECISIONS.md` sur les pondérations et la définition de la stabilité du score qualité ;
- ce résiduel est documentaire, externe à la décision de patch de la session, et ne justifie pas de correctif code dans le périmètre strict de `MATCH-10`.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-03_A10_MATCH-10`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-03_A10_MATCH-10`
