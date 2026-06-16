# Ambulance Manager - Blocs et sessions de production

Date de refonte ciblée : 16/06/2026

## 1. Rôle du document

Ce fichier est le document opérationnel officiel des blocs et sessions de production.

`docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md` reste le plan maître court : ordre global, principes et dépendances.

Le présent fichier porte le détail opérationnel : blocs, sessions prévues, type DX/CX, production attendue, contrôles, critères de sortie et statuts.

Il ne doit pas devenir une copie de `04`, un audit détaillé ou une fiche fonctionnelle complète.

## 2. Règles générales de sessions

- `DX` = session documentaire utile au code.
- `CX` = session code, applicative ou technique.
- `DX` ou `CX` doit être visible dans le nom du dossier de session.
- Les sessions DX autorisées sont uniquement audit + cadrage sous validation, ou clôture.
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

Convention cible des sessions :

- `SESSION-YYYYMMDD-NN_DX_<BLOC>_<OBJET>`
- `SESSION-YYYYMMDD-NN_CX_<BLOC>_<OBJET>`

`NN` est le numéro d'ordre journalier. Il évite les collisions et garde l'historique lisible.

Exemples de dossiers de blocs :

- `BLOC_T1_SHELL_NAVIGATION`
- `BLOC_P_LOGIN`
- `BLOC_RGPD_PRIVACY`
- `BLOC_F1_VALIDATION_FONCTIONNELLE`

## 4. Modèle obligatoire de fiche de bloc

Chaque bloc doit contenir :

- Identifiant du bloc
- Nom du bloc
- Type de bloc : transverse / page / RGPD / finalisation
- Dossier cible dans `docs/2-SESSIONS/1-ALPHA`
- Objectif
- Dépendances
- Hors périmètre
- Sessions prévues
- Pour chaque session : nom cible, type DX ou CX, objectif unique, production attendue, contrôles obligatoires, critère de validation.
- Critère de sortie du bloc
- Documentation à mettre à jour si nécessaire
- Statut

## 5. Blocs transversaux

### BLOC T2 - Nomenclature, routes et renommages futurs

- Identifiant du bloc : T2
- Nom du bloc : Nomenclature, routes et renommages futurs
- Type de bloc : transverse
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES`
- Objectif : cadrer les routes techniques, les libellés UI et les renommages futurs sans les exécuter par défaut.
- Dépendances : `04`, `03`, références UI/UX, repo officiel en lecture seule.
- Hors périmètre : renommage effectif, migration de routes, refonte navigation, code applicatif en DX.
- Sessions prévues :
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T2_AUDIT_CADRAGE_NOMENCLATURE`
    - Type : DX
    - Objectif unique : cartographier les routes, libellés, écarts et décisions à confirmer.
    - Production attendue : matrice routes/libellés et questions de cadrage.
    - Contrôles obligatoires : fichiers lus, `git status --short`, absence de modification code, encodage si documentation modifiée.
    - Critère de validation : chaque élément litigieux est classé conservé, à renommer plus tard ou à confirmer.
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T2_CLOTURE_NOMENCLATURE`
    - Type : DX
    - Objectif unique : clôturer le bloc ou lister les reports validés.
    - Production attendue : note de clôture ou non-clôture.
    - Contrôles obligatoires : preuves, cohérence `04`/`05`, verdict explicite.
    - Critère de validation : statut du bloc explicite.
- Critère de sortie du bloc : les conventions de routes/libellés sont exploitables pour les blocs suivants.
- Documentation à mettre à jour si nécessaire : `04`, `05`, conventions éventuelles.
- Statut : À faire.

### BLOC T1 - Shell global, navigation et contexte connecté

- Identifiant du bloc : T1
- Nom du bloc : Shell global, navigation et contexte connecté
- Type de bloc : transverse
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION`
- Objectif : stabiliser sidebar, topbar, société courante, utilisateur courant, filtrage visible par droits et accès refusé.
- Dépendances : T2 si nomenclature bloque, T4 pour permissions fines.
- Hors périmètre : reprise profonde des pages métier, RBAC complet, design system complet.
- Sessions prévues :
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T1_AUDIT_CADRAGE_SHELL`
    - Type : DX
    - Objectif unique : auditer l'existant shell/navigation et préparer les corrections.
    - Production attendue : cartographie shell, écarts, questions bloquantes.
    - Contrôles obligatoires : lecture repo ciblée, comparaison Base44 lecture seule, preuves, absence patch applicatif.
    - Critère de validation : sessions CX nécessaires identifiées ou absence de correction justifiée.
  - Nom cible : `SESSION-YYYYMMDD-NN_CX_T1_CORRECTION_SHELL_NAVIGATION`
    - Type : CX
    - Objectif unique : corriger un lot limité du shell validé après audit.
    - Production attendue : patch `.diff` si code ou UI modifié.
    - Contrôles obligatoires : lint/build adaptés, navigateur si UI modifiée, RBAC visible si concerné.
    - Critère de validation : navigation connectée utilisable sans incohérence critique connue.
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T1_CLOTURE_SHELL`
    - Type : DX
    - Objectif unique : clôturer ou reporter explicitement les écarts restants.
    - Production attendue : synthèse et verdict.
    - Contrôles obligatoires : preuves, statut, absence validation implicite.
    - Critère de validation : bloc clôturé ou non-clôturé avec raisons.
- Critère de sortie du bloc : le shell permet d'accéder aux modules autorisés et de refuser proprement les accès interdits.
- Documentation à mettre à jour si nécessaire : `05`, références UI/UX, matrice RBAC si impact.
- Statut : À faire.

### BLOC T3 - Design system officiel et composants communs

- Identifiant du bloc : T3
- Nom du bloc : Design system officiel et composants communs
- Type de bloc : transverse
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM`
- Objectif : stabiliser les composants et états UI communs nécessaires aux pages Alpha.
- Dépendances : T2, T1 pour contexte de navigation.
- Hors périmètre : copie de composants Base44, refonte visuelle globale, reprise complète d'une page.
- Sessions prévues :
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T3_AUDIT_CADRAGE_DESIGN_SYSTEM`
    - Type : DX
    - Objectif unique : inventorier composants officiels, états et écarts.
    - Production attendue : inventaire et priorités.
    - Contrôles obligatoires : fichiers lus, Base44 lecture seule, absence code.
    - Critère de validation : composants à corriger ou compléter identifiés.
  - Nom cible : `SESSION-YYYYMMDD-NN_CX_T3_CORRECTION_COMPOSANTS_COMMUNS`
    - Type : CX
    - Objectif unique : corriger un lot limité de composants communs validés.
    - Production attendue : patch `.diff` si code modifié.
    - Contrôles obligatoires : lint/build, contrôle visuel, responsive si UI.
    - Critère de validation : composants ciblés exploitables.
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T3_CLOTURE_DESIGN_SYSTEM`
    - Type : DX
    - Objectif unique : clôturer le bloc ou lister les reports.
    - Production attendue : verdict.
    - Contrôles obligatoires : cohérence preuves/statut.
    - Critère de validation : statut exploitable pour les blocs pages.
- Critère de sortie du bloc : les composants nécessaires aux premières reprises sont fiables ou reportés explicitement.
- Documentation à mettre à jour si nécessaire : références UI/UX, `05`.
- Statut : À faire.

### BLOC T4 - RBAC UI/API et matrice permissions

- Identifiant du bloc : T4
- Nom du bloc : RBAC UI/API et matrice permissions
- Type de bloc : transverse
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_PERMISSIONS`
- Objectif : poser une matrice RBAC progressive et vérifier les contrôles UI/API des actions sensibles.
- Dépendances : T2, T1, T5 si données société impliquées.
- Hors périmètre : matrice V1 complète non arbitrée, refonte globale auth.
- Sessions prévues :
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T4_AUDIT_CADRAGE_RBAC`
    - Type : DX
    - Objectif unique : cartographier rôles, permissions, endpoints et écarts.
    - Production attendue : matrice minimale et questions bloquantes.
    - Contrôles obligatoires : lecture ciblée UI/API, preuves, absence patch.
    - Critère de validation : périmètre RBAC Alpha minimal défini ou questions listées.
  - Nom cible : `SESSION-YYYYMMDD-NN_CX_T4_CORRECTION_RBAC_PRIORITAIRE`
    - Type : CX
    - Objectif unique : corriger un écart RBAC prioritaire validé.
    - Production attendue : patch `.diff`.
    - Contrôles obligatoires : tests rôles/endpoints, lint/build, preuve serveur/API.
    - Critère de validation : écart ciblé non contournable.
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T4_CLOTURE_RBAC`
    - Type : DX
    - Objectif unique : clôturer ou reporter explicitement.
    - Production attendue : synthèse RBAC.
    - Contrôles obligatoires : preuves, verdict.
    - Critère de validation : matrice et reports exploitables.
- Critère de sortie du bloc : le RBAC Alpha minimal est cadré et les écarts prioritaires sont traités ou reportés.
- Documentation à mettre à jour si nécessaire : matrice permissions, `05`.
- Statut : À faire.

### BLOC T5 - Données, multi-tenant et mapping Base44 vers officiel

- Identifiant du bloc : T5
- Nom du bloc : Données, multi-tenant et mapping Base44 vers officiel
- Type de bloc : transverse
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT`
- Objectif : comparer les entités Base44 utiles au modèle officiel et cadrer le multi-tenant avant toute modification de données.
- Dépendances : T2, `01`, audits existants.
- Hors périmètre : migration, modification Prisma, `prisma generate`, copie de modèle Base44.
- Sessions prévues :
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T5_AUDIT_CADRAGE_DONNEES`
    - Type : DX
    - Objectif unique : produire la matrice entités/champs et écarts.
    - Production attendue : cartographie accepté/refusé/à confirmer.
    - Contrôles obligatoires : Prisma en lecture si autorisé, Base44 lecture seule, preuves.
    - Critère de validation : besoins Prisma futurs identifiés sans modification non autorisée.
  - Nom cible : `SESSION-YYYYMMDD-NN_CX_T5_CORRECTION_MULTI_TENANT_CIBLEE`
    - Type : CX
    - Objectif unique : corriger un écart multi-tenant validé.
    - Production attendue : patch `.diff`.
    - Contrôles obligatoires : tests multi-tenant, API/RBAC si concerné, lint/build.
    - Critère de validation : absence de fuite inter-sociétés sur le périmètre corrigé.
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T5_CLOTURE_DONNEES`
    - Type : DX
    - Objectif unique : clôturer le mapping ou lister les reports.
    - Production attendue : synthèse.
    - Contrôles obligatoires : preuves, verdict.
    - Critère de validation : données Alpha cadrées.
- Critère de sortie du bloc : les données utiles Alpha sont cadrées sans modification Prisma non autorisée.
- Documentation à mettre à jour si nécessaire : documentation données, `05`.
- Statut : À faire.

### BLOC T6 - Audit et traçabilité transverse

- Identifiant du bloc : T6
- Nom du bloc : Audit et traçabilité transverse
- Type de bloc : transverse
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_T6_AUDIT_TRACABILITE`
- Objectif : définir les actions sensibles à tracer et le contrat minimal de traçabilité.
- Dépendances : T4, T5.
- Hors périmètre : conformité RGPD complète, SIEM, politique de rétention finale non confirmée.
- Sessions prévues :
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T6_AUDIT_CADRAGE_TRACABILITE`
    - Type : DX
    - Objectif unique : cartographier actions sensibles et traces existantes.
    - Production attendue : contrat audit minimal.
    - Contrôles obligatoires : lecture ciblée, preuves, questions.
    - Critère de validation : actions prioritaires identifiées.
  - Nom cible : `SESSION-YYYYMMDD-NN_CX_T6_CORRECTION_TRACE_CIBLEE`
    - Type : CX
    - Objectif unique : corriger une trace sensible validée.
    - Production attendue : patch `.diff`.
    - Contrôles obligatoires : test de trace produite, lint/build, RBAC si concerné.
    - Critère de validation : trace ciblée exploitable.
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T6_CLOTURE_TRACABILITE`
    - Type : DX
    - Objectif unique : clôturer ou reporter.
    - Production attendue : verdict.
    - Contrôles obligatoires : preuves, cohérence T4/T5.
    - Critère de validation : contrat minimal exploitable.
- Critère de sortie du bloc : les actions sensibles prioritaires ont un contrat de trace ou un report explicite.
- Documentation à mettre à jour si nécessaire : documentation audit, `05`.
- Statut : À faire.

### BLOC T7 - Qualité, tests et contrôles de reprise

