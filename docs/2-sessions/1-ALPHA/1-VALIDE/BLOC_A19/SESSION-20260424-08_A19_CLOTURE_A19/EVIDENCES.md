# EVIDENCES

Ã‰lÃ©ments factuels utilisÃ©s pendant la session.

---

## Sources utilisÃ©es

### Documentation projet relue
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` : fichier absent ou vide constate par lecture conditionnelle, aucune instruction complementaire exploitable.
- `docs/2-sessions/1-ALPHA/BLOC_A19/SESSION-20260424-05_A19_PLAN-ADV-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A19/SESSION-20260424-06_A19_PLAN-ADV-LOT-02/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A19/SESSION-20260424-07_A19_PLAN-ADV-03/RESULTATS.md`

Source archive contrôlée : `AmbuManager-main.zip`.

### Code reel controle
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/assign-shift.ts`

### Preuves code relevees
- `planning-client.tsx` contient `VisibilityMode = "GLOBAL" | "PERSONAL" | "BINOME"`.
- `planning-client.tsx` contient `selectedShiftIds` et les actions de selection visible, selection par jour et selection par shift.
- `planning-client.tsx` contient `applyBulkAssign` et le bouton `Affecter la selection`.
- `planning-client.tsx` contient les modes `SIMPLE` et `AMBULANCE`.
- `planning-client.tsx` filtre la vue binome par shifts communs entre deux utilisateurs.
- `app/api/planning/shifts/[id]/assign/route.ts` route l'affectation vers `assignDraftShift` ou `assignShift` selon la nature du shift.

### Validations terminales
- `npm.cmd run lint` : exit code 0.
- `npm.cmd run build` : exit code 0.
- `npm run lint` et `npm run build` sans `.cmd` : non executables dans cette console PowerShell car `npm.ps1` est bloque par la policy d'execution.

