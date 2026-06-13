# 1 - Session

## 1. Identification

- Session : SESSION-20260613-03_A1_P1-03
- Code session : P1-03
- Date : 13/06/2026
- Phase : PHASE 1 - Structuration du plan de reprise Base44
- Bloc script : A1
- Type : CADRAGE
- Intitule : Integration des decisions humaines P1-02 et preparation du nouveau plan de reprise

## 2. Objectif de la session

Creer une session documentaire P1-03 qui integre les decisions humaines validees apres P1-02 et prepare la prochaine session de mise a jour du plan de reprise.

Cette session acte les arbitrages humains, sans coder, sans modifier les MASTER actifs, sans modifier la reference Base44 et sans renommer de fichiers.

## 3. Perimetre autorise

- Creation de la session P1-03 via `create_session.ps1`.
- Lecture ciblee de P1-01 et P1-02.
- Lecture des quatre MASTER actifs.
- Lecture des references Base44 utiles a la reprise.
- Lecture des documents de methode et templates necessaires a la structure de session.
- Redaction uniquement dans le dossier P1-03.
- Conservation de `PATCH/NO_PATCH.md` comme preuve d'absence de patch code.

## 4. Hors perimetre strict

- Ne pas modifier le code.
- Ne pas modifier `app/`.
- Ne pas modifier `lib/`.
- Ne pas modifier `prisma/`.
- Ne pas modifier `package.json`.
- Ne pas modifier `package-lock.json`.
- Ne pas modifier les MASTER actifs.
- Ne pas modifier les references Base44.
- Ne pas renommer de fichier.
- Ne pas lancer de migration.
- Ne pas lancer de refonte documentaire.
- Ne pas mettre a jour le plan de developpement MASTER dans cette session.
- Ne pas creer de nouveau plan MASTER dans cette session.

## 5. Fichiers lus

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-02_A1_P1-02/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-02_A1_P1-02/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-02_A1_P1-02/3-FIN_DE_SESSION.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/App.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/` inventorie par liste de fichiers.

## 6. Fichiers modifiables

- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-03_A1_P1-03/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-03_A1_P1-03/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-03_A1_P1-03/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-03_A1_P1-03/PATCH/NO_PATCH.md`

## 7. Decisions humaines P1-02 validees

1. Le plan P1-02 devient la base officielle de reprise operationnelle.
2. Le plan de developpement devra etre modifie ou refait ulterieurement pour reprendre correctement.
3. Les routes techniques restent stables en anglais cote code.
4. Les libelles UI doivent rester en francais.
5. Le nom produit officiel est `Modeles horaires`.
6. Le renommage technique futur `templates` vers `modeles-horaires` reste a confirmer plus tard.
7. Le nom produit officiel est `Mise en route`.
8. Le renommage technique futur `onboarding` vers `mise-en-route` reste a confirmer plus tard.
9. `Suivi des vehicules` est valide en statut hybride.
10. Privacy doit etre visible en Alpha.
11. Privacy est rattache au bloc RGPD.
12. Le RBAC est valide en mode progressif.
13. Les preferences Dashboard sont a reprendre plus tard : le dashboard doit d'abord etre fiable comme portail, puis integrer les preferences quand les donnees sources seront stables.
14. Les contacts societe multiples sont valides.
15. `Se souvenir de moi` est valide comme fonctionnalite a prevoir.
16. L'ordre global P1-02 est valide.
17. Les anciens blocs/logiques sont confirmes comme obsoletes pour le plan principal, car un nouveau plan est en cours de construction.

## 8. Consequences pour la suite

- P1-02 doit servir de base operationnelle de reprise, mais il ne remplace pas encore le MASTER `04-PLAN_DE_DEVELOPPEMENT.md`.
- Le futur plan doit conserver les routes techniques anglaises existantes tant qu'une session dediee ne valide pas un renommage.
- Les libelles visibles par les utilisateurs doivent rester en francais.
- `Modeles horaires` et `Mise en route` sont les noms produit officiels, meme si les routes actuelles restent `/templates` et `/onboarding`.
- Les renommages techniques `templates` et `onboarding` ne doivent pas etre executes sans session future dediee, impact list, controles et validation humaine.
- `Suivi des vehicules` doit etre traite comme un module hybride : rattache a la flotte, mais avec cadrage fonctionnel, donnees, droits et navigation propres.
- Privacy reste visible en Alpha, mais sa gouvernance doit etre rattachee au bloc RGPD plutot qu'a un bloc Base44 page classique.
- Le RBAC doit avancer progressivement : matrice minimale, controles serveur/API, puis granularite fine par module.
- Le dashboard doit etre d'abord fiabilise comme portail avec des donnees sources stables ; les preferences utilisateur viendront ensuite.
- Les contacts societe multiples deviennent un besoin a reprendre dans le bloc Societe.
- `Se souvenir de moi` devient une fonctionnalite a prevoir dans le bloc Login, avec cadrage securite/session.
- Les anciens blocs et anciennes logiques restent consultables comme historique, mais ne doivent plus piloter le plan principal.

## 9. Prochaine session recommandee

Prochaine session recommandee :

`P1-04 - CADRAGE DOCUMENTAIRE - Preparation de la refonte ciblee du plan de developpement MASTER`

Objectif propose :

- transformer les decisions humaines P1-03 en instructions de mise a jour du plan de developpement ;
- definir si `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md` doit etre modifie ou refait ;
- preparer la structure cible du nouveau plan sans coder ;
- lister les sections a remplacer, conserver ou declarer obsoletes ;
- conserver P1-02 comme base operationnelle et P1-03 comme registre des arbitrages humains.

Cette session suivante pourra preparer la modification du MASTER, mais la modification effective devra rester cadree et prouvee dans sa propre session si elle est autorisee.

## 10. Livrables attendus

- `1-SESSION.md` complete.
- `2-PREUVES.md` complete.
- `3-FIN_DE_SESSION.md` complete.
- `PATCH/NO_PATCH.md` present.
- Aucune modification hors dossier P1-03.
- Aucun patch code.