- Identifiant du bloc : T7
- Nom du bloc : Qualité, tests et contrôles de reprise
- Type de bloc : transverse
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_T7_QUALITE_CONTROLES`
- Objectif : définir les contrôles récurrents par type de session et les preuves minimales attendues.
- Dépendances : `03`, README sessions, templates.
- Hors périmètre : exécution exhaustive de tous les tests hors contexte.
- Sessions prévues :
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T7_AUDIT_CADRAGE_CONTROLES`
    - Type : DX
    - Objectif unique : cadrer la DoD par type de session.
    - Production attendue : grille de contrôles.
    - Contrôles obligatoires : cohérence `03`, README, templates.
    - Critère de validation : contrôles applicables par DX/CX.
  - Nom cible : `SESSION-YYYYMMDD-NN_CX_T7_OUTILLAGE_CONTROLES`
    - Type : CX
    - Objectif unique : corriger un outil technique de contrôle validé.
    - Production attendue : patch `.diff` si script/code modifié.
    - Contrôles obligatoires : test non destructif, lint/build si applicable.
    - Critère de validation : outil ciblé fonctionne.
  - Nom cible : `SESSION-YYYYMMDD-NN_DX_T7_CLOTURE_CONTROLES`
    - Type : DX
    - Objectif unique : clôturer le cadre qualité.
    - Production attendue : verdict.
    - Contrôles obligatoires : preuves, absence validation implicite.
    - Critère de validation : cadre réutilisable.
- Critère de sortie du bloc : les futures sessions disposent d'un cadre de contrôle clair.
- Documentation à mettre à jour si nécessaire : `03`, README sessions, templates, `05`.
- Statut : À faire.

## 6. Blocs pages / modules

Les sessions CX ci-dessous sont prévisionnelles et doivent être confirmées par l'audit ciblé DX du bloc. Si l'audit révèle un périmètre différent, noter : `INFORMATION NON FOURNIE — À CONFIRMER APRÈS AUDIT CIBLÉ`.

### BLOC P-LOGIN - Connexion

- Identifiant du bloc : P-LOGIN
- Nom du bloc : Connexion, incluant `Se souvenir de moi`
- Type de bloc : page
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_P_LOGIN`
- Objectif : stabiliser le parcours de connexion officiel.
- Dépendances : T1, T4, RGPD-PRIVACY pour le lien Privacy.
- Hors périmètre : inscription libre Alpha, MFA, SSO, mot de passe oublié si non validé.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_P-LOGIN_AUDIT_CADRAGE_LOGIN` : DX, auditer login, erreurs, redirections, session et Privacy ; produire écarts et questions ; contrôles Git/preuves/absence code ; validation si périmètre CX confirmé.
  - `SESSION-YYYYMMDD-NN_CX_P-LOGIN_CORRECTION_LOGIN` : CX, corriger un lot login validé ; produire patch `.diff` ; contrôles auth/redirections/navigateur/lint/build ; validation si parcours ciblé fonctionne.
  - `SESSION-YYYYMMDD-NN_DX_P-LOGIN_CLOTURE_LOGIN` : DX, clôturer ou reporter ; produire verdict ; contrôles preuves/statut.
- Critère de sortie du bloc : login utilisable, contrôlé et limites Alpha explicites.
- Documentation à mettre à jour si nécessaire : fiche Login, `05`, Privacy si impact.
- Statut : À faire.

### BLOC P-SOCIETE - Société

- Identifiant du bloc : P-SOCIETE
- Nom du bloc : Société, incluant contacts société multiples
- Type de bloc : page
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_P_SOCIETE`
- Objectif : stabiliser société courante, profil et contacts.
- Dépendances : T4, T5, T6.
- Hors périmètre : facturation, abonnement, conformité juridique complète.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_P-SOCIETE_AUDIT_CADRAGE_SOCIETE` : DX, cartographier existant et écarts ; produire questions ; contrôles preuves/absence code.
  - `SESSION-YYYYMMDD-NN_CX_P-SOCIETE_CORRECTION_PROFIL_CONTACTS` : CX, corriger un lot validé profil/contacts ; patch `.diff` ; contrôles companyId/API/RBAC/audit/lint/build.
  - `SESSION-YYYYMMDD-NN_DX_P-SOCIETE_CLOTURE_SOCIETE` : DX, synthèse et verdict.
- Critère de sortie du bloc : société et contacts cohérents, cloisonnés et contrôlés.
- Documentation à mettre à jour si nécessaire : fiche Société, documentation données, `05`.
- Statut : À faire.

### BLOC P-DEPOTS-BASES - Dépôts / Bases

