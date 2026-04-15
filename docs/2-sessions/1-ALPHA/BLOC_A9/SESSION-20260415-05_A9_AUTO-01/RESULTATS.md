# RESULTATS

## 1. Analyse rapide

L’autoschedule existant est **partiellement exploitable**.

Le bloc A9 dispose déjà d’un noyau réel :
- génération `JOUR` ;
- génération `SEMAINE` ;
- lancement depuis `/planning` ;
- runs autoschedule persistés ;
- publication / annulation ;
- preview / apply de matching ;
- audit minimal du run ;
- prise en compte prouvée des templates actifs, des absences utilisateur et du repos minimum sur certains chemins.

Le bloc reste toutefois **partiel** au regard du cadrage officiel :
- l’option « avec affectation automatique employés + véhicules » n’est pas livrée complètement ;
- l’auto-affectation réellement prouvée porte surtout sur les utilisateurs ;
- l’indisponibilité véhicule n’est pas traitée comme moteur complet de disponibilité ;
- les contraintes de rôles sur véhicules ne sont pas démontrées ;
- les signalements et libellés restent partiellement techniques et partiellement anglophones.

## 2. Périmètre réellement contrôlé

### Documentation
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

### Code
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `lib/services/planning/autoschedule-match.ts`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`
- `lib/services/planning/user-absence.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/company-rules/runtime.ts`
- `lib/company-rules/catalog.ts`
- `lib/types/planning.ts`
- `prisma/schema.prisma`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`

### Documentation de session contrôlée
- `docs/2-sessions/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01/*`
- `docs/3-patches/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01/*`

## 3. État réel de l’autoschedule existant

### Verdicts obligatoires
- génération JOUR : **OUI**
- génération SEMAINE : **OUI**
- lancement depuis le planning : **OUI**
- choix shifts seuls / avec affectation automatique : **PARTIEL**
- templates actifs pris en compte : **OUI**
- indisponibilités utilisateurs prises en compte : **PARTIEL**
- indisponibilités véhicules prises en compte : **PARTIEL**
- contraintes de rôles sur véhicules : **NON PROUVÉ**
- repos minimum : **OUI**
- signalements métier compréhensibles : **PARTIEL**
- traduction française existante : **PARTIEL**
- cohérence multi-tenant / permissions : **OUI**
- autoschedule existant cohérent avec l’ALPHA : **PARTIEL**

### Justification synthétique des verdicts

#### Génération JOUR / SEMAINE
Les routes DAY et WEEK existent réellement, génèrent des runs `DRAFT` et créent des `DraftShift` à partir des templates actifs avec horaires définis.

#### Lancement depuis le planning
La surface `/planning` expose des boutons réels et pilotés par `canAutoSchedule`, avec autorité API côté serveur.

#### Choix shifts seuls / avec affectation automatique
Le produit permet bien un brouillon sans affectation puis une simulation / application d’auto-assign. En revanche, cette auto-assign ne couvre pas les véhicules et ne correspond donc que partiellement au cadrage 11.4.

#### Templates actifs
Les routes DAY / WEEK filtrent explicitement `isActive: true`, `archivedAt: null`, `isTimeDefined: true`.

#### Indisponibilités utilisateurs
Elles sont bien branchées dans `matching.service.ts` et recontrôlées au publish. Le verdict reste `PARTIEL` car la génération de brouillon elle-même n’intègre pas cette contrainte en amont ; elle intervient sur l’affectation et la publication.

#### Indisponibilités véhicules
La couverture prouvée se limite au conflit de chevauchement véhicule avec des shifts existants, notamment au publish. Aucune logique moteur complète de disponibilité / statut véhicule n’a été prouvée dans l’autoschedule lui-même.

#### Contraintes de rôles sur véhicules
Aucune règle moteur autoschedule dédiée n’a été trouvée. Le catalogue société les décrit encore comme `PREPARED`.

