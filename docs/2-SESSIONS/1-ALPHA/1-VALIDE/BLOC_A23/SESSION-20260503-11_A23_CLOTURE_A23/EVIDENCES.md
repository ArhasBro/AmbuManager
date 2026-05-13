# EVIDENCES

Elements factuels utilises pendant la session.

---

## 1) Preuve de cloture globale du bloc A23 (sessions 01 -> 10)

### Commande executee
```powershell
node --input-type=module - (A23 global closure summary v2)
```

### Sortie brute
```json
[
  {
    "session": "SESSION-20260503-01_A23_A23-TEST-01",
    "decision_patch": "NO_PATCH",
    "diff_count": 0,
    "diff_files": [],
    "no_patch_file": true
  },
  {
    "session": "SESSION-20260503-02_A23_A23-LOGIN-02",
    "decision_patch": "PATCH",
    "diff_count": 1,
    "diff_files": [
      "PATCH__SESSION-20260503-02_A23_A23-LOGIN-02.diff"
    ],
    "no_patch_file": false
  },
  {
    "session": "SESSION-20260503-03_A23_A23-USERS-03",
    "decision_patch": "PATCH",
    "diff_count": 1,
    "diff_files": [
      "PATCH__SESSION-20260503-03_A23_A23-USERS-03.diff"
    ],
    "no_patch_file": false
  },
  {
    "session": "SESSION-20260503-04_A23_A23-USERS-04",
    "decision_patch": "NO_PATCH",
    "diff_count": 0,
    "diff_files": [],
    "no_patch_file": true
  },
  {
    "session": "SESSION-20260503-05_A23_A23-UI-05",
    "decision_patch": "NO_PATCH",
    "diff_count": 0,
    "diff_files": [],
    "no_patch_file": true
  },
  {
    "session": "SESSION-20260503-06_A23_A23-UI-06",
    "decision_patch": "PATCH",
    "diff_count": 2,
    "diff_files": [
      "PATCH__SESSION-20260503-06_A23_A23-UI-06.diff",
      "PATCH__SESSION-20260503-06_A23_A23-UI-06_FIX-01.diff"
    ],
    "no_patch_file": false
  },
  {
    "session": "SESSION-20260503-07_A23_A23-PLAN-07",
    "decision_patch": "NO_PATCH",
    "diff_count": 0,
    "diff_files": [],
    "no_patch_file": true
  },
  {
    "session": "SESSION-20260503-08_A23_A23-PLAN-08",
    "decision_patch": "PATCH",
    "diff_count": 1,
    "diff_files": [
      "PATCH__SESSION-20260503-08_A23_A23-PLAN-08.diff"
    ],
    "no_patch_file": false
  },
  {
    "session": "SESSION-20260503-09_A23_A23-ROLES-RH-09",
    "decision_patch": "NO_PATCH",
    "diff_count": 0,
    "diff_files": [],
    "no_patch_file": true
  },
  {
    "session": "SESSION-20260503-10_A23_A23-GONOGO-10",
    "decision_patch": "NO_PATCH",
    "diff_count": 0,
    "diff_files": [],
    "no_patch_file": true
  }
]
EXIT=0
```

## 2) Preuves patch-first (git apply --check / git apply)

Execution dans un worktree propre detache :
`C:\Users\arche\ambulance-manager\.codex-temp\wt-a23-cloture11-proof`

### Commande
```powershell
git apply --check "...PATCH__SESSION-20260503-11_A23_CLOTURE_A23.diff"
```

### Sortie brute
```text
CMD: git apply --check "...PATCH__SESSION-20260503-11_A23_CLOTURE_A23.diff"
EXIT=0
```

### Commande
```powershell
git apply "...PATCH__SESSION-20260503-11_A23_CLOTURE_A23.diff"
```

### Sortie brute
```text
CMD: git apply "...PATCH__SESSION-20260503-11_A23_CLOTURE_A23.diff"
EXIT=0
CMD: git diff -- app/privacy/page.tsx --
diff --git a/app/privacy/page.tsx b/app/privacy/page.tsx
index 0a17724..b2772bd 100644
--- a/app/privacy/page.tsx
+++ b/app/privacy/page.tsx
@@ -54,7 +54,7 @@ export default function PrivacyPage() {

         <div className="privacy-page__header-row">
           <PageHeader
-            title="Mentions d'information"
+            title="Mentions d'information - Donnees personnelles"
             description="Cette page vous informe sur la collecte, l'utilisation et la protection de vos donnees personnelles conformement a la reglementation en vigueur."
           />
           <p className="privacy-page__updated">Derniere mise a jour : 18 avr. 2024</p>
```

## 3) Validations terminales executees (sorties brutes)

### `npx prisma validate`
```text
CMD: npx prisma validate
The schema at prisma\schema.prisma is valid 🚀
EXIT=0
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma.
```

