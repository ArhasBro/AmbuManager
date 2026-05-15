# README_DOCS.md

Projet : Ambulance Manager  
Mise à jour : 2026-05-15  
Statut : GOUVERNANCE DOCUMENTAIRE RACINE — OFFICIEL

## 1. Objet

Ce document définit la gouvernance détaillée du dossier `docs/`.
Il précise :
- la structure autorisée ;
- le rôle des fichiers racine ;
- la hiérarchie documentaire ;
- les règles de lecture pour Codex ;
- les règles de prudence (maquettes, encodage, plan officiel).

## 2. Structure autorisée à la racine de `docs/`

Éléments autorisés en racine :
- `README_DOCS.md`
- `README.md`
- `CMD.md`
- `STRUCTURE_DOCS.md`
- `1-MASTER/`
- `2-SESSIONS/`
- `3-TEMPLATES/`
- `4-ARCHIVES/`

Tout nouvel élément racine hors périmètre doit être validé avant ajout.

## 3. Rôle des fichiers racine

- `docs/README_DOCS.md` : gouvernance documentaire détaillée (document de pilotage documentaire racine).
- `docs/README.md` : accueil simple du dossier `docs/` (résumé court, non redondant).
- `docs/CMD.md` : brouillon personnel Nathan, non officiel produit.
- `docs/STRUCTURE_DOCS.md` : inventaire structurel opérationnel ; statut temporaire à confirmer.

## 4. Règles explicites sur `CMD.md`

- `docs/CMD.md` est conservé en racine.
- `docs/CMD.md` est un brouillon personnel Nathan.
- `docs/CMD.md` n'a pas valeur de source officielle produit.
- Codex ne doit pas l'utiliser comme source de vérité documentaire.
- `docs/CMD.md` ne doit pas être modifié sans demande explicite Nathan.

## 5. Règles explicites sur `STRUCTURE_DOCS.md`

- `docs/STRUCTURE_DOCS.md` ne doit pas être supprimé automatiquement.
- `docs/STRUCTURE_DOCS.md` ne doit pas être fusionné automatiquement.
- Statut actuel : inventaire structurel / preuve opérationnelle / à confirmer.
- Décision future possible (hors REBASAGE-02) : conserver, archiver, fusionner partiellement ou remplacer par un index plus propre.

## 6. Distinction `README.md` vs `README_DOCS.md`

- `README.md` : accueil simple.
- `README_DOCS.md` : gouvernance détaillée.
- Aucune fusion automatique entre les deux.
- Les doublons doivent être réduits, mais les rôles doivent rester distincts.

## 7. Priorité documentaire

Hiérarchie de lecture/documentation à appliquer :

1. Code réel du dépôt (état technique réellement présent).
2. `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md` (périmètre produit validé).
3. `docs/1-MASTER/DOCUMENT_MAITRE.md` (principes globaux et règles non négociables).
4. `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md` (ordre officiel de développement).
5. `docs/1-MASTER/REGISTRE_DECISIONS.md` (décisions validées).
6. `docs/1-MASTER/ETAT_GLOBAL_PROJET.md` (état courant synthétique).
7. `docs/1-MASTER/2-REFERENCE_UI_UX/` (références visuelles codables par page).
8. Maquettes PNG officielles (`docs/1-MASTER/1-MAQUETTE/...`) pour la cible visuelle.
9. `docs/2-SESSIONS/` (preuves et historique ; ne prime pas sur les documents maîtres).
10. `docs/1-MASTER/RECAP_DISCUSSIONS.md` (contexte ; valeur inférieure aux décisions officielles).
11. `docs/CMD.md` (brouillon personnel non officiel).

## 8. Règles de lecture pour Codex

- Lire d'abord les documents maîtres selon la hiérarchie ci-dessus.
- Utiliser les sessions historiques comme preuves/contextes, pas comme source d'autorité supérieure.
- En cas d'information manquante, utiliser exactement :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

## 9. Règle maquettes

- Ne pas déplacer les maquettes pendant REBASAGE-02.
- Des chemins historiques `MAQUETTE_DA` peuvent exister dans certains anciens textes/sessions.
- La structure réelle actuelle des maquettes est portée par :
  - `docs/1-MASTER/1-MAQUETTE/MAQUETTES_FONDATRICES_IMAGES_V1.0`
  - `docs/1-MASTER/1-MAQUETTE/MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0`
  - `docs/1-MASTER/1-MAQUETTE/PAGES_SIMPLES_FINITIONS_IMAGE_V1.0`
- Une matrice future est attendue (hors REBASAGE-02) :
  - `Page -> PNG officiel -> dossier réel -> référence UI/UX -> route app -> fichier app`

## 10. Règle encodage

- Pas de correction massive d'encodage pendant REBASAGE-02.
- Toute correction future devra passer par un lot dédié, avec preuve fichier par fichier :
  - fichier concerné ;
  - exemple exact ;
  - encodage constaté ;
  - correction effectuée ;
  - vérification après correction.

## 11. Règle plan officiel

- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md` reste le seul plan officiel.
- Ne pas refondre ce plan pendant REBASAGE-02.
- Ne pas créer de plan de développement parallèle.
- Les incohérences constatées sont notées pour traitement en fin de rebasage global.

## 12. Règle de casse documentaire

Casse officielle à utiliser dans les nouveaux documents :

```txt
docs/1-MASTER/
docs/2-SESSIONS/
docs/3-TEMPLATES/
docs/4-ARCHIVES/
```

Les anciennes variantes en minuscules peuvent subsister dans l'historique sans réécriture massive rétroactive.