- Identifiant du bloc : P-DEPOTS-BASES
- Nom du bloc : Dépôts / Bases
- Type de bloc : page
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_P_DEPOTS_BASES`
- Objectif : stabiliser le référentiel des dépôts/bases.
- Dépendances : T4, T5, T6.
- Hors périmètre : géolocalisation avancée, automatisations planning futures.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_P-DEPOTS-BASES_AUDIT_CADRAGE_DEPOTS` : DX, auditer référentiel et dépendances ; contrôles preuves.
  - `SESSION-YYYYMMDD-NN_CX_P-DEPOTS-BASES_CORRECTION_REFERENTIEL` : CX, corriger un lot validé ; patch `.diff`; contrôles API/RBAC/multi-tenant/audit/lint/build.
  - `SESSION-YYYYMMDD-NN_DX_P-DEPOTS-BASES_CLOTURE_DEPOTS` : DX, clôture ou reports.
- Critère de sortie du bloc : dépôts fiables pour RH, véhicules et planning.
- Documentation à mettre à jour si nécessaire : fiche Dépôts/Bases, `05`.
- Statut : À faire.

### BLOC P-UTILISATEURS-RH - Utilisateurs / RH

- Identifiant du bloc : P-UTILISATEURS-RH
- Nom du bloc : Utilisateurs / RH
- Type de bloc : page
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_P_UTILISATEURS_RH`
- Objectif : stabiliser utilisateurs, rôles, accès applicatif, données RH minimales et indisponibilités.
- Dépendances : T4, T5, T6, P-DEPOTS-BASES.
- Hors périmètre : paie, RH avancée, permissions fines non validées.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_P-UTILISATEURS-RH_AUDIT_CADRAGE_RH` : DX, auditer modèles, UI/API, rôles et écarts ; production matrice questions.
  - `SESSION-YYYYMMDD-NN_CX_P-UTILISATEURS-RH_CORRECTION_REFERENTIEL_RH` : CX, corriger un lot validé ; patch `.diff`; contrôles API/RBAC/multi-tenant/audit/lint/build.
  - `SESSION-YYYYMMDD-NN_DX_P-UTILISATEURS-RH_CLOTURE_RH` : DX, clôturer.
- Critère de sortie du bloc : utilisateurs/RH exploitables sans incohérence critique connue.
- Documentation à mettre à jour si nécessaire : fiche Utilisateurs/RH, matrice RBAC, `05`.
- Statut : À faire.

### BLOC P-VEHICULES - Véhicules

- Identifiant du bloc : P-VEHICULES
- Nom du bloc : Véhicules
- Type de bloc : page
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_P_VEHICULES`
- Objectif : stabiliser la flotte administrative.
- Dépendances : T4, T5, T6, P-DEPOTS-BASES.
- Hors périmètre : suivi opérationnel détaillé, maintenance prédictive.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_P-VEHICULES_AUDIT_CADRAGE_FLOTTE` : DX, auditer flotte, statuts, archivage, disponibilité.
  - `SESSION-YYYYMMDD-NN_CX_P-VEHICULES_CORRECTION_FLOTTE` : CX, corriger un lot validé ; patch `.diff`; contrôles API/RBAC/multi-tenant/audit/lint/build.
  - `SESSION-YYYYMMDD-NN_DX_P-VEHICULES_CLOTURE_FLOTTE` : DX, clôturer.
- Critère de sortie du bloc : flotte administrative fiable pour modules dépendants.
- Documentation à mettre à jour si nécessaire : fiche Véhicules, `05`.
- Statut : À faire.

### BLOC P-SUIVI-VEHICULES - Suivi des véhicules

- Identifiant du bloc : P-SUIVI-VEHICULES
- Nom du bloc : Suivi des véhicules
- Type de bloc : page
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_P_SUIVI_VEHICULES`
- Objectif : cadrer puis reprendre le suivi opérationnel des véhicules en statut hybride.
- Dépendances : P-VEHICULES, T4, T5, T6.
- Hors périmètre : signature électronique, preuve mobile, maintenance prédictive, règles ARS complètes non confirmées.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_P-SUIVI-VEHICULES_AUDIT_CADRAGE_SUIVI` : DX, confirmer statut technique, vue d'ensemble, vérifications, désinfections, anomalies ; contrôles preuves ; validation si sessions CX confirmées.
  - `SESSION-YYYYMMDD-NN_CX_P-SUIVI-VEHICULES_CORRECTION_VUE_ENSEMBLE` : CX, si confirmé après audit ; patch `.diff`; contrôles navigateur/API/RBAC/multi-tenant.
  - `SESSION-YYYYMMDD-NN_CX_P-SUIVI-VEHICULES_CORRECTION_VERIFICATIONS` : CX, si confirmé après audit ; patch `.diff`; contrôles ciblés.
  - `SESSION-YYYYMMDD-NN_CX_P-SUIVI-VEHICULES_CORRECTION_DESINFECTIONS` : CX, si confirmé après audit ; patch `.diff`; contrôles ciblés.
  - `SESSION-YYYYMMDD-NN_CX_P-SUIVI-VEHICULES_CORRECTION_ANOMALIES` : CX, si confirmé après audit ; patch `.diff`; contrôles ciblés.
  - `SESSION-YYYYMMDD-NN_DX_P-SUIVI-VEHICULES_CLOTURE_SUIVI` : DX, clôture ou reports.
