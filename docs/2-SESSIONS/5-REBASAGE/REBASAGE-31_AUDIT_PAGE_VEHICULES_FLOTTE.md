# REBASAGE-31 — Audit page Véhicules / Flotte

## 1. Objet du document
Ce document audite l’état réel de la page Véhicules / Flotte dans le cadre du rebasage global Alpha.

## 2. Règles de lecture
- Audit en lecture seule.
- En cas de contradiction, le code réel prime sur la documentation.
- Aucune correction n’est appliquée dans cette session.
- Toute information non prouvée reste : `INFORMATION NON FOURNIE — À CONFIRMER`.

## 3. Sources lues
- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/vehicles/add-vehicle-form.tsx`
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/[id]/archive/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `lib/validators/vehicle.ts`
- `lib/services/vehicles/archive-vehicle.ts`
- `lib/services/vehicles/assign-vehicle-depot.ts`
- `lib/permissions.ts`
- `prisma/schema.prisma`

## 4. Routes / pages identifiées
- `/vehicles` : gestion flotte (liste, édition, archivage, rattachement dépôt) — statut : confirmé.
- `/api/vehicles` : lecture et création véhicule — statut : confirmé.
- `/api/vehicles/[id]` : mise à jour véhicule — statut : confirmé.
- `/api/vehicles/[id]/archive` : archivage logique véhicule — statut : confirmé.
- `/api/vehicles/[id]/depot` : rattachement véhicule à un dépôt — statut : confirmé.
- Indisponibilités véhicule dédiées (route/page spécifique) — statut : `INFORMATION NON FOURNIE — À CONFIRMER`.

## 5. Fichiers principaux identifiés
- Page : `app/vehicles/page.tsx`
- Client component : `app/vehicles/vehicles-client.tsx`
- Formulaire création : `app/vehicles/add-vehicle-form.tsx`
- API :
  - `app/api/vehicles/route.ts`
  - `app/api/vehicles/[id]/route.ts`
  - `app/api/vehicles/[id]/archive/route.ts`
  - `app/api/vehicles/[id]/depot/route.ts`
- Services :
  - `lib/services/vehicles/archive-vehicle.ts`
  - `lib/services/vehicles/assign-vehicle-depot.ts`
  - audit support : `lib/services/audit/support-action-trace.ts` (appelée)
- Validators : `lib/validators/vehicle.ts`
- Permissions / RBAC : `lib/permissions.ts` (`canManageVehicles`, `canEditPlanning`)
- Modèles Prisma concernés : `Vehicle`, `Depot`, `DraftShift`, `Shift`, `Company`.

## 6. Fonctionnalités observées
| Fonctionnalité | Présence code | Présence UI | Présence API | Dépendances | Statut | Commentaire |
|---|---|---|---|---|---|---|
| Liste véhicules | oui | oui | oui (`GET /api/vehicles` + SSR) | session, companyId, Prisma | incomplet | visible et filtrable, preuve e2e non fournie |
| Création véhicule | oui | oui | oui (`POST /api/vehicles`) | `createVehicleBodySchema`, rôle | incomplet | UI présente, création limitée ADMIN côté serveur |
| Modification véhicule | oui | oui | oui (`PATCH /api/vehicles/[id]`) | validator update, permissions | incomplet | champs principaux modifiables, validation fonctionnelle non prouvée |
| Désactivation / archivage véhicule | oui | oui | oui (`POST /api/vehicles/[id]/archive`) | service archive, audit support | incomplet | archivage logique `isActive=false` confirmé |
| Suppression physique véhicule | non constaté | non constaté | non constaté | N/A | à confirmer | `INFORMATION NON FOURNIE — À CONFIRMER` |
| Rattachement à base/dépôt | oui | oui | oui (`PATCH /api/vehicles/[id]/depot`) | `Depot` actif, companyId | incomplet | contrôle dépôt actif présent |
| Type véhicule | oui | oui | oui | enum Prisma `VehicleType` | incomplet | géré en création/édition |
| Immatriculation | oui | oui | oui | validator uppercase + unique company | incomplet | contrainte `@@unique([companyId, immatriculation])` |
| Statut opérationnel | oui | oui | oui | enum `VehicleStatus` | incomplet | exploité UI + API |
| Conformité documentaire minimale | oui | oui | oui (dates + flags) | champs docs véhicule | incomplet | règles visuelles présentes dans client |
| Dates expiration / alertes conformité | oui | oui | oui | insurance/CT/sanitary dates | incomplet | calcul UI `conforme/bientot_expire/expire` |
| État visuel conformité | oui | oui | N/A | logique front | incomplet | statut visuel constaté |
| Affectation véhicule au planning | oui (liaisons modèle/API planning) | partiel | partiel | `DraftShift.vehicleId`, `Shift.vehicleId` | à confirmer | lien technique visible, parcours métier non audité ici |
| Indisponibilités véhicule | non constaté | non constaté | non constaté | N/A | à confirmer | `INFORMATION NON FOURNIE — À CONFIRMER` |
| Lien templates/type requis | partiel | partiel | partiel | `templateId`, catégories templates | à confirmer | lien métier direct non prouvé dans page véhicules |
| Cohérence audit / traçabilité | oui | partiel | oui | `traceSupportAction` | incomplet | trace support présente sur archive/assign/update |
| Cohérence multi-tenant / companyId | oui | partiel | oui | session `companyId`, filtres Prisma | incomplet | pattern correct, exhaustivité globale à confirmer |
| Cohérence session / permissions | oui | partiel | oui | `canManageVehicles`, `canEditPlanning` | incomplet | règles présentes mais hétérogénéité de rôles possible |

## 7. Écarts et risques méthodologiques
- Présence fonctionnelle majoritairement prouvée au niveau code, mais validation fonctionnelle métier non prouvée (tests/recette absents dans ce scope).
- Hétérogénéité potentielle des droits : création réservée ADMIN, lecture élargie à `canEditPlanning`.
- Conformité documentaire fortement pilotée côté UI ; risque de divergence si règles métiers évoluent sans centralisation.
- Lien planning/templates visible techniquement mais non prouvé fonctionnellement de bout en bout.
- Indisponibilités véhicule non localisées clairement dans le périmètre lu.

## 8. Ce qui semble à conserver
- Structure page serveur + client dédiée (`page.tsx` + `vehicles-client.tsx`).
- API dédiées véhicules avec validators explicites.
- Contrôles multi-tenant via `companyId`.
- Archivage logique plutôt que suppression physique.
- Traçabilité support sur opérations sensibles.

## 9. Ce qui semble à corriger plus tard
- Uniformiser la politique d’autorisations (lecture/édition/création/archivage) pour réduire les zones grises.
- Clarifier la règle métier de conformité documentaire (source unique des seuils d’alerte).
- Vérifier la cohérence des libellés/statuts véhicules entre UI, API et documentation fonctionnelle.

## 10. Ce qui semble à compléter plus tard
- Audit détaillé des flux planning ↔ véhicules (affectation réelle, conflits, disponibilité).
- Audit détaillé des liens templates ↔ type véhicule requis.
- Vérification explicite des cas indisponibilités véhicule.
- Preuves de comportement e2e (création, modification, archivage, rattachement dépôt).

## 11. Ce qui pourrait être supprimé ou simplifié plus tard
- Toute logique redondante de calcul de conformité strictement visuelle si une couche métier centralisée est introduite — `À VALIDER AVANT ACTION`.
- Toute action UI non alignée avec les permissions réelles serveur — `À VALIDER AVANT ACTION`.

## 12. Verdict d’audit page Véhicules / Flotte
Verdict : **incomplet**.

Justification : la page et ses APIs principales existent avec validators, permissions et traçabilité partielle. En revanche, la preuve d’exploitabilité métier complète (notamment liens planning/templates/indisponibilités et homogénéité RBAC) n’est pas suffisamment établie dans cette session de lecture seule.

## 13. Prochaine étape recommandée
REBASAGE-32 — audit page Templates / Modèles de shifts.
