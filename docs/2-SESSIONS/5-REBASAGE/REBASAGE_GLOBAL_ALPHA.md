REBASAGE GLOBAL ALPHA â€” SÃ‰QUENCE PRÃ‰VISIONNELLE

Objectif gÃ©nÃ©ral :
Repartir sur une base propre, claire, cohÃ©rente et durable avant de poursuivre le dÃ©veloppement.
Le but nâ€™est pas dâ€™aller vite, mais dâ€™Ã©viter dâ€™empiler de nouveaux blocs sur une structure incertaine.

RÃ¨gles gÃ©nÃ©rales :
- pas de suppression sans validation claire ;
- pas de fusion documentaire sans preuve que les documents se complÃ¨tent rÃ©ellement ;
- pas de refonte massive sans session dÃ©diÃ©e ;
- pas de modification code pendant une session documentaire ;
- pas de nouveau plan parallÃ¨le ;
- PLAN_DE_DEVELOPPEMENT.md reste le seul plan officiel ;
- DOCUMENT_CADRAGE_FONCTIONNEL.md reste la base produit officielle ;
- chaque session doit rester courte, ciblÃ©e et contrÃ´lable.

============================================================
REBASAGE-01 â€” Audit global repo / docs
============================================================
Statut : VALIDÃ‰

Objectif :
Faire un premier Ã©tat des lieux global du dÃ©pÃ´t et de la documentation.

============================================================
REBASAGE-01-BIS â€” ComplÃ©ment audit ciblÃ©
============================================================
Statut : VALIDÃ‰

Objectif :
ComplÃ©ter lâ€™audit initial sur les zones insuffisamment couvertes.

============================================================
REBASAGE-02 â€” Clarification docs racine + gouvernance
============================================================
Statut : VALIDÃ‰

Objectif :
Clarifier les documents prÃ©sents Ã  la racine de `docs/` et poser une premiÃ¨re gouvernance documentaire.

============================================================
REBASAGE-03 â€” Classification documentaire dÃ©taillÃ©e
============================================================
Statut : VALIDÃ‰

Objectif :
Classer les documents existants et identifier leur rÃ´le rÃ©el.

============================================================
REBASAGE-04 â€” Audit des templates de session `docs/3-TEMPLATES`
============================================================
Statut : VALIDÃ‰

Objectif :
Auditer les anciens templates de session avant rÃ©utilisation.

Conclusion :
Les templates Ã©taient utiles mais anciens, donc Ã  moderniser.

============================================================
REBASAGE-05 â€” Mise Ã  jour / consolidation des templates de session
============================================================
Statut : VALIDÃ‰

Objectif :
Moderniser `docs/3-TEMPLATES`.

RÃ©sultat validÃ© :
- `README_TEMPLATES.md`
- `TEMPLATE_SESSION.md`
- `TEMPLATE_DOD_SESSION.md`
- `TEMPLATE_RECAP_SESSION.md`

Anciens fichiers supprimÃ©s/remplacÃ©s :
- `TEMPLATE_DEBUT_SESSION.md`
- `TEMPLATE_FIN_SESSION.md`
- `TEMPLATE_DOD_4_4.md`

============================================================
REBASAGE-06 â€” Matrice canonique Page -> PNG -> rÃ©fÃ©rence UI/UX -> route -> fichier app
============================================================
Statut : VALIDÃ‰ / TRAITÃ‰ DANS LA SÃ‰QUENCE DE REBASAGE

Objectif :
PrÃ©parer la logique de correspondance entre pages, maquettes, rÃ©fÃ©rences UI/UX, routes et fichiers applicatifs.

Note :
Ã€ reprendre plus largement dans les futures matrices page / fonctionnalitÃ©s / code / documentation / maquette.

============================================================
REBASAGE-07 â€” Audit encodage ciblÃ©
============================================================
Statut : VALIDÃ‰

Objectif :
Auditer les problÃ¨mes dâ€™encodage sans correction massive.

Conclusion :
Correction ciblÃ©e nÃ©cessaire sur certains fichiers.

============================================================
REBASAGE-08 â€” Correction encodage ciblÃ©e
============================================================
Statut : VALIDÃ‰

Objectif :
Corriger uniquement les fichiers ciblÃ©s avec BOM ou encodage problÃ©matique.

RÃ¨gle :
Pas de correction massive de tout lâ€™historique.

============================================================
REBASAGE-09 â€” DÃ©cision gouvernance STRUCTURE_DOCS.md / STRUCTURE_PROJET.md
============================================================
Statut : VALIDÃ‰

