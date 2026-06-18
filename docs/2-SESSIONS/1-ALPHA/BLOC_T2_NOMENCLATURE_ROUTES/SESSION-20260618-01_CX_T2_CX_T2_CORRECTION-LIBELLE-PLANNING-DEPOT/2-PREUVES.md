# 2 - Preuves

## 1. Fichiers lus

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/3-FIN_DE_SESSION.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `app/planning/planning-client.tsx`

## 2. Fichiers utilisés comme référence

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/3-FIN_DE_SESSION.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `app/planning/planning-client.tsx`

## 3. Fichiers créés

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/PATCH/README_PATCH.md`

## 4. Fichiers modifiés

- `app/planning/planning-client.tsx`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/3-FIN_DE_SESSION.md`

## 5. Fichiers supprimés

- Aucun par cette session.

## 6. Fichiers déplacés ou renommés

- Aucun.

## 7. Dossiers explicitement non modifiés

- `app/**` hors `app/planning/planning-client.tsx`
- `docs/1-MASTER/**` hors `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/3-TEMPLATES/**`
- `prisma/**`
- `docs/1-MASTER/4-BASE44_REFERENCE/**`

## 8. Commandes exécutées

```powershell
git status --short
Get-Content -Raw create_session.ps1
Get-Content -Raw docs/2-SESSIONS/README_SESSIONS.md
Get-Content -Raw docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md
Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/1-SESSION.md
Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/2-PREUVES.md
Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/3-FIN_DE_SESSION.md
Get-Content -Raw docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
Get-Content app/planning/planning-client.tsx | Select-Object -Index (1848..1862)
rg -n "BLOC T2|DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES|CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT" docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
powershell -ExecutionPolicy Bypass -File .\create_session.ps1 -Stage "1-ALPHA" -Block "T2" -SessionCode "CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT" -Type "CX+CORRECTION" -Title "Correction du libelle visible Depot dans Planning"
rg -n "Depot" app/planning/planning-client.tsx
rg -n "Depot" app/planning/planning-client.tsx
git diff --name-only
git diff -- app/planning/planning-client.tsx docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
git status --short
```

### Relance corrective patch `.diff`

```powershell
Test-Path "docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/PATCH/PATCH__SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT.diff"
$patchPath = Join-Path (Get-Location) "docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/PATCH/PATCH__SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT.diff"; $diff = git diff -- app/planning/planning-client.tsx docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md; [System.IO.File]::WriteAllText($patchPath, $diff, (New-Object System.Text.UTF8Encoding($false)))
Get-Content "C:\Users\arche\ambulance-manager\docs\2-SESSIONS\1-ALPHA\BLOC_T2_NOMENCLATURE_ROUTES\SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT\PATCH\PATCH__SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT.diff" -TotalCount 40
git diff --name-only
git diff -- docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/2-PREUVES.md docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/3-FIN_DE_SESSION.md
git status --short
```

## 9. Résultats des commandes

- `git status --short` initial : état Git préexistant détecté avec suppression d'un ancien dossier de session `SESSION-20260617-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT`.
- recherche ciblée initiale `rg -n "Depot" app/planning/planning-client.tsx` : occurrence visible localisée en `app/planning/planning-client.tsx:1856` avec `<span className="planning-filter-card__label">Depot</span>`.
- `create_session.ps1` : session créée dans `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT`.
- recherche ciblée après correction :

```text
41:type DepotLite = { id: string; name: string; isActive: boolean };
44:  availableDepots: DepotLite[];
481:function getDepotLabel(depot: DepotLite) {
591:  availableDepots,
736:  const depotOptions = useMemo<DepotLite[]>(() => {
737:    const map = new Map<string, DepotLite>();
738:    for (const depot of availableDepots) map.set(depot.id, depot);
743:  }, [availableDepots, items]);
1717:        const nextDepotId = resolveBulkAssignValue(bulkAssignForm.depotId);
1718:        if (nextDepotId.include) patch.depotId = nextDepotId.value;
2154:                  {getDepotLabel(depot)}
2581:  depots: DepotLite[];
2604:        {s.depot ? <StatusBadge variant="neutral">Base: {getDepotLabel(s.depot)} /> : null}
2687:                  {getDepotLabel(depot)}
2714:  depots: DepotLite[];
2761:        {s.depot ? <Row label="Base" value={getDepotLabel(s.depot)} /> : null}
2840:                  {getDepotLabel(depot)}
```

Qualification :

- l'occurrence visible ligne `1856` a disparu ;
- les occurrences restantes sont techniques (`DepotLite`, `getDepotLabel`, `depotId`) ou liées à l'affichage `Base`, donc hors cible de renommage.

- `git diff --name-only` :

```text
app/planning/planning-client.tsx
docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260617-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/1-SESSION.md
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260617-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/2-PREUVES.md
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260617-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/3-FIN_DE_SESSION.md
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260617-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/PATCH/README_PATCH.md
```

