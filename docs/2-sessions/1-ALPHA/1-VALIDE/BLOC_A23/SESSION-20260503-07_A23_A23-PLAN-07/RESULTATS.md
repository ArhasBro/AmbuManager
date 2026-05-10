# RESULTATS

## Decision patch

`NO_PATCH`

Justification : session AUDIT, aucun correctif code autorise dans cette session.

---

## Matrice d'audit planning manuel

| Flux audite | Resultat observe | Statut | Classification | Preuve | Commentaire |
|---|---|---|---|---|---|
| Template -> horaires | Templates charges (dont template nuit). Creation d'un shift avec template nuit mais horaires `08:00-12:00` acceptee. Cote UI, le select template ne synchronise pas les champs horaires. | KO partiel | BUG FONCTIONNEL | Sortie JSON de `node .codex-temp/a23-plan07-audit.mjs` (`template_cross_midnight`, `create_payload`, `create_status=201`) + code `manual-planning-panel.tsx` lignes 8, 161-169, 375-378 + `lib/templates/template-api.ts` lignes 84, 95-97 | Incoherence template/horaires non bloquee et non guidee. |
| Affectation personnel | Tentative d'affectation retournee en erreur (`assign_status=400`, `assign_ok=false`, `assign_payload={}`) et aucune affectation visible avant annulation (`userId/user2Id` null). | NON VALIDE / A CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | Sortie JSON de `node .codex-temp/a23-plan07-audit.mjs` (`assign_status=400`, `assign_ok=false`, `assign_payload={}`, `shift_before_cancel.userId/user2Id/user/user2 = null`) | Cause exacte du `400` non demontree dans les preuves de cette session. |
| Modification d'un shift | `PATCH /api/planning/shifts/{id}` OK (`200`), passage horaire `16:00-00:00` applique, persistance confirmee. | OK | N/A (conforme) | Sortie JSON de `node .codex-temp/a23-plan07-audit.mjs` (`edit_status=200`, `shift_before_cancel.startAt/endAt`) + route update `app/api/planning/shifts/[id]/route.ts` | Gestion du cas traversant minuit observee (`if !(startAt<endAt) => +1 jour`). |
| Annulation logique / suppression metier | `POST /cancel` OK (`200`), shift marque `isCancelled=true`, `cancelledAt` et `cancellationReason` renseignes, enregistrement conserve en base. | OK | N/A (conforme) | Sortie JSON de `node .codex-temp/a23-plan07-audit.mjs` (`cancel_status=200`, `shift_after_cancel.isCancelled=true`, `db_shift_record.id` present) + route cancel `app/api/planning/shifts/[id]/cancel/route.ts` lignes 57-69, 73-81 | Annulation logique (pas de suppression physique observee). |

---

## Bugs fonctionnels constates

| ID | Flux | Gravite | Description | Preuve | Recommandation |
|---|---|---|---|---|---|
| BF-A23-PLAN07-01 | Template -> horaires | Haute | Les horaires du template (`startTime/endTime/crossesMidnight`) ne sont pas synchronises dans le formulaire manuel ; un shift peut etre cree avec un template nuit et des horaires non alignes sans alerte bloquante. | `manual-planning-panel.tsx` lignes 8, 161-169, 375-378 ; `lib/templates/template-api.ts` lignes 84, 95-97 ; sortie JSON de `node .codex-temp/a23-plan07-audit.mjs` (`template_cross_midnight` + `create_payload` + `create_status=201`) | Traiter en session A23-PLAN-08 : appliquer la synchronisation template -> horaires (UI) et definir la regle metier de blocage/alerte cote API. |

---

## Problemes metier constates

| ID | Flux | Description | Impact metier | Preuve | Recommandation |
|---|---|---|---|---|---|
| PM-A23-PLAN07-01 | Template -> horaires | Absence de contrainte metier explicite imposant la coherence horaire avec le template lors de la creation/modification manuelle. | Risque de planning incoherent (template affiche une promesse horaire differente des shifts reels). | `app/api/planning/shifts/route.ts` lignes 233-256 ; sortie JSON de `node .codex-temp/a23-plan07-audit.mjs` (`create_payload` divergeant du template nuit et creation acceptee) | Cadrer puis appliquer regle metier en A23-PLAN-08 (alignement strict ou override explicite trace). |

---

## Ameliorations UX constatees

| ID | Flux | Description | Impact utilisateur | Preuve | Recommandation |
|---|---|---|---|---|---|
| UX-A23-PLAN07-01 | Planning manuel | Le module manuel est replie sous `Mode manuel avance`, ce qui reduit sa discoverability pour un retest operationnel rapide. | Parcours plus long et risque de faux negatif utilisateur (fonction presente mais peu visible). | `app/planning/planning-client.tsx` lignes 2379-2380 | En A23-PLAN-08/A23-UI : rendre l'acces manuel plus explicite (etat ouvert par defaut ou CTA direct). |
| UX-A23-PLAN07-02 | Template -> horaires | Le formulaire n'explique pas la relation template/horaires ni les implications d'override. | Ambiguite pour l'ADMIN sur ce qui est applique reellement au shift. | `manual-planning-panel.tsx` lignes 375-378 + absence de message de coherence | Ajouter aide contextuelle + feedback de coherence avant creation/sauvegarde. |

---

## Informations non demontrees

- Validation UI interactive complete du flux template -> horaires avec capture de formulaire en temps reel :

INFORMATION NON FOURNIE — À CONFIRMER

- Test affectation base/depot en contexte de depots actifs (`depots_count=0`) :

INFORMATION NON FOURNIE — À CONFIRMER

- Cause exacte de l'echec d'affectation (`assign_status=400`) sur la preuve brute :

INFORMATION NON FOURNIE — À CONFIRMER

---

## Documents modifies

- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-07_A23_A23-PLAN-07/SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-07_A23_A23-PLAN-07/NOTES.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-07_A23_A23-PLAN-07/EVIDENCES.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-07_A23_A23-PLAN-07/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-07_A23_A23-PLAN-07/FIN_SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-07_A23_A23-PLAN-07/PATCH/README_PATCH.md
