# README_DOCS.md

Projet : Ambulance Manager  
Statut : gouvernance documentaire racine (active)

## Objet

Ce document définit les règles courtes de gouvernance du dossier `docs/`.

## Structure autorisée à la racine de `docs/`

- `README_DOCS.md`
- `README.md`
- `CMD.md` (brouillon personnel, non source de vérité)
- `1-MASTER/`
- `2-SESSIONS/`
- `3-TEMPLATES/`
- `4-ARCHIVES/`

## Rôle des sections

- `docs/1-MASTER/` : références actives de gouvernance projet.
  - Index à lire : `docs/1-MASTER/_INDEX_MASTER.md`
  - Actifs principaux :
    - `docs/1-MASTER/DOCUMENT_MAITRE_V2.md`
    - `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL_V2.md`
    - `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md`
    - `docs/1-MASTER/REGISTRE_DECISIONS_V2.md`
  - Actifs temporaires avant Phase 6 :
    - `docs/1-MASTER/ETAT_GLOBAL_PROJET_V2.md`
    - `docs/1-MASTER/AUDIT_CODE_EXISTANT_ALPHA_V2.md`
- `docs/2-SESSIONS/` : gouvernance et historique des sessions.
  - Document actif unique : `docs/2-SESSIONS/README_SESSIONS.md`
  - Modèle de session : `docs/2-SESSIONS/SESSION-YYYYMMDD-XX`
  - Anciens documents concurrents archivés : `docs/4-ARCHIVES/2-SESSIONS_HISTORIQUE/`
- `docs/3-TEMPLATES/` : modèles de documents de session (support d'exécution, pas source de vérité produit).
- `docs/4-ARCHIVES/` : documents historiques retirés du périmètre actif.

## Règle de priorité documentaire

En cas de contradiction :
1. documents normatifs actifs de `docs/1-MASTER` ;
2. documents temporaires (preuve/contexte) ;
3. documents mémoriels ;
4. archives.

Les archives ne sont utilisées qu'en cas de besoin historique explicite.

## Rappel opérationnel

- Ne pas créer de plan concurrent au `PLAN_DE_DEVELOPPEMENT_V2.md`.
- Ne pas utiliser `CMD.md` comme source de vérité documentaire.
- En cas d'information manquante, utiliser : `INFORMATION NON FOURNIE — À CONFIRMER`.
