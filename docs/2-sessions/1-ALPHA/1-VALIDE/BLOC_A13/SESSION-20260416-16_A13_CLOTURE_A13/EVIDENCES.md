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
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`

### Sessions / patchs A13 revérifiés
- `docs/2-sessions/1-ALPHA/BLOC_A13/SESSION-20260416-13_A13_A13-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A13/SESSION-20260416-14_A13_A13-LOT-02-13/*`
- `docs/2-sessions/1-ALPHA/BLOC_A13/SESSION-20260416-15_A13_A13-14/*`
- `docs/3-patches/1-ALPHA/BLOC_A13/SESSION-20260416-13_A13_A13-01/NO_PATCH.md`
- `docs/3-patches/1-ALPHA/BLOC_A13/SESSION-20260416-13_A13_A13-01/README_PATCH.md`
- `docs/3-patches/1-ALPHA/BLOC_A13/SESSION-20260416-14_A13_A13-LOT-02-13/PATCH__SESSION-20260416-14_A13_A13-LOT-02-13.diff`
- `docs/3-patches/1-ALPHA/BLOC_A13/SESSION-20260416-14_A13_A13-LOT-02-13/PATCH__SESSION-20260416-14_A13_A13-LOT-02-13_FIX-01.diff`
- `docs/3-patches/1-ALPHA/BLOC_A13/SESSION-20260416-14_A13_A13-LOT-02-13/README_PATCH.md`
- `docs/3-patches/1-ALPHA/BLOC_A13/SESSION-20260416-15_A13_A13-14/NO_PATCH.md`
- `docs/3-patches/1-ALPHA/BLOC_A13/SESSION-20260416-15_A13_A13-14/README_PATCH.md`

### Documentation produit / qualité contrôlée
- `README.md`
- `docs/README.md`
- `docs/USAGE_USERS.md`
- `docs/USAGE_VEHICLES.md`
- `docs/USAGE_TEMPLATES.md`
- `docs/USAGE_PLANNING_AUTOSCHEDULE.md`
- `docs/SCENARIOS_MANUELS_ALPHA.md`
- `docs/QUALITY_TESTS.md`

### Code / scripts réellement contrôlés
- `package.json`
- `package-lock.json`
- `app/users/*`
- `app/vehicles/*`
- `app/templates/*`
- `app/planning/*`
- `app/api/users/*`
- `app/api/vehicles/*`
- `app/api/templates/*`
- `app/api/planning/*`
- `lib/*`
- `scripts/quality/*`

---

## Preuves factuelles retenues

### Chaîne A13 cohérente et exploitable
#### 1. `A13-01`
Constat de départ revérifié et conservé comme cohérent :
- `TESTS EXISTANTS RÉELS : INCOMPLET`
- `SCÉNARIOS MANUELS DOCUMENTÉS EXISTANTS : INCOMPLET`
- `DOCUMENTATION PRODUIT EXISTANTE : NON CONFORME`
- `COHÉRENCE FINALE ALPHA À CE STADE : INCOMPLET`

#### 2. `A13-LOT-02-13`
Livrables réellement présents dans le dépôt courant :
- `docs/USAGE_USERS.md`
- `docs/USAGE_VEHICLES.md`
- `docs/USAGE_TEMPLATES.md`
- `docs/USAGE_PLANNING_AUTOSCHEDULE.md`
- `docs/SCENARIOS_MANUELS_ALPHA.md`
- `docs/QUALITY_TESTS.md`
- `scripts/quality/smoke-api-critical-contracts.test.mjs`
- `scripts/quality/targeted-sensitive-blocks.test.mjs`
- correctif final minimal réellement matérialisé par `PATCH__SESSION-20260416-14_A13_A13-LOT-02-13_FIX-01.diff`

#### 3. `A13-14`
Validation revérifiée et cohérente :
- relance réelle des deux suites qualité `OK` ;
- `lint/build` non rejouables localement dans l’archive fournie ;
- verdict maintenu sur le périmètre réellement prouvé ;
- `DÉCISION GO / NO-GO SOCIÉTÉ PILOTE : GO` exprimée au niveau ALPHA, sans sur-promesse au-delà.

### Présence réelle des éléments documentaires de module 20
#### `20.1` et `20.2`
Présences confirmées :
- documentation de pilotage : `docs/1-master/*`, `docs/PROTOCOLE_SESSION.md`, `docs/SOURCES_AUTORISEES.md`, `docs/STRUCTURE_DOCS.md`
- documentation d’usage produit : `docs/USAGE_USERS.md`, `docs/USAGE_VEHICLES.md`, `docs/USAGE_TEMPLATES.md`, `docs/USAGE_PLANNING_AUTOSCHEDULE.md`

#### `20.3` — fichiers protégés existants confirmés dans le ZIP courant
Présents dans la structure réelle :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/4-templates/TEMPLATE_DOD_4_4.md`
- `docs/4-templates/TEMPLATE_RECAP_SESSION.md`

#### `20.4` — fichiers à protéger s’ils existent ou sont créés
Absents du ZIP courant :
- `docs/1-master/README_PROJET.md`
- `docs/1-master/CHANGELOG.md`

Qualification retenue : `À CONFIRMER` s’ils sont créés ultérieurement.

#### `20.5` — règle sur les sessions
Règle confirmée dans le cadrage et le protocole :
- sessions en cours : modifiables avec souplesse ;
- sessions clôturées / validées : protégées.

### Preuves qualité réellement rejouées dans la présente clôture
- `npm run test:smoke` → `OK`
  - détail : `6 tests`, `0 fail`
- `npm run test:targeted` → `OK`
  - détail : `5 tests`, `0 fail`
  - warnings non bloquants :
    - `ExperimentalWarning: Type Stripping is an experimental feature`
    - `MODULE_TYPELESS_PACKAGE_JSON`
- `npm run lint` → `KO ENVIRONNEMENT`
  - sortie : `sh: 1: eslint: not found`
- `npm run build` → `KO ENVIRONNEMENT`
  - sortie : `sh: 1: next: not found`

### Preuves positives antérieures retenues comme dernières validations vertes du bloc
Depuis `SESSION-20260416-14_A13_A13-LOT-02-13` :
- `git apply --check <FIX-01.diff>` → `OK`
- `git apply <FIX-01.diff>` → `OK`
- `npm run test:smoke` → `OK`
- `npm run test:targeted` → `OK`
- `npm run lint` → `OK`
- `npm run build` → `OK`
- `npx prisma validate` → `NON EXÉCUTÉ` (`aucune modification Prisma dans ce fix`)
- `npx prisma generate` → `NON EXÉCUTÉ` (`aucune modification Prisma dans ce fix`)

### Prisma dans la présente clôture
- `npx prisma validate` → `NON EXÉCUTÉ`
- `npx prisma generate` → `NON EXÉCUTÉ`

Justification retenue :
- aucun patch code produit ;
- aucune modification Prisma dans cette session.

### Décision patch
- aucun résiduel code A13 strictement prouvé n’impose un correctif final minimal unique ;
- la présente clôture reste donc en `NO_PATCH`.
