# EVIDENCES.md

## Vérifications structurelles
- `docs/1-master/*` : présents
- `docs/PROTOCOLE_SESSION.md` : présent
- `docs/SOURCES_AUTORISEES.md` : présent
- `docs/STRUCTURE_DOCS.md` : présent
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` : présent
- `docs/4-templates/TEMPLATE_FIN_SESSION.md` : présent
- `docs/USAGE_USERS.md` : présent
- `docs/USAGE_VEHICLES.md` : présent
- `docs/USAGE_TEMPLATES.md` : présent
- `docs/USAGE_PLANNING_AUTOSCHEDULE.md` : présent
- `docs/SCENARIOS_MANUELS_ALPHA.md` : présent
- `docs/QUALITY_TESTS.md` : présent
- dossiers `BLOC_A1` à `BLOC_A13` : présents sous `docs/2-sessions/1-ALPHA` et `docs/3-patches/1-ALPHA`

## Constat documentaire transversal
- `docs/1-master/ETAT_GLOBAL_PROJET.md` : dernier état officiel encore figé au `19/03/2026`
- la “prochaine étape logique unique” documentée dans ce master reste `CLOTURE_A2`
- aucune session `CLOTURE_A1` n’a été trouvée dans `docs/2-sessions/1-ALPHA/BLOC_A1`
- verdicts explicites de clôture trouvés :
  - `A2` : `BLOC A2 CLÔTURABLE DÉFINITIVEMENT : NON`
  - `A3` : `OUI`
  - `A4` : `NON`
  - `A5` : `OUI`
  - `A6` : `OUI`
  - `A7` : `OUI`
  - `A8` : `OUI`
  - `A9` : `OUI`
  - `A10` : `OUI`
  - `A11` : `NON`
  - `A12` : `OUI`
  - `A13` : `OUI`

## Contrôle des patchs réellement retenus
- plusieurs patches anciens existent encore alors que leurs `README_PATCH.md` désignent explicitement un fix de référence ou un abandon
- cas contrôlés explicitement :
  - `A13-LOT-02-13` : patch initial déclaré invalide, `FIX-01` documenté comme patch de référence
  - `A3_USERS-04` : `FIX_V2` documenté comme patch de référence
  - `A11_AUDIT-LOT-02-09` : `FIX-01` et `FIX-02` documentés comme abandonnés, `FIX-03` et `FIX-04` retenus

## Contrôle code réel ciblé
### Support global / multi-tenant
- `app/api/users/route.ts` : `if (!companyId || !userId) return unauthorized();`
- `app/api/vehicles/route.ts` : `if (!companyId || !userId) return unauthorized();`
- ces routes ne rendent donc pas le support global nominal opérable sans `companyId` de session

### Audit support
- `lib/services/audit/support-action-trace.ts` : `SUPPORT_REASON_REQUIRED` si acteur `SUPPORT` sans `supportReason`
- appels contrôlés sans `supportReason` transmis :
  - `app/api/vehicles/route.ts`
  - `app/api/vehicles/[id]/route.ts`
  - `lib/services/vehicles/archive-vehicle.ts`
  - `lib/services/vehicles/assign-vehicle-depot.ts`
  - `lib/services/depots/create-depot.ts`
  - `lib/services/depots/update-depot.ts`
  - `lib/services/depots/archive-depot.ts`
  - `lib/services/users/assign-user-depot.ts`
  - `lib/services/users/archive-user.ts`
  - `app/api/users/[id]/reset-password/route.ts`

### Véhicules / planning
- `app/api/vehicles/route.ts` : liste réelle filtrée sur `companyId` + `isActive: true`
- `app/api/vehicles/[id]/route.ts` : aucune route `DELETE` standard exposée
- `app/vehicles/vehicles-client.tsx` : flux UI standard centré sur `/archive`
- `app/planning/planning-client.tsx` : sélecteurs véhicule consomment les véhicules listés sans filtrage visible sur `status`
- `lib/services/planning/assign-shift.ts` : contrôle type / conflits / absence / repos, pas de blocage explicite `VehicleStatus.ACTIVE`
- `lib/services/planning/assign-draftshift.ts` : même constat
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts` : publication auto-schedule bloque bien les véhicules inactifs ou au statut non `ACTIVE`

## Validations réellement exécutées dans la présente session
### Préparation environnement locale
- `npm ci --ignore-scripts` → `OK`
- `npx prisma generate` → `KO ENVIRONNEMENT`
  - raison observée : téléchargement des binaires Prisma impossible (`getaddrinfo EAI_AGAIN binaries.prisma.sh`)

### Qualité
- `npm run test:smoke` → `OK` (`6 tests`, `0 fail`)
- `npm run test:targeted` → `OK` (`5 tests`, `0 fail`)
- warning non bloquant observé sur `test:targeted` : `MODULE_TYPELESS_PACKAGE_JSON`
- `npm run lint` → `OK`
- `npm run build` → `KO DANS L’ENVIRONNEMENT COURANT`
  - premier échec observé : `app/api/audit/route.ts`
  - contexte : installation locale sans postinstall Prisma et sans client `.prisma/client` généré dans cette session
  - ce résultat ne suffit pas, à lui seul, à prouver un défaut code autonome indépendant de l’environnement courant

### Démarrage local
- `npm run dev` → `OK OBSERVÉ`
  - serveur prêt sur `http://localhost:3000`
- requête `HEAD /login` sur le serveur démarré localement → `HTTP 200`

### Prisma Studio
- `npx prisma studio --browser none` → `KO CONFIG`
  - message observé : `No database URL found`
  - résultat : `Prisma Studio` non testable dans le ZIP courant sans configuration locale complémentaire
