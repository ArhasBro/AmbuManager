# TEMPLATE_SESSION.md - OUVERTURE

## Identite de session
- Session : CLOTURE_DEV-V2-01
- Type : CLOTURE
- Responsable : Codex
- Statut : PREPAREE - NON DEMARREE
- Date de preparation : 2026-05-28

## Role attendu de Codex
- Produire dans le repo, strictement dans le perimetre autorise.
- Appliquer 1 session = 1 objectif unique.
- Ne jamais conclure par validation implicite.

## Objectif unique
- Objectif : Clore officiellement le bloc DEV-V2-01 avec verification des preuves, controles et criteres de validation du bloc.

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
  - docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-CLOTURE_DEV-V2-01/SESSION.md
- Limites :
  - Inclus :
  - Consolidation et decision de cloture du bloc DEV-V2-01.
  - Synthese des preuves et controles du bloc.
  - Exclu :
  - Aucun changement code hors correctif critique explicitement justifie.
  - Aucune decision sur un autre bloc DEV-V2.

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
  - Relire les livrables et verdicts des sessions DEV-V2-01-01 a DEV-V2-01-07.
  - Verifier que les criteres du bloc sont satisfaits sans ecart critique ouvert.
  - Consolider le verdict final de bloc (pret/non pret pour bloc suivant).
  - Documenter explicitement le passage recommande vers DEV-V2-02.
- Contraintes specifiques :
  - Aucune ouverture de nouveau chantier technique.
  - Decision explicite obligatoire : OUI/NON sur la cloture du bloc.

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