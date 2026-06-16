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

**Identifiant**

T1

**Type de bloc**

Transverse

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION`

**Objectif**

Stabiliser sidebar, topbar, société courante, utilisateur courant, filtrage visible par droits et accès refusé.

**Dépendances**

- T2 si une convention de nommage bloque.
- T4 pour les permissions fines.

**Hors périmètre**

- Reprise profonde des pages métier.
- RBAC complet.
- Design system complet.

**Sessions prévues**

- DX audit + cadrage : cartographier shell/navigation, écarts, risques et questions bloquantes.
- CX prévisionnelles : `INFORMATION NON FOURNIE — À CONFIRMER APRÈS AUDIT CIBLÉ`.
- Clôture : DX si synthèse documentaire seule ; CX uniquement si un contrôle technique ou script est réellement modifié.

**Contrôles obligatoires**

Git, preuves de lecture, absence de patch applicatif en DX, contrôle navigateur/lint/build uniquement pour une CX qui modifie le code.

**Critère de sortie**

Le shell permet d'accéder aux modules autorisés et de refuser proprement les accès interdits, ou les écarts restants sont reportés explicitement.

**Documentation à mettre à jour**

`05`, références UI/UX, matrice RBAC si impact.

**Statut**

À faire.

### BLOC T2 - Nomenclature, routes et renommages futurs

**Identifiant**

T2

**Type de bloc**

Transverse

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES`

**Objectif**

Cadrer routes techniques, libellés UI et renommages futurs sans les exécuter par défaut.

**Dépendances**

`04`, `03`, références UI/UX, repo officiel en lecture seule.

**Hors périmètre**

Renommage effectif, migration de routes, refonte navigation, code applicatif en DX.

**Sessions prévues**

- DX audit + cadrage : matrice routes/libellés et décisions à confirmer.
- CX prévisionnelles : uniquement si l'audit valide un renommage ou une correction technique ciblée.
- Clôture : DX sauf modification technique réelle.

**Contrôles obligatoires**

Git, preuves, absence de modification code en DX, contrôle des liens/routes si une CX est validée.

**Critère de sortie**

Chaque élément litigieux est classé : conservé, à renommer plus tard, ou à confirmer.

**Documentation à mettre à jour**

`04`, `05`, conventions éventuelles.

**Statut**

À faire.

### BLOC T3 - Design system officiel et composants communs

**Identifiant**

T3

**Type de bloc**

Transverse

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM`

**Objectif**

Identifier et stabiliser les composants et états UI communs nécessaires aux pages Alpha.

**Dépendances**

T1, T2.

**Hors périmètre**

Copie de composants Base44, refonte visuelle globale, reprise complète d'une page.

**Sessions prévues**

- DX audit + cadrage : inventaire composants, états, écarts, priorités.
- CX prévisionnelles : à découper par composant ou famille d'états après audit ciblé.
- Clôture : DX sauf modification technique réelle.

**Contrôles obligatoires**

Git, preuves, Base44 en lecture seule, lint/build et contrôle visuel pour toute CX UI.

**Critère de sortie**

Les composants nécessaires sont fiables ou reportés explicitement.

**Documentation à mettre à jour**

Références UI/UX, `05`.

**Statut**

À faire.

### BLOC T4 - RBAC UI/API et matrice permissions

**Identifiant**

T4

**Type de bloc**

Transverse

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_PERMISSIONS`

**Objectif**

Poser une matrice RBAC progressive et vérifier les contrôles UI/API des actions sensibles.

**Dépendances**

T1, T5 si données société impliquées.

**Hors périmètre**

Matrice V1 complète non arbitrée, refonte globale auth.

**Sessions prévues**

- DX audit + cadrage : rôles, permissions, endpoints, écarts et questions.
- CX prévisionnelles : à découper par permission, endpoint, écran ou action sensible après audit ciblé.
- Clôture : DX sauf modification technique réelle.

**Contrôles obligatoires**

Preuves, tests rôles/endpoints pour toute CX, lint/build, preuve serveur/API.

**Critère de sortie**

Le RBAC Alpha minimal est cadré et les écarts prioritaires sont traités ou reportés.

**Documentation à mettre à jour**

Matrice permissions, `05`.

**Statut**

À faire.

