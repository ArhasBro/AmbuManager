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
Règle qualité du fichier central (à partir de REBASAGE-21-FIX-01) :
- `REBASAGE_GLOBAL_ALPHA.md` ne doit plus être réécrit intégralement ;
- toute mise à jour du fichier central doit être courte, ciblée et minimale ;
- Codex doit éviter les réécritures globales qui peuvent réintroduire du mojibake ;
- chaque modification de ce fichier doit être vérifiée en UTF-8 sans BOM ;
- chaque modification doit vérifier l'absence de mojibake détectable (exemples : U+00C3, U+00E2, U+FFFD) ;
- le fichier doit conserver un retour à la ligne final.

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
REBASAGE-20 — Reclassement minimal des documents REBASAGE-18 et REBASAGE-19
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
REBASAGE-22 — Corrections documentaires ciblees si necessaires
============================================================
Statut : A FAIRE SI REBASAGE-21 LE JUSTIFIE

Objectif :
Corriger uniquement les incoherences methodologiques detectees en REBASAGE-21.

============================================================
REBASAGE-23 — Cartographie globale repo / docs / pages / routes / APIs / maquettes
============================================================
Statut : A FAIRE

Objectif :
Produire une vision globale du projet reel (code, docs, pages, routes, APIs, maquettes).

============================================================
REBASAGE-24 — Matrice page / fonctionnalites / code / documentation / maquette
============================================================
Statut : A FAIRE

Objectif :
Relier chaque page a ses fonctionnalites, fichiers code, references documentaires et maquettes.

============================================================
REBASAGE-25 — Classement des dettes et priorites
============================================================
Statut : VALIDE DEFINITIVEMENT

Objectif :
Classer les dettes detectees (bloquant, important, amelioration, a confirmer, plus tard).

============================================================
REBASAGE-26 — Inventaire reel des pages/routes applicatives avant audit detaille
============================================================
Statut : VALIDE DEFINITIVEMENT

Objectif :
Confirmer la liste exacte des pages/routes reelles avant les audits page par page.
Livrable :
- docs/2-SESSIONS/5-REBASAGE/REBASAGE-26_INVENTAIRE_PAGES_ROUTES_APPLICATIVES.md

Verdict global :
- inventaire pages/routes reel : VALIDE
- audits page par page prets : OUI

Prochaine etape recommandee :
- REBASAGE-27 - Audit page par page : premiere page priorisee.
============================================================
REBASAGE-27 — Audit page Login
============================================================
Statut : VALIDE DEFINITIVEMENT
Livrable :
- docs/2-SESSIONS/5-REBASAGE/REBASAGE-27_AUDIT_PAGE_LOGIN.md

Verdict global :
- audit login realise ;
- statut d'audit login : incomplet ;
- aucune correction appliquee.

Prochaine etape recommandee :
- REBASAGE-28 - Audit page Dashboard.
============================================================
REBASAGE-28 — Audit page Dashboard
============================================================
Statut : VALIDE DEFINITIVEMENT
Livrable :
- docs/2-SESSIONS/5-REBASAGE/REBASAGE-28_AUDIT_PAGE_DASHBOARD.md

Verdict global :
- audit dashboard realise ;
- statut d'audit dashboard : incomplet ;
- aucune correction appliquee.

Prochaine etape recommandee :
- REBASAGE-29 - Audit page Planning.
============================================================
REBASAGE-29 — Audit page Planning
============================================================
Statut : VALIDE DEFINITIVEMENT
Livrable :
- docs/2-SESSIONS/5-REBASAGE/REBASAGE-29_AUDIT_PAGE_PLANNING.md

Verdict global :
- audit planning realise ;
- statut d'audit planning : incomplet ;
- aucune correction appliquee.

Prochaine etape recommandee :
- REBASAGE-30 - Audit page Utilisateurs / RH.
============================================================
REBASAGE-30 — Audit page Utilisateurs / RH
============================================================
Statut : VALIDE DEFINITIVEMENT
Livrable :
- docs/2-SESSIONS/5-REBASAGE/REBASAGE-30_AUDIT_PAGE_UTILISATEURS_RH.md

Verdict global :
- audit utilisateurs / RH realise ;
- statut d'audit utilisateurs / RH : incomplet ;
- aucune correction appliquee.

Prochaine etape recommandee :
- REBASAGE-31 - Audit page Vehicules / Flotte.
============================================================
REBASAGE-31 — Audit page Vehicules
============================================================
Statut : VALIDE DEFINITIVEMENT

Livrable :
- docs/2-SESSIONS/5-REBASAGE/REBASAGE-31_AUDIT_PAGE_VEHICULES_FLOTTE.md

Verdict global :
- audit vehicules / flotte realise ;
- statut d'audit vehicules / flotte : incomplet ;
- aucune correction appliquee.

Prochaine etape recommandee :
- REBASAGE-32 - Audit page Templates / Modeles de shifts.

============================================================
REBASAGE-32 — Audit page Templates
============================================================
Statut : VALIDE DEFINITIVEMENT


Livrable :
- docs/2-SESSIONS/5-REBASAGE/REBASAGE-32_AUDIT_PAGE_TEMPLATES_MODELES_SHIFTS.md

Verdict global :
- audit templates / modeles de shifts realise ;
- statut d'audit templates / modeles de shifts : incomplet ;
- aucune correction code appliquee.

Prochaine etape recommandee :
- REBASAGE-33 - Audit page Societe / Profil societe / Bases-depots.
============================================================
REBASAGE-33 — Audit page Societe
============================================================
Statut : VALIDE


Livrable :
- docs/2-SESSIONS/5-REBASAGE/REBASAGE-33_AUDIT_PAGE_SOCIETE_PROFIL_BASES_DEPOTS.md

Verdict global :
- audit société / profil société / bases-dépôts réalisé ;
- statut d'audit société / profil société / bases-dépôts : incomplet ;
- aucune correction code appliquée.

Prochaine étape recommandée :
- REBASAGE-34 - Audit page Dépôts / Bases (détail opérationnel et impacts inter-modules).
============================================================
REBASAGE-34 — Audit page Depots / Bases
============================================================
Statut : A FAIRE

============================================================
REBASAGE-35 — Audit page Onboarding
============================================================
Statut : A FAIRE

============================================================
REBASAGE-36 — Audit page Audit / Journal d'audit
============================================================
Statut : A FAIRE

============================================================
REBASAGE-37 — Audit page Privacy / Mentions d'information
============================================================
Statut : A FAIRE

============================================================
REBASAGE-38 — Audit pages techniques / secondaires
============================================================
Statut : A FAIRE

============================================================
REBASAGE-39 — Synthese globale des audits page par page
============================================================
Statut : A FAIRE

============================================================
REBASAGE-40 — Preparation de la future refonte du plan officiel
============================================================
Statut : A FAIRE PLUS TARD

============================================================
NOTE DE PILOTAGE
============================================================
La sequence peut evoluer si un audit revele une incoherence importante.

============================================================
MISE A JOUR CIBLEE - REBASAGE-25
============================================================
REBASAGE-25 - Classement des dettes et priorites
Statut : VALIDE
Livrable : `docs/2-SESSIONS/5-REBASAGE/REBASAGE-25_CLASSEMENT_DETTES_PRIORITES.md`
Resume court : dettes qualifiees et priorisees (important, amelioration, a confirmer, plus tard) sans correction automatique.
Verdict global : classement exploitable pour preparer la suite.
Prochaine etape recommandee : REBASAGE-26 - Inventaire reel des pages/routes applicatives avant audit detaille.
