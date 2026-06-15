# Ambulance Manager - Plan de développement

Date de refonte ciblée : 13/06/2026

## 1. Rôle du document

Ce document est le plan de reprise operationnelle actif d'Ambulance Manager.

Il sert a preparer les prochaines sessions Codex, fixer l'ordre de reprise, distinguer les blocs transversaux des blocs pages/modules, lister les controles attendus et rendre visibles les points restant a confirmer.

Le detail operationnel des blocs, sessions de production, livrables attendus, types de sessions, controles, preuves et statuts est suivi dans `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`.

Il ne remplace pas :

- `01-APPLICATION_WEB.md` pour le perimetre produit ;
- `02-DOCUMENT_MAITRE_PROJET.md` pour le pilotage global ;
- `03-METHODE_DE_TRAVAIL.md` pour les regles de session ;
- les fiches fonctionnelles, audits, maquettes, references UI/UX ou references Base44.

## 2. Références de travail

References actives :

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`

References de reprise :

- P1-01 : audit initial du repo officiel et de Base44.
- P1-02 : base officielle de reprise operationnelle.
- P1-03 : integration des decisions humaines issues de P1-02.
- P1-04 : preparation de la refonte ciblee du present plan.
- `docs/1-MASTER/4-BASE44_REFERENCE/` : prototype Base44 comme reference metier, fonctionnelle et visuelle.

## 3. Principes non négociables

- Le repo officiel reste la reference technique finale.
- Base44 est une reference prototype, pas une source technique a copier-coller.
- Aucune reprise code ne commence sans session dediee, perimetre clair et preuves.
- Une session = un objectif unique, controlable et cloturable.
- Le nombre de sessions depend de la complexite reelle du bloc.
- Aucun plafond fixe artificiel n'est impose par bloc.
- Les routes techniques restent stables en anglais cote code tant qu'un renommage n'est pas confirme.
- Les libelles UI visibles doivent rester en francais.
- Les actions sensibles doivent etre tracees.
- Le multi-tenant par societe reste non negociable.
- Les incertitudes restent visibles sous la forme `INFORMATION NON FOURNIE - A CONFIRMER`.

## 4. Contexte de reprise P1

P1-01 a audite le repo officiel, la reference Base44, les pages, les modules, les entites utiles et les anciennes logiques de plan.

P1-02 devient la base officielle de reprise operationnelle. Elle structure la reprise en blocs transversaux, blocs pages/modules et validations finales.

P1-03 acte les decisions humaines : routes techniques stables, libelles UI francais, `Modèles horaires`, `Mise en route`, statut hybride de `Suivi des véhicules`, Privacy visible en Alpha, RBAC progressif, contacts societe multiples, `Se souvenir de moi` a prevoir, Dashboard a fiabiliser avant preferences.

P1-04 prepare la refonte ciblee du present document sans modifier le MASTER.

## 5. Statut des anciennes logiques de plan

Les anciennes logiques ne sont pas supprimees comme historique, mais elles ne pilotent plus l'ordre principal.

Ne doivent plus servir de plan d'execution principal :

- les anciens blocs 1 a 15 du plan precedent ;
- les anciens codes `DEV-B44-*` ;
- l'ancien cadrage oriente `Phase 5` ;
- les blocs Base44 A a L comme blocs officiels de reprise ;
- une logique de francisation technique automatique des routes ;
- un Dashboard traite avant stabilisation des donnees sources ;
- un RBAC monolithique a finaliser d'un coup ;
- Privacy comme simple page Base44.

Ces elements peuvent rester utiles comme contexte, mais toute session future doit partir du present plan et de P1-02/P1-03.

## 6. Doctrine de reprise depuis Base44

Base44 est utilise pour comprendre :

- les parcours ;
- les libelles metier ;
- les ecrans ;
- les composants et patterns utiles ;
- les entites prototype ;
- les ecarts entre prototype et repo officiel.

Base44 ne doit pas etre utilise pour :

- copier du code ;
- definir l'architecture finale ;
- valider la securite backend ;
- valider Prisma ;
- valider le RBAC serveur ;
- valider la conformite RGPD complete.

Toute idee Base44 reprise doit etre adaptee au repo officiel, a Prisma, au RBAC serveur/API, au multi-tenant et aux regles de preuve du projet.

## 7. Règles de decoupage des blocs

Un bloc regroupe un probleme coherent.

Deux familles de blocs sont utilisees :

- blocs transversaux, quand plusieurs pages partagent la meme logique ;
- blocs pages/modules, quand une page ou un module metier doit etre repris dans son contexte.

Un bloc peut contenir plusieurs sessions si le risque, les dependances ou la complexite l'exigent.

Un bloc ne doit pas devenir une session unique trop lourde.

## 8. Règles de decoupage des sessions

Chaque session doit avoir :

- un objectif unique ;
- un perimetre autorise ;
- un hors perimetre ;
- des fichiers a lire ;
- des fichiers modifiables ;
- des controles attendus ;
- des preuves terminales ;
- un verdict explicite.

Pour les sessions code, les controles attendus incluent au minimum les controles adaptes au changement : lint, build, tests cibles, controle API/RBAC, controle visuel si UI modifiee, et controle multi-tenant si donnees societe impliquees.

Pour les sessions documentaires, les controles attendus incluent Git, perimetre, encodage UTF-8 sans BOM, absence de mojibake et absence de modification code si le code est hors perimetre.

## 9. Ordre global de reprise operationnelle

Ordre principal valide par P1-02 et ajuste par P1-03/P1-04 :

1. T0 - Gouvernance P1 et remplacement du plan.
2. T2 - Nomenclature, routes et renommages futurs.
3. T1 - Shell global, navigation et contexte connecte.
4. T3 - Design system officiel et composants communs.
5. T4 - RBAC UI/API et matrice permissions, en mode progressif.
6. T5 - Donnees, multi-tenant et mapping Base44 vers officiel.
7. T6 - Audit et tracabilite transverse.
8. T7 - Qualite, tests et controles de reprise.
9. P-LOGIN - Connexion, incluant `Se souvenir de moi`.
10. P-COMPANY - Societe, incluant contacts societe multiples.
11. P-DEPOTS - Depots / Bases.
12. P-USERS-RH - Utilisateurs / RH.
13. P-VEHICLES - Vehicules.
14. P-VEHICLE-FOLLOWUP - Suivi des véhicules en statut hybride.
15. P-TEMPLATES - Modèles horaires.
16. P-PLANNING - Planning.
17. P-AUDIT - Audit / Tracabilite.
18. P-DASHBOARD - Tableau de bord comme portail fiable.
19. P-ONBOARDING - Mise en route.
20. RGPD-PRIVACY - Privacy visible en Alpha et rattachee au bloc RGPD.
21. F1 - Validation fonctionnelle croisee.
22. F2 - Validation qualite technique.
23. F3 - Validation UX visuelle.
24. F4 - Cloture documentaire Alpha ou cloture de phase.

## 10. Blocs transversaux

| Bloc | Objectif | Points de vigilance |
|---|---|---|
| T0 - Gouvernance P1 | Formaliser la gouvernance de reprise et maintenir le plan. | Ne pas creer de plan parallele. |
| T2 - Nomenclature | Cadrer routes, libelles et renommages futurs. | Routes code stables en anglais ; libelles UI en francais. |
| T1 - Shell / navigation | Stabiliser sidebar, topbar, societe courante, utilisateur, acces refuse. | Precede les pages metier. |
| T3 - Design system | Stabiliser composants communs et etats UI. | Ne pas copier les composants Base44. |
| T4 - RBAC progressif | Poser une matrice minimale puis renforcer par module. | Controle serveur/API obligatoire pour actions sensibles. |
| T5 - Donnees / multi-tenant | Comparer entites Base44 et modele officiel. | Aucune modification Prisma sans session dediee. |
| T6 - Audit transverse | Definir les actions sensibles a tracer. | Acteur, societe, cible, action et resultat doivent etre identifiables. |
| T7 - Qualite / controles | Definir les DoD par type de session. | Les exceptions doivent etre documentees. |

## 11. Blocs pages / modules

| Bloc | Route technique actuelle | Libelle produit | Reference Base44 | Notes |
|---|---|---|---|---|
| P-LOGIN | `/login` | Connexion | `/login` | Inclure `Se souvenir de moi`; pas d'inscription libre Alpha. |
| P-COMPANY | `/company` | Société | `/societe` | Contacts societe multiples valides ; multi-tenant strict. |
| P-DEPOTS | `/depots` | Dépôts / Bases | `/depots` | Referentiel source pour RH, vehicules et planning. |
| P-USERS-RH | `/users` | Utilisateurs / RH | `/utilisateurs` | Separation fiche RH / acces applicatif a reprendre proprement. |
| P-VEHICLES | `/vehicles` | Véhicules | `/vehicules` | Precede suivi vehicules et planning. |
| P-VEHICLE-FOLLOWUP | A confirmer | Suivi des véhicules | `/suivi-vehicules` | Statut hybride valide : rattache flotte avec cadrage propre. |
| P-TEMPLATES | `/templates` | Modèles horaires | `/modeles-horaires` | Renommage technique futur a confirmer plus tard. |
| P-PLANNING | `/planning` | Planning | `/planning` | A reprendre apres referentiels et donnees sources. |
| P-AUDIT | `/audit` | Audit / Tracabilite | `/audit` | Doit verifier les traces serveur officielles. |
| P-DASHBOARD | `/dashboard` | Tableau de bord | `/` | Portail fiable d'abord ; preferences plus tard. |
| P-ONBOARDING | `/onboarding` | Mise en route | `/mise-en-route` | Renommage technique futur a confirmer plus tard. |

## 12. Bloc RGPD / Privacy

Privacy doit etre visible en Alpha.

La page ou section Privacy est rattachee au bloc RGPD, pas a un bloc page Base44 classique.

Le bloc RGPD / Privacy doit couvrir au minimum :

- presence et accessibilite de Privacy ;
- coherence avec le login et les informations utilisateur ;
- limites de la conformite Alpha ;
- points RGPD restant a confirmer : conservation, purge, droits d'acces, rectification, suppression, contact privacy, base legale et DPO.

La conformite RGPD complete reste `INFORMATION NON FOURNIE - A CONFIRMER`.

## 13. Bloc validations finales / gel Alpha

Les validations finales doivent intervenir avant tout passage a du code applicatif lourd ou a une cloture Alpha.

Elles couvrent :

- F1 - parcours fonctionnels croises ;
- F2 - qualite technique : lint, build, tests cibles, API/RBAC, multi-tenant ;
- F3 - UX visuelle : shell, pages critiques, responsive, etats vides/erreur/loading ;
- F4 - cloture documentaire : preuves, decisions, reports acceptes, prochaine phase.

Aucun bloc ne se cloture par simple presence de fichiers.

## 14. Règles de preuve et controle

Chaque session doit fournir les preuves adaptees :

- commandes executees ;
- fichiers lus ;
- fichiers crees, modifies, supprimes ou renommes ;
- `git status --short` initial et final ;
- diff des fichiers modifies ;
- preuve d'absence de modification hors perimetre ;
- controles d'encodage pour les Markdown ;
- controles de mojibake ;
- tests ou controles techniques quand du code est modifie.

Pour toute reprise inspiree de Base44, la session doit prouver :

- ce qui est repris comme idee ;
- ce qui est refuse ;
- ce qui est adapte au repo officiel ;
- l'absence de copie directe de code Base44.

## 15. Règles de maintenance du plan

Le present plan est mis a jour uniquement quand :

- un ordre de reprise change ;
- un bloc est ajoute, retire, fusionne ou cloture ;
- une decision humaine modifie le perimetre ;
- une dependance change ;
- une incertitude est tranchee ;
- la phase actuelle change.

Le plan doit rester court, exploitable et oriente sessions.

Il ne doit pas devenir un journal de session, un audit detaille, une fiche fonctionnalite ou une copie de P1-02.

## 16. Points restant a confirmer

- Statut technique futur de `Suivi des véhicules` : route autonome, sous-module de `Véhicules`, ou integration hybride precise.
- Renommage technique futur `templates` vers `modeles-horaires`.
- Renommage technique futur `onboarding` vers `mise-en-route`.
- Niveau de granularite initial du RBAC progressif.
- Politique RGPD complete.
- Moment exact de reprise des preferences Dashboard apres stabilisation du portail et des donnees sources.
- Sessions Prisma futures si le mapping donnees revele des ecarts.

## 17. Prochaine session recommandee

Prochaine session recommandee :

`T0-03 - CLOTURE DOCUMENTAIRE - Cloture du cadrage P1 et preparation de la reprise operationnelle`

Objectif :

- verifier que P1-01 a P1-05 sont coherentes ;
- confirmer que le present plan remplace l'ancien ordre principal ;
- preparer les premieres sessions operationnelles T2/T1 sans coder ;
- lister les decisions humaines encore necessaires avant reprise code.

Patch code : interdit.
