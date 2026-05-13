# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

### Documentation maître et protocole
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Audit de départ repris comme base de correction
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/FIN_SESSION.md`

### Code contrôlé / modifié
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`

### Code relu sans modification
- `lib/templates/template-rules.ts`
- `prisma/schema.prisma`
- `lib/services/planning/planning-audit.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/company-rules/runtime.ts`
- `lib/types/planning.ts`

---

## Preuves directes retenues

### Preuve A — Variantes simples réellement ajoutées
Dans `lib/services/planning/matching.service.ts` :
- ajout de `MatchingVariantKey` ;
- ajout de `MatchingVariantDefinition` ;
- ajout de `MATCHING_VARIANTS` ;
- tri différencié des shifts et des candidats selon la variante ;
- propagation de `variant` dans `computeDraftShiftMatchingByRole(...)` et `autoMatchRunDraftShifts(...)`.

### Preuve B — Preview varianté
Dans `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts` :
- body `variant` optionnel ;
- appel `computeDraftShiftMatchingByRole(..., { includeAlreadyAssigned, variant })` ;
- réponse enrichie avec `variant` et `quality`.

### Preuve C — Apply varianté
Dans `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts` :
- body `variant` optionnel ;
- appel `autoMatchRunDraftShifts(..., { variant })` ;
- audit enrichi avec la variante appliquée.

### Preuve D — Score qualité par shift réellement calculé
Dans `lib/services/planning/matching-quality.ts` :
- nouveau type `ShiftPlanningQuality` ;
- calcul `computeShiftPlanningQuality(plan)` ;
- retour `shiftScores` dans `computePlanningQuality(...)`.

### Preuve E — Score matching du run réellement exposé et variante run réalignée
Dans `app/api/planning/autoschedule/runs/[id]/route.ts` :
- recalcul local du plan de matching sur le run ;
- calcul `computePlanningQuality(plan)` ;
- réponse enrichie avec `matching: { variant, quality }` ;
- résolution de `variant` depuis la dernière variante appliquée prouvable dans l’audit existant, avec fallback strict `VARIANT_1`.

### Preuve F — Visibilité UI réelle au niveau run et shift
Dans `app/planning/planning-client.tsx` :
- sélecteur de variante ;
- affichage `Score matching du run` ;
- affichage `Score qualité planning` avec variante ;
- colonne `Score shift` dans le tableau détaillé ;
- libellé `VARIANT_2` réaligné avec le comportement réel d’ordre stable par identifiant ;
- verrou applicatif empêchant l’apply si la variante simulée n’est pas celle sélectionnée.

### Preuve G — Aucune migration Prisma réellement nécessaire
`prisma/schema.prisma` a été relu.

Aucune modification du schéma n’a été nécessaire pour livrer :
- les variantes simples ;
- le score par shift ;
- le score visible au niveau run par recalcul à la lecture.

### Preuve H — Patch principal et correctif minimal applicables
Validations terminales réelles prouvées :
- `git apply --check` : OK
- `git apply` : OK

### Preuve I — Validations terminales finales prouvées en OK
Validations terminales réelles prouvées pour l’état final patch principal + `FIX-01` :
- `npx prisma generate` : OK
- `npx prisma validate` : OK
- `npm run lint` : OK
- `npm run build` : OK
