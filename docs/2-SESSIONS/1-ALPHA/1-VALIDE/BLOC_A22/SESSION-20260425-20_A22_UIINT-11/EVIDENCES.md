# EVIDENCES

## Decision

- Decision : PATCH

## Verification patch principal

Commande executee :

`ash
git apply --check -p2 docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-20_A22_UIINT-11/PATCH/SESSION-20260425-20_A22_UIINT-11.diff
git apply -p2 docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-20_A22_UIINT-11/PATCH/SESSION-20260425-20_A22_UIINT-11.diff
`

Resultat : OK

## Verification patch correctif

Commande executee :

`ash
git apply --check -p2 docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-20_A22_UIINT-11/PATCH/SESSION-20260425-20_A22_UIINT-11_FIX-01.diff
git apply -p2 docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-20_A22_UIINT-11/PATCH/SESSION-20260425-20_A22_UIINT-11_FIX-01.diff
`

Resultat : OK (warning whitespace en fin de patch, application effective)

## Validation terminale - lint

Commande executee :

`ash
npm.cmd run lint
`

Sortie brute :

`	ext

> ambulance-manager@0.1.0 lint
> eslint .


`

Statut : OK

## Validation terminale - build

Commande executee :

`ash
npm.cmd run build
`

Sortie brute :

