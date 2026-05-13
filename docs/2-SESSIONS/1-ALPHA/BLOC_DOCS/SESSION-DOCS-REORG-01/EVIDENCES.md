# EVIDENCES.md

## 1) Audit et lectures
- `Get-ChildItem -Recurse -Force docs | Select-Object FullName,PSIsContainer | Format-Table -AutoSize`
- `Get-Content -Raw docs/1-master/DOCUMENT_MAITRE.md`
- `Get-Content -Raw docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `Get-Content -Raw docs/1-master/STRUCTURE_PROJET.md`
- `Get-Content -Raw docs/1-master/ETAT_GLOBAL_PROJET.md`
- `Get-Content -Raw docs/1-master/REGISTRE_DECISIONS.md`
- `Get-Content -Raw docs/1-master/RECAP_DISCUSSIONS.md`
- `Get-Content -Raw docs/1-master/REFERENCE_UI_UX_A24.md`
- `Get-Content -Raw docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `Get-Content -Raw docs/3-templates/TEMPLATE_DEBUT_SESSION.md`

## 2) Verification MAQUETTE_DA et chemins officiels
- `Test-Path docs/1-master/MAQUETTE/MAQUETTE_DA` => `True`
- `Get-Item docs/1-master/MAQUETTE/MAQUETTE_DA | Select-Object FullName,PSIsContainer`
- Verification officielle:
  - `docs/1-master/DOCUMENT_MAITRE.md` => True
  - `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` => True
  - `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` => True
  - `docs/1-master/ETAT_GLOBAL_PROJET.md` => True
  - `docs/1-master/REGISTRE_DECISIONS.md` => True
  - `docs/1-master/RECAP_DISCUSSIONS.md` => True
  - `docs/1-master/STRUCTURE_PROJET.md` => True
  - `docs/1-master/REFERENCE_UI_UX_A24.md` => True
  - `docs/1-master/MAQUETTE/MAQUETTE_DA` => True
  - `docs/2-sessions` => True
  - `docs/3-templates` => True

## 3) Nettoyage racine docs (git mv)
Commandes executees avec `git mv`:
- `docs/CONTROLE_FINAL_DOCS.md` -> `docs/4-archives/notes-historiques/`
- `docs/NOTE_STRATEGIE_A23_A24_UI_UX_AMBULANCE_MANAGER.md` -> `docs/4-archives/notes-historiques/`
- `docs/PROTOCOLE_SESSION.md` -> `docs/4-archives/notes-historiques/`
- `docs/QUALITY_TESTS.md` -> `docs/4-archives/notes-historiques/`
- `docs/REALIGNEMENT_DOCUMENTAIRE_GLOBAL.md` -> `docs/4-archives/notes-historiques/`
- `docs/REALIGNEMENT_PLAN_DE_DEVELOPPEMENT_ALPHA_BETA.md` -> `docs/4-archives/notes-historiques/`
- `docs/SCENARIOS_MANUELS_ALPHA.md` -> `docs/4-archives/notes-historiques/`
- `docs/USAGE_PLANNING_AUTOSCHEDULE.md` -> `docs/4-archives/notes-historiques/`
- `docs/USAGE_TEMPLATES.md` -> `docs/4-archives/notes-historiques/`
- `docs/USAGE_USERS.md` -> `docs/4-archives/notes-historiques/`
- `docs/USAGE_VEHICLES.md` -> `docs/4-archives/notes-historiques/`
- `docs/BDD_OPERATIONS_SENSIBLES.md` -> `docs/4-archives/a-confirmer/`
- `docs/SOURCES_AUTORISEES.md` -> `docs/4-archives/a-confirmer/`
- `docs/STRUCTURE_DOCS.md` -> `docs/4-archives/a-confirmer/`
- `docs/REFONTE/` -> `docs/4-archives/brouillons/REFONTE/`

## 4) Verification racine docs propre
Commande:
- `Get-ChildItem docs -Force | Select-Object Mode,Name | Format-Table -AutoSize`

Sortie utile: seuls elements presents a la racine
- `README_DOCS.md`
- `README.md`
- `CMD.md`
- `1-master/`
- `2-sessions/`
- `3-templates/`
- `4-archives/`

## 5) Verification references internes
- Recherche des anciens chemins dans `docs/` via `Select-String` recursive.
- Constat: nombreuses references historiques dans les anciennes sessions.
- Action: mise a jour des documents de navigation active et de session courante:
  - `docs/README.md`
  - `docs/README_DOCS.md`
  - `docs/1-master/_INDEX_MASTER.md`
  - `docs/1-master/STRUCTURE_PROJET.md`
  - dossier session `SESSION-DOCS-REORG-01`.
- Les references dans les sessions historiques ont ete conservees pour preserver l'historique.

## 6) Patchs et encodage UTF-8 sans BOM
- Patch principal regenere/exporte dans:
  - `PATCH/PATCH__SESSION-DOCS-REORG-01_DOCS.diff`
- Patch correctif minimal genere:
  - `PATCH/PATCH__SESSION-DOCS-REORG-01_FIX-01_DOCS.diff`
- Conversion UTF-8 sans BOM appliquee aux deux `.diff` via ecriture .NET (`System.Text.UTF8Encoding($false)`).