Qualification :

- les deux fichiers effectivement modifiés par cette session sont `app/planning/planning-client.tsx` et `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` ;
- les entrées `SESSION-20260617-01_*` correspondent à un état Git préexistant hors session.

- `git diff -- app/planning/planning-client.tsx docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` :

```diff
diff --git a/app/planning/planning-client.tsx b/app/planning/planning-client.tsx
@@ -1853,7 +1853,7 @@ export default function PlanningClient({
-                <span className="planning-filter-card__label">Depot</span>
+                <span className="planning-filter-card__label">Dépôt</span>
diff --git a/docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md b/docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
@@ -269,6 +269,14 @@ T2 évite les divergences entre route technique officielle et libellé métier v
+- `CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT`
+  - Nature : CX.
+  - Type métier : CORRECTION.
+  - Objectif : corriger le reliquat visible `Depot` dans `Planning`.
+  - Dépendances : `DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES`.
+  - Hors périmètre : routes, `href`, URLs, renommage technique, refonte Planning.
+  - Suite attendue : DX courte de revalidation/clôture T2.
```

- `git status --short` final :

```text
 M app/planning/planning-client.tsx
 M docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
 D docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260617-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/1-SESSION.md
 D docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260617-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/2-PREUVES.md
 D docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260617-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/3-FIN_DE_SESSION.md
 D docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260617-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/PATCH/README_PATCH.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/
```

### Résultats de la relance corrective patch `.diff`

- vérification d'absence initiale du patch attendu :

```text
False
```

- fichier patch créé :
  - `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT/PATCH/PATCH__SESSION-20260618-01_CX_T2_CX_T2_CORRECTION-LIBELLE-PLANNING-DEPOT.diff`

- contrôle sobre du contenu du patch :

```text
diff --git a/app/planning/planning-client.tsx b/app/planning/planning-client.tsx
index 72fa3cac..55c11043 100644
--- a/app/planning/planning-client.tsx
+++ b/app/planning/planning-client.tsx
@@ -1853,7 +1853,7 @@ export default function PlanningClient({
-                <span className="planning-filter-card__label">Depot</span>
+                <span className="planning-filter-card__label">DÃ©pÃ´t</span>
diff --git a/docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md b/docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
index 365f1862..2c1b570d 100644
--- a/docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
+++ b/docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
@@ -269,6 +269,14 @@
```

Qualification :

- le fichier `.diff` contient bien des sections `diff --git`, `---`, `+++` et `@@` ;
- le patch est exploitable comme artefact de session ;
- aucun fichier applicatif ou MASTER n'a été modifié pendant cette relance ; seuls le patch et les fichiers de preuve de session sont concernés ;
- `SESSION-20260617-01_*` reste une suppression manuelle confirmée par Nathan et hors périmètre de cette relance.

## 10. Contrôles Git

- Contrôle avant modification effectué.
- Contrôle final ciblé effectué.
- Les suppressions `SESSION-20260617-01_*` préexistent dans le worktree et n'ont pas été modifiées ni restaurées par cette session.
- La relance corrective n'a ni restauré ni modifié `SESSION-20260617-01_*`, conformément à la confirmation de suppression manuelle par Nathan.

## 11. Contrôles techniques

- Correction limitée à un libellé visible JSX.
- Aucune clé technique `depot`, `depotId`, `depotName` modifiée.
- Aucune route, aucun `href`, aucune URL modifiés.
- Aucun changement de logique métier Planning.

## 12. Contrôles d'encodage

- Fichiers texte modifiés via `apply_patch`.
- Contrôle d'encodage dédié non exécuté, non demandé dans le prompt.

## 13. Contrôles de périmètre

- Aucun fichier hors liste autorisée modifié par cette session.
- Aucune lecture élargie au reste du repo.
- Aucun navigateur, aucun Playwright, aucun `npm run dev`, aucun build.
- Aucun fichier applicatif ou MASTER n'a été modifié pendant cette relance corrective.

## 14. Limites / commandes non exécutées

- `npm run lint` non lancé - correction limitée à un libellé visible, validation technique complète prévue en DX de revalidation T2.
- `npm install` non lancé.
- `npm run dev` non lancé.
- `npm run build` non lancé.
- Aucun navigateur ni Playwright.
- `git diff -- docs/2-SESSIONS/.../2-PREUVES.md docs/2-SESSIONS/.../3-FIN_DE_SESSION.md` retourne vide tant que le dossier de session reste non suivi ; la preuve de relance repose donc sur le contenu effectif des fichiers et sur `git status --short`.

## 15. Informations non fournies

- `INFORMATION NON FOURNIE - A CONFIRMER` : date exacte de la DX courte de revalidation/clôture T2.

Règles obligatoires :

- Une commande non montrée = non prouvée.
- Un fichier non listé = non prouvé.
- Une information absente = INFORMATION NON FOURNIE - A CONFIRMER.
