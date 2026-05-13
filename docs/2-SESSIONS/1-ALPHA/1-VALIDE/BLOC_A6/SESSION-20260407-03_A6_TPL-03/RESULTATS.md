# RESULTATS

## Résultat principal
**PATCH MINIMAL LÉGITIME — DURCISSEMENT MULTI-TENANT DES RELATIONS `ShiftTemplate` -> `DraftShift` / `Shift`**

## 1. Analyse rapide
`TPL-02` n’avait laissé ni champ absent ni nullabilité incohérente sur `ShiftTemplate`.
Le défaut réellement resté ouvert est relationnel : les liens `DraftShift.templateId` et `Shift.templateId` vers `ShiftTemplate.id` n’imposaient pas l’appartenance à la même société, alors que les trois modèles portent `companyId` et que le projet impose un multi-tenant strict.

## 2. Périmètre réellement contrôlé
Contrôlé dans le ZIP :
- `prisma/schema.prisma`
- `prisma/migrations/20260226173545_add_shift_templates/migration.sql`
- `prisma/migrations/20260226181203_autoschedule_planning_v4_1_1/migration.sql`
- `prisma/migrations/20260226193652_add_shift_model/migration.sql`
- `prisma/seed.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/matching.service.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/shifts/route.ts`
- documents maîtres et documents méthodologiques requis

## 3. Défaut de schéma prouvé
### Défaut retenu
**Incohérence relationnelle multi-tenant non verrouillée côté base**.

### Preuve exacte
- `ShiftTemplate`, `DraftShift` et `Shift` portent tous un `companyId` ;
- pourtant `DraftShift.templateId` et `Shift.templateId` ne référencent que `ShiftTemplate.id` ;
- les migrations historiques matérialisent cette clé étrangère simple ;
- le runtime crée et lit pourtant ces objets dans un cadre société strict.

### Interprétation
Le dépôt permet donc théoriquement une référence inter-sociétés sur `templateId`, ce qui est incompatible avec la règle projet de cloisonnement strict via `companyId`.

## 4. Correction minimale appliquée
### Patch principal
- `PATCH__SESSION-20260407-03_A6_TPL-03.diff`

### Contenu exact
Ajout d’une migration SQL :
- `prisma/migrations/20260407093000_tpl03_enforce_template_company_integrity/migration.sql`

Cette migration :
1. remet `templateId = NULL` sur les éventuels `DraftShift` / `Shift` déjà incohérents ;
2. interdit qu’un `DraftShift` référence un template d’une autre société ;
3. interdit qu’un `Shift` référence un template d’une autre société ;
4. interdit le changement de société d’un template déjà rattaché.

### Ce qui n’a pas été touché
- aucun champ métier template ;
- aucune API templates ;
- aucune UI templates ;
- aucune permission `TEMPLATES_MANAGE` ;
- aucune logique `TPL-04+`.

## 5. Fichiers modifiés
### Code / migration
- `prisma/migrations/20260407093000_tpl03_enforce_template_company_integrity/migration.sql`

### Documentation de session
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03/FIN_SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03/README_PATCH.md`

## 6. Validations réellement exécutées / constatées
### Réellement exécuté / constaté
- lecture des sources autorisées : OK
- contrôle statique schéma / migrations / seed / usages : OK
- génération du patch principal : OK
- `git apply --check` du patch principal : OK
- `git apply` du patch principal : OK
- `npx prisma validate` : OK
- `npm run lint` : OK
- `npm run build` : OK
- génération du patch documentaire final : OK
- patch documentaire final : fourni

### Non exécuté / non prouvé dans le contexte validé
- `npx prisma generate`
- contrôle d’applicabilité local du patch documentaire final

## 7. Verdict de session
**CONFORME APRÈS CORRECTION MINIMALE**

Interprétation exacte :
- `TPL-02` reste valide sur la cohérence générale des champs template ;
- `TPL-03` corrige un résiduel relationnel réel et strictement prouvé ;
- aucun élargissement hors périmètre n’a été introduit.

## 8. Génération des docs de session
Docs finalisés pour la session :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`

## 9. `README_PATCH.md`
`README_PATCH.md` généré pour formaliser :
- le patch principal de correction modèle ;
- le patch documentaire final séparé ;
- les commandes d’application ;
- la portée exacte du correctif.
