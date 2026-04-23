# RESULTATS

## Resultats obtenus

### Decision patch

NO_PATCH.

Aucun blocage materiel n'a empeche l'audit. Aucun patch code n'a ete produit ni
applique.

### Analyse rapide

Le depot manipule des donnees personnelles reelles sur plusieurs flux :
- utilisateurs : email, mot de passe hache, nom, role, rattachement societe,
  rattachement depot, statut actif, permissions et horodatages ;
- absences : utilisateur cible, motif, debut, fin, horodatages ;
- audit / acces : email de connexion, succes/echec, acteur, payload, resume ;
- exports : noms et emails des agents dans les exports planning ;
- imports : creation users et user-absences via fichiers CSV/XLSX.

Le socle observe est partiellement structure :
- scoping multi-tenant par companyId ;
- controles d'acces role + permissions ;
- audit login/planning consultable ;
- archivage logique des utilisateurs.

En revanche, la base RGPD attendue n'est pas formellement presente dans le
depot : finalites, conservation, registre, droits d'export/correction/
suppression et audit homogene des operations sur donnees personnelles restent
partiels ou absents.

### Perimetre reellement audite

- Documentation officielle :
  - docs/1-master/DOCUMENT_MAITRE.md
  - docs/1-master/PLAN_DE_DEVELOPPEMENT.md
  - docs/3-templates/TEMPLATE_DEBUT_SESSION.md
  - docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md
  - docs/1-master/ETAT_GLOBAL_PROJET.md
  - docs/1-master/REGISTRE_DECISIONS.md
- Tables / modeles / seeds :
  - prisma/schema.prisma
  - prisma/seed.ts
- Auth / session / acces :
  - lib/auth.ts
  - types/next-auth.d.ts
  - lib/permission-catalog.ts
  - lib/permissions.ts
  - lib/rbac.ts
- Users / absences :
  - app/api/users/route.ts
  - app/api/users/[id]/route.ts
  - app/api/users/[id]/archive/route.ts
  - app/api/users/[id]/depot/route.ts
  - app/api/users/[id]/reset-password/route.ts
  - app/api/users/[id]/absences/route.ts
  - app/api/users/[id]/absences/[absenceId]/route.ts
  - lib/services/users/archive-user.ts
  - lib/services/users/assign-user-depot.ts
  - lib/services/users/user-absence.ts
  - app/users/page.tsx
  - app/users/users-list-client.tsx
  - app/users/user-creation-client.tsx
  - app/users/user-edit-client.tsx
  - app/users/user-absence-client.tsx
  - app/users/reset-password-client.tsx
- Audit :
  - app/api/audit/route.ts
  - app/audit/page.tsx
  - app/audit/audit-client.tsx
  - lib/services/audit/audit-context.ts
  - lib/services/audit/login-audit.ts
  - lib/services/audit/support-action-trace.ts
  - lib/services/planning/planning-audit.ts
- Exports / imports :
  - app/api/planning/exports/route.ts
  - lib/planning/export.ts
  - app/planning/page.tsx
  - app/api/imports/route.ts
  - lib/imports/import-engine.ts

### Constats d'audit

#### Points conformes constates

- Le modele Prisma prouve l'existence de donnees personnelles sur `User`,
  `UserAbsence`, `PlanningAuditLog` et `LoginAuditLog`.
- Les flux users, absences, audit et exports critiques sont cloisonnes par
  `companyId` dans les routes et services observes.
- Le controle d'acces existe reellement :
  `canManageUsers`, `canViewAudit`, `canExportPlanning`, `canViewSelfPlanning`,
  `canViewGlobalPlanning`.
- Le modele d'acces a l'audit est partiellement aligne avec le cadrage :
  acces natif ADMIN/GERANT, permission dediee `AUDIT_VIEW`, support global
  autorise pour la consultation d'audit.
- Les connexions sont tracees dans `LoginAuditLog` sur succes/echec avec email,
  raison et acteur lorsque disponible.
- Une page audit dediee existe et agrege `PlanningAuditLog` et `LoginAuditLog`.
- L'archivage utilisateur est logique via `isActive = false` ; aucune route de
  suppression definitive d'utilisateur n'a ete observee dans le perimetre audite.
- Les exports planning sont proteges par permissions et bornes au tenant courant
  et, sans droit global, a l'utilisateur courant.
- L'aperu d'import masque le mot de passe dans les lignes de preview users.

#### Points non conformes constates

- La tracabilite attendue des operations critiques sur les utilisateurs n'est
  pas couverte de maniere homogene :
  `app/api/users/route.ts` et `app/api/users/[id]/route.ts` creent/modifient des
  utilisateurs sans ecriture d'audit observable, alors que le cadrage attend la
  trace de creation/modification/desactivation utilisateur.
