# EVIDENCES

## Commandes executees et resultats

### Inspection / preparation

- `Get-Content -Raw package.json` -> OK
- `Get-ChildItem -Path scripts -Recurse -File` -> OK
- `Get-ChildItem -Path .codex-temp -Recurse -File` -> OK

### Validations terminales techniques

- `npx prisma validate` -> OK
  - sortie : `The schema at prisma\\schema.prisma is valid`

- `npx prisma generate` -> OK
  - sortie : `Generated Prisma Client (v7.7.0)`

- `npm run lint` -> OK
  - sortie : `eslint .` sans erreur

- `npm run build` -> OK
  - sortie : `Compiled successfully` + generation routes Next.js terminee

- `npm run test:smoke` -> KO CODE
  - test en echec : `privacy mentions stay reachable from login`
  - erreur : `privacy page must expose RGPD information`
  - pattern attendu non trouve : `Mentions d'information - Donnees personnelles`

- `npm run test:targeted` -> OK
  - 7/7 tests passes

- `npm run test:quality` -> KO CODE
  - echec propage depuis `test:smoke` (meme test privacy)

### Retest ADMIN cible execute

- Demarrage serveur local :
  - `Start-Process ... npm run start ...` -> OK
  - verification : `Invoke-WebRequest http://localhost:3000/login` -> `SERVER_READY=1`

- Script retest ADMIN global :
  - `node .codex-temp/a23-gonogo-admin-retest.mjs` -> OK
  - preuves cle :
    - login/session ADMIN : `callback_status=200`, `session_status=200`, `role=ADMIN`
    - pages connectees : statuts `307` vers `/login?callbackUrl=...`
    - users API : `users_list_status=200`, `create_status=201`, `edit_status=200`, `archive_status=200`
    - absences : `absence_create_status=201`, `absence_overlap_status=409 ABSENCE_OVERLAP`, `absence_edit_status=200`
    - RBAC visible : compte `BUREAU` cree -> `GET /api/users` retourne `403 FORBIDDEN`
    - logout : `signout_status=200`, `session_after_logout=null`

- Script diagnostic navigation pages :
  - `node .codex-temp/a23-gonogo-pages.mjs` -> OK
  - preuves : pages `/dashboard`, `/company`, `/depots`, `/users`, `/vehicles`, `/templates`, `/planning`, `/audit`, `/onboarding` en `307` vers login apres login scriptable

- Script planning A23 existant :
  - `node .codex-temp/a23-plan08-validate.mjs` -> KO ENVIRONNEMENT
  - cause : `client password must be a string` (variable DB non chargee pour script Node direct)

- Script planning A23 relance avec env explicite :
  - `node --env-file=.env .codex-temp/a23-plan08-validate.mjs` -> OK
  - preuves cle :
    - `mismatch_create_status=409`, `mismatch_create_error=TEMPLATE_TIME_MISMATCH`
    - `create_status=201`, `assign_status=200`, `edit_status=200`, `cancel_status=200`
    - annulation logique confirmee (`isCancelled=true`, enregistrement DB present)

## Commandes non executees

Aucune commande demandee supplementaire non executee. Les preuves UI navigateur interactif (click-by-click visuel) ne sont pas produites dans cette session :

`INFORMATION NON FOURNIE — À CONFIRMER`
