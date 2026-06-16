# Ambulance Manager - Blocs et sessions de production

Date de refonte ciblée : 16/06/2026

## Sommaire

1. [Rôle du document](#1-rôle-du-document)
2. [Règles générales de sessions](#2-règles-générales-de-sessions)
3. [Conventions de nommage](#3-conventions-de-nommage)
4. [Doctrine de découpage après audit](#4-doctrine-de-découpage-après-audit)
5. [Modèle de fiche de bloc](#5-modèle-de-fiche-de-bloc)
6. [Historique T0 et BLOC_A1](#6-historique-t0-et-bloc_a1)
7. [Blocs transversaux](#7-blocs-transversaux)
8. [Blocs pages et modules](#8-blocs-pages-et-modules)
9. [Bloc RGPD et Privacy](#9-bloc-rgpd-et-privacy)
10. [Validations finales et gel Alpha](#10-validations-finales-et-gel-alpha)
11. [Maintenance](#11-maintenance)

## 1. Rôle du document

Ce fichier est le document opérationnel officiel des blocs et sessions de production.

`docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md` reste le plan maître court : ordre global, principes et dépendances.

Le présent fichier prépare les blocs et le futur découpage des sessions. À ce stade, il ne doit pas figer artificiellement toutes les sessions de code avant audit global ou audit bloc par bloc.

## 2. Règles générales de sessions

- `DX` = session documentaire utile au code.
- `CX` = session code, applicative ou technique.
- `DX` ou `CX` doit être visible dans le nom du dossier de session.
- Les sessions DX autorisées sont uniquement audit + cadrage sous validation, ou clôture.
- `DX_DOCUMENTATION` et `DX_CORRECTION_DOCUMENTAIRE` sont refusées comme sessions documentaires normales.
- Les sessions documentaires abstraites, inutiles ou sans lien direct avec le code sont interdites.
- Une session DX ne produit pas de patch applicatif `.diff`.
- Une session CX qui modifie du code, des scripts, la structure technique, Prisma, Tailwind, API, UI, composants ou fichiers applicatifs doit produire un patch `.diff` dans `PATCH/`.
- 1 session = 1 dossier unique.
- Un fix ne crée jamais une nouvelle session.
- Un correctif lié à une session existante doit être intégré au dossier de session original.
- Les patchs correctifs éventuels doivent aller dans `PATCH/` du dossier original.
- Les preuves corrigées doivent rester dans les fichiers de preuve du dossier original.
- Il est interdit de créer un dossier de session séparé de type `FIX-01`.
- L'ancienne session `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01` est une anomalie historique conservée, à ne pas utiliser comme modèle.
- Toute information non prouvée doit être notée `INFORMATION NON FOURNIE — À CONFIRMER`.

## 3. Conventions de nommage

Convention cible :

- `SESSION-YYYYMMDD-NN_DX_<BLOC>_<OBJET>`
- `SESSION-YYYYMMDD-NN_CX_<BLOC>_<OBJET>`

`NN` est le numéro d'ordre journalier.

Exemples de dossiers de blocs :

- `BLOC_T1_SHELL_NAVIGATION`
- `BLOC_P_LOGIN`
- `BLOC_RGPD_PRIVACY`
- `BLOC_F1_VALIDATION_FONCTIONNELLE`

## 4. Doctrine de découpage après audit

Chaque bloc commence par une session DX d'audit + cadrage.

Le détail fin des sessions CX de production sera confirmé après audit global ou audit bloc par bloc. Un audit peut proposer d'améliorer, diviser, fusionner ou réorganiser les sessions prévues avant lancement du code.

Les sessions CX listées dans ce document sont donc des axes prévisionnels, pas des lots de code figés. Elles doivent être découpées en sessions courtes, fermées, contrôlables et validables après audit ciblé.

Quand le détail exact dépend réellement de l'audit, utiliser :

`INFORMATION NON FOURNIE — À CONFIRMER APRÈS AUDIT CIBLÉ`

Il est interdit de lancer une grosse session CX de type "tout corriger", "tout compléter" ou "produire le bloc complet" sans découpage validé.

## 5. Modèle de fiche de bloc

Chaque bloc utilise la structure suivante :

- Identifiant
- Nom
- Type de bloc
- Dossier cible
- Objectif
- Dépendances
- Hors périmètre
- Sessions prévues
- Contrôles obligatoires
- Critère de sortie
- Documentation à mettre à jour
- Statut

## 6. Historique T0 et BLOC_A1

T0 / Gouvernance P1 est historique de cadrage. Il ne doit plus être prolongé comme futur bloc actif de production.

Le dossier `docs/2-SESSIONS/1-ALPHA/BLOC_A1` est conservé tel quel comme historique.

Les dossiers historiques `SESSION-20260615-03_A1_T0-01` et `SESSION-20260615-04_A1_T0-02` existaient déjà avant cette correction et ne sont pas une anomalie de la présente intervention.

## 7. Blocs transversaux

### BLOC T1 - Shell global, navigation et contexte connecté

#### **Identifiant**

T1

#### **Type de bloc**

Transverse

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION`

#### **Objectif**

Stabiliser sidebar, topbar, société courante, utilisateur courant, filtrage visible par droits et accès refusé.

#### **Dépendances**

- T2 si une convention de nommage bloque.
- T4 pour les permissions fines.

#### **Hors périmètre**

- Reprise profonde des pages métier.
- RBAC complet.
- Design system complet.

#### **Sessions prévues**

- DX audit + cadrage : cartographier shell/navigation, écarts, risques et questions bloquantes.
- `CX_T1_RENOMMAGE-LIBELLES-NAVIGATION`
  - Nature : CX.
  - Type métier : RENOMMAGE.
  - Objectif : corriger uniquement les libellés visibles de navigation.
  - Périmètre : libellés UI français visibles dans la navigation/shell.
  - Hors périmètre : renommage technique de routes, RBAC, Accès refusé, Suivi des véhicules, refonte shell.
- `CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE`
  - Nature : CX.
  - Type métier : CORRECTION.
  - Objectif : corriger ou stabiliser les actions visibles du shell/topbar et l'affichage du contexte utilisateur/société.
  - Périmètre : shell connecté, topbar, utilisateur courant, société courante, actions visibles.
  - Hors périmètre : RBAC fin, refonte globale, modules métier.
- `CX_T1_CREATION-ACCES-REFUSE`
  - Nature : CX.
  - Type métier : CRÉATION.
  - Objectif : créer ou stabiliser le traitement visible `Accès refusé` selon la décision retenue après audit.
  - Périmètre : page/composant/route dédiée si nécessaire, comportement utilisateur authentifié non autorisé.
  - Hors périmètre : matrice RBAC complète T4, refonte des protections métier.
- `CX_T1_COMPLETION-NAVIGATION-DROITS`
  - Nature : CX.
  - Type métier : COMPLÉTION.
  - Objectif : compléter la navigation visible selon les droits, en cohérence avec les décisions RBAC disponibles.
  - Périmètre : visibilité des entrées de navigation, droits visibles, cohérence shell/sidebar.
  - Dépendance : T4/RBAC si matrice module-permission non encore stabilisée.
  - Hors périmètre : correction métier profonde des pages.
- `CX_T1_VALIDATION-SHELL-NAVIGATION`
  - Nature : CX.
  - Type métier : VALIDATION.
  - Objectif : valider shell, navigation, routes visibles, libellés, contexte connecté, accès direct non autorisé et Accès refusé.
  - Périmètre : contrôles techniques et fonctionnels ciblés T1.
  - Hors périmètre : nouvelles corrections lourdes non cadrées.

#### **Contrôles obligatoires**

Git, preuves de lecture, absence de patch applicatif en DX, contrôle navigateur/lint/build uniquement pour une CX qui modifie le code.

#### **Critère de sortie**

Le shell permet d'accéder aux modules autorisés et de refuser proprement les accès interdits, ou les écarts restants sont reportés explicitement.

#### **Documentation à mettre à jour**

`05`, références UI/UX, matrice RBAC si impact.

#### **Statut**

Validé

### BLOC T2 - Nomenclature, routes et renommages futurs

#### **Identifiant**

T2

#### **Type de bloc**

Transverse

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES`

#### **Objectif**

Cadrer routes techniques, libellés UI et renommages futurs sans les exécuter par défaut.

#### **Dépendances**

`04`, `03`, références UI/UX, repo officiel en lecture seule.

#### **Hors périmètre**

Renommage effectif, migration de routes, refonte navigation, code applicatif en DX.

#### **Sessions prévues**

- DX audit + cadrage : matrice routes/libellés et décisions à confirmer.
- CX prévisionnelles : uniquement si l'audit valide un renommage ou une correction technique ciblée.
- Clôture : DX sauf modification technique réelle.

#### **Contrôles obligatoires**

Git, preuves, absence de modification code en DX, contrôle des liens/routes si une CX est validée.

#### **Critère de sortie**

Chaque élément litigieux est classé : conservé, à renommer plus tard, ou à confirmer.

#### **Documentation à mettre à jour**

`04`, `05`, conventions éventuelles.

#### **Statut**

À faire.

### BLOC T3 - Design system officiel et composants communs

#### **Identifiant**

T3

#### **Type de bloc**

Transverse

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM`

#### **Objectif**

Identifier et stabiliser les composants et états UI communs nécessaires aux pages Alpha.

#### **Dépendances**

T1, T2.

#### **Hors périmètre**

Copie de composants Base44, refonte visuelle globale, reprise complète d'une page.

#### **Sessions prévues**

- DX audit + cadrage : inventaire composants, états, écarts, priorités.
- CX prévisionnelles : à découper par composant ou famille d'états après audit ciblé.
- Clôture : DX sauf modification technique réelle.

#### **Contrôles obligatoires**

Git, preuves, Base44 en lecture seule, lint/build et contrôle visuel pour toute CX UI.

#### **Critère de sortie**

Les composants nécessaires sont fiables ou reportés explicitement.

#### **Documentation à mettre à jour**

Références UI/UX, `05`.

#### **Statut**

À faire.

### BLOC T4 - RBAC UI/API et matrice permissions

#### **Identifiant**

T4

#### **Type de bloc**

Transverse

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_PERMISSIONS`

#### **Objectif**

Poser une matrice RBAC progressive et vérifier les contrôles UI/API des actions sensibles.

#### **Dépendances**

T1, T5 si données société impliquées.

#### **Hors périmètre**

Matrice V1 complète non arbitrée, refonte globale auth.

#### **Sessions prévues**

- DX audit + cadrage : rôles, permissions, endpoints, écarts et questions.
- CX prévisionnelles : à découper par permission, endpoint, écran ou action sensible après audit ciblé.
- Clôture : DX sauf modification technique réelle.

#### **Contrôles obligatoires**

Preuves, tests rôles/endpoints pour toute CX, lint/build, preuve serveur/API.

#### **Critère de sortie**

Le RBAC Alpha minimal est cadré et les écarts prioritaires sont traités ou reportés.

#### **Documentation à mettre à jour**

Matrice permissions, `05`.

#### **Statut**

À faire.

### BLOC T5 - Données, multi-tenant et mapping Base44 vers officiel

#### **Identifiant**

T5

#### **Type de bloc**

Transverse

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT`

#### **Objectif**

Comparer les entités Base44 utiles au modèle officiel et cadrer le multi-tenant avant toute modification de données.

#### **Dépendances**

`01`, audits existants, T4 si droits impliqués.

#### **Hors périmètre**

Migration, modification Prisma, `prisma generate`, copie de modèle Base44.

#### **Sessions prévues**

- DX audit + cadrage : matrice entités/champs, écarts, accepté/refusé/à confirmer.
- CX prévisionnelles : à découper par modèle, relation ou contrôle multi-tenant après audit ciblé.
- Clôture : DX sauf modification technique réelle.

#### **Contrôles obligatoires**

Prisma en lecture si autorisé, Base44 lecture seule, preuve multi-tenant pour toute CX.

#### **Critère de sortie**

Les données utiles Alpha sont cadrées sans modification Prisma non autorisée.

#### **Documentation à mettre à jour**

Documentation données, `05`.

#### **Statut**

À faire.

### BLOC T6 - Audit et traçabilité transverse

#### **Identifiant**

T6

#### **Type de bloc**

Transverse

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T6_AUDIT_TRACABILITE`

#### **Objectif**

Définir les actions sensibles à tracer et le contrat minimal de traçabilité.

#### **Dépendances**

T4, T5.

#### **Hors périmètre**

Conformité RGPD complète, SIEM, politique de rétention finale.

#### **Sessions prévues**

- DX audit + cadrage : actions sensibles, traces existantes, contrat minimal.
- CX prévisionnelles : à découper par action sensible ou module après audit ciblé.
- Clôture : DX sauf modification technique réelle.

#### **Contrôles obligatoires**

Preuves, cohérence RBAC, test de trace produite pour toute CX.

#### **Critère de sortie**

Les actions sensibles prioritaires ont un contrat de trace ou un report explicite.

#### **Documentation à mettre à jour**

Documentation audit, `05`.

#### **Statut**

À faire.

### BLOC T7 - Qualité, tests et contrôles de reprise

#### **Identifiant**

T7

#### **Type de bloc**

Transverse

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T7_QUALITE_CONTROLES`

#### **Objectif**

Définir les contrôles récurrents par type de session et les preuves minimales attendues.

#### **Dépendances**

`03`, README sessions, templates.

#### **Hors périmètre**

Exécution exhaustive de tous les tests hors contexte.

#### **Sessions prévues**

- DX audit + cadrage : DoD par type de session.
- CX prévisionnelles : uniquement pour outillage technique validé après audit ciblé.
- Clôture : DX sauf modification technique réelle.

#### **Contrôles obligatoires**

Git, diff, encodage, absence de modification hors périmètre, test non destructif pour tout script modifié.

#### **Critère de sortie**

Les futures sessions disposent d'un cadre de contrôle clair.

#### **Documentation à mettre à jour**

`03`, README sessions, templates, `05`.

#### **Statut**

À faire.

## 8. Blocs pages et modules

Les blocs pages/modules suivent la même logique : audit DX, découpage fin des CX après audit, clôture DX ou CX selon le périmètre réel.

### BLOC P-LOGIN - Connexion

#### **Identifiant**

P-LOGIN

#### **Type de bloc**

Page / module fonctionnel

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_LOGIN`

#### **Objectif**

Stabiliser le parcours de connexion officiel, dont `Se souvenir de moi` si confirmé.

#### **Dépendances**

T1, T4, RGPD-PRIVACY.

#### **Hors périmètre**

Inscription libre Alpha, MFA, SSO, mot de passe oublié si non validé.

#### **Sessions prévues**

- DX audit + cadrage : login, erreurs, redirections, session, Privacy.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon contrôles réellement nécessaires.

#### **Contrôles obligatoires**

Auth/redirections/navigateur/lint/build uniquement pour CX ; preuves et absence de patch applicatif pour DX.

#### **Critère de sortie**

Login utilisable, contrôlé et limites Alpha explicites.

#### **Documentation à mettre à jour**

Fiche Login, `05`, Privacy si impact.

#### **Statut**

À faire.

### BLOC P-SOCIETE - Société

#### **Identifiant**

P-SOCIETE

#### **Type de bloc**

Page / module fonctionnel

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_SOCIETE`

#### **Objectif**

Stabiliser société courante, profil et contacts société multiples.

#### **Dépendances**

T4, T5, T6.

#### **Hors périmètre**

Facturation, abonnement, conformité juridique complète.

#### **Sessions prévues**

- DX audit + cadrage : profil, contacts, companyId, droits, audit.
- CX prévisionnelles : à découper après audit ciblé par écran, API ou contrôle.
- Clôture : DX ou CX selon périmètre réel.

#### **Contrôles obligatoires**

CompanyId, API/RBAC, audit et multi-tenant pour toute CX.

#### **Critère de sortie**

Société et contacts cohérents, cloisonnés et contrôlés.

#### **Documentation à mettre à jour**

Fiche Société, documentation données, `05`.

#### **Statut**

À faire.

### BLOC P-DEPOTS-BASES - Dépôts / Bases

#### **Identifiant**

P-DEPOTS-BASES

#### **Type de bloc**

Page / module fonctionnel

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_DEPOTS_BASES`

#### **Objectif**

Stabiliser le référentiel des dépôts/bases.

#### **Dépendances**

T4, T5, T6.

#### **Hors périmètre**

Géolocalisation avancée, automatisations planning futures.

#### **Sessions prévues**

- DX audit + cadrage : référentiel, rattachements, dépendances.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon périmètre réel.

#### **Contrôles obligatoires**

API/RBAC, multi-tenant, audit et lint/build pour toute CX.

#### **Critère de sortie**

Dépôts fiables pour RH, véhicules et planning.

#### **Documentation à mettre à jour**

Fiche Dépôts/Bases, `05`.

#### **Statut**

À faire.

### BLOC P-UTILISATEURS-RH - Utilisateurs / RH

#### **Identifiant**

P-UTILISATEURS-RH

#### **Type de bloc**

Page / module fonctionnel

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_UTILISATEURS_RH`

#### **Objectif**

Stabiliser utilisateurs, rôles, accès applicatif, données RH minimales et indisponibilités.

#### **Dépendances**

T4, T5, T6, P-DEPOTS-BASES.

#### **Hors périmètre**

Paie, RH avancée, permissions fines non validées.

#### **Sessions prévues**

- DX audit + cadrage : modèles, UI/API, rôles, accès et écarts.
- CX prévisionnelles : à découper après audit ciblé par écran, action, endpoint ou permission.
- Clôture : DX ou CX selon périmètre réel.

#### **Contrôles obligatoires**

API/RBAC, multi-tenant, audit, lint/build pour toute CX.

#### **Critère de sortie**

Utilisateurs/RH exploitables sans incohérence critique connue.

#### **Documentation à mettre à jour**

Fiche Utilisateurs/RH, matrice RBAC, `05`.

#### **Statut**

À faire.

### BLOC P-VEHICULES - Véhicules

#### **Identifiant**

P-VEHICULES

#### **Type de bloc**

Page / module fonctionnel

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_VEHICULES`

#### **Objectif**

Stabiliser la flotte administrative.

#### **Dépendances**

T4, T5, T6, P-DEPOTS-BASES.

#### **Hors périmètre**

Suivi opérationnel détaillé, maintenance prédictive.

#### **Sessions prévues**

- DX audit + cadrage : flotte, statuts, archivage, disponibilité.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon périmètre réel.

#### **Contrôles obligatoires**

API/RBAC, multi-tenant, audit, lint/build pour toute CX.

#### **Critère de sortie**

Flotte administrative fiable pour modules dépendants.

#### **Documentation à mettre à jour**

Fiche Véhicules, `05`.

#### **Statut**

À faire.

### BLOC P-SUIVI-VEHICULES - Suivi des véhicules

#### **Identifiant**

P-SUIVI-VEHICULES

#### **Type de bloc**

Page / module fonctionnel

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_SUIVI_VEHICULES`

#### **Objectif**

Cadrer puis reprendre le suivi opérationnel des véhicules en statut hybride.

#### **Dépendances**

P-VEHICULES, T4, T5, T6.

#### **Hors périmètre**

Signature électronique, preuve mobile, maintenance prédictive, règles ARS complètes non confirmées.

#### **Sessions prévues**

- DX audit + cadrage : statut technique, vue d'ensemble, vérifications, désinfections, anomalies.
- CX prévisionnelles : à découper après audit ciblé par sous-flux confirmé.
- Clôture : DX ou CX selon périmètre réel.

#### **Contrôles obligatoires**

Navigateur, API/RBAC, multi-tenant, audit et lint/build pour toute CX.

#### **Critère de sortie**

Suivi véhicules situé clairement et fonctionnel sur le périmètre Alpha retenu.

#### **Documentation à mettre à jour**

Fiche Suivi véhicules, matrice RBAC, documentation audit, `05`.

#### **Statut**

À confirmer après audit ciblé.

### BLOC P-MODELES-HORAIRES - Modèles horaires

#### **Identifiant**

P-MODELES-HORAIRES

#### **Type de bloc**

Page / module fonctionnel

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_MODELES_HORAIRES`

#### **Objectif**

Aligner le référentiel des modèles horaires avec la terminologie produit officielle.

#### **Dépendances**

T2, T4, T5.

#### **Hors périmètre**

Renommage technique sans décision, reprise complète planning.

#### **Sessions prévues**

- DX audit + cadrage : modèles horaires, route actuelle, dépendance planning.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon périmètre réel.

#### **Contrôles obligatoires**

API/RBAC, compatibilité planning, lint/build pour toute CX.

#### **Critère de sortie**

Modèles horaires exploitables et nommés correctement côté produit.

#### **Documentation à mettre à jour**

Fiche Modèles horaires, `05`, conventions.

#### **Statut**

À faire.

### BLOC P-PLANNING - Planning

#### **Identifiant**

P-PLANNING

#### **Type de bloc**

Page / module fonctionnel

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_PLANNING`

#### **Objectif**

Reprendre le planning après stabilisation des référentiels et données sources.

#### **Dépendances**

P-SOCIETE, P-DEPOTS-BASES, P-UTILISATEURS-RH, P-VEHICULES, P-MODELES-HORAIRES, T4, T5, T6.

#### **Hors périmètre**

Planification automatique avancée, reporting analytique, agenda heure par heure si non validé.

#### **Sessions prévues**

- DX audit + cadrage : dépendances, vues, affectations, publication, annulation logique.
- CX prévisionnelles : à découper après audit ciblé par vue, action, contrôle ou endpoint.
- Clôture : DX ou CX selon périmètre réel.

#### **Contrôles obligatoires**

Fonctionnel ciblé, API/RBAC, audit, multi-tenant, navigateur, lint/build pour toute CX.

#### **Critère de sortie**

Planning manuel métier fiable sur les parcours Alpha retenus.

#### **Documentation à mettre à jour**

Fiche Planning, matrice RBAC, `05`.

#### **Statut**

À faire.

### BLOC P-AUDIT - Audit / Traçabilité

#### **Identifiant**

P-AUDIT

#### **Type de bloc**

Page / module fonctionnel

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_AUDIT`

#### **Objectif**

Garantir la consultation des traces officielles autorisées.

#### **Dépendances**

T6, T4.

#### **Hors périmètre**

SIEM, purge/rétention complète, conformité RGPD finale.

#### **Sessions prévues**

- DX audit + cadrage : page, filtres, droits, traces disponibles.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon périmètre réel.

#### **Contrôles obligatoires**

Lecture seule, API/RBAC, lint/build pour toute CX.

#### **Critère de sortie**

Traces officielles autorisées consultables sans modification non voulue.

#### **Documentation à mettre à jour**

Documentation audit, matrice RBAC, `05`.

#### **Statut**

À faire.

### BLOC P-DASHBOARD - Tableau de bord

#### **Identifiant**

P-DASHBOARD

#### **Type de bloc**

Page / module fonctionnel

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_DASHBOARD`

#### **Objectif**

Fiabiliser le dashboard après stabilisation des données sources.

#### **Dépendances**

T1, T4, T5, référentiels utiles.

#### **Hors périmètre**

Reporting avancé, préférences complexes non confirmées, données fictives.

#### **Sessions prévues**

- DX audit + cadrage : KPI, widgets, raccourcis, données et droits.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon périmètre réel.

#### **Contrôles obligatoires**

Données réelles, RBAC, navigateur, lint/build pour toute CX.

#### **Critère de sortie**

Dashboard fiable, sans données fictives présentées comme réelles.

#### **Documentation à mettre à jour**

Fiche Dashboard, documentation données, `05`.

#### **Statut**

À faire.

### BLOC P-MISE-EN-ROUTE - Mise en route

#### **Identifiant**

P-MISE-EN-ROUTE

#### **Type de bloc**

Page / module fonctionnel

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_MISE_EN_ROUTE`

#### **Objectif**

Stabiliser l'assistant de configuration initiale après les référentiels métier.

#### **Dépendances**

P-SOCIETE, P-DEPOTS-BASES, P-UTILISATEURS-RH, P-VEHICULES, P-MODELES-HORAIRES.

#### **Hors périmètre**

Onboarding marketing, tutoriels avancés, renommage technique sans décision.

#### **Sessions prévues**

- DX audit + cadrage : checklist, liens, données sources et libellés.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon périmètre réel.

#### **Contrôles obligatoires**

Liens, données sources, RBAC visible, navigateur, lint/build pour toute CX.

#### **Critère de sortie**

Mise en route cohérente avec les vrais modules sources.

#### **Documentation à mettre à jour**

Fiche Mise en route, conventions, `05`.

#### **Statut**

À faire.

## 9. Bloc RGPD et Privacy

### BLOC RGPD-PRIVACY - Privacy visible en Alpha

#### **Identifiant**

RGPD-PRIVACY

#### **Type de bloc**

RGPD / conformité

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_RGPD_PRIVACY`

#### **Objectif**

Garantir une Privacy visible en Alpha et documenter les limites RGPD sans déclarer une conformité complète non prouvée.

#### **Dépendances**

P-LOGIN, `01`, règles RGPD minimales connues.

#### **Hors périmètre**

Conformité RGPD complète, politique légale exhaustive, DPO/base légale/rétention/purge non confirmés.

#### **Sessions prévues**

- DX audit + cadrage : présence, accessibilité, lien login et limites Alpha.
- CX prévisionnelles : uniquement si l'audit confirme une correction applicative ciblée.
- Clôture : DX ou CX selon périmètre réel.

#### **Contrôles obligatoires**

Navigateur, lien login/privacy, absence de déclaration de conformité complète, lint/build pour toute CX.

#### **Critère de sortie**

Privacy visible et cohérente avec les limites Alpha.

#### **Documentation à mettre à jour**

Documentation RGPD, Login, `05`.

#### **Statut**

À faire.

## 10. Validations finales et gel Alpha

### BLOC F1 - Validation fonctionnelle croisée

#### **Identifiant**

F1

#### **Type de bloc**

Finalisation

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_F1_VALIDATION_FONCTIONNELLE`

#### **Objectif**

Vérifier les parcours fonctionnels transverses après blocs métier.

#### **Dépendances**

Blocs métier nécessaires terminés ou reports acceptés.

#### **Hors périmètre**

Correction code pendant validation, nouvelles fonctionnalités.

#### **Sessions prévues**

- DX audit + cadrage : parcours à valider, données et rôles.
- CX prévisionnelles : uniquement si scripts/tests applicatifs sont modifiés.
- Clôture : DX.

#### **Contrôles obligatoires**

Navigateur, RBAC, données de test, captures si UI.

#### **Critère de sortie**

Parcours principaux validés ou écarts bloquants listés et reportés.

#### **Documentation à mettre à jour**

Rapports de validation, `05`.

#### **Statut**

À faire.

### BLOC F2 - Validation qualité technique

#### **Identifiant**

F2

#### **Type de bloc**

Finalisation

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_F2_VALIDATION_QUALITE`

#### **Objectif**

Vérifier lint, build, tests disponibles, API/RBAC et multi-tenant après reprise.

#### **Dépendances**

Blocs code nécessaires terminés.

#### **Hors périmètre**

Correction dans la même session de validation, migration non prévue.

#### **Sessions prévues**

- DX audit + cadrage : commandes et périmètre de validation.
- CX prévisionnelles : uniquement si scripts/tests techniques sont modifiés.
- Clôture : DX.

#### **Contrôles obligatoires**

Lint, build, tests disponibles, contrôles API/RBAC, multi-tenant.

#### **Critère de sortie**

Contrôles techniques Alpha exécutés et résultats exploitables.

#### **Documentation à mettre à jour**

Rapports qualité, `05`.

#### **Statut**

À faire.

### BLOC F3 - Validation UX visuelle

#### **Identifiant**

F3

#### **Type de bloc**

Finalisation

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_F3_VALIDATION_UX`

#### **Objectif**

Vérifier cohérence visuelle, responsive et ergonomique des parcours critiques.

#### **Dépendances**

T1, T3, blocs pages nécessaires.

#### **Hors périmètre**

Refonte UI globale pendant validation, nouvelle maquette non validée.

#### **Sessions prévues**

- DX audit + cadrage : écrans et critères visuels.
- CX prévisionnelles : uniquement si outil ou code de test visuel est modifié.
- Clôture : DX.

#### **Contrôles obligatoires**

Navigateur, responsive, états UI, captures utiles.

#### **Critère de sortie**

Écrans critiques sans écart visuel bloquant connu ou écarts listés.

#### **Documentation à mettre à jour**

Références UI/UX si décision validée, rapports F3, `05`.

#### **Statut**

À faire.

### BLOC F4 - Clôture documentaire Alpha ou clôture de phase

#### **Identifiant**

F4

#### **Type de bloc**

Finalisation

#### **Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_F4_CLOTURE_ALPHA`

#### **Objectif**

Clôturer la phase ou acter explicitement la non-clôture et les reports.

#### **Dépendances**

F1, F2, F3 terminés ou reportés explicitement.

#### **Hors périmètre**

Nouvelle fonctionnalité, correction code non séparée, validation implicite.

#### **Sessions prévues**

- DX audit + cadrage : preuves, décisions, reports.
- DX clôture : note de clôture ou non-clôture.

#### **Contrôles obligatoires**

Preuves F1/F2/F3, Git status, cohérence MASTER, absence validation implicite.

#### **Critère de sortie**

Phase clôturée ou non clôturée explicitement, avec preuves et décisions visibles.

#### **Documentation à mettre à jour**

`02`, `04`, `05`, synthèse de phase.

#### **Statut**

À faire.

## 11. Maintenance

Mettre à jour ce fichier uniquement dans les cas suivants :

- après audit ciblé d'un bloc ;
- après décision humaine ;
- après changement d'ordre ;
- après ajout, retrait ou fusion de session ;
- après clôture d'un bloc.

Règles à conserver :

- ne pas transformer `05` en copie de `04` ;
- ne pas inventer de production non validée ;
- garder les incertitudes visibles ;
- mettre à jour les fiches après preuve, pas avant ;
- ne pas créer de session FIX séparée.

---

## 12. Cadrage off documentaire - préparation des blocs restants

Date de cadrage off : 16/06/2026

### 12.1 Rôle de cette copie

Cette section est une copie de travail documentaire. Elle ne vaut pas modification du plan officiel et ne valide aucun bloc.

Fichier source non modifié : `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`.

Fichier de travail modifié : `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION_CADRAGE_OFF.md`.

Hypothèse non bloquante : les blocs déjà présents dans le fichier officiel restent la trame de production, mais les sessions ci-dessous sont des propositions à valider humainement avant création dans `docs/2-SESSIONS`.

Règles conservées :

- aucune session n'est créée par ce cadrage ;
- aucune session proposée n'est implicitement validée ;
- aucune reprise code n'est autorisée par cette seule copie ;
- Base44 reste une référence métier, visuelle et fonctionnelle, jamais une source technique à copier ;
- les décisions non prouvées restent à confirmer.

### 12.2 Sources consultées pour ce cadrage

Sources maîtres :

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/1-MASTER/RGPD_BASE_MINIMALE.md`

Références Base44 :

- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/MANIFEST_BASE44_REFERENCE.json`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/EXCLUSIONS_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/*`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/pages/*`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/components/*`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/lib/*`

Références UI/UX et fonctionnelles :

- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_GLOBALE.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_CHECKLIST_CODEX.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/1-REFERENCE_UI_UX_LOGIN.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/2-REFERENCE_UI_UX_DASHBOARD.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/3-REFERENCE_UI_UX_MODELES_HORAIRES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/4-REFERENCE_UI_UX_PLANNING.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/5-REFERENCE_UI_UX_UTILISATEURS_RH.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/6-REFERENCE_UI_UX_VEHICULES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/6.1-REFERENCE_UI_UX_SUIVI_DES_VEHICULES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/7-REFERENCE_UI_UX_DEPOTS_BASES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/8-REFERENCE_UI_UX_SOCIETE.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/9-REFERENCE_UI_UX_MISE_EN_ROUTE.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/10-REFERENCE_UI_UX_AUDIT.md`
- `docs/1-MASTER/3-FONCTIONNALITES/LISTE_FONCTIONNALITES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/1-FONCTIONNALITES_DETAILLEES_LOGIN_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/2-FONCTIONNALITES_DETAILLEES_TABLEAU_DE_BORD_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/3-FONCTIONNALITES_DETAILLEES_MODELES_HORAIRES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/5-FONCTIONNALITES_DETAILLEES_UTILISATEURS_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/6.1-FONCTIONNALITES_DETAILLEES_SUIVI_DES_VEHICULES_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/7-FONCTIONNALITES_DETAILLEES_DEPOTS_BASES_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/8-FONCTIONNALITES_DETAILLEES_SOCIETE_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/9-FONCTIONNALITES_DETAILLEES_MISE_EN_ROUTE_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/10-FONCTIONNALITES_DETAILLEES_AUDIT_V1.md`

Audits et code officiel utiles :

- `docs/1-MASTER/5-AUDIT/AUDIT_CODE_EXISTANT_ALPHA_V2.md`
- `docs/1-MASTER/5-AUDIT/AUDIT_COMPARAISON_BASE44_OFFICIEL_V1.md`
- `package.json`
- `prisma/schema.prisma`
- `lib/auth.ts`
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/ui/*`
- `app/login/page.tsx`
- `app/dashboard/page.tsx`
- `app/company/*`
- `app/depots/*`
- `app/users/*`
- `app/vehicles/*`
- `app/templates/*`
- `app/planning/*`
- `app/audit/*`
- `app/onboarding/*`
- `app/privacy/page.tsx`
- `app/api/*`
- `lib/services/*`
- `scripts/quality/*`

### 12.3 Constats transverses issus du cadrage

Décisions déjà connues :

- Le repo officiel reste la source technique finale.
- Base44 est une référence prototype, pas une source de code.
- Les libellés actifs sont `Modèles horaires`, `Mise en route`, `Dépôts / Bases`, `Utilisateurs / RH`.
- Les routes techniques anglaises peuvent rester stables tant qu'un renommage n'est pas confirmé.
- Le multi-tenant par `companyId` est non négociable.
- Les actions sensibles doivent être tracées.
- Les sessions futures doivent rester courtes, ciblées et contrôlables.
- Les sessions DX ne produisent pas de patch applicatif.

Écarts structurants observés :

- Le code officiel couvre déjà de nombreux modules, mais aucune page n'est validée individuellement.
- Prisma ne contient pas encore `CompanyContact`, `DashboardPreference`, `VehicleCheck`, `Disinfection`, `VehicleAnomaly` ni `OnboardingStep`.
- Le catalogue RBAC officiel est réel mais incomplet pour dépôts, contacts société, suivi véhicules, disponibilité véhicule, reset password et certaines actions de restauration.
- Les audits signalent encore des écarts UI/API, des flux legacy planning, des cycles archive/restauration incomplets et des états visuels hétérogènes.
- `Se souvenir de moi` existe visuellement côté login, mais le comportement session officiel reste à confirmer.
- `Privacy` existe et est liée au login selon les tests qualité, mais ne doit pas déclarer une conformité complète.

### 12.4 Format compact des sessions proposées

Chaque session ci-dessous indique :

- code session proposé ;
- nature : DX, CX, QA ou DOC ;
- type métier : AUDIT, CADRAGE, CRÉATION, CORRECTION, COMPLÉTION, VALIDATION, DOCUMENTATION ou CLÔTURE ;
- objectif précis ;
- périmètre inclus ;
- hors périmètre explicite ;
- fichiers ou zones probables à auditer/modifier plus tard ;
- critères de validation ;
- preuves attendues ;
- dépendances éventuelles.

Les codes ne contiennent pas de date volontairement. La date et le numéro journalier devront être ajoutés uniquement lors de la création réelle d'une session.

---

### BLOC T2 - Nomenclature, routes et renommages futurs

- Objectif du bloc : cadrer les libellés produit, routes techniques et renommages éventuels sans lancer de migration de routes par défaut.
- Rôle dans l'application : éviter la confusion entre noms métier français et routes historiques anglaises.
- Références Base44 à regarder : `src/App.jsx`, `src/components/shell/AppShell.jsx`, pages `ModelesHoraires.jsx`, `MiseEnRoute.jsx`, `SuiviVehicules.jsx`.
- Références repo officiel à regarder : `app/layout.tsx`, `app/app-shell.tsx`, routes `app/templates`, `app/onboarding`, `app/vehicles`, `proxy.ts`, tests `scripts/quality/targeted-sensitive-blocks.test.mjs`.
- Dépendances amont : T1, `04`, doctrine de routes techniques stables.
- Dépendances aval : T3, T4, P-MODELES-HORAIRES, P-MISE-EN-ROUTE, P-SUIVI-VEHICULES.
- Risques identifiés : casser des liens, tests, bookmarks ou redirections ; confondre correction de libellé avec migration route ; introduire des alias non maintenus.
- Décisions déjà connues : libellés UI français actifs ; routes anglaises conservables tant qu'un renommage n'est pas validé.
- Décisions restant à confirmer : renommage technique `/templates`, `/onboarding`, emplacement technique de `Suivi des véhicules`, politique d'alias/redirection.
- Découpage proposé en sessions courtes : audit routes/libellés, décision conventions, corrections libellés restantes, validation navigation.
- Critères de clôture du bloc : chaque route/libellé est classé en `conservé`, `renommage futur`, `alias à prévoir` ou `à confirmer`.
- Points de contrôle ChatGPT recommandés : vérifier qu'aucun renommage technique n'est lancé sans décision humaine et que les libellés visibles restent français.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_T2_AUDIT-NOMENCLATURE-ROUTES | DX | AUDIT | Cartographier routes, libellés, liens et écarts Base44/officiel. | Lecture docs, shell, routes pages, dashboard links, tests qualité. | Renommage code, migration de routes. | `app/layout.tsx`, `app/app-shell.tsx`, `app/dashboard/page.tsx`, `app/*/page.tsx`. | Matrice route actuelle/libellé cible/risque. | `git status --short`, extraits routes/liens. | T1. |
| DX_T2_CADRAGE-CONVENTIONS-ROUTES | DX | CADRAGE | Proposer une convention route stable vs libellé métier. | Décisions à confirmer, stratégie alias future. | Modification de `04` ou `05` officiel. | Docs MASTER après validation. | Liste d'arbitrages prête pour validation humaine. | Tableau décisions/hypothèses. | DX_T2_AUDIT. |
| CX_T2_CORRECTION-LIBELLES-RESIDUELS | CX | CORRECTION | Corriger uniquement les libellés visibles résiduels validés. | UI visible, textes, titres, breadcrumbs. | Changement de chemin technique. | Shell, pages, dashboard. | Aucun libellé interdit restant sur surface validée. | Diff, captures, lint/build. | Décision humaine T2. |
| QA_T2_VALIDATION-ROUTES-LIENS | QA | VALIDATION | Vérifier navigation, accès direct, liens internes et absence de régression. | Parcours navigateur, liens dashboard/mise en route. | Corrections lourdes. | Browser, tests qualité. | Routes critiques atteignables ou refusées proprement. | Captures/commandes, `git status --short`. | Sessions CX T2 éventuelles. |

### BLOC T3 - Design system officiel et composants communs

- Objectif du bloc : stabiliser les primitives UI officielles et les états communs nécessaires aux pages Alpha.
- Rôle dans l'application : réduire les divergences de cards, badges, tableaux, filtres, boutons, panneaux, états empty/loading/error/disabled.
- Références Base44 à regarder : `src/components/ui/*`, `src/components/dashboard/*`, `src/components/shell/*`, `src/index.css`, `tailwind.config.js`.
- Références repo officiel à regarder : `app/ui/*`, `app/globals.css`, `app/a24-*.css`, pages métier existantes.
- Dépendances amont : T1, T2, références UI/UX globales.
- Dépendances aval : toutes les pages modules, F3.
- Risques identifiés : copier shadcn/Base44, refonte globale CSS, régression visuelle, tokens inventés non documentés.
- Décisions déjà connues : SaaS métier clair, dense, professionnel ; composants à garder sobres et réutilisables.
- Décisions restant à confirmer : palette exacte, échelle typographique, tokens Tailwind finaux, architecture éventuelle `components/`.
- Découpage proposé en sessions courtes : inventaire, états communs, tableaux/filtres, badges/actions, validation visuelle.
- Critères de clôture du bloc : composants prioritaires utilisables ou reports documentés ; aucune refonte globale cachée.
- Points de contrôle ChatGPT recommandés : vérifier que Base44 sert seulement d'inspiration et que les styles restent compatibles avec le repo.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_T3_AUDIT-COMPOSANTS-ETATS | DX | AUDIT | Inventorier composants officiels, usages et écarts UI/UX. | `app/ui`, CSS, pages, références UI/UX. | Création/modification composants. | `app/ui/*`, `app/globals.css`. | Liste priorisée des composants à stabiliser. | Extraits, captures si utiles, status Git. | T2. |
| CX_T3_COMPLETION-ETATS-COMMUNS | CX | COMPLÉTION | Harmoniser états empty/loading/error/disabled/focus sur primitives ciblées. | Une famille d'états par session si nécessaire. | Reprise page métier complète. | `app/ui/empty-state.tsx`, `error-message.tsx`, `status-badge.tsx`, CSS. | États rendus sans rupture sur pages ciblées. | Diff, lint/build, contrôle navigateur. | DX_T3_AUDIT. |
| CX_T3_CORRECTION-TABLEAUX-FILTRES | CX | CORRECTION | Stabiliser tableau, filtres et actions compactes partagés. | Primitives UI seulement. | Changement métier des colonnes. | `app/ui/data-table.tsx`, `filter-bar.tsx`, pages consommatrices. | Comportement UI homogène sur modules tests. | Diff, captures desktop. | DX_T3_AUDIT. |
| CX_T3_COMPLETION-BADGES-ACTIONS | CX | COMPLÉTION | Harmoniser statuts/badges/boutons sensibles. | Badges texte+couleur, boutons primaires/secondaires/danger. | Nouvelle matrice métier. | `app/ui/status-badge.tsx`, `action-button.tsx`. | Statuts lisibles hors couleur seule. | Diff, captures, lint/build. | T4 pour droits visibles si impact. |
| QA_T3_VALIDATION-DESIGN-SYSTEM | QA | VALIDATION | Valider les primitives sur surfaces représentatives. | Login exclu si design spécifique ; pages dashboard/liste/formulaire. | Corrections lourdes. | Browser, captures. | Pas d'écart visuel bloquant connu ou écarts listés. | Captures, status Git. | CX T3. |

### BLOC T4 - RBAC UI/API et matrice permissions progressive

- Objectif du bloc : établir une matrice RBAC Alpha progressive reliant rôle, permission, action UI, route API et audit.
- Rôle dans l'application : empêcher les écarts front/API et préparer les modules sensibles.
- Références Base44 à regarder : `src/lib/userPermissions.js`, appels `can(...)`, modules utilisateurs, véhicules, suivi, audit.
- Références repo officiel à regarder : `lib/permission-catalog.ts`, `lib/permissions.ts`, `lib/rbac.ts`, `app/layout.tsx`, `app/api/*`, `scripts/quality/*`.
- Dépendances amont : T1, T2, T5 pour données société.
- Dépendances aval : tous les modules métier, T6, F1/F2.
- Risques identifiés : front-only, permissions trop larges, support global mal cadré, endpoints non protégés ou UI plus permissive que l'API.
- Décisions déjà connues : Admin/Gérant ont accès natif large ; autres rôles passent par permissions ; support global à cadrer strictement.
- Décisions restant à confirmer : `DEPOTS_MANAGE`, `COMPANY_MANAGE`, `COMPANY_CONTACTS_MANAGE`, `VEHICLES_AVAILABILITY`, suivi véhicules, reset password, restauration par module.
- Découpage proposé en sessions courtes : matrice, endpoints critiques, UI actions, support, tests.
- Critères de clôture du bloc : matrice minimale validable, écarts prioritaires traités ou reportés.
- Points de contrôle ChatGPT recommandés : comparer UI/API pour chaque action sensible et refuser toute garantie seulement front.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_T4_AUDIT-MATRICE-RBAC | DX | AUDIT | Construire rôle/permission/action/route/audit. | Catalogue officiel, Base44, API, pages. | Ajout de permissions. | `lib/permission-catalog.ts`, `app/api/*`. | Matrice avec manques et risques. | Tableau, extraits, status Git. | T5 lecture données. |
| CX_T4_COMPLETION-CATALOGUE-PERMISSIONS | CX | COMPLÉTION | Ajouter uniquement les permissions validées et helpers associés. | Catalogue, seed si nécessaire, helpers serveur. | Refonte auth, MFA. | `lib/permission-catalog.ts`, `lib/permissions.ts`, `prisma/seed.ts`. | Permissions typées, utilisées sans briser existant. | Diff, lint/build, tests qualité. | Décision humaine T4. |
| CX_T4_CORRECTION-ENDPOINTS-CRITIQUES | CX | CORRECTION | Aligner les endpoints sensibles sur la matrice. | Une famille endpoint par session. | UI complète. | `app/api/users`, `vehicles`, `templates`, `depots`, `company`, `planning`. | API refuse sans session/droit et filtre `companyId`. | Tests ciblés, extraits route. | Matrice validée. |
| CX_T4_CORRECTION-ACTIONS-UI-DROITS | CX | CORRECTION | Aligner visibilité/désactivation des actions UI sur RBAC serveur. | Une page ou famille d'actions. | Modification API hors écart constaté. | Pages clients. | UI ne propose pas d'action impossible ou non tracée. | Captures, diff, lint/build. | CX endpoints. |
| QA_T4_VALIDATION-RBAC-PROGRESSIF | QA | VALIDATION | Exécuter contrôles multi-rôles/API disponibles. | Tests smoke/targeted et parcours manuels. | Création de nouvelle matrice. | `scripts/quality/*`. | Écarts restants listés par gravité. | Commandes, logs synthèse, status Git. | T4 CX. |

### BLOC T5 - Données, multi-tenant et mapping Base44 vers officiel

- Objectif du bloc : cadrer les entités/champs Base44 utiles et les comparer au modèle Prisma officiel sans migration implicite.
- Rôle dans l'application : sécuriser les futurs choix data et le cloisonnement `companyId`.
- Références Base44 à regarder : `base44/entities/*.jsonc`, pages avec accès données, `AuthContext.jsx`.
- Références repo officiel à regarder : `prisma/schema.prisma`, services `lib/services/*`, routes API, import engine.
- Dépendances amont : audits existants, `01`, T4.
- Dépendances aval : P-SOCIETE, P-DEPOTS-BASES, P-UTILISATEURS-RH, P-VEHICULES, P-SUIVI-VEHICULES, P-DASHBOARD, P-MISE-EN-ROUTE.
- Risques identifiés : copier des entités denormalisées, accepter des statuts libres, ajouter des champs sans usage, casser le multi-tenant.
- Décisions déjà connues : `PlanningEntry` Base44 est refusé comme remplacement ; audit client Base44 refusé ; `Employee` séparé refusé sans arbitrage.
- Décisions restant à confirmer : `CompanyContact`, `DashboardPreference`, suivi véhicules, disponibilité véhicule, TPMR, contacts et préférences.
- Découpage proposé en sessions courtes : mapping entités, multi-tenant API, migrations candidates, imports.
- Critères de clôture du bloc : chaque écart data est classé accepté/adapté/refusé/reporté.
- Points de contrôle ChatGPT recommandés : vérifier que chaque ajout Prisma futur possède un besoin Alpha et des contrôles RBAC/audit.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_T5_AUDIT-MAPPING-DONNEES | DX | AUDIT | Produire la matrice Base44 entité/champ vers Prisma officiel. | Entités Base44, schema Prisma, fiches. | Migration Prisma. | `prisma/schema.prisma`, `base44/entities`. | Écarts classés. | Tableau, status Git. | T4. |
| DX_T5_CADRAGE-MULTI-TENANT | DX | CADRAGE | Cartographier les contrôles `companyId` pages/API/services. | API et services critiques. | Correction code. | `app/api/*`, `lib/services/*`. | Risques multi-tenant priorisés. | Extraits de filtres, status Git. | DX_T5_AUDIT. |
| CX_T5_CORRECTION-SCOPING-CRITIQUE | CX | CORRECTION | Corriger un écart multi-tenant validé. | Un endpoint/service ciblé. | Ajout de modèle. | Endpoint concerné. | Aucun `companyId` client non fiable accepté. | Diff, test ciblé, lint/build. | Décision humaine. |
| DX_T5_CADRAGE-MIGRATIONS-CANDIDATES | DX | CADRAGE | Préparer les migrations candidates sans les créer. | Besoins `CompanyContact`, suivi, préférences. | `prisma migrate`, `prisma generate`. | Dossier Prisma futur. | Liste migrations candidates avec justification. | Tableau, risques. | DX_T5_AUDIT. |
| QA_T5_VALIDATION-DONNEES-TENANT | QA | VALIDATION | Vérifier les contrôles qualité multi-tenant existants. | Tests qualité, lecture API. | Correction. | `scripts/quality/*`. | Écarts restants documentés. | Commandes, status Git. | Sessions T5 éventuelles. |

### BLOC T6 - Audit et traçabilité transverse

- Objectif du bloc : définir le contrat de trace serveur pour les actions sensibles Alpha.
- Rôle dans l'application : rendre les modifications sensibles contrôlables et consultables.
- Références Base44 à regarder : `src/lib/auditLogger.js`, `base44/entities/AuditLog.jsonc`, pages auditées.
- Références repo officiel à regarder : `LoginAuditLog`, `PlanningAuditLog`, `lib/services/audit/*`, `app/api/audit/route.ts`.
- Dépendances amont : T4, T5.
- Dépendances aval : P-AUDIT et tous les modules avec actions sensibles.
- Risques identifiés : audit non transactionnel, trous d'événements, payload trop sensible, absence de rétention, support mal justifié.
- Décisions déjà connues : audit client Base44 refusé ; traces login/planning déjà présentes ; actions sensibles doivent être tracées.
- Décisions restant à confirmer : audit générique unifié, rétention, export audit, niveau de détail payload, supportReason.
- Découpage proposé en sessions courtes : inventaire, contrat, corrections par module, validation consultation.
- Critères de clôture du bloc : contrat minimal par action sensible et reports explicites.
- Points de contrôle ChatGPT recommandés : vérifier serveur/API, pas seulement UI, et distinguer audit métier de conformité RGPD complète.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_T6_AUDIT-ACTIONS-SENSIBLES | DX | AUDIT | Lister actions sensibles et traces existantes/manquantes. | Modules, services audit, fiches. | Ajout de logs. | `lib/services/audit/*`, `app/api/*`. | Table action/source/trace/manque. | Extraits, status Git. | T4, T5. |
| DX_T6_CADRAGE-CONTRAT-AUDIT | DX | CADRAGE | Définir champs minimaux, payload, support, masquage. | Contrat documentaire. | RGPD complet, SIEM. | Docs futures, services. | Contrat prêt validation humaine. | Matrice champs/risques. | DX_T6_AUDIT. |
| CX_T6_COMPLETION-TRACE-MODULE | CX | COMPLÉTION | Ajouter une trace serveur validée sur un module/action ciblé. | Une action sensible par session si nécessaire. | Refonte audit globale. | Services module, audit service. | Trace créée et consultable. | Test/API, diff, lint/build. | Contrat validé. |
| CX_T6_CORRECTION-PAYLOAD-SENSIBLE | CX | CORRECTION | Réduire ou normaliser un payload audit risqué validé. | Payload d'une famille de logs. | Politique rétention. | Audit services. | Pas de donnée excessive non justifiée. | Diff, test ciblé. | DX_T6_CADRAGE. |
| QA_T6_VALIDATION-TRACABILITE | QA | VALIDATION | Vérifier la production et consultation de traces prioritaires. | Parcours test, API audit. | Correction lourde. | `app/audit`, `app/api/audit`. | Traces prouvées ou écarts listés. | Commandes/captures. | CX T6 et P-AUDIT. |

### BLOC T7 - Qualité, tests et contrôles de reprise

- Objectif du bloc : formaliser les contrôles minimaux par type de session et renforcer les tests ciblés utiles.
- Rôle dans l'application : rendre chaque retour Codex contrôlable sans régression silencieuse.
- Références Base44 à regarder : seulement pour l'exception documentaire Base44 build/lint déjà décidée.
- Références repo officiel à regarder : `package.json`, `scripts/quality/*`, `scripts/check-doc-encoding.mjs`, `03-METHODE_DE_TRAVAIL.md`.
- Dépendances amont : `03`, sessions T1 déjà historiques.
- Dépendances aval : toutes les sessions CX/DX et F2.
- Risques identifiés : tests trop larges inutilisables, exception Base44 mal appliquée, oubli encodage, validation implicite.
- Décisions déjà connues : `npm run lint`, `npm run build`, tests qualité selon contexte ; exception Base44 documentaire si échec isolé.
- Décisions restant à confirmer : minimum exact par bloc, besoin Playwright/browser systématique ou ciblé, couverture tests RBAC par rôle.
- Découpage proposé en sessions courtes : DoD par session, tests sensibles, encodage, validation finale.
- Critères de clôture du bloc : checklists de contrôle prêtes et tests utiles maintenus.
- Points de contrôle ChatGPT recommandés : vérifier commandes exécutées, écarts préexistants et absence de modification hors périmètre.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_T7_AUDIT-CONTROLES-EXISTANTS | DX | AUDIT | Inventorier scripts, tests et contrôles docs. | `package.json`, scripts, docs méthode. | Création test. | `scripts/quality`, `scripts/check-doc-encoding.mjs`. | Carte contrôle par type session. | Commandes lecture, status Git. | Aucune. |
| DX_T7_CADRAGE-DOD-PAR-BLOC | DX | CADRAGE | Définir DoD minimal par bloc/session. | Tableau contrôles obligatoires/recommandés. | Modification templates sans validation. | `03`, `05`, templates futurs. | DoD prêt validation. | Tableau. | DX_T7_AUDIT. |
| CX_T7_COMPLETION-TEST-SENSIBLE | CX | COMPLÉTION | Ajouter un test qualité ciblé validé. | Un contrat sensible par session. | E2E complet. | `scripts/quality/*.test.mjs`. | Test non fragile et documenté. | Diff, `npm run test:quality`. | Décision humaine. |
| QA_T7_VALIDATION-ENCODAGE-DOCS | QA | VALIDATION | Vérifier encodage et séquences suspectes sur docs modifiés. | Markdown concernés par session. | Réencodage global. | `scripts/check-doc-encoding.mjs`, PowerShell bytes. | UTF-8 sans BOM, pas de mojibake. | Commandes, status Git. | Chaque session documentaire. |
| DX_T7_CLOTURE-CADRE-QUALITE | DX | CLÔTURE | Acter ou non le cadre de contrôle Alpha. | Synthèse risques et reports. | Validation produit. | Docs maîtres après validation. | Clôture explicite ou non-clôture. | Preuves T7. | Sessions T7. |

### BLOC P-LOGIN - Connexion incluant Se souvenir de moi

- Objectif du bloc : stabiliser le login officiel, ses erreurs, ses redirections, son lien Privacy et le comportement `Se souvenir de moi`.
- Rôle dans l'application : point d'entrée sécurisé et compréhensible pour tous les utilisateurs.
- Références Base44 à regarder : `src/pages/Login.jsx`, `src/components/auth/LoginForm.jsx`, `src/components/AuthLayout.jsx` uniquement comme référence visuelle.
- Références repo officiel à regarder : `app/login/page.tsx`, `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`, `types/next-auth.d.ts`, `app/privacy/page.tsx`.
- Dépendances amont : T1, T4, RGPD-PRIVACY.
- Dépendances aval : tous les modules connectés, F1.
- Risques identifiés : fausse persistance session, cookie non sécurisé, erreurs trop précises, redirection non autorisée mal traitée.
- Décisions déjà connues : pas d'inscription libre, pas MFA/SSO en Alpha, Privacy visible, audit login présent.
- Décisions restant à confirmer : durée session standard/remember, renouvellement, option UI si non supportée, mot de passe oublié exclu ou report confirmé.
- Découpage proposé en sessions courtes : audit auth, cadrage remember, correction UI/comportement, validation sécurité.
- Critères de clôture du bloc : login utilisable, limites Alpha visibles, `Se souvenir de moi` décidé et prouvé ou retiré/neutralisé explicitement.
- Points de contrôle ChatGPT recommandés : vérifier que l'option visible correspond au comportement réel et que le lien Privacy reste accessible.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_PLOGIN_AUDIT-AUTH-REMEMBER | DX | AUDIT | Auditer login, cookies, session, redirections, Privacy. | `lib/auth.ts`, login, NextAuth. | Modification auth. | `app/login/page.tsx`, `lib/auth.ts`. | Écart remember clairement établi. | Extraits, status Git. | T4. |
| DX_PLOGIN_CADRAGE-SE-SOUVENIR | DX | CADRAGE | Proposer comportement session standard vs longue durée. | Sécurité, UX, RGPD minimal. | Codage. | Auth future. | Choix prêt validation humaine. | Options/risques. | DX audit. |
| CX_PLOGIN_COMPLETION-REMEMBER-ME | CX | COMPLÉTION | Brancher ou corriger `Se souvenir de moi` selon décision. | UI + auth uniquement. | MFA, mot de passe oublié. | `app/login/page.tsx`, `lib/auth.ts`. | Durées session prouvées. | Diff, tests auth, lint/build. | Décision humaine. |
| CX_PLOGIN_CORRECTION-ETATS-ERREURS | CX | CORRECTION | Harmoniser erreurs, loading, disabled et lien Privacy. | Formulaire et messages. | Refonte visuelle globale. | `app/login/page.tsx`, CSS login. | États conformes UI/UX. | Captures, lint/build. | T3. |
| QA_PLOGIN_VALIDATION-PARCOURS | QA | VALIDATION | Vérifier login succès/échec/session expirée/privacy. | Parcours navigateur et audit login. | Correction. | Browser, audit logs. | Parcours validés ou écarts listés. | Captures/commandes. | CX P-LOGIN. |

### BLOC P-SOCIETE - Société incluant contacts société multiples

- Objectif du bloc : stabiliser profil société, règles, responsables et contacts société multiples.
- Rôle dans l'application : référentiel tenant permanent, distinct de Mise en route.
- Références Base44 à regarder : `src/pages/Societe.jsx`, `src/components/societe/*`, entités `Company`, `CompanyContact`.
- Références repo officiel à regarder : `app/company/*`, `app/api/company/*`, `lib/services/company/*`, `lib/company-rules/*`, `prisma/schema.prisma`.
- Dépendances amont : T4, T5, T6.
- Dépendances aval : P-MISE-EN-ROUTE, P-PLANNING, P-DASHBOARD, RGPD-PRIVACY.
- Risques identifiés : `CompanyContact` absent Prisma, confusion contact/utilisateur, règles société non raccordées, multi-tenant fragile.
- Décisions déjà connues : Société ne gère pas suspension/suppression société en Alpha ; contacts multiples attendus fonctionnellement.
- Décisions restant à confirmer : modèle `CompanyContact`, champs ARS, contact privacy, permission contacts, audit contacts.
- Découpage proposé en sessions courtes : audit profil/règles, cadrage contacts, migration/API contacts, UI contacts, validation.
- Critères de clôture du bloc : profil et contacts cohérents, cloisonnés, tracés ou report contacts explicite.
- Points de contrôle ChatGPT recommandés : vérifier qu'un contact société n'est pas transformé en utilisateur applicatif par erreur.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_PSOCIETE_AUDIT-PROFIL-REGLES-CONTACTS | DX | AUDIT | Cartographier profil, règles et absence/présence contacts. | Code officiel, Base44, schema. | Migration. | `app/company`, `app/api/company`, Prisma. | Écarts profil/contacts/règles listés. | Extraits, status Git. | T5, T6. |
| DX_PSOCIETE_CADRAGE-CONTACTS-SOCIETE | DX | CADRAGE | Définir modèle, permissions et audit contacts. | Types contacts, champs, cycle archive. | Codage. | Prisma/API futurs. | Décision prête validation. | Options et risques. | Audit. |
| CX_PSOCIETE_CREATION-CONTACTS-DATA-API | CX | CRÉATION | Créer modèle/API contacts si validé. | Prisma migration, API contacts, validators. | UI complète. | `prisma/schema.prisma`, `app/api/company/contacts`. | CRUD tenant-scopé et audité. | Migration, tests, lint/build. | T4/T5/T6 validés. |
| CX_PSOCIETE_COMPLETION-CONTACTS-UI | CX | COMPLÉTION | Ajouter gestion UI des contacts multiples. | Page société, états UI, droits. | Changement règles société. | `app/company/*`. | Contacts visibles/modifiables selon droits. | Captures, diff. | API contacts. |
| QA_PSOCIETE_VALIDATION-TENANT-AUDIT | QA | VALIDATION | Vérifier profil, contacts, règles, audit et droits. | Parcours navigateur + API. | Corrections lourdes. | Browser, API audit. | Pas d'écart bloquant connu. | Captures/commandes. | CX. |

### BLOC P-DEPOTS-BASES - Dépôts / Bases

- Objectif du bloc : stabiliser le référentiel dépôts/bases, son cycle actif/archivé et ses rattachements.
- Rôle dans l'application : référence pour utilisateurs, véhicules, planning et mise en route.
- Références Base44 à regarder : `src/pages/Depots.jsx`, `src/components/depots/DepotFormDialog.jsx`, entité `Depot`.
- Références repo officiel à regarder : `app/depots/*`, `app/api/depots/*`, `lib/services/depots/*`, `prisma/schema.prisma`.
- Dépendances amont : T4, T5, T6.
- Dépendances aval : P-UTILISATEURS-RH, P-VEHICULES, P-PLANNING, P-MISE-EN-ROUTE.
- Risques identifiés : permission dédiée absente du catalogue, restauration à confirmer, responsable local absent/à modéliser, compteurs denormalisés à refuser.
- Décisions déjà connues : nom unique par société, pas suppression physique, rattachements gérés depuis users/vehicles.
- Décisions restant à confirmer : `DEPOTS_MANAGE`, restauration/désarchivage, responsable local utilisateur, archivage avec rattachements.
- Découpage proposé en sessions courtes : audit, permission/RBAC, cycle archive, UI champs, validation.
- Critères de clôture du bloc : dépôts fiables pour modules dépendants, écarts de restauration/responsable explicités.
- Points de contrôle ChatGPT recommandés : vérifier pas de compteur stocké inutile et pas d'archive bloquante sans décision.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_PDEPOTS_AUDIT-REFERENTIEL | DX | AUDIT | Auditer champs, API, UI, rattachements, archive. | Dépôts officiel/Base44. | Correction. | `app/depots`, `app/api/depots`, services. | Écarts classés. | Extraits, status Git. | T5. |
| CX_PDEPOTS_COMPLETION-RBAC-API | CX | COMPLÉTION | Ajouter/aligner permission dépôts si validée. | Catalogue/helper/API. | UI refonte. | `lib/permissions.ts`, `app/api/depots`. | API protégée par permission validée. | Tests, diff. | T4. |
| CX_PDEPOTS_CORRECTION-CYCLE-ARCHIVE | CX | CORRECTION | Stabiliser archivage/restauration selon décision. | API/service/UI ciblés. | Suppression physique. | `lib/services/depots`, `app/depots`. | Cycle prouvé, audit produit. | Test/capture. | T6. |
| CX_PDEPOTS_COMPLETION-CHAMPS-UI | CX | COMPLÉTION | Compléter champs validés et avertissements rattachement. | Formulaire/table seulement. | Compteurs stockés. | `app/depots/depots-client.tsx`. | UX conforme fiches. | Captures, lint/build. | Audit. |
| QA_PDEPOTS_VALIDATION-REFERENTIEL | QA | VALIDATION | Vérifier création, édition, archive, droits, tenant. | Parcours API/UI. | Correction. | Browser/API. | Référentiel exploitable. | Commandes/captures. | CX. |

### BLOC P-UTILISATEURS-RH - Utilisateurs / RH

- Objectif du bloc : stabiliser utilisateurs, rôles, permissions, accès applicatif, absences et rattachement dépôt.
- Rôle dans l'application : référentiel RH et source planning.
- Références Base44 à regarder : `src/pages/Utilisateurs.jsx`, `src/components/utilisateurs/*`, entités `User`, `AbsenceRequest`, `Employee` à refuser comme entité séparée.
- Références repo officiel à regarder : `app/users/*`, `app/api/users/*`, `lib/services/users/*`, validators user/absence.
- Dépendances amont : T4, T5, T6, P-DEPOTS-BASES.
- Dépendances aval : P-PLANNING, P-DASHBOARD, P-MISE-EN-ROUTE.
- Risques identifiés : actions RH sensibles trop larges, reset password sans permission dédiée, filtres actifs/inactifs incohérents, données personnelles.
- Décisions déjà connues : pas de suppression physique par défaut, `User` officiel porte identité/RH minimale, absences simples existantes.
- Décisions restant à confirmer : accès applicatif séparé, workflow demandes d'absence, `USERS_PASSWORD_RESET`, multi-rôle maximum 3, statuts opérationnels.
- Découpage proposé en sessions courtes : audit, filtres/statuts, accès applicatif/reset, absences, RBAC/audit, validation.
- Critères de clôture du bloc : users/RH exploitables sans incohérence critique connue.
- Points de contrôle ChatGPT recommandés : vérifier cohérence UI/API et données personnelles audit/RGPD.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_PUSERS_AUDIT-RH-RBAC-DATA | DX | AUDIT | Auditer modèle, UI/API, droits, absences, Base44. | Code users, schema, fiches. | Correction. | `app/users`, `app/api/users`, services. | Matrice écarts RH. | Extraits, status Git. | T4/T5. |
| CX_PUSERS_CORRECTION-FILTRES-STATUTS | CX | CORRECTION | Corriger mismatch filtres actifs/inactifs et états. | Liste users/API si validé. | Workflow absence. | `app/users/*`, `app/api/users/route.ts`. | UI/API cohérents. | Tests/captures. | Audit. |
| CX_PUSERS_COMPLETION-ACCES-RESET | CX | COMPLÉTION | Stabiliser accès applicatif et reset password. | Actions ciblées, RBAC, audit. | Première connexion complète. | Dialogs users, reset route. | Action visible/protégée/tracée. | Diff, test API. | T4/T6. |
| CX_PUSERS_COMPLETION-ABSENCES | CX | COMPLÉTION | Stabiliser absences/indisponibilités Alpha. | CRUD absence, validations, audit. | Workflow validation avancé si non décidé. | `lib/services/users/user-absence.ts`, API absences. | Absence tenant-scopée et tracée. | Tests/captures. | T5/T6. |
| QA_PUSERS_VALIDATION-RH | QA | VALIDATION | Valider création/édition/archive/rattachement/absence/droits. | Parcours et tests qualité. | Correction. | Browser/API. | Écarts restants priorisés. | Commandes/captures. | CX. |

### BLOC P-VEHICULES - Véhicules

- Objectif du bloc : stabiliser la flotte administrative, ses statuts, rattachements et archivage.
- Rôle dans l'application : référentiel véhicules pour suivi, planning et dashboard.
- Références Base44 à regarder : `src/pages/Vehicules.jsx`, `src/components/vehicules/VehicleFormDialog.jsx`, `vehicleUtils.js`, entité `Vehicle`.
- Références repo officiel à regarder : `app/vehicles/*`, `app/api/vehicles/*`, `lib/services/vehicles/*`, `lib/validators/vehicle.ts`, schema `Vehicle`.
- Dépendances amont : T4, T5, T6, P-DEPOTS-BASES.
- Dépendances aval : P-SUIVI-VEHICULES, P-PLANNING, P-DASHBOARD.
- Risques identifiés : disponibilité opérationnelle mal modélisée, TPMR absent de l'enum, permission UI/API à vérifier, restauration à cadrer.
- Décisions déjà connues : véhicules administratifs distincts du suivi opérationnel ; pas suppression physique ; types officiels actuels `AMBULANCE`, `VSL`, `TAXI`.
- Décisions restant à confirmer : TPMR, disponibilité avec motif, restauration, `VEHICLES_AVAILABILITY`, champs documentaires complémentaires.
- Découpage proposé en sessions courtes : audit, statuts/disponibilité, API/RBAC, archive/restauration, validation.
- Critères de clôture du bloc : flotte fiable pour modules dépendants.
- Points de contrôle ChatGPT recommandés : vérifier que Suivi des véhicules n'est pas dilué dans le référentiel administratif.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_PVEHICULES_AUDIT-FLOTTE | DX | AUDIT | Auditer flotte, champs, statuts, permissions, Base44. | UI/API/services/schema. | Correction. | `app/vehicles`, `app/api/vehicles`, Prisma. | Écarts classés. | Extraits, status Git. | P-DEPOTS. |
| DX_PVEHICULES_CADRAGE-DISPONIBILITE-TPMR | DX | CADRAGE | Proposer traitement disponibilité/motif/TPMR. | Options data/RBAC/planning. | Migration. | Prisma futur, validators. | Arbitrage prêt validation. | Matrice options. | T5/T4. |
| CX_PVEHICULES_CORRECTION-RBAC-API | CX | CORRECTION | Aligner API/UI véhicules sur permissions validées. | Routes véhicules, actions UI. | Suivi véhicules. | `app/api/vehicles`, `vehicles-client`. | Front/API cohérents. | Tests/captures. | T4. |
| CX_PVEHICULES_COMPLETION-ARCHIVE-RESTAURE | CX | COMPLÉTION | Compléter cycle archive/restauration si validé. | Service/API/UI ciblés. | Suppression physique. | `lib/services/vehicles`, API archive. | Cycle prouvé et audité. | Diff, test. | T6. |
| QA_PVEHICULES_VALIDATION-FLOTTE | QA | VALIDATION | Vérifier CRUD, archive, tenant, droits, audit. | Parcours API/UI. | Correction. | Browser/API. | Flotte exploitable. | Commandes/captures. | CX. |

### BLOC P-SUIVI-VEHICULES - Suivi des véhicules

- Objectif du bloc : cadrer puis créer/stabiliser le suivi opérationnel véhicules Alpha.
- Rôle dans l'application : suivre vérifications, désinfections, anomalies et criticités opérationnelles.
- Références Base44 à regarder : `src/pages/SuiviVehicules.jsx`, `src/components/suivi/*`, entités `VehicleCheck`, `Disinfection`, `VehicleAnomaly`.
- Références repo officiel à regarder : `app/vehicles/*` pour fragments existants, schema Prisma, routes API véhicules, références 6.1.
- Dépendances amont : P-VEHICULES, T4, T5, T6.
- Dépendances aval : P-PLANNING, P-AUDIT, P-DASHBOARD, F1/F3.
- Risques identifiés : entités absentes Prisma, règles ARS non confirmées, permissions larges Base44 à refuser, risque de module trop gros.
- Décisions déjà connues : onglets Alpha attendus vue ensemble/vérifications/désinfections/anomalies ; pas d'indisponibilité automatique ; anomalie depuis vérification/désinfection possible.
- Décisions restant à confirmer : route autonome vs sous-module, modèles Prisma, permissions dédiées, règles ARS, contre-vérification habilitée ou simple différence de personne.
- Découpage proposé en sessions courtes : cadrage technique, modèles/API, UI par onglet, audit/RBAC, validation.
- Critères de clôture du bloc : périmètre Alpha situé clairement et fonctionnel ou report explicite.
- Points de contrôle ChatGPT recommandés : refuser toute absence volontaire de contrôle RBAC et tout automatisme d'indisponibilité non validé.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_PSUIVI_AUDIT-STATUT-TECHNIQUE | DX | AUDIT | Déterminer module autonome/sous-module et gaps officiels. | Code officiel, Base44, fiches 6.1. | Création code. | Routes véhicules, schema, docs 6.1. | Décision à confirmer documentée. | Matrice options. | P-VEHICULES. |
| DX_PSUIVI_CADRAGE-MODELES-API-RBAC | DX | CADRAGE | Définir modèles, endpoints, permissions, audit. | VehicleCheck/Disinfection/Anomaly candidats. | Migration. | Prisma/API futurs. | Plan technique prêt validation. | Diagramme/tableau. | T4/T5/T6. |
| CX_PSUIVI_CREATION-DATA-API | CX | CRÉATION | Créer modèles/API de suivi validés. | Prisma, validators, routes API. | UI complète. | `prisma/schema.prisma`, `app/api/vehicle-tracking` ou équivalent. | API tenant-scopée, RBAC, audit. | Migration, tests, lint/build. | Décision humaine. |
| CX_PSUIVI_CREATION-UI-ONGLETS | CX | CRÉATION | Créer UI de suivi par onglets en sessions séparables. | Vue ensemble puis onglet ciblé. | Tous onglets en une fois si trop large. | Page/composants suivi. | Onglet fonctionnel et contrôlable. | Captures, diff. | API suivi. |
| CX_PSUIVI_COMPLETION-ANOMALIES-LIAISONS | CX | COMPLÉTION | Relier anomalies depuis vérification/désinfection. | Flux ciblé, audit, RBAC. | Automatisme indisponibilité. | Services suivi. | Anomalie créée/tracée depuis source. | Test/capture. | UI/API suivi. |
| QA_PSUIVI_VALIDATION-OPERATIONNELLE | QA | VALIDATION | Valider onglets, droits, tenant, audit, états. | Parcours complet Alpha. | Correction lourde. | Browser/API. | Suivi véhicules exploitable ou écarts bloquants listés. | Captures/commandes. | CX. |

### BLOC P-MODELES-HORAIRES - Modèles horaires

- Objectif du bloc : aligner l'ancien module templates sur le référentiel `Modèles horaires`.
- Rôle dans l'application : source des affectations et repères planning.
- Références Base44 à regarder : `src/pages/ModelesHoraires.jsx`, `src/components/modeles/TemplateFormDialog.jsx`, entité `ShiftTemplate`.
- Références repo officiel à regarder : `app/templates/*`, `app/api/templates/*`, `lib/templates/*`, schema `ShiftTemplate`.
- Dépendances amont : T2, T4, T5, T6.
- Dépendances aval : P-PLANNING, P-MISE-EN-ROUTE, P-DASHBOARD.
- Risques identifiés : route `/templates` confuse, champs Base44 non alignés, duplication/restauration à confirmer, modèles sans horaires déjà à préserver.
- Décisions déjà connues : libellé produit `Modèles horaires`, route technique peut rester `/templates` tant que T2 non tranché.
- Décisions restant à confirmer : renommage route, duplication, jours actifs, compteur usage, restauration, granularité RBAC.
- Découpage proposé en sessions courtes : audit, nomenclature UI, archive/restore, champs horaires/jours actifs, validation planning.
- Critères de clôture du bloc : modèles exploitables et nommés correctement côté produit.
- Points de contrôle ChatGPT recommandés : vérifier qu'une modification de modèle ne modifie pas rétroactivement les shifts déjà créés.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_PMODELES_AUDIT-TEMPLATES-OFFICIEL | DX | AUDIT | Auditer route, champs, API, planning, Base44. | `templates`, schema, fiches. | Correction. | `app/templates`, `lib/templates`. | Écarts classés. | Extraits, status Git. | T2/T5. |
| CX_PMODELES_CORRECTION-LIBELLES-UI | CX | CORRECTION | Corriger libellés visibles résiduels. | Textes UI uniquement. | Renommage route. | `app/templates/*`, dashboard/shell si besoin. | Plus de libellé legacy visible ciblé. | Captures, diff. | T2. |
| CX_PMODELES_COMPLETION-ARCHIVE-RESTAURE | CX | COMPLÉTION | Stabiliser archivage/restauration/duplication si validés. | Actions ciblées. | Jours actifs si non décidé. | API/templates, services. | Cycle prouvé et audité. | Tests/captures. | T4/T6. |
| DX_PMODELES_CADRAGE-JOURS-ACTIFS | DX | CADRAGE | Cadrer jours actifs, horaires par jour, compteur usage. | Options data/planning. | Migration. | Prisma futur. | Décision prête validation. | Tableau risques. | P-PLANNING dépendance. |
| QA_PMODELES_VALIDATION-REFERENTIEL | QA | VALIDATION | Vérifier CRUD, états, droits, compatibilité planning. | Parcours UI/API. | Correction. | Browser/API. | Référentiel fiable. | Commandes/captures. | CX. |

### BLOC P-PLANNING - Planning

- Objectif du bloc : fiabiliser le planning manuel métier après stabilisation des référentiels.
- Rôle dans l'application : synthèse opérationnelle des utilisateurs, véhicules, dépôts et modèles.
- Références Base44 à regarder : `src/pages/Planning.jsx`, `src/components/planning/*`, `planningUtils.js`, `planningEligibility.js`, entité `PlanningEntry` à refuser comme remplacement.
- Références repo officiel à regarder : `app/planning/*`, `app/api/planning/*`, `lib/services/planning/*`, `lib/planning/export.ts`, schema `Shift`, `DraftShift`, `AutoScheduleRun`.
- Dépendances amont : P-SOCIETE, P-DEPOTS-BASES, P-UTILISATEURS-RH, P-VEHICULES, P-MODELES-HORAIRES, T4, T5, T6.
- Dépendances aval : P-DASHBOARD, P-AUDIT, F1/F2/F3.
- Risques identifiés : module très large, flux legacy, régression moteur d'affectation, règles métier non confirmées, planning automatique hors coeur Alpha.
- Décisions déjà connues : Alpha centré planning manuel métier synthétique ; `PlanningEntry` Base44 refusé ; actions publication/annulation doivent être tracées.
- Décisions restant à confirmer : semaine 53, publication avec besoins non couverts, compatibilité rôles/véhicules, jours fériés/week-ends, informations sensibles visibles par rôle.
- Découpage proposé en sessions courtes : audit flux, vues, actions manuelles, publication/annulation, exports, legacy, validation.
- Critères de clôture du bloc : parcours Alpha retenus fiables, écarts bloquants listés.
- Points de contrôle ChatGPT recommandés : empêcher une session "tout planning" et exiger preuves par flux.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_PPLANNING_AUDIT-FLUX-ACTIFS-LEGACY | DX | AUDIT | Cartographier flux actifs, legacy, vues, APIs. | Planning officiel/Base44. | Correction. | `app/planning`, `app/api/planning`, services. | Flux à garder/corriger/reportés. | Matrice, status Git. | Référentiels. |
| DX_PPLANNING_CADRAGE-PARCOURS-ALPHA | DX | CADRAGE | Définir parcours Alpha prioritaires et règles à confirmer. | Vues, actions, rôles, dépendances. | Codage. | Docs futures. | Périmètre réduit validable. | Tableau priorités. | Audit. |
| CX_PPLANNING_CORRECTION-ACTIONS-MANUELLES | CX | CORRECTION | Stabiliser création/édition affectation manuelle ciblée. | Un flux action. | Autoschedule avancé. | `planning-client`, API shifts. | Action tenant-scopée, RBAC, audit. | Test/capture. | T4/T6. |
| CX_PPLANNING_COMPLETION-PUBLICATION-ANNULATION | CX | COMPLÉTION | Stabiliser publication/annulation logique avec motif. | Flux ciblé. | Reporting. | API shifts/runs, audit. | Trace produite et état cohérent. | Tests/captures. | T6. |
| CX_PPLANNING_CORRECTION-VUES-UI | CX | CORRECTION | Corriger une vue Planning ciblée. | Une vue par session si nécessaire. | Changer moteur data. | `planning-client.tsx`, CSS. | Vue lisible et fidèle aux docs. | Captures desktop. | T3. |
| QA_PPLANNING_VALIDATION-PARCOURS | QA | VALIDATION | Vérifier parcours planning Alpha retenus. | Parcours navigateur/API/tests. | Correction. | Browser, tests. | Écarts listés par gravité. | Commandes/captures. | CX. |

### BLOC P-AUDIT - Audit / Traçabilité

- Objectif du bloc : garantir la consultation des traces officielles autorisées.
- Rôle dans l'application : interface de contrôle des actions sensibles.
- Références Base44 à regarder : `src/pages/Audit.jsx`, entité `AuditLog`, `auditLogger.js` à refuser comme preuve serveur.
- Références repo officiel à regarder : `app/audit/*`, `app/api/audit/route.ts`, `lib/services/audit/*`, schema logs.
- Dépendances amont : T6, T4, T5.
- Dépendances aval : F1, F2, F4.
- Risques identifiés : support global et `companyId` param, payload sensible, filtres incomplets, export audit non confirmé.
- Décisions déjà connues : page lecture seule ; accès `AUDIT_VIEW`/Admin/Gérant/support contrôlé.
- Décisions restant à confirmer : export audit, rétention, champs de contexte obligatoires, visibilité inter-tenant support.
- Découpage proposé en sessions courtes : audit page/API, filtres, détails payload, support, validation.
- Critères de clôture du bloc : traces autorisées consultables sans modification métier et sans fuite tenant.
- Points de contrôle ChatGPT recommandés : vérifier lecture seule, droits et payloads masqués si nécessaire.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_PAUDIT_AUDIT-PAGE-API-FILTRES | DX | AUDIT | Auditer consultation, filtres, support, payload. | Page/API/services. | Correction. | `app/audit`, `app/api/audit`. | Écarts classés. | Extraits, status Git. | T6. |
| CX_PAUDIT_CORRECTION-SCOPING-SUPPORT | CX | CORRECTION | Corriger scoping tenant/support si écart validé. | API audit et UI filtre société. | Audit write. | `app/api/audit/route.ts`, audit client. | Pas de fuite tenant. | Tests/captures. | T4/T5. |
| CX_PAUDIT_COMPLETION-FILTRES-DETAILS | CX | COMPLÉTION | Stabiliser filtres et panneau détail autorisé. | UI lecture seule. | Export audit. | `app/audit/audit-client.tsx`. | Filtres fonctionnels, détail lisible. | Captures. | T3/T6. |
| QA_PAUDIT_VALIDATION-LECTURE-SEULE | QA | VALIDATION | Vérifier lecture seule, droits, filtres, traces. | Parcours API/UI. | Correction. | Browser/API. | Page contrôlable. | Commandes/captures. | CX. |

### BLOC P-DASHBOARD - Tableau de bord comme portail fiable

- Objectif du bloc : fiabiliser le dashboard avec KPI, raccourcis et widgets basés sur des données réelles.
- Rôle dans l'application : portail d'entrée après connexion.
- Références Base44 à regarder : `src/pages/Dashboard.jsx`, `src/components/dashboard/*`, entité `DashboardPreference`.
- Références repo officiel à regarder : `app/dashboard/page.tsx`, `app/ui/stat-card.tsx`, données Prisma utilisées.
- Dépendances amont : T1, T3, T4, T5, référentiels métier.
- Dépendances aval : F1, F3, P-MISE-EN-ROUTE.
- Risques identifiés : données fictives, préférences absentes Prisma, raccourcis non autorisés, KPI coûteux ou incohérents.
- Décisions déjà connues : dashboard après connexion, données réelles, raccourcis selon droits.
- Décisions restant à confirmer : persistance `DashboardPreference`, personnalisation Alpha, widgets obligatoires, raccourci suivi véhicules.
- Découpage proposé en sessions courtes : audit, cadrage widgets, correction KPI/raccourcis, préférences si validées, validation.
- Critères de clôture du bloc : dashboard fiable, sans faux KPI, adapté aux permissions.
- Points de contrôle ChatGPT recommandés : vérifier que l'absence de donnée est affichée comme telle, jamais masquée par du statique.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_PDASHBOARD_AUDIT-KPI-WIDGETS-DROITS | DX | AUDIT | Auditer KPI, widgets, raccourcis, données. | Dashboard officiel/Base44. | Correction. | `app/dashboard/page.tsx`. | Faux/fragiles KPI identifiés. | Extraits, status Git. | Référentiels. |
| DX_PDASHBOARD_CADRAGE-PREFERENCES | DX | CADRAGE | Décider personnalisation/préférences Alpha. | Options sans/avec persistance. | Migration. | Prisma futur. | Choix prêt validation. | Options risques. | T5. |
| CX_PDASHBOARD_CORRECTION-KPI-REALES | CX | CORRECTION | Corriger KPI/raccourcis non fiables validés. | Page dashboard. | Préférences complexes. | `app/dashboard/page.tsx`. | Données réelles ou état vide. | Captures, tests. | T4/T5. |
| CX_PDASHBOARD_CREATION-PREFERENCES | CX | CRÉATION | Ajouter préférences si validées. | Modèle/API/UI préférences. | Reporting avancé. | Prisma, dashboard API/page. | Préférences tenant/user-scopées. | Migration, tests, captures. | Décision humaine. |
| QA_PDASHBOARD_VALIDATION-PORTAIL | QA | VALIDATION | Vérifier portail par rôles et données. | Parcours navigateur. | Correction. | Browser. | Raccourcis autorisés et KPI fiables. | Captures/commandes. | CX. |

### BLOC P-MISE-EN-ROUTE - Mise en route

- Objectif du bloc : stabiliser la checklist initiale après les référentiels.
- Rôle dans l'application : guide d'installation initiale sans remplacer les pages métier.
- Références Base44 à regarder : `src/pages/MiseEnRoute.jsx`, entité `OnboardingStep` à ne pas reprendre sans décision.
- Références repo officiel à regarder : `app/onboarding/*`, dashboard links, référentiels sources.
- Dépendances amont : P-SOCIETE, P-DEPOTS-BASES, P-UTILISATEURS-RH, P-VEHICULES, P-MODELES-HORAIRES, T2, T4.
- Dépendances aval : F1/F3, P-DASHBOARD.
- Risques identifiés : doublon avec Société, route `/onboarding`, calcul de complétion flou, imports non cadrés.
- Décisions déjà connues : libellé `Mise en route`; page séparée de Société ; progression basée sur modules sources.
- Décisions restant à confirmer : conditions de complétion, permission dédiée, import Alpha, table `OnboardingStep` ou calcul dynamique.
- Découpage proposé en sessions courtes : audit, cadrage étapes, correction liens/libellés, calculs, validation.
- Critères de clôture du bloc : checklist cohérente avec vrais modules, sans formulaire doublon.
- Points de contrôle ChatGPT recommandés : vérifier que Mise en route ne remplace pas les modules métier.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_PMER_AUDIT-CHECKLIST-SOURCES | DX | AUDIT | Auditer étapes, liens, calculs, droits. | `app/onboarding`, fiches, Base44. | Correction. | `app/onboarding/*`. | Écarts étapes/sources. | Extraits, status Git. | Référentiels. |
| DX_PMER_CADRAGE-CONDITIONS-COMPLETION | DX | CADRAGE | Définir conditions minimales par étape. | Table étapes/sources/droits. | Codage. | Docs futures. | Conditions validables. | Tableau. | Audit. |
| CX_PMER_CORRECTION-LIBELLES-LIENS | CX | CORRECTION | Corriger libellés, liens et redirects. | UI et liens. | Renommage route. | `app/onboarding/page.tsx`, client. | Liens vers modules vrais et autorisés. | Captures. | T2/T4. |
| CX_PMER_COMPLETION-CALCULS-PROGRESSION | CX | COMPLÉTION | Stabiliser calcul progression dynamique. | Requêtes sources, états. | Table OnboardingStep sans décision. | `app/onboarding/page.tsx`. | Progression cohérente avec données réelles. | Tests/captures. | T5. |
| QA_PMER_VALIDATION-MISE-EN-ROUTE | QA | VALIDATION | Vérifier parcours Admin/Gérant et droits. | Browser. | Correction. | Browser. | Checklist fiable. | Captures/commandes. | CX. |

### BLOC RGPD-PRIVACY - Privacy visible en Alpha

- Objectif du bloc : rendre les mentions Privacy visibles et cohérentes sans déclarer une conformité complète.
- Rôle dans l'application : information minimale données personnelles en Alpha.
- Références Base44 à regarder : aucune source technique à reprendre ; vérifier seulement que Base44 ne sert pas de preuve RGPD.
- Références repo officiel à regarder : `app/privacy/page.tsx`, `app/login/page.tsx`, `RGPD_BASE_MINIMALE.md`, tests qualité.
- Dépendances amont : P-LOGIN, T6, T7.
- Dépendances aval : F1/F4.
- Risques identifiés : promesse conformité excessive, contact privacy/DPO absent, conservation non définie, lien inaccessible.
- Décisions déjà connues : Privacy existe ; lien login attendu ; conformité complète non prouvée.
- Décisions restant à confirmer : responsable traitement, contact DPO/privacy, bases légales, rétention, export RGPD dédié.
- Découpage proposé en sessions courtes : audit mentions, correction contenu/lien, validation.
- Critères de clôture du bloc : Privacy visible, honnête sur les limites Alpha et sans sur-promesse.
- Points de contrôle ChatGPT recommandés : vérifier toutes les formulations juridiques non prouvées.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_RGPD_AUDIT-PRIVACY-ALPHA | DX | AUDIT | Auditer page Privacy, lien login, contenu RGPD minimal. | Docs RGPD, page, tests. | Correction. | `app/privacy/page.tsx`, `app/login/page.tsx`. | Écarts et sur-promesses listés. | Extraits, status Git. | P-LOGIN. |
| CX_RGPD_CORRECTION-MENTIONS-LIEN | CX | CORRECTION | Corriger lien ou contenu minimal validé. | Privacy/login seulement. | Politique complète. | `app/privacy/page.tsx`, `app/login/page.tsx`. | Page visible et prudente. | Captures, test quality. | Décision humaine. |
| QA_RGPD_VALIDATION-VISIBILITE | QA | VALIDATION | Vérifier accès public, lien login, absence promesse complète. | Navigateur + test smoke. | Correction. | Browser, tests. | Privacy accessible. | Commandes/captures. | CX éventuelle. |

### BLOC F1 - Validation fonctionnelle croisée

- Objectif du bloc : valider les parcours principaux après reprise ou reports acceptés.
- Rôle dans l'application : contrôle final des flux métier transverses.
- Références Base44 à regarder : pages Base44 comme parcours de comparaison, sans copier.
- Références repo officiel à regarder : pages/app APIs stabilisées, sessions clôturées, docs fonctions.
- Dépendances amont : blocs métier terminés ou reports acceptés.
- Dépendances aval : F4.
- Risques identifiés : valider implicitement une page incomplète, confondre report et réussite, corriger pendant validation.
- Décisions déjà connues : F1 ne corrige pas le code dans la même session.
- Décisions restant à confirmer : parcours exacts Alpha, rôles de test, données de test.
- Découpage proposé en sessions courtes : cadrage parcours, validation par domaine, synthèse.
- Critères de clôture du bloc : parcours validés ou écarts bloquants listés avec décision report/correction.
- Points de contrôle ChatGPT recommandés : vérifier que chaque validation a une preuve et un verdict.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_F1_CADRAGE-PARCOURS-ALPHA | DX | CADRAGE | Définir les parcours fonctionnels à tester. | Rôles, données, modules. | Tests code. | Docs validation futures. | Checklist validable. | Tableau parcours. | Blocs métier. |
| QA_F1_VALIDATION-REFERENTIELS | QA | VALIDATION | Valider société, dépôts, users, véhicules, modèles. | Parcours navigateur/API. | Correction. | Browser/API. | Écarts par module. | Captures/commandes. | Référentiels stabilisés. |
| QA_F1_VALIDATION-PLANNING-SUIVI | QA | VALIDATION | Valider planning et suivi véhicules retenus. | Parcours critiques. | Correction. | Browser/API. | Parcours ok ou bloquants listés. | Captures/commandes. | P-PLANNING/P-SUIVI. |
| QA_F1_VALIDATION-LOGIN-DASHBOARD-AUDIT | QA | VALIDATION | Valider entrée, portail, audit, privacy. | Parcours transverses. | Correction. | Browser/API. | Flux cohérents. | Captures/commandes. | P-LOGIN/P-DASH/P-AUDIT/RGPD. |
| DX_F1_CLOTURE-FONCTIONNELLE | DX | CLÔTURE | Synthétiser validations et écarts. | Rapport documentaire. | Validation humaine automatique. | Docs de phase. | Verdict explicite. | Preuves F1. | QA F1. |

### BLOC F2 - Validation qualité technique

- Objectif du bloc : vérifier qualité technique Alpha après reprises.
- Rôle dans l'application : sécuriser build, lint, tests, API/RBAC/multi-tenant.
- Références Base44 à regarder : uniquement pour appliquer l'exception documentaire si build/lint cite `EXPORT_BASE44`.
- Références repo officiel à regarder : `package.json`, scripts qualité, Prisma, API routes, docs session.
- Dépendances amont : blocs code terminés.
- Dépendances aval : F4.
- Risques identifiés : build/lint masqués par exception abusive, tests non représentatifs, dette Prisma non validée.
- Décisions déjà connues : exception Base44 documentaire possible sous conditions strictes.
- Décisions restant à confirmer : niveau minimal E2E, validation Prisma si migrations ajoutées, tolérance warnings.
- Découpage proposé en sessions courtes : cadrage commandes, exécution qualité, validation API/RBAC, synthèse.
- Critères de clôture du bloc : résultats exploitables et écarts bloquants séparés des reports.
- Points de contrôle ChatGPT recommandés : vérifier que tout échec est qualifié précisément.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_F2_CADRAGE-PLAN-QUALITE | DX | CADRAGE | Définir commandes et périmètre qualité. | Lint/build/tests/docs encoding. | Correction. | `package.json`, scripts. | Plan validable. | Liste commandes. | T7. |
| QA_F2_VALIDATION-LINT-BUILD | QA | VALIDATION | Exécuter lint/build et qualifier résultats. | Commandes projet. | Correction. | NPM. | Succès ou échecs qualifiés. | Logs synthèse. | Blocs code. |
| QA_F2_VALIDATION-TESTS-QUALITE | QA | VALIDATION | Exécuter tests smoke/targeted/quality. | Scripts qualité. | Ajout test. | `scripts/quality`. | Résultats exploitables. | Logs synthèse. | T7. |
| QA_F2_VALIDATION-API-RBAC-TENANT | QA | VALIDATION | Recontrôler contrats API/RBAC/multi-tenant critiques. | Routes sensibles. | Correction. | API/routes/tests. | Écarts classés. | Commandes/extraits. | T4/T5. |
| DX_F2_CLOTURE-QUALITE | DX | CLÔTURE | Documenter verdict qualité technique. | Synthèse. | Validation produit. | Docs phase. | Verdict explicite. | Preuves F2. | QA F2. |

### BLOC F3 - Validation UX visuelle

- Objectif du bloc : vérifier cohérence visuelle, responsive minimum et ergonomie des écrans critiques.
- Rôle dans l'application : contrôle final de l'alignement UI/UX avec maquettes/références.
- Références Base44 à regarder : prototype comme comparaison ergonomique uniquement.
- Références repo officiel à regarder : maquettes PNG, références UI/UX, pages rendues.
- Dépendances amont : T3, pages nécessaires terminées ou reportées.
- Dépendances aval : F4.
- Risques identifiés : vouloir refaire l'UI pendant validation, confondre capture Base44 avec référence officielle, oublier états.
- Décisions déjà connues : priorité desktop, UI SaaS métier claire, maquettes V2 prioritaires.
- Décisions restant à confirmer : seuil exact de conformité visuelle, viewports à tester, écarts acceptables Alpha.
- Découpage proposé en sessions courtes : cadrage écrans, validation desktop, validation responsive ciblée, synthèse.
- Critères de clôture du bloc : écrans critiques sans écart bloquant connu ou écarts listés.
- Points de contrôle ChatGPT recommandés : vérifier qu'aucune nouvelle fonctionnalité n'est demandée dans F3.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_F3_CADRAGE-ECRANS-CRITIQUES | DX | CADRAGE | Définir écrans, maquettes, viewports, états. | Références UI/UX, maquettes. | Correction. | Docs validation. | Checklist visuelle. | Tableau écrans. | T3. |
| QA_F3_VALIDATION-DESKTOP-PAGES | QA | VALIDATION | Capturer et comparer pages desktop critiques. | Browser/captures. | Correction. | Local app. | Écarts listés. | Captures. | Pages terminées. |
| QA_F3_VALIDATION-ETATS-UI | QA | VALIDATION | Vérifier empty/loading/error/disabled/focus sur surfaces critiques. | États UI. | Correction. | Browser. | États couverts ou écarts listés. | Captures. | T3. |
| QA_F3_VALIDATION-RESPONSIVE-MINIMUM | QA | VALIDATION | Vérifier absence de cassure mobile/tablette minimale. | Viewports ciblés. | Refonte responsive complète. | Browser. | Pas de chevauchement bloquant. | Captures. | Pages terminées. |
| DX_F3_CLOTURE-UX | DX | CLÔTURE | Synthétiser validation visuelle et reports. | Rapport F3. | Validation implicite. | Docs phase. | Verdict explicite. | Preuves F3. | QA F3. |

### BLOC F4 - Clôture documentaire Alpha ou clôture de phase

- Objectif du bloc : clôturer explicitement la phase ou acter la non-clôture et les reports.
- Rôle dans l'application : gouvernance de fin de phase avant suite Beta/V1.
- Références Base44 à regarder : synthèse Base44 seulement comme rappel des réserves prototype.
- Références repo officiel à regarder : `02`, `04`, `05`, rapports F1/F2/F3, sessions réellement créées.
- Dépendances amont : F1, F2, F3 terminés ou reportés explicitement.
- Dépendances aval : phase suivante.
- Risques identifiés : validation implicite, oublier reports, modifier MASTER sans validation, confondre Alpha clôturée et conformité complète.
- Décisions déjà connues : validation humaine obligatoire, preuves requises, reports explicitement acceptés.
- Décisions restant à confirmer : périmètre final Alpha, reports acceptés, prochaines priorités Beta/V1.
- Découpage proposé en sessions courtes : audit preuves, synthèse, mise à jour docs après validation.
- Critères de clôture du bloc : verdict clair `clôturée` ou `non clôturée`, preuves et reports visibles.
- Points de contrôle ChatGPT recommandés : vérifier que chaque bloc clôturé a preuve ou report accepté.

| Code session proposé | Nature | Type métier | Objectif précis | Périmètre inclus | Hors périmètre explicite | Zones probables futures | Critères de validation | Preuves attendues | Dépendances |
|---|---|---|---|---|---|---|---|---|---|
| DX_F4_AUDIT-PREUVES-PHASE | DX | AUDIT | Rassembler preuves F1/F2/F3 et décisions. | Rapports, sessions, Git. | Modification MASTER. | Docs phase. | Manques listés. | Tableau preuves. | F1/F2/F3. |
| DX_F4_CADRAGE-REPORTS-DECISIONS | DX | CADRAGE | Lister reports, risques et décisions humaines nécessaires. | Synthèse. | Clôture automatique. | Docs futures. | Liste de validation humaine. | Questions/risques. | Audit preuves. |
| DOC_F4_DOCUMENTATION-CLOTURE | DOC | DOCUMENTATION | Mettre à jour documents de clôture après validation. | `02`, `04`, `05` selon décision. | Code, nouvelles fonctionnalités. | MASTER officiels. | Docs cohérents et non contradictoires. | Diff docs, encodage. | Validation humaine explicite. |
| DX_F4_CLOTURE-OU-NON-CLOTURE | DX | CLÔTURE | Émettre verdict final de phase. | Synthèse clôture. | Correction. | Note de clôture. | Verdict explicite. | Git status, preuves. | DOC F4 si nécessaire. |

### 12.5 Décisions à confirmer avant production

- Comportement exact de `Se souvenir de moi` : durée, cookie, renouvellement, ou retrait/neutralisation de l'option.
- Renommage technique éventuel de `/templates` vers une route française ou maintien route anglaise avec libellé français.
- Renommage technique éventuel de `/onboarding` vers une route française ou maintien route anglaise avec libellé français.
- Statut technique du module `Suivi des véhicules` : route autonome, sous-module de `Véhicules`, ou hybride.
- Création ou report des modèles Prisma `VehicleCheck`, `Disinfection`, `VehicleAnomaly`.
- Création ou report de `CompanyContact`.
- Création ou report de `DashboardPreference`.
- Granularité RBAC : dépôts, contacts société, disponibilité véhicule, suivi véhicules, reset password, archive/restauration.
- Politique archive/restauration par module.
- Gestion officielle de TPMR, TPMR VSL, TPMR TAXI.
- Règles ARS exactes pour vérifications et désinfections.
- Conditions de complétion de Mise en route.
- Règles de publication planning avec besoins non couverts, semaine 53, jours fériés/week-ends et informations sensibles par rôle.
- Politique RGPD complète : responsable de traitement, contact privacy/DPO, bases légales, conservation, export RGPD dédié.
- Niveau de détail et de rétention audit, export audit et accès support.

### 12.6 Risques principaux à surveiller

- RBAC front/API incohérent sur actions sensibles.
- Multi-tenant incomplet ou dépendant d'un `companyId` client.
- Reprise directe de concepts Base44 incompatibles avec Prisma officiel.
- Gros blocs CX trop larges, notamment Planning et Suivi des véhicules.
- Audit client ou non transactionnel présenté comme preuve.
- Données fictives ou compteurs denormalisés présentés comme vérité.
- Confusion entre référentiel administratif Véhicules et suivi opérationnel.
- Privacy/RGPD sur-promis sans informations légales confirmées.
- Validation finale implicite de pages seulement parce que le code existe.