Objectif :
Clarifier le rÃ´le de :
- `docs/STRUCTURE_DOCS.md`
- `docs/1-MASTER/STRUCTURE_PROJET.md`

Sans suppression automatique.

============================================================
REBASAGE-10 â€” Index consolidÃ© `docs/1-MASTER`
============================================================
Statut : VALIDÃ‰ aprÃ¨s correction encodage

Objectif :
CrÃ©er / amÃ©liorer un index de lecture clair du corpus master.

Fichier concernÃ© :
- `docs/1-MASTER/_INDEX_MASTER.md`

============================================================
REBASAGE-11 â€” Index des sessions historiques par bloc
============================================================
Statut : VALIDÃ‰

Objectif :
CrÃ©er un index clair des sessions historiques `docs/2-SESSIONS`, bloc par bloc.

Sans modifier les anciennes sessions.

============================================================
REBASAGE-12 â€” Gouvernance de consultation / archivage futur des sessions
============================================================
Statut : VALIDÃ‰

Objectif :
Cadrer comment consulter, utiliser ou prÃ©parer lâ€™archivage futur de `docs/2-SESSIONS`.

Fichier crÃ©Ã© :
- `docs/2-SESSIONS/GOUVERNANCE_SESSIONS.md`

============================================================
REBASAGE-13 â€” Simulation dâ€™archivage / matrice opÃ©rationnelle de consultation
============================================================
Statut : VALIDÃ‰

Objectif :
PrÃ©parer les futurs lots dâ€™archivage/nettoyage sans dÃ©placement, suppression ou renommage rÃ©el.

============================================================
REBASAGE-14 â€” Checklist dâ€™exÃ©cution par lot Aâ†’F
============================================================
Statut : VALIDÃ‰

Objectif :
CrÃ©er une checklist dâ€™exÃ©cution future par lots, avec critÃ¨res GO / NO-GO et preuves nÃ©cessaires.

Fichier crÃ©Ã© :
- `docs/2-SESSIONS/CHECKLIST_EXECUTION_LOTS_SESSIONS.md`

============================================================
REBASAGE-15 â€” Dossier de dÃ©cision Nathan par lot Aâ†’F
============================================================
Statut : VALIDÃ‰

Objectif :
PrÃ©parer les dÃ©cisions Nathan par lot avant toute action physique future.

Fichier crÃ©Ã© :
- `docs/2-SESSIONS/DOSSIER_DECISION_LOTS_SESSIONS.md`

============================================================
REBASAGE-16 â€” Formulaire de validation Nathan par lot Aâ†’F
============================================================
Statut : VALIDÃ‰

Objectif :
CrÃ©er un formulaire prÃªt Ã  remplir pour valider ou refuser les futurs lots.

Fichier crÃ©Ã© :
- `docs/2-SESSIONS/FORMULAIRE_VALIDATION_LOTS_SESSIONS.md`

============================================================
REBASAGE-17 â€” Audit fonctionnel global du produit
============================================================
Statut : VALIDÃ‰

Objectif :
Faire une premiÃ¨re cartographie fonctionnelle globale du produit existant.

Conclusion :
Plusieurs modules sont prÃ©sents, mais doivent Ãªtre auditÃ©s plus finement avant reprise.

A26 :
- non poursuivi comme bloc actif ;
- devient historique / transitionnel.

============================================================
REBASAGE-18 â€” Cadrage audit page par page
============================================================
Statut : VALIDÃ‰ dÃ©finitivement aprÃ¨s FIX-01

Objectif :
Cadrer la mÃ©thode dâ€™audit page par page.

Fichier crÃ©Ã© :
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-18_CADRAGE_AUDIT_PAGE_PAR_PAGE.md`

Correction :
- REBASAGE-18-FIX-01 : suppression BOM UTF-8.

============================================================
REBASAGE-19 â€” CrÃ©ation du document â€œfonctionnalitÃ©s par pageâ€
============================================================
Statut : VALIDÃ‰, avec rÃ©serve mÃ©thodologique non bloquante

Objectif :
CrÃ©er une synthÃ¨se opÃ©rationnelle courte pour prÃ©parer les audits page par page.

Fichier crÃ©Ã© :
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-19_FONCTIONNALITES_PAR_PAGE.md`

Remarque importante :
Le document est utile comme squelette, mais il ne suffit pas encore Ã  dÃ©marrer directement les audits page par page.
Il doit Ãªtre consolidÃ© par une cartographie rÃ©elle du repo, des routes, pages, APIs, docs et maquettes.

