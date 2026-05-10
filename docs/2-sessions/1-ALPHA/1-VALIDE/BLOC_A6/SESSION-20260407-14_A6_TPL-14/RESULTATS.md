# RESULTATS

## Résultats obtenus

### 1. Analyse rapide

Le bloc A6 n'est pas resté à l'état de socle : il existe réellement côté schéma, API, UI et intégrations planning. En revanche, un résiduel strictement prouvé subsistait sur la fondation matching.

### 2. Périmètre réellement contrôlé

Contrôle effectué sur la documentation maître imposée, les sessions / patchs `TPL-01` à `TPL-13`, puis sur le code réel touchant :
- Prisma / migrations templates ;
- API templates ;
- UI templates ;
- planning ;
- autoschedule ;
- matching ;
- assignation manuelle.

### 3. État réel du bloc A6 après `TPL-01` à `TPL-13`

État constaté :
- templates réellement administrables : OUI dans le dépôt contrôlé ;
- fondation planning : OUI ;
- fondation autoschedule : OUI ;
- fondation matching : PARTIELLE avant correctif TPL-14, car non complètement alignée sur la composition minimale d'équipe.

### 4. Non-conformité restante strictement prouvée

Non-conformité retenue avant correctif :
- `matching.service.ts` n'exploitait pas complètement la composition d'équipe du template (`minStaffCount`, rôles autorisés par slot), alors que cette logique était déjà présente ailleurs dans le bloc A6.

### 5. Correctif minimal produit

Un unique correctif minimal a été produit pour `TPL-14` afin d'aligner le matching avec les règles templates déjà présentes dans le dépôt.

### 6. Validations réellement exécutées

- `git apply --check` : OK
- `git apply` : OK
- `npx prisma validate` : OK
- `npx prisma generate` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Documents modifiés

Correctif applicatif :
- `lib/services/planning/matching.service.ts`
- `app/planning/planning-client.tsx`

Documentation de session :
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-14_A6_TPL-14/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-14_A6_TPL-14/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-14_A6_TPL-14/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-14_A6_TPL-14/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-14_A6_TPL-14/FIN_SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-14_A6_TPL-14/README_PATCH.md`
