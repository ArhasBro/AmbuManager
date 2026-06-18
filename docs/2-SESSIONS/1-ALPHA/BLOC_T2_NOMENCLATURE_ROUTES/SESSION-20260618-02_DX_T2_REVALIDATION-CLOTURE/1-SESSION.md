# 1 - Session

## 1. Identification

- Session : `SESSION-20260618-02_DX_T2_REVALIDATION-CLOTURE`
- Date : `18/06/2026`
- Phase : `1-ALPHA`
- Bloc : `T2 - Nomenclature, routes et renommages futurs`
- Nature : `DX`
- Type métier : `VALIDATION+CLOTURE`
- Intitulé : `Revalidation et cloture T2`
- Dépendances directes :
  - `DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES`
  - `CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT`
  - patch `.diff` obligatoire de la session CX si présent

## 2. Contexte

Le repo officiel Ambulance Manager reste la source technique de vérité.

Base44 reste une référence fonctionnelle, visuelle et métier uniquement. Aucun code Base44 ne doit être copié ni utilisé comme vérité technique.

Cette session est une session `DX` de `VALIDATION+CLOTURE`. Elle revalide après correction ciblée que le bloc T2 peut être clôturé ou doit rester non clôturable.

## 3. Objectif unique

Vérifier uniquement que :

1. le reliquat visible `Depot` dans `app/planning/planning-client.tsx` a bien été corrigé en `Dépôt` ;
2. les occurrences restantes de `Depot` sont uniquement techniques si elles existent ;
3. aucune route, aucun `href`, aucune URL, aucun alias et aucune redirection n'ont été modifiés ;
4. aucune logique métier Planning n'a été modifiée ;
5. le patch `.diff` obligatoire de la session CX existe bien dans `PATCH/` ;
6. `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` contient l'intégration minimale attendue des sessions T2 ;
7. le bloc T2 peut être déclaré clôturé ou non clôturable avec demande de session ciblée.

## 4. Périmètre autorisé

- Lire uniquement :
  - `create_session.ps1`
  - `docs/2-SESSIONS/README_SESSIONS.md`
  - `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
  - `docs/3-TEMPLATES/TEMPLATE_RELANCE_CODEX.md`
  - `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
  - `app/planning/planning-client.tsx`
  - la session `DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES`
  - la session `CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT`
  - le dossier `PATCH/` de la session `CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT`
  - la relance corrective patch `.diff` si elle existe
- Modifier uniquement les fichiers de la session DX créée :
  - `1-SESSION.md`
  - `2-PREUVES.md`
  - `3-FIN_DE_SESSION.md`
  - `PATCH/NO_PATCH.md`
- Modifier `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` uniquement si une intégration minimale de la session `DX_T2_REVALIDATION-CLOTURE` est nécessaire.

## 5. Périmètre interdit

- Ne pas modifier `app/planning/planning-client.tsx`.
- Ne pas modifier d'autres fichiers applicatifs.
- Ne pas modifier une route.
- Ne pas modifier un `href`.
- Ne pas modifier une URL.
- Ne pas créer de redirection.
- Ne pas créer d'alias.
- Ne pas renommer un fichier ou un dossier.
- Ne pas déplacer un composant.
- Ne pas modifier `next.config.ts`.
- Ne pas modifier Prisma.
- Ne pas modifier Base44.
- Ne pas modifier `docs/3-TEMPLATES`.
- Ne pas modifier d'autres fichiers MASTER que `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`.
- Ne pas corriger du lint hors périmètre.
- Ne pas refondre Planning.
- Ne pas modifier la logique métier Planning.
- Ne pas ajouter de fonctionnalité.
- Ne pas lancer navigateur, capture, Playwright, `npm run dev`, `npm run lint` ou `npm run build`.

## 6. Fichiers à lire

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/3-TEMPLATES/TEMPLATE_RELANCE_CODEX.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `app/planning/planning-client.tsx`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/PATCH/README_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/PATCH/PATCH__SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT.diff`

## 7. Fichiers modifiables

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-02_DX_T2_REVALIDATION-CLOTURE/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-02_DX_T2_REVALIDATION-CLOTURE/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-02_DX_T2_REVALIDATION-CLOTURE/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-02_DX_T2_REVALIDATION-CLOTURE/PATCH/NO_PATCH.md`

## 8. Fichiers à ne pas modifier

- `app/**` hors `app/planning/planning-client.tsx`
- `docs/1-MASTER/**` hors `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/3-TEMPLATES/**`
- `docs/2-SESSIONS/**` hors la session créée et les deux sessions de référence lues
- `next.config.ts`
- `prisma/**`

## 9. Livrable attendu

- preuve que le reliquat visible `Depot` n'est plus présent dans `Planning` ;
- preuve que les occurrences restantes sont techniques uniquement ;
- preuve que le patch `.diff` CX existe ;
- preuve que le MASTER contient l'intégration minimale T2 attendue ;
- verdict explicite de clôture ou de non-clôture du bloc T2 ;
- dossier de session DX complété sans patch applicatif.

## 10. Contrôles attendus

- `git status --short`
- `rg -n ">Depot<|Depot" app/planning/planning-client.tsx`
- `rg -n "Dépôt|Depot" app/planning/planning-client.tsx`
- `Get-ChildItem -LiteralPath "docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES" -Recurse -Filter "*.diff"`
- `git diff --name-only`
- `git diff -- docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `git status --short`

## 11. Critères de validation

Le bloc T2 est clôturable uniquement si :

- aucun reliquat visible `Depot` ne subsiste dans `Planning` ;
- les occurrences restantes sont techniques ou neutres ;
- aucune route, aucun `href`, aucune URL, aucun alias et aucune redirection n'ont été modifiés ;
- aucune logique métier Planning n'a été modifiée ;
- le patch `.diff` CX est bien présent ;
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` n'exige pas de correction supplémentaire ;
- les preuves sont complètes ;
- l'état Git final reste cohérent avec une session documentaire DX.

## 12. Points à confirmer

- Aucun point bloquant supplémentaire.