### BLOC T5 - Données, multi-tenant et mapping Base44 vers officiel

**Identifiant**

T5

**Type de bloc**

Transverse

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT`

**Objectif**

Comparer les entités Base44 utiles au modèle officiel et cadrer le multi-tenant avant toute modification de données.

**Dépendances**

`01`, audits existants, T4 si droits impliqués.

**Hors périmètre**

Migration, modification Prisma, `prisma generate`, copie de modèle Base44.

**Sessions prévues**

- DX audit + cadrage : matrice entités/champs, écarts, accepté/refusé/à confirmer.
- CX prévisionnelles : à découper par modèle, relation ou contrôle multi-tenant après audit ciblé.
- Clôture : DX sauf modification technique réelle.

**Contrôles obligatoires**

Prisma en lecture si autorisé, Base44 lecture seule, preuve multi-tenant pour toute CX.

**Critère de sortie**

Les données utiles Alpha sont cadrées sans modification Prisma non autorisée.

**Documentation à mettre à jour**

Documentation données, `05`.

**Statut**

À faire.

### BLOC T6 - Audit et traçabilité transverse

**Identifiant**

T6

**Type de bloc**

Transverse

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T6_AUDIT_TRACABILITE`

**Objectif**

Définir les actions sensibles à tracer et le contrat minimal de traçabilité.

**Dépendances**

T4, T5.

**Hors périmètre**

Conformité RGPD complète, SIEM, politique de rétention finale.

**Sessions prévues**

- DX audit + cadrage : actions sensibles, traces existantes, contrat minimal.
- CX prévisionnelles : à découper par action sensible ou module après audit ciblé.
- Clôture : DX sauf modification technique réelle.

**Contrôles obligatoires**

Preuves, cohérence RBAC, test de trace produite pour toute CX.

**Critère de sortie**

Les actions sensibles prioritaires ont un contrat de trace ou un report explicite.

**Documentation à mettre à jour**

Documentation audit, `05`.

**Statut**

À faire.

### BLOC T7 - Qualité, tests et contrôles de reprise

**Identifiant**

T7

**Type de bloc**

Transverse

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_T7_QUALITE_CONTROLES`

**Objectif**

Définir les contrôles récurrents par type de session et les preuves minimales attendues.

**Dépendances**

`03`, README sessions, templates.

**Hors périmètre**

Exécution exhaustive de tous les tests hors contexte.

**Sessions prévues**

- DX audit + cadrage : DoD par type de session.
- CX prévisionnelles : uniquement pour outillage technique validé après audit ciblé.
- Clôture : DX sauf modification technique réelle.

**Contrôles obligatoires**

Git, diff, encodage, absence de modification hors périmètre, test non destructif pour tout script modifié.

**Critère de sortie**

Les futures sessions disposent d'un cadre de contrôle clair.

**Documentation à mettre à jour**

`03`, README sessions, templates, `05`.

**Statut**

À faire.

## 8. Blocs pages et modules

Les blocs pages/modules suivent la même logique : audit DX, découpage fin des CX après audit, clôture DX ou CX selon le périmètre réel.

### BLOC P-LOGIN - Connexion

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_LOGIN`

**Objectif**

Stabiliser le parcours de connexion officiel, dont `Se souvenir de moi` si confirmé.

**Dépendances**

T1, T4, RGPD-PRIVACY.

**Hors périmètre**

Inscription libre Alpha, MFA, SSO, mot de passe oublié si non validé.

**Sessions prévues**

- DX audit + cadrage : login, erreurs, redirections, session, Privacy.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon contrôles réellement nécessaires.

**Contrôles obligatoires**

Auth/redirections/navigateur/lint/build uniquement pour CX ; preuves et absence de patch applicatif pour DX.

**Critère de sortie**

Login utilisable, contrôlé et limites Alpha explicites.

**Documentation à mettre à jour**

Fiche Login, `05`, Privacy si impact.

**Statut**

À faire.

