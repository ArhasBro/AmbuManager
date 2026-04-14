# SESSION

## ID SESSION

`SESSION-20260407-14_A6_TPL-14`

## Date

07/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A6 — Shift templates  
Type : VALIDATION  
Intitulé : Validation du bloc templates

## Objectif de la session

Valider l'état réel du bloc templates après `TPL-01` à `TPL-13`, sans rejouer le bloc complet et sans ouvrir `CLOTURE_A6`, puis corriger uniquement un éventuel résiduel strictement prouvé.

## Périmètre exact traité

Contrôle effectué sur :
- la documentation maître requise dans `docs/1-master/*` ;
- `docs/PROTOCOLE_SESSION.md` ;
- `docs/SOURCES_AUTORISEES.md` ;
- `docs/STRUCTURE_DOCS.md` ;
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` ;
- les sessions et patchs réels `TPL-01` à `TPL-13` du bloc A6 ;
- le code réel du dépôt sur le périmètre Prisma, API templates, UI templates, planning, autoschedule, matching et assignation.

## Résultat synthétique de session

Le bloc A6 est substantiellement implémenté et administrable dans le dépôt contrôlé. Un résiduel strictement prouvé subsistait toutefois sur la fondation matching : la composition minimale d'équipe portée par les templates n'était pas réellement utilisée dans `matching.service.ts`.

Un correctif minimal unique a donc été produit pour `TPL-14` afin d'aligner le matching avec les règles templates déjà présentes dans le bloc.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-14_A6_TPL-14`
- Patchs : `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-14_A6_TPL-14`
