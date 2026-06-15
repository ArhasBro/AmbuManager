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
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/
```

État initial notable : `04`, `05`, P1-05, P1-06 et P1-07 étaient déjà modifiés ou non suivis avant P1-07-FIX-01.

## 2. Commande de création de session via script officiel

Commande :

```powershell
.\create_session.ps1 -Stage 1-ALPHA -Block A1 -SessionCode P1-07-FIX-01 -Type CORRECTION_DOCUMENTAIRE -Title "Correction encodage P1-07 et questions audit"
```

Résultat utile :

```text
Session creee : SESSION-20260615-02_A1_P1-07-FIX-01
Dossier session : .\docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-02_A1_P1-07-FIX-01
Dossier patch   : .\docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-02_A1_P1-07-FIX-01\PATCH
```

## 3. Fichiers lus

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/PATCH_DOCUMENTAIRE_05.diff`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/NO_PATCH_CODE.md`

## 4. Fichiers créés/modifiés

Fichiers modifiés :

- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/PATCH_DOCUMENTAIRE_05.diff`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01/3-FIN_DE_SESSION.md`

Fichiers créés :

- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01/PATCH/NO_PATCH_CODE.md`

## 5. Structure de session P1-07-FIX-01

Commande :

```powershell
$session='docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-02_A1_P1-07-FIX-01'
Test-Path "$session\1-SESSION.md"; Test-Path "$session\2-PREUVES.md"; Test-Path "$session\3-FIN_DE_SESSION.md"; Test-Path "$session\PATCH"; Test-Path "$session\PATCH\NO_PATCH_CODE.md"
```

Résultat :

```text
True
True
True
True
True
```

## 6. Diff complet de `05`

Commande demandée :

```powershell
git diff -- docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
```

Résultat :

```text
SORTIE VIDE
```

Explication : `05-BLOCS_SESSIONS_PRODUCTION.md` est non suivi depuis l'état initial. La commande demandée ne montre donc pas son contenu.

Commande complémentaire utilisée pour produire un diff complet lisible du fichier non suivi :

```powershell
git diff --no-index -- NUL docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
```

Le diff complet actualisé est fourni dans :

- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/PATCH_DOCUMENTAIRE_05.diff`

## 7. Diff complet des fichiers P1-07 corrigés

Commande demandée :

```powershell
git diff -- docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07
```

Résultat :

```text
SORTIE VIDE
```

Explication : le dossier P1-07 est non suivi depuis l'état initial. La commande demandée ne montre donc pas les fichiers P1-07. Les fichiers corrigés sont listés en section 4 et contrôlés en sections 8, 14 et 15.

## 8. Preuve encodage du patch corrigé

Commande :

```powershell
$patch='docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-01_A1_P1-07\PATCH\PATCH_DOCUMENTAIRE_05.diff'
$bytes=[System.IO.File]::ReadAllBytes((Resolve-Path $patch))
[pscustomobject]@{Utf16LE_BOM=($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE); Utf8_BOM=($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF); FirstBytes=(($bytes[0..3] | ForEach-Object { $_.ToString('X2') }) -join ' '); Utf8Readable=([System.IO.File]::ReadAllText((Resolve-Path $patch), [System.Text.UTF8Encoding]::new($false)).StartsWith('diff --git'))}
```

Résultat :

```text
Utf16LE_BOM=False
Utf8_BOM=False
FirstBytes=64 69 66 66
Utf8Readable=True
```

## 9. Preuve absence modification code

Commande :

```powershell
git diff --name-only -- app lib prisma package.json package-lock.json
```

Résultat :

```text
SORTIE VIDE
```

## 10. Preuve absence modification Base44

Commande :

```powershell
git diff --name-only -- docs/1-MASTER/4-BASE44_REFERENCE
```

Résultat :

```text
SORTIE VIDE
```

## 11. Preuve absence modification autres MASTER actifs

Commande :

```powershell
git status --short --untracked-files=all -- docs/1-MASTER
```

Résultat :

```text
 M docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md
?? docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
```

Écart documenté : `04-PLAN_DE_DEVELOPPEMENT.md` était déjà modifié dans le statut initial. P1-07-FIX-01 n'a pas modifié volontairement `04`.

Commande ciblée autres MASTER actifs hors `04` et `05` :

```powershell
git diff --name-only -- docs/1-MASTER/01-APPLICATION_WEB.md docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md docs/1-MASTER/03-METHODE_DE_TRAVAIL.md docs/1-MASTER/RGPD_BASE_MINIMALE.md
```

Résultat :

```text
SORTIE VIDE
```

## 12. Git status final

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
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01/
```

## 13. Git status final complet avec non suivis

Commande :

```powershell
git status --short --untracked-files=all
```

Résultat final :

```text
 M docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md
?? docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-05_A1_P1-05/1-SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-05_A1_P1-05/2-PREUVES.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-05_A1_P1-05/3-FIN_DE_SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-05_A1_P1-05/PATCH/NO_PATCH.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-05_A1_P1-05/PATCH/NO_PATCH_CODE.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/1-SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/2-PREUVES.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/3-FIN_DE_SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/PATCH/NO_PATCH.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/PATCH/NO_PATCH_CODE.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/1-SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/2-PREUVES.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/3-FIN_DE_SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/GENERATE_05_DOCUMENTAIRE.ps1
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/NO_PATCH.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/NO_PATCH_CODE.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/PATCH_DOCUMENTAIRE_05.diff
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01/1-SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01/2-PREUVES.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01/3-FIN_DE_SESSION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01/PATCH/NO_PATCH.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01/PATCH/NO_PATCH_CODE.md
```

## 14. Contrôle UTF-8 sans BOM

Commande exacte :

```powershell
$files=@('docs\1-MASTER\05-BLOCS_SESSIONS_PRODUCTION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-01_A1_P1-07\1-SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-01_A1_P1-07\2-PREUVES.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-01_A1_P1-07\3-FIN_DE_SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-01_A1_P1-07\PATCH\PATCH_DOCUMENTAIRE_05.diff','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-01_A1_P1-07\PATCH\NO_PATCH_CODE.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-02_A1_P1-07-FIX-01\1-SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-02_A1_P1-07-FIX-01\2-PREUVES.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-02_A1_P1-07-FIX-01\3-FIN_DE_SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-02_A1_P1-07-FIX-01\PATCH\NO_PATCH.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-02_A1_P1-07-FIX-01\PATCH\NO_PATCH_CODE.md'); foreach($file in $files){ $bytes=[System.IO.File]::ReadAllBytes((Resolve-Path $file)); [pscustomobject]@{File=$file; BOM=($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF)} }
```

Résultat :

```text
BOM=False pour chaque fichier contrôlé.
```

## 15. Contrôle absence de séquences suspectes/mojibake

Commande exacte :

```powershell
$markers=@([string][char]0x00C3,[string][char]0x00C2,([string][char]0x00E2+[string][char]0x20AC),[string][char]0xFFFD,('R'+'?'+'sum'+'?'),('P'+'?'+'rim'+'?'+'tre'),('modifi'+'?'),('cr'+'?'+'?')); foreach($file in $files){ $content=[System.IO.File]::ReadAllText((Resolve-Path $file), [System.Text.UTF8Encoding]::new($false)); foreach($marker in $markers){ if($content.Contains($marker)){ [pscustomobject]@{File=$file;Marker=$marker} } } }
```

Résultat :

```text
SORTIE VIDE
```

## 16. Preuve `NO_PATCH_CODE.md`

Commande :

```powershell
Test-Path 'docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260615-02_A1_P1-07-FIX-01\PATCH\NO_PATCH_CODE.md'
```

Résultat :

```text
True
```

## 17. Contrôles de contenu

Commande :

```powershell
Select-String -Path docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md -Pattern 'Questions pendant les audits ciblés|maximum 10 questions|templates'
```

Résultat utile :

```text
La section Questions pendant les audits ciblés est présente.
La règle maximum 10 questions prioritaires est présente.
Les artefacts autour de templates sont corrigés.
```

Commande :

```powershell
Select-String -Path docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md -Pattern '^### BLOC '
```

Résultat utile :

```text
24 blocs hors modèle conservés, ordre inchangé.
```

## 18. Limites / commandes non exécutées

- Aucun lint lancé : correction documentaire sans code.
- Aucun build lancé : correction documentaire sans code.
- Aucun test applicatif lancé : correction documentaire sans code.
- Aucune migration lancée.
- Aucune génération Prisma lancée.