# Ambulance Manager — README_SESSIONS

Version : V2.0  
Date : 26/05/2026

## Sommaire

- 1. Rôle du dossier `docs/2-SESSIONS`
- 2. Principe général des sessions
- 3. Modèle de session `SESSION-YYYYMMDD-XX`
- 4. Ouverture d’une session Codex
- 5. Documents à lire au début d’une session
- 6. Règles de lecture documentaire limitée
- 7. Règles de travail pendant une session
- 8. Règles de patch
- 9. Contrôles obligatoires
- 10. Preuves attendues
- 11. Documentation de fin de session
- 12. Clôture de session
- 13. Interdictions strictes
- 14. Documents concurrents archivés
- 15. Conclusion
- 16. Statut du document
- 17. Règles officielles Codex / ChatGPT contrôle

## 1. Rôle du dossier docs/2-SESSIONS

Le dossier `docs/2-SESSIONS` sert à conserver :
- l’historique des sessions ;
- les preuves d’exécution ;
- les notes et résultats de session ;
- les clôtures de session.

Ce dossier est une base de traçabilité.  
Il ne remplace pas `docs/1-MASTER`.

## 2. Principe général des sessions

Document unique actif de gouvernance des sessions :
- `docs/2-SESSIONS/README_SESSIONS.md`

Règles de base :
- 1 session = 1 objectif unique ;
- lecture documentaire minimale ;
- patch minimal et ciblé ;
- preuves terminales obligatoires ;
- clôture explicite.

## 3. Modèle de session SESSION-YYYYMMDD-XX

Le dossier `docs/2-SESSIONS/SESSION-YYYYMMDD-XX` est conservé comme modèle opérationnel utilisé par le script de création de session.

Rôle :
- standardiser la structure de session ;
- garantir les fichiers de suivi :
  - `SESSION.md`
  - `NOTES.md`
  - `EVIDENCES.md`
  - `RESULTATS.md`
  - `FIN_SESSION.md`

## 4. Ouverture d’une session Codex

À l’ouverture :
1. définir le type de session ;
2. définir l’objectif unique ;
3. fixer le périmètre exact ;
4. lister les fichiers autorisés ;
5. lister les fichiers interdits ;
6. annoncer les contrôles à exécuter ;
7. exécuter la session sans élargir le périmètre.

## 5. Documents à lire au début d’une session

Documents obligatoires par défaut :
- `docs/1-MASTER/_INDEX_MASTER.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md`
- `docs/1-MASTER/DOCUMENT_MAITRE_V2.md`
- `docs/2-SESSIONS/README_SESSIONS.md`

Documents à lire selon le bloc :
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL_V2.md`
- `docs/1-MASTER/REGISTRE_DECISIONS_V2.md`
- `docs/1-MASTER/AUDIT_CODE_EXISTANT_ALPHA_V2.md` (si audit/écarts code)
- `docs/1-MASTER/ETAT_GLOBAL_PROJET_V2.md` (si statut global)
- `docs/1-MASTER/RGPD_BASE_MINIMALE.md` (si impact données/permissions)
- dossiers ciblés de `docs/2-SESSIONS/1-ALPHA/` (uniquement si preuve/historique nécessaire)

Documents à ne pas lire sauf demande explicite :
- lecture exhaustive de `docs/2-SESSIONS/1-ALPHA/1-VALIDE`
- anciens documents concurrents listés en section 14
- tout dossier non lié à l’objectif de la session

## 6. Règles de lecture documentaire limitée

- lire d’abord les documents obligatoires ;
- ouvrir uniquement les fichiers utiles à l’objectif ;
- ne pas lire tout le repo par défaut ;
- ne pas utiliser les historiques comme source active sans validation master ;
- en cas de doute : `INFORMATION NON FOURNIE — À CONFIRMER`.

## 7. Règles de travail pendant une session

- garder un objectif unique ;
- éviter le mélange code + refonte documentaire + tri documentaire ;
- appliquer un périmètre strict ;
- modifier seulement les fichiers autorisés ;
- signaler immédiatement tout blocage.

## 8. Règles de patch

- patch minimal, ciblé, traçable ;
- aucun patch hors périmètre ;
- aucun fichier `.diff` créé par défaut ;
- patch/diff seulement si demandé explicitement dans la session ;
- ne jamais rejouer un ancien patch historique sans contrôle explicite.

## 9. Contrôles obligatoires

Contrôles minimum :
- `git status --short`
- contrôles techniques adaptés au périmètre (lint, build, tests) si code modifié
- vérification des fichiers réellement touchés
- vérification des fichiers interdits non modifiés

## 10. Preuves attendues

En fin de session, fournir :
- résumé des actions réalisées ;
- liste des fichiers lus ;
- liste des fichiers modifiés ;
- liste des fichiers créés/supprimés/déplacés ;
- sortie `git status --short` ;
- sortie `git diff -- <chemins concernés>` si modification ;
- points à confirmer restants.

## 11. Documentation de fin de session

La documentation de session doit être mise à jour dans la structure session concernée :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`

Règle :
- documenter uniquement ce qui a été réellement fait et vérifié.

## 12. Clôture de session