### BLOC P-SOCIETE - Société

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_SOCIETE`

**Objectif**

Stabiliser société courante, profil et contacts société multiples.

**Dépendances**

T4, T5, T6.

**Hors périmètre**

Facturation, abonnement, conformité juridique complète.

**Sessions prévues**

- DX audit + cadrage : profil, contacts, companyId, droits, audit.
- CX prévisionnelles : à découper après audit ciblé par écran, API ou contrôle.
- Clôture : DX ou CX selon périmètre réel.

**Contrôles obligatoires**

CompanyId, API/RBAC, audit et multi-tenant pour toute CX.

**Critère de sortie**

Société et contacts cohérents, cloisonnés et contrôlés.

**Documentation à mettre à jour**

Fiche Société, documentation données, `05`.

**Statut**

À faire.

### BLOC P-DEPOTS-BASES - Dépôts / Bases

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_DEPOTS_BASES`

**Objectif**

Stabiliser le référentiel des dépôts/bases.

**Dépendances**

T4, T5, T6.

**Hors périmètre**

Géolocalisation avancée, automatisations planning futures.

**Sessions prévues**

- DX audit + cadrage : référentiel, rattachements, dépendances.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon périmètre réel.

**Contrôles obligatoires**

API/RBAC, multi-tenant, audit et lint/build pour toute CX.

**Critère de sortie**

Dépôts fiables pour RH, véhicules et planning.

**Documentation à mettre à jour**

Fiche Dépôts/Bases, `05`.

**Statut**

À faire.

### BLOC P-UTILISATEURS-RH - Utilisateurs / RH

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_UTILISATEURS_RH`

**Objectif**

Stabiliser utilisateurs, rôles, accès applicatif, données RH minimales et indisponibilités.

**Dépendances**

T4, T5, T6, P-DEPOTS-BASES.

**Hors périmètre**

Paie, RH avancée, permissions fines non validées.

**Sessions prévues**

- DX audit + cadrage : modèles, UI/API, rôles, accès et écarts.
- CX prévisionnelles : à découper après audit ciblé par écran, action, endpoint ou permission.
- Clôture : DX ou CX selon périmètre réel.

**Contrôles obligatoires**

API/RBAC, multi-tenant, audit, lint/build pour toute CX.

**Critère de sortie**

Utilisateurs/RH exploitables sans incohérence critique connue.

**Documentation à mettre à jour**

Fiche Utilisateurs/RH, matrice RBAC, `05`.

**Statut**

À faire.

### BLOC P-VEHICULES - Véhicules

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_VEHICULES`

**Objectif**

Stabiliser la flotte administrative.

**Dépendances**

T4, T5, T6, P-DEPOTS-BASES.

**Hors périmètre**

Suivi opérationnel détaillé, maintenance prédictive.

**Sessions prévues**

- DX audit + cadrage : flotte, statuts, archivage, disponibilité.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon périmètre réel.

**Contrôles obligatoires**

API/RBAC, multi-tenant, audit, lint/build pour toute CX.

**Critère de sortie**

Flotte administrative fiable pour modules dépendants.

**Documentation à mettre à jour**

Fiche Véhicules, `05`.

**Statut**

À faire.

### BLOC P-SUIVI-VEHICULES - Suivi des véhicules

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_SUIVI_VEHICULES`

**Objectif**

Cadrer puis reprendre le suivi opérationnel des véhicules en statut hybride.

**Dépendances**

P-VEHICULES, T4, T5, T6.

**Hors périmètre**

Signature électronique, preuve mobile, maintenance prédictive, règles ARS complètes non confirmées.

**Sessions prévues**

- DX audit + cadrage : statut technique, vue d'ensemble, vérifications, désinfections, anomalies.
- CX prévisionnelles : à découper après audit ciblé par sous-flux confirmé.
- Clôture : DX ou CX selon périmètre réel.

**Contrôles obligatoires**

Navigateur, API/RBAC, multi-tenant, audit et lint/build pour toute CX.

**Critère de sortie**

Suivi véhicules situé clairement et fonctionnel sur le périmètre Alpha retenu.

**Documentation à mettre à jour**

Fiche Suivi véhicules, matrice RBAC, documentation audit, `05`.

**Statut**

À confirmer après audit ciblé.

### BLOC P-MODELES-HORAIRES - Modèles horaires

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_MODELES_HORAIRES`

**Objectif**

Aligner le référentiel des modèles horaires avec la terminologie produit officielle.

**Dépendances**

T2, T4, T5.

**Hors périmètre**

Renommage technique sans décision, reprise complète planning.

