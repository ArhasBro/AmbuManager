# EVIDENCES

## Sources utilisées

### Documentation maître / protocole
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

### Sessions / patchs A12 revérifiés
- `docs/2-sessions/1-ALPHA/BLOC_A12/SESSION-20260416-09_A12_A12-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A12/SESSION-20260416-10_A12_A12-LOT-02-15/*`
- `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-09_A12_A12-01/NO_PATCH.md`
- `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-09_A12_A12-01/README_PATCH.md`
- `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-10_A12_A12-LOT-02-15/PATCH__SESSION-20260416-10_A12_A12-LOT-02-15.diff`
- `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-10_A12_A12-LOT-02-15/PATCH__SESSION-20260416-10_A12_A12-LOT-02-15_FIX-01.diff`
- `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-10_A12_A12-LOT-02-15/PATCH__SESSION-20260416-10_A12_A12-LOT-02-15_FIX-02.diff`
- `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-10_A12_A12-LOT-02-15/README_PATCH.md`

### Code réel contrôlé
- `app/dashboard/page.tsx`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/company/company-rules-panel.tsx`
- `app/api/company/profile/route.ts`
- `app/depots/page.tsx`
- `app/depots/depots-client.tsx`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `app/users/page.tsx`
- `app/users/*`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/[id]/archive/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/users/[id]/absences/route.ts`
- `app/api/users/[id]/absences/[absenceId]/route.ts`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/[id]/archive/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `app/templates/page.tsx`
- `app/templates/templates-client.tsx`
- `app/api/templates/route.ts`
- `app/api/templates/[id]/route.ts`
- `app/api/templates/[id]/archive/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/exports/route.ts`
- `app/api/imports/route.ts`
- `lib/imports/csv.ts`
- `lib/imports/xlsx.ts`
- `lib/imports/import-engine.ts`
- `lib/planning/export.ts`
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `lib/auth.ts`
- `prisma/schema.prisma`
- `prisma/seed.ts`

---

## Extraits documentaires retenus

### Cadrage produit A12
Dans `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` :
- `15.1` : export PDF planning ;
- `15.2` : export Excel / CSV planning ;
- `15.3` : impression simple planning ;
- `15.4` : politique de conservation des exports générés = sujet `à confirmer` ;
- `16.1` : onboarding autonome société pilote sans import obligatoire ;
- `16.2` : import initial des utilisateurs, véhicules, templates, bases/dépôts, indisponibilités ;
- `16.3` : formats `CSV` et `Excel .xlsx` uniquement ;
- `16.4` : aperçu avant import, validation manuelle, rapport d’erreurs, ajout obligatoire ;
- `16.5` : import initial uniquement en ALPHA, sans synchronisation continue.

### Base documentaire A12 déjà validée
Dans `A12-01` et `A12-LOT-02-15` :
- `A12-01` établit un point de départ partiel sans imports / exports / impression ;
- `A12-LOT-02-15` documente le lot livré et validé côté contrôle avec patch principal + `FIX-01` + `FIX-02`.

---

## Preuves code retenues

### Axe 1 — Onboarding manuel sans import
1. `app/dashboard/page.tsx`
   - entrée dédiée `Onboarding société pilote` ;
   - affichée uniquement quand la session est rattachée à une société et que le profil peut réellement administrer le parcours.

2. `app/onboarding/page.tsx`
   - page dédiée `/onboarding` ;
   - chargement réel du profil société et des compteurs utiles (`depots`, `users`, `vehicles`, `templates`, `userAbsence`) ;
   - transmission d’une checklist réelle à l’UI.

3. `app/onboarding/onboarding-client.tsx`
   - parcours manuel recommandé en 6 étapes ;
   - guidage réel vers : société, dépôts, utilisateurs, véhicules, templates, absences ;
   - mention explicite qu’une société pilote peut être configurée sans import.

4. Profil société exploitable
   - `app/company/page.tsx`
   - `app/company/company-profile-form.tsx`
   - `app/api/company/profile/route.ts`
   - champs gérés : nom société, gérants, adresse, téléphone, SIRET.

5. Dépôts exploitables
   - `app/depots/depots-client.tsx` branche création, édition, archivage ;
   - `app/api/depots/route.ts`, `app/api/depots/[id]/route.ts`, `app/api/depots/[id]/archive/route.ts`.

6. Utilisateurs exploitables
   - `app/users/page.tsx` monte création, liste, édition, archivage, affectation dépôt, reset mot de passe, absences ;
   - routes API dédiées présentes et branchées.

7. Véhicules exploitables
   - `app/vehicles/vehicles-client.tsx` branche création, édition, affectation dépôt, archivage logique ;
   - routes API dédiées présentes et branchées.

8. Templates exploitables
   - `app/templates/templates-client.tsx` branche création, édition, archivage logique ;
   - routes API dédiées présentes et branchées.

Conclusion axe 1 : le parcours manuel est désormais guidé, explicite et exploitable sans import obligatoire.

### Axe 2 — Import initial simple ALPHA
1. `app/api/imports/route.ts`
   - preview via `multipart/form-data` ;
   - commit via JSON `{ action: "commit" }` ;
   - domaines supportés = `users`, `vehicles`, `templates`, `depots`, `user-absences`.

2. `lib/imports/import-engine.ts`
   - support réel des 5 domaines ;
   - preview distinct du commit ;
   - `MAX_IMPORT_ROWS = 500` ;
   - notes de preview expliquant la logique ALPHA simple ;
   - détection des doublons internes et existants ;
   - erreurs explicites sur doublons / dépôt introuvable / utilisateur introuvable / chevauchement / invalidité des champs ;
   - logique `ajout uniquement` ;
   - aucune synchronisation continue ;
   - aucun import destructeur.

3. Formats réels
   - `lib/imports/csv.ts` : parsing CSV + génération CSV ;
   - `lib/imports/xlsx.ts` : lecture XLSX + génération XLSX ;
   - `app/onboarding/onboarding-client.tsx` : `accept=".csv,.xlsx"`.

4. Preview / validation manuelle / rapport d’erreurs
   - `app/onboarding/onboarding-client.tsx` : bouton `Aperçu avant import` ;
   - `app/onboarding/onboarding-client.tsx` : bouton `Valider l’import` seulement après preview ;
   - `PreviewData` et `CommitData` exposent volumes, erreurs et aperçus ;
   - `commitImport()` ne part que sur les lignes validées après preview.

5. Add-only explicite
   - messages présents dans `import-engine.ts` :
     - `Import ALPHA en ajout uniquement.`
     - `Dépôt déjà existant. Import en ajout uniquement.`
     - `Utilisateur déjà existant. Import en ajout uniquement.`
     - `Véhicule déjà existant. Import en ajout uniquement.`
     - `Template déjà existant. Import en ajout uniquement.`

Conclusion axe 2 : l’import initial simple ALPHA est réellement présent et cohérent avec le cadrage produit.

### Axe 3 — Exports planning + impression simple
1. `app/planning/page.tsx`
   - calcule `canExportPlanning` via `lib/permissions.ts` ;
   - transmet ce droit au client planning.

2. `app/planning/manual-planning-panel.tsx`
   - boutons `Export PDF`, `Export XLSX`, `Export CSV` rendus uniquement si `canExportPlanning` ;
   - bouton `Imprimer` branché à `window.print()` ;
   - `triggerExport(format)` construit l’URL sur le scope réellement consulté (`day`, `weekStart`, `month`, `userId`).

3. `app/api/planning/exports/route.ts`
   - recontrôle `canViewSelfPlanning` / `canViewGlobalPlanning` ;
   - recontrôle `canExportPlanning` ;
   - refuse les scopes incohérents ;
   - retourne un vrai fichier avec `Content-Type`, `Content-Disposition`, `Cache-Control: no-store`.

4. `lib/planning/export.ts`
   - `listPlanningExportRows()` extrait les shifts réels du planning sur le scope demandé ;
   - `buildPlanningCsvBuffer()` génère un vrai buffer CSV ;
   - `buildPlanningXlsxBuffer()` génère un vrai buffer XLSX ;
   - `buildPlanningPdfBuffer()` génère un vrai buffer PDF.

5. Permission réelle
   - `lib/permission-catalog.ts` : `PLANNING_EXPORT` au catalogue ;
   - `lib/permissions.ts` : helper `canExportPlanning()` ;
   - usage réel côté page planning et côté route API export.

Conclusion axe 3 : il ne s’agit pas d’un faux export documentaire ; le chaînage UI → permission → route → génération fichier est réel.

---

## Validations terminales réellement constatées

### Validations antérieures conservées comme preuves existantes
Dans `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-10_A12_A12-LOT-02-15/README_PATCH.md` :
- `git apply --check` : `OK`
- `git apply` : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`

### Relances exécutées dans la présente session
- `npm run lint` : `KO` — `sh: 1: eslint: not found`
- `npm run build` : `KO` — `sh: 1: next: not found`

Interprétation retenue :
- la présente session ne suraffirme pas une validation terminale nouvelle ;
- elle constate seulement que l’environnement courant d’archive n’embarque pas les exécutables attendus ;
- aucun écart code/document n’a été trouvé sur le bloc A12 revérifié.
