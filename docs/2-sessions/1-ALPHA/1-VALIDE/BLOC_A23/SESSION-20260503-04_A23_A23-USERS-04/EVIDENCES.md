# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

### Noyau documentaire obligatoire
- docs/1-master/DOCUMENT_MAITRE.md
- docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- docs/3-templates/TEMPLATE_DEBUT_SESSION.md

### Documentation de session ciblee
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-04_A23_A23-USERS-04/SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-04_A23_A23-USERS-04/NOTES.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-04_A23_A23-USERS-04/EVIDENCES.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-04_A23_A23-USERS-04/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-04_A23_A23-USERS-04/FIN_SESSION.md

### Sessions precedentes utiles au perimetre
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-03_A23_A23-USERS-03/SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-03_A23_A23-USERS-03/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-03_A23_A23-USERS-03/EVIDENCES.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-01_A23_A23-TEST-01/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-01_A23_A23-TEST-01/EVIDENCES.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-02_A23_A23-LOGIN-02/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-02_A23_A23-LOGIN-02/EVIDENCES.md

### Code inspecte (cible)
- app/api/users/route.ts
- app/api/users/[id]/route.ts
- app/api/users/[id]/archive/route.ts
- app/api/users/[id]/depot/route.ts
- app/api/users/[id]/absences/route.ts
- app/api/users/[id]/absences/[absenceId]/route.ts
- lib/services/users/archive-user.ts
- lib/services/users/assign-user-depot.ts
- lib/services/users/user-absence.ts
- lib/validators/user.ts
- lib/validators/user-absence.ts
- prisma/schema.prisma
- app/users/page.tsx
- app/users/user-absence-client.tsx

---

## Commandes terminales executees

### 1) `git status --short`
Sortie utile :
```text
 M docs/CMD.md
```
Statut : `0`

### 2) `npx prisma validate`
Sortie utile :
```text
The schema at prisma\schema.prisma is valid
```
Statut : `0`

### 3) `npx prisma generate`
Sortie utile :
```text
Generated Prisma Client (v7.7.0)
```
Statut : `0`

### 4) `npx prisma migrate status`
Sortie utile :
```text
26 migrations found
Database schema is up to date
```
Statut : `0`

### 5) `npm run lint`
Sortie utile :
```text
> eslint .
```
Statut : `0`

### 6) `npm run build`
Sortie utile :
```text
Compiled successfully
Generating static pages ...
```
Statut : `0`

### 7) `npm run test:smoke`
Sortie utile :
```text
fail 1
privacy mentions stay reachable from login
AssertionError: privacy page must expose RGPD information
```
Statut : `1`
Commentaire : KO hors perimetre users/absences (privacy/login).

### 8) `npm run test:targeted`
Sortie utile :
```text
pass 7
fail 0
```
Statut : `0`

### 9) `npm run test:quality`
Sortie utile :
```text
test:smoke ... fail 1 (privacy)
```
Statut : `1`
Commentaire : KO herite de `test:smoke`, hors perimetre users/absences.

---

## Preuves retest users + absences (API)

### Auth ADMIN A
- `login_status=200`
- `session_status=200`
- `session_user.role=ADMIN`
- `session_user.companyId=0b962563-4ed1-426e-a817-b5410012e7d0`

### Users
- `/users` : `307` vers `/login?callbackUrl=%2Fusers` (reserve)
- `GET /api/users?page=1&pageSize=100` : `200`
- `POST /api/users` invalide : `400 VALIDATION_ERROR`
  - `formErrors: At least name, firstName or lastName is required`
  - `fieldErrors.dailyWorkEndTime: daily work start and end times must be provided together`
- `POST /api/users` valide : `201`
  - user test cree : `a23.users04+20260503173134@ambulance.local`
- `GET /api/users?...q=<email>` : `200` + user retrouve en liste active
- `GET /api/users/{id}` : `200`
- `PATCH /api/users/{id}` : `200` (role passe `ADE -> BUREAU`)
- `POST /api/users/{id}/archive` : `200` (`isActive=false`)
- Post-archivage :
  - `GET /api/users?...q=<email>` : `200`, user absent de la liste active
  - `GET /api/users/{id}` : `404`

### Depot / base
- Depot actif detecte : `Lamballe` (`b0a906d5-a263-4203-bb96-66ca70636d6e`)
- `PATCH /api/users/{id}/depot` : `200`
- `GET /api/users/{id}` : depot renseigne et actif

### Module dependant (planning)
- `POST /api/planning/shifts` : `201`
- `PATCH /api/planning/shifts/{id}/assign` : `200`
- User affecte = user cree (preuve de disponibilite user actif)

### Absences / indisponibilites
- `GET /api/users/{id}/absences` initial : `200` (0 element)
- `POST /api/users/{id}/absences` valide : `201`
- `POST /api/users/{id}/absences` dates incoherentes : `400 VALIDATION_ERROR`
- `POST /api/users/{id}/absences` overlap : `409 ABSENCE_OVERLAP`
- `PATCH /api/users/{id}/absences/{absenceId}` : `200`
- `GET /api/users/{id}/absences` final : `200` (1 element)
- Post-archivage user : `GET /api/users/{id}/absences` => `404`

### Cloisonnement companyId
- Auth ADMIN B : `session_status=200`, `companyId=512336c4-1e22-4e6a-a309-f3a98f1c90b9`
- `GET /api/users/{userA}` : `404`
- `GET /api/users/{userA}/absences` : `404`

### Verification DB (post-archivage)
- User de test toujours present en base : `id=aebedd7a-eb3d-490c-8200-579a7e6c372b`
- `isActive=false` confirme
- `absence_count_for_user=1` confirme
- Depots actifs societes detectes : `2`

---

## Informations non demontrees

- Validation navigateur manuel de l'acces `/users` avec session interactive :

INFORMATION NON FOURNIE — À CONFIRMER

- Validation UI absences (hors appels API) :

INFORMATION NON FOURNIE — À CONFIRMER
