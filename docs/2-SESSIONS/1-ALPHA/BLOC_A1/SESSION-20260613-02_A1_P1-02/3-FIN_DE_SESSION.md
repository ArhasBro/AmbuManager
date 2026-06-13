# 3 - Fin de session

## 1. Resume court

La session P1-02 transforme l'audit P1-01 en proposition de plan P1 de reprise Base44.

Le plan propose separe les sujets transversaux, les pages fonctionnelles, les validations finales et les decisions humaines encore necessaires. Aucun code n'a ete modifie. Aucun document MASTER actif n'a ete modifie. Aucun renommage n'a ete effectue.

## 2. Verdict de cadrage

P1-02 - CADRAGE PLAN FINAL REPRISE BASE44 : TERMINABLE SOUS VALIDATION HUMAINE

Le cadrage est exploitable comme proposition de remplacement des anciens plans d'execution, mais il ne modifie pas encore `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`. La mise a jour MASTER doit rester une session separee apres arbitrage humain.

## 3. Plan P1 propose

Doctrine proposee :

- conserver le repo officiel comme seule base technique finale ;
- utiliser Base44 comme reference prototype fonctionnelle, visuelle, UX et metier ;
- ne jamais copier directement le code Base44 ;
- traiter les sujets communs dans des blocs transversaux avant les pages ;
- traiter ensuite chaque page comme bloc fonctionnel autonome ;
- fermer chaque bloc page par une session de cloture obligatoire ;
- reserver les validations systeme, qualite et UX a des blocs finaux ;
- remplacer les anciens plans d'execution uniquement apres validation humaine.

## 4. Blocs transversaux proposes

### T0 - Gouvernance P1 et remplacement du plan

- Objectif : formaliser la gouvernance P1, les statuts, les dependances, les criteres et le remplacement futur des anciens plans.
- Perimetre : plan de reprise, matrice de blocs, regles de passage, preuves attendues.
- Hors perimetre : code, MASTER actifs tant que la validation humaine n'est pas donnee.
- Dependances : P1-01, P1-02.
- Livrable attendu : decision humaine de remplacement officiel et session documentaire dediee de mise a jour MASTER.
- Criteres de validation : anciens plans identifies, nouveau plan accepte, decisions ouvertes listees.
- Sessions proposees :
  - T0-01 - Validation humaine du plan P1.
  - T0-02 - Mise a jour ciblee du MASTER plan de developpement.
  - T0-03 - Cloture documentaire du cadrage P1.

### T1 - Shell global, navigation et contexte connecte

- Objectif : stabiliser la structure commune avant les pages.
- Perimetre : sidebar, topbar, societe courante, utilisateur courant, theme, navigation visible par droits, acces refuse.
- Hors perimetre : reprise detaillee des pages metier.
- Dependances : T0, decisions routes/libelles.
- Livrable attendu : shell officiel coherent, navigable et controlable.
- Criteres de validation : routes visibles coherentes, libelles metier FR, acces refuse uniforme, aucun lien mort connu.
- Sessions proposees :
  - T1-01 - Audit shell officiel vs Base44.
  - T1-02 - Correction navigation et libelles si validee.
  - T1-03 - Acces refuse et etats communs de shell.
  - T1-04 - Validation visuelle shell desktop/mobile.
  - T1-05 - Cloture bloc T1.

### T2 - Nomenclature, routes et renommages futurs

- Objectif : cadrer les conventions de nommage avant tout renommage.
- Perimetre : routes anglaises/francaises, libelles visibles, dossiers historiques `templates` et `onboarding`, conventions `company/users/vehicles`.
- Hors perimetre : renommage effectif.
- Dependances : decision humaine routes FR/EN.
- Livrable attendu : strategie de nommage validee.
- Criteres de validation : chaque route litigieuse a un statut, impact API/UI/documentation liste.
- Sessions proposees :
  - T2-01 - Audit des routes et noms historiques.
  - T2-02 - Arbitrage humain routes/libelles.
  - T2-03 - Plan de renommage eventuel sans execution.
  - T2-04 - Cloture bloc T2.

