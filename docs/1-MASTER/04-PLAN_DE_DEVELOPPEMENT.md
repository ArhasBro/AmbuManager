# Ambulance Manager - Plan maître court de développement

Date de refonte ciblée : 16/06/2026

## 1. Rôle du document

Ce document est le plan maître court de reprise opérationnelle d'Ambulance Manager.

Il fixe l'ordre de reprise, les blocs, les principes directeurs et les dépendances entre blocs.

Il ne contient pas tout le détail des sessions. Le détail opérationnel officiel des blocs, sessions prévues, types DX/CX, productions attendues, contrôles, critères de sortie et statuts est porté par `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`.

Il ne remplace pas :

- `01-APPLICATION_WEB.md` pour le périmètre produit ;
- `02-DOCUMENT_MAITRE_PROJET.md` pour l'état du projet et l'historique ;
- `03-METHODE_DE_TRAVAIL.md` pour les règles de session, preuves, patchs et contrôles ;
- `05-BLOCS_SESSIONS_PRODUCTION.md` pour la préparation opérationnelle des sessions.

## 2. Documents MASTER actifs

`docs/1-MASTER` contient 5 documents MASTER actifs :

- `01-APPLICATION_WEB.md` : application web, périmètre produit et modules.
- `02-DOCUMENT_MAITRE_PROJET.md` : état du projet, historique utile et décisions structurantes.
- `03-METHODE_DE_TRAVAIL.md` : méthode de travail, preuves, contrôles, sessions, patchs.
- `04-PLAN_DE_DEVELOPPEMENT.md` : plan maître court, ordre, blocs, principes, dépendances.
- `05-BLOCS_SESSIONS_PRODUCTION.md` : détail opérationnel officiel des blocs et sessions.

## 3. Principes non négociables

- Le repo officiel reste la référence technique finale.
- Base44 est une référence prototype métier, visuelle et ergonomique, pas une source technique à copier-coller.
- Aucune reprise code ne commence sans session CX dédiée, périmètre clair et preuves.
- Une session = un objectif unique, contrôlable et clôturable.
- 1 session = 1 dossier unique.
- Un fix ne crée jamais une nouvelle session ; il est intégré au dossier de session original.
- Le nombre de sessions dépend de la complexité réelle du bloc.
- Aucun plafond fixe artificiel n'est imposé par bloc.
- Les sessions sont courtes, fermées, contrôlables et validables.
- Les routes techniques restent stables en anglais côté code tant qu'un renommage n'est pas confirmé.
- Les libellés UI visibles doivent rester en français.
- Les actions sensibles doivent être tracées.
- Le multi-tenant par société reste non négociable.
- Les incertitudes restent visibles sous la forme `INFORMATION NON FOURNIE — À CONFIRMER`.

## 4. Statut de T0 et de BLOC_A1

T0 / Gouvernance P1 est historique de cadrage. Il ne doit plus être prolongé comme futur bloc actif de production.

Le dossier existant `docs/2-SESSIONS/1-ALPHA/BLOC_A1` est conservé tel quel comme historique pour le moment. Il ne doit pas être renommé, déplacé, supprimé ou réorganisé dans une session de reprise.

L'ancienne session `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01` est une anomalie historique conservée. Elle ne doit pas servir de modèle futur.

## 5. Doctrine de reprise depuis Base44

Base44 peut servir à comprendre :

- les parcours ;
- les libellés métier ;
- les écrans ;
- les composants et patterns utiles ;
- les entités prototype ;
- les écarts entre prototype et repo officiel.

Base44 ne doit pas servir à :

- copier du code ;
- définir l'architecture finale ;
- valider la sécurité backend ;
- valider Prisma ;
- valider le RBAC serveur ;
- valider la conformité RGPD complète.

Toute idée Base44 reprise doit être adaptée au repo officiel, à Prisma, au RBAC serveur/API, au multi-tenant et aux règles de preuve du projet.

## 6. Règles de découpage des blocs

Un bloc regroupe un problème cohérent.

Règle cible :

- 1 bloc = composant transverse ou page/module fonctionnel ;
- 1 bloc = 1 dossier clair dans `docs/2-SESSIONS/1-ALPHA` ;
- pas de limite fixe de sessions par bloc ;
- sessions courtes, fermées, contrôlables et validables.

