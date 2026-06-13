# 1 - Session

## 1. Identification

- Session : SESSION-20260613-01_A1_P1-01
- Code session : P1-01
- Date : 13/06/2026
- Phase : PHASE 1 - Structuration du plan de reprise Base44
- Bloc script : A1
- Type : AUDIT
- Intitule : Structuration reprise Base44

## 2. Contexte

Projet : Ambulance Manager.

Le repo officiel Next.js / TypeScript reste la base technique finale.

Base44 est integre dans le repo comme reference prototype fonctionnelle, visuelle, UX et metier. Base44 ne doit pas etre copie-colle techniquement.

Les documents MASTER actifs sont :

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`

La reference Base44 integree est situee dans :

- `docs/1-MASTER/4-BASE44_REFERENCE/`

## 3. Objectif

Realiser uniquement l'audit de depart de la PHASE 1 : structuration du plan de reprise Base44.

La session doit :

- lire la structure reelle du repo ;
- lire les documents MASTER actifs ;
- lire la reference Base44 integree ;
- identifier les pages officielles du projet ;
- identifier les pages ou modules presents dans Base44 ;
- identifier les correspondances probables entre pages officielles et pages Base44 ;
- identifier les elements transversaux communs ;
- identifier les noms historiques ou fichiers a revoir plus tard ;
- identifier les anciens blocs ou anciens plans devenus obsoletes ;
- proposer une premiere liste de blocs de reprise ;
- proposer uniquement un ordre preliminaire de reprise.

Cette session ne produit pas le plan final complet.

## 4. Perimetre lu

Lecture autorisee de tout le repo.

Perimetre effectivement lu ou inventorie :

- racine du repo ;
- `app/`
- `app/api/`
- `app/ui/`
- `lib/`
- `docs/1-MASTER/`
- `docs/1-MASTER/4-BASE44_REFERENCE/`
- `docs/2-SESSIONS/`
- `docs/3-TEMPLATES/`
- `create_session.ps1`
- `package.json`

## 5. Perimetre interdit

Interdictions appliquees pendant cette session :

- aucune modification de code ;
- aucune modification de fichiers applicatifs ;
- aucune modification de `package.json` ;
- aucune modification Prisma ;
- aucune migration ;
- aucune correction UI ;
- aucun renommage ;
- aucune modification des quatre documents MASTER actifs ;
- aucune modification de la reference Base44 ;
- aucun nettoyage global ;
- aucune refonte documentaire massive ;
- aucune suppression de fichiers ;
- aucun deplacement de fichiers.

## 6. Methode d'audit

Methode appliquee :

1. Controle initial de l'etat Git avec `git status --short`.
2. Inventaire de la racine du repo.
3. Inventaire de `docs/1-MASTER`, `docs/2-SESSIONS`, `docs/3-TEMPLATES`.
4. Lecture du script `create_session.ps1`.
5. Creation de la session via le script officiel.
6. Inventaire des routes Next.js via les fichiers `page.tsx`, `layout.tsx` et `route.ts`.
7. Lecture ciblee des documents MASTER actifs par titres et sections structurantes.
8. Lecture ciblee de la reference Base44 integree : README, synthese, export, routes, pages, composants, entites.
9. Comparaison preliminaire routes officielles / routes Base44.
10. Identification des sujets transversaux et noms historiques.
11. Redaction des livrables de session uniquement dans le dossier P1-01.
12. Controles finaux : Git, encodage UTF-8 sans BOM, absence de sequences suspectes.

## 7. Doctrine retenue

Doctrine retenue pour la suite de la PHASE 1 :

- Les anciens blocs techniques historiques ne doivent plus servir de plan d'execution principal.
- Le nouveau plan doit etre structure autour de blocs transversaux et de blocs par page.
- Un bloc page correspond a une page fonctionnelle.
- Les elements communs a plusieurs pages doivent etre regroupes dans des blocs transversaux dedies.
- Le nombre de sessions par bloc depend de la complexite reelle du bloc.
- Aucun plafond fixe de sessions ne doit etre impose.
- Les sessions doivent rester petites, unitaires, coherentes, controlables et non lourdes.
- Une session qui contient trop d'objectifs doit etre divisee.
- Les renommages de fichiers, routes, composants ou dossiers sont autorises uniquement plus tard, dans des sessions dediees, cadrees, justifiees et verifiees.
- Aucun renommage n'est autorise dans cette session.
- Aucun code n'est modifie dans cette session.
- Toute information non prouvee doit etre marquee : INFORMATION NON FOURNIE — À CONFIRMER.

## 8. Livrables de session

Livrables produits dans ce dossier :

- `1-SESSION.md`
- `2-PREUVES.md`
- `3-FIN_DE_SESSION.md`
- `PATCH/NO_PATCH.md`

