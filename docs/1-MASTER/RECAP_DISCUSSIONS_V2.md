# Ambulance Manager - RECAP_DISCUSSIONS_V2

Version : V2.0.0  
Date : 22/05/2026

## Sommaire

- [1. Rôle du document](#1-rôle-du-document)
- [2. Contexte de reprise](#2-contexte-de-reprise)
- [3. Problèmes identifiés avant la V2](#3-problèmes-identifiés-avant-la-v2)
- [4. Décision de reprise méthodologique](#4-décision-de-reprise-méthodologique)
- [5. Travail réalisé sur les fiches fonctionnalités](#5-travail-réalisé-sur-les-fiches-fonctionnalités)
- [6. Décision de finaliser la documentation avant les maquettes](#6-décision-de-finaliser-la-documentation-avant-les-maquettes)
- [7. Réorganisation documentaire validée](#7-réorganisation-documentaire-validée)
- [8. Documents V2 créés](#8-documents-v2-créés)
- [9. Statut des anciennes maquettes et références UI/UX](#9-statut-des-anciennes-maquettes-et-références-uiux)
- [10. Statut des anciennes sessions](#10-statut-des-anciennes-sessions)
- [11. Méthode de travail validée pour la suite](#11-méthode-de-travail-validée-pour-la-suite)
- [12. Prochaines étapes](#12-prochaines-étapes)

## 1. Rôle du document

Ce document est un récapitulatif synthétique des échanges et décisions récentes qui ont conduit à la reprise méthodologique actuelle du projet Ambulance Manager.

Il ne remplace pas :

- `docs/1-MASTER/DOCUMENT_MAITRE_V2.md` ;
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL_V2.md` ;
- `docs/1-MASTER/REGISTRE_DECISIONS_V2.md` ;
- les fiches fonctionnalités détaillées de `docs/1-MASTER/3-FONCTIONNALITES/`.

Il sert à comprendre la logique de reprise du projet, sans reconstituer un journal complet des conversations.

## 2. Contexte de reprise

Le projet avait accumulé un ensemble hétérogène d'éléments :

- anciens documents ;
- anciennes maquettes ;
- sessions historiques ;
- références UI/UX anciennes ;
- cadrages partiels ;
- incohérences entre documentation, maquettes et code.

Le projet n'est pas abandonné, mais il devait être repris proprement pour sécuriser la suite.

## 3. Problèmes identifiés avant la V2

Les problèmes principaux identifiés avant la structuration V2 étaient :

- documents maîtres non alignés avec les arbitrages récents ;
- ancienne logique A24 / A25 / A26 trop présente dans les repères actifs ;
- chemins de maquettes partiellement obsolètes ;
- risque de coder sur une base documentaire instable ;
- risque de produire des maquettes sur des fonctionnalités encore incomplètement réalignées ;
- présence de mojibake dans certains historiques ;
- besoin de séparer clairement actif / historique / transitoire.

## 4. Décision de reprise méthodologique

La décision structurante validée est la suivante :

- le projet ne repart pas de zéro techniquement ;
- le projet repart de zéro méthodologiquement.

Le code existant est conservé, mais il devra être audité plus tard au regard de la base documentaire V2 et des futures maquettes validées.

L'ordre de priorité actuel est :

1. documentation ;
2. maquettes ;
3. reprise du codage.

## 5. Travail réalisé sur les fiches fonctionnalités

Le travail récent a permis de cadrer ou consolider plusieurs pages et modules, notamment :

- Shell global / navigation ;
- Login ;
- Tableau de bord ;
- Utilisateurs ;
- Véhicules ;
- Suivi des véhicules ;
- Modèles horaires ;
- Société ;
- Dépôts / Bases ;
- Planning ;
- Audit ;
- Mise en route ;
- Heures / Horaires à cadrer plus tard.

Les fiches détaillées de `docs/1-MASTER/3-FONCTIONNALITES/` servent désormais de source récente pour réaligner les documents maîtres V2.

## 6. Décision de finaliser la documentation avant les maquettes

La phase maquettes a été mise en pause de manière volontaire.

Raisons validées :

- éviter de produire des maquettes sur une base mouvante ;
- aligner d'abord les documents maîtres ;
- vérifier les fiches fonctionnalités ;
- refaire ensuite les maquettes proprement.

## 7. Réorganisation documentaire validée

Les éléments suivants ont été validés :

- archivage des anciens fichiers structurels dans `docs/4-ARCHIVES/1-MASTER_HISTORIQUE/` ;
- création de `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md` ;
- création de `docs/1-MASTER/1-MAQUETTE/README_MAQUETTES.md` ;
- création de `docs/2-SESSIONS/README_SESSIONS.md` ;
- clarification de la gouvernance de `docs/2-SESSIONS/` ;
- conservation des archives et des preuves.

## 8. Documents V2 créés

Les documents V2 créés sont :

- `docs/1-MASTER/DOCUMENT_MAITRE_V2.md` ;
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL_V2.md` ;
- `docs/1-MASTER/ETAT_GLOBAL_PROJET_V2.md` ;
- `docs/1-MASTER/REGISTRE_DECISIONS_V2.md` ;
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md`.

Ces documents forment la nouvelle base documentaire active.

## 9. Statut des anciennes maquettes et références UI/UX

Les dossiers suivants sont conservés comme références transitoires / historiques :

- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/` ;
- `docs/1-MASTER/2-REFERENCE_UI_UX/`.

Ils servent de mémoire visuelle et de base de comparaison.

Ils seront refaits ou remplacés après validation des nouvelles maquettes.

Ils ne doivent pas primer sur les fiches fonctionnalités validées.

## 10. Statut des anciennes sessions

Le statut validé est le suivant :

- `docs/2-SESSIONS/` conserve l'historique et les preuves ;
- aucun déplacement massif n'est validé pour le moment ;
- `docs/2-SESSIONS/README_SESSIONS.md` fixe la gouvernance actuelle ;
- le mojibake historique n'est pas corrigé automatiquement.

## 11. Méthode de travail validée pour la suite

Les règles validées sont :

- validation humaine avant Codex ;
- sessions courtes et ciblées ;
- un objectif clair par session ;
- pas de réécriture massive ;
- pas de modification code pendant la documentation ;
- prompts en texte brut directement copiables/collables ;
- vérification mojibake / UTF-8 sans BOM ;
- validation après retour Codex.

## 12. Prochaines étapes

Les prochaines étapes prévues sont :

- validation humaine de `docs/1-MASTER/RECAP_DISCUSSIONS_V2.md` ;
- contrôle final des documents V2 ;
- point sur les fiches fonctionnalités présentes / manquantes ;
- préparation de la phase maquettes ;
- création future des références UI/UX propres après maquettes ;
- reprise du codage après base documentaire et maquettes validées.
