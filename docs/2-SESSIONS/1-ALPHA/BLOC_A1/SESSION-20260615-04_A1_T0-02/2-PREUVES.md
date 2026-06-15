# 2 - Preuves

## 1. Git status initial

Commande executee avant creation de session :

```powershell
git status --short
```

Sortie :

```text
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/
```

## 2. Creation de session via script officiel

Commande :

```powershell
.\create_session.ps1 -Stage 1-ALPHA -Block A1 -SessionCode T0-02 -Type CADRAGE -Title "Gouvernance P1"
```

Sortie :

```text
Session creee : SESSION-20260615-04_A1_T0-02
Dossier session : .\docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02
Dossier patch   : .\docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\PATCH
Presse-papiers  : OK
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
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/PATCH/NO_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/PATCH/NO_PATCH_CODE.md`

Sessions P1-02 a P1-07-FIX-01 non relues pendant T0-02 : T0-01 les avait deja auditees et les questions T0-02 sont issues de sa cloture validee.

## 4. Fichiers crees

Crees par `create_session.ps1`, puis renseignes pendant T0-02 :

- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/PATCH/NO_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/PATCH/NO_PATCH_CODE.md`

## 5. Fichiers modifies

Uniquement les fichiers de session T0-02 listes ci-dessus.

## 6. Fichiers supprimes

Aucun fichier supprime.

## 7. Fichiers deplaces ou renommes

Aucun fichier deplace ou renomme.

## 8. Preuve structure session

Commande :

```powershell
$session='docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02'; Test-Path "$session\1-SESSION.md"; Test-Path "$session\2-PREUVES.md"; Test-Path "$session\3-FIN_DE_SESSION.md"; Test-Path "$session\PATCH"; Test-Path "$session\PATCH\NO_PATCH_CODE.md"; Test-Path "$session\PATCH\NO_PATCH.md"
```

Sortie :

```text
True
True
True
True
True
True
```

## 9. Preuve absence modification code

Commande :

```powershell
git diff --name-only -- app lib prisma package.json package-lock.json
```

Sortie :

```text
```

## 10. Preuve absence modification Prisma/package

Commande :

```powershell
git diff --name-only -- prisma package.json package-lock.json
```

Sortie :

```text
```

## 11. Preuve absence modification Base44

Commande :

```powershell
git diff --name-only -- docs/1-MASTER/4-BASE44_REFERENCE
```

Sortie :

```text
```

## 12. Preuve absence modification MASTER

Commande :

```powershell
git status --short --untracked-files=all -- docs/1-MASTER/*.md
```

Sortie :

```text
```

## 13. Preuve absence renommage

Commande :

```powershell
git status --short --renames
```

Sortie :

```text
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/
```

Interpretation : aucun statut `R` observe. Les deux dossiers non suivis correspondent a T0-01 deja present au statut initial et a T0-02 creee dans cette session.

## 14. Preuve presence `PATCH/NO_PATCH_CODE.md`

Commande :

```powershell
Test-Path 'docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\PATCH\NO_PATCH_CODE.md'
```

Sortie :

```text
True
```

## 15. Preuve presence `PATCH/NO_PATCH.md`

Commande :

```powershell
Test-Path 'docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\PATCH\NO_PATCH.md'
```

Sortie :

```text
True
```

## 16. Controle UTF-8 sans BOM

Commande exacte :

```powershell
$files=@('docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\1-SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\2-PREUVES.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\3-FIN_DE_SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\PATCH\NO_PATCH.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\PATCH\NO_PATCH_CODE.md'); foreach($file in $files){ $bytes=[System.IO.File]::ReadAllBytes((Resolve-Path $file)); [pscustomobject]@{File=$file; Bom=($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF)} }
```

Sortie :

```text
File                                                                                  Bom
----                                                                                  ---
docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\1-SESSION.md           False
docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\2-PREUVES.md           False
docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\3-FIN_DE_SESSION.md    False
docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\PATCH\NO_PATCH.md      False
docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\PATCH\NO_PATCH_CODE.md False
```

## 17. Controle absence de sequences suspectes / mojibake

Commande exacte, avec marqueurs construits par codepoints pour eviter d'inserer les sequences suspectes dans ce fichier :

```powershell
$files=@('docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\1-SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\2-PREUVES.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\3-FIN_DE_SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\PATCH\NO_PATCH.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-04_A1_T0-02\PATCH\NO_PATCH_CODE.md'); $markers=@((-join ([char[]](0x00C3))),(-join ([char[]](0x00C2))),(-join ([char[]](0x00E2,0x20AC))),(-join ([char[]](0xFFFD)))); foreach($file in $files){ $content=[System.IO.File]::ReadAllText((Resolve-Path $file), [System.Text.UTF8Encoding]::new($false)); foreach($marker in $markers){ if($content.Contains($marker)){ [pscustomobject]@{File=$file; MarkerCodepoints=($marker.ToCharArray() | ForEach-Object { 'U+{0:X4}' -f [int][char]$_ }) -join ' '} } } }
```

Sortie :

```text
```

## 18. Git status final

Commande :

```powershell
git status --short
```

Sortie :

```text
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/
```

## 19. Git status final detaille

Commande :

```powershell
git status --short --untracked-files=all
```

Sortie :

```text
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/1-SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/2-PREUVES.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/3-FIN_DE_SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/PATCH/NO_PATCH.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/PATCH/NO_PATCH_CODE.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/1-SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/2-PREUVES.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/3-FIN_DE_SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/PATCH/NO_PATCH.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-04_A1_T0-02/PATCH/NO_PATCH_CODE.md
```

## 20. Commandes non executees

- `npm run lint` : non execute, session documentaire sans code.
- `npm run build` : non execute, session documentaire sans code.
- Tests applicatifs : non executes, session documentaire sans code.
- Migration Prisma : non executee, interdite.
- `prisma generate` : non execute, interdit.
- Patch code : non produit, interdit.