#### Repos minimum
Le repos minimum est réellement branché au publish via la règle société `PLANNING_MIN_REST_HOURS`, avec `warnings` et blocage conditionnel en mode `BLOCK` / `BOTH`.

#### Signalements métier
Ils existent, mais restent hétérogènes : bons codes métier côté API, score qualité et historique du run, mais exposition directe de codes techniques et d’états bruts côté UI.

#### Traduction française
La surface visible est majoritairement en français, mais plusieurs éléments restent en anglais ou techniquement bruts, ce qui empêche de conclure à une traduction intégrale cohérente.

#### Multi-tenant / permissions
Le multi-tenant est réellement présent par `companyId` sur les requêtes clés, et les permissions distinctes `PLANNING_AUTOSCHEDULE`, `PLANNING_AUTOSCHEDULE_PUBLISH`, `PLANNING_AUTOSCHEDULE_CANCEL`, `AUDIT_VIEW` sont effectivement utilisées.

## 4. Résiduel strictement prouvé

### Résiduel 1 — mode « avec affectation automatique employés + véhicules » non complètement livré
Preuve :
- `match/preview` et `match/apply` existent ;
- `matching.service.ts` ne planifie que des `proposedUserId` ;
- aucun champ véhicule n’apparaît dans `MatchingPlanItem` / `MatchingApplyItem`.

### Résiduel 2 — indisponibilité véhicule non branchée comme moteur complet
Preuve :
- conflit véhicule prouvé au publish ;
- aucune logique prouvée sur `Vehicle.status`, maintenance, indisponibilité véhicule dédiée ou auto-affectation véhicule dans les routes/services autoschedule contrôlés.

### Résiduel 3 — restrictions rôles / véhicules non démontrées
Preuve :
- recherche dans les routes autoschedule et services matching sans implémentation dédiée ;
- `lib/company-rules/catalog.ts` marque `VEHICLE_ROLE_RESTRICTIONS` en `PREPARED`.

### Résiduel 4 — signalements et libellés encore partiellement techniques
Preuve :
- messages UI avec `MATCHED`, `NO_REQUIRED_ROLE`, `USER_CONFLICT`, `run.status=...` ;
- résumés d’audit en anglais (`Autoschedule run published`, `Autoschedule matching applied`, etc.).

## 5. Session suivante attendue selon verdict d’audit

### Verdict
**`AUTO-LOT-02-14 — CORRECTION-COMPLÉTION` est nécessaire.**

### Motif
Les écarts prouvés portent précisément sur le lot de correction/complétion attendu par le plan :
- finaliser le choix produit entre shifts seuls et mode réellement auto-affecté ;
- compléter la couverture véhicule ;
- statuer / brancher les contraintes rôles-véhicules ;
- améliorer les signalements métier ;
- achever la cohérence de traduction française.

## 6. Documents modifiés

### Session
- `docs/2-sessions/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01/FIN_SESSION.md`

### Patch / miroir documentaire
- `docs/3-patches/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01/NO_PATCH.md`
- `docs/3-patches/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01/README_PATCH.md`

## 7. Validations réellement exécutées

- relecture des documents maîtres requis : **OUI**
- inspection du code réel autoschedule : **OUI**
- vérification du dossier de session courant : **OUI**
- mise à jour des documents de session : **OUI**
- génération du ZIP documentaire final : **OUI**
- `git apply --check` : **NON EXÉCUTÉE**
- `git apply` : **NON EXÉCUTÉE**
- `npx prisma validate` : **NON EXÉCUTÉE**
- `npx prisma generate` : **NON EXÉCUTÉE**
- `npm run lint` : **NON EXÉCUTÉE**
- `npm run build` : **NON EXÉCUTÉE**

## 8. Décision patch

**`NO_PATCH`**

Motif :
- session de type `AUDIT` ;
- aucune correction de code autorisée dans `AUTO-01` ;
- livrable attendu : documentation d’audit exploitable pour `AUTO-LOT-02-14`.
