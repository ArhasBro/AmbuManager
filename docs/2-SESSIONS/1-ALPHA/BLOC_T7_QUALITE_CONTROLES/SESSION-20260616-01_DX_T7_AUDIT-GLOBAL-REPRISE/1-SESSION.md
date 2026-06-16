# 1 - Session

## 1. Identification

- Session : SESSION-20260616-01_DX_T7_AUDIT-GLOBAL-REPRISE
- Date : 16/06/2026
- Phase : 1-ALPHA
- Bloc : T7
- Type : DX
- Intitule : Audit global de reprise

## 2. Contexte

Projet : Investissement
Sous-projet : Ambulance Manager

Cette session est une session DX de cadrage de reprise. Elle sert a etablir un ordre realiste d'ouverture des audits cibles avant toute nouvelle session CX.

## 3. Objectif unique

Realiser un audit global leger de reprise pour determiner :

- l'ordre recommande des audits cibles ;
- les blocs prets a auditer ;
- les dependances bloquantes ;
- les risques principaux ;
- les zones du repo officiel presentes mais non validees ;
- les zones Base44 utiles comme reference prototype ;
- les ajustements documentaires proposes dans `04` ou `05`, sans application directe.

## 4. Perimetre autorise

Lecture :

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/1-MASTER/RGPD_BASE_MINIMALE.md`
- `docs/1-MASTER/1-MAQUETTE/`
- `docs/1-MASTER/2-REFERENCE_UI_UX/`
- `docs/1-MASTER/3-FONCTIONNALITES/`
- `docs/1-MASTER/4-BASE44_REFERENCE/`
- `docs/1-MASTER/5-AUDIT/`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/2-SESSIONS/1-ALPHA/`
- `docs/3-TEMPLATES/`
- `app/`, `lib/`, `prisma/`, `types/`, `scripts/`, `public/`
- fichiers de configuration utiles, dont `package.json`

Ecriture :

- dossier de session `docs/2-SESSIONS/1-ALPHA/BLOC_T7_QUALITE_CONTROLES/SESSION-20260616-01_DX_T7_AUDIT-GLOBAL-REPRISE/`

## 5. Perimetre interdit

- Code applicatif.
- `app/`
- `src/` si present.
- `lib/`
- `prisma/`
- `package.json`
- `package-lock.json`
- fichiers Base44.
- PNG et maquettes.
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- templates.
- `create_session.ps1`
- creation de session FIX.
- creation de patch applicatif `.diff`.

## 6. Fichiers a lire

Voir `2-PREUVES.md`, sections 1 et 2.

## 7. Fichiers modifiables

- `1-SESSION.md`
- `2-PREUVES.md`
- `3-FIN_DE_SESSION.md`
- `PATCH/NO_PATCH.md`
- `PATCH/README_PATCH.md`

## 8. Fichiers a ne pas modifier

Tous les fichiers hors dossier de session, en particulier les fichiers applicatifs, les documents MASTER `04` et `05`, les templates, les fichiers Base44 et `create_session.ps1`.

## 9. Livrable attendu

Rapport de cadrage de reprise exploitable contenant :

- cartographie documentaire ;
- cartographie du repo officiel ;
- cartographie Base44 ;
- analyse de `04` et `05` ;
- fiche courte par bloc de `05` ;
- ordre recommande des audits cibles ;
- risques ;
- prochaine session recommandee ;
- controles et preuves.

## 10. Controles attendus

- `git status --short`.
- Inventaire des fichiers/dossiers cles.
- Controle que seules les fiches de session ont ete modifiees.
- Controle qu'aucun fichier applicatif n'a ete modifie.
- Controle qu'aucun `.diff` applicatif n'a ete cree dans cette session.
- Controle que `PATCH/NO_PATCH.md` existe.
- Controle UTF-8 sans BOM sur les fichiers de session crees/modifies.
- Recherche des quatre sequences suspectes d'encodage demandees sur les fichiers de session.

## 11. Criteres de validation

- Perimetre d'ecriture respecte.
- Aucun patch applicatif produit.
- Aucun document maitre modifie.
- Rapport suffisamment probant pour ouvrir les audits cibles.
- Informations non prouvees marquees `INFORMATION NON FOURNIE — À CONFIRMER`.

## 12. Points a confirmer

- Le fichier `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` etait deja modifie avant intervention.
- L'absence de dossier `src/` est constatee localement, mais les consignes continuent de l'inclure dans le perimetre interdit.
- Les statuts reels de fonctionnement navigateur, lint, build et tests ne sont pas valides par cette session DX.
