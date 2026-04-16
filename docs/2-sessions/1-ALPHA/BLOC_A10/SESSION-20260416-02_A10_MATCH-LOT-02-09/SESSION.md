# SESSION

## ID SESSION

SESSION-20260416-02_A10_MATCH-LOT-02-09

## Date

16/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A10 — Matching  
Type : CORRECTION-COMPLÉTION  
Intitulé : Correction et/ou complétion du scoring, de l’alignement du matching sur la composition minimale d’équipe, de l’alignement sur les véhicules requis, de la logique d’équilibre de charge, de la visibilité du score qualité au niveau run et shift, et des variantes 1 / 2 / 3 simples

## Objectif de la session

Corriger le matching réel à partir des constats prouvés par `MATCH-01`, sans rejouer l’audit ni dériver vers la validation finale du bloc, afin de livrer sur code réel :
- des variantes simples 1 / 2 / 3 ;
- un score qualité visible au niveau run ;
- un score qualité visible au niveau shift ;
- un réalignement minimal du moteur et de la UI sur le cadrage A10 ;
- la conservation de la cohérence multi-tenant / permissions.

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
- constats documentés de `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/*`

Code modifié en priorité :
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`

Code relu sans modification :
- `lib/templates/template-rules.ts`
- `prisma/schema.prisma`
- `lib/services/planning/planning-audit.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/company-rules/runtime.ts`
- `lib/types/planning.ts`

## Résultat synthétique de session

Un patch principal unique, complété par un correctif minimal séparé `FIX-01`, a été produit pour compléter le matching réel sans refonte globale ni migration Prisma.

Le correctif livre :
- 3 variantes simples déterministes (`VARIANT_1`, `VARIANT_2`, `VARIANT_3`) en preview, apply et UI ;
- un score qualité par shift calculé côté service et visible dans la UI ;
- un score matching du run exposé via `GET /api/planning/autoschedule/runs/[id]` ;
- une cohérence de variante au niveau run basée sur la dernière variante appliquée prouvable dans l’audit existant, avec fallback strict `VARIANT_1` ;
- un réalignement du libellé `VARIANT_2` sur son comportement réel d’ordre stable par identifiant ;
- le maintien de la logique d’équilibre de charge, de la composition minimale d’équipe et des véhicules requis ;
- la conservation du bornage multi-tenant et permissionnel existant.

Aucune migration Prisma n’a été nécessaire.

Les validations terminales réelles prouvées pour l’état final sont :
- `git apply --check` : OK
- `git apply` : OK
- `npx prisma generate` : OK
- `npx prisma validate` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09`
- Patchs : `docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09`
