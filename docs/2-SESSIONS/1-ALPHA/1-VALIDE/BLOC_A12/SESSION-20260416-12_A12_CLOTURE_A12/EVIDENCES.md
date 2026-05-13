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
- `docs/2-sessions/1-ALPHA/BLOC_A12/SESSION-20260416-11_A12_A12-16/*`
- `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-09_A12_A12-01/*`
- `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-10_A12_A12-LOT-02-15/*`
- `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-11_A12_A12-16/*`

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
- `app/api/imports/route.ts`
- `lib/imports/csv.ts`
- `lib/imports/xlsx.ts`
- `lib/imports/import-engine.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/api/planning/exports/route.ts`
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
- `15.4` : politique de conservation des exports générés = sujet `À CONFIRMER`, dépendant des exports / audit / documentation, non prioritaire en ALPHA ;
- `16.1` : une société doit pouvoir se mettre en place sans import obligatoire grâce à une saisie manuelle complète ;
- `16.2` : import initial des utilisateurs, véhicules, templates, bases / dépôts, indisponibilités utilisateurs ;
- `16.3` : formats `CSV` et `Excel .xlsx` uniquement ;
- `16.4` : aperçu avant import, validation manuelle, rapport d’erreurs, ajout obligatoire ;
- `16.5` : import initial uniquement en ALPHA, sans synchronisation continue.

### Plan de développement
Dans `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` :
- `A12-01 — AUDIT`
- `A12-LOT-02-15 — CORRECTION-COMPLÉTION`
- `A12-16 — VALIDATION`
- `CLOTURE_A12 — VALIDATION+CORRECTION+COMPLÉTION`

---

## Base historique revérifiée

### 1. `A12-01`
État initial documenté et confirmé comme cohérent :
- onboarding manuel : `PARTIEL`
- imports initiaux : `NON`
- exports / impression : `NON`
- permission `PLANNING_EXPORT` non branchée à une fonctionnalité réelle

### 2. `A12-LOT-02-15`
Lot de complétion documenté et confirmé dans le code réel :
- entrée onboarding depuis le dashboard ;
- page `/onboarding` ;
- import initial simple sur 5 domaines ;
- formats `CSV` et `XLSX` ;
- aperçu avant import ;
- validation manuelle d’import ;
- rapport d’erreurs ;
- logique `add-only` ;
- export planning `PDF` / `XLSX` / `CSV` ;
- impression simple ;
- branchement réel de `PLANNING_EXPORT`.

### 3. `A12-16`
Validation avant clôture cohérente avec le dépôt :
- aucun résiduel code A12 strictement prouvé ;
- maintien du constat d’environnement sur `lint/build` dans l’archive fournie ;
- bloc A12 validable avant clôture.

---

## Preuves code retenues

### Axe 1 — Onboarding manuel complet société pilote
1. `app/dashboard/page.tsx`
   - expose une entrée réelle `Onboarding société pilote` ;
   - description explicite du parcours manuel guidé et des imports initiaux simples.

2. `app/onboarding/page.tsx`
   - page dédiée `/onboarding` ;
   - charge la société courante et des compteurs réels pour `depots`, `users`, `vehicles`, `templates`, `userAbsence` ;
   - transmet les liens réels vers les modules.

3. `app/onboarding/onboarding-client.tsx`
   - expose un parcours manuel recommandé en 6 étapes ;
   - indique explicitement qu’une société pilote peut être configurée sans import ;
   - relie l’utilisateur aux modules société, dépôts, utilisateurs, véhicules, templates et absences.

4. Modules exploités manuellement
   - profil société : `app/company/page.tsx`, `app/company/company-profile-form.tsx`, `app/api/company/profile/route.ts`
   - dépôts : `app/depots/depots-client.tsx`, routes API `POST` / `PATCH` / archivage
   - utilisateurs : création, édition, archivage, dépôt, reset mot de passe
   - absences utilisateurs : `GET` / `POST` / `PATCH` / `DELETE`
   - véhicules : création, édition, dépôt, archivage logique
   - templates : `GET` / `POST` / `PATCH` / archivage logique

Conclusion axe 1 :
- une société pilote peut réellement s’installer sans import obligatoire ;
- l’onboarding manuel n’est pas seulement “possible”, il est guidé depuis l’UI réelle.

