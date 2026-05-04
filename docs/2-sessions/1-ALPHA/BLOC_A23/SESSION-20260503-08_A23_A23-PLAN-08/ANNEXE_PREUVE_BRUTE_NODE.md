# ANNEXE_PREUVE_BRUTE_NODE

Commande executee :

```powershell
$env:DATABASE_URL='postgresql://admin:admin123@localhost:5432/ambulance_db?schema=public'
node .codex-temp/a23-plan08-validate.mjs
```

Sortie brute :

```json
{
  "session_id": "SESSION-20260503-08_A23_A23-PLAN-08",
  "checks": {
    "login_status": 200,
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
    "planning_has_manual": true,
    "templates_count": 10,
    "selected_template": {
      "id": "cmocl5p9p000mkg7kx54w4qcu",
      "name": "AMB Nuit 16:00-00:00",
      "category": "AMBULANCE",
      "requiredRole": null,
      "minStaffCount": null,
      "isTimeDefined": true,
      "startTime": "16:00",
      "endTime": "00:00",
      "crossesMidnight": true
    },
    "users_count": 4,
    "selected_user": {
      "id": "86411856-109c-4130-9280-701294c50a7a",
      "name": "Justine",
      "role": "ADE"
    },
    "selected_user2": {
      "id": "09bf81cb-027b-4acc-8836-c394e3c9303f",
      "name": "Nathan",
      "role": "ADMIN"
    },
    "mismatch_create_status": 409,
    "mismatch_create_ok": false,
    "mismatch_create_error": "TEMPLATE_TIME_MISMATCH",
    "mismatch_create_details": {
      "templateStartTime": "16:00",
      "templateEndTime": "00:00",
      "templateCrossesMidnight": true,
      "submittedStartTime": "08:00",
      "submittedEndTime": "12:00"
    },
    "create_status": 201,
    "create_ok": true,
    "create_payload": {
      "date": "2026-05-04",
      "startTime": "16:00",
      "endTime": "00:00",
      "templateId": "cmocl5p9p000mkg7kx54w4qcu",
      "depotId": null,
      "notes": "A23-PLAN-08 create aligned"
    },
    "shift_id": "cmorfxj2k0001dc7k6g2oxyfo",
    "assign_status": 200,
    "assign_ok": true,
    "assign_error": null,
    "assign_payload": {
      "userId": "86411856-109c-4130-9280-701294c50a7a"
    },
    "edit_status": 200,
    "edit_ok": true,
    "edit_payload": {
      "date": "2026-05-04",
      "startTime": "16:00",
      "endTime": "00:00",
      "templateId": "cmocl5p9p000mkg7kx54w4qcu",
      "depotId": null,
      "notes": "A23-PLAN-08 edited aligned"
    },
    "shift_before_cancel": {
      "id": "cmorfxj2k0001dc7k6g2oxyfo",
      "companyId": "0b962563-4ed1-426e-a817-b5410012e7d0",
      "date": "2026-05-03T22:00:00.000Z",
      "startAt": "2026-05-04T14:00:00.000Z",
      "endAt": "2026-05-04T22:00:00.000Z",
      "userId": "86411856-109c-4130-9280-701294c50a7a",
      "user2Id": null,
      "vehicleId": null,
      "depotId": null,
      "runId": null,
      "templateId": "cmocl5p9p000mkg7kx54w4qcu",
      "notes": "A23-PLAN-08 edited aligned",
      "isCancelled": false,
      "cancelledAt": null,
      "cancellationReason": null,
      "createdAt": "2026-05-04T16:55:31.532Z",
      "updatedAt": "2026-05-04T16:55:33.704Z",
      "user": {
        "id": "86411856-109c-4130-9280-701294c50a7a",
        "name": "Justine",
        "email": "justine.28062001@gmail.com",
        "role": "ADE"
      },
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
      "id": "cmorfxj2k0001dc7k6g2oxyfo",
      "companyId": "0b962563-4ed1-426e-a817-b5410012e7d0",
      "date": "2026-05-03T22:00:00.000Z",
      "startAt": "2026-05-04T14:00:00.000Z",
      "endAt": "2026-05-04T22:00:00.000Z",
      "userId": "86411856-109c-4130-9280-701294c50a7a",
      "user2Id": null,
      "vehicleId": null,
      "depotId": null,
      "runId": null,
      "templateId": "cmocl5p9p000mkg7kx54w4qcu",
      "notes": "A23-PLAN-08 edited aligned",
      "isCancelled": true,
      "cancelledAt": "2026-05-04T16:55:34.729Z",
      "cancellationReason": "A23-PLAN-08 cancel logical",
      "createdAt": "2026-05-04T16:55:31.532Z",
      "updatedAt": "2026-05-04T16:55:34.731Z",
      "user": {
        "id": "86411856-109c-4130-9280-701294c50a7a",
        "name": "Justine",
        "email": "justine.28062001@gmail.com",
        "role": "ADE"
      },
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
    "db_shift": {
      "id": "cmorfxj2k0001dc7k6g2oxyfo",
      "userId": "86411856-109c-4130-9280-701294c50a7a",
      "user2Id": null,
      "startAt": "2026-05-04T14:00:00.000Z",
      "endAt": "2026-05-04T22:00:00.000Z",
      "templateId": "cmocl5p9p000mkg7kx54w4qcu",
      "isCancelled": true,
      "cancelledAt": "2026-05-04T16:55:34.729Z",
      "cancellationReason": "A23-PLAN-08 cancel logical"
    }
  }
}
```
