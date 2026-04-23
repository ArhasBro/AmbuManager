# SESSION — `SESSION-20260423-03_A15_FRONT-03`

## 1. Identification

- Projet : `Investissement`
- Sous-projet : `Ambulance Manager`
- Stage : `1-ALPHA`
- Bloc : `A15 — Frontend`
- Type : `VALIDATION`
- Intitulé : `Validation complète du frontend : lisibilité, cohérence des parcours, stabilité des écrans critiques`

## 2. Nature de la session

Cette session est une session de `VALIDATION`.

Elle s’inscrit dans la continuité méthodologique du bloc A15 :
- `FRONT-01` = audit ;
- `FRONT-LOT-02` = correction + complétion ;
- `FRONT-03` = validation.

La session doit donc vérifier la cohérence du frontend sur le périmètre ciblé, sans dériver vers une refonte globale hors périmètre.

## 3. Objectif de la session

Valider le frontend existant sur le périmètre défini par le bloc A15, en particulier :
- la lisibilité générale ;
- la cohérence des parcours ;
- la stabilité des écrans critiques.

## 4. Périmètre exact traité

Sources et base de lecture indiquées en production :
- `DOCUMENT_MAITRE.md`
- `PLAN_DE_DEVELOPPEMENT.md`
- sessions utiles : `FRONT-01`, `FRONT-LOT-02`

Périmètre frontend réellement contrôlé :
- dashboard
- users
- vehicles
- templates
- planning

Zones et composants explicitement mentionnés :
- layout / shell / thème :
  - `app/layout.tsx`
  - `app/app-shell.tsx`
  - `app/globals.css`
- composants critiques :
  - `UsersListClient`
  - `VehiclesClient`
  - `TemplatesClient`
  - `PlanningClient`
  - `ManualPlanningPanel`

## 5. Décision patch

`PATCH REQUIS`

Motif démontré :
- résiduel réel dans le périmètre `FRONT-03` ;
- le dashboard filtrait déjà les entrées selon les droits ;
- la navigation globale exposait encore statiquement tous les modules.

## 6. Résultat synthétique de session

Le traitement de production conclut que `FRONT-03` est **validée après correctif minimal**.

Le correctif retenu consiste à :
- supprimer la navigation globale statique ;
- calculer côté layout les liens autorisés selon la session, le `companyId`, le rôle et les permissions ;
- transmettre ensuite ces liens au shell applicatif.

Aucun fix séparé supplémentaire n’a été produit.

## 7. Fichiers et livrables liés

Dossier session :
- `docs/2-sessions/1-ALPHA/BLOC_A15/SESSION-20260423-03_A15_FRONT-03`

Dossier patch :
- `docs/2-sessions/1-ALPHA/BLOC_A15/SESSION-20260423-03_A15_FRONT-03/PATCH`

Patch principal :
- `PATCH__SESSION-20260423-03_A15_FRONT-03.diff`

Documentation patch :
- `README_PATCH.md`
