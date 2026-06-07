# Ambulance Manager - README_SESSIONS

Version : V3.0
Date : 07/06/2026

## Sommaire

- [1. Role du dossier `docs/2-SESSIONS`](#1-role-du-dossier-docs2-sessions)
- [2. Principe general des sessions](#2-principe-general-des-sessions)
- [3. Modele de session `SESSION-YYYYMMDD-XX`](#3-modele-de-session-session-yyyymmdd-xx)
- [4. Creation de session](#4-creation-de-session)
- [5. Ouverture d'une session Codex](#5-ouverture-dune-session-codex)
- [6. Documents a lire au debut d'une session](#6-documents-a-lire-au-debut-dune-session)
- [7. Regles de lecture documentaire limitee](#7-regles-de-lecture-documentaire-limitee)
- [8. Regles de travail pendant une session](#8-regles-de-travail-pendant-une-session)
- [9. Regles de patch](#9-regles-de-patch)
- [10. Contenu des preuves](#10-contenu-des-preuves)
- [11. Documentation de fin de session](#11-documentation-de-fin-de-session)
- [12. Cloture de session](#12-cloture-de-session)
- [13. Interdictions strictes](#13-interdictions-strictes)
- [14. References historiques non actives](#14-references-historiques-non-actives)
- [15. Statut du document](#15-statut-du-document)

## 1. Role du dossier docs/2-SESSIONS

Le dossier `docs/2-SESSIONS` conserve la gouvernance des sessions Codex et les traces des sessions executees.

Ce dossier est une base de tracabilite. Il ne remplace pas `docs/1-MASTER` et ne doit pas devenir un plan de developpement parallele.

## 2. Principe general des sessions

Document actif de gouvernance des sessions :

- `docs/2-SESSIONS/README_SESSIONS.md`

Regles de base :

- 1 session = 1 objectif unique ;
- perimetre autorise et perimetre interdit explicites ;
- preuves obligatoires ;
- cloture explicite ;
- pas de validation implicite ;
- pas de modification hors perimetre.

## 3. Modele de session SESSION-YYYYMMDD-XX

Le dossier `docs/2-SESSIONS/SESSION-YYYYMMDD-XX` est le modele operationnel utilise par le script de creation de session.

Structure officielle future :

```text
SESSION-XXXX/
|-- 1-SESSION.md
|-- 2-PREUVES.md
|-- 3-FIN_DE_SESSION.md
`-- PATCH/
```

Role des fichiers :

- `1-SESSION.md` : cadrage de la session avant execution ;
- `2-PREUVES.md` : preuves de lecture, d'usage, de creation, de modification et de controle ;
- `3-FIN_DE_SESSION.md` : synthese finale, ecarts, reste a faire et verdict ;
- `PATCH/` : patch officiel ou justification d'absence de patch selon le type de session.

## 4. Creation de session

Toute session doit etre creee via `create_session.ps1`.

La structure suivante doit etre presente des l'ouverture :

- `1-SESSION.md`
- `2-PREUVES.md`
- `3-FIN_DE_SESSION.md`
- `PATCH/`

Si le script echoue, afficher l'erreur exacte et s'arreter sans creation manuelle alternative.

Le script conserve :

- `NO_PATCH.md` pour les sessions sans patch attendu ;
- `README_PATCH.md` pour les sessions avec correction ou completion attendue.

## 5. Ouverture d'une session Codex

A l'ouverture :

1. definir le type de session ;
2. definir l'objectif unique ;
3. fixer le perimetre exact ;
4. lister les fichiers autorises ;
5. lister les fichiers interdits ;
6. annoncer les controles a executer ;
7. executer la session sans elargir le perimetre.

## 6. Documents a lire au debut d'une session

Documents MASTER actifs a lire par defaut :

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/2-SESSIONS/README_SESSIONS.md`

Documents a lire selon le bloc :

- uniquement les fichiers explicitement utiles a l'objectif de session ;
- uniquement les documents valides comme actifs par le MASTER ;
- tout fichier supplementaire demande explicitement dans `1-SESSION.md`.

Documents a ne pas lire sauf demande explicite :

- anciennes sessions historiques ;
- references historiques non actives listees en section 14 ;
- tout dossier non lie a l'objectif de la session.

## 7. Regles de lecture documentaire limitee

- lire d'abord les documents obligatoires ;
- ouvrir uniquement les fichiers utiles a l'objectif ;
- ne pas lire tout le repo par defaut ;
- ne pas utiliser les historiques comme source active sans validation master ;
- en cas de doute : `INFORMATION NON FOURNIE - A CONFIRMER`.

## 8. Regles de travail pendant une session

- garder un objectif unique ;
- eviter le melange code, refonte documentaire et tri documentaire ;
- appliquer un perimetre strict ;
- modifier seulement les fichiers autorises ;
- signaler immediatement tout blocage.

## 9. Regles de patch

- patch minimal, cible, tracable ;
- aucun patch hors perimetre ;
- aucun fichier `.diff` cree par defaut ;
- patch ou diff seulement si demande explicitement dans la session ;
- ne jamais rejouer un ancien patch historique sans controle explicite.

## 10. Contenu des preuves

En fin de session, `2-PREUVES.md` doit prouver :

- fichiers lus ;
- fichiers utilises comme reference ;
- fichiers crees, modifies, supprimes, deplaces ou renommes ;
- dossiers explicitement non modifies ;
- commandes executees ;
- resultats des commandes ;
- controles Git ;
- controles techniques ;
- controles d'encodage ;
- controles de perimetre ;
- limites et commandes non executees.

Regles obligatoires :

- une commande non montree = non prouvee ;
- un fichier non liste = non prouve ;
- une information absente = `INFORMATION NON FOURNIE - A CONFIRMER`.

## 11. Documentation de fin de session

La documentation de session doit etre mise a jour dans la structure session concernee :

- `1-SESSION.md`
- `2-PREUVES.md`
- `3-FIN_DE_SESSION.md`
- `PATCH/`

Regle :

- documenter uniquement ce qui a ete reellement fait et verifie ;
- ne pas presenter une action non prouvee comme realisee ;
- ne pas auto-valider la session.

Verdicts possibles dans `3-FIN_DE_SESSION.md` :

- `VALIDABLE`
- `VALIDABLE SOUS RESERVE`
- `NON VALIDABLE`
- `INFORMATION NON FOURNIE - A CONFIRMER`

## 12. Cloture de session

Une session est cloturable si :

- objectif unique traite ;
- perimetre respecte ;
- controles executes ;
- preuves fournies ;
- verdict final explicite.

Format de cloture attendu :

- resume court ;
- fichiers impactes ;
- controles executes ;
- resultats obtenus ;
- points de vigilance ;
- verdict final.

## 13. Interdictions strictes

- ne pas transformer `docs/2-SESSIONS` en plan de developpement parallele ;
- ne pas relire tout l'historique par defaut ;
- ne pas melanger plusieurs objectifs majeurs dans une session ;
- ne pas faire de refonte documentaire massive pendant une session de code ;
- ne pas modifier `docs/1-MASTER` hors besoin valide ;
- ne pas modifier `docs/3-TEMPLATES` hors besoin valide ;
- ne pas modifier le code applicatif dans une session documentaire ;
- ne pas supprimer ou deplacer des elements historiques sans validation explicite ;
- ne pas valider implicitement une session.

## 14. References historiques non actives

Les references suivantes peuvent exister dans l'historique du projet, mais elles ne sont pas des sources actives de gouvernance des sessions :

- anciens README ou documents concurrents de `docs/2-SESSIONS` ;
- anciens documents MASTER remplaces par les documents actifs numerotes ;
- anciens fichiers de session du modele a 5 fichiers.

Ces references ne doivent pas etre restaurees ni presentees comme actives sans decision explicite.

## 15. Statut du document

Ce document est le document actif de gouvernance des sessions Codex.

Regles :

- ce document doit rester court, clair et operationnel ;
- il ne doit pas redevenir un plan de developpement parallele ;
- il doit etre modifie uniquement si le fonctionnement reel des sessions change ;
- toute modification importante doit etre validee humainement.
