# REBASAGE-30 — Audit page Utilisateurs / RH

## 1. Objet du document

Ce document audite l'etat reel de la page Utilisateurs / RH dans le cadre du rebasage global Alpha.

## 2. Règles de lecture

- Audit en lecture seule.
- En cas de contradiction : code reel > documentation.
- Aucune correction pendant cette session.
- Toute information non prouvee reste : `INFORMATION NON FOURNIE — À CONFIRMER`.

## 3. Sources lues

Documentation :
- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-26_INVENTAIRE_PAGES_ROUTES_APPLICATIVES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-29_AUDIT_PAGE_PLANNING.md`

Code :
- `app/users/page.tsx`
- `app/users/*`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/[id]/absences/route.ts`
- `app/api/users/[id]/absences/[absenceId]/route.ts`
- `app/api/users/[id]/archive/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `lib/services/users/*`
- `lib/validators/user.ts`
- `lib/validators/user-absence.ts`
- `lib/permissions.ts`
- `prisma/schema.prisma` (lecture ciblée modèles concernés)

## 4. Routes / pages identifiées

| Chemin | Role constate | Statut |
|---|---|---|
| `/users` | Ecran principal gestion utilisateurs/RH | confirme |
| `app/users/page.tsx` | Composition serveur : KPIs + liste + operations avancees | confirme |
| `app/users/users-list-client.tsx` | Liste/consultation utilisateurs | partiel |
| `app/users/user-creation-client.tsx` | Creation utilisateur | partiel |
| `app/users/user-edit-client.tsx` | Edition utilisateur | partiel |
| `app/users/user-archive-client.tsx` | Archivage/desactivation | partiel |
| `app/users/user-absence-client.tsx` | Gestion absences/indisponibilites | partiel |
| `app/users/user-depot-assignment-client.tsx` | Rattachement depot/base | partiel |
| `app/users/reset-password-client.tsx` | Reset mot de passe utilisateur | partiel |
| `app/users/users-side-panel-client.tsx` | Panneau lateral RH | partiel |

## 5. Fichiers principaux identifiés

- Page : `app/users/page.tsx`
- Client components : `app/users/*.tsx` (list, creation, edit, archive, absence, depot assignment, reset password, side panel)
- API :
  - `app/api/users/route.ts`
  - `app/api/users/[id]/route.ts`
  - `app/api/users/[id]/absences/route.ts`
  - `app/api/users/[id]/absences/[absenceId]/route.ts`
  - `app/api/users/[id]/archive/route.ts`
  - `app/api/users/[id]/depot/route.ts`
  - `app/api/users/[id]/reset-password/route.ts`
- Services :
  - `lib/services/users/archive-user.ts`
  - `lib/services/users/assign-user-depot.ts`
  - `lib/services/users/user-absence.ts`
- Validators :
  - `lib/validators/user.ts`
  - `lib/validators/user-absence.ts`
- Permissions/RBAC : `lib/permissions.ts`, `lib/company-rules/governance` (utilise dans users page/API)
- Modeles Prisma concernes (lecture schema) : `User`, `UserAbsence`, `UserPermission`, `Depot`, `Shift`, `AuditLog`.

## 6. Fonctionnalités observées

| Fonctionnalite | Presence code | Presence UI | Presence API | Dependances | Statut | Commentaire |
|---|---|---|---|---|---|---|
| Liste utilisateurs | OUI | OUI | OUI (`GET /api/users`) | Prisma User, permissions | incomplet | Pagination/recherche role presentes API ; preuve UI exhaustive INFORMATION NON FOURNIE — À CONFIRMER |
| Creation utilisateur | OUI | OUI | OUI (`POST /api/users`) | validator user, hash password, permissions | incomplet | Gouvernance permissions metier incluse |
| Modification utilisateur | OUI | OUI | OUI (`PATCH /api/users/[id]`) | validator user, permission catalog | incomplet | Controle role/permissions sensible present |
| Desactivation / archivage | OUI | OUI | OUI (`POST /api/users/[id]/archive`) | service archive-user, audit | incomplet | Auto-archivage bloque explicitement |
| Suppression physique | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | à confirmer | Aucun endpoint DELETE user principal detecte |
| Role principal utilisateur | OUI | OUI | OUI | Prisma Role + validators | partiel | Gestion role presente, validation metier complete a confirmer |
| Permissions fines | OUI | OUI (partiel) | OUI | `userPermissions`, catalog ALPHA | incomplet | Forte complexite gouvernance role/permission |
| Rattachement base/depot | OUI | OUI | OUI (`PATCH /api/users/[id]/depot`) | Depot, service assign-user-depot | partiel | Verifie depot actif et companyId |
| Absences / indisponibilites | OUI | OUI | OUI (`GET/POST/PATCH/DELETE absences`) | UserAbsence, validator absence | incomplet | Overlap et intervales valides geres |
| Demandes d'absence | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | à confirmer | Flux de demande/validation non prouve |
| Stagiaires | OUI (`isTrainee`) | OUI (KPI) | OUI (create/update) | Prisma User.isTrainee | partiel | Presence confirmee |
| Horaires journaliers | OUI (`dailyWorkStartTime/EndTime`) | INFORMATION NON FOURNIE — À CONFIRMER | OUI (create/update) | validator HH:mm | partiel | Couples start/end verifies |
| Consultation planning utilisateur/collegues | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | à confirmer | Couplage direct UI non prouve ici |
| Cohérence avec planning | OUI (liens de donnees users/absences) | partiel | OUI (APIs users exploitees par planning) | planning-client fetch users | incomplet | A valider en scenario end-to-end |
| Cohérence audit / tracabilite | OUI | INFORMATION NON FOURNIE — À CONFIRMER | OUI (writePersonalDataAudit, traceSupportAction) | services audit | partiel | Traçabilite code presente |
| Cohérence multi-tenant / companyId | OUI | partiel | OUI | session.companyId filtre requetes | conforme | Filtrage companyId systematique observe |
| Cohérence session / permissions | OUI | partiel | OUI | canManageUsers + governance rules | incomplet | Matrice role/permission complete a confirmer |

## 7. Écarts et risques méthodologiques

- Zone RH vaste et composite : presence code forte mais preuve fonctionnelle complete non etablie.
- APIs riches et sensibles (roles, permissions, reset password, absences) : risque de conclure trop vite "conforme" sans tests de scenarios.
- Documentation de reference rebasage reste plus synthese qu'attestation fonctionnelle detaillee.
- Couplage Users <-> Planning present, mais couverture de tous cas limites non prouvee.
- Suppression physique utilisateur non prouvee : ne pas supposer son absence/présence definitive.

## 8. Ce qui semble à conserver

- Gating session + permissions (`canManageUsers`) avant acces page et APIs.
- Segmentation API par sous-domaines (user core, absences, depot, archive, reset password).
- Validation des payloads via Zod.
- Tracabilite des operations sensibles (audit).
- Scope multi-tenant par `companyId` dans les requetes observees.

## 9. Ce qui semble à corriger plus tard

- Clarifier et harmoniser les parcours UI complets creation/edition/archive/reset (preuves UX/erreurs).
- Consolidation potentielle de la complexite permissions/gouvernance (lisibilite et maintenabilite).
- Revalidation metier des regles RH (roles, permissions, horaires, absences) en scenario reel.

## 10. Ce qui semble à compléter plus tard

- Matrice role -> permissions -> actions UI/API exhaustive et testee.
- Flux "demande d'absence" si attendu produit.
- Documentation d'exploitation RH liee aux cas limites (overlap absences, depot inactif, reset support).

## 11. Ce qui pourrait être supprimé ou simplifié plus tard

- Zones "operations avancees RH" si certaines actions sont redondantes avec d'autres parcours UI : `À VALIDER AVANT ACTION`.
- Elements UI potentiellement dupliques entre panel lateral et blocs principaux : `À VALIDER AVANT ACTION`.
- Complexite des composants clients users si sur-segmentation confirmee : `À VALIDER AVANT ACTION`.

## 12. Verdict d’audit page Utilisateurs / RH

Verdict : **incomplet**.

Justification : la couverture technique (page + APIs + validators + services + audit + multi-tenant) est significative et coherente, mais la preuve fonctionnelle complete par scenario metier (roles/permissions complets, flux RH exhaustifs, UX complete) n'est pas etablie dans ce perimetre d'audit lecture seule.

## 13. Prochaine étape recommandée

REBASAGE-31 — audit page Vehicules / Flotte.
