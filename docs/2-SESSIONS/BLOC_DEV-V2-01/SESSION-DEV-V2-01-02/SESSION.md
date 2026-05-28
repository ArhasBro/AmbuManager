# TEMPLATE_SESSION.md - OUVERTURE

## Identite de session
- Session : DEV-V2-01-02
- Type : AUDIT
- Responsable : Codex
- Statut : PREPAREE - NON DEMARREE
- Date de preparation : 2026-05-28

## Role attendu de Codex
- Produire dans le repo, strictement dans le perimetre autorise.
- Appliquer 1 session = 1 objectif unique.
- Ne jamais conclure par validation implicite.

## Objectif unique
- Objectif : Confirmer la structure frontend partagee reelle (app/ui et components) et statuer sur la cible a conserver.

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
  - docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-02/SESSION.md
- Limites :
  - Inclus :
  - Analyse structure frontend partagee.
  - Decision de cible documentee et justifiee.
  - Exclu :
  - Aucun deplacement massif de composants.
  - Aucune refonte visuelle.

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
  - Verifier l existence et l usage actuel de app/ui.
  - Verifier l existence et l usage actuel de components (ou absence).
  - Identifier les dependances shell/navigation sur ces zones.
  - Documenter la cible de structure retenue pour les sessions suivantes.
- Contraintes specifiques :
  - Audit/cadrage seulement : pas de migration structurelle dans cette session.
  - Decision basee sur repo reel, pas sur hypothese.

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