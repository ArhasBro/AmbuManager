# EVIDENCES

## Sources code réutilisées
- `prisma/schema.prisma:22-24` : présence de `PlatformRole.SUPPORT`
- `prisma/schema.prisma:65-90` : présence du modèle `PlanningAuditLog`
- `lib/services/planning/planning-audit.ts:1-29` : helper d’écriture audit déjà existant

## Preuves d’implémentation SUP-05
- `lib/services/audit/support-action-trace.ts:7-31` : helper borné au seul acteur `SUPPORT`
- `lib/services/users/assign-user-depot.ts:40-150` : ajout acteur support + trace structurée sur assignation dépôt utilisateur
- `lib/services/vehicles/assign-vehicle-depot.ts:40-150` : ajout acteur support + trace structurée sur assignation dépôt véhicule
- `lib/services/depots/create-depot.ts:6-58` : trace support sur création dépôt
- `lib/services/depots/update-depot.ts:6-81` : trace support sur mise à jour dépôt
- `lib/services/depots/archive-depot.ts:16-77` : trace support sur archivage dépôt
- `app/api/users/[id]/reset-password/route.ts:37-140` : trace support sur reset password avec valeurs masquées
- `app/api/vehicles/route.ts:73-211` : trace support sur création / suppression véhicule
- `app/api/users/[id]/depot/route.ts:27-67` : transmission de l’acteur support au service
- `app/api/vehicles/[id]/depot/route.ts:27-67` : transmission de l’acteur support au service
- `app/api/depots/route.ts:23-52` : transmission de l’acteur support au service
- `app/api/depots/[id]/route.ts:27-62` : transmission de l’acteur support au service
- `app/api/depots/[id]/archive/route.ts:28-55` : transmission de l’acteur support au service

## Validations terminales réellement obtenues
- `git apply --check SUP-05.diff` : OK
- `git apply SUP-05.diff` : OK
- `npx prisma validate` : OK
- `npx prisma generate` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Lecture factuelle
La traçabilité support demandée par SUP-05 est implémentée, exportable, applicable et validée terminalement sans réouverture fonctionnelle.