**Sessions prévues**

- DX audit + cadrage : modèles horaires, route actuelle, dépendance planning.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon périmètre réel.

**Contrôles obligatoires**

API/RBAC, compatibilité planning, lint/build pour toute CX.

**Critère de sortie**

Modèles horaires exploitables et nommés correctement côté produit.

**Documentation à mettre à jour**

Fiche Modèles horaires, `05`, conventions.

**Statut**

À faire.

### BLOC P-PLANNING - Planning

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_PLANNING`

**Objectif**

Reprendre le planning après stabilisation des référentiels et données sources.

**Dépendances**

P-SOCIETE, P-DEPOTS-BASES, P-UTILISATEURS-RH, P-VEHICULES, P-MODELES-HORAIRES, T4, T5, T6.

**Hors périmètre**

Planification automatique avancée, reporting analytique, agenda heure par heure si non validé.

**Sessions prévues**

- DX audit + cadrage : dépendances, vues, affectations, publication, annulation logique.
- CX prévisionnelles : à découper après audit ciblé par vue, action, contrôle ou endpoint.
- Clôture : DX ou CX selon périmètre réel.

**Contrôles obligatoires**

Fonctionnel ciblé, API/RBAC, audit, multi-tenant, navigateur, lint/build pour toute CX.

**Critère de sortie**

Planning manuel métier fiable sur les parcours Alpha retenus.

**Documentation à mettre à jour**

Fiche Planning, matrice RBAC, `05`.

**Statut**

À faire.

### BLOC P-AUDIT - Audit / Traçabilité

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_AUDIT`

**Objectif**

Garantir la consultation des traces officielles autorisées.

**Dépendances**

T6, T4.

**Hors périmètre**

SIEM, purge/rétention complète, conformité RGPD finale.

**Sessions prévues**

- DX audit + cadrage : page, filtres, droits, traces disponibles.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon périmètre réel.

**Contrôles obligatoires**

Lecture seule, API/RBAC, lint/build pour toute CX.

**Critère de sortie**

Traces officielles autorisées consultables sans modification non voulue.

**Documentation à mettre à jour**

Documentation audit, matrice RBAC, `05`.

**Statut**

À faire.

### BLOC P-DASHBOARD - Tableau de bord

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_DASHBOARD`

**Objectif**

Fiabiliser le dashboard après stabilisation des données sources.

**Dépendances**

T1, T4, T5, référentiels utiles.

**Hors périmètre**

Reporting avancé, préférences complexes non confirmées, données fictives.

**Sessions prévues**

- DX audit + cadrage : KPI, widgets, raccourcis, données et droits.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon périmètre réel.

**Contrôles obligatoires**

Données réelles, RBAC, navigateur, lint/build pour toute CX.

**Critère de sortie**

Dashboard fiable, sans données fictives présentées comme réelles.

**Documentation à mettre à jour**

Fiche Dashboard, documentation données, `05`.

**Statut**

À faire.

### BLOC P-MISE-EN-ROUTE - Mise en route

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_P_MISE_EN_ROUTE`

**Objectif**

Stabiliser l'assistant de configuration initiale après les référentiels métier.

**Dépendances**

P-SOCIETE, P-DEPOTS-BASES, P-UTILISATEURS-RH, P-VEHICULES, P-MODELES-HORAIRES.

**Hors périmètre**

Onboarding marketing, tutoriels avancés, renommage technique sans décision.

**Sessions prévues**

- DX audit + cadrage : checklist, liens, données sources et libellés.
- CX prévisionnelles : à découper après audit ciblé.
- Clôture : DX ou CX selon périmètre réel.

**Contrôles obligatoires**

Liens, données sources, RBAC visible, navigateur, lint/build pour toute CX.

**Critère de sortie**

Mise en route cohérente avec les vrais modules sources.

**Documentation à mettre à jour**

Fiche Mise en route, conventions, `05`.

**Statut**

À faire.

## 9. Bloc RGPD et Privacy

