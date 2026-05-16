REBASAGE GLOBAL ALPHA — SÉQUENCE PRÉVISIONNELLE

Objectif général :
Repartir sur une base propre, claire, cohérente et durable avant de poursuivre le développement.
Le but n’est pas d’aller vite, mais d’éviter d’empiler de nouveaux blocs sur une structure incertaine.

Règles générales :
- pas de suppression sans validation claire ;
- pas de fusion documentaire sans preuve que les documents se complètent réellement ;
- pas de refonte massive sans session dédiée ;
- pas de modification code pendant une session documentaire ;
- pas de nouveau plan parallèle ;
- PLAN_DE_DEVELOPPEMENT.md reste le seul plan officiel ;
- DOCUMENT_CADRAGE_FONCTIONNEL.md reste la base produit officielle ;
- chaque session doit rester courte, ciblée et contrôlable.

============================================================
REBASAGE-01 — Audit global repo / docs
============================================================
Statut : VALIDÉ

Objectif :
Faire un premier état des lieux global du dépôt et de la documentation.

============================================================
REBASAGE-01-BIS — Complément audit ciblé
============================================================
Statut : VALIDÉ

Objectif :
Compléter l’audit initial sur les zones insuffisamment couvertes.

============================================================
REBASAGE-02 — Clarification docs racine + gouvernance
============================================================
Statut : VALIDÉ

Objectif :
Clarifier les documents présents à la racine de `docs/` et poser une première gouvernance documentaire.

============================================================
REBASAGE-03 — Classification documentaire détaillée
============================================================
Statut : VALIDÉ

Objectif :
Classer les documents existants et identifier leur rôle réel.

============================================================
REBASAGE-04 — Audit des templates de session `docs/3-TEMPLATES`
============================================================
Statut : VALIDÉ

Objectif :
Auditer les anciens templates de session avant réutilisation.

Conclusion :
Les templates étaient utiles mais anciens, donc à moderniser.

============================================================
REBASAGE-05 — Mise à jour / consolidation des templates de session
============================================================
Statut : VALIDÉ

Objectif :
Moderniser `docs/3-TEMPLATES`.

Résultat validé :
- `README_TEMPLATES.md`
- `TEMPLATE_SESSION.md`
- `TEMPLATE_DOD_SESSION.md`
- `TEMPLATE_RECAP_SESSION.md`

Anciens fichiers supprimés/remplacés :
- `TEMPLATE_DEBUT_SESSION.md`
- `TEMPLATE_FIN_SESSION.md`
- `TEMPLATE_DOD_4_4.md`

============================================================
REBASAGE-06 — Matrice canonique Page -> PNG -> référence UI/UX -> route -> fichier app
============================================================
Statut : VALIDÉ / TRAITÉ DANS LA SÉQUENCE DE REBASAGE

Objectif :
Préparer la logique de correspondance entre pages, maquettes, références UI/UX, routes et fichiers applicatifs.

Note :
À reprendre plus largement dans les futures matrices page / fonctionnalités / code / documentation / maquette.

============================================================
REBASAGE-07 — Audit encodage ciblé
============================================================
Statut : VALIDÉ

Objectif :
Auditer les problèmes d’encodage sans correction massive.

Conclusion :
Correction ciblée nécessaire sur certains fichiers.

============================================================
REBASAGE-08 — Correction encodage ciblée
============================================================
Statut : VALIDÉ

Objectif :
Corriger uniquement les fichiers ciblés avec BOM ou encodage problématique.

Règle :
Pas de correction massive de tout l’historique.

============================================================
REBASAGE-09 — Décision gouvernance STRUCTURE_DOCS.md / STRUCTURE_PROJET.md
============================================================
Statut : VALIDÉ

Objectif :
Clarifier le rôle de :
- `docs/STRUCTURE_DOCS.md`
- `docs/1-MASTER/STRUCTURE_PROJET.md`

Sans suppression automatique.

============================================================
REBASAGE-10 — Index consolidé `docs/1-MASTER`
============================================================
Statut : VALIDÉ après correction encodage

Objectif :
Créer / améliorer un index de lecture clair du corpus master.

Fichier concerné :
- `docs/1-MASTER/_INDEX_MASTER.md`

============================================================
REBASAGE-11 — Index des sessions historiques par bloc
============================================================
Statut : VALIDÉ

Objectif :
Créer un index clair des sessions historiques `docs/2-SESSIONS`, bloc par bloc.

Sans modifier les anciennes sessions.

============================================================
REBASAGE-12 — Gouvernance de consultation / archivage futur des sessions
============================================================
Statut : VALIDÉ

Objectif :
Cadrer comment consulter, utiliser ou préparer l’archivage futur de `docs/2-SESSIONS`.

Fichier créé :
- `docs/2-SESSIONS/GOUVERNANCE_SESSIONS.md`

============================================================
REBASAGE-13 — Simulation d’archivage / matrice opérationnelle de consultation
============================================================
Statut : VALIDÉ

Objectif :
Préparer les futurs lots d’archivage/nettoyage sans déplacement, suppression ou renommage réel.