Les identifiants de blocs peuvent être transverses, pages/modules, RGPD ou finalisation : `T1`, `T2`, `P-LOGIN`, `P-DASHBOARD`, `RGPD-PRIVACY`, `F1`, etc.

## 7. Règles de découpage des sessions

Chaque session doit avoir :

- un objectif unique ;
- un type `DX` ou `CX` visible dans le nom du dossier ;
- un périmètre autorisé ;
- un hors périmètre ;
- des fichiers à lire ;
- des fichiers modifiables ;
- des contrôles attendus ;
- des preuves terminales ;
- un verdict explicite.

Les sessions DX autorisées sont limitées à audit + cadrage sous validation, ou clôture.

Une session DX ne produit pas de patch applicatif `.diff`.

Une session CX qui modifie du code, des scripts, la structure technique, Prisma, Tailwind, API, UI, composants ou fichiers applicatifs doit produire un patch `.diff` dans `PATCH/`.

## 8. Ordre global de reprise opérationnelle

T0 est historique et n'est plus listé comme bloc actif futur.

Ordre principal :

1. T2 - Nomenclature, routes et renommages futurs.
2. T1 - Shell global, navigation et contexte connecté.
3. T3 - Design system officiel et composants communs.
4. T4 - RBAC UI/API et matrice permissions, en mode progressif.
5. T5 - Données, multi-tenant et mapping Base44 vers officiel.
6. T6 - Audit et traçabilité transverse.
7. T7 - Qualité, tests et contrôles de reprise.
8. P-LOGIN - Connexion, incluant `Se souvenir de moi`.
9. P-SOCIETE - Société, incluant contacts société multiples.
10. P-DEPOTS-BASES - Dépôts / Bases.
11. P-UTILISATEURS-RH - Utilisateurs / RH.
12. P-VEHICULES - Véhicules.
13. P-SUIVI-VEHICULES - Suivi des véhicules.
14. P-MODELES-HORAIRES - Modèles horaires.
15. P-PLANNING - Planning.
16. P-AUDIT - Audit / Traçabilité.
17. P-DASHBOARD - Tableau de bord comme portail fiable.
18. P-MISE-EN-ROUTE - Mise en route.
19. RGPD-PRIVACY - Privacy visible en Alpha.
20. F1 - Validation fonctionnelle croisée.
21. F2 - Validation qualité technique.
22. F3 - Validation UX visuelle.
23. F4 - Clôture documentaire Alpha ou clôture de phase.

## 9. Dépendances majeures

- T1 précède les reprises pages/modules qui dépendent de la navigation connectée.
- T4 et T5 conditionnent les modules manipulant des données société ou des actions sensibles.
- T6 conditionne les modules nécessitant une traçabilité explicite.
- P-DEPOTS-BASES, P-UTILISATEURS-RH, P-VEHICULES et P-MODELES-HORAIRES précèdent P-PLANNING.
- P-DASHBOARD intervient après stabilisation des données sources utiles.
- P-MISE-EN-ROUTE intervient après cadrage des référentiels qu'elle expose.
- RGPD-PRIVACY peut être repris dès que le login et les limites Alpha sont cadrés.
- F1, F2, F3 et F4 interviennent après les blocs de reprise nécessaires ou après reports explicitement acceptés.

## 10. Maintenance du plan

Le présent plan est mis à jour uniquement quand :

- un ordre de reprise change ;
- un bloc est ajouté, retiré, fusionné ou clôturé ;
- une décision humaine modifie le périmètre ;
- une dépendance change ;
- une incertitude est tranchée ;
- la phase actuelle change.

Il doit rester court, exploitable et orienté reprise.

Il ne doit pas devenir un journal de session, un audit détaillé, une fiche fonctionnalité ou une copie de `05-BLOCS_SESSIONS_PRODUCTION.md`.

## 11. Points restant à confirmer

- Statut technique futur de `Suivi des véhicules` : route autonome, sous-module de `Véhicules`, ou intégration hybride précise.
- Renommage technique futur `templates` vers `modeles-horaires`.
- Renommage technique futur `onboarding` vers `mise-en-route`.
- Niveau de granularité initial du RBAC progressif.
- Politique RGPD complète.
- Moment exact de reprise des préférences Dashboard après stabilisation du portail et des données sources.
- Sessions Prisma futures si le mapping données révèle des écarts.
