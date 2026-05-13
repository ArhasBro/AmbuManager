# EVIDENCES — `SESSION-20260422-03_A14_BACK-03`

## 1. Niveau de preuve

La présente session distingue strictement :
- les éléments prouvés par exécution terminale ;
- les éléments constatés par relecture du code ;
- les éléments non prouvés / à confirmer.

## 2. Prouvé par exécution terminale

- `npm run test:quality` : `OK`

## 3. Constaté par relecture du code

### 3.1 API / réponses
- `lib/api/response.ts` expose les helpers de réponse standardisés attendus.
- `app/api/company/profile/route.ts` utilise `updateCompanyProfile`, un validateur partagé et le mapping d’erreur Prisma partagé.
- `app/api/company/rules/route.ts` utilise des validateurs partagés et les helpers de réponse backend.
- `app/api/planning/shifts/[id]/assign/route.ts` s’appuie sur un validateur partagé puis délègue à des services dédiés.

### 3.2 Logique métier / services
- la mise à jour du profil société est extraite vers `lib/services/company/update-company-profile.ts`.
- l’assignation planning relue passe par `assignDraftShift` / `assignShift`.
- les contrôles de société courante (`companyId`) restent présents sur les points relus.

### 3.3 Prisma / cohérence de lecture
- la lecture statique de `app/api/company/rules/route.ts` est cohérente avec `prisma/schema.prisma` concernant `CompanyRule` et `@@unique([companyId, key])`.
- la lecture statique de `app/api/company/profile/route.ts` est cohérente avec les champs visibles du modèle `Company`.
- les routes et services de planning relus ne montrent pas, en lecture statique, de contradiction immédiate avec les modèles Prisma concernés.

### 3.4 Permissions / RBAC / `platformRole`
- `app/api/company/rules/route.ts` appelle `canManageCompanyRules(...)`.
- `app/api/planning/shifts/[id]/assign/route.ts` appelle `canEditPlanning(...)`.
- les routes `autoschedule` relues montrent une propagation de permissions cohérente sur plusieurs points contrôlés.

## 4. Non prouvé / à confirmer

- la validation complète backend n’est pas démontrée.
- l’absence totale de régression structurelle backend n’est pas prouvée par exécution complète.
- le comportement final de `app/api/planning/autoschedule/runs/route.ts` est constaté comme cohérent en lecture, mais `INFORMATION NON FOURNIE — À CONFIRMER` pour une validation d’exécution complète.
- la cohérence Prisma n’est pas validée par la commande Prisma dans l’archive contrôlée ; seule une cohérence de lecture est constatée.
- la validité build/lint globale du backend contrôlé est non démontrée.

## 5. Validations terminales documentées

- `git apply --check <PATCH>` : `NON RELANCÉ` — aucun patch de validation produit
- `git apply <PATCH>` : `NON RELANCÉ` — aucun patch de validation produit
- `npx prisma validate` : `KO` — la relance n’aboutit pas dans l’archive contrôlée ; la CLI Prisma n’est pas disponible localement et `npx` tente une installation externe
- `npm run test:quality` : `OK`
- `npm run lint` : `KO` — `eslint: not found`
- `npm run build` : `KO` — `next: not found`