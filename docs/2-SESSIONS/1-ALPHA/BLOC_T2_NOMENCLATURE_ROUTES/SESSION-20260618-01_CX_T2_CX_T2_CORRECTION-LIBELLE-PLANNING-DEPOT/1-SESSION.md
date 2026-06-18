# 1 - Session

## 1. Identification

- Session : `SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT`
- Date : `18/06/2026`
- Phase : `1-ALPHA`
- Bloc : `T2 - Nomenclature, routes et renommages futurs`
- Nature : `CX`
- Type métier : `CORRECTION`
- Intitulé : `Correction du libellé visible Depot dans Planning`
- Dépendance directe : `DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES`

## 2. Contexte

Le repo officiel Ambulance Manager reste la source technique de vérité.

Base44 reste une référence fonctionnelle, visuelle et métier uniquement. Aucun code Base44 ne doit être copié ni utilisé comme vérité technique.

La session `DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES` a conclu à une non-clôture du bloc T2 à cause d'un reliquat visible `Depot` dans le module `Planning`, repéré dans `app/planning/planning-client.tsx` à la ligne indicative `1856`.

## 3. Objectif unique

Corriger uniquement le libellé visible utilisateur `Depot` dans le module `Planning`, sans toucher aux routes, `href`, URLs, clés techniques ou logique métier.

## 4. Périmètre autorisé

- Créer la session via `create_session.ps1`.
- Lire uniquement :
  - `create_session.ps1`
  - `docs/2-SESSIONS/README_SESSIONS.md`
  - `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
  - `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/1-SESSION.md`
  - `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/2-PREUVES.md`
  - `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/3-FIN_DE_SESSION.md`
  - `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
  - `app/planning/planning-client.tsx`
- Modifier uniquement :
  - `app/planning/planning-client.tsx`
  - `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
  - les fichiers de session de `SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT`
- Exécuter uniquement les contrôles Git demandés et la recherche ciblée `Depot` avant/après correction.

## 5. Périmètre interdit

- Ne pas lancer navigateur, Playwright, `npm run dev`, `npm install`, `npm run build`.
- Ne pas modifier route, `href`, URL, redirection, alias, `next.config.ts`, Prisma ou Base44.
- Ne pas renommer les clés techniques `depot`, `depotId`, `depotName` ou équivalent.
- Ne pas modifier les variables techniques, types, logique métier Planning, autres libellés ou autres blocs.
- Ne pas modifier d'autres fichiers MASTER que `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`.

## 6. Fichiers lus

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/3-FIN_DE_SESSION.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `app/planning/planning-client.tsx`

## 7. Fichiers modifiables

- `app/planning/planning-client.tsx`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/PATCH/README_PATCH.md`

## 8. Fichiers à ne pas modifier

- `app/**` hors `app/planning/planning-client.tsx`
- `docs/1-MASTER/**` hors `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/3-TEMPLATES/**`
- `docs/2-SESSIONS/**` hors la session créée
- `next.config.ts`
- `prisma/**`

## 9. Livrable attendu

- correction ciblée du libellé visible `Depot` vers un libellé français cohérent dans `Planning` ;
- intégration minimale de la session dans `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` ;
- preuves de session complétées sans élargissement du périmètre ;
- diff ciblé prouvant l'absence de modification de routes, `href` ou URLs.

## 10. Contrôles attendus

- `git status --short`
- recherche ciblée de `Depot` dans `app/planning/planning-client.tsx`
- recherche ciblée après correction dans `app/planning/planning-client.tsx`
- `git diff --name-only`
- `git diff -- app/planning/planning-client.tsx docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `git status --short`

## 11. Critères de validation

La session est traitée si :

- le seul libellé visible résiduel ciblé est corrigé ;
- aucune route, aucun `href` et aucune URL ne sont modifiés ;
- aucune clé technique `depot*` n'est renommée ;
- aucune logique métier Planning n'est modifiée ;
- l'intégration dans le bloc T2 du MASTER reste minimale ;
- les preuves de lecture, modification et contrôle sont complètes.

## 12. Points à confirmer

- `INFORMATION NON FOURNIE - A CONFIRMER` : date exacte de la future session DX courte de revalidation/clôture T2.
