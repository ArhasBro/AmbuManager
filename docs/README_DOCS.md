# README_DOCS.md

Projet : Ambulance Manager  
Mise à jour : 2026-05-22  
Statut : GOUVERNANCE DOCUMENTAIRE RACINE — OFFICIEL

## 1. Objet

Ce document définit la gouvernance détaillée du dossier `docs/`.

## 2. Structure autorisée à la racine de `docs/`

Éléments autorisés en racine :
- `README_DOCS.md`
- `README.md`
- `CMD.md`
- `1-MASTER/`
- `2-SESSIONS/`
- `3-TEMPLATES/`
- `4-ARCHIVES/`

Le fichier historique `STRUCTURE_DOCS.md` est archivé dans :
- `docs/4-ARCHIVES/1-MASTER_HISTORIQUE/STRUCTURE_DOCS.md`

## 3. Rôle des fichiers racine

- `docs/README_DOCS.md` : gouvernance documentaire détaillée.
- `docs/README.md` : accueil simple du dossier `docs/`.
- `docs/CMD.md` : brouillon personnel Nathan, non officiel produit.

## 4. Priorité documentaire

1. Code réel du dépôt.
2. `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`.
3. `docs/1-MASTER/DOCUMENT_MAITRE.md`.
4. `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md`.
5. `docs/1-MASTER/REGISTRE_DECISIONS.md`.
6. `docs/1-MASTER/ETAT_GLOBAL_PROJET.md`.
7. `docs/1-MASTER/2-REFERENCE_UI_UX/`.
8. `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/`.
9. `docs/2-SESSIONS/`.
10. `docs/1-MASTER/RECAP_DISCUSSIONS.md`.
11. `docs/CMD.md`.

## 5. Règles explicites

- Aucune suppression physique sans archivage.
- En cas d'information manquante, utiliser exactement : `INFORMATION NON FOURNIE — À CONFIRMER`.
- `docs/2-SESSIONS/` ne doit pas être modifié pendant ce nettoyage structurel.

## 6. Règle maquettes et références UI/UX

- Chemin actif maquettes PNG :
  - `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/`
- Les dossiers suivants ont un statut transitoire / historique :
  - `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/`
  - `docs/1-MASTER/2-REFERENCE_UI_UX/`
- Ils sont conservés comme base de comparaison et mémoire visuelle.
- Ils ne doivent pas être archivés maintenant.
- Après validation des nouvelles maquettes, ils serviront à produire des références UI/UX propres pour guider le codage.

## 7. Règle plan actif

- Plan actif : `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md`.
- Ancien plan archivé : `docs/4-ARCHIVES/1-MASTER_HISTORIQUE/PLAN_DE_DEVELOPPEMENT_ARCHIVE.md`.
- Ne pas créer de plan concurrent.

## 8. Règle de casse documentaire

Casse officielle à utiliser :

```txt
docs/1-MASTER/
docs/2-SESSIONS/
docs/3-TEMPLATES/
docs/4-ARCHIVES/
```
