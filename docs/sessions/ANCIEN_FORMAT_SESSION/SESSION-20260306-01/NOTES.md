# NOTES

Notes de travail de la session.

---

## Cadrage validé

- Méthode validée pour le bloc : **1 patch → 1 test → 1 validation**.
- Périmètre retenu : traçabilité minimale du planning/autoschedule, sans UI d’historique ni versioning complet.
- Approche retenue : progression par patchs numérotés, chacun appliqué, testé puis validé avant le suivant.
- Bloc traité strictement : **4.7.1 — Traçabilité planning minimale**.

## Choix techniques retenus

- Modèle Prisma dédié : `PlanningAuditLog`.
- Helper centralisé : `lib/services/planning/planning-audit.ts`.
- Données minimales tracées : `companyId`, `actorUserId`, `runId`, `action`, `entityType`, `entityId`, `summary`, `payload`, `createdAt`.
- Écriture d’audit dans la même transaction que la mutation quand la route/service est transactionnel.
- Traçabilité limitée au strict nécessaire pour la pré-version commerciale.

## Actions retenues dans le périmètre 4.7.1

- création de run DAY
- création de run WEEK
- publication de run
- annulation de run
- application du matching
- affectation manuelle sur `DraftShift`
- affectation manuelle sur `Shift`

## Patchs réalisés pendant la session

- `4.7.1-01` — Infrastructure d’audit minimale
- `4.7.1-02` — Audit création de run DAY/WEEK
- `4.7.1-03` — Audit publish / cancel de run
- `4.7.1-04` — Audit application du matching
- `4.7.1-05` — Audit affectations manuelles sensibles
- `4.7.1-06` — Clôture documentaire

## Particularités relevées pendant les tests

- L’UI actuelle `/planning` n’expose pas directement les `DraftShift` brouillon comme cartes éditables.
- Le test manuel `DRAFT_SHIFT_ASSIGNED_MANUALLY` a donc été validé via l’API d’assignation depuis la console navigateur.
- `PlanningAuditLog` n’était pas visible immédiatement dans Prisma Studio tant que la migration n’avait pas été appliquée / Studio relancé.
- L’affectation manuelle ne doit pas générer de log si aucune modification réelle n’est détectée.

## Résultats de validation

### Vérifications techniques validées
- `npx prisma validate` OK
- `npx prisma generate` OK
- `npm run lint` OK
- `npm run build` OK

### Vérifications manuelles validées
- test manuel WEEK ok
- test manuel DAY ok
- test manuel publish ok
- test manuel cancel ok
- test manuel match apply ok
- test manuel Shift ok
- test manuel DraftShift ok
- test absence faux log ok

## Décisions actées

- La traçabilité minimale est validée sans refonte globale du module planning.
- Le modèle `PlanningAuditLog` est retenu comme base officielle pour l’historique planning.
- Les actions sensibles du périmètre 4.7.1 sont toutes couvertes.
- Les affectations manuelles ne doivent produire un audit que s’il existe une différence réelle avant/après.
- Le bloc 4.7.1 peut être considéré comme terminé et validé.

## Point de reprise

- Dernier point validé : **bloc 4.7.1 terminé**
- Reprise suivante : **INFORMATION NON FOURNIE — À CONFIRMER**