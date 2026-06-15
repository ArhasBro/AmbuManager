# 2 — Preuves

## 1. Git status initial

Commande :

```powershell
git status --short
```

Résultat initial :

```text
 M docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md
?? docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-05_A1_P1-05/
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/
```

État initial notable : `04`, `05`, P1-05 et P1-06 étaient déjà modifiés ou non suivis avant P1-07.

## 2. Commande de création de session via script officiel

Commande :

```powershell
.\create_session.ps1 -Stage 1-ALPHA -Block A1 -SessionCode P1-07 -Type DOCUMENTATION -Title "Refonte lisible 05 blocs sessions production"
```

Résultat utile :

```text
Session creee : SESSION-20260615-01_A1_P1-07
Dossier session : .\docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-01_A1_P1-07
Dossier patch   : .\docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-01_A1_P1-07\PATCH
```

## 3. Fichiers lus

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- P1-02, P1-03, P1-04, P1-05, P1-06 : `1-SESSION.md`, `2-PREUVES.md`, `3-FIN_DE_SESSION.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/App.jsx` par lecture ciblée des routes/pages.

## 4. Fichiers créés/modifiés

Fichiers modifiés :

- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/3-FIN_DE_SESSION.md`

Fichiers créés dans `PATCH/` :

- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/GENERATE_05_DOCUMENTAIRE.ps1`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/PATCH_DOCUMENTAIRE_05.diff`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/NO_PATCH_CODE.md`

Fichier créé par le script officiel et conservé :

- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/NO_PATCH.md`

## 5. Structure de session

Commande :

```powershell
$session='docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-01_A1_P1-07'
Test-Path "$session\1-SESSION.md"; Test-Path "$session\2-PREUVES.md"; Test-Path "$session\3-FIN_DE_SESSION.md"; Test-Path "$session\PATCH"
```

Résultat :

```text
True
True
True
True
```

## 6. Diff complet du fichier modifié

Commande demandée :

```powershell
git diff -- docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
```

Résultat :

```text
SORTIE VIDE
```

Explication : `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` était déjà non suivi dans le statut initial. La commande `git diff -- ...` ne montre donc pas son contenu.

Patch documentaire complet produit par commande complémentaire :

```powershell
git diff --no-index -- NUL docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md > docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/PATCH_DOCUMENTAIRE_05.diff
```

Résultat stat :

```text
.../1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md | 1159 ++++++++++++++++++++
1 file changed, 1159 insertions(+)
```

La sortie complète du diff est fournie dans :

- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/PATCH_DOCUMENTAIRE_05.diff`

## 7. Preuve absence modification code

Commande :

```powershell
git diff --name-only -- app lib prisma package.json package-lock.json
```

Résultat :

```text
SORTIE VIDE
```

## 8. Preuve absence modification Base44

Commande :

```powershell
git diff --name-only -- docs/1-MASTER/4-BASE44_REFERENCE
```

Résultat :

```text
SORTIE VIDE
```

## 9. Preuve absence modification des autres MASTER actifs

Commande :

```powershell
git status --short --untracked-files=all -- docs/1-MASTER
```

Résultat :

```text
 M docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md
?? docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
```

Écart documenté : `04-PLAN_DE_DEVELOPPEMENT.md` était déjà modifié dans le statut initial avant P1-07. Aucune modification volontaire de `04` n'a été effectuée pendant P1-07.

Commande ciblée autres MASTER actifs hors `04` et `05` :

```powershell
git diff --name-only -- docs/1-MASTER/01-APPLICATION_WEB.md docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md docs/1-MASTER/03-METHODE_DE_TRAVAIL.md docs/1-MASTER/RGPD_BASE_MINIMALE.md
```

Résultat :

```text
SORTIE VIDE
```

## 10. Git status final

Commande :

```powershell
git status --short
```

Résultat final :

```text
 M docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md
?? docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-05_A1_P1-05/
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/
```

## 11. Git status final complet avec non suivis

Commande :

```powershell
git status --short --untracked-files=all
```

Résultat final utile :

```text
 M docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md
?? docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-05_A1_P1-05/...
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/...
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/1-SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/2-PREUVES.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/3-FIN_DE_SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/GENERATE_05_DOCUMENTAIRE.ps1
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/NO_PATCH.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/NO_PATCH_CODE.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/PATCH_DOCUMENTAIRE_05.diff
```

## 12. Contrôle UTF-8 sans BOM

Commande exacte :

```powershell
$files=@('docs\1-MASTER\05-BLOCS_SESSIONS_PRODUCTION.md',"$session\1-SESSION.md","$session\2-PREUVES.md","$session\3-FIN_DE_SESSION.md","$session\PATCH\NO_PATCH.md","$session\PATCH\NO_PATCH_CODE.md","$session\PATCH\PATCH_DOCUMENTAIRE_05.diff"); foreach($file in $files){ $bytes=[System.IO.File]::ReadAllBytes((Resolve-Path $file)); [pscustomobject]@{File=$file; BOM=($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF)} }
```

Résultat :

```text
BOM=False pour chaque fichier Markdown ou patch documentaire contrôlé.
```

## 13. Contrôle absence de séquences suspectes/mojibake

Commande exacte :

```powershell
$markers=@([string][char]0x00C3,[string][char]0x00C2,([string][char]0x00E2+[string][char]0x20AC),[string][char]0xFFFD); foreach($file in $files){ $content=[System.IO.File]::ReadAllText((Resolve-Path $file), [System.Text.UTF8Encoding]::new($false)); foreach($m in $markers){ if($content.Contains($m)){ [pscustomobject]@{File=$file;Marker=$m} } } }
```

Résultat final après réécriture UTF-8 des fichiers P1-07 :

```text
SORTIE VIDE
```

## 14. Preuve PATCH documentaire ou NO_PATCH_CODE

Fichiers présents :

- `PATCH/PATCH_DOCUMENTAIRE_05.diff`
- `PATCH/NO_PATCH_CODE.md`
- `PATCH/NO_PATCH.md`

## 15. Contrôles de contenu du fichier 05

Commande :

```powershell
Select-String -Path docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md -Pattern '^### BLOC ' | Where-Object { $_.Line -notmatch '\[ID\]' } | Measure-Object
```

Résultat :

```text
24 blocs hors modèle détectés.
```

Constats :

- Tous les blocs de `04` sont présents.
- Chaque bloc contient une fiche avec les rubriques demandées.
- Chaque bloc prévoit un audit ciblé.
- Les sessions de production non prouvées sont marquées `INFORMATION NON FOURNIE — À CONFIRMER après audit ciblé`.
- `P-VEHICLE-FOLLOWUP` contient des sessions prévisionnelles explicitement à confirmer après audit ciblé.
- Aucun gros tableau par bloc.

## 16. Limites / Écarts

- `04-PLAN_DE_DEVELOPPEMENT.md`, P1-05 et P1-06 étaient déjà présents dans le statut initial ; ils sont conservés comme État de départ.
- Le premier rendu généré via PowerShell 5.1 a produit du mojibake ; le fichier `05` puis les fichiers de session ont été réécrits en UTF-8, et le contrôle final mojibake est vide.
- Aucun lint, build, test applicatif, migration ou génération Prisma lancé, car la session est documentaire et sans code.
