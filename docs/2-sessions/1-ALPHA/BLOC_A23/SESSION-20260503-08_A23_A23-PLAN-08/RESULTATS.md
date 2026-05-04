# RESULTATS

## Decision patch

`PATCH`

Justification : correction et completion code necessaires pour atteindre la DoD A23-PLAN-08.

## Resultats des flux planning manuel

| Flux | Resultat apres correction | Statut | Preuve | Commentaire |
|---|---|---|---|---|
| Template -> horaires | Le template horaire applique ses horaires dans le formulaire; l'API bloque toute divergence create/update (`TEMPLATE_TIME_MISMATCH`). | OK | `mismatch_create_status=409`, `mismatch_create_error=TEMPLATE_TIME_MISMATCH`, `create_status=201` (annexe brute) | Cas traversant minuit `16:00-00:00` gere et persiste. |
| Affectation personnel | Affectation utilisateur fonctionnelle sur shift manuel (`PATCH /assign`), persistence `userId` confirmee. | OK | `assign_status=200`, `assign_ok=true`, `shift_before_cancel.userId` renseigne, `db_shift.userId` renseigne | Cause du `400` precedent: payload vide `{}` dans script A23-PLAN-07. |
| Modification d'un shift | Edition toujours fonctionnelle avec template nuit `16:00-00:00`. | OK | `edit_status=200`, `edit_ok=true`, `edit_payload.startTime=16:00`, `edit_payload.endTime=00:00` | Comportement minuit preserve. |
| Annulation logique / suppression metier | Annulation logique conservee, sans suppression physique. | OK | `cancel_status=200`, `shift_after_cancel.isCancelled=true`, `db_shift.id` present, `db_shift.cancelledAt` et `db_shift.cancellationReason` renseignes | Conforme au besoin metier. |

## Limites restantes

- Preuve UX navigateur interactive complete (capture et parcours click-by-click) :

INFORMATION NON FOURNIE — À CONFIRMER

## Verdict session

PARCOURS PLANNING MANUEL ADMIN TESTABLE SANS BLOCAGE MAJEUR : OUI

## Fichiers modifies

- app/planning/manual-planning-panel.tsx
- app/api/planning/shifts/route.ts
- app/api/planning/shifts/[id]/route.ts
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-08_A23_A23-PLAN-08/PATCH/PATCH__SESSION-20260503-08_A23_A23-PLAN-08.diff
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-08_A23_A23-PLAN-08/ANNEXE_PREUVE_BRUTE_NODE.md