### T3 - Design system officiel et composants communs

- Objectif : stabiliser les composants communs du repo officiel avant reprise page par page.
- Perimetre : `app/ui`, PageHeader, boutons, cartes, badges, tables, filtres, etats vides/erreur/loading, patterns de formulaires.
- Hors perimetre : import ou copie des composants Base44.
- Dependances : T1, T2.
- Livrable attendu : inventaire et ecarts du design system officiel, puis corrections ciblees si validees.
- Criteres de validation : composants communs suffisants, reutilisables, controles visuels effectues si UI modifiee.
- Sessions proposees :
  - T3-01 - Audit design system officiel vs besoins Base44.
  - T3-02 - Completion composants manquants prioritaires.
  - T3-03 - Harmonisation etats empty/loading/error.
  - T3-04 - Validation visuelle composants communs.
  - T3-05 - Cloture bloc T3.

### T4 - RBAC UI/API et matrice permissions

- Objectif : cadrer et controler les droits avant les modules sensibles.
- Perimetre : matrice permissions, helpers serveur, filtrage navigation, acces pages, API, actions sensibles.
- Hors perimetre : decisions metier non confirmees.
- Dependances : T1, T2, decisions granularite RBAC.
- Livrable attendu : matrice RBAC minimale officielle et controles associes.
- Criteres de validation : aucune page sensible sans controle serveur/API, permissions documentees, non-contournement teste.
- Sessions proposees :
  - T4-01 - Audit RBAC officiel existant.
  - T4-02 - Matrice RBAC minimale par module.
  - T4-03 - Controle API et non-contournement.
  - T4-04 - Controle UI et navigation par droits.
  - T4-05 - Cloture bloc T4.

### T5 - Donnees, multi-tenant et mapping Base44 vers officiel

- Objectif : comparer les entites Base44 utiles avec le modele officiel sans modifier Prisma.
- Perimetre : User, Company, CompanyContact, DashboardPreference, Depot, Vehicle, VehicleCheck, Disinfection, VehicleAnomaly, ShiftTemplate, PlanningEntry, AuditLog, OnboardingStep.
- Hors perimetre : migration, modification schema, generation Prisma.
- Dependances : T0, T4.
- Livrable attendu : matrice entites/champs/decisions et sessions Prisma futures si necessaires.
- Criteres de validation : chaque donnee Base44 utile est acceptee, refusee ou marquee `INFORMATION NON FOURNIE - A CONFIRMER`.
- Sessions proposees :
  - T5-01 - Audit mapping entites Base44/officiel.
  - T5-02 - Decisions donnees Alpha.
  - T5-03 - Plan Prisma eventuel sans migration.
  - T5-04 - Cloture bloc T5.

### T6 - Audit et tracabilite transverse

- Objectif : definir les actions sensibles a tracer avant et pendant les blocs metier.
- Perimetre : creation, modification, archivage, restauration, reset password, planning, exports, permissions, actions support.
- Hors perimetre : implementation page Audit detaillee.
- Dependances : T4, cartographie des pages.
- Livrable attendu : contrat d'audit transversal.
- Criteres de validation : acteur, societe, action, cible et resultat identifies pour les actions sensibles.
- Sessions proposees :
  - T6-01 - Cartographie actions sensibles.
  - T6-02 - Contrat d'audit minimal.
  - T6-03 - Controle implementation existante.
  - T6-04 - Cloture bloc T6.

### T7 - Qualite, tests et controles de reprise

- Objectif : definir les controles recurrents pour les sessions code futures.
- Perimetre : lint, build, tests cibles, controle navigateur, controle responsive, encodage, preuves Git.
- Hors perimetre : execution systematique hors modification code.
- Dependances : T0.
- Livrable attendu : grille de DoD par type de session.
- Criteres de validation : chaque type de bloc a ses controles attendus et ses exceptions documentees.
- Sessions proposees :
  - T7-01 - Grille qualite par type de bloc.
  - T7-02 - Modele de preuves code/UI/API.
  - T7-03 - Cloture bloc T7.

## 5. Blocs page proposes