============================================================
REBASAGE-20 â€” Audit critique de cohÃ©rence mÃ©thodologique des documents de rebasage
============================================================
Statut : Ã€ FAIRE

Objectif :
Relire les documents produits pendant le rebasage non pas seulement pour vÃ©rifier leur forme, mais pour vÃ©rifier le sens de leur contenu.

ContrÃ´ler :
- logique ;
- utilitÃ© rÃ©elle ;
- cohÃ©rence avec lâ€™objectif global ;
- absence de plan parallÃ¨le ;
- absence de doublons problÃ©matiques ;
- documents trop vagues ou trop vides ;
- documents temporaires vs documents durables ;
- risques de mauvaise direction mÃ©thodologique.

Documents prioritaires Ã  relire :
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
- documents cohÃ©rents ;
- documents Ã  clarifier ;
- documents Ã  complÃ©ter ;
- documents Ã  corriger plus tard ;
- documents Ã  ne pas utiliser comme rÃ©fÃ©rence durable.

============================================================
REBASAGE-21 â€” Corrections documentaires ciblÃ©es si nÃ©cessaires
============================================================
Statut : Ã€ FAIRE SI REBASAGE-20 LE JUSTIFIE

Objectif :
Corriger uniquement les incohÃ©rences mÃ©thodologiques dÃ©tectÃ©es en REBASAGE-20.

RÃ¨gles :
- corrections ciblÃ©es uniquement ;
- pas de refonte massive ;
- pas de suppression sans validation ;
- pas de fusion sans justification ;
- pas de modification du plan officiel sans demande explicite.

============================================================
REBASAGE-22 â€” Cartographie globale repo / docs / pages / routes / APIs / maquettes
============================================================
Statut : Ã€ FAIRE

Objectif :
CrÃ©er une vision globale du projet rÃ©el.

Cartographier :
- pages existantes ;
- routes applicatives ;
- routes API ;
- fichiers principaux liÃ©s ;
- documents de rÃ©fÃ©rence associÃ©s ;
- maquettes associÃ©es ;
- fonctionnalitÃ©s liÃ©es ;
- zones stables ;
- zones partielles ;
- zones manquantes ;
- zones Ã  confirmer.

But :
Ã‰viter les erreurs de chemin, les oublis, les doublons et les incohÃ©rences entre code, docs et maquettes.

============================================================
REBASAGE-23 â€” Matrice page / fonctionnalitÃ©s / code / documentation / maquette
============================================================
Statut : Ã€ FAIRE

Objectif :
CrÃ©er une matrice fiable reliant chaque page Ã  ses rÃ©fÃ©rences.

Pour chaque page :
- nom de la page ;
- route applicative ;
- fichiers code associÃ©s ;
- fonctionnalitÃ©s attendues ;
- fonctionnalitÃ©s prÃ©sentes ;
- documents liÃ©s ;
- maquettes PNG associÃ©es ;
- statut global ;
- Ã©carts constatÃ©s ;
- actions recommandÃ©es.

============================================================
REBASAGE-24 â€” Classement des dettes et prioritÃ©s
============================================================
Statut : Ã€ FAIRE

Objectif :
Classer les dettes dÃ©tectÃ©es pendant la cartographie et les audits.

Statuts possibles :
- Bloquant
- Important
- AmÃ©lioration
- Ã€ confirmer
- Plus tard

Distinguer :
- Ã  corriger maintenant ;
- Ã  documenter ;
- Ã  archiver ;
- Ã  traiter dans une future session de code ;
- en attente de validation Nathan.

RÃ¨gle :
Une dette dÃ©tectÃ©e ne dÃ©clenche pas automatiquement une correction.

============================================================
REBASAGE-25 â€” Inventaire rÃ©el des pages/routes applicatives avant audit dÃ©taillÃ©
============================================================
Statut : Ã€ FAIRE

Objectif :
Confirmer prÃ©cisÃ©ment les pages et routes rÃ©ellement prÃ©sentes dans le code avant de lancer les audits page par page.

But :
Ne pas auditer une liste thÃ©orique ou incomplÃ¨te.

============================================================
REBASAGE-26 â€” Audit page Login
============================================================
Statut : Ã€ FAIRE

Objectif :
Auditer la page Login :
- rÃ´le rÃ©el ;
- route ;
- fichier code ;
- logique prÃ©sente ;
- APIs liÃ©es ;
- conformitÃ© au cadrage ;
- cohÃ©rence UI/UX ;
- dettes ;
- actions recommandÃ©es.

