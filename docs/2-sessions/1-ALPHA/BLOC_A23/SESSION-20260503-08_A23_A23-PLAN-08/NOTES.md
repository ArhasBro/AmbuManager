# NOTES

## Diagnostic detaille

1. Cause du `assign_status=400` observe en A23-PLAN-07
- L'endpoint `/api/planning/shifts/{id}/assign` refuse volontairement un payload vide (validator `planningAssignInputSchema`).
- Dans `.codex-temp/a23-plan07-audit.mjs`, le parsing users utilisait `usersResp.json.data` comme tableau.
- Or `GET /api/users` renvoie `ok:true` avec `data.items`.
- Consequence : `users=[]`, donc `assign_payload={}`, puis `400`.

2. Ecart template -> horaires
- Le panneau manuel ne chargeait pas les horaires template (`startTime/endTime/isTimeDefined/crossesMidnight`).
- La selection template ne synchronisait pas les champs horaires.
- L'API `POST /api/planning/shifts` acceptait des horaires divergents du template.

## Corrections appliquees

- `manual-planning-panel.tsx`
  - enrichissement des templates charges (horaires + minStaffCount) ;
  - synchronisation automatique des horaires lors du choix de template ;
  - verrouillage des inputs horaires si template horaire ;
  - message explicite "horaires imposes" ;
  - completion affectation utilisateur directement dans la carte shift manuel (slot 1 + slot 2 conditionnel), avec appel API `/assign`.

- `app/api/planning/shifts/route.ts`
  - blocage create si template horaire et horaires soumis differents (`TEMPLATE_TIME_MISMATCH`).

- `app/api/planning/shifts/[id]/route.ts`
  - blocage update si template horaire et tentative de mise a jour template/horaires incoherente (`TEMPLATE_TIME_MISMATCH`).

## Non traite (hors scope)

- Refonte UX globale planning.
- Refonte RBAC/users/RH.
- Migrations Prisma.