### P-LOGIN - Connexion / authentification

- Route officielle actuelle si connue : `/login`.
- Correspondance Base44 si connue : `/login`, `Login.jsx`.
- Objectif : finaliser le parcours de connexion officiel, redirections et messages.
- Perimetre : formulaire, erreurs, redirection `/dashboard`, lien privacy, `Se souvenir de moi`.
- Hors perimetre : inscription libre, MFA, mot de passe oublie si non valide.
- Dependances : T1, T4, decision `Se souvenir de moi`.
- Points de vigilance : Login Base44 declare non conforme visuel ; ne pas le copier.
- Renommages potentiels : aucun identifie.
- Sessions proposees :
  - P-LOGIN-01 - Audit login officiel vs references.
  - P-LOGIN-02 - Correction UX/auth si validee.
  - P-LOGIN-03 - Validation auth et redirections.
  - P-LOGIN-99 - Cloture Login.

### P-COMPANY - Societe

- Route officielle actuelle si connue : `/company`.
- Correspondance Base44 si connue : `/societe`, `Societe.jsx`.
- Objectif : stabiliser le profil societe, les regles et les contacts si confirmes.
- Perimetre : company courante, profil, regles metier, contacts societe eventuels, multi-tenant.
- Hors perimetre : facturation, abonnement, multi-societe non cadre.
- Dependances : T4, T5, decision contacts societe.
- Points de vigilance : Base44 utilise une logique prototype `Company.list(..., 1)` ; le repo officiel doit rester strict par `companyId`.
- Renommages potentiels : `/company` vers `/societe` a arbitrer plus tard, sans execution.
- Sessions proposees :
  - P-COMPANY-01 - Audit Societe officiel vs Base44.
  - P-COMPANY-02 - Cadrage contacts societe.
  - P-COMPANY-03 - Corrections profil/regles si validees.
  - P-COMPANY-04 - Validation multi-tenant et droits.
  - P-COMPANY-99 - Cloture Societe.

### P-DEPOTS - Depots / Bases

- Route officielle actuelle si connue : `/depots`.
- Correspondance Base44 si connue : `/depots`, `Depots.jsx`.
- Objectif : stabiliser le referentiel des bases.
- Perimetre : creation, modification, statut, archivage/restauration, compteurs et rattachements.
- Hors perimetre : geolocalisation avancee, contraintes planning non cadrees.
- Dependances : T4, T5, P-COMPANY.
- Points de vigilance : dependance planning et utilisateurs/RH.
- Renommages potentiels : libelle `Depots / bases` a uniformiser ; route deja compatible.
- Sessions proposees :
  - P-DEPOTS-01 - Audit depots officiel vs Base44.
  - P-DEPOTS-02 - Correction cycle de vie depots.
  - P-DEPOTS-03 - Validation rattachements/compteurs/droits.
  - P-DEPOTS-99 - Cloture Depots.

### P-USERS-RH - Utilisateurs / RH

- Route officielle actuelle si connue : `/users`.
- Correspondance Base44 si connue : `/utilisateurs`, `Utilisateurs.jsx`.
- Objectif : stabiliser utilisateurs, RH, roles, absences, acces applicatif et actions sensibles.
- Perimetre : fiches RH, compte applicatif, roles, permissions, depot, absences, reset password, archivage.
- Hors perimetre : paie, contrats, SIRH avance.
- Dependances : T4, T5, P-DEPOTS.
- Points de vigilance : separation fiche RH / acces applicatif reprise dans Base44, granularite RBAC a confirmer.
- Renommages potentiels : `/users` vers `/utilisateurs` a arbitrer plus tard, sans execution.
- Sessions proposees :
  - P-USERS-01 - Audit Utilisateurs/RH officiel vs Base44.
  - P-USERS-02 - Cadrage fiche RH vs compte applicatif.
  - P-USERS-03 - Corrections roles/acces/absences.
  - P-USERS-04 - Validation RBAC et audit actions sensibles.
  - P-USERS-99 - Cloture Utilisateurs/RH.

### P-VEHICLES - Vehicules