- Critère de sortie du bloc : suivi véhicules situé clairement et fonctionnel sur le périmètre Alpha retenu.
- Documentation à mettre à jour si nécessaire : fiche Suivi véhicules, matrice RBAC, documentation audit, `05`.
- Statut : À confirmer après audit ciblé.

### BLOC P-MODELES-HORAIRES - Modèles horaires

- Identifiant du bloc : P-MODELES-HORAIRES
- Nom du bloc : Modèles horaires
- Type de bloc : page
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_P_MODELES_HORAIRES`
- Objectif : aligner le référentiel des modèles horaires avec la terminologie produit officielle.
- Dépendances : T2, T4, T5.
- Hors périmètre : renommage technique sans décision, reprise complète planning.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_P-MODELES-HORAIRES_AUDIT_CADRAGE_MODELES` : DX, auditer modèles horaires et renommages futurs.
  - `SESSION-YYYYMMDD-NN_CX_P-MODELES-HORAIRES_CORRECTION_REFERENTIEL` : CX, corriger un lot validé ; patch `.diff`; contrôles API/RBAC/planning/lint/build.
  - `SESSION-YYYYMMDD-NN_DX_P-MODELES-HORAIRES_CLOTURE_MODELES` : DX, clôturer.
- Critère de sortie du bloc : modèles horaires exploitables et nommés correctement côté produit.
- Documentation à mettre à jour si nécessaire : fiche Modèles horaires, `05`, conventions.
- Statut : À faire.

### BLOC P-PLANNING - Planning

- Identifiant du bloc : P-PLANNING
- Nom du bloc : Planning
- Type de bloc : page
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_P_PLANNING`
- Objectif : reprendre le planning après stabilisation des référentiels et données sources.
- Dépendances : P-SOCIETE, P-DEPOTS-BASES, P-UTILISATEURS-RH, P-VEHICULES, P-MODELES-HORAIRES, T4, T5, T6.
- Hors périmètre : planification automatique avancée, reporting analytique, agenda heure par heure si non validé.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_P-PLANNING_AUDIT_CADRAGE_PLANNING` : DX, auditer dépendances, vues, affectations, publication, annulation logique.
  - `SESSION-YYYYMMDD-NN_CX_P-PLANNING_CORRECTION_AFFECTATIONS` : CX, si confirmé ; patch `.diff`; contrôles fonctionnels/API/RBAC/audit/multi-tenant.
  - `SESSION-YYYYMMDD-NN_CX_P-PLANNING_CORRECTION_VUES` : CX, si confirmé ; patch `.diff`; contrôle navigateur/responsive/lint/build.
  - `SESSION-YYYYMMDD-NN_DX_P-PLANNING_CLOTURE_PLANNING` : DX, clôture.
- Critère de sortie du bloc : planning manuel métier fiable sur les parcours Alpha retenus.
- Documentation à mettre à jour si nécessaire : fiche Planning, matrice RBAC, `05`.
- Statut : À faire.

### BLOC P-AUDIT - Audit / Traçabilité

- Identifiant du bloc : P-AUDIT
- Nom du bloc : Audit / Traçabilité
- Type de bloc : page
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_P_AUDIT`
- Objectif : garantir la consultation des traces officielles autorisées.
- Dépendances : T6, T4.
- Hors périmètre : SIEM, purge/rétention complète, conformité RGPD finale.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_P-AUDIT_AUDIT_CADRAGE_PAGE_AUDIT` : DX, auditer page, filtres, droits et traces disponibles.
  - `SESSION-YYYYMMDD-NN_CX_P-AUDIT_CORRECTION_CONSULTATION` : CX, corriger un lot validé ; patch `.diff`; contrôles lecture seule/API/RBAC/lint/build.
  - `SESSION-YYYYMMDD-NN_DX_P-AUDIT_CLOTURE_PAGE_AUDIT` : DX, clôturer.