- L'archivage utilisateur ne produit une trace que via `traceSupportAction`,
  donc uniquement pour un acteur `PlatformRole.SUPPORT`; un admin/gerant
  archivant un utilisateur n'ecrit pas de trace observable dans l'audit unifie.
- La suppression d'une absence est physique via `prisma.userAbsence.delete`
  sans archivage logique ni ecriture d'audit observee ; la suppression existe
  donc sans gouvernance RGPD/documentaire associee dans le depot.

#### Points incomplets constates

- Aucun registre explicite des finalites, categories de donnees, roles d'acces
  ou durees de conservation n'a ete observe dans le code ou la documentation
  officielle relue pour cette session.
- Les finalites sont seulement observables par inference du code :
  authentification, administration users, gestion des absences, planification,
  audit login/planning, imports et exports. Elles ne sont pas formalisees.
- Aucun mecanisme dedie d'export RGPD des donnees personnelles users/absences/
  audit n'a ete observe ; seul l'export planning existe et expose des identites
  d'agents.
- Aucun workflow documente de rectification RGPD n'a ete observe au-dela des
  operations metier PATCH utilisateur / PATCH absence / reset password.
- Aucun workflow documente de suppression RGPD n'a ete observe au-dela de
  l'archivage utilisateur et de la suppression physique d'absences.
- Aucune politique de conservation des exports generes n'a ete observee dans le
  depot ; le cadrage laisse d'ailleurs ce sujet ouvert.
- Aucune politique de retention/purge des `LoginAuditLog` et
  `PlanningAuditLog` n'a ete observee.
- Les imports `users` et `user-absences` manipulent des donnees personnelles,
  mais aucun cadrage RGPD associe (finalite, retention, mention) n'est branche
  sur ces flux dans le depot audite.

#### Points a confirmer

- Existence d'un registre de traitement, de mentions d'information ou d'une
  politique RGPD hors depot : INFORMATION NON FOURNIE — À CONFIRMER.
- Existence de jobs d'infrastructure pour purge, retention ou suppression
  differenciee des logs / exports / absences : INFORMATION NON FOURNIE — À CONFIRMER.
- Existence d'un circuit support hors repo pour interventions nominatives et
  justification des acces cross-tenant : INFORMATION NON FOURNIE — À CONFIRMER.
- Existence d'un besoin produit valide de suppression definitive d'absences avec
  conservation d'historique separee : INFORMATION NON FOURNIE — À CONFIRMER.

### Verdict formel d'audit

non conforme.

### Consequence methodologique

La suite logique du bloc est RGPD-LOT-02.

Motif : l'audit constate a la fois des corrections necessaires
(tracabilite inhomogene des operations users/absences, suppression physique
d'absences sans gouvernance associee) et des completions necessaires
(cartographie RGPD, finalites, acces, conservation, besoins d'export /
correction / suppression, registre et mentions). La session prevue par le plan
pour cela est RGPD-LOT-02.

### Preuves / elements observes

- `prisma/schema.prisma` :
  - `User` stocke `email`, `password`, `name`, `role`, `platformRole`,
    `companyId`, `depotId`, `isActive`, timestamps.
  - `UserAbsence` stocke `userId`, `reason`, `startAt`, `endAt`, timestamps.
  - `PlanningAuditLog` et `LoginAuditLog` stockent des traces nominatives.
- `lib/auth.ts` ecrit des `LoginAuditLog` sur succes/echec de connexion et
  enrichit la session avec `id`, `role`, `platformRole`, `companyId`.
- `lib/permissions.ts` borne les acces par role natif, permissions et cas
  support pour l'audit.
- `app/api/audit/route.ts` expose les logs planning/login a un lecteur autorise
  et retourne aussi `actorUser` avec `id`, `name`, `email`.
- `app/api/users/*.ts` et `lib/services/users/*.ts` exposent creation, lecture,
  modification, archivage, reaffectation depot, reset mot de passe et CRUD
  absences.
- `app/api/planning/exports/route.ts` + `lib/planning/export.ts` exportent les
  affectations avec noms/emails des agents.
- `app/api/imports/route.ts` + `lib/imports/import-engine.ts` importent
  `users` et `user-absences`.

---

## Documents modifies

- docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-09_A17_RGPD-01/SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-09_A17_RGPD-01/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-09_A17_RGPD-01/EVIDENCES.md
- docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-09_A17_RGPD-01/NOTES.md
- docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-09_A17_RGPD-01/FIN_SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-09_A17_RGPD-01/PATCH/NO_PATCH.md