### Axe 2 — Import initial simple ALPHA
1. `app/api/imports/route.ts`
   - preview via `multipart/form-data` ;
   - commit via JSON ;
   - domaines supportés = `users`, `vehicles`, `templates`, `depots`, `user-absences`.

2. `lib/imports/import-engine.ts`
   - `IMPORT_DOMAINS = ["users", "vehicles", "templates", "depots", "user-absences"]`
   - `MAX_IMPORT_ROWS = 500`
   - détection de doublons internes et existants ;
   - erreurs explicites ;
   - logique “ajout uniquement”.

3. `lib/imports/csv.ts`
   - parsing CSV réel ;
   - détection de séparateur ;
   - génération CSV réelle.

4. `lib/imports/xlsx.ts`
   - lecture XLSX réelle ;
   - génération XLSX réelle.

5. `app/onboarding/onboarding-client.tsx`
   - `accept=".csv,.xlsx"`
   - bouton `Aperçu avant import`
   - bouton `Valider l’import` seulement après preview
   - restitution d’erreurs et d’aperçus.

Conclusion axe 2 :
- l’import initial simple ALPHA est réellement exploitable ;
- aucune synchronisation continue ni import destructeur n’est présent ;
- aucune mise à jour automatique ambitieuse d’existants n’est prouvée ; la logique réelle est `add-only` avec erreurs explicites.

### Axe 3 — Exports planning + impression simple
1. `app/planning/page.tsx`
   - calcule `canExportPlanning(...)` ;
   - transmet le droit réel au client planning.

2. `app/planning/manual-planning-panel.tsx`
   - boutons `Export PDF`, `Export XLSX`, `Export CSV` affichés seulement si `canExportPlanning` ;
   - bouton `Imprimer` réellement branché sur `window.print()` ;
   - export déclenché sur le scope réellement consulté.

3. `app/api/planning/exports/route.ts`
   - recontrôle `canViewSelfPlanning` / `canViewGlobalPlanning` ;
   - recontrôle `canExportPlanning` ;
   - refuse les scopes incohérents ;
   - renvoie un vrai fichier avec `Content-Type`, `Content-Disposition`, `Cache-Control: no-store`.

4. `lib/planning/export.ts`
   - `listPlanningExportRows()` extrait les shifts réels ;
   - `buildPlanningCsvBuffer()` génère un buffer CSV ;
   - `buildPlanningXlsxBuffer()` génère un buffer XLSX ;
   - `buildPlanningPdfBuffer()` génère un buffer PDF.

5. Permission réelle
   - `lib/permission-catalog.ts` : `PLANNING_EXPORT`
   - `lib/permissions.ts` : helper `canExportPlanning()`
   - consommation réelle côté UI et côté API.

Conclusion axe 3 :
- il ne s’agit pas d’un faux export ;
- le chaînage UI → permission → API → génération fichier est réel ;
- l’impression simple est réelle.

### Axe 4 — Conservation des exports (`15.4`)
Constats :
- aucun modèle `Export*` dans `prisma/schema.prisma` ;
- aucun stockage d’exports générés dans le code ;
- aucun mécanisme de purge / rétention ;
- la route d’export répond en téléchargement à la demande avec `Cache-Control: no-store`.

Conclusion axe 4 :
- la conservation des exports n’est pas implémentée comme une fonctionnalité autonome ;
- l’absence de conservation serveur n’est pas bloquante pour A12 ALPHA car :
  - le cadrage la laisse ouverte et non prioritaire ;
  - le code actuel ne met pas en place d’historique d’exports à gérer.

---

## Validations terminales réellement constatées

### Validations positives antérieures retenues comme dernières preuves du lot
Dans `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-10_A12_A12-LOT-02-15/README_PATCH.md` :
- `git apply --check` : `OK`
- `git apply` : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`

### Relances exécutées dans la présente clôture
- `npm run lint` : `KO` — `sh: 1: eslint: not found`
- `npm run build` : `KO` — `sh: 1: next: not found`

Interprétation retenue :
- la présente clôture ne revendique donc pas une nouvelle validation applicative `OK` ;
- elle documente un constat d’environnement d’archive ;
- aucun écart fonctionnel A12 nouveau n’a été prouvé par ailleurs.
