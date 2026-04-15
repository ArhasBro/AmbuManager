# EVIDENCES

## Sources utilisées

### Documentation officielle
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

### Code réellement inspecté
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

### Sessions / patchs réellement recontrôlés
- `docs/2-sessions/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A9/SESSION-20260415-06_A9_AUTO-LOT-02-14/*`
- `docs/3-patches/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01/*`
- `docs/3-patches/1-ALPHA/BLOC_A9/SESSION-20260415-06_A9_AUTO-LOT-02-14/PATCH__SESSION-20260415-06_A9_AUTO-LOT-02-14.diff`
- `docs/3-patches/1-ALPHA/BLOC_A9/SESSION-20260415-06_A9_AUTO-LOT-02-14/PATCH__SESSION-20260415-06_A9_AUTO-LOT-02-14_FIX-01.diff`
- `docs/3-patches/1-ALPHA/BLOC_A9/SESSION-20260415-06_A9_AUTO-LOT-02-14/README_PATCH.md`

## Faits de code déterminants

### 1. Génération JOUR / SEMAINE conservée
`day/route.ts` et `week/route.ts` reçoivent un `assignmentMode` explicite (`SHIFTS_ONLY` / `AUTO_ASSIGN`) et créent réellement des runs brouillon.

### 2. Choix `shifts seuls` / `auto-affectation` réellement branché
Quand `assignmentMode === "AUTO_ASSIGN"`, les routes de génération déclenchent réellement `autoMatchRunDraftShifts(...)` après création du run.

### 3. Surface planning réellement exploitable
`app/planning/planning-client.tsx` expose les libellés français :
- `Générer les shifts seuls`
- `Générer + auto-affecter employés et véhicules`
- `Générer la semaine`
- `Simuler l’auto-affectation`
- `Appliquer l’auto-affectation`
- `Publier le brouillon`
- `Annuler le brouillon`

### 4. Absences utilisateurs réellement prises en compte
`matching.service.ts` charge les absences utilisateur via `user-absence.ts`, filtre les candidats indisponibles, contrôle les chevauchements et réutilise le repos minimum lorsque la règle société existe. `publish/route.ts` revalide aussi les conflits d’absence utilisateur.

### 5. Couverture véhicules réelle mais incomplète
`matching.service.ts` filtre les véhicules sur la société, l’activité, le `status=ACTIVE`, le type requis et les occupations existantes. `publish/route.ts` revalide l’état, le type et la compatibilité rôles / véhicules. En revanche, `prisma/schema.prisma` ne contient aucun modèle dédié d’indisponibilité véhicule déclarative, ce qui maintient ce point à `PARTIEL`.

### 6. Contraintes rôles / véhicules réellement prouvées
La logique de restrictions rôles / véhicules est utilisée dans le matching puis revalidée au publish.

### 7. Multi-tenant / permissions conservés
Les routes autoschedule contrôlées restent bornées par `companyId` côté session et utilisent les permissions réelles du module planning/autoschedule. La lecture des runs et de l’audit reste elle aussi filtrée par accès réel.

### 8. Traduction française encore partielle
`app/planning/planning-client.tsx` affiche encore dans l’historique les valeurs techniques brutes `log.action` et `log.entityType`. La traduction française globale reste donc `PARTIEL` malgré l’amélioration des messages métier.

## Validations terminales réellement exécutées

- `npx prisma validate` : **KO**
  - erreur : `request to https://binaries.prisma.sh/... failed, reason: getaddrinfo EAI_AGAIN binaries.prisma.sh`
- `npx prisma generate` : **KO**
  - erreur : `request to https://binaries.prisma.sh/... failed, reason: getaddrinfo EAI_AGAIN binaries.prisma.sh`
- `npm run lint` : **OK**
- `npm run build` : **KO**
  - erreur observée : `app/api/company/rules/route.ts:4:10` — `Module "@prisma/client" has no exported member 'RuleMode'.`

## Réserves strictement prouvées conservées

- aucun modèle dédié d’indisponibilité véhicule déclarative n’existe dans `prisma/schema.prisma` ;
- la couverture véhicule reste donc **partielle** au sens strict ;
- la traduction française reste **partielle** car certains codes techniques internes restent affichés dans l’historique autoschedule ;
- l’autoschedule ALPHA reste donc **PARTIEL** tant que ces deux résiduels demeurent réellement prouvés.
