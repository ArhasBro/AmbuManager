# Ambulance Manager - Méthode de travail

Date de refonte : 07/06/2026

## Sommaire

1. [Rôle du document](#1-rôle-du-document)
2. [Principes généraux de travail](#2-principes-généraux-de-travail)
3. [Rôle de ChatGPT](#3-rôle-de-chatgpt)
4. [Rôle de Codex](#4-rôle-de-codex)
5. [Rôle de l'utilisateur](#5-rôle-de-lutilisateur)
6. [Règle centrale une session un objectif](#6-règle-centrale-une-session-un-objectif)
7. [Types de sessions](#7-types-de-sessions)
8. [Structure attendue d'une session](#8-structure-attendue-dune-session)
9. [Règles de périmètre](#9-règles-de-périmètre)
10. [Règles anti-refonte](#10-règles-anti-refonte)
11. [Règles de preuve](#11-règles-de-preuve)
12. [Règles de contrôle ChatGPT](#12-règles-de-contrôle-chatgpt)
13. [Règles de modification du code](#13-règles-de-modification-du-code)
14. [Règles de modification documentaire](#14-règles-de-modification-documentaire)
15. [Règles Git, patchs et commits](#15-règles-git-patchs-et-commits)
16. [Règles d'encodage et qualité fichiers](#16-règles-dencodage-et-qualité-fichiers)
17. [Règle des fichiers fournis dans le prompt courant](#17-règle-des-fichiers-fournis-dans-le-prompt-courant)
18. [Règle de continuité documentaire](#18-règle-de-continuité-documentaire)
19. [Règles de renommage documentaire](#19-règles-de-renommage-documentaire)
20. [Règles de clôture de session](#20-règles-de-clôture-de-session)
21. [Règles de clôture de bloc](#21-règles-de-clôture-de-bloc)
22. [Interdictions strictes](#22-interdictions-strictes)
23. [Formules de verdict obligatoires](#23-formules-de-verdict-obligatoires)
24. [Références documentaires liées](#24-références-documentaires-liées)

## 1. Rôle du document

Ce document définit la méthode de travail sur Ambulance Manager : utilisation de Codex, contrôle ChatGPT, sessions, preuves, validation, Git, encodage et règles anti-refonte.

Il consolide les règles générales indispensables. Les dossiers `docs/2-SESSIONS/` et `docs/3-TEMPLATES/` portent les sessions et templates actifs quand une session validée les utilise.

## 2. Principes généraux de travail

- Travailler par périmètre limité.
- Ne pas valider implicitement.
- Prouver chaque affirmation importante.
- Préférer les corrections ciblées.
- Ne pas mélanger documentation, code et refonte globale sans nécessité explicite.
- Conserver les incertitudes visibles.

## 3. Rôle de ChatGPT

ChatGPT sert au cadrage, au contrôle, à la relecture, à la vérification des preuves, à la préparation des prompts et au verdict.

ChatGPT ne valide pas implicitement un changement sans preuve.

## 4. Rôle de Codex

Codex exécute les tâches cadrées : lecture, audit, correction, complétion, documentation, contrôles, Git si demandé.

Codex doit respecter le périmètre, produire des preuves et signaler toute information non confirmée.

## 5. Rôle de l'utilisateur

L'utilisateur valide les arbitrages métier, les décisions structurantes, les changements de périmètre et les verdicts finaux.

Aucune validation humaine n'est remplacée par la présence d'un fichier, d'un patch ou d'un résultat technique.

## 6. Règle centrale une session un objectif

Une session opérationnelle future doit avoir un objectif unique, contrôlable et clôturable.

Une session ne doit pas devenir un fourre-tout.

## 7. Types de sessions

Deux familles officielles sont utilisées dans les noms de dossiers :

- `DX` : session documentaire utile au code. Les seules sessions DX autorisées sont audit + cadrage sous validation, ou clôture.
- `CX` : session code, applicative ou technique.

`DX` ou `CX` doit être visible dans le nom du dossier de session.

`DX_DOCUMENTATION` et `DX_CORRECTION_DOCUMENTAIRE` sont refusées comme sessions documentaires normales.

Les sessions documentaires abstraites, inutiles ou sans lien direct avec le code sont interdites.

Une session DX ne produit pas de patch applicatif `.diff`.

Une session CX qui modifie du code, des scripts, la structure technique, Prisma, Tailwind, API, UI, composants ou fichiers applicatifs doit produire un patch `.diff` dans le dossier `PATCH/` de la session.

## 8. Structure attendue d'une session

Une session doit contenir :

- objectif ;
- périmètre autorisé ;
- périmètre interdit ;
- fichiers à lire ;
- fichiers modifiables ;
- contrôles attendus ;
- preuves à fournir ;
- verdict attendu.

## 9. Règles de périmètre

- Lire les fichiers nécessaires, pas tout le repo sans justification.
- Modifier uniquement les fichiers autorisés.
- Signaler tout besoin hors périmètre avant modification.
- Ne pas réécrire les supports si un lien ou une note ciblée suffit.

## 10. Règles anti-refonte

- Éviter les grosses réécritures globales.
- Privilégier les corrections ciblées ligne par ligne.
- Ne pas changer une architecture stable sans décision.
- Ne pas renommer massivement sans nécessité.
- Ne pas transformer un audit en refonte.

## 11. Règles de preuve

Règles obligatoires :

- Une commande non montrée = non prouvée.
- Un fichier non listé = non prouvé.
- Un test non exécuté = non validé.
- Une affirmation sans extrait ou chemin exact = non prouvée.
- Une information absente = `INFORMATION NON FOURNIE — À CONFIRMER`.

## 12. Règles de contrôle ChatGPT

Le contrôle doit vérifier :

- périmètre respecté ;
- fichiers lus ;
- fichiers modifiés ;
- preuves terminales ;
- absence de modification interdite ;
- cohérence documentaire ;
- résultat des tests ou contrôles ;
- incertitudes restantes.

## 13. Règles de modification du code

- Un patch code doit être minimal et justifié.
- Aucun code Base44 ne doit être copié directement.
- Toute modification API/RBAC doit être contrôlée côté serveur.
- Toute action sensible doit être auditée si le périmètre le demande.
- `npm run lint` et `npm run build` sont attendus pour les changements code, sauf impossibilité documentée.

## 14. Règles de modification documentaire

- Ne modifier que les documents concernés.
- Ne pas créer de doublon actif.
- Ne pas utiliser de suffixe `_V2`, `_V3`, `_FINAL` pour les documents actifs.
- Conserver l'historique par Git.
- Ne pas présenter comme validé ce qui n'est pas explicitement validé.
- Marquer les incertitudes.

## 15. Règles Git, patchs et commits

- Vérifier `git status --short` avant et après intervention.
- Ne pas revert les changements utilisateur non demandés.
- Ne pas mélanger code et documentation sans nécessité.
- Un commit doit être cohérent, traçable et explicitement demandé ou validé.
- Pas de patch généré inutilement.
- 1 session = 1 dossier unique.
- Un fix ne crée jamais une nouvelle session.
- Un correctif lié à une session existante doit être intégré au dossier de session original.
- Les patchs correctifs éventuels doivent aller dans `PATCH/` du dossier original.
- Les preuves corrigées doivent rester dans les fichiers de preuve du dossier original.
- Il est interdit de créer un dossier de session séparé de type `FIX-01`.
- L'ancienne session `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01` est une exception historique conservée, à ne pas utiliser comme modèle.

## 16. Règles d'encodage et qualité fichiers

- Tous les fichiers Markdown doivent être lus et écrits en UTF-8 sans BOM.
- Ne jamais utiliser d'encodage implicite.
- Ne pas réencoder les fichiers hors périmètre.
- Contrôler les séquences suspectes : `Ã`, `Â`, `â€`, `�`.
- Lister fichier et ligne exacte si une séquence suspecte reste.
- Préserver les accents français.

## 17. Règle des fichiers fournis dans le prompt courant

Quand l'utilisateur transmet des fichiers ou ZIP dans un prompt, seuls les fichiers transmis dans ce prompt font référence pour le contrôle courant, sauf demande explicite d'utiliser d'anciens fichiers.

Les fichiers d'anciens prompts ne doivent pas être réutilisés comme source active sans accord explicite.

## 18. Règle de continuité documentaire

La documentation doit rester cohérente entre les documents actifs, les supports et l'état réel du repo.

Une mise à jour documentaire ne vaut pas validation produit ou code.

## 19. Règles de renommage documentaire

Un renommage documentaire est autorisé seulement s'il améliore clairement la cohérence.

Conditions :

- contenu utile absorbé ou conservé ;
- liens mis à jour ;
- ancien nom retiré du périmètre actif ;
- justification dans le retour de session ;
- aucun renommage code/config sans demande explicite.

## 20. Règles de clôture de session

Une session ne peut être clôturée que si :

- le périmètre est respecté ;
- les fichiers lus/modifiés sont listés ;
- les contrôles ont été exécutés ou leur impossibilité est indiquée ;
- les incertitudes sont listées ;
- un verdict explicite est fourni.

## 21. Règles de clôture de bloc

Un bloc ne se clôture pas parce que les fichiers existent.

Il faut :

- sessions prévues terminées ou reportées explicitement ;
- preuves suffisantes ;
- risques restants listés ;
- validation humaine explicite.

## 22. Interdictions strictes

- Validation implicite.
- Copie directe de code Base44.
- Refonte massive non demandée.
- Modification hors périmètre.
- Suppression de dossiers supports sans décision.
- Réencodage hors périmètre.
- Commit sans cohérence ni contrôle.
- Suppression physique métier par défaut si l'archivage logique suffit.

## 23. Formules de verdict obligatoires

Les verdicts doivent être explicites. Exemples :

- `VALIDABLE`
- `VALIDABLE SOUS RÉSERVE`
- `NON VALIDABLE`
- `INFORMATION NON FOURNIE — À CONFIRMER`

Pour la refonte documentaire `docs/1-MASTER`, les verdicts autorisés sont :

- `REFONTE DOCS/1-MASTER VALIDABLE`
- `REFONTE DOCS/1-MASTER VALIDABLE SOUS RÉSERVE`
- `REFONTE DOCS/1-MASTER NON VALIDABLE`

## 24. Références documentaires liées

Documents actifs :

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`

Supports conservés :

- `docs/2-SESSIONS/`
- `docs/3-TEMPLATES/`