- Route officielle actuelle si connue : `/vehicles`.
- Correspondance Base44 si connue : `/vehicules`, `Vehicules.jsx`.
- Objectif : stabiliser le referentiel administratif flotte.
- Perimetre : type, immatriculation, statut, disponibilite, depot principal, archivage/restauration, audit.
- Hors perimetre : verifications, desinfections, anomalies si module suivi autonome retenu.
- Dependances : T4, T5, P-DEPOTS.
- Points de vigilance : doit preceder suivi vehicules et planning.
- Renommages potentiels : `/vehicles` vers `/vehicules` a arbitrer plus tard, sans execution.
- Sessions proposees :
  - P-VEHICLES-01 - Audit Vehicules officiel vs Base44.
  - P-VEHICLES-02 - Correction referentiel et disponibilite.
  - P-VEHICLES-03 - Validation archivage/restauration/RBAC/audit.
  - P-VEHICLES-99 - Cloture Vehicules.

### P-VEHICLE-FOLLOWUP - Suivi des vehicules

- Route officielle actuelle si connue : INFORMATION NON FOURNIE - A CONFIRMER.
- Correspondance Base44 si connue : `/suivi-vehicules`, `SuiviVehicules.jsx`.
- Objectif : cadrer puis implementer ou integrer le suivi operationnel flotte.
- Perimetre : vue ensemble, verifications, desinfections, anomalies, liens avec indisponibilite vehicule.
- Hors perimetre : preuve mobile, signature electronique, maintenance predictive.
- Dependances : T4, T5, T6, P-VEHICLES.
- Points de vigilance : page autonome absente du repo officiel ; permissions Base44 larges ; contre-verification non habilitee techniquement dans Base44.
- Renommages potentiels : creation route future `/suivi-vehicules` ou integration dans `/vehicles` a arbitrer.
- Sessions proposees :
  - P-FOLLOWUP-01 - Decision humaine statut page autonome/sous-module/hybride.
  - P-FOLLOWUP-02 - Cadrage donnees et permissions.
  - P-FOLLOWUP-03 - Plan API/UI sans migration si Prisma incertain.
  - P-FOLLOWUP-04 - Implementation ciblee si validee.
  - P-FOLLOWUP-05 - Validation metier/RBAC/audit.
  - P-FOLLOWUP-99 - Cloture Suivi des vehicules.

### P-TEMPLATES - Modeles horaires

- Route officielle actuelle si connue : `/templates`.
- Correspondance Base44 si connue : `/modeles-horaires`, `ModelesHoraires.jsx`.
- Objectif : aligner le referentiel des modeles horaires avec la terminologie active.
- Perimetre : creation, modification, horaires optionnels, statut, archivage, dependance planning.
- Hors perimetre : renommage route/dossiers sans decision.
- Dependances : T2, T4, T5, P-DEPOTS.
- Points de vigilance : terme actif `Modeles horaires`, pas `Templates`.
- Renommages potentiels : `templates` vers `modeles-horaires` a cadrer en session dediee.
- Sessions proposees :
  - P-TEMPLATES-01 - Audit Modeles horaires officiel vs Base44.
  - P-TEMPLATES-02 - Decision renommage route/dossiers/API.
  - P-TEMPLATES-03 - Corrections fonctionnelles referentiel.
  - P-TEMPLATES-04 - Validation planning compatibility.
  - P-TEMPLATES-99 - Cloture Modeles horaires.

### P-PLANNING - Planning

- Route officielle actuelle si connue : `/planning`.
- Correspondance Base44 si connue : `/planning`, `Planning.jsx`.
- Objectif : reprendre le planning apres stabilisation des donnees sources.
- Perimetre : vues globale/personnelle/mois/semaine/jour, affectations, publication, annulation logique, exports, droits, audit.
- Hors perimetre : automatisation avancee non necessaire Alpha, agenda heure par heure si non valide.
- Dependances : T4, T5, T6, P-DEPOTS, P-USERS-RH, P-VEHICLES, P-TEMPLATES, P-VEHICLE-FOLLOWUP si impact disponibilite.
- Points de vigilance : module le plus complexe ; Base44 ne valide pas le planning officiel complet.
- Renommages potentiels : aucun identifie.
- Sessions proposees :
  - P-PLANNING-01 - Audit planning officiel vs Base44/fiches.
  - P-PLANNING-02 - Cadrage donnees sources et eligibilite.
  - P-PLANNING-03 - Correction vues et affectations.
  - P-PLANNING-04 - Publication/annulation/export.
  - P-PLANNING-05 - Validation RBAC/audit/non-regression.
  - P-PLANNING-99 - Cloture Planning.

