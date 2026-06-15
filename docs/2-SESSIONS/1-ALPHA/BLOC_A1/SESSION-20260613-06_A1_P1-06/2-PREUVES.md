# 2 - Preuves

## 1. Git status initial

Commande :

```powershell
git status --short
```

Resultat initial :

```text
 M docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-05_A1_P1-05/
```

## 2. Commande de creation de session

Commande executee :

```powershell
.\create_session.ps1 -Stage 1-ALPHA -Block A1 -SessionCode P1-06 -Type DOCUMENTATION -Title "Creation du fichier MASTER 05-BLOCS_SESSIONS_PRODUCTION"
```

Resultat utile :

```text
Session creee : SESSION-20260613-06_A1_P1-06
Dossier session : .\docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06
Dossier patch   : .\docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\PATCH
```

## 3. Fichiers lus

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-02_A1_P1-02/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-03_A1_P1-03/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-04_A1_P1-04/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-05_A1_P1-05/`
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/App.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/` inventorie

## 4. Fichiers crees/modifies

Fichiers crees :

- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/PATCH/NO_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/PATCH/NO_PATCH_CODE.md`

Fichiers modifies :

- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- les fichiers de session P1-06 ci-dessus, renseignes apres creation par script.

## 5. Structure de session

Commande :

```powershell
Test-Path 'docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\1-SESSION.md'; Test-Path 'docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\2-PREUVES.md'; Test-Path 'docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\3-FIN_DE_SESSION.md'; Test-Path 'docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\PATCH'
```

Resultat :

```text
True
True
True
True
```

## 6. Diff du plan maitre court modifie

Commande :

```powershell
git diff -- docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md
```

Resultat : diff produit. Attention : `04-PLAN_DE_DEVELOPPEMENT.md` etait deja modifie au debut de P1-06 par P1-05 ; le diff complet inclut donc l'etat P1-05 preexistant. Ajout P1-06 isole :

```text
Le detail operationnel des blocs, sessions de production, livrables attendus, types de sessions, controles, preuves et statuts est suivi dans `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`.
```

Commande d'isolation :

```powershell
Select-String -Path 'docs\1-MASTER\04-PLAN_DE_DEVELOPPEMENT.md' -Pattern '05-BLOCS_SESSIONS_PRODUCTION' -Context 1,1
```

Resultat : ligne 11 presente.

## 7. Diff du nouveau fichier 05

Commande demandee :

```powershell
git diff -- docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
```

Resultat : sortie vide car le fichier est non suivi.

Commande probante complementaire :

```powershell
git diff --no-index -- NUL docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
```

Resultat : diff de creation produit, `new file mode 100644`, 624 lignes mesurees, 24 blocs detectes.

## 8. Preuve absence modification code

Commande :

```powershell
git diff --name-only -- app lib prisma package.json package-lock.json
```

Resultat :

```text
SORTIE VIDE
```

## 9. Preuve absence modification Base44

Commande :

```powershell
git diff --name-only -- docs/1-MASTER/4-BASE44_REFERENCE
```

Resultat :

```text
SORTIE VIDE
```

## 10. Preuve absence modification des autres MASTER actifs

Commande :

```powershell
git status --short --untracked-files=all -- docs/1-MASTER
```

Resultat :

```text
 M docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md
?? docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
```

Commande complementaire :

```powershell
git diff --name-only -- docs/1-MASTER/01-APPLICATION_WEB.md docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md docs/1-MASTER/03-METHODE_DE_TRAVAIL.md docs/1-MASTER/RGPD_BASE_MINIMALE.md
```

Resultat :

```text
SORTIE VIDE
```

## 11. Git status final

Commande :

```powershell
git status --short
```

Resultat final apres controles :

```text
 M docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md
?? docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-05_A1_P1-05/
?? docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/
```

## 12. Git status final complet avec non suivis

Commande :

```powershell
git status --short --untracked-files=all
```

Resultat final apres controles :

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
```

## 13. Controle UTF-8 sans BOM

Commande exacte :

```powershell
$files=@('docs\1-MASTER\04-PLAN_DE_DEVELOPPEMENT.md','docs\1-MASTER\05-BLOCS_SESSIONS_PRODUCTION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\1-SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\2-PREUVES.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\3-FIN_DE_SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\PATCH\NO_PATCH.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\PATCH\NO_PATCH_CODE.md'); $bomResults=foreach ($file in $files) { $bytes=[System.IO.File]::ReadAllBytes((Resolve-Path $file)); [pscustomobject]@{File=$file; BOM=($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF)} }; $bomResults | Format-Table -AutoSize
```

Resultat : `BOM=False` pour chaque fichier controle.

## 14. Controle absence de sequences suspectes/mojibake

Commande exacte :

```powershell
$files=@('docs\1-MASTER\04-PLAN_DE_DEVELOPPEMENT.md','docs\1-MASTER\05-BLOCS_SESSIONS_PRODUCTION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\1-SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\2-PREUVES.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\3-FIN_DE_SESSION.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\PATCH\NO_PATCH.md','docs\2-SESSIONS\1-ALPHA\BLOC_A1\SESSION-20260613-06_A1_P1-06\PATCH\NO_PATCH_CODE.md'); $markers=@([string][char]0x00C3+[string][char]0x0192,[string][char]0x00C3+[string][char]0x201A,[string][char]0x00C3+[string][char]0x00A2+[string][char]0x00E2+[string][char]0x201A+[string][char]0x00AC,[string][char]0x00EF+[string][char]0x00BF+[string][char]0x00BD,[string][char]0xFFFD); foreach ($file in $files) { $content=[System.IO.File]::ReadAllText((Resolve-Path $file), [System.Text.UTF8Encoding]::new($false)); foreach ($marker in $markers) { if ($content.Contains($marker)) { [pscustomobject]@{File=$file; Marker=$marker} } } }
```

Resultat :

```text
SORTIE VIDE
```

## 15. Preuve PATCH documentaire ou NO_PATCH_CODE

Fichiers presents :

- `PATCH/NO_PATCH.md`
- `PATCH/NO_PATCH_CODE.md`

## 16. Limites et ecarts

- Le template genere par `create_session.ps1` contenait du mojibake dans les fichiers P1-06 initiaux ; les fichiers P1-06 ont ete reecrits en UTF-8 sans BOM et le controle mojibake final est vide.
- Une commande BOM avec pipeline direct apres `foreach` a echoue en syntaxe PowerShell ; elle a ete relancee avec `$bomResults`, resultat conforme.
- Aucun lint, build ou test applicatif lance, car aucune modification code n'a ete produite.
- P1-05 etait deja non suivi au debut de P1-06 et n'a pas ete modifie volontairement dans cette session.