### `npx prisma generate`
```text
CMD: npx prisma generate

✔ Generated Prisma Client (v7.7.0) to .\node_modules\@prisma\client in 394ms

Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)


EXIT=0
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma.
```

### `npm run lint`
```text
CMD: npm run lint

> ambulance-manager@0.1.0 lint
> eslint .

EXIT=0
```

### `npm run build`
```text
CMD: npm run build

> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 9.6s
  Running TypeScript ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/29) ...
  Generating static pages using 15 workers (7/29)
  Generating static pages using 15 workers (14/29)
  Generating static pages using 15 workers (21/29)
✓ Generating static pages using 15 workers (29/29) in 962.1ms
  Finalizing page optimization ...

Route (app)
┌ ƒ /
├ ƒ /_not-found
├ ƒ /api/audit
├ ƒ /api/auth/[...nextauth]
├ ƒ /api/company/profile
├ ƒ /api/company/rules
├ ƒ /api/depots
├ ƒ /api/depots/[id]
├ ƒ /api/depots/[id]/archive
├ ƒ /api/health/prisma
├ ƒ /api/imports
├ ƒ /api/planning/autoschedule/day
├ ƒ /api/planning/autoschedule/runs
├ ƒ /api/planning/autoschedule/runs/[id]
├ ƒ /api/planning/autoschedule/runs/[id]/cancel
├ ƒ /api/planning/autoschedule/runs/[id]/match
├ ƒ /api/planning/autoschedule/runs/[id]/match/apply
├ ƒ /api/planning/autoschedule/runs/[id]/match/preview
├ ƒ /api/planning/autoschedule/runs/[id]/publish
├ ƒ /api/planning/autoschedule/week
├ ƒ /api/planning/exports
├ ƒ /api/planning/shifts
├ ƒ /api/planning/shifts/[id]
├ ƒ /api/planning/shifts/[id]/assign
├ ƒ /api/planning/shifts/[id]/cancel
├ ƒ /api/templates
├ ƒ /api/templates/[id]
├ ƒ /api/templates/[id]/archive
├ ƒ /api/users
├ ƒ /api/users/[id]
├ ƒ /api/users/[id]/absences
├ ƒ /api/users/[id]/absences/[absenceId]
├ ƒ /api/users/[id]/archive
├ ƒ /api/users/[id]/depot
├ ƒ /api/users/[id]/reset-password
├ ƒ /api/vehicles
├ ƒ /api/vehicles/[id]
├ ƒ /api/vehicles/[id]/archive
├ ƒ /api/vehicles/[id]/depot
├ ƒ /audit
├ ƒ /company
├ ƒ /dashboard
├ ƒ /depots
├ ƒ /login
├ ƒ /onboarding
├ ƒ /planning
├ ƒ /privacy
├ ƒ /templates
├ ƒ /users
└ ƒ /vehicles


ƒ Proxy (Middleware)

ƒ  (Dynamic)  server-rendered on demand

EXIT=0
```

### `npm run test:smoke`
```text
CMD: npm run test:smoke

> ambulance-manager@0.1.0 test:smoke
> node --test scripts/quality/smoke-api-critical-contracts.test.mjs

✔ users API keeps auth, tenant scoping and support exclusion (2.9725ms)
✔ users personal-data mutations keep an audit trail (2.8157ms)
✔ privacy mentions stay reachable from login (0.6693ms)
✔ templates API keeps auth, permission gate and company-scoped persistence (0.5559ms)
✔ planning shifts API keeps scope validation and company-scoped dependencies (1.0199ms)
✔ planning exports API keeps export permission and single-scope rule (0.48ms)
✔ autoschedule runs API keeps cursor validation and company scoping (0.5592ms)
✔ vehicles flow now exposes archive-only standard lifecycle (0.972ms)
ℹ tests 8
ℹ suites 0
ℹ pass 8
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 139.6841
EXIT=0
```

### `npm run test:targeted`
```text
CMD: npm run test:targeted

> ambulance-manager@0.1.0 test:targeted
> node --experimental-strip-types --test scripts/quality/targeted-sensitive-blocks.test.mjs

(node:34892) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///C:/Users/arche/ambulance-manager/lib/api/response.ts is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to C:\Users\arche\ambulance-manager\package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
✔ API response helpers return the expected status codes and shapes (46.8569ms)
✔ serializeDates converts nested Date values into ISO strings (3.642ms)
✔ template rules keep ALPHA defaults and normalize colors (0.4572ms)
✔ template slot and vehicle role compatibility stays coherent (0.7669ms)
✔ planning quality calculation keeps a meaningful quality score and explanations (18.8533ms)
✔ password policy rejects weak passwords and accepts hardened ones (2.5731ms)
✔ proxy covers sensitive authenticated application pages (0.9846ms)
ℹ tests 7
ℹ suites 0
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 421.966
EXIT=0
```

