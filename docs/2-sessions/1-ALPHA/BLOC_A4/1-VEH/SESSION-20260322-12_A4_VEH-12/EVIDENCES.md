# EVIDENCES — SESSION-20260322-12_A4_VEH-12

## Sources documentaires relues
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`

## Extraits factuels retenus

### Base produit
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` : `07.6 Affectation d’un véhicule au planning` décrit « affecter un véhicule à un shift » comme besoin prioritaire indispensable.

### Endpoint d’affectation
- `app/api/planning/shifts/[id]/assign/route.ts:11-20` : body accepté avec `userId`, `user2Id`, `vehicleId`, `depotId`, tous optionnels / nullable, avec refus d’un body vide.
- `app/api/planning/shifts/[id]/assign/route.ts:32-45` : contrôle session + permission réelle `canEditPlanning(...)`.
- `app/api/planning/shifts/[id]/assign/route.ts:67-100` : recherche prioritaire d’un `DraftShift`, sinon fallback sur `Shift` publié dans la société courante.
- `app/api/planning/shifts/[id]/assign/route.ts:102-103` : `depotId` explicitement interdit sur un `DraftShift`.
- `app/api/planning/shifts/[id]/assign/route.ts:122-159` : validations d’appartenance société sur utilisateurs, véhicule et dépôt actif.
- `app/api/planning/shifts/[id]/assign/route.ts:161-234` : exécution du service `assignDraftShift(...)` puis réponse `{ kind: "DRAFT" }`.
- `app/api/planning/shifts/[id]/assign/route.ts:237-307` : exécution du service `assignShift(...)` puis réponse `{ kind: "SHIFT" }`.

### Services métier
- `lib/services/planning/assign-draftshift.ts:65-87` : un `DraftShift` n’est modifiable que si `run.status === "DRAFT"`.
- `lib/services/planning/assign-draftshift.ts:131-205` : conflits utilisateur / véhicule contrôlés contre autres brouillons DRAFT et shifts publiés.
- `lib/services/planning/assign-draftshift.ts:208-259` : contrôle de repos minimum via règle société.
- `lib/services/planning/assign-draftshift.ts:261-304` : blocage des conflits + audit `DRAFT_SHIFT_ASSIGNED_MANUALLY`.
- `lib/services/planning/assign-shift.ts:129-197` : conflits utilisateur / véhicule contrôlés contre shifts publiés et brouillons DRAFT.
- `lib/services/planning/assign-shift.ts:199-244` : contrôle de repos minimum via règle société.
- `lib/services/planning/assign-shift.ts:246-292` : blocage des conflits + mise à jour `Shift` + audit `SHIFT_ASSIGNED_MANUALLY`.

### Page `/planning`
- `app/planning/page.tsx:17-31` : récupération des permissions de consultation, édition planning et autoschedule.
- `app/planning/page.tsx:39-65` : la page injecte dépôts actifs et utilisateurs accessibles dans `PlanningClient`.
- `app/planning/planning-client.tsx:426-437` : la liste principale affichée est chargée depuis `/api/planning/shifts`.
- `app/api/planning/shifts/route.ts:105-157` : cette route lit uniquement `prisma.shift.findMany(...)`, donc uniquement des shifts publiés liés à l’utilisateur ciblé.
- `app/planning/planning-client.tsx:446-470` : les `draftShifts` du run sont lus pour compter / informer, pas pour construire la liste principale éditable.
- `app/api/planning/autoschedule/runs/[id]/route.ts:92-153` : l’API run retourne bien les `draftShifts`, mais la page n’en fait pas une surface claire d’édition manuelle véhicule.
- `app/planning/planning-client.tsx:522-578` : la liste véhicules du planning vient de `/api/vehicles?limit=500`.
- `app/api/vehicles/route.ts:44-70` : cet endpoint exige `canManageVehicles(...)` et retourne les véhicules `isActive: true` sans filtre sur `status`.
- `app/planning/planning-client.tsx:1104-1162` : l’UI appelle bien `PATCH /api/planning/shifts/{id}/assign`.
- `app/planning/planning-client.tsx:1126-1140` : l’UI attend `USER_CONFLICT` / `VEHICLE_CONFLICT` au lieu des codes réels `USER_OVERLAP_CONFLICT` / `VEHICLE_OVERLAP_CONFLICT`.
- `app/planning/planning-client.tsx:1698-1714` et `1848-1864` : la sélection d’un véhicule permet affectation, modification et retrait via option vide `— Désaffecter —`.

### Permissions
- `lib/permissions.ts:89-102` : la permission véhicules est distincte de la permission édition planning.

### Validation locale du schéma dédié
- `lib/validators/planning-assign.ts:20-59` : schéma local présent, mais limité à `userId`, `user2Id`, `vehicleId`, sans `depotId`, et non utilisé par la route auditée.

## Validations réellement exécutées
- `npm run lint` → échec d’environnement : `sh: 1: eslint: not found`
- `npm run build` → échec d’environnement : `sh: 1: next: not found`
