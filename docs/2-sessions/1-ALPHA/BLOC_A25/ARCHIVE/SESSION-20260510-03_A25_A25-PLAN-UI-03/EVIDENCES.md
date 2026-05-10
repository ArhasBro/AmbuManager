# EVIDENCES

Elements factuels utilises pendant la reprise documentaire V2.

---

## Perimetre de la reprise V2

- Reprise documentaire uniquement.
- Aucun changement code applicatif.
- Aucun changement du patch principal code V1.

---

## Patch documentaire correctif V2

Fichier produit :
- `docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/PATCH/PATCH__SESSION-20260510-03_A25_A25-PLAN-UI-03_DOCS_FIX-01.diff`

Commande de generation :
```bash
git diff --output="docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/PATCH/PATCH__SESSION-20260510-03_A25_A25-PLAN-UI-03_DOCS_FIX-01.diff" -- docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/SESSION.md docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/NOTES.md docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/EVIDENCES.md docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/RESULTATS.md docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/FIN_SESSION.md docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/PATCH/README_PATCH.md
```

Sortie utile :
```text
DIFF_EXIT=0
```

---

## Preuve encodage patch documentaire (UTF-8 sans BOM)

Controle binaire :
- `PATCH_FIRST3_HEX=64 69 66`
- absence de BOM UTF-8 (`EF BB BF` absent)
- premiere ligne : `diff --git a/docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/EVIDENCES.md ...`

Note de controle :
- premier essai invalide en UTF-16 LE (`FF FE`) a cause de la redirection PowerShell ;
- patch regenere en sortie git standard, conforme UTF-8 sans BOM.

---

## Preuve `git apply --check` du patch documentaire

Commande demandee (working tree courant) :
```bash
git apply --check PATCH__SESSION-20260510-03_A25_A25-PLAN-UI-03_DOCS_FIX-01.diff
```

Sortie complete (depuis le fichier reel dans le repo) :
```text
APPLY_CHECK_EXIT=1
error: patch failed: docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/EVIDENCES.md:1
error: docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/EVIDENCES.md: patch does not apply
error: patch failed: docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/FIN_SESSION.md:1
error: docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/FIN_SESSION.md: patch does not apply
error: patch failed: docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/NOTES.md:1
error: docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/NOTES.md: patch does not apply
error: patch failed: docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/PATCH/README_PATCH.md:9
error: docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/PATCH/README_PATCH.md: patch does not apply
error: patch failed: docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/RESULTATS.md:1
error: docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/RESULTATS.md: patch does not apply
error: patch failed: docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/SESSION.md:19
error: docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03/SESSION.md: patch does not apply
```

Cause : patch deja applique dans le working tree courant.

Preuve alternative controlee (worktree propre) :
```bash
git -C C:\Users\arche\ambulance-manager worktree add C:\Users\arche\ambulance-manager__wt_a25_ui03_docs_v2 HEAD
# copie du patch dans le dossier PATCH du worktree
git apply --check PATCH__SESSION-20260510-03_A25_A25-PLAN-UI-03_DOCS_FIX-01.diff
```

Sortie utile :
```text
WORKTREE_APPLY_CHECK_EXIT=0
```

---

## Justification terminale (non-relance lint/build)

- `npm run lint` et `npm run build` n'ont pas ete relances en V2.
- Motif : reprise documentaire uniquement, sans modification code applicatif.
- Les preuves terminales code de reference restent celles de la V1 deja documentees.
