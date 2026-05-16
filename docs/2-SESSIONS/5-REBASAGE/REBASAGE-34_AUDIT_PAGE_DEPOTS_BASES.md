# REBASAGE-34 — Audit page Dépôts / Bases

## 1. Objet du document
Ce document audite l’état réel de la page Dépôts / Bases dans le cadre du rebasage global Alpha.

REBASAGE-34 approfondit la partie Dépôts / Bases (cycle de vie et impacts opérationnels) et ne remplace pas REBASAGE-33.

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
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-33_AUDIT_PAGE_SOCIETE_PROFIL_BASES_DEPOTS.md`
- `app/depots/page.tsx`
- `app/depots/depots-client.tsx`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `lib/services/depots/create-depot.ts`
- `lib/services/depots/update-depot.ts`
- `lib/services/depots/archive-depot.ts`
- `lib/services/users/assign-user-depot.ts`
- `lib/services/vehicles/assign-vehicle-depot.ts`
- `lib/validators/depot.ts`
- `lib/permissions.ts`
- `prisma/schema.prisma`

## 4. Routes / pages identifiées
- `/depots` : gestion opérationnelle des dépôts/bases — statut : confirmé.
- `/api/depots` : création dépôt — statut : confirmé.
- `/api/depots/[id]` : modification dépôt — statut : confirmé.
- `/api/depots/[id]/archive` : archivage logique dépôt — statut : confirmé.
- `/api/users/[id]/depot` : rattachement utilisateur ↔ dépôt — statut : confirmé.
- `/api/vehicles/[id]/depot` : rattachement véhicule ↔ dépôt — statut : confirmé.
- `/planning` (usage indirect des dépôts) — statut : partiel.

## 5. Fichiers principaux identifiés
- Page : `app/depots/page.tsx`
- Client component principal : `app/depots/depots-client.tsx`
- APIs dépôts :
  - `app/api/depots/route.ts`
  - `app/api/depots/[id]/route.ts`
  - `app/api/depots/[id]/archive/route.ts`
- APIs de rattachement connexes :
  - `app/api/users/[id]/depot/route.ts`
  - `app/api/vehicles/[id]/depot/route.ts`
- APIs planning impactées :
  - `app/api/planning/shifts/route.ts`
  - `app/api/planning/shifts/[id]/route.ts`
  - `app/api/planning/shifts/[id]/assign/route.ts`
- Services :
  - `lib/services/depots/create-depot.ts`
  - `lib/services/depots/update-depot.ts`
  - `lib/services/depots/archive-depot.ts`
  - `lib/services/users/assign-user-depot.ts`
  - `lib/services/vehicles/assign-vehicle-depot.ts`
- Validator : `lib/validators/depot.ts`
- Permissions / RBAC :
  - garde rôle `ADMIN|GERANT` via `requireRole` (APIs dépôts)
  - `canManageUsers` et `canManageVehicles` pour les rattachements
- Modèles Prisma concernés : `Depot`, `User.depotId`, `Vehicle.depotId`, `Shift.depotId`, `DraftShift.depotId`.

## 6. Cycle de vie d’un dépôt
| Étape | Preuve trouvée | Statut | Commentaire |
|---|---|---|---|
| Création | `POST /api/depots` + `createDepot` + formulaire client | confirmé | création active avec validator et trace support |
| Modification | `PATCH /api/depots/[id]` + `updateDepot` + édition client | confirmé | modification nom/adresse, trace support |
| Désactivation / archivage | `POST /api/depots/[id]/archive` + `archiveDepot` | confirmé | archivage logique `isActive=false`, pas suppression |
| Suppression physique | aucune route/service DELETE dépôt | à confirmer | `INFORMATION NON FOURNIE — À CONFIRMER` |
| Réactivation | aucune route/service de réactivation explicite | à confirmer | `INFORMATION NON FOURNIE — À CONFIRMER` |
| Contraintes si entités liées | validations dépôt actif pour rattachements users/vehicles/planning assign | partiel | dépôt archivé bloqué dans certains flux, couverture exhaustive non prouvée |
| Dépôt archivé encore référencé | `Shift.depotId` et `DraftShift.depotId` conservables (relation Prisma SetNull possible selon opérations) | à confirmer | comportement métier complet post-archivage non démontré end-to-end |

## 7. Fonctionnalités observées
| Fonctionnalité | Présence dans le code | Présence UI | Présence API | Dépendances | Statut | Commentaire court |
|---|---|---|---|---|---|---|
| Liste dépôts | oui | oui | partiel | SSR `depots/page.tsx` + client | incomplet | chargée côté page, pas d’endpoint GET dédié constaté |
| Création dépôt | oui | oui | oui | validator dépôt + rôle | incomplet | preuve e2e non fournie |
| Modification dépôt | oui | oui | oui | service update + validator | incomplet | flux présent |
| Désactivation / archivage dépôt | oui | oui | oui | service archive + audit support | incomplet | logique active/archivé visible |
| Suppression physique éventuelle | non constaté | non constaté | non constaté | N/A | à confirmer | `INFORMATION NON FOURNIE — À CONFIRMER` |
| Nom / libellé dépôt | oui | oui | oui | `Depot.name` + unique(companyId,name) | incomplet | contrainte d’unicité par société |
| Adresse / localisation | oui | oui | oui | `Depot.address` | incomplet | champ optionnel contrôlé |
| Statut actif / archivé | oui | oui | oui | `Depot.isActive` | incomplet | tri/filtres UI présents |
| Rattachement utilisateur ↔ dépôt | oui | partiel | oui | API users/depot + service assign | incomplet | dépôt actif exigé |
| Rattachement véhicule ↔ dépôt | oui | partiel | oui | API vehicles/depot + service assign | incomplet | dépôt actif exigé |
| Rattachement Shift/Planning ↔ dépôt | oui | partiel | oui (partiel) | `Shift.depotId` + APIs planning | à confirmer | validations présentes dans certains endpoints |
| Rattachement DraftShift ↔ dépôt | oui | partiel | oui (partiel) | `DraftShift.depotId`, assign route | à confirmer | contrôles dépôt actif observés en assignation |
| Lien templates ↔ dépôts | non direct constaté | non constaté | non constaté | N/A | à confirmer | `INFORMATION NON FOURNIE — À CONFIRMER` |
| Filtrage/usage planning par dépôt | oui | partiel | partiel | planning client + options dépôts | incomplet | usage opérationnel visible côté planning |
| Restrictions permissions par dépôt | partiel | partiel | partiel | rôles/permissions globales | à confirmer | pas de RBAC granulaire par dépôt trouvé |
| Cohérence audit / traçabilité | oui | partiel | partiel | `traceSupportAction`, `writePersonalDataAudit` | incomplet | création/édition/archivage/rattachements tracés côté services |
| Cohérence multi-tenant / companyId | oui | partiel | oui | filtres companyId systématiques | incomplet | pattern solide |
| Cohérence session / permissions | oui | partiel | oui | `getServerSession`, guards | incomplet | contrôles présents |

## 8. Impacts inter-modules

### 8.1 Utilisateurs
- `User.depotId` présent en Prisma : confirmé.
- API de rattachement : `PATCH /api/users/[id]/depot` : confirmée.
- UI de rattachement : présente (module users RH) : partiel.
- Risque si dépôt archivé : les nouvelles affectations sont bloquées si dépôt non actif, mais état des affectations historiques non prouvé de bout en bout : à confirmer.

### 8.2 Véhicules
- `Vehicle.depotId` présent en Prisma : confirmé.
- API de rattachement : `PATCH /api/vehicles/[id]/depot` : confirmée.
- UI de rattachement : présente (module véhicules) : partiel.
- Risque si dépôt archivé : nouvelles affectations vers dépôt archivé bloquées, impacts historiques complets à confirmer.

### 8.3 Planning / shifts
- `Shift.depotId` et `DraftShift.depotId` présents : confirmés.
- Usage planning UI : options dépôts exploitées dans planning client : partiel.
- APIs planning : validations dépôt actif observées notamment en assignation draft/shift : partiel.
- Risque d’incohérence : si archivage dépôt intervient après création de shifts, comportement global de restitution/édition à confirmer.

### 8.4 Templates / modèles de shifts
- Lien direct template ↔ dépôt non trouvé dans le modèle `ShiftTemplate` : confirmé.
- Lien indirect possible via planning (template appliqué à un shift qui porte un `depotId`) : partiel.
- Aucun endpoint dédié templates↔dépôts constaté : confirmé.

### 8.5 Audit / traçabilité
- Création dépôt tracée : oui (`SUPPORT_CREATE_DEPOT`).
- Modification dépôt tracée : oui (`SUPPORT_UPDATE_DEPOT`).
- Archivage dépôt tracé : oui (`SUPPORT_ARCHIVE_DEPOT`).
- Rattachement utilisateur tracé : oui (`USER_ASSIGN_DEPOT` + support trace).
- Rattachement véhicule tracé : oui (`SUPPORT_ASSIGN_VEHICLE_DEPOT`).
- Statut global traçabilité : incomplet (présence claire de traces, mais couverture fonctionnelle finale non validée e2e).

## 9. Écarts et risques méthodologiques
- Absence de suppression physique/réactivation explicite : comportement de cycle complet non totalement prouvé.
- Les dépôts sont transverses (users/vehicles/planning) ; risque élevé de régression inter-module si correction sans matrice d’impact.
- Certaines validations dépôt actif existent, mais couverture homogène de tous les endpoints planning reste à confirmer.
- Lien templates↔dépôts non direct : risque de mauvaise interprétation si on suppose un lien absent du modèle.
- Les preuves observées sont surtout structurelles/code ; preuve fonctionnelle métier complète à consolider.

## 10. Ce qui semble à conserver
- Modèle d’archivage logique (`isActive`) au lieu de suppression brute.
- Contrôles multi-tenant par `companyId` sur routes/services.
- Services dédiés dépôts (create/update/archive) avec traçabilité support.
- APIs de rattachement users/véhicules vers dépôts avec validation dépôt actif.
- Présence explicite des liens `depotId` dans `User`, `Vehicle`, `Shift`, `DraftShift`.

## 11. Ce qui semble à corriger plus tard
- Clarifier la politique officielle sur suppression physique et réactivation dépôt.
- Harmoniser les règles “dépôt actif requis” sur l’ensemble des flux planning si des écarts existent.
- Normaliser les libellés de statut et messages d’erreur inter-modules autour des dépôts.

## 12. Ce qui semble à compléter plus tard
- Audit e2e des impacts d’archivage dépôt sur shifts historiques et drafts existants.
- Audit e2e des rattachements users/véhicules après changement de dépôt.
- Vérification explicite du comportement planning multi-dépôts dans tous les scénarios métier.
- Documentation de décision claire sur absence de lien direct templates↔dépôts.

## 13. Ce qui pourrait être supprimé ou simplifié plus tard
- Éléments UI redondants de gestion dépôt entre modules si duplications non nécessaires — `À VALIDER AVANT ACTION`.
- Traces support dupliquées si une consolidation d’audit est décidée — `À VALIDER AVANT ACTION`.

## 14. Verdict d’audit page Dépôts / Bases
Verdict : **incomplet**.

Justification : la gestion dépôts est bien implémentée (création, modification, archivage, rattachements, traces), mais la preuve métier complète des impacts post-archivage et de la couverture homogène inter-modules (planning notamment) reste partielle en lecture seule.

## 15. Prochaine étape recommandée
REBASAGE-35 — audit page Onboarding.