============================================================
REBASAGE-27 â€” Audit page Dashboard
============================================================
Statut : Ã€ FAIRE

Objectif :
Auditer le Dashboard selon la mÃªme mÃ©thode.

============================================================
REBASAGE-28 â€” Audit page Planning
============================================================
Statut : Ã€ FAIRE

Objectif :
Auditer la page Planning selon la mÃªme mÃ©thode.

============================================================
REBASAGE-29 â€” Audit page Utilisateurs / RH
============================================================
Statut : Ã€ FAIRE

Objectif :
Auditer la page Utilisateurs / RH selon la mÃªme mÃ©thode.

============================================================
REBASAGE-30 â€” Audit page VÃ©hicules
============================================================
Statut : Ã€ FAIRE

Objectif :
Auditer la page VÃ©hicules selon la mÃªme mÃ©thode.

============================================================
REBASAGE-31 â€” Audit page Templates
============================================================
Statut : Ã€ FAIRE

Objectif :
Auditer la page Templates selon la mÃªme mÃ©thode.

============================================================
REBASAGE-32 â€” Audit page SociÃ©tÃ©
============================================================
Statut : Ã€ FAIRE

Objectif :
Auditer la page SociÃ©tÃ© selon la mÃªme mÃ©thode.

============================================================
REBASAGE-33 â€” Audit page DÃ©pÃ´ts / Bases
============================================================
Statut : Ã€ FAIRE

Objectif :
Auditer la page DÃ©pÃ´ts / Bases selon la mÃªme mÃ©thode.

============================================================
REBASAGE-34 â€” Audit page Onboarding
============================================================
Statut : Ã€ FAIRE

Objectif :
Auditer la page Onboarding selon la mÃªme mÃ©thode.

============================================================
REBASAGE-35 â€” Audit page Audit / Journal dâ€™audit
============================================================
Statut : Ã€ FAIRE

Objectif :
Auditer la page Audit / Journal dâ€™audit selon la mÃªme mÃ©thode.

============================================================
REBASAGE-36 â€” Audit page Privacy / Mentions dâ€™information
============================================================
Statut : Ã€ FAIRE

Objectif :
Auditer la page Privacy / Mentions dâ€™information selon la mÃªme mÃ©thode.

============================================================
REBASAGE-37 â€” Audit pages techniques / secondaires
============================================================
Statut : Ã€ FAIRE

Objectif :
Auditer les pages techniques ou secondaires dÃ©tectÃ©es pendant lâ€™inventaire :
- pages dâ€™erreur ;
- pages internes ;
- redirections ;
- routes spÃ©ciales ;
- pages non listÃ©es initialement.

============================================================
REBASAGE-38 â€” SynthÃ¨se globale des audits page par page
============================================================
Statut : Ã€ FAIRE

Objectif :
Regrouper les constats des audits page par page.

Produire :
- pages conformes ;
- pages incomplÃ¨tes ;
- pages non conformes ;
- pages Ã  confirmer ;
- fonctionnalitÃ©s manquantes ;
- fonctionnalitÃ©s Ã  masquer / reporter / supprimer ;
- dettes principales ;
- prioritÃ©s de reprise.

============================================================
REBASAGE-39 â€” PrÃ©paration de la future refonte du plan officiel
============================================================
Statut : Ã€ FAIRE PLUS TARD

Objectif :
PrÃ©parer les Ã©lÃ©ments nÃ©cessaires Ã  une future reprise de `PLAN_DE_DEVELOPPEMENT.md`.

Important :
Ne pas crÃ©er de nouveau plan parallÃ¨le.
Ne pas modifier le plan officiel tant que la cartographie, les audits et les dettes ne sont pas suffisamment clairs.

============================================================
NOTE DE PILOTAGE
============================================================
La sÃ©quence peut Ã©voluer si un audit rÃ©vÃ¨le une incohÃ©rence importante.

Ordre actuel recommandÃ© :
1. sÃ©curiser la cohÃ©rence documentaire ;
2. cartographier le repo rÃ©el ;
3. relier pages / fonctionnalitÃ©s / code / docs / maquettes ;
4. classer les dettes ;
5. auditer les pages une par une ;
6. seulement ensuite prÃ©parer la reprise du plan officiel.

Prochain ZIP attendu aprÃ¨s la prochaine session :
AmbuManager-main (19).zip