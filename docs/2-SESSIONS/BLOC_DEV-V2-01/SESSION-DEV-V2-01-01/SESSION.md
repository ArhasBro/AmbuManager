# TEMPLATE_SESSION.md - OUVERTURE

## Identite de session
- Session : DEV-V2-01-01
- Type : AUDIT
- Responsable : Codex
- Statut : PREPAREE - NON DEMARREE
- Date de preparation : 2026-05-28

## Role attendu de Codex
- Produire dans le repo, strictement dans le perimetre autorise.
- Appliquer 1 session = 1 objectif unique.
- Ne jamais conclure par validation implicite.

## Objectif unique
- Objectif : Cartographier le shell actuel, les libelles legacy et les cas non autorises pour etablir un diagnostic exploitable du bloc DEV-V2-01.

## Documents a lire
- Obligatoires :
  - docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md
  - docs/2-SESSIONS/README_SESSIONS.md
  - docs/3-TEMPLATES/TEMPLATE_SESSION.md
- Complementaires (si necessaires) :
  - docs/1-MASTER/_INDEX_MASTER.md
  - docs/1-MASTER/DOCUMENT_MAITRE_V2.md

## Perimetre autorise
- Fichiers autorises a modifier :
  - docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-01/SESSION.md
- Limites :
  - Inclus :
  - Lecture et analyse du code frontend lie au shell/navigation.
  - Production du cadrage d ecarts dans les livrables de session.
  - Exclu :
  - Aucune correction fonctionnelle metier.
  - Aucune modification MASTER ou template.

## Interdits stricts
- Modifier un fichier hors perimetre autorise.
- Changer l objectif de session.
- Lancer une refonte globale.
- Valider sans preuves.
- Modifier les documents MASTER sauf autorisation explicite.
- Modifier le code si la session est documentaire.
- Creer un fichier non demande.
- Proposer une amelioration hors perimetre ailleurs que dans Points a confirmer.
- Omettre une information manquante : ecrire INFORMATION NON FOURNIE - A CONFIRMER.

## Travail demande
- Taches :
  - Inventorier le shell prive actuel (layout, navigation, header, sidebar, routes visibles).
  - Lister tous les libelles legacy encore presents vs nomenclature V2 cible.
  - Recenser les cas UI utilisateur authentifie non autorise (etats, messages, redirections).
  - Produire une matrice d ecarts priorisee pour les sessions suivantes du bloc.
- Contraintes specifiques :
  - Session documentaire/audit uniquement : aucun patch code applicatif.
  - Ne pas elargir vers permissions API profondes (traitees bloc DEV-V2-02).

## Controles a executer
- git status --short
- Controles techniques selon le perimetre : npm run lint, npm run build (uniquement si code modifie)
- Controle de diff : git diff -- docs/2-SESSIONS/BLOC_DEV-V2-01
- Controle encodage docs : npm run docs:encoding si disponible

## Preuves attendues
- Liste des fichiers lus.
- Liste des fichiers modifies/crees/supprimes.
- Resultat des commandes executees.
- Extrait de diff des fichiers concernes.
- Signalement explicite des informations non fournies.

## Format de reponse obligatoire
1. Resume court
2. Fichiers lus
3. Fichiers modifies
4. Fichiers crees
5. Fichiers non modifies
6. Changements realises
7. Controles executes avec resultats
8. Sequences suspectes restantes (mojibake) avec fichier/ligne
9. git status --short
10. Points a confirmer
11. Verdict final

## Verdict final obligatoire
- OBJECTIF UNIQUE ATTEINT : OUI / NON
- PERIMETRE RESPECTE : OUI / NON
- PREUVES FOURNIES ET VERIFIABLES : OUI / NON
- VALIDATION EXPLICITE (AUCUNE IMPLICITE) : OUI / NON