# EVIDENCES

## Documents relus (cibles)

- docs/1-master/DOCUMENT_MAITRE.md
- docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- docs/3-templates/TEMPLATE_DEBUT_SESSION.md
- docs/1-master/ETAT_GLOBAL_PROJET.md
- docs/1-master/REGISTRE_DECISIONS.md
- docs/1-master/RECAP_DISCUSSIONS.md
- docs/2-sessions/2-TEST-ALPHA/1-DOCUMENTATION/SESSION-20260503_TEST-LOCAL-02/ANOMALIES_CONSOLIDEES.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-01_A23_A23-TEST-01/*

## Commandes executees

- `npx prisma validate` => OK
- `npx prisma generate` => OK
- `npm run lint` => OK
- `npm run build` => OK
- `npm run test:smoke` => KO (1 test en echec privacy wording)
- `npm run test:targeted` => OK
- `npx prisma migrate status` => KO (migration non appliquee)

## Extrait migration status

- Migrations trouvees : 26
- Migration non appliquee : `20260424100000_a20_rh_lot02_user_rh_fields`

## Verification schema DB (information_schema)

Table `User` observee en base locale :
- Colonnes presentes : `id`, `email`, `password`, `name`, `role`, `companyId`, `createdAt`, `updatedAt`, `depotId`, `platformRole`, `isActive`
- Colonnes attendues par le code mais absentes : `firstName`, `lastName`, `initials`, `phone`, `isTrainee`, `dailyWorkStartTime`, `dailyWorkEndTime`

## Reproductions API (auth ADMIN)

1) Session/auth
- `GET /api/auth/csrf` => 200
- `POST /api/auth/callback/credentials` => 200
- `GET /api/auth/session` => 200 (session ADMIN valide)

2) Users
- `GET /api/users?page=1&pageSize=20` => 500 `SERVER_ERROR`
- `GET /api/users/{adminId}` => 500 `SERVER_ERROR`
- `POST /api/users` => 500 `SERVER_ERROR` (`firstName` absent en base)
- `GET /api/users?role=INVALID` => 400 `VALIDATION_ERROR`
- `POST /api/users` payload invalide => 400 `VALIDATION_ERROR`
- `GET /api/users/{adminId}/absences?limit=20` => 200 (endpoint present/actif)

3) Planning manuel
- `POST /api/planning/shifts` => 201
- `PATCH /api/planning/shifts/{id}` => 200
- `POST /api/planning/shifts/{id}/cancel` => 200
- `PATCH /api/planning/shifts/{id}/assign` => 200
- `GET /api/planning/shifts?day=...` => 200

4) Company rules
- `GET /api/company/rules` => 200
- Presence d'entrees `engineStatus: PREPARED` + `isWritable: false` + `storage.key: null`

## Logs serveur captures

Fichier : `.codex-temp/a23-test01-dev.out.log`

Occurrences notables :
- `GET /api/users... 500`
- `GET /api/users/{id} 500`
- `POST /api/users 500`
- `GET /api/users/{id}/absences 200`
- `POST/PATCH planning shifts ... 200/201`

## References UI/UX A21/A22 detectees

- `docs/1-master/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md`
- Bloc documentaire `docs/2-sessions/1-ALPHA/BLOC_A21/*`
- Bloc documentaire `docs/2-sessions/1-ALPHA/BLOC_A22/*`