### P-AUDIT - Audit / Tracabilite

- Route officielle actuelle si connue : `/audit`.
- Correspondance Base44 si connue : `/audit`, `Audit.jsx`.
- Objectif : garantir consultation et exploitation des traces.
- Perimetre : lecture audit, filtres, droits, actions sensibles tracees par les modules.
- Hors perimetre : SIEM, retention RGPD complete non confirmee.
- Dependances : T6 et premiers blocs metier.
- Points de vigilance : l'audit doit etre alimente par les actions serveur officielles, pas seulement par l'UI.
- Renommages potentiels : aucun identifie.
- Sessions proposees :
  - P-AUDIT-01 - Audit page Audit officielle vs Base44.
  - P-AUDIT-02 - Controle traces actions sensibles.
  - P-AUDIT-03 - Validation filtres/droits/lecture seule.
  - P-AUDIT-99 - Cloture Audit.

### P-DASHBOARD - Tableau de bord

- Route officielle actuelle si connue : `/dashboard`.
- Correspondance Base44 si connue : `/`, `Dashboard.jsx`.
- Objectif : reprendre le dashboard apres stabilisation des modules sources.
- Perimetre : KPI reels, widgets, raccourcis autorises, informations profil, preferences si confirmees.
- Hors perimetre : reporting analytique avance.
- Dependances : T1, T3, T4, P-COMPANY, P-DEPOTS, P-USERS-RH, P-VEHICLES, P-TEMPLATES, P-PLANNING.
- Points de vigilance : dashboard depend des donnees sources ; preferences Base44 via `DashboardPreference` a confirmer.
- Renommages potentiels : libelle navigation `Dashboard` vers `Tableau de bord` ; route `/dashboard` a arbitrer.
- Sessions proposees :
  - P-DASHBOARD-01 - Audit Dashboard officiel vs Base44.
  - P-DASHBOARD-02 - Decision preferences dashboard.
  - P-DASHBOARD-03 - Correction KPI/raccourcis/widgets.
  - P-DASHBOARD-04 - Validation droits et donnees reelles.
  - P-DASHBOARD-99 - Cloture Tableau de bord.

### P-ONBOARDING - Mise en route

- Route officielle actuelle si connue : `/onboarding`.
- Correspondance Base44 si connue : `/mise-en-route`, `MiseEnRoute.jsx`.
- Objectif : stabiliser l'assistant de configuration initiale apres les referentiels.
- Perimetre : checklist societe, depots, utilisateurs, vehicules, modeles, planning, liens vers modules.
- Hors perimetre : onboarding marketing, tutoriels avances.
- Dependances : P-COMPANY, P-DEPOTS, P-USERS-RH, P-VEHICLES, P-TEMPLATES, P-PLANNING.
- Points de vigilance : terme actif `Mise en route`, pas `Onboarding`; Base44 n'utilise pas forcement `OnboardingStep` malgre l'entite presente.
- Renommages potentiels : `onboarding` vers `mise-en-route` a cadrer en session dediee.
- Sessions proposees :
  - P-ONBOARDING-01 - Audit Mise en route officiel vs Base44.
  - P-ONBOARDING-02 - Decision renommage route/dossiers.
  - P-ONBOARDING-03 - Correction checklist et liens.
  - P-ONBOARDING-04 - Validation dependances.
  - P-ONBOARDING-99 - Cloture Mise en route.

### P-PRIVACY - Mentions d'information