- Critère de sortie du bloc : traces officielles autorisées consultables sans modification non voulue.
- Documentation à mettre à jour si nécessaire : documentation audit, matrice RBAC, `05`.
- Statut : À faire.

### BLOC P-DASHBOARD - Tableau de bord

- Identifiant du bloc : P-DASHBOARD
- Nom du bloc : Tableau de bord comme portail fiable
- Type de bloc : page
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_P_DASHBOARD`
- Objectif : fiabiliser le dashboard après stabilisation des données sources.
- Dépendances : T1, T4, T5, référentiels utiles.
- Hors périmètre : reporting avancé, préférences complexes non confirmées, données fictives.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_P-DASHBOARD_AUDIT_CADRAGE_DASHBOARD` : DX, auditer KPI, widgets, raccourcis et données.
  - `SESSION-YYYYMMDD-NN_CX_P-DASHBOARD_CORRECTION_PORTAIL` : CX, corriger un lot validé ; patch `.diff`; contrôles données réelles/RBAC/navigateur/lint/build.
  - `SESSION-YYYYMMDD-NN_DX_P-DASHBOARD_CLOTURE_DASHBOARD` : DX, clôturer.
- Critère de sortie du bloc : dashboard fiable, sans données fictives présentées comme réelles.
- Documentation à mettre à jour si nécessaire : fiche Dashboard, documentation données, `05`.
- Statut : À faire.

### BLOC P-MISE-EN-ROUTE - Mise en route

- Identifiant du bloc : P-MISE-EN-ROUTE
- Nom du bloc : Mise en route
- Type de bloc : page
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_P_MISE_EN_ROUTE`
- Objectif : stabiliser l'assistant de configuration initiale après les référentiels métier.
- Dépendances : P-SOCIETE, P-DEPOTS-BASES, P-UTILISATEURS-RH, P-VEHICULES, P-MODELES-HORAIRES.
- Hors périmètre : onboarding marketing, tutoriels avancés, renommage technique sans décision.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_P-MISE-EN-ROUTE_AUDIT_CADRAGE_MISE_EN_ROUTE` : DX, auditer checklist, liens, données sources et libellés.
  - `SESSION-YYYYMMDD-NN_CX_P-MISE-EN-ROUTE_CORRECTION_ASSISTANT` : CX, corriger un lot validé ; patch `.diff`; contrôles liens/données/RBAC/navigateur/lint/build.
  - `SESSION-YYYYMMDD-NN_DX_P-MISE-EN-ROUTE_CLOTURE_MISE_EN_ROUTE` : DX, clôturer.
- Critère de sortie du bloc : mise en route cohérente avec les vrais modules sources.
- Documentation à mettre à jour si nécessaire : fiche Mise en route, conventions, `05`.
- Statut : À faire.

## 7. Bloc RGPD / Privacy

### BLOC RGPD-PRIVACY - Privacy visible en Alpha

- Identifiant du bloc : RGPD-PRIVACY
- Nom du bloc : Privacy visible en Alpha et rattachée au bloc RGPD
- Type de bloc : RGPD
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_RGPD_PRIVACY`
- Objectif : garantir une Privacy visible en Alpha et documenter les limites RGPD sans déclarer une conformité complète non prouvée.
- Dépendances : P-LOGIN, `01`, règles RGPD minimales connues.
- Hors périmètre : conformité RGPD complète, politique légale exhaustive, DPO/base légale/rétention/purge non confirmés.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_RGPD-PRIVACY_AUDIT_CADRAGE_PRIVACY` : DX, auditer présence, accessibilité, lien login et limites Alpha.
  - `SESSION-YYYYMMDD-NN_CX_RGPD-PRIVACY_CORRECTION_VISIBILITE_PRIVACY` : CX, si correction applicative confirmée ; patch `.diff`; contrôles navigateur/lien login/lint/build.
  - `SESSION-YYYYMMDD-NN_DX_RGPD-PRIVACY_CLOTURE_PRIVACY` : DX, clôturer ou reporter.
- Critère de sortie du bloc : Privacy visible et cohérente avec les limites Alpha.
- Documentation à mettre à jour si nécessaire : documentation RGPD, Login, `05`.
- Statut : À faire.

## 8. Validations finales / gel Alpha

### BLOC F1 - Validation fonctionnelle croisée

