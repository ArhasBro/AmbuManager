# EVIDENCES — SESSION-20260319-25_A3_CLOTURE-A3

## Sources relues avant patch

- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- sessions `USERS-01` à `USERS-16`
- patchs réels du bloc A3

## Preuves documentaires de l’attendu A3

- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
  - résultat attendu du bloc A3 : `absences intégrées`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
  - `05.6 Gestion des indisponibilités / absences`
  - objectif métier : `empêcher l’affectation d’une personne indisponible`
  - dépendances : `planning`, `autoschedule`, `matching`

## Preuves de correction dans le code réel

### 1. Affectation manuelle publiée

`lib/services/planning/assign-shift.ts`
- ajout d’un contrôle `UserAbsence` avant validation des conflits de chevauchement ;
- retour bloquant `USER_ABSENCE_CONFLICT` si un utilisateur assigné est absent sur le créneau.

### 2. Affectation manuelle brouillon

`lib/services/planning/assign-draftshift.ts`
- ajout du même contrôle bloquant sur `DraftShift`.

### 3. Matching autoschedule

`lib/services/planning/matching.service.ts`
- exclusion des utilisateurs absents de la liste des candidats `requiredRole` ;
- revalidation au moment de l’`apply` pour éviter l’affectation si une absence a été créée après la preview.

### 4. Publication d’un run

`app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- ajout d’un contrôle bloquant avant publication si un `DraftShift` déjà assigné contient un utilisateur absent sur le créneau.

### 5. Typage partagé

- `lib/services/planning/user-absence.ts` : helper dédié planning/absences
- `lib/types/planning.ts` : ajout du code `USER_ABSENCE_CONFLICT`
- `app/api/planning/shifts/[id]/assign/route.ts` : mapping API 409 pour `USER_ABSENCE_CONFLICT`

## Validations terminales réellement retenues

- `git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A3\2-CLOTURE\SESSION-20260319-25_A3_CLOTURE-A3\PATCH__SESSION-20260319-25_A3_CLOTURE-A3.diff"` → OK
- `git apply ".\docs\3-patches\1-ALPHA\BLOC_A3\2-CLOTURE\SESSION-20260319-25_A3_CLOTURE-A3\PATCH__SESSION-20260319-25_A3_CLOTURE-A3.diff"` → OK
- `npm run lint` → OK
- `npm run build` → OK

## Conséquence probante retenue

Le résiduel officiel prouvé de `USERS-16` est corrigé, le patch principal est appliqué réellement, et les validations terminales disponibles transmises pour cette clôture sont positives.