Une session est clôturable si :
- objectif unique traité ;
- périmètre respecté ;
- contrôles exécutés ;
- preuves fournies ;
- verdict final explicite.

Format de verdict attendu :
- `<SESSION> — <INTITULÉ> : OUI / NON`
- `PASSAGE À LA SESSION SUIVANTE RECOMMANDÉ : OUI / NON / À CONFIRMER`

## 13. Interdictions strictes

- ne pas transformer `docs/2-SESSIONS` en plan de développement parallèle ;
- ne pas relire tout l’historique par défaut ;
- ne pas mélanger plusieurs objectifs majeurs dans une session ;
- ne pas faire de refonte documentaire massive pendant une session de code ;
- ne pas modifier `docs/1-MASTER` hors besoin validé ;
- ne pas modifier `docs/3-TEMPLATES` hors besoin validé ;
- ne pas modifier le code applicatif dans une session documentaire ;
- ne pas supprimer/déplacer des éléments historiques sans validation explicite.

## 14. Documents concurrents archivés

Les documents suivants sont des documents concurrents de gouvernance déjà archivés dans `docs/4-ARCHIVES/2-SESSIONS_HISTORIQUE/` :

- `docs/2-SESSIONS/README.md`
- `docs/2-SESSIONS/GOUVERNANCE_SESSIONS.md`
- `docs/2-SESSIONS/_INDEX_SESSIONS.md`
- `docs/2-SESSIONS/CHECKLIST_EXECUTION_LOTS_SESSIONS.md`
- `docs/2-SESSIONS/DOSSIER_DECISION_LOTS_SESSIONS.md`
- `docs/2-SESSIONS/FORMULAIRE_VALIDATION_LOTS_SESSIONS.md`
- `docs/2-SESSIONS/SIMULATION_ARCHIVAGE_SESSIONS.md`

Ces documents archivés ne sont plus des documents actifs de gouvernance des sessions.

## 15. Conclusion

Ce document définit une gouvernance de session simple, courte et exploitable pour la Phase 6 :
- un document actif unique ;
- une lecture documentaire minimale ;
- une exécution par objectif unique ;
- des contrôles et preuves obligatoires ;
- une clôture explicite de chaque session.

## 16. Statut du document

Ce document est le document actif de gouvernance des sessions Codex.

Il remplace les anciens documents concurrents listés en section 14, qui sont archivés.

Règles :
- ce document doit rester court, clair et opérationnel ;
- il ne doit pas redevenir un plan de développement parallèle ;
- il doit être modifié uniquement si le fonctionnement réel des sessions change ;
- toute modification importante doit être validée humainement.

## 17. Règles officielles Codex / ChatGPT contrôle

### 17.1 ChatGPT contrôle

- ChatGPT contrôle ne doit pas démarrer de contrôle repo/ZIP à l’ouverture.
- Tant que le retour brut Codex n’est pas fourni, il doit répondre uniquement :
  - `EN ATTENTE DU RETOUR CODEX — CONTRÔLE NON DÉMARRÉ`
- ChatGPT contrôle contrôle uniquement le retour brut Codex et les pièces transmises ensuite.

### 17.2 Création de session

- Toute session doit être créée via `create_session.ps1`.
- La structure doit être présente dès l’ouverture :
  - `SESSION.md`
  - `NOTES.md`
  - `EVIDENCES.md`
  - `RESULTATS.md`
  - `FIN_SESSION.md`
  - `PATCH/`
- Si le script échoue, afficher l’erreur exacte et s’arrêter sans création manuelle alternative.

### 17.3 Retour Codex

- Ne pas recopier intégralement les `.md`, les `.diff` et les gros contenus.
- Fournir seulement : résumé court, chemins des fichiers, commandes exécutées, preuves, `git status --short`, justification des commandes non lancées.

### 17.4 Session documentaire

- Pas de `.diff` obligatoire.
- Pas de `git diff` complet obligatoire dans le retour.
- `git status --short` et contrôle d’encodage restent obligatoires.

### 17.5 Session code

- Si patch code : `.diff` obligatoire.
- Le `.diff` doit être dans `PATCH/` et commencer par `diff --git`.
- Preuve obligatoire : `git apply --check <chemin_du_patch>`.

### 17.6 Validation

- Codex ne s’auto-valide jamais.
- Formule autorisée : `Travail terminé côté Codex, en attente de contrôle ChatGPT / validation humaine.`
- La validation appartient à ChatGPT contrôle et à la validation humaine.

### 17.7 Preuves obligatoires des sessions code

- Si code modifié : présence obligatoire d’un patch `.diff` dans `PATCH/`, commençant par `diff --git`.
- La commande exacte `git apply --check <chemin_du_patch>` doit être exécutée et sa sortie terminale complète copiée dans `EVIDENCES.md`.
- `git status --short`, `npm run lint`, `npm run build` et `npm run docs:encoding` (si disponible) doivent être exécutés avec sorties complètes copiées.
- Si une commande échoue ou n’existe pas : copier la sortie complète d’échec.
- Un simple résumé (`OK`, `succès`, `exit 0`) ne constitue jamais une preuve suffisante.
- Codex ne s’auto-valide jamais ; le verdict final appartient au contrôle externe.
