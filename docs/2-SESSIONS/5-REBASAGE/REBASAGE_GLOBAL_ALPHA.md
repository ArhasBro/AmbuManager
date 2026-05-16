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
REBASAGE-20 â€” Reclassement minimal des documents REBASAGE-18 et REBASAGE-19
============================================================
Statut : VALIDE apres FIX-02

Objectif :
Reclasser les documents REBASAGE-18 et REBASAGE-19 dans le dossier officiel du rebasage global Alpha, sans modifier leur fond documentaire.

Travaux realises :
- deplacement de `docs/2-SESSIONS/REBASAGE-18_CADRAGE_AUDIT_PAGE_PAR_PAGE.md`
  vers `docs/2-SESSIONS/5-REBASAGE/REBASAGE-18_CADRAGE_AUDIT_PAGE_PAR_PAGE.md` ;
- deplacement/renommage de `docs/1-MASTER/FONCTIONNALITES_PAR_PAGE.md`
  vers `docs/2-SESSIONS/5-REBASAGE/REBASAGE-19_FONCTIONNALITES_PAR_PAGE.md` ;
- correction REBASAGE-20-FIX-01 : suppression du mojibake dans `REBASAGE_GLOBAL_ALPHA.md` ;
- correction REBASAGE-20-FIX-02 : realignement logique de la sequence dans le fichier central.

============================================================
REBASAGE-21 - Audit critique de coherence methodologique des documents de rebasage
============================================================
Statut : VALIDE

Objectif :
Relire les documents produits pendant le rebasage pour verifier la coherence de fond, l'utilite reelle et l'absence de derive methodologique.

Livrable :
- docs/2-SESSIONS/5-REBASAGE/REBASAGE-21_AUDIT_COHERENCE_METHODOLOGIQUE.md

Verdict global :
- coherence methodologique globale : PARTIELLE
- corrections documentaires ciblees requises : OUI
- suite recommandee : REBASAGE-22

============================================================
REBASAGE-22 â€” Corrections documentaires ciblees si necessaires
============================================================
Statut : A FAIRE SI REBASAGE-21 LE JUSTIFIE

Objectif :
Corriger uniquement les incoherences methodologiques detectees en REBASAGE-21.

============================================================
REBASAGE-23 â€” Cartographie globale repo / docs / pages / routes / APIs / maquettes
============================================================
Statut : A FAIRE

Objectif :
Produire une vision globale du projet reel (code, docs, pages, routes, APIs, maquettes).

============================================================
REBASAGE-24 â€” Matrice page / fonctionnalites / code / documentation / maquette
============================================================
Statut : A FAIRE

Objectif :
Relier chaque page a ses fonctionnalites, fichiers code, references documentaires et maquettes.

============================================================
REBASAGE-25 â€” Classement des dettes et priorites
============================================================
Statut : A FAIRE

Objectif :
Classer les dettes detectees (bloquant, important, amelioration, a confirmer, plus tard).

============================================================
REBASAGE-26 â€” Inventaire reel des pages/routes applicatives avant audit detaille
============================================================
Statut : A FAIRE

Objectif :
Confirmer la liste exacte des pages/routes reelles avant les audits page par page.

============================================================
REBASAGE-27 â€” Audit page Login
============================================================
Statut : A FAIRE

============================================================
REBASAGE-28 â€” Audit page Dashboard
============================================================
Statut : A FAIRE

============================================================
REBASAGE-29 â€” Audit page Planning
============================================================
Statut : A FAIRE

============================================================
REBASAGE-30 â€” Audit page Utilisateurs / RH
============================================================
Statut : A FAIRE

============================================================
REBASAGE-31 â€” Audit page Vehicules
============================================================
Statut : A FAIRE

============================================================
REBASAGE-32 â€” Audit page Templates
============================================================
Statut : A FAIRE

============================================================
REBASAGE-33 â€” Audit page Societe
============================================================
Statut : A FAIRE

============================================================
REBASAGE-34 â€” Audit page Depots / Bases
============================================================
Statut : A FAIRE

============================================================
REBASAGE-35 â€” Audit page Onboarding
============================================================
Statut : A FAIRE

============================================================
REBASAGE-36 â€” Audit page Audit / Journal d'audit
============================================================
Statut : A FAIRE

============================================================
REBASAGE-37 â€” Audit page Privacy / Mentions d'information
============================================================
Statut : A FAIRE

============================================================
REBASAGE-38 â€” Audit pages techniques / secondaires
============================================================
Statut : A FAIRE

============================================================
REBASAGE-39 â€” Synthese globale des audits page par page
============================================================
Statut : A FAIRE

============================================================
REBASAGE-40 â€” Preparation de la future refonte du plan officiel
============================================================
Statut : A FAIRE PLUS TARD

============================================================
NOTE DE PILOTAGE
============================================================
La sequence peut evoluer si un audit revele une incoherence importante.

