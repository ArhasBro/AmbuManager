# NOTES

## Méthode / observations
- Lecture préalable des documents maîtres obligatoires et du protocole de session.
- Contrôle du dépôt : `ShiftTemplate` existe déjà dans Prisma, `TEMPLATES_MANAGE` existe déjà dans le catalogue et le helper runtime `canManageTemplates(...)` est déjà présent suite à `TPL-04`.
- Vérification du périmètre réel : `app/api/templates/route.ts` portait déjà `GET`, mais aucun `POST`.
- Choix de correction minimale retenu : modifier uniquement `app/api/templates/route.ts`.
- Aucun nouveau validateur dédié n’a été créé car la validation minimale peut rester strictement locale à la route sans élargir le scope.
- Aucun changement Prisma, permission catalog, RBAC global, UI, autoschedule, matching ou planning.

## Arbitrages minimaux retenus
- `companyId` n’est jamais accepté du client et n’est pas ré-exposé dans la réponse de succès.
- `requiredRole` est accepté en `null` ou enum `Role`.
- `isActive` et `crossesMidnight` restent optionnels avec valeurs par défaut cohérentes avec le modèle actuel.
- `startTime` / `endTime` sont validés uniquement sur un format horaire strict `HH:MM`, sans ouvrir de règles métier supplémentaires non demandées.
- La gestion du conflit d’unicité repose sur le mapping Prisma existant et retourne `409 CONFLICT` avec message explicite.

## Remarque de validation locale
Les validations terminales prouvées localement pour cette session sont :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
