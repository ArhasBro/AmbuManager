# ==============================
# create_session.ps1
# ==============================

[CmdletBinding()]
param(
    [string]$Stage,
    [string]$Block,
    [string]$SessionCode,
    [string]$Type,
    [string]$Title,
    [switch]$OpenInVSCode
)

$ErrorActionPreference = "Stop"

# --- CONFIG ---
$DocsRoot            = ".\docs"
$DocsSessionsRoot    = Join-Path $DocsRoot "sessions"
$DocsPatchesRoot     = Join-Path $DocsRoot "patches"
$SessionTemplateDir  = Join-Path $DocsSessionsRoot "SESSION-YYYYMMDD-XX"
$DefaultOpenInVSCode = $true

# --- Helpers ---
function Test-PathOrThrow {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        throw "Chemin introuvable : $Path. Lance le script a la racine du projet (dossier 'docs' present)."
    }
}

function Ensure-Directory {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Remove-GitKeepIfNeeded {
    param([string]$DirectoryPath)

    $gitkeepPath = Join-Path $DirectoryPath ".gitkeep"
    if (Test-Path $gitkeepPath) {
        Remove-Item $gitkeepPath -Force
    }
}


function Get-BlockTitle {
    param(
        [string]$StageValue,
        [string]$BlockValue
    )

    $map = @{
        "1-ALPHA|A1"  = "Acces, Auth, Multi-tenant, Permissions, API"
        "1-ALPHA|A2"  = "Structure societe, profil societe, bases / depots, role support"
        "1-ALPHA|A3"  = "Utilisateurs"
        "1-ALPHA|A4"  = "Vehicules et conformite documentaire minimale"
        "1-ALPHA|A5"  = "Regles metier et parametres societe"
        "1-ALPHA|A6"  = "Shift templates"
        "1-ALPHA|A7"  = "Dashboard"
        "1-ALPHA|A8"  = "Planning manuel"
        "1-ALPHA|A9"  = "Autoschedule"
        "1-ALPHA|A10" = "Matching"
        "1-ALPHA|A11" = "Audit / tracabilite"
        "1-ALPHA|A12" = "Exports, onboarding et imports"
        "1-ALPHA|A13" = "Qualite, documentation, gel ALPHA"
        "2-BETA|B1"   = "Alertes applicatives"
        "2-BETA|B2"   = "Autoschedule mensuel et regles avancees"
        "2-BETA|B3"   = "RBAC enrichi et multi-role"
        "2-BETA|B4"   = "Historique enrichi"
    }

    $key = "{0}|{1}" -f $StageValue, $BlockValue
    if ($map.ContainsKey($key)) {
        return $map[$key]
    }

    return "INFORMATION NON FOURNIE — A CONFIRMER"
}

function Ensure-BlockReadme {
    param(
        [string]$DirectoryPath,
        [string]$StageValue,
        [string]$BlockValue,
        [string]$Kind
    )

    Ensure-Directory $DirectoryPath
    Remove-GitKeepIfNeeded -DirectoryPath $DirectoryPath

    $title = Get-BlockTitle -StageValue $StageValue -BlockValue $BlockValue
    $readmePath = Join-Path $DirectoryPath "README.md"

    if ($Kind -eq "sessions") {
        $content = @"
# BLOC_$BlockValue

Maturite : $StageValue  
Bloc : $BlockValue  
Intitule officiel : $title

Reference : `docs/master/PLAN_DE_DEVELOPPEMENT.md`

Ce dossier contient les **sessions documentaires** du bloc $BlockValue.

Regle :
- 1 session = 1 point clair
- 1 session = 1 fonctionnalite
- 1 session = 1 DoD
- 1 session = 1 validation
"@
    }
    else {
        $content = @"
# BLOC_$BlockValue

Maturite : $StageValue  
Bloc : $BlockValue  
Intitule officiel : $title

Reference : `docs/master/PLAN_DE_DEVELOPPEMENT.md`

Ce dossier contient les **artefacts de patch** rattaches aux sessions du bloc $BlockValue.

Regle :
- 1 session = 1 patch officiel maximum
- AUDIT / VALIDATION = `NO_PATCH.md`
- CORRECTION / COMPLETION = `README_PATCH.md` puis patch officiel unique si necessaire
"@
    }

    Set-Content -Path $readmePath -Value $content -Encoding utf8
}

function Get-SafeString {
    param([string]$Value)

    if ($null -eq $Value) {
        return ""
    }

    return $Value.Trim()
}

function Get-CanonicalStage {
    param([string]$Value)

    $clean = (Get-SafeString -Value $Value).ToUpperInvariant()

    switch ($clean) {
        "1-ALPHA" { return "1-ALPHA" }
        "ALPHA"   { return "1-ALPHA" }
        "A"       { return "1-ALPHA" }
        "2-BETA"  { return "2-BETA" }
        "BETA"    { return "2-BETA" }
        "B"       { return "2-BETA" }
        default    { throw "Stage invalide. Valeurs autorisees : 1-ALPHA, 2-BETA, ALPHA, BETA." }
    }
}

function Get-CanonicalBlock {
    param(
        [string]$Value,
        [string]$StageValue
    )

    $clean = (Get-SafeString -Value $Value).ToUpperInvariant()

    if ($StageValue -eq "1-ALPHA") {
        if ($clean -match '^BLOC_(A([1-9]|1[0-3]))$') {
            return $Matches[1]
        }
        if ($clean -match '^(A([1-9]|1[0-3]))$') {
            return $Matches[1]
        }

        throw "Bloc invalide pour 1-ALPHA. Valeurs autorisees : A1 a A13 (ou BLOC_A1 a BLOC_A13)."
    }

    if ($StageValue -eq "2-BETA") {
        if ($clean -match '^BLOC_(B([1-4]))$') {
            return $Matches[1]
        }
        if ($clean -match '^(B([1-4]))$') {
            return $Matches[1]
        }

        throw "Bloc invalide pour 2-BETA. Valeurs autorisees : B1 a B4 (ou BLOC_B1 a BLOC_B4)."
    }

    throw "Stage non supporte pour la resolution du bloc : $StageValue"
}

function Get-CanonicalType {
    param([string]$Value)

    $clean = (Get-SafeString -Value $Value).ToUpperInvariant()

    switch ($clean) {
        "AUDIT"       { return "AUDIT" }
        "CORRECTION"  { return "CORRECTION" }
        "COMPLETION"  { return "COMPLÉTION" }
        "COMPLÉTION"  { return "COMPLÉTION" }
        "VALIDATION"  { return "VALIDATION" }
        default        { throw "Type invalide. Valeurs autorisees : AUDIT, CORRECTION, COMPLÉTION, VALIDATION." }
    }
}

function Prompt-IfMissing {
    param(
        [string]$CurrentValue,
        [string]$PromptText
    )

    if ([string]::IsNullOrWhiteSpace($CurrentValue)) {
        return (Read-Host $PromptText)
    }

    return $CurrentValue
}

function Get-NextSessionOrdinal {
    param(
        [string]$StageSessionsRoot,
        [string]$DateToken
    )

    $pattern = "^SESSION-$DateToken-(\d{2})_"
    $max = 0

    if (Test-Path $StageSessionsRoot) {
        Get-ChildItem -Path $StageSessionsRoot -Directory -Recurse | ForEach-Object {
            if ($_.Name -match $pattern) {
                $value = [int]$Matches[1]
                if ($value -gt $max) {
                    $max = $value
                }
            }
        }
    }

    return ($max + 1)
}

function Set-SessionIdInFile {
    param(
        [string]$FilePath,
        [string]$SessionId
    )

    if (-not (Test-Path $FilePath)) {
        return
    }

    $content = Get-Content $FilePath -Raw
    $content = $content -replace "SESSION-YYYYMMDD-XX", $SessionId
    Set-Content -Path $FilePath -Value $content -Encoding utf8
}

function Initialize-SessionFiles {
    param(
        [string]$SessionDir,
        [string]$SessionId,
        [string]$DateDisplay,
        [string]$StageValue,
        [string]$BlockValue,
        [string]$TypeValue,
        [string]$TitleValue,
        [string]$SessionRelativePath,
        [string]$PatchRelativePath
    )

    $sessionMdPath   = Join-Path $SessionDir "SESSION.md"
    $notesMdPath     = Join-Path $SessionDir "NOTES.md"
    $evidencesMdPath = Join-Path $SessionDir "EVIDENCES.md"
    $resultatsMdPath = Join-Path $SessionDir "RESULTATS.md"
    $finSessionPath  = Join-Path $SessionDir "FIN_SESSION.md"

    Set-SessionIdInFile -FilePath $sessionMdPath   -SessionId $SessionId
    Set-SessionIdInFile -FilePath $notesMdPath     -SessionId $SessionId
    Set-SessionIdInFile -FilePath $evidencesMdPath -SessionId $SessionId
    Set-SessionIdInFile -FilePath $resultatsMdPath -SessionId $SessionId
    Set-SessionIdInFile -FilePath $finSessionPath  -SessionId $SessionId

    $sessionContent = @"
# SESSION

## ID SESSION

$SessionId

## Date

$DateDisplay

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturite : $StageValue  
Bloc : $BlockValue  
Type : $TypeValue  
Intitule : $TitleValue

## Objectif de la session

INFORMATION NON FOURNIE — A CONFIRMER

## Perimetre exact traite

INFORMATION NON FOURNIE — A CONFIRMER

## Resultat synthetique de session

INFORMATION NON FOURNIE — A CONFIRMER

## Dossiers lies

- Session : $SessionRelativePath
- Patchs  : $PatchRelativePath
"@
    Set-Content -Path $sessionMdPath -Value $sessionContent -Encoding utf8

    if (-not (Test-Path $notesMdPath)) {
        Set-Content -Path $notesMdPath -Value "# NOTES`n`nINFORMATION NON FOURNIE — A CONFIRMER" -Encoding utf8
    }
    if (-not (Test-Path $evidencesMdPath)) {
        Set-Content -Path $evidencesMdPath -Value "# EVIDENCES`n`nINFORMATION NON FOURNIE — A CONFIRMER" -Encoding utf8
    }
    if (-not (Test-Path $resultatsMdPath)) {
        Set-Content -Path $resultatsMdPath -Value "# RESULTATS`n`nINFORMATION NON FOURNIE — A CONFIRMER" -Encoding utf8
    }
    if (-not (Test-Path $finSessionPath)) {
        Set-Content -Path $finSessionPath -Value "# FIN_SESSION`n`nINFORMATION NON FOURNIE — A CONFIRMER" -Encoding utf8
    }
}

function Initialize-PatchFolder {
    param(
        [string]$PatchDir,
        [string]$SessionId,
        [string]$TypeValue,
        [string]$PatchRelativePath
    )

    Ensure-Directory $PatchDir
    Remove-GitKeepIfNeeded -DirectoryPath $PatchDir

    $patchFileName = "PATCH__{0}.diff" -f $SessionId
    $readmePatchPath = Join-Path $PatchDir "README_PATCH.md"
    $noPatchPath = Join-Path $PatchDir "NO_PATCH.md"

    if ($TypeValue -in @("AUDIT", "VALIDATION")) {
        $noPatchContent = @"
# NO_PATCH

Session : $SessionId

Type : $TypeValue

Raison :
- Session documentaire de type $TypeValue.
- Aucun patch officiel a produire pour cette session.
- Le dossier patch reste present pour conserver le miroir avec docs/sessions.
"@
        Set-Content -Path $noPatchPath -Value $noPatchContent -Encoding utf8
        if (Test-Path $readmePatchPath) {
            Remove-Item $readmePatchPath -Force
        }
    }
    else {
        $readmePatchContent = @"
# README_PATCH

## Session liee
$SessionId

## Type
$TypeValue

## Dossier patch
$PatchRelativePath

## Patch officiel attendu
$patchFileName

## Commandes d'application

```bash
git apply --check "$PatchRelativePath/$patchFileName"
git apply         "$PatchRelativePath/$patchFileName"
```

## Statut
- Dossier patch initialise.
- Patch officiel a produire dans cette session si du code est modifie.
"@
        Set-Content -Path $readmePatchPath -Value $readmePatchContent -Encoding utf8
        if (Test-Path $noPatchPath) {
            Remove-Item $noPatchPath -Force
        }
    }
}

# --- Interactive fallback ---
$Stage = Prompt-IfMissing -CurrentValue $Stage -PromptText "Stage (1-ALPHA / 2-BETA)"
$Block = Prompt-IfMissing -CurrentValue $Block -PromptText "Bloc (A1 a A13 pour ALPHA / B1 a B4 pour BETA)"
$SessionCode = Prompt-IfMissing -CurrentValue $SessionCode -PromptText "Code session (ex: AUTH-01)"
$Type = Prompt-IfMissing -CurrentValue $Type -PromptText "Type (AUDIT / CORRECTION / COMPLETION / VALIDATION)"
$Title = Prompt-IfMissing -CurrentValue $Title -PromptText "Intitule de la session"

$Stage = Get-CanonicalStage -Value $Stage
$Block = Get-CanonicalBlock -Value $Block -StageValue $Stage
$SessionCode = (Get-SafeString -Value $SessionCode).ToUpperInvariant()
$Type = Get-CanonicalType -Value $Type
$Title = Get-SafeString -Value $Title

if ([string]::IsNullOrWhiteSpace($SessionCode)) {
    throw "Le code session est obligatoire (ex: AUTH-01)."
}
if ([string]::IsNullOrWhiteSpace($Title)) {
    throw "L'intitule de session est obligatoire."
}
if ($SessionCode -notmatch '^[A-Z0-9-]+$') {
    throw "Le code session ne doit contenir que des lettres majuscules, chiffres et tirets."
}

# --- Checks ---
Test-PathOrThrow $DocsSessionsRoot
Test-PathOrThrow $DocsPatchesRoot
Test-PathOrThrow $SessionTemplateDir

$stageSessionsRoot = Join-Path $DocsSessionsRoot $Stage
$stagePatchesRoot  = Join-Path $DocsPatchesRoot  $Stage
$blockDirName      = "BLOC_{0}" -f $Block
$blockSessionsRoot = Join-Path $stageSessionsRoot $blockDirName
$blockPatchesRoot  = Join-Path $stagePatchesRoot  $blockDirName

Ensure-Directory $stageSessionsRoot
Ensure-Directory $stagePatchesRoot
Ensure-BlockReadme -DirectoryPath $blockSessionsRoot -StageValue $Stage -BlockValue $Block -Kind "sessions"
Ensure-BlockReadme -DirectoryPath $blockPatchesRoot -StageValue $Stage -BlockValue $Block -Kind "patches"

$dateToken   = Get-Date -Format "yyyyMMdd"
$dateDisplay = Get-Date -Format "dd/MM/yyyy"
$nextOrdinal = Get-NextSessionOrdinal -StageSessionsRoot $stageSessionsRoot -DateToken $dateToken
$sessionId   = "SESSION-{0}-{1:D2}_{2}_{3}" -f $dateToken, $nextOrdinal, $Block, $SessionCode

$newSessionDir = Join-Path $blockSessionsRoot $sessionId
$newPatchDir   = Join-Path $blockPatchesRoot  $sessionId

if (Test-Path $newSessionDir) {
    throw "Le dossier de session existe deja : $newSessionDir"
}
if (Test-Path $newPatchDir) {
    throw "Le dossier de patch existe deja : $newPatchDir"
}

Copy-Item -Recurse -Force $SessionTemplateDir $newSessionDir

$sessionRelativePath = (Join-Path "docs/sessions/$Stage/$blockDirName" $sessionId) -replace '\\','/'
$patchRelativePath   = (Join-Path "docs/patches/$Stage/$blockDirName"  $sessionId) -replace '\\','/'

Initialize-SessionFiles `
    -SessionDir $newSessionDir `
    -SessionId $sessionId `
    -DateDisplay $dateDisplay `
    -StageValue $Stage `
    -BlockValue $Block `
    -TypeValue $Type `
    -TitleValue $Title `
    -SessionRelativePath $sessionRelativePath `
    -PatchRelativePath $patchRelativePath

Initialize-PatchFolder `
    -PatchDir $newPatchDir `
    -SessionId $sessionId `
    -TypeValue $Type `
    -PatchRelativePath $patchRelativePath

$startBlock = @"
ATTENTION - OUVERTURE OFFICIELLE DE SESSION - IA

Projet : Investissement
Sous-projet : Ambulance Manager

SESSION
- ID : $sessionId
- Maturite : $Stage
- Bloc : $Block
- Code session : $SessionCode
- Type : $Type
- Intitule : $Title

DOSSIERS
- Session : $sessionRelativePath
- Patchs  : $patchRelativePath

FICHIERS DE SESSION A UTILISER / METTRE A JOUR
- $sessionRelativePath/SESSION.md
- $sessionRelativePath/NOTES.md
- $sessionRelativePath/EVIDENCES.md
- $sessionRelativePath/RESULTATS.md
- $sessionRelativePath/FIN_SESSION.md

REGLES
- 1 session = 1 point clair
- 1 session = 1 fonctionnalite
- 1 session = 1 DoD
- 1 session = 1 validation
- 1 session = 1 patch officiel maximum
- Si session AUDIT ou VALIDATION : NO_PATCH.md
- Si session CORRECTION ou COMPLETION : README_PATCH.md puis patch officiel unique si code modifie
"@

$clipboardMsg = "Non disponible"
try {
    Set-Clipboard -Value $startBlock
    $clipboardMsg = "OK"
}
catch {
    $clipboardMsg = "Non disponible"
}

$shouldOpen = $DefaultOpenInVSCode
if ($OpenInVSCode.IsPresent) {
    $shouldOpen = $true
}

Write-Host ""
Write-Host "Session creee : $sessionId"
Write-Host "Dossier session : $newSessionDir"
Write-Host "Dossier patch   : $newPatchDir"
Write-Host "Presse-papiers  : $clipboardMsg"
Write-Host ""
Write-Host "=============================="
Write-Host "BLOC A COPIER-COLLER (DEBUT)"
Write-Host "=============================="
Write-Host $startBlock
Write-Host ""

if ($shouldOpen) {
    $codeCmd = Get-Command code -ErrorAction SilentlyContinue
    if ($null -ne $codeCmd) {
        code $newSessionDir $newPatchDir
    }
    else {
        Start-Process (Join-Path $newSessionDir "SESSION.md") | Out-Null
        Write-Host "Note: commande 'code' introuvable. SESSION.md ouvert avec l'application par defaut."
    }
}
