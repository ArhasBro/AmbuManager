# 1 - Session

## 1. Identification

- Session : SESSION-20260613-04_A1_P1-04
- Code session : P1-04
- Date : 13/06/2026
- Phase : PHASE 1 - Structuration du plan de reprise Base44
- Bloc script : A1
- Type : CADRAGE
- Intitule : Preparation refonte ciblee plan developpement

## 2. Objectif

Preparer la future modification ou refonte ciblee de `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`, sans modifier ce MASTER pendant P1-04.

La session documente ce que le futur plan devra reprendre de P1-02/P1-03, ce que l'ancien plan ne doit plus imposer, les blocs obsoletes, la nouvelle logique de reprise operationnelle et la session suivante recommandee pour modifier reellement le MASTER.

## 3. Perimetre autorise

- Creer la session P1-04 via `create_session.ps1`.
- Lire les documents obligatoires listes dans la demande.
- Inventorier les pages Base44 et les entites Base44 utiles.
- Renseigner uniquement les fichiers de session P1-04.
- Conserver `PATCH/NO_PATCH.md` comme preuve d'absence de patch code.

## 4. Hors perimetre

- Ne pas modifier le code.
- Ne pas modifier `app/`, `lib/`, `prisma/`, `package.json` ou `package-lock.json`.
- Ne pas lancer de migration.
- Ne pas lancer de lint, build ou tests, car aucune modification code n'est produite.
- Ne modifier aucun MASTER actif.
- Ne modifier aucun fichier dans `docs/1-MASTER/`.
- Ne modifier aucune reference Base44.
- Ne pas creer de nouveau plan MASTER.
- Ne pas refondre le plan de developpement dans cette session.
- Ne pas renommer de fichier.
- Ne pas produire de patch code.

## 5. Rappel P1-01 / P1-02 / P1-03

P1-01 a etabli l'audit initial : repo officiel comme source technique finale, Base44 comme reference prototype, correspondances page par page, sujets transversaux, anciens blocs a remplacer et premiere proposition de blocs de reprise.

P1-02 a transforme cet audit en proposition structuree de plan de reprise : blocs transversaux, blocs page, validations finales, dependances, ordre logique et sessions unitaires.

P1-03 a integre les decisions humaines post-P1-02. Elle acte que P1-02 devient la base officielle de reprise operationnelle, mais que `04-PLAN_DE_DEVELOPPEMENT.md` doit etre modifie ou refait ulterieurement dans une session dediee.

## 6. Base officielle de reprise

La base officielle de reprise operationnelle est P1-02, telle qu'arbitree et completee par P1-03.

Le plan MASTER actuel reste actif tant qu'il n'est pas modifie, mais il ne doit plus imposer les anciennes logiques contraires aux decisions humaines P1-03. La future session MASTER devra realigner `04-PLAN_DE_DEVELOPPEMENT.md` sur P1-02/P1-03.

## 7. Decisions humaines integrees

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
13. Les preferences Dashboard sont a reprendre plus tard, apres fiabilisation du dashboard comme portail et stabilisation des donnees sources.
14. Les contacts societe multiples sont valides.
15. `Se souvenir de moi` est valide comme fonctionnalite a prevoir.
16. L'ordre global P1-02 est valide.
17. Les anciens blocs/logiques sont obsoletes pour le plan principal, car un nouveau plan est en cours de construction.

## 8. Analyse du besoin de refonte ciblee

`04-PLAN_DE_DEVELOPPEMENT.md` contient encore une structure par blocs 1 a 15 issue du cadrage precedent. Cette structure reste utile historiquement, mais elle ne reflete plus correctement les arbitrages P1-02/P1-03.

Le futur plan doit donc etre modifie ou refait de maniere ciblee pour :

- acter P1-02 comme base operationnelle ;
- integrer les decisions humaines P1-03 ;
- distinguer clairement blocs transversaux, blocs page, bloc RGPD/Privacy et blocs de validation ;
- retirer l'autorite operationnelle des anciens blocs/logiques ;
- expliciter que les routes code restent anglaises tant que les renommages techniques ne sont pas confirmes ;
- conserver les libelles UI francais ;
- traiter `Suivi des vehicules` en hybride ;
- placer Dashboard apres fiabilisation des donnees sources ;
- placer Privacy dans le bloc RGPD visible en Alpha ;
- cadrer le RBAC en progressif.

## 9. Parties probables du MASTER a reprendre plus tard

