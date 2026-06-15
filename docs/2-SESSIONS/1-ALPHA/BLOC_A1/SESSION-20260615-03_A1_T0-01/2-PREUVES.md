# 2 - Preuves

## 1. Git status initial

Commande executee avant creation de session :

```powershell
git status --short
```

Sortie :

```text
```

## 2. Creation de session via script officiel

Commande :

```powershell
& .\create_session.ps1 -Stage 1-ALPHA -Block A1 -SessionCode T0-01 -Type AUDIT -Title "Audit cible coherence P1-02 a P1-07-FIX-01"
```

Sortie :

```text
Session creee : SESSION-20260615-03_A1_T0-01
Dossier session : .\docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01
Dossier patch   : .\docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01\PATCH
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
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-02_A1_P1-02/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-03_A1_P1-03/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-04_A1_P1-04/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-05_A1_P1-05/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01/`
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`

Non lu car non necessaire a l'audit documentaire general : `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/App.jsx`.

## 4. Fichiers crees / modifies

- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/PATCH/NO_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/PATCH/NO_PATCH_CODE.md`

Fichiers supprimes, deplaces ou renommes : aucun.

## 5. Structure de session T0-01

Commande :

```powershell
$session='docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01'; Test-Path "$session\1-SESSION.md"; Test-Path "$session\2-PREUVES.md"; Test-Path "$session\3-FIN_DE_SESSION.md"; Test-Path "$session\PATCH"; Test-Path "$session\PATCH\NO_PATCH_CODE.md"; Test-Path "$session\PATCH\NO_PATCH.md"
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

## 6. Preuve absence modification code

Commande :

```powershell
git diff --name-only -- app lib prisma package.json package-lock.json
```

Sortie :

```text
```

## 7. Preuve absence modification Base44

Commande :

```powershell
git diff --name-only -- docs/1-MASTER/4-BASE44_REFERENCE
```

Sortie :

```text
```

## 8. Preuve absence modification MASTER

Commande :

```powershell
git status --short --untracked-files=all -- docs/1-MASTER/*.md
```

Sortie :

```text
```

## 9. Git status final

Commande :

```powershell
git status --short
```

Sortie observee apres redaction finale :

```text
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/
```

## 10. Git status final detaille

Commande :

```powershell
git status --short --untracked-files=all
```

Sortie observee apres redaction finale :

```text
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/1-SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/2-PREUVES.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/3-FIN_DE_SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/PATCH/NO_PATCH.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/PATCH/NO_PATCH_CODE.md
```

## 11. Controle UTF-8 sans BOM

Commande exacte :

```powershell
$files=@('docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01\1-SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01\2-PREUVES.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01\3-FIN_DE_SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01\PATCH\NO_PATCH.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01\PATCH\NO_PATCH_CODE.md'); foreach($file in $files){ $bytes=[System.IO.File]::ReadAllBytes((Resolve-Path $file)); [pscustomobject]@{File=$file; Bom=($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF)} }
```

Resultat observe : `Bom` vaut `False` pour chaque fichier controle.

## 12. Controle absence de sequences suspectes / mojibake

Commande exacte, avec marqueurs construits par codepoints pour ne pas inserer les sequences suspectes dans ce fichier de preuve :

```powershell
$files=@('docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01\1-SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01\2-PREUVES.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01\3-FIN_DE_SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01\PATCH\NO_PATCH.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01\PATCH\NO_PATCH_CODE.md'); $markers=@((-join ([char[]](0x00C3,0x0192))),(-join ([char[]](0x00C3,0x201A))),(-join ([char[]](0x00C3,0x00A2,0x00E2,0x201A,0x00AC))),(-join ([char[]](0x00EF,0x00BF,0x00BD))),(-join ([char[]](0x0052,0x003F,0x0073,0x0075,0x006D,0x003F))),(-join ([char[]](0x0050,0x003F,0x0072,0x0069,0x006D,0x003F,0x0074,0x0072,0x0065))),(-join ([char[]](0x006D,0x006F,0x0064,0x0069,0x0066,0x0069,0x003F))),(-join ([char[]](0x0063,0x0072,0x003F,0x003F)))); foreach($file in $files){ $content=[System.IO.File]::ReadAllText((Resolve-Path $file), [System.Text.UTF8Encoding]::new($false)); foreach($marker in $markers){ if($content.Contains($marker)){ [pscustomobject]@{File=$file; Marker=$marker} } } }
```

Resultat observe : sortie vide.

## 13. Preuve `PATCH/NO_PATCH_CODE.md`

Commande :

```powershell
Test-Path 'docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01\PATCH\NO_PATCH_CODE.md'
```

Sortie :

```text
True
```

## 14. Preuve `PATCH/NO_PATCH.md`

Commande :

```powershell
Test-Path 'docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-03_A1_T0-01\PATCH\NO_PATCH.md'
```

Sortie :

```text
True
```

## 15. Constats d'audit documentes

- `04` reste le plan maitre court et fixe l'ordre global.
- `05` est une declinaison operationnelle lisible et indique explicitement ne pas concurrencer `04`.
- Les decisions humaines P1-03 sont prises en compte.
- Les anciennes logiques sont marquees comme historiques et ne pilotent plus l'ordre principal.
- Les audits cibles de `05` doivent produire des questions utilisateur au lieu d'arbitrer seuls.
- Ecart principal : `04` recommande encore `T0-03`, alors que `05` prevoit T0-01 puis T0-02.
- Questions utilisateur produites dans `3-FIN_DE_SESSION.md`.

## 16. Commandes non executees

- `npm run lint` : non execute, aucun code modifie.
- `npm run build` : non execute, aucun code modifie.
- Tests applicatifs : non executes, session documentaire.
- Migration Prisma : non executee, interdite.
- Prisma generate : non execute, interdit.
- Lecture `EXPORT_BASE44/src/App.jsx` : non executee, non necessaire pour le niveau de coherence documentaire audite.