### BLOC RGPD-PRIVACY - Privacy visible en Alpha

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_RGPD_PRIVACY`

**Objectif**

Garantir une Privacy visible en Alpha et documenter les limites RGPD sans déclarer une conformité complète non prouvée.

**Dépendances**

P-LOGIN, `01`, règles RGPD minimales connues.

**Hors périmètre**

Conformité RGPD complète, politique légale exhaustive, DPO/base légale/rétention/purge non confirmés.

**Sessions prévues**

- DX audit + cadrage : présence, accessibilité, lien login et limites Alpha.
- CX prévisionnelles : uniquement si l'audit confirme une correction applicative ciblée.
- Clôture : DX ou CX selon périmètre réel.

**Contrôles obligatoires**

Navigateur, lien login/privacy, absence de déclaration de conformité complète, lint/build pour toute CX.

**Critère de sortie**

Privacy visible et cohérente avec les limites Alpha.

**Documentation à mettre à jour**

Documentation RGPD, Login, `05`.

**Statut**

À faire.

## 10. Validations finales et gel Alpha

### BLOC F1 - Validation fonctionnelle croisée

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_F1_VALIDATION_FONCTIONNELLE`

**Objectif**

Vérifier les parcours fonctionnels transverses après blocs métier.

**Dépendances**

Blocs métier nécessaires terminés ou reports acceptés.

**Hors périmètre**

Correction code pendant validation, nouvelles fonctionnalités.

**Sessions prévues**

- DX audit + cadrage : parcours à valider, données et rôles.
- CX prévisionnelles : uniquement si scripts/tests applicatifs sont modifiés.
- Clôture : DX.

**Contrôles obligatoires**

Navigateur, RBAC, données de test, captures si UI.

**Critère de sortie**

Parcours principaux validés ou écarts bloquants listés et reportés.

**Documentation à mettre à jour**

Rapports de validation, `05`.

**Statut**

À faire.

### BLOC F2 - Validation qualité technique

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_F2_VALIDATION_QUALITE`

**Objectif**

Vérifier lint, build, tests disponibles, API/RBAC et multi-tenant après reprise.

**Dépendances**

Blocs code nécessaires terminés.

**Hors périmètre**

Correction dans la même session de validation, migration non prévue.

**Sessions prévues**

- DX audit + cadrage : commandes et périmètre de validation.
- CX prévisionnelles : uniquement si scripts/tests techniques sont modifiés.
- Clôture : DX.

**Contrôles obligatoires**

Lint, build, tests disponibles, contrôles API/RBAC, multi-tenant.

**Critère de sortie**

Contrôles techniques Alpha exécutés et résultats exploitables.

**Documentation à mettre à jour**

Rapports qualité, `05`.

**Statut**

À faire.

### BLOC F3 - Validation UX visuelle

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_F3_VALIDATION_UX`

**Objectif**

Vérifier cohérence visuelle, responsive et ergonomique des parcours critiques.

**Dépendances**

T1, T3, blocs pages nécessaires.

**Hors périmètre**

Refonte UI globale pendant validation, nouvelle maquette non validée.

**Sessions prévues**

- DX audit + cadrage : écrans et critères visuels.
- CX prévisionnelles : uniquement si outil ou code de test visuel est modifié.
- Clôture : DX.

**Contrôles obligatoires**

Navigateur, responsive, états UI, captures utiles.

**Critère de sortie**

Écrans critiques sans écart visuel bloquant connu ou écarts listés.

**Documentation à mettre à jour**

Références UI/UX si décision validée, rapports F3, `05`.

**Statut**

À faire.

### BLOC F4 - Clôture documentaire Alpha ou clôture de phase

**Dossier cible**

`docs/2-SESSIONS/1-ALPHA/BLOC_F4_CLOTURE_ALPHA`

**Objectif**

Clôturer la phase ou acter explicitement la non-clôture et les reports.

**Dépendances**

F1, F2, F3 terminés ou reportés explicitement.

**Hors périmètre**

Nouvelle fonctionnalité, correction code non séparée, validation implicite.

**Sessions prévues**

- DX audit + cadrage : preuves, décisions, reports.
- DX clôture : note de clôture ou non-clôture.

**Contrôles obligatoires**

Preuves F1/F2/F3, Git status, cohérence MASTER, absence validation implicite.

**Critère de sortie**

Phase clôturée ou non clôturée explicitement, avec preuves et décisions visibles.

**Documentation à mettre à jour**

`02`, `04`, `05`, synthèse de phase.

**Statut**

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