Sections de `04-PLAN_DE_DEVELOPPEMENT.md` a reprendre lors d'une session dediee :

- sommaire ;
- principe de lecture du plan ;
- etat de depart de la reprise ;
- regles operationnelles du plan ;
- phases globales du projet ;
- phase actuelle ;
- blocs de reprise prevus ;
- statut des blocs ;
- dependances importantes ;
- controles attendus par type de bloc ;
- prochaine session a preparer ;
- prochaines decisions a prendre ;
- regles de mise a jour du plan.

La section `Blocs de reprise prevus` est la plus impactee : elle doit probablement passer des blocs 1 a 15 vers une structure P1-02/P1-03.

## 10. Anciennes logiques obsoletes pour le plan principal

Logiques a ne plus imposer comme plan principal :

- anciens blocs 1 a 15 comme ordre operationnel obligatoire ;
- anciens codes `DEV-B44-*` comme plan d'execution ;
- ancien cadrage oriente `Phase 5` ;
- blocs Base44 A a L comme blocs officiels de reprise ;
- logique route francisee par defaut cote code ;
- traitement de `Suivi des vehicules` comme page autonome simple sans statut hybride ;
- traitement de Privacy comme page Base44 classique ;
- Dashboard trop tot, avant stabilisation des donnees sources ;
- preferences Dashboard comme priorite immediate ;
- RBAC comme bloc monolithique a finaliser d'un coup ;
- contacts societe multiples comme point encore optionnel non arbitre ;
- `Se souvenir de moi` comme decision ouverte.

Ces elements peuvent rester cites comme historique, mais ils ne doivent plus piloter le plan principal.

## 11. Structure cible proposee du futur plan

Structure cible recommandee pour le futur `04-PLAN_DE_DEVELOPPEMENT.md` :

1. Role du document et source de verite operationnelle.
2. Contexte de reprise : P1-01, P1-02, P1-03.
3. Decisions humaines integrees.
4. Regles operationnelles du plan.
5. Conventions routes/libelles/renommages.
6. Structure P1 cible : blocs transversaux, blocs page, RGPD/Privacy, validations finales.
7. Statut et dependances des blocs.
8. Ordre de reprise valide.
9. Sessions recommandees par bloc.
10. Controles attendus par type de session.
11. Anciennes logiques declarees obsoletes.
12. Decisions restant a confirmer.
13. Prochaine session operationnelle.
14. Regles de mise a jour du plan.

## 12. Ordre logique des futurs blocs/sessions

Ordre global a reprendre depuis P1-02, avec les decisions P1-03 :

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
14. P-VEHICLE-FOLLOWUP - Suivi des vehicules en statut hybride.
15. P-TEMPLATES - Modeles horaires, route technique stable tant que renommage non confirme.
16. P-PLANNING - Planning.
17. P-AUDIT - Audit / Tracabilite.
18. P-DASHBOARD - Tableau de bord comme portail fiable, preferences plus tard.
19. P-ONBOARDING - Mise en route, route technique stable tant que renommage non confirme.
20. RGPD-PRIVACY - Privacy visible en Alpha, rattache au bloc RGPD.
21. F1 - Validation fonctionnelle croisee.
22. F2 - Validation qualite technique.
23. F3 - Validation UX visuelle.
24. F4 - Cloture documentaire Alpha ou cloture de phase.

## 13. Points a confirmer avant modification reelle du MASTER

- Modifier le MASTER existant ou le reecrire largement dans le meme fichier actif.
- Niveau de detail attendu pour les sessions recommandees par bloc.
- Nom exact du bloc RGPD/Privacy.
- Statut documentaire exact des anciens blocs 1 a 15 : archive dans section historique ou suppression du corps operationnel.
- Strategie de presentation des renommages techniques futurs `templates` et `onboarding`.
- Niveau de granularite initial du RBAC progressif.
- Formulation exacte de la prochaine session apres modification MASTER.

## 14. Session suivante recommandee

Session suivante recommandee :

`P1-05 - DOCUMENTATION - Refonte ciblee du plan de developpement MASTER`

Objectif propose :

- modifier reellement `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md` ;
- reprendre P1-02/P1-03 comme base ;
- remplacer les anciennes logiques obsoletes ;
- integrer la structure cible preparee par P1-04 ;
- prouver l'absence de modification code et Base44.

Cette session P1-05 devra etre explicitement autorisee a modifier `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`.
