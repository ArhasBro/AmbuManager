# NOTES

Notes de travail de la session.

---

## Cadrage validé

- Méthode validée pour le bloc : **1 patch → 1 test → 1 validation**.
- Périmètre retenu : traçabilité minimale du planning/autoschedule, sans UI d’historique ni versioning complet.

## Choix techniques retenus

- Modèle Prisma dédié : `PlanningAuditLog`.
- Helper centralisé : `lib/services/planning/planning-audit.ts`.
- Données minimales tracées : `companyId`, `actorUserId`, `runId`, `action`, `entityType`, `entityId`, `summary`, `payload`, `createdAt`.
- Écriture d’audit dans la même transaction que la mutation quand la route/service est transactionnel.

## Particularité relevée pendant les tests

- L’UI actuelle `/planning` n’expose pas directement les `DraftShift` brouillon comme cartes éditables.
- Le test manuel `DRAFT_SHIFT_ASSIGNED_MANUALLY` a donc été validé via l’API d’assignation depuis la console navigateur.