- Route officielle actuelle si connue : `/privacy`.
- Correspondance Base44 si connue : INFORMATION NON FOURNIE - A CONFIRMER.
- Objectif : decider si Privacy reste une page Alpha, un bloc RGPD/qualite ou un livrable hors reprise Base44.
- Perimetre : page d'information, lien login, coherence RGPD minimale.
- Hors perimetre : conformite RGPD complete.
- Dependances : decision place de `Privacy`, RGPD.
- Points de vigilance : contenu legal actuel peut contenir des donnees placeholders ; Base44 ne fournit pas de correspondance.
- Renommages potentiels : aucun identifie.
- Sessions proposees :
  - P-PRIVACY-01 - Decision place de Privacy.
  - P-PRIVACY-02 - Audit contenu RGPD minimal si maintenue.
  - P-PRIVACY-03 - Correction ciblee si validee.
  - P-PRIVACY-99 - Cloture Privacy ou report explicite.

## 6. Blocs finaux proposes

### F1 - Validation fonctionnelle croisee

- Objectif : verifier les parcours transverses apres les blocs pages.
- Perimetre : navigation, permissions, donnees sources, liens dashboard, planning, audit, mise en route.
- Sessions proposees : F1-01 parcours admin/gerant, F1-02 parcours bureau/regulateur, F1-03 parcours terrain, F1-99 cloture fonctionnelle.

### F2 - Validation qualite technique

- Objectif : verifier la qualite technique de l'Alpha apres reprise.
- Perimetre : lint, build, tests cibles, Prisma validate/generate si schema touche dans des sessions futures, preuves Git.
- Sessions proposees : F2-01 lint/build, F2-02 controles API/RBAC, F2-03 controles donnees/multi-tenant, F2-99 cloture qualite.

### F3 - Validation UX visuelle

- Objectif : verifier l'ergonomie et la coherence visuelle par rapport aux references utiles.
- Perimetre : desktop, mobile, shell, pages critiques, etats vides/erreur/loading.
- Sessions proposees : F3-01 shell et navigation, F3-02 pages referentiels, F3-03 planning/dashboard/login, F3-99 cloture UX.

### F4 - Cloture documentaire Alpha ou cloture de phase

- Objectif : clore la phase Alpha ou acter les reports.
- Perimetre : preuves, restes acceptes, decisions, MASTER, prochaines phases.
- Sessions proposees : F4-01 audit documentaire final, F4-02 mise a jour MASTER si validee, F4-99 cloture Alpha/phase.

## 7. Ordre recommande

Ordre propose :

1. T0 - Gouvernance P1 et remplacement du plan.
2. T2 - Nomenclature, routes et renommages futurs.
3. T1 - Shell global, navigation et contexte connecte.
4. T3 - Design system officiel et composants communs.
5. T4 - RBAC UI/API et matrice permissions.
6. T5 - Donnees, multi-tenant et mapping Base44 vers officiel.
7. T6 - Audit et tracabilite transverse.
8. T7 - Qualite, tests et controles de reprise.
9. P-LOGIN - Connexion.
10. P-COMPANY - Societe.
11. P-DEPOTS - Depots / Bases.
12. P-USERS-RH - Utilisateurs / RH.
13. P-VEHICLES - Vehicules.
14. P-VEHICLE-FOLLOWUP - Suivi des vehicules.
15. P-TEMPLATES - Modeles horaires.
16. P-PLANNING - Planning.
17. P-AUDIT - Audit / Tracabilite.
18. P-DASHBOARD - Tableau de bord.
19. P-ONBOARDING - Mise en route.
20. P-PRIVACY - Privacy si maintenue.
21. F1 - Validation fonctionnelle croisee.
22. F2 - Validation qualite technique.
23. F3 - Validation UX visuelle.
24. F4 - Cloture documentaire Alpha ou cloture de phase.

Justification :

- Les transversaux evitent les corrections redondantes page par page.
- Les routes et libelles doivent etre arbitres avant navigation et renommages.
- RBAC et audit doivent preceder les actions sensibles.
- Les modules sources precedent le dashboard.
- Company, depots, utilisateurs, vehicules et modeles horaires precedent planning.
- Suivi vehicules doit etre cadre avant implementation, car la route officielle est absente ou non prouvee.
- Dashboard et mise en route doivent arriver apres les donnees qu'ils synthetisent.

