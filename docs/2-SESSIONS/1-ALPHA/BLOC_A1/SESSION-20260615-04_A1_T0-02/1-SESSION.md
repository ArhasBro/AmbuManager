# 1 - Session

## 1. Identification

- Session : SESSION-20260615-04_A1_T0-02
- Date : 15/06/2026
- Phase : 1-ALPHA
- Bloc : A1 / T0 - Gouvernance P1
- Type : CADRAGE
- Intitule : Gouvernance P1

## 2. Contexte

La session T0-01 - AUDIT cible - Gouvernance P1 est consideree comme validee apres correction des preuves finales.

T0-01 a conclu que :

- `04-PLAN_DE_DEVELOPPEMENT.md` reste le plan maitre court ;
- `05-BLOCS_SESSIONS_PRODUCTION.md` reste une declinaison operationnelle lisible ;
- `05` ne doit pas devenir un second plan concurrent ;
- la chaine P1-02 a P1-07-FIX-01 est globalement coherente ;
- des questions de cadrage doivent etre traitees avant d'ouvrir proprement T2/T1 ;
- aucune session code ne doit etre lancee avant clarification T0-02.

## 3. Objectif unique

Produire un cadrage documentaire court et exploitable a partir des questions T0-01, afin de clarifier la suite T0/T2/T1 sans coder et sans modifier les MASTER actifs.

## 4. Perimetre autorise

- Creer la session T0-02 via `create_session.ps1`.
- Lire les documents de gouvernance necessaires.
- Lire la session T0-01 validee.
- Lire les sessions P1 utiles uniquement si necessaire.
- Produire un cadrage court dans les fichiers de session T0-02.
- Produire `PATCH/NO_PATCH_CODE.md`.
- Conserver ou produire `PATCH/NO_PATCH.md` si aucun patch documentaire n'est produit.
- Poser des decisions a valider par l'utilisateur.
- Proposer la session suivante logique.

## 5. Perimetre interdit

- Aucun code applicatif.
- Aucun fichier `app/`.
- Aucun fichier `lib/`.
- Aucun fichier `prisma/`.
- Aucun `package.json` ou `package-lock.json`.
- Aucun fichier Base44.
- Aucun fichier MASTER modifie.
- Aucun renommage.
- Aucune suppression.
- Aucune migration.
- Aucun `prisma generate`.
- Aucun patch code.
- Aucun passage au developpement.
- Aucune modification de `04` ou `05` pendant T0-02.

## 6. Fichiers a lire

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/PATCH/NO_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/PATCH/NO_PATCH_CODE.md`

## 7. Fichiers modifiables

Uniquement :

- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/PATCH/NO_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/PATCH/NO_PATCH_CODE.md`

## 8. Fichiers a ne pas modifier

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/`
- `app/`
- `lib/`
- `prisma/`
- `package.json`
- `package-lock.json`

## 9. Livrable attendu

Un cadrage court en trois niveaux :

- decisions deja validees ;
- decisions recommandees mais a valider ;
- points encore ouverts.

Pour chaque question T0-01 :

- rappel de la question ;
- enjeu ;
- recommandation ;
- besoin ou non de modification documentaire ulterieure ;
- impact bloquant ou non sur T2/T1.

## 10. Controles attendus

- `git status --short` initial et final.
- `git status --short --untracked-files=all` final.
- Preuve de creation de session.
- Preuve structure session.
- Preuve absence modification code, Prisma, package, Base44 et MASTER.
- Preuve absence renommage si possible.
- Presence de `PATCH/NO_PATCH_CODE.md`.
- Presence de `PATCH/NO_PATCH.md`.
- Controle UTF-8 sans BOM des Markdown crees/modifies.
- Controle absence de sequences suspectes/mojibake.

## 11. Criteres de validation

- Aucun fichier hors session T0-02 n'est modifie par T0-02.
- Les 10 questions T0-01 sont traitees.
- Les decisions recommandees sont separees des decisions deja validees.
- Les modifications MASTER eventuelles sont seulement proposees pour une session suivante.
- La session suivante logique est proposee.

## 12. Points a confirmer

- Validation humaine des recommandations T0-02.
- Autorisation ou non d'une session T0-03 de correction documentaire.
- Passage a T2/T1 seulement apres validation des arbitrages necessaires.
