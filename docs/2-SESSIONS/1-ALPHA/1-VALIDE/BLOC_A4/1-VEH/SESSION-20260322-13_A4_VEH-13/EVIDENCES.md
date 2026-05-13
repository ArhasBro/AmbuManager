# EVIDENCES — SESSION-20260322-13_A4_VEH-13

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
- `docs/4-templates/TEMPLATE_DOD_4_4.md`
- `docs/4-templates/TEMPLATE_RECAP_SESSION.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`

## Extraits factuels retenus

### Base produit
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:481-488` : `07.6 Affectation d’un véhicule au planning` est bien cadré comme besoin présent et indispensable.
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:490-492` : `07.7 Statut véhicule` est un sujet distinct, volontairement non rouvert ici.

### Flux planning
- `app/planning/page.tsx:22-27` : la page `/planning` calcule `canEditPlanning(...)` pour autoriser l’édition du planning.
- `app/planning/page.tsx:59-73` : la page injecte déjà des utilisateurs exploitables au client si consultation globale ou édition planning.
- `app/planning/planning-client.tsx:522-569` : le client recharge les listes société via `/api/users?limit=500` et `/api/vehicles?limit=500` ; un échec véhicules remonte en erreur bloquante de liste.
- `app/planning/planning-client.tsx:1123-1140` après patch : la gestion UI d’échec d’assignation traite `USER_CONFLICT` / `USER_OVERLAP_CONFLICT` et `VEHICLE_CONFLICT` / `VEHICLE_OVERLAP_CONFLICT`.

### Permissions et API véhicules
- `lib/permissions.ts:89-102` : `canManageVehicles(...)` et `canEditPlanning(...)` sont deux permissions distinctes.
- `app/api/vehicles/route.ts:44-73` après patch : le `GET` véhicules accepte désormais `canManageVehicles(...)` **ou** `canEditPlanning(...)`, sans ouvrir `POST` / `DELETE`.

### API d’assignation réelle
- `app/api/planning/shifts/[id]/assign/route.ts:188-195` : la branche `DraftShift` renvoie déjà `USER_OVERLAP_CONFLICT` / `VEHICLE_OVERLAP_CONFLICT` en `409`.
- `app/api/planning/shifts/[id]/assign/route.ts:265-272` : la branche `Shift` publié renvoie les mêmes codes réels.
- `lib/services/planning/assign-draftshift.ts` et `lib/services/planning/assign-shift.ts` : services conservés en lecture seule dans cette session ; aucun changement métier appliqué.

## Validations réellement constatées
- `git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A4\1-VEH\SESSION-20260322-13_A4_VEH-13\PATCH__SESSION-20260322-13_A4_VEH-13.diff"` → OK.
- `git apply ".\docs\3-patches\1-ALPHA\BLOC_A4\1-VEH\SESSION-20260322-13_A4_VEH-13\PATCH__SESSION-20260322-13_A4_VEH-13.diff"` → OK.
- `npm run lint` → OK.
- `npm run build` → OK.
