# Patches — Ambulance Manager

Ce dossier contient les patchs (`.diff`) produits et appliqués pendant le projet.

## Règles

- Un patch est rattaché à **une session** (`SESSION-YYYYMMDD-XX`) et à **un bloc/phase** (ex: 4.4).
- Chaque patch doit être **traçable** : session, objectif, fichiers impactés, statut d’application.
- Les patchs doivent être appliqués **depuis la racine du projet**.
- Les patchs sont des **artefacts** : ils servent à rejouer une modification, auditer, ou partager un changement.

## Structure

docs/patches/  
README.md  
<phase>/  
SESSION-YYYYMMDD-XX__<phase>__<short-title>.diff  

Exemple :
- `docs/patches/4.4/SESSION-20260304-01__4.4__rbac-publish_seed-tenants_dbreset.diff`

## Convention de nommage

Format :
`SESSION-YYYYMMDD-XX__PHASE__short-title.diff`

Règles :
- `PHASE` = bloc actif (ex: `4.4`)
- `short-title` = kebab-case, descriptif, court

## Application d’un patch

Depuis la racine :

```bash
git apply -p1 --check <chemin_du_patch>
git apply -p1 <chemin_du_patch>

si conflit :
git apply -p1 --reject <chemin_du_patch>

Statuts possibles

PRÊT : patch généré, non appliqué

APPLIQUÉ : patch appliqué localement

PUSH : patch appliqué + poussé sur le remote

ANNULÉ : patch reverté / abandonné

REMPLACÉ : patch remplacé par un patch plus récent

Liens avec la documentation de session

Chaque session doit référencer les patchs appliqués dans :

docs/sessions/SESSION-YYYYMMDD-XX/EVIDENCES.md

et/ou docs/sessions/SESSION-YYYYMMDD-XX/RESULTATS.md