============================================================
REBASAGE-14 — Checklist d’exécution par lot A→F
============================================================
Statut : VALIDÉ

Objectif :
Créer une checklist d’exécution future par lots, avec critères GO / NO-GO et preuves nécessaires.

Fichier créé :
- `docs/2-SESSIONS/CHECKLIST_EXECUTION_LOTS_SESSIONS.md`

============================================================
REBASAGE-15 — Dossier de décision Nathan par lot A→F
============================================================
Statut : VALIDÉ

Objectif :
Préparer les décisions Nathan par lot avant toute action physique future.

Fichier créé :
- `docs/2-SESSIONS/DOSSIER_DECISION_LOTS_SESSIONS.md`

============================================================
REBASAGE-16 — Formulaire de validation Nathan par lot A→F
============================================================
Statut : VALIDÉ

Objectif :
Créer un formulaire prêt à remplir pour valider ou refuser les futurs lots.

Fichier créé :
- `docs/2-SESSIONS/FORMULAIRE_VALIDATION_LOTS_SESSIONS.md`

============================================================
REBASAGE-17 — Audit fonctionnel global du produit
============================================================
Statut : VALIDÉ

Objectif :
Faire une première cartographie fonctionnelle globale du produit existant.

Conclusion :
Plusieurs modules sont présents, mais doivent être audités plus finement avant reprise.

A26 :
- non poursuivi comme bloc actif ;
- devient historique / transitionnel.

============================================================
REBASAGE-18 — Cadrage audit page par page
============================================================
Statut : VALIDÉ définitivement après FIX-01

Objectif :
Cadrer la méthode d’audit page par page.

Fichier créé :
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-18_CADRAGE_AUDIT_PAGE_PAR_PAGE.md`

Correction :
- REBASAGE-18-FIX-01 : suppression BOM UTF-8.

============================================================
REBASAGE-19 — Création du document “fonctionnalités par page”
============================================================
Statut : VALIDÉ, avec réserve méthodologique non bloquante

Objectif :
Créer une synthèse opérationnelle courte pour préparer les audits page par page.

Fichier créé :
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-19_FONCTIONNALITES_PAR_PAGE.md`

Remarque importante :
Le document est utile comme squelette, mais il ne suffit pas encore à démarrer directement les audits page par page.
Il doit être consolidé par une cartographie réelle du repo, des routes, pages, APIs, docs et maquettes.

============================================================
REBASAGE-20 — Audit critique de cohérence méthodologique des documents de rebasage
============================================================
Statut : À FAIRE

Objectif :
Relire les documents produits pendant le rebasage non pas seulement pour vérifier leur forme, mais pour vérifier le sens de leur contenu.

Contrôler :
- logique ;
- utilité réelle ;
- cohérence avec l’objectif global ;
- absence de plan parallèle ;
- absence de doublons problématiques ;
- documents trop vagues ou trop vides ;
- documents temporaires vs documents durables ;
- risques de mauvaise direction méthodologique.

Documents prioritaires à relire :
- `docs/README.md`
- `docs/README_DOCS.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/1-MASTER/STRUCTURE_PROJET.md`
- `docs/1-MASTER/_INDEX_MASTER.md`
- `docs/2-SESSIONS/_INDEX_SESSIONS.md`
- `docs/2-SESSIONS/GOUVERNANCE_SESSIONS.md`
- `docs/2-SESSIONS/CHECKLIST_EXECUTION_LOTS_SESSIONS.md`
- `docs/2-SESSIONS/DOSSIER_DECISION_LOTS_SESSIONS.md`
- `docs/2-SESSIONS/FORMULAIRE_VALIDATION_LOTS_SESSIONS.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-18_CADRAGE_AUDIT_PAGE_PAR_PAGE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-19_FONCTIONNALITES_PAR_PAGE.md`
- `docs/3-TEMPLATES/*`

Livrable attendu :
Un audit critique listant :
- documents cohérents ;
- documents à clarifier ;
- documents à compléter ;
- documents à corriger plus tard ;
- documents à ne pas utiliser comme référence durable.

============================================================
REBASAGE-21 — Corrections documentaires ciblées si nécessaires
============================================================
Statut : À FAIRE SI REBASAGE-20 LE JUSTIFIE

Objectif :
Corriger uniquement les incohérences méthodologiques détectées en REBASAGE-20.

Règles :
- corrections ciblées uniquement ;
- pas de refonte massive ;
- pas de suppression sans validation ;
- pas de fusion sans justification ;
- pas de modification du plan officiel sans demande explicite.

============================================================
REBASAGE-22 — Cartographie globale repo / docs / pages / routes / APIs / maquettes
============================================================
Statut : À FAIRE

Objectif :
Créer une vision globale du projet réel.

Cartographier :
- pages existantes ;
- routes applicatives ;
- routes API ;
- fichiers principaux liés ;
- documents de référence associés ;
- maquettes associées ;
- fonctionnalités liées ;
- zones stables ;
- zones partielles ;
- zones manquantes ;
- zones à confirmer.

But :
Éviter les erreurs de chemin, les oublis, les doublons et les incohérences entre code, docs et maquettes.