### `npm run test:quality`
```text
CMD: npm run test:quality

> ambulance-manager@0.1.0 test:quality
> npm run test:smoke && npm run test:targeted


> ambulance-manager@0.1.0 test:smoke
> node --test scripts/quality/smoke-api-critical-contracts.test.mjs

✔ users API keeps auth, tenant scoping and support exclusion (2.1983ms)
✔ users personal-data mutations keep an audit trail (2.5095ms)
✔ privacy mentions stay reachable from login (0.8119ms)
✔ templates API keeps auth, permission gate and company-scoped persistence (0.5041ms)
✔ planning shifts API keeps scope validation and company-scoped dependencies (0.7269ms)
✔ planning exports API keeps export permission and single-scope rule (0.4413ms)
✔ autoschedule runs API keeps cursor validation and company scoping (0.48ms)
✔ vehicles flow now exposes archive-only standard lifecycle (0.7848ms)
ℹ tests 8
ℹ suites 0
ℹ pass 8
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 140.6106

> ambulance-manager@0.1.0 test:targeted
> node --experimental-strip-types --test scripts/quality/targeted-sensitive-blocks.test.mjs

(node:38288) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///C:/Users/arche/ambulance-manager/lib/api/response.ts is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to C:\Users\arche\ambulance-manager\package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
✔ API response helpers return the expected status codes and shapes (41.298ms)
✔ serializeDates converts nested Date values into ISO strings (2.7041ms)
✔ template rules keep ALPHA defaults and normalize colors (0.4274ms)
✔ template slot and vehicle role compatibility stays coherent (0.4779ms)
✔ planning quality calculation keeps a meaningful quality score and explanations (16.8882ms)
✔ password policy rejects weak passwords and accepts hardened ones (2.3569ms)
✔ proxy covers sensitive authenticated application pages (1.3642ms)
ℹ tests 7
ℹ suites 0
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 398.8612
EXIT=0
```

## 4) Preuve brute test UI connecte

### Commande executee
```powershell
node --input-type=module - (Playwright UI connected proof on dev server)
```

### Sortie brute
```json
{
  "loginSucceeded": true,
  "postLoginUrl": "http://localhost:3000/dashboard",
  "shellMarkers": {
    "sidebar": 1,
    "topbar": 1,
    "metaChips": 2
  },
  "pages": [
    {"route":"/dashboard","finalUrl":"http://localhost:3000/dashboard","finalPath":"/dashboard","redirectedToLogin":false},
    {"route":"/company","finalUrl":"http://localhost:3000/company","finalPath":"/company","redirectedToLogin":false},
    {"route":"/depots","finalUrl":"http://localhost:3000/depots","finalPath":"/depots","redirectedToLogin":false},
    {"route":"/users","finalUrl":"http://localhost:3000/users","finalPath":"/users","redirectedToLogin":false},
    {"route":"/vehicles","finalUrl":"http://localhost:3000/vehicles","finalPath":"/vehicles","redirectedToLogin":false},
    {"route":"/templates","finalUrl":"http://localhost:3000/templates","finalPath":"/templates","redirectedToLogin":false},
    {"route":"/planning","finalUrl":"http://localhost:3000/planning","finalPath":"/planning","redirectedToLogin":false},
    {"route":"/audit","finalUrl":"http://localhost:3000/audit","finalPath":"/audit","redirectedToLogin":false},
    {"route":"/onboarding","finalUrl":"http://localhost:3000/onboarding","finalPath":"/onboarding","redirectedToLogin":false},
    {"route":"/privacy","finalUrl":"http://localhost:3000/privacy","finalPath":"/privacy","redirectedToLogin":false}
  ]
}
EXIT=0
```

Captures generees:
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-11_A23_CLOTURE_A23/CAPTURES_CONNECTEES/*.png`

## 5) Preuve brute affectation depot utilisateur

### Commande executee
```powershell
node --input-type=module - (SQL active depots + API assign depot proof, getSetCookie)
```

### Sortie brute
```json
{
  "active_depots_count": 2,
  "depotId": "b0a906d5-a263-4203-bb96-66ca70636d6e",
  "userId": "50625f04-5a1d-46bd-bc14-d3a094ad9721",
  "assign_status": 200,
  "assign_body_head": "{\"ok\":true,\"data\":{\"id\":\"50625f04-5a1d-46bd-bc14-d3a094ad9721\",\"name\":\"Planner\",\"email\":\"planner@ambulance.local\",\"role\":\"BUREAU\",\"companyId\":\"0b962563-4ed1-426e-a817-b5410012e7d0\""
}
EXIT=0
```

## 6) Preuve patch applique dans le depot final

### Commande executee
```powershell
Select-String -Path app/privacy/page.tsx -Pattern "Mentions d'information - Donnees personnelles"
```

### Sortie brute
```text
C:\Users\arche\ambulance-manager\app\privacy\page.tsx:57:title="Mentions d'information - Donnees personnelles"
EXIT=0
```

## 7) Controle ZIP A23-GONOGO-10

Controle de divergence ZIP final session 10 vs depot courant: aucune divergence detectee.