## 7) ZIP final corrige
- Fichier: `SESSION-DOCS-REORG-01__DOCS_FINAL.zip`
- Verification du contenu ZIP:
  - `SESSION.md`
  - `NOTES.md`
  - `EVIDENCES.md`
  - `RESULTATS.md`
  - `FIN_SESSION.md`
  - `PATCH/README_PATCH.md`
  - `PATCH/PATCH__SESSION-DOCS-REORG-01_DOCS.diff`
  - `PATCH/PATCH__SESSION-DOCS-REORG-01_FIX-01_DOCS.diff`

## 8) Validations minimales
1. `git diff --check` -> OK (aucune sortie)
2. `git status --short` -> OK (sortie recue)

## 9) Sorties finales de validation (controle qualite)
- `git diff --check` => OK (aucune sortie)

- `git status --short` =>
```txt
M  docs/1-master/STRUCTURE_PROJET.md
A  docs/1-master/_INDEX_MASTER.md
A  docs/2-sessions/1-ALPHA/BLOC_DOCS/SESSION-DOCS-REORG-01/EVIDENCES.md
A  docs/2-sessions/1-ALPHA/BLOC_DOCS/SESSION-DOCS-REORG-01/FIN_SESSION.md
A  docs/2-sessions/1-ALPHA/BLOC_DOCS/SESSION-DOCS-REORG-01/NOTES.md
A  docs/2-sessions/1-ALPHA/BLOC_DOCS/SESSION-DOCS-REORG-01/PATCH/PATCH__SESSION-DOCS-REORG-01_DOCS.diff
A  docs/2-sessions/1-ALPHA/BLOC_DOCS/SESSION-DOCS-REORG-01/PATCH/PATCH__SESSION-DOCS-REORG-01_FIX-01_DOCS.diff
A  docs/2-sessions/1-ALPHA/BLOC_DOCS/SESSION-DOCS-REORG-01/PATCH/README_PATCH.md
A  docs/2-sessions/1-ALPHA/BLOC_DOCS/SESSION-DOCS-REORG-01/RESULTATS.md
A  docs/2-sessions/1-ALPHA/BLOC_DOCS/SESSION-DOCS-REORG-01/SESSION.md
A  docs/2-sessions/2-BETA/.gitkeep
A  docs/2-sessions/3-VERSION_OFFICIELLE/.gitkeep
A  docs/4-archives/.gitkeep
A  docs/4-archives/a-confirmer/.gitkeep
R  docs/BDD_OPERATIONS_SENSIBLES.md -> docs/4-archives/a-confirmer/BDD_OPERATIONS_SENSIBLES.md
R  docs/SOURCES_AUTORISEES.md -> docs/4-archives/a-confirmer/SOURCES_AUTORISEES.md
R  docs/STRUCTURE_DOCS.md -> docs/4-archives/a-confirmer/STRUCTURE_DOCS.md
A  docs/4-archives/anciens-zips/.gitkeep
A  docs/4-archives/brouillons/.gitkeep
R  docs/REFONTE/REFONTE.md -> docs/4-archives/brouillons/REFONTE/REFONTE.md
A  docs/4-archives/notes-historiques/.gitkeep
R  docs/CONTROLE_FINAL_DOCS.md -> docs/4-archives/notes-historiques/CONTROLE_FINAL_DOCS.md
R  docs/NOTE_STRATEGIE_A23_A24_UI_UX_AMBULANCE_MANAGER.md -> docs/4-archives/notes-historiques/NOTE_STRATEGIE_A23_A24_UI_UX_AMBULANCE_MANAGER.md
R  docs/PROTOCOLE_SESSION.md -> docs/4-archives/notes-historiques/PROTOCOLE_SESSION.md
R  docs/QUALITY_TESTS.md -> docs/4-archives/notes-historiques/QUALITY_TESTS.md
R  docs/REALIGNEMENT_DOCUMENTAIRE_GLOBAL.md -> docs/4-archives/notes-historiques/REALIGNEMENT_DOCUMENTAIRE_GLOBAL.md
R  docs/REALIGNEMENT_PLAN_DE_DEVELOPPEMENT_ALPHA_BETA.md -> docs/4-archives/notes-historiques/REALIGNEMENT_PLAN_DE_DEVELOPPEMENT_ALPHA_BETA.md
R  docs/SCENARIOS_MANUELS_ALPHA.md -> docs/4-archives/notes-historiques/SCENARIOS_MANUELS_ALPHA.md
R  docs/USAGE_PLANNING_AUTOSCHEDULE.md -> docs/4-archives/notes-historiques/USAGE_PLANNING_AUTOSCHEDULE.md
R  docs/USAGE_TEMPLATES.md -> docs/4-archives/notes-historiques/USAGE_TEMPLATES.md
R  docs/USAGE_USERS.md -> docs/4-archives/notes-historiques/USAGE_USERS.md
R  docs/USAGE_VEHICLES.md -> docs/4-archives/notes-historiques/USAGE_VEHICLES.md
M  docs/README.md
A  docs/README_DOCS.md
```

- Verification racine `docs/` =>
```txt
1-master/
2-sessions/
3-templates/
4-archives/
CMD.md
README.md
README_DOCS.md
```

## 10) Verification UTF-8 sans BOM des patchs
Commande de controle (signature hex des 3 premiers octets):
- `PATCH__SESSION-DOCS-REORG-01_DOCS.diff => 646966`
- `PATCH__SESSION-DOCS-REORG-01_FIX-01_DOCS.diff => 646966`

Interpretation:
- pas de BOM UTF-8 (`EFBBBF` absent)
- les deux patchs commencent par `diff` (`64 69 66`)
