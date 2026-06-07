# README_DOCS.md

Projet : Ambulance Manager  
Statut : gouvernance documentaire racine active

## Objet

Ce document définit les règles courtes de gouvernance du dossier `docs/`.

## Structure autorisée à la racine de `docs/`

- `README_DOCS.md`
- `README.md`
- `CMD.md` (brouillon personnel, non source de vérité)
- `1-MASTER/`
- `2-SESSIONS/`
- `3-TEMPLATES/`

Aucune archive active n'est conservée dans le repo actif.

## Rôle des sections

- `docs/1-MASTER/` : documentation active de référence.
  - Index à lire : `docs/1-MASTER/_INDEX_MASTER.md`
  - Actifs principaux :
    - `docs/1-MASTER/DOCUMENT_MAITRE_V2.md`
    - `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL_V2.md`
    - `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md`
    - `docs/1-MASTER/REGISTRE_DECISIONS_V2.md`
  - Actifs temporaires ou de contexte contrôlé :
    - `docs/1-MASTER/ETAT_GLOBAL_PROJET_V2.md`
    - `docs/1-MASTER/AUDIT_CODE_EXISTANT_ALPHA_V2.md`
    - `docs/1-MASTER/AUDIT_COMPARAISON_BASE44_OFFICIEL_V1.md`
- `docs/1-MASTER/1-MAQUETTE/` : maquettes conservées.
- `docs/1-MASTER/2-REFERENCE_UI_UX/` : références UI/UX conservées.
- `docs/1-MASTER/3-FONCTIONNALITES/` : fiches fonctionnalités conservées.
- `docs/1-MASTER/4-BASE44_REFERENCE/` : référence Base44 conservée.
  - Synthèse active : `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
  - Usage : prototype fonctionnel, visuel et métier ; pas source technique finale.
- `docs/2-SESSIONS/` : gouvernance actuelle des sessions si le dossier existe encore.
  - Document actif : `docs/2-SESSIONS/README_SESSIONS.md`
  - Modèle de session : `docs/2-SESSIONS/SESSION-YYYYMMDD-XX`
- `docs/3-TEMPLATES/` : modèles documentaires si le dossier existe encore.

## Règle de priorité documentaire

En cas de contradiction :
1. code réel du dépôt officiel ;
2. documents normatifs actifs de `docs/1-MASTER` ;
3. documents temporaires ou de preuve ;
4. références complémentaires conservées.

Les anciennes archives et anciennes sessions Alpha supprimées ne sont plus des sources actives.

## Doctrine Base44

Base44 reste une référence prototype conservée dans `docs/1-MASTER/4-BASE44_REFERENCE/`.

Le repo officiel reste la source technique finale. Base44 ne doit jamais être copié directement.

## Rappel opérationnel

- Ne pas créer de plan concurrent au `PLAN_DE_DEVELOPPEMENT_V2.md`.
- Ne pas utiliser `CMD.md` comme source de vérité documentaire.
- Les prochaines sessions Codex doivent partir des documents MASTER actifs restants.
- En cas d'information manquante, utiliser : `INFORMATION NON FOURNIE - À CONFIRMER`.
