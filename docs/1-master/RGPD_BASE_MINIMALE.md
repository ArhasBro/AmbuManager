# Ambulance Manager - Base RGPD minimale

Version : V0.1
Date : 23/04/2026

## Role du document

Ce document formalise la base RGPD minimale observee et completee dans le depot
pour le bloc `A17 - RGPD`.

Regle de source :
- contenu derive du code reel du depot et de la documentation officielle relue ;
- si une information n'est pas prouvee : `INFORMATION NON FOURNIE — À CONFIRMER` ;
- en cas de contradiction : `CODE > DOCUMENTATION`.

## Perimetre couvert

Perimetre strictement observe dans le depot :
- comptes utilisateurs ;
- absences / indisponibilites utilisateurs ;
- audit login et audit planning ;
- exports planning ;
- imports users et user-absences ;
- mecanismes d'acces et de cloisonnement associes.

Hors perimetre de ce document :
- cadrage legal externe non present dans le depot ;
- politique RH hors application ;
- contrats sous-traitants ;
- bases legales non documentees dans le depot ;
- DPO / contact privacy nominatif non prouve dans le depot.

## Cartographie minimale des donnees

| Domaine | Donnees observees | Source code principale | Acces observe |
| --- | --- | --- | --- |
| Utilisateurs | `email`, `password` hache, `name`, `role`, `companyId`, `depotId`, `isActive`, permissions, horodatages | `prisma/schema.prisma`, `app/api/users/*` | gestion via roles/perms users ; cloisonnement par `companyId` |
| Absences | `userId`, `reason`, `startAt`, `endAt`, horodatages | `prisma/schema.prisma`, `app/api/users/[id]/absences/*`, `lib/services/users/user-absence.ts` | gestion via `canManageUsers(...)` et `companyId` |
| Audit login | email de connexion, succes/echec, raison, acteur, payload, date | `lib/auth.ts`, `prisma/schema.prisma` | lecture via audit pour lecteurs autorises |
| Audit planning | acteur, action, entite, resume, payload, date | `app/api/audit/route.ts`, `lib/services/planning/planning-audit.ts` | lecture via audit pour lecteurs autorises |
| Exports planning | nom/email des agents, depot, vehicule, notes, motif d'annulation | `app/api/planning/exports/route.ts`, `lib/planning/export.ts` | `PLANNING_EXPORT` + scoping tenant/utilisateur |
| Imports initiaux | users : email, nom, role, mot de passe, depot ; absences : userEmail, reason, startAt, endAt | `app/api/imports/route.ts`, `lib/imports/import-engine.ts` | `ADMIN` / `GERANT` uniquement |

## Finalites observees

Finalites inferrees directement du code reel observe :
- authentifier un utilisateur et securiser l'acces a l'application ;
- administrer les comptes, roles, permissions et rattachements utilisateur ;
- gerer les indisponibilites / absences utiles a la planification ;
- afficher, exploiter et exporter un planning nominatif ;
- tracer les connexions et les operations critiques applicatives ;
- importer les donnees initiales users / absences.

Finalites non prouvees dans le depot :
- communication marketing ;
- prospection commerciale ;
- synchronisation avec un SIRH externe ;
- reutilisation analytique hors usages explicitement codes.

## Registre de traitement minimal

| Traitement | Categories de donnees observees | Acteurs / acces observes | Conservation observee | Statut |
| --- | --- | --- | --- | --- |
| Authentification | email, mot de passe hache, logs de connexion | utilisateur authentifie, session NextAuth, audit lecture autorisee | retention automatisee des logs : `INFORMATION NON FOURNIE — À CONFIRMER` | observe |
| Administration users | identite user, role, permissions, depot, statut actif | `ADMIN` / `GERANT` / acteurs avec droit de gestion users | archivage logique user par `isActive=false` ; suppression definitive user hors perimetre courant | observe |
| Gestion des absences | identite user, motif, debut, fin | acteurs avec droit de gestion users | retention automatisee : `INFORMATION NON FOURNIE — À CONFIRMER` ; suppression metier physique tracee | observe |
| Audit applicatif | acteur, action, entite, payload, horodatage | lecture audit reservee aux lecteurs autorises | purge / retention : `INFORMATION NON FOURNIE — À CONFIRMER` | observe |
| Export planning | identite agents, depot, vehicule, notes | acteurs avec droit d'export planning | retention des fichiers exportes : `INFORMATION NON FOURNIE — À CONFIRMER` | observe |
| Import initial | users et absences importes depuis fichier | `ADMIN` / `GERANT` | retention des fichiers sources/imports : `INFORMATION NON FOURNIE — À CONFIRMER` | observe |

## Acces et cloisonnement observes

- le cloisonnement principal repose sur `companyId` ;
- les routes users/absences controlees exigent une session valide et
  `canManageUsers(...)` ;
- la lecture audit exige un profil autorise (`ADMIN`, `GERANT`,
  `AUDIT_VIEW`, support global pour la lecture) ;
- les exports planning exigent la permission d'export et restent bornes au
  tenant courant ;
- les imports observes sont reserves aux roles `ADMIN` / `GERANT`.

## Conservation, correction, export, suppression

### Conservation observee

- utilisateur :
  - archivage logique observe via `isActive = false` ;
  - suppression definitive : `INFORMATION NON FOURNIE — À CONFIRMER`.
- absence :
  - aucune politique de retention automatisee observee ;
  - suppression metier physique observee via l'API admin.
- logs d'audit :
  - aucune purge automatisee observee dans le depot.
- exports planning :
  - aucune politique de conservation des fichiers exportes observee.

### Correction observee

- correction utilisateur observee via `PATCH /api/users/[id]` ;
- correction absence observee via
  `PATCH /api/users/[id]/absences/[absenceId]` ;
- reset mot de passe admin observe via
  `POST /api/users/[id]/reset-password`.

### Export observe

- export planning observe via `GET /api/planning/exports` ;
- export RGPD dedie des donnees personnelles users/absences/audit :
  `INFORMATION NON FOURNIE — À CONFIRMER`.

### Suppression observee

- utilisateur : pas de suppression definitive standard observee ; archivage
  logique seulement ;
- absence : suppression metier physique observee et tracee en audit.

## Mentions d'information minimales

Les mentions minimales actuellement soutenues par le depot sont :
- l'application manipule des donnees d'identification, d'acces, d'absence,
  d'audit et d'export planning ;
- ces donnees servent a authentifier, administrer les comptes, planifier
  l'activite, tracer les operations critiques et realiser les imports/exports
  observes ;
- l'acces est borne par session, `companyId`, roles et permissions reelles ;
- certaines informations organisationnelles restent non prouvees dans le depot :
  contact privacy, base legale detaillee, retention automatisee,
  export RGPD dedie.

Une declinaison applicative minimale de ces mentions est exposee dans
`/privacy`.

## Points restant a confirmer

- identite du responsable de traitement ;
- contact DPO ou canal privacy officiel ;
- bases legales detaillees par traitement ;
- durees de conservation cibles par categorie ;
- existence d'un export RGPD dedie ;
- procedure formalisee de droit d'acces / rectification / suppression ;
- retention des exports generes et des imports sources.
