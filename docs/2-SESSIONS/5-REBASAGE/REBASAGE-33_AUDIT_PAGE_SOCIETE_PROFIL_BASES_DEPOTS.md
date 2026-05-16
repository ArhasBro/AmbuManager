# REBASAGE-33 — Audit page Société / Profil société / Bases-dépôts

## 1. Objet du document
Ce document audite l’état réel de la page Société / Profil société / Bases-dépôts dans le cadre du rebasage global Alpha.

## 2. Règles de lecture
- Audit en lecture seule.
- En cas de contradiction, le code réel prime sur la documentation.
- Aucune correction code pendant cette session.
- Toute information non prouvée reste : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Les accents français normaux sont conservés lorsque l’encodage est propre.

## 3. Sources lues
- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-25_CLASSEMENT_DETTES_PRIORITES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-26_INVENTAIRE_PAGES_ROUTES_APPLICATIVES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-30_AUDIT_PAGE_UTILISATEURS_RH.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-31_AUDIT_PAGE_VEHICULES_FLOTTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-32_AUDIT_PAGE_TEMPLATES_MODELES_SHIFTS.md`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/company/company-rules-panel.tsx`
- `app/depots/page.tsx`
- `app/depots/depots-client.tsx`
- `app/api/company/profile/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `lib/services/company/update-company-profile.ts`
- `lib/services/depots/create-depot.ts`
- `lib/services/depots/update-depot.ts`
- `lib/services/depots/archive-depot.ts`
- `lib/services/users/assign-user-depot.ts`
- `lib/services/vehicles/assign-vehicle-depot.ts`
- `lib/validators/company-profile.ts`
- `lib/validators/company-rules.ts`
- `lib/validators/depot.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `prisma/schema.prisma`

## 4. Routes / pages identifiées
- `/company` : gestion du profil société et des paramètres métier — statut : confirmé.
- `/depots` : gestion des bases/dépôts — statut : confirmé.
- `/api/company/profile` : mise à jour profil société — statut : confirmé.
- `/api/company/rules` : lecture/écriture des règles métier société — statut : confirmé.
- `/api/depots` : création dépôt — statut : confirmé.
- `/api/depots/[id]` : modification dépôt — statut : confirmé.
- `/api/depots/[id]/archive` : archivage logique dépôt — statut : confirmé.
- Lien templates ↔ bases/dépôts dédié (endpoint dédié) — statut : `INFORMATION NON FOURNIE — À CONFIRMER`.

## 5. Fichiers principaux identifiés
- Pages :
  - `app/company/page.tsx`
  - `app/depots/page.tsx`
- Client components :
  - `app/company/company-profile-form.tsx`
  - `app/company/company-rules-panel.tsx`
  - `app/depots/depots-client.tsx`
- API :
  - `app/api/company/profile/route.ts`
  - `app/api/company/rules/route.ts`
  - `app/api/depots/route.ts`
  - `app/api/depots/[id]/route.ts`
  - `app/api/depots/[id]/archive/route.ts`
  - connexes de rattachement : `app/api/users/[id]/depot/route.ts`, `app/api/vehicles/[id]/depot/route.ts`
- Services :
  - `lib/services/company/update-company-profile.ts`
  - `lib/services/depots/create-depot.ts`
  - `lib/services/depots/update-depot.ts`
  - `lib/services/depots/archive-depot.ts`
  - rattachements : `lib/services/users/assign-user-depot.ts`, `lib/services/vehicles/assign-vehicle-depot.ts`
- Validators :
  - `lib/validators/company-profile.ts`
  - `lib/validators/company-rules.ts`
  - `lib/validators/depot.ts`
- Permissions/RBAC :
  - `lib/permissions.ts` (`canManageCompanyRules`, `canManageUsers`, `canManageVehicles`)
  - `lib/permission-catalog.ts` (`COMPANY_RULES_MANAGE`, `USERS_MANAGE`, `VEHICLES_MANAGE`, `AUDIT_VIEW`)
  - garde rôle ADMIN/GERANT pour certaines routes (`requireRole`)
- Modèles Prisma concernés : `Company`, `CompanyRule`, `Depot`, `User(depotId)`, `Vehicle(depotId)`, `Shift(depotId)`, `DraftShift(depotId)`.