============================================================
REBASAGE-23 — Matrice page / fonctionnalités / code / documentation / maquette
============================================================
Statut : À FAIRE

Objectif :
Créer une matrice fiable reliant chaque page à ses références.

Pour chaque page :
- nom de la page ;
- route applicative ;
- fichiers code associés ;
- fonctionnalités attendues ;
- fonctionnalités présentes ;
- documents liés ;
- maquettes PNG associées ;
- statut global ;
- écarts constatés ;
- actions recommandées.

============================================================
REBASAGE-24 — Classement des dettes et priorités
============================================================
Statut : À FAIRE

Objectif :
Classer les dettes détectées pendant la cartographie et les audits.

Statuts possibles :
- Bloquant
- Important
- Amélioration
- À confirmer
- Plus tard

Distinguer :
- à corriger maintenant ;
- à documenter ;
- à archiver ;
- à traiter dans une future session de code ;
- en attente de validation Nathan.

Règle :
Une dette détectée ne déclenche pas automatiquement une correction.

============================================================
REBASAGE-25 — Inventaire réel des pages/routes applicatives avant audit détaillé
============================================================
Statut : À FAIRE

Objectif :
Confirmer précisément les pages et routes réellement présentes dans le code avant de lancer les audits page par page.

But :
Ne pas auditer une liste théorique ou incomplète.

============================================================
REBASAGE-26 — Audit page Login
============================================================
Statut : À FAIRE

Objectif :
Auditer la page Login :
- rôle réel ;
- route ;
- fichier code ;
- logique présente ;
- APIs liées ;
- conformité au cadrage ;
- cohérence UI/UX ;
- dettes ;
- actions recommandées.

============================================================
REBASAGE-27 — Audit page Dashboard
============================================================
Statut : À FAIRE

Objectif :
Auditer le Dashboard selon la même méthode.

============================================================
REBASAGE-28 — Audit page Planning
============================================================
Statut : À FAIRE

Objectif :
Auditer la page Planning selon la même méthode.

============================================================
REBASAGE-29 — Audit page Utilisateurs / RH
============================================================
Statut : À FAIRE

Objectif :
Auditer la page Utilisateurs / RH selon la même méthode.

============================================================
REBASAGE-30 — Audit page Véhicules
============================================================
Statut : À FAIRE

Objectif :
Auditer la page Véhicules selon la même méthode.

============================================================
REBASAGE-31 — Audit page Templates
============================================================
Statut : À FAIRE

Objectif :
Auditer la page Templates selon la même méthode.

============================================================
REBASAGE-32 — Audit page Société
============================================================
Statut : À FAIRE

Objectif :
Auditer la page Société selon la même méthode.

============================================================
REBASAGE-33 — Audit page Dépôts / Bases
============================================================
Statut : À FAIRE

Objectif :
Auditer la page Dépôts / Bases selon la même méthode.

============================================================
REBASAGE-34 — Audit page Onboarding
============================================================
Statut : À FAIRE

Objectif :
Auditer la page Onboarding selon la même méthode.

============================================================
REBASAGE-35 — Audit page Audit / Journal d’audit
============================================================
Statut : À FAIRE

Objectif :
Auditer la page Audit / Journal d’audit selon la même méthode.

============================================================
REBASAGE-36 — Audit page Privacy / Mentions d’information
============================================================
Statut : À FAIRE

Objectif :
Auditer la page Privacy / Mentions d’information selon la même méthode.

============================================================
REBASAGE-37 — Audit pages techniques / secondaires
============================================================
Statut : À FAIRE

Objectif :
Auditer les pages techniques ou secondaires détectées pendant l’inventaire :
- pages d’erreur ;
- pages internes ;
- redirections ;
- routes spéciales ;
- pages non listées initialement.

============================================================
REBASAGE-38 — Synthèse globale des audits page par page
============================================================
Statut : À FAIRE

Objectif :
Regrouper les constats des audits page par page.

Produire :
- pages conformes ;
- pages incomplètes ;
- pages non conformes ;
- pages à confirmer ;
- fonctionnalités manquantes ;
- fonctionnalités à masquer / reporter / supprimer ;
- dettes principales ;
- priorités de reprise.

============================================================
REBASAGE-39 — Préparation de la future refonte du plan officiel
============================================================
Statut : À FAIRE PLUS TARD

Objectif :
Préparer les éléments nécessaires à une future reprise de `PLAN_DE_DEVELOPPEMENT.md`.

Important :
Ne pas créer de nouveau plan parallèle.
Ne pas modifier le plan officiel tant que la cartographie, les audits et les dettes ne sont pas suffisamment clairs.

============================================================
NOTE DE PILOTAGE
============================================================
La séquence peut évoluer si un audit révèle une incohérence importante.

Ordre actuel recommandé :
1. sécuriser la cohérence documentaire ;
2. cartographier le repo réel ;
3. relier pages / fonctionnalités / code / docs / maquettes ;
4. classer les dettes ;
5. auditer les pages une par une ;
6. seulement ensuite préparer la reprise du plan officiel.

Prochain ZIP attendu après la prochaine session :
AmbuManager-main (19).zip