- Identifiant du bloc : F1
- Nom du bloc : Validation fonctionnelle croisée
- Type de bloc : finalisation
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_F1_VALIDATION_FONCTIONNELLE`
- Objectif : vérifier les parcours fonctionnels transverses après blocs métier.
- Dépendances : blocs métier nécessaires terminés ou reports acceptés.
- Hors périmètre : correction code pendant validation, nouvelles fonctionnalités.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_F1_AUDIT_CADRAGE_VALIDATION_FONCTIONNELLE` : DX, cadrer les parcours à valider.
  - `SESSION-YYYYMMDD-NN_CX_F1_CONTROLE_PARCOURS` : CX si tests applicatifs automatisés ou scripts modifiés ; patch `.diff` si script/code modifié ; contrôles navigateur/RBAC/données.
  - `SESSION-YYYYMMDD-NN_DX_F1_CLOTURE_VALIDATION_FONCTIONNELLE` : DX, verdict.
- Critère de sortie du bloc : parcours principaux validés ou écarts bloquants listés et reportés.
- Documentation à mettre à jour si nécessaire : rapports de validation, `05`.
- Statut : À faire.

### BLOC F2 - Validation qualité technique

- Identifiant du bloc : F2
- Nom du bloc : Validation qualité technique
- Type de bloc : finalisation
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_F2_VALIDATION_QUALITE`
- Objectif : vérifier lint, build, tests disponibles, API/RBAC et multi-tenant après reprise.
- Dépendances : blocs code nécessaires terminés.
- Hors périmètre : correction dans la même session de validation, migration non prévue.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_F2_AUDIT_CADRAGE_VALIDATION_TECHNIQUE` : DX, cadrer commandes et périmètre de validation.
  - `SESSION-YYYYMMDD-NN_CX_F2_CONTROLES_TECHNIQUES` : CX si scripts/tests techniques sont modifiés ou exécutés dans une session technique ; patch `.diff` si code/script modifié ; contrôles lint/build/tests.
  - `SESSION-YYYYMMDD-NN_DX_F2_CLOTURE_VALIDATION_TECHNIQUE` : DX, verdict.
- Critère de sortie du bloc : contrôles techniques Alpha exécutés et résultats exploitables.
- Documentation à mettre à jour si nécessaire : rapports qualité, `05`.
- Statut : À faire.

### BLOC F3 - Validation UX visuelle

- Identifiant du bloc : F3
- Nom du bloc : Validation UX visuelle
- Type de bloc : finalisation
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_F3_VALIDATION_UX`
- Objectif : vérifier cohérence visuelle, responsive et ergonomique des parcours critiques.
- Dépendances : T1, T3, blocs pages nécessaires.
- Hors périmètre : refonte UI globale pendant validation, nouvelle maquette non validée.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_F3_AUDIT_CADRAGE_VALIDATION_UX` : DX, cadrer écrans et critères visuels.
  - `SESSION-YYYYMMDD-NN_CX_F3_CONTROLE_VISUEL` : CX si outil ou code de test visuel modifié ; patch `.diff` si script/code modifié ; contrôles navigateur/responsive/captures.
  - `SESSION-YYYYMMDD-NN_DX_F3_CLOTURE_VALIDATION_UX` : DX, verdict.
- Critère de sortie du bloc : écrans critiques sans écart visuel bloquant connu ou écarts listés.
- Documentation à mettre à jour si nécessaire : références UI/UX si décision validée, rapports F3, `05`.
- Statut : À faire.

### BLOC F4 - Clôture documentaire Alpha ou clôture de phase

- Identifiant du bloc : F4
- Nom du bloc : Clôture documentaire Alpha ou clôture de phase
- Type de bloc : finalisation
- Dossier cible : `docs/2-SESSIONS/1-ALPHA/BLOC_F4_CLOTURE_ALPHA`
- Objectif : clôturer la phase ou acter explicitement la non-clôture et les reports.
- Dépendances : F1, F2, F3 terminés ou reportés explicitement.
- Hors périmètre : nouvelle fonctionnalité, correction code non séparée, validation implicite.
- Sessions prévues :
  - `SESSION-YYYYMMDD-NN_DX_F4_AUDIT_CADRAGE_CLOTURE_ALPHA` : DX, rassembler preuves et décisions.
  - `SESSION-YYYYMMDD-NN_DX_F4_CLOTURE_ALPHA` : DX, produire note de clôture ou non-clôture.
- Critère de sortie du bloc : phase clôturée ou non clôturée explicitement, avec preuves et décisions visibles.
- Documentation à mettre à jour si nécessaire : `02`, `04`, `05`, synthèse de phase.
- Statut : À faire.

## 9. Maintenance

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
