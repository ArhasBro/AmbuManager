# ANNEXE_PREUVE_BRUTE_NODE

Commande executee (preuve terminale brute) :

```powershell
$env:DATABASE_URL='postgresql://admin:admin123@localhost:5432/ambulance_db?schema=public'
node .codex-temp/a23-plan07-audit.mjs
```

Sortie brute complete :

```json
{
  "login_status": 200,
  "login_location": null,
  "session_status": 200,
  "session_user": {
    "name": "Nathan",
    "email": "admin@ambulance.local",
    "id": "09bf81cb-027b-4acc-8836-c394e3c9303f",
    "role": "ADMIN",
    "companyId": "0b962563-4ed1-426e-a817-b5410012e7d0",
    "isGlobalSupport": false
  },
  "planning_status": 200,
  "planning_has_title": true,
  "planning_has_manual_label": true,
  "templates_count": 10,
  "template_cross_midnight": {
    "id": "cmocl5p9p000mkg7kx54w4qcu",
    "name": "AMB Nuit 16:00-00:00",
    "category": "AMBULANCE",
    "startTime": "16:00",
    "endTime": "00:00",
    "crossesMidnight": true
  },
  "create_payload": {
    "date": "2026-05-04",
    "startTime": "08:00",
    "endTime": "12:00",
    "templateId": "cmocl5p9p000mkg7kx54w4qcu",
    "depotId": null,
    "notes": "A23-PLAN-07 audit shift create"
  },
  "created_shift_id": "cmoreh9yd00016c7kty9mbwsa",
  "create_status": 201,
  "assign_status": 400,
  "assign_ok": false,
  "assign_payload": {},
  "edit_status": 200,
  "edit_ok": true,
  "edit_payload": {
    "date": "2026-05-04",
    "startTime": "16:00",
    "endTime": "00:00",
    "templateId": "cmocl5p9p000mkg7kx54w4qcu",
    "depotId": null,
    "notes": "A23-PLAN-07 audit shift edited"
  },
  "shift_before_cancel": {
    "id": "cmoreh9yd00016c7kty9mbwsa",
    "companyId": "0b962563-4ed1-426e-a817-b5410012e7d0",
    "date": "2026-05-03T22:00:00.000Z",
    "startAt": "2026-05-04T14:00:00.000Z",
    "endAt": "2026-05-04T22:00:00.000Z",
    "userId": null,
    "user2Id": null,
    "vehicleId": null,
    "depotId": null,
    "runId": null,
    "templateId": "cmocl5p9p000mkg7kx54w4qcu",
    "notes": "A23-PLAN-07 audit shift edited",
    "isCancelled": false,
    "cancelledAt": null,
    "cancellationReason": null,
    "createdAt": "2026-05-04T16:14:53.606Z",
    "updatedAt": "2026-05-04T16:14:55.367Z",
    "user": null,
    "user2": null,
    "vehicle": null,
    "depot": null,
    "template": {
      "id": "cmocl5p9p000mkg7kx54w4qcu",
      "name": "AMB Nuit 16:00-00:00",
      "category": "AMBULANCE",
      "minStaffCount": null,
      "requiredVehicleType": null,
      "color": null
    },
    "run": null
  },
  "cancel_status": 200,
  "cancel_ok": true,
  "shift_after_cancel": {
    "id": "cmoreh9yd00016c7kty9mbwsa",
    "companyId": "0b962563-4ed1-426e-a817-b5410012e7d0",
    "date": "2026-05-03T22:00:00.000Z",
    "startAt": "2026-05-04T14:00:00.000Z",
    "endAt": "2026-05-04T22:00:00.000Z",
    "userId": null,
    "user2Id": null,
    "vehicleId": null,
    "depotId": null,
    "runId": null,
    "templateId": "cmocl5p9p000mkg7kx54w4qcu",
    "notes": "A23-PLAN-07 audit shift edited",
    "isCancelled": true,
    "cancelledAt": "2026-05-04T16:14:56.255Z",
    "cancellationReason": "A23-PLAN-07 cancel test",
    "createdAt": "2026-05-04T16:14:53.606Z",
    "updatedAt": "2026-05-04T16:14:56.256Z",
    "user": null,
    "user2": null,
    "vehicle": null,
    "depot": null,
    "template": {
      "id": "cmocl5p9p000mkg7kx54w4qcu",
      "name": "AMB Nuit 16:00-00:00",
      "category": "AMBULANCE",
      "minStaffCount": null,
      "requiredVehicleType": null,
      "color": null
    },
    "run": null
  },
  "history_after_count": 3,
  "db_shift_record": {
    "id": "cmoreh9yd00016c7kty9mbwsa",
    "isCancelled": true,
    "cancelledAt": "2026-05-04T16:14:56.255Z",
    "cancellationReason": "A23-PLAN-07 cancel test",
    "templateId": "cmocl5p9p000mkg7kx54w4qcu",
    "startAt": "2026-05-04T14:00:00.000Z",
    "endAt": "2026-05-04T22:00:00.000Z"
  }
}
```