## 6. Fonctionnalités observées
| Fonctionnalité | Présence dans le code | Présence UI | Présence API | Dépendances | Statut | Commentaire court |
|---|---|---|---|---|---|---|
| Consultation du profil société | oui | oui | partiel | session, companyId, Prisma | incomplet | rendu SSR du profil + résumé KPI |
| Édition du profil société | oui | oui | oui (`PATCH /api/company/profile`) | validator profil, rôle ADMIN/GERANT | incomplet | champs requis, preuve e2e non fournie |
| Champs société minimaux | oui | oui | oui | `name`, `managerNames`, `address`, `phone`, `siret` | incomplet | tous requis dans validator |
| Nom société | oui | oui | oui | model `Company` | incomplet | présence confirmée |
| SIRET/identifiants admin | oui | oui | oui | validator profil | incomplet | champ SIRET présent |
| Adresse / coordonnées | oui | oui | oui | validator profil | incomplet | adresse + téléphone présents |
| Paramètres société | oui | oui | oui (`GET/PATCH /api/company/rules`) | company-rules catalog/runtime | incomplet | panel règles métier présent |
| Liste des bases/dépôts | oui | oui | partiel | Prisma Depot | incomplet | chargée via SSR + client |
| Création base/dépôt | oui | oui | oui (`POST /api/depots`) | validator dépôt, rôle ADMIN/GERANT | incomplet | création disponible dans client |
| Modification base/dépôt | oui | oui | oui (`PATCH /api/depots/[id]`) | service update + validator | incomplet | édition confirmée |
| Désactivation / archivage base/dépôt | oui | oui | oui (`POST /api/depots/[id]/archive`) | service archive + audit support | incomplet | archivage logique `isActive=false` |
| Suppression physique éventuelle | non constaté | non constaté | non constaté | N/A | à confirmer | `INFORMATION NON FOURNIE — À CONFIRMER` |
| Rattachement utilisateurs à une base/dépôt | oui | partiel | oui (`PATCH /api/users/[id]/depot`) | service assign user depot | incomplet | contrôle dépôt actif présent |
| Rattachement véhicules à une base/dépôt | oui | partiel | oui (`PATCH /api/vehicles/[id]/depot`) | service assign vehicle depot | incomplet | contrôle dépôt actif présent |
| Rattachement shifts/planning à une base/dépôt | oui (modèle + planning client) | partiel | partiel | `Shift.depotId`, `DraftShift.depotId`, planning | à confirmer | lien technique visible, flux métier non prouvé ici |
| Lien templates ↔ bases/dépôts | non constaté | non constaté | non constaté | N/A | à confirmer | `INFORMATION NON FOURNIE — À CONFIRMER` |
| Cohérence permissions | oui | partiel | oui | `requireRole`, permissions alpha | incomplet | hétérogénéité possible entre rôles et permissions |
| Cohérence audit / traçabilité | oui (surtout dépôts) | partiel | partiel | `traceSupportAction`, audit personnel | incomplet | audit explicite côté services dépôts/rattachements |
| Cohérence multi-tenant / companyId | oui | partiel | oui | filtres companyId systématiques | incomplet | pattern solide, couverture exhaustive à confirmer |
| Cohérence session / permissions | oui | partiel | oui | `getServerSession`, guards | incomplet | protections présentes |

## 7. Écarts et risques méthodologiques
- Le périmètre Société est réparti entre profil + règles métier + dépôts ; risque de lecture fragmentée.
- Les rattachements utilisateurs/véhicules/dépôts sont prouvés techniquement, mais pas validés métier de bout en bout.
- Les règles société (`/api/company/rules`) influencent planning et affichage ; dépendances transverses élevées.
- Pas de preuve d’une suppression physique des dépôts ; seule la logique d’archivage est observée.
- La cohérence templates ↔ bases/dépôts n’est pas démontrée dans le périmètre lu.

## 8. Ce qui semble à conserver
- Séparation claire profil société / règles métier / dépôts.
- Contrôles d’accès serveur (session + companyId + rôle/permissions).
- Services dédiés pour création/édition/archivage des dépôts.
- Traçabilité support présente sur opérations dépôts sensibles.
- Modélisation Prisma cohérente pour les rattachements (`depotId` sur users/vehicles/shifts).

## 9. Ce qui semble à corriger plus tard
- Harmoniser la politique d’accès entre logique rôle natif et permissions fines selon module.
- Clarifier la portée métier exacte des règles société côté UI et impact planning.
- Renforcer la lisibilité documentaire du couplage Société ↔ Dépôts ↔ Planning.

## 10. Ce qui semble à compléter plus tard
- Audit e2e des flux de rattachement dépôt (users, véhicules, planning).
- Vérification métier des impacts d’archivage dépôt sur shifts existants.
- Validation détaillée des cas limites multi-tenant/companyId.
- Vérification explicite de l’absence/présence d’un lien templates ↔ bases/dépôts.

## 11. Ce qui pourrait être supprimé ou simplifié plus tard
- Redondances UI de pilotage des règles société si elles dupliquent des contrôles backend — `À VALIDER AVANT ACTION`.
- Actions de gestion dépôt non alignées avec permissions finales cibles — `À VALIDER AVANT ACTION`.

## 12. Verdict d’audit page Société / Profil société / Bases-dépôts
Verdict : **incomplet**.

Justification : les pages, APIs, validators, services et contrôles d’accès existent et couvrent les usages principaux (profil société, règles métier, dépôts, archivage, rattachements). En revanche, la preuve fonctionnelle complète inter-modules (planning/templates/audit complet) reste partielle dans cette session de lecture seule.

## 13. Prochaine étape recommandée
REBASAGE-34 — Audit page Dépôts / Bases (détail opérationnel et impacts inter-modules).
