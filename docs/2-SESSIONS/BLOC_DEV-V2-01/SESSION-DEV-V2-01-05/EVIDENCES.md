# EVIDENCES

Elements factuels utilises pendant la session corrective.

---

## Sources utilisees

- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION.md`
- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/SESSION.md`
- `app/layout.tsx`
- `app/dashboard/page.tsx`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/templates/templates-client.tsx`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_BLOC_SESSIONS_PROMPTS.md`

## Commandes executees et sorties terminales completes

### Commande
```bash
git status --short
```
Sortie :
```text
 M app/dashboard/page.tsx
 M app/layout.tsx
 M app/onboarding/onboarding-client.tsx
 M app/onboarding/page.tsx
 M app/templates/templates-client.tsx
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/EVIDENCES.md
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/FIN_SESSION.md
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/NOTES.md
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/RESULTATS.md
 M docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/SESSION.md
 M docs/2-SESSIONS/README_SESSIONS.md
 M docs/3-TEMPLATES/TEMPLATE_BLOC_SESSIONS_PROMPTS.md
?? docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/PATCH/
```

### Commande
```bash
git apply --check docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/PATCH/DEV-V2-01-05_FIX-01-code.diff
```
Sortie :
```text
error: patch failed: app/onboarding/page.tsx:40
error: app/onboarding/page.tsx: patch does not apply
error: patch failed: app/onboarding/onboarding-client.tsx:77
error: app/onboarding/onboarding-client.tsx: patch does not apply
error: patch failed: app/templates/templates-client.tsx:824
error: app/templates/templates-client.tsx: patch does not apply
```

### Commande
```bash
npm run docs:encoding
```
Sortie :
```text

> ambulance-manager@0.1.0 docs:encoding
> node scripts/check-doc-encoding.mjs

Documentation encoding guard passed.
Checked files: 46
UTF-8 strict: OK
UTF-8 without BOM: OK
No active mojibake sequence found.
```

### Commande
```bash
npm run lint
```
Sortie :
```text

> ambulance-manager@0.1.0 lint
> eslint .


C:\Users\arche\ambulance-manager\app\planning\planning-client.tsx
   597:3   warning  'canManageCompanyMode' is defined but never used                 @typescript-eslint/no-unused-vars
   601:21  warning  'setWeekStart' is assigned a value but never used                @typescript-eslint/no-unused-vars
   608:26  warning  'setSelectedUserId' is assigned a value but never used           @typescript-eslint/no-unused-vars
   615:10  warning  'companyRuleLoaded' is assigned a value but never used           @typescript-eslint/no-unused-vars
   616:10  warning  'saving' is assigned a value but never used                      @typescript-eslint/no-unused-vars
   621:26  warning  'setAssignmentMode' is assigned a value but never used           @typescript-eslint/no-unused-vars
   649:10  warning  'listsError' is assigned a value but never used                  @typescript-eslint/no-unused-vars
   659:35  warning  'setSelectedMatchingVariant' is assigned a value but never used  @typescript-eslint/no-unused-vars
   726:9   warning  'selectedBinomeUser' is assigned a value but never used          @typescript-eslint/no-unused-vars
  1095:9   warning  'saveCompanyMode' is assigned a value but never used             @typescript-eslint/no-unused-vars
  1178:9   warning  'generateWeek' is assigned a value but never used                @typescript-eslint/no-unused-vars
  1289:9   warning  'previewMatch' is assigned a value but never used                @typescript-eslint/no-unused-vars
  1369:9   warning  'applyMatch' is assigned a value but never used                  @typescript-eslint/no-unused-vars
  1460:9   warning  'publishLastRun' is assigned a value but never used              @typescript-eslint/no-unused-vars
  1581:9   warning  'cancelLastRun' is assigned a value but never used               @typescript-eslint/no-unused-vars
  1767:9   warning  'publishDisabled' is assigned a value but never used             @typescript-eslint/no-unused-vars
  1776:9   warning  'matchDisabled' is assigned a value but never used               @typescript-eslint/no-unused-vars
  1797:9   warning  'applyBlocked' is assigned a value but never used                @typescript-eslint/no-unused-vars

✖ 18 problems (0 errors, 18 warnings)
```

### Commande
```bash
npm run build
```
Sortie :
```text

> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 12.4s
  Running TypeScript ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/29) ...
  Generating static pages using 15 workers (7/29) 
  Generating static pages using 15 workers (14/29) 
  Generating static pages using 15 workers (21/29) 
✓ Generating static pages using 15 workers (29/29) in 739.4ms
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
```

### Commande
```bash
Controle mojibake (motifs: Ã, Â, â€, �) sur fichiers modifies
```
Sortie :
```text
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/EVIDENCES.md => SEQUENCE_SUSPECTE_DETECTEE
```

### Commande
```bash
Controle points d'interrogation dans libelles entre guillemets
```
Sortie :
```text
app/onboarding/onboarding-client.tsx:115:if (typeof value === "boolean") return value ? "Oui" : "Non";
app/onboarding/onboarding-client.tsx:259:<span className="onboarding-step__action">{step.done ? "Ouvrir" : "Configurer"}</span>
app/onboarding/onboarding-client.tsx:276:<li className={preview?.invalidRows ? "is-warning" : preview ? "is-active" : ""}><span>4</span><small>Erreurs</small></li>
app/templates/templates-client.tsx:161:return `${template.startTime ?? "-"} - ${template.endTime ?? "-"}${template.crossesMidnight ? " (+1j)" : ""}`;
app/templates/templates-client.tsx:681:const confirmed = window.confirm("Archiver ce template ? Il restera visible dans l'historique mais ne sera plus actif.");
```

### Commande
```bash
Controle UTF-8 sans BOM + newline final
```
Sortie :
```text
app/layout.tsx => BOM:False ; FinalNewline:True
app/dashboard/page.tsx => BOM:False ; FinalNewline:True
app/onboarding/page.tsx => BOM:False ; FinalNewline:True
app/onboarding/onboarding-client.tsx => BOM:False ; FinalNewline:True
app/templates/templates-client.tsx => BOM:False ; FinalNewline:True
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/SESSION.md => BOM:False ; FinalNewline:True
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/NOTES.md => BOM:False ; FinalNewline:True
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/EVIDENCES.md => BOM:False ; FinalNewline:True
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/RESULTATS.md => BOM:False ; FinalNewline:True
docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/FIN_SESSION.md => BOM:False ; FinalNewline:True
docs/2-SESSIONS/README_SESSIONS.md => BOM:False ; FinalNewline:True
docs/3-TEMPLATES/TEMPLATE_BLOC_SESSIONS_PROMPTS.md => BOM:False ; FinalNewline:True
```