`	ext

> ambulance-manager@0.1.0 build
> next build

â–² Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...

> Build error occurred
Error: Turbopack build failed with 28 errors:
./app/api/health/prisma/route.ts:2:1
Module not found: Can't resolve '@prisma/client'
[0m [90m 1 |[39m [36mimport[39m { getServerSession } [36mfrom[39m [32m"next-auth/next"[39m[33m;[39m
[31m[1m>[22m[39m[90m 2 |[39m [36mimport[39m { [33mRole[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 3 |[39m
 [90m 4 |[39m [36mimport[39m { prisma } [36mfrom[39m [32m"@/lib/prisma"[39m[33m;[39m
 [90m 5 |[39m [36mimport[39m { authOptions } [36mfrom[39m [32m"@/lib/auth"[39m[33m;[39m[0m



https://nextjs.org/docs/messages/module-not-found


./app/api/planning/autoschedule/runs/[id]/cancel/route.ts:8:1
Module not found: Can't resolve '@prisma/client'
[0m [90m  6 |[39m [36mimport[39m { prisma } [36mfrom[39m [32m"@/lib/prisma"[39m[33m;[39m
 [90m  7 |[39m [36mimport[39m { prismaToHttp } [36mfrom[39m [32m"@/lib/api/prisma-error"[39m[33m;[39m
[31m[1m>[22m[39m[90m  8 |[39m [36mimport[39m { [33mAutoScheduleStatus[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m  9 |[39m [36mimport[39m { canCancelAutoSchedule } [36mfrom[39m [32m"@/lib/permissions"[39m[33m;[39m
 [90m 10 |[39m [36mimport[39m { writePlanningAudit } [36mfrom[39m [32m"@/lib/services/planning/planning-audit"[39m[33m;[39m
 [90m 11 |[39m[0m



https://nextjs.org/docs/messages/module-not-found


./app/api/planning/autoschedule/runs/[id]/publish/route.ts:4:1
Module not found: Can't resolve '@prisma/client'
[0m [90m 2 |[39m [36mimport[39m { getServerSession } [36mfrom[39m [32m"next-auth/next"[39m[33m;[39m
 [90m 3 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
[31m[1m>[22m[39m[90m 4 |[39m [36mimport[39m { [33mAutoScheduleStatus[39m[33m,[39m [33mPrisma[39m[33m,[39m [33mRole[39m[33m,[39m [33mRuleMode[39m[33m,[39m [33mVehicleStatus[39m[33m,[39m [33mVehicleType[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 5 |[39m
 [90m 6 |[39m [36mimport[39m { [33mCOMPANY_PARAMETER_KEYS[39m } [36mfrom[39m [32m"@/lib/company-rules/catalog"[39m[33m;[39m
 [90m 7 |[39m [36mimport[39m { loadMinRestCompanyRule } [36mfrom[39m [32m"@/lib/company-rules/runtime"[39m[33m;[39m[0m



https://nextjs.org/docs/messages/module-not-found


./app/api/planning/autoschedule/runs/route.ts:7:1
Module not found: Can't resolve '@prisma/client'
[0m [90m  5 |[39m [36mimport[39m { prismaToHttp } [36mfrom[39m [32m"@/lib/api/prisma-error"[39m[33m;[39m
 [90m  6 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
[31m[1m>[22m[39m[90m  7 |[39m [36mimport[39m { [33mAutoScheduleScope[39m[33m,[39m [33mAutoScheduleStatus[39m[33m,[39m type [33mPrisma[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m  8 |[39m [36mimport[39m { canAutoSchedule } [36mfrom[39m [32m"@/lib/permissions"[39m[33m;[39m
 [90m  9 |[39m
 [90m 10 |[39m [36mconst[39m [33mQuerySchema[39m [33m=[39m z[33m.[39mobject({[0m



https://nextjs.org/docs/messages/module-not-found


./app/api/users/[id]/route.ts:1:1
Module not found: Can't resolve '@prisma/client'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { [33mPrisma[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m [36mimport[39m { getServerSession } [36mfrom[39m [32m"next-auth/next"[39m[33m;[39m
 [90m 3 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
 [90m 4 |[39m[0m



https://nextjs.org/docs/messages/module-not-found


./app/api/vehicles/[id]/route.ts:1:1
Module not found: Can't resolve '@prisma/client'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { [33mPrisma[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m [36mimport[39m { getServerSession } [36mfrom[39m [32m"next-auth/next"[39m[33m;[39m
 [90m 3 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
 [90m 4 |[39m[0m



https://nextjs.org/docs/messages/module-not-found


./lib/auth.ts:6:1
Module not found: Can't resolve '@prisma/client'
[0m [90m 4 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
 [90m 5 |[39m [36mimport[39m { prisma } [36mfrom[39m [32m"@/lib/prisma"[39m[33m;[39m
[31m[1m>[22m[39m[90m 6 |[39m [36mimport[39m { [33mPlatformRole[39m[33m,[39m [33mRole[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 7 |[39m [36mimport[39m { writeLoginAudit } [36mfrom[39m [32m"@/lib/services/audit/login-audit"[39m[33m;[39m
 [90m 8 |[39m
 [90m 9 |[39m type [33mTokenExtras[39m [33m=[39m { role[33m?[39m[33m:[39m [33mRole[39m[33m;[39m platformRole[33m?[39m[33m:[39m [33mPlatformRole[39m[33m;[39m companyId[33m?[39m[33m:[39m string }[33m;[39m[0m



Import traces:
  App Route:
    ./lib/auth.ts
    ./app/api/audit/route.ts

  Server Component:
    ./lib/auth.ts
    ./app/page.tsx

https://nextjs.org/docs/messages/module-not-found


./lib/company-rules/api.ts:1:1
Module not found: Can't resolve '@prisma/client'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { [33mRuleMode[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m
 [90m 3 |[39m [36mimport[39m {
 [90m 4 |[39m   [33mCOMPANY_PARAMETER_DEFINITIONS[39m[33m,[39m[0m



Import trace:
  App Route:
    ./lib/company-rules/api.ts
    ./app/api/company/rules/route.ts

https://nextjs.org/docs/messages/module-not-found


./lib/company-rules/runtime.ts:1:1
Module not found: Can't resolve '@prisma/client'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { [33mRuleMode[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m
 [90m 3 |[39m [36mimport[39m { [33mCOMPANY_PARAMETER_KEYS[39m[33m,[39m parsePositiveNumberCompanyValue } [36mfrom[39m [32m"@/lib/company-rules/catalog"[39m[33m;[39m
 [90m 4 |[39m[0m



Import trace:
  App Route:
    ./lib/company-rules/runtime.ts
    ./app/api/planning/shifts/[id]/route.ts

https://nextjs.org/docs/messages/module-not-found


./lib/imports/import-engine.ts:2:1
Module not found: Can't resolve '@prisma/client'
[0m [90m 1 |[39m [36mimport[39m bcrypt [36mfrom[39m [32m"bcrypt"[39m[33m;[39m
[31m[1m>[22m[39m[90m 2 |[39m [36mimport[39m { [33mPlanningTemplateCategory[39m[33m,[39m [33mRole[39m[33m,[39m [33mVehicleStatus[39m[33m,[39m [33mVehicleType[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 3 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
 [90m 4 |[39m
 [90m 5 |[39m [36mimport[39m { prisma } [36mfrom[39m [32m"@/lib/prisma"[39m[33m;[39m[0m



Import trace:
  App Route:
    ./lib/imports/import-engine.ts
    ./app/api/imports/route.ts

https://nextjs.org/docs/messages/module-not-found


./lib/prisma.ts:2:1
Module not found: Can't resolve '@prisma/client'
[0m [90m 1 |[39m [90m// lib/prisma.ts[39m
[31m[1m>[22m[39m[90m 2 |[39m [36mimport[39m { [33mPrismaClient[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 3 |[39m [36mimport[39m { [33mPrismaPg[39m } [36mfrom[39m [32m"@prisma/adapter-pg"[39m[33m;[39m
 [90m 4 |[39m [36mimport[39m { [33mPool[39m } [36mfrom[39m [32m"pg"[39m[33m;[39m
 [90m 5 |[39m[0m



Import traces:
  App Route:
    ./lib/prisma.ts
    ./app/api/planning/shifts/[id]/route.ts

  Server Component:
    ./lib/prisma.ts
    ./app/onboarding/page.tsx

https://nextjs.org/docs/messages/module-not-found


./lib/rbac.ts:1:1
Module not found: Can't resolve '@prisma/client'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { [33mPlatformRole[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m
 [90m 3 |[39m [36mexport[39m [36mfunction[39m isGlobalSupport(platformRole[33m?[39m[33m:[39m [33mPlatformRole[39m [33m|[39m string [33m|[39m [36mnull[39m) {
 [90m 4 |[39m   [36mreturn[39m platformRole [33m===[39m [33mPlatformRole[39m[33m.[39m[33mSUPPORT[39m[33m;[39m[0m



Import traces:
  App Route:
    ./lib/rbac.ts
    ./app/api/depots/[id]/route.ts

  Server Component:
    ./lib/rbac.ts
    ./lib/permissions.ts
    ./app/audit/page.tsx

https://nextjs.org/docs/messages/module-not-found


./lib/services/audit/audit-context.ts:1:1
Module not found: Can't resolve '@prisma/client'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { [33mPlatformRole[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m
 [90m 3 |[39m [36mexport[39m [36mfunction[39m isRecord(value[33m:[39m unknown)[33m:[39m value is [33mRecord[39m[33m<[39m[33mstring[39m[33m,[39m unknown[33m>[39m {
 [90m 4 |[39m   [36mreturn[39m [36mtypeof[39m value [33m===[39m [32m"object"[39m [33m&&[39m value [33m!==[39m [36mnull[39m [33m&&[39m [33m![39m[33mArray[39m[33m.[39misArray(value)[33m;[39m[0m



Import trace:
  App Route:
    ./lib/services/audit/audit-context.ts
    ./app/api/audit/route.ts

https://nextjs.org/docs/messages/module-not-found


./lib/services/audit/support-action-trace.ts:1:1
Module not found: Can't resolve '@prisma/client'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { [33mPrisma[39m[33m,[39m [33mPrismaClient[39m[33m,[39m [33mPlatformRole[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m [36mimport[39m { writePlanningAudit } [36mfrom[39m [32m"@/lib/services/planning/planning-audit"[39m[33m;[39m
 [90m 3 |[39m [36mimport[39m { isRecord[33m,[39m trimOptionalString } [36mfrom[39m [32m"@/lib/services/audit/audit-context"[39m[33m;[39m
 [90m 4 |[39m[0m



Import trace:
  App Route:
    ./lib/services/audit/support-action-trace.ts
    ./app/api/vehicles/[id]/route.ts

https://nextjs.org/docs/messages/module-not-found


./lib/services/planning/matching.service.ts:1:1
Module not found: Can't resolve '@prisma/client'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { [33mPrisma[39m[33m,[39m [33mPrismaClient[39m[33m,[39m [33mRole[39m[33m,[39m [33mVehicleStatus[39m[33m,[39m [33mVehicleType[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m
 [90m 3 |[39m [36mimport[39m { loadMinRestCompanyRule } [36mfrom[39m [32m"@/lib/company-rules/runtime"[39m[33m;[39m
 [90m 4 |[39m [36mimport[39m { buildUserAbsenceMap[33m,[39m isUserAbsent[33m,[39m listUserAbsenceWindows } [36mfrom[39m [32m"@/lib/services/planning/user-absence"[39m[33m;[39m[0m



Import trace:
  App Route:
    ./lib/services/planning/matching.service.ts
    ./app/api/planning/autoschedule/day/route.ts

https://nextjs.org/docs/messages/module-not-found


./lib/services/planning/user-absence.ts:1:1
Module not found: Can't resolve '@prisma/client'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { [33mPrisma[39m[33m,[39m [33mPrismaClient[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m
 [90m 3 |[39m [36mconst[39m planningUserAbsenceSelect [33m=[39m [33mPrisma[39m[33m.[39mvalidator[33m<[39m[33mPrisma[39m[33m.[39m[33mUserAbsenceSelect[39m[33m>[39m()({
 [90m 4 |[39m   id[33m:[39m [36mtrue[39m[33m,[39m[0m



Import trace:
  App Route:
    ./lib/services/planning/user-absence.ts
    ./app/api/planning/shifts/[id]/route.ts

https://nextjs.org/docs/messages/module-not-found


./lib/services/users/user-absence.ts:1:1
Module not found: Can't resolve '@prisma/client'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { [33mPrisma[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m
 [90m 3 |[39m [36mimport[39m { prisma } [36mfrom[39m [32m"@/lib/prisma"[39m[33m;[39m
 [90m 4 |[39m [36mimport[39m { writePersonalDataAudit } [36mfrom[39m [32m"@/lib/services/audit/personal-data-audit"[39m[33m;[39m[0m



Import trace:
  App Route:
    ./lib/services/users/user-absence.ts
    ./app/api/users/[id]/absences/route.ts

https://nextjs.org/docs/messages/module-not-found


./lib/templates/template-api.ts:1:1
Module not found: Can't resolve '@prisma/client'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { [33mPlanningTemplateCategory[39m[33m,[39m [33mRole[39m[33m,[39m [33mVehicleType[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
 [90m 3 |[39m
 [90m 4 |[39m [36mimport[39m { defaultMinStaffCountFromCategory[33m,[39m normalizeTemplateColor } [36mfrom[39m [32m"@/lib/templates/template-rules"[39m[33m;[39m[0m



Import trace:
  App Route:
    ./lib/templates/template-api.ts
    ./app/api/templates/route.ts

https://nextjs.org/docs/messages/module-not-found


./lib/validators/company-rules.ts:1:1
Module not found: Can't resolve '@prisma/client'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { [33mRuleMode[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
 [90m 3 |[39m
 [90m 4 |[39m [36mexport[39m [36mconst[39m companyRulesGetQuerySchema [33m=[39m z[0m



Import trace:
  App Route:
    ./lib/validators/company-rules.ts
    ./app/api/company/rules/route.ts

https://nextjs.org/docs/messages/module-not-found


./lib/validators/user.ts:1:1
Module not found: Can't resolve '@prisma/client'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { [33mRole[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
 [90m 3 |[39m
 [90m 4 |[39m [36mimport[39m { [33mALPHA_PERMISSION_CODES[39m } [36mfrom[39m [32m"@/lib/permission-catalog"[39m[33m;[39m[0m



Import trace:
  App Route:
    ./lib/validators/user.ts
    ./app/api/users/route.ts

https://nextjs.org/docs/messages/module-not-found


./lib/validators/vehicle.ts:2:1
Module not found: Can't resolve '@prisma/client'
[0m [90m 1 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
[31m[1m>[22m[39m[90m 2 |[39m [36mimport[39m { [33mVehicleStatus[39m[33m,[39m [33mVehicleType[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 3 |[39m
 [90m 4 |[39m [36mconst[39m optionalDocumentDateSchema [33m=[39m z[33m.[39munion([z[33m.[39mcoerce[33m.[39mdate()[33m,[39m z[33m.[39m[36mnull[39m()])[33m.[39moptional()[33m;[39m
 [90m 5 |[39m[0m



Import trace:
  App Route:
    ./lib/validators/vehicle.ts
    ./app/api/vehicles/route.ts

https://nextjs.org/docs/messages/module-not-found


./app/api/users/[id]/reset-password/route.ts:1:1
Module not found: Can't resolve 'bcrypt'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m bcrypt [36mfrom[39m [32m"bcrypt"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
 [90m 3 |[39m [36mimport[39m { getServerSession } [36mfrom[39m [32m"next-auth/next"[39m[33m;[39m
 [90m 4 |[39m[0m



https://nextjs.org/docs/messages/module-not-found


./app/api/users/route.ts:2:1
Module not found: Can't resolve 'bcrypt'
[0m [90m 1 |[39m [36mimport[39m { getServerSession } [36mfrom[39m [32m"next-auth/next"[39m[33m;[39m
[31m[1m>[22m[39m[90m 2 |[39m [36mimport[39m bcrypt [36mfrom[39m [32m"bcrypt"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 3 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
 [90m 4 |[39m
 [90m 5 |[39m [36mimport[39m { json[33m,[39m ok[33m,[39m badRequest[33m,[39m unauthorized[33m,[39m forbidden[33m,[39m conflict[33m,[39m serverError } [36mfrom[39m [32m"@/lib/api/response"[39m[33m;[39m[0m



https://nextjs.org/docs/messages/module-not-found


./lib/auth.ts:3:1
Module not found: Can't resolve 'bcrypt'
[0m [90m 1 |[39m [36mimport[39m type { [33mNextAuthOptions[39m } [36mfrom[39m [32m"next-auth"[39m[33m;[39m
 [90m 2 |[39m [36mimport[39m [33mCredentialsProvider[39m [36mfrom[39m [32m"next-auth/providers/credentials"[39m[33m;[39m
[31m[1m>[22m[39m[90m 3 |[39m [36mimport[39m bcrypt [36mfrom[39m [32m"bcrypt"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 4 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
 [90m 5 |[39m [36mimport[39m { prisma } [36mfrom[39m [32m"@/lib/prisma"[39m[33m;[39m
 [90m 6 |[39m [36mimport[39m { [33mPlatformRole[39m[33m,[39m [33mRole[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m[0m



Import traces:
  App Route:
    ./lib/auth.ts
    ./app/api/audit/route.ts

  Server Component:
    ./lib/auth.ts
    ./app/page.tsx

https://nextjs.org/docs/messages/module-not-found


./lib/imports/import-engine.ts:1:1
Module not found: Can't resolve 'bcrypt'
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m bcrypt [36mfrom[39m [32m"bcrypt"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m [36mimport[39m { [33mPlanningTemplateCategory[39m[33m,[39m [33mRole[39m[33m,[39m [33mVehicleStatus[39m[33m,[39m [33mVehicleType[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m 3 |[39m [36mimport[39m { z } [36mfrom[39m [32m"zod"[39m[33m;[39m
 [90m 4 |[39m[0m



Import trace:
  App Route:
    ./lib/imports/import-engine.ts
    ./app/api/imports/route.ts

https://nextjs.org/docs/messages/module-not-found


./lib/prisma.ts:4:1
Module not found: Can't resolve 'pg'
[0m [90m 2 |[39m [36mimport[39m { [33mPrismaClient[39m } [36mfrom[39m [32m"@prisma/client"[39m[33m;[39m
 [90m 3 |[39m [36mimport[39m { [33mPrismaPg[39m } [36mfrom[39m [32m"@prisma/adapter-pg"[39m[33m;[39m
[31m[1m>[22m[39m[90m 4 |[39m [36mimport[39m { [33mPool[39m } [36mfrom[39m [32m"pg"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 5 |[39m
 [90m 6 |[39m declare global {
 [90m 7 |[39m   [90m// eslint ne remonte pas "no-var" chez toi -> on ne met pas de disable ici.[39m[0m



Import traces:
  App Route:
    ./lib/prisma.ts
    ./app/api/planning/shifts/[id]/route.ts

  Server Component:
    ./lib/prisma.ts
    ./app/onboarding/page.tsx

https://nextjs.org/docs/messages/module-not-found


./node_modules/@prisma/adapter-pg/dist/index.mjs:3:1
Module not found: Can't resolve 'pg'
[0m [90m 1 |[39m [90m// src/pg.ts[39m
 [90m 2 |[39m [36mimport[39m { [33mDebug[39m[33m,[39m [33mDriverAdapterError[39m } [36mfrom[39m [32m"@prisma/driver-adapter-utils"[39m[33m;[39m
[31m[1m>[22m[39m[90m 3 |[39m [36mimport[39m pg2 [36mfrom[39m [32m"pg"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 4 |[39m
 [90m 5 |[39m [90m// package.json[39m
 [90m 6 |[39m [36mvar[39m name [33m=[39m [32m"@prisma/adapter-pg"[39m[33m;[39m[0m



Import traces:
  App Route:
    ./node_modules/@prisma/adapter-pg/dist/index.mjs
    ./lib/prisma.ts
    ./app/api/planning/shifts/[id]/route.ts

  Server Component:
    ./node_modules/@prisma/adapter-pg/dist/index.mjs
    ./lib/prisma.ts
    ./app/onboarding/page.tsx

https://nextjs.org/docs/messages/module-not-found


./node_modules/@prisma/adapter-pg/dist/index.mjs:13:1
Module not found: Can't resolve 'pg'
[0m [90m 11 |[39m [90m// src/conversion.ts[39m
 [90m 12 |[39m [36mimport[39m { [33mColumnTypeEnum[39m } [36mfrom[39m [32m"@prisma/driver-adapter-utils"[39m[33m;[39m
[31m[1m>[22m[39m[90m 13 |[39m [36mimport[39m pg [36mfrom[39m [32m"pg"[39m[33m;[39m
 [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 14 |[39m [36mimport[39m { parse [36mas[39m parseArray } [36mfrom[39m [32m"postgres-array"[39m[33m;[39m
 [90m 15 |[39m [36mvar[39m { types } [33m=[39m pg[33m;[39m
 [90m 16 |[39m [36mvar[39m { builtins[33m:[39m [33mScalarColumnType[39m[33m,[39m getTypeParser } [33m=[39m types[33m;[39m[0m



Import traces:
  App Route:
    ./node_modules/@prisma/adapter-pg/dist/index.mjs
    ./lib/prisma.ts
    ./app/api/planning/shifts/[id]/route.ts

  Server Component:
    ./node_modules/@prisma/adapter-pg/dist/index.mjs
    ./lib/prisma.ts
    ./app/onboarding/page.tsx

https://nextjs.org/docs/messages/module-not-found


    at <unknown> (./app/api/health/prisma/route.ts:2:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./app/api/planning/autoschedule/runs/[id]/cancel/route.ts:8:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./app/api/planning/autoschedule/runs/[id]/publish/route.ts:4:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./app/api/planning/autoschedule/runs/route.ts:7:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./app/api/users/[id]/route.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./app/api/vehicles/[id]/route.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/auth.ts:6:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/company-rules/api.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/company-rules/runtime.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/imports/import-engine.ts:2:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/prisma.ts:2:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/rbac.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/services/audit/audit-context.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/services/audit/support-action-trace.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/services/planning/matching.service.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/services/planning/user-absence.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/services/users/user-absence.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/templates/template-api.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/validators/company-rules.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/validators/user.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/validators/vehicle.ts:2:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./app/api/users/[id]/reset-password/route.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./app/api/users/route.ts:2:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/auth.ts:3:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/imports/import-engine.ts:1:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at <unknown> (./lib/prisma.ts:4:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at ./node_modules/ (prisma/adapter-pg/dist/index.mjs:3:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)
    at ./node_modules/ (prisma/adapter-pg/dist/index.mjs:13:1)
    at <unknown> (https://nextjs.org/docs/messages/module-not-found)

`

Statut : KO
Cause factuelle brute : dependances manquantes hors perimetre onboarding (@prisma/client, crypt, pg) dans de multiples modules API/lib non modifies par cette session.

## Addendum FIX-02

Validation specifique du correctif `SESSION-20260425-20_A22_UIINT-11_FIX-02.diff` :

- `git apply --check -p2 docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-20_A22_UIINT-11/PATCH/SESSION-20260425-20_A22_UIINT-11_FIX-02.diff` : OK
- `git apply -p2 docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-20_A22_UIINT-11/PATCH/SESSION-20260425-20_A22_UIINT-11_FIX-02.diff` : OK
- `npm.cmd run lint` : OK