## 8. Dependances principales

- T0 conditionne toute mise a jour MASTER.
- T2 conditionne les renommages futurs.
- T1 conditionne la navigation et les controles d'acces visibles.
- T4 conditionne tous les modules sensibles.
- T5 conditionne les modules dont les donnees Base44 n'existent pas clairement dans l'officiel.
- P-DEPOTS, P-USERS-RH, P-VEHICLES et P-TEMPLATES conditionnent P-PLANNING.
- P-PLANNING et les referentiels conditionnent P-DASHBOARD et P-ONBOARDING.
- T6 et P-AUDIT dependent des actions sensibles cartographiees dans les blocs metier.

## 9. Anciens blocs obsoletes

Ne plus utiliser comme plan d'execution principal :

- anciens codes `DEV-B44-*` cites dans les audits historiques ;
- ancien cadrage oriente `Phase 5` ;
- blocs Base44 A a L comme blocs d'analyse prototype ;
- blocs MASTER actuels 1 a 15 comme plan final d'execution sans restructuration.

Ces elements restent des sources de contexte. Ils ne doivent pas etre supprimes dans cette session.

## 10. Decisions humaines necessaires

- Routes anglaises ou routes francaises.
- Statut de `Suivi des vehicules` : page autonome, sous-module `Vehicules`, ou hybride.
- Strategie de renommage `templates` / `modeles-horaires`.
- Strategie de renommage `onboarding` / `mise-en-route`.
- Place de `Privacy` : page Alpha, bloc RGPD/qualite, ou hors reprise Base44.
- Granularite RBAC par module et action sensible.
- Reprise des preferences dashboard.
- Reprise des contacts societe.
- Remplacement officiel des anciens plans dans le MASTER.
- Comportement exact de `Se souvenir de moi` : INFORMATION NON FOURNIE - A CONFIRMER.
- Politique RGPD complete : INFORMATION NON FOURNIE - A CONFIRMER.

## 11. Fichiers a renommer plus tard, sans renommage effectue

- `app/templates/`, `app/api/templates/`, `lib/templates/` si `modeles-horaires` est retenu.
- `app/onboarding/` si `mise-en-route` est retenu.
- `app/company/` si `/societe` est retenu.
- `app/users/` si `/utilisateurs` est retenu.
- `app/vehicles/` si `/vehicules` est retenu.
- `app/a24-vehicles-templates.css`, `app/a24-users-rh.css`, `app/a24-complementary-pages.css` si une normalisation CSS future est validee.

Aucun renommage n'a ete effectue pendant P1-02.

## 12. Confirmation absence code

- Modification code : NON.
- Modification `app/` : NON.
- Modification `lib/` : NON.
- Modification `prisma/` : NON.
- Modification `package.json` : NON.
- Modification `package-lock.json` : NON.
- Migration : NON.
- Patch code : NON.

## 13. Confirmation absence MASTER modifie

Les documents MASTER actifs et la reference Base44 ont ete lus mais non modifies.

## 14. Prochaine session recommandee

Prochaine session recommandee :

`P1-03 - VALIDATION HUMAINE - Arbitrages du plan P1`

Objectif :

- valider ou ajuster les blocs proposes ;
- trancher les decisions humaines bloquantes ;
- autoriser ou refuser la session documentaire separee de mise a jour de `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`.

## 15. Verdict final

P1-02 - CADRAGE PLAN FINAL REPRISE BASE44 : TERMINE

- PLAN P1 PROPOSE : OUI
- BLOCS TRANSVERSAUX PROPOSES : OUI
- BLOCS PAGE PROPOSES : OUI
- DEPENDANCES PROPOSEES : OUI
- SESSIONS UNITAIRES PROPOSEES : OUI
- MODIFICATION CODE : NON
- RENOMMAGE EFFECTUE : NON
- MASTER MODIFIES : NON
- SESSION SUIVANTE PROPOSEE : OUI
