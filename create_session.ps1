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
$DocsSessionsRoot    = Join-Path $DocsRoot "2-sessions"
$DocsPatchesRoot     = Join-Path $DocsRoot "3-patches"
$SessionTemplateDir  = Join-Path $DocsSessionsRoot "SESSION-YYYYMMDD-XX"
$DefaultOpenInVSCode = $true

# --- Helpers ---
function Test-PathOrThrow {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        throw "Chemin introuvable : $Path. Lance le script a la racine du projet (dossier 'docs' present)."
    }
}

function New-DirectoryIfMissing {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
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
        default   { throw "Stage invalide. Valeurs autorisees : 1-ALPHA, 2-BETA, ALPHA, BETA." }
    }
}

function Test-BlockAllowedForStage {
    param(
        [string]$StageValue,
        [string]$BlockValue
    )

    switch ($StageValue) {
        "1-ALPHA" {
            if ($BlockValue -notmatch '^A([1-9]|1[0-3])$') {
                throw "Bloc invalide pour 1-ALPHA. Valeurs autorisees : A1 a A13."
            }
        }
        "2-BETA" {
            if ($BlockValue -notmatch '^B([1-4])$') {
                throw "Bloc invalide pour 2-BETA. Valeurs autorisees : B1 a B4."
            }
        }
        default {
            throw "Stage non gere : $StageValue"
        }
    }
}

function Get-CanonicalBlock {
    param([string]$Value)

    $clean = (Get-SafeString -Value $Value).ToUpperInvariant()

    if ($clean -match '^BLOC_((A([1-9]|1[0-3]))|(B([1-4])))$') {
        return $Matches[1]
    }
    if ($clean -match '^((A([1-9]|1[0-3]))|(B([1-4])))$') {
        return $Matches[1]
    }

    throw "Bloc invalide. Valeurs autorisees : A1 a A13, B1 a B4 (ou BLOC_A1 a BLOC_A13, BLOC_B1 a BLOC_B4)."
}

function Get-NormalizedLabel {
    param([string]$Value)

    $clean = (Get-SafeString -Value $Value).ToUpperInvariant()

    $replacements = [ordered]@{
        "À" = "A"
        "Â" = "A"
        "Ä" = "A"
        "Ç" = "C"
        "É" = "E"
        "È" = "E"
        "Ê" = "E"
        "Ë" = "E"
        "Î" = "I"
        "Ï" = "I"
        "Ô" = "O"
        "Ö" = "O"
        "Ù" = "U"
        "Û" = "U"
        "Ü" = "U"
    }

    foreach ($entry in $replacements.GetEnumerator()) {
        $clean = $clean.Replace($entry.Key, $entry.Value)
    }

    return ([regex]::Replace($clean, '\s+', ''))
}

function Get-CanonicalType {
    param([string]$Value)

    $normalized = Get-NormalizedLabel -Value $Value

    if ([string]::IsNullOrWhiteSpace($normalized)) {
        throw "Type invalide. Valeurs autorisees : AUDIT, CORRECTION, COMPLETION, VALIDATION, CORRECTION-COMPLETION, VALIDATION+CORRECTION+COMPLETION."
    }

    # Aliases / syntaxes acceptees :
    # - COMPLÉTION => COMPLETION
    # - CORRECTION-COMPLETION => CORRECTION+COMPLETION
    # - VALIDATION+CORRECTION+COMPLETION => conserve les 3 etats
    # - Separateurs acceptes : + / , ; |
    $normalized = $normalized.Replace("CORRECTION-COMPLETION", "CORRECTION+COMPLETION")
    $normalized = $normalized -replace '[\/,;|]', '+'

    $rawTokens = @(
        $normalized -split '\+' |
        Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
    )

    if ($rawTokens.Count -eq 0) {
        throw "Type invalide. Valeurs autorisees : AUDIT, CORRECTION, COMPLETION, VALIDATION, CORRECTION-COMPLETION, VALIDATION+CORRECTION+COMPLETION."
    }

    $allowedTokens = @("AUDIT", "CORRECTION", "COMPLETION", "VALIDATION")
    $canonicalTokens = New-Object System.Collections.Generic.List[string]

    foreach ($token in $rawTokens) {
        if ($token -notin $allowedTokens) {
            throw "Type invalide. Valeurs autorisees : AUDIT, CORRECTION, COMPLETION, VALIDATION, CORRECTION-COMPLETION, VALIDATION+CORRECTION+COMPLETION."
        }

        if (-not $canonicalTokens.Contains($token)) {
            $canonicalTokens.Add($token)
        }
    }

    return ($canonicalTokens -join '+')
}

function Test-TypeRequiresPatch {
    param([string]$TypeValue)

    $tokens = @(
        $TypeValue -split '\+' |
        Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
    )

    return (($tokens | Where-Object { $_ -in @("CORRECTION", "COMPLETION") }).Count -gt 0)
}

function Read-ValueIfMissing {
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

INFORMATION NON FOURNIE - A CONFIRMER

## Perimetre exact traite

INFORMATION NON FOURNIE - A CONFIRMER

## Resultat synthetique de session

INFORMATION NON FOURNIE - A CONFIRMER

## Dossiers lies

- Session : $SessionRelativePath
- Patchs  : $PatchRelativePath
"@
    Set-Content -Path $sessionMdPath -Value $sessionContent -Encoding utf8

    if (-not (Test-Path $notesMdPath)) {
        Set-Content -Path $notesMdPath -Value "# NOTES`n`nINFORMATION NON FOURNIE - A CONFIRMER" -Encoding utf8
    }
    if (-not (Test-Path $evidencesMdPath)) {
        Set-Content -Path $evidencesMdPath -Value "# EVIDENCES`n`nINFORMATION NON FOURNIE - A CONFIRMER" -Encoding utf8
    }
    if (-not (Test-Path $resultatsMdPath)) {
        Set-Content -Path $resultatsMdPath -Value "# RESULTATS`n`nINFORMATION NON FOURNIE - A CONFIRMER" -Encoding utf8
    }
    if (-not (Test-Path $finSessionPath)) {
        Set-Content -Path $finSessionPath -Value "# FIN_SESSION`n`nINFORMATION NON FOURNIE - A CONFIRMER" -Encoding utf8
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

    $patchFileName = "PATCH__{0}.diff" -f $SessionId
    $readmePatchPath = Join-Path $PatchDir "README_PATCH.md"
    $noPatchPath = Join-Path $PatchDir "NO_PATCH.md"

    if (-not (Test-TypeRequiresPatch -TypeValue $TypeValue)) {
$noPatchContent = @"
# NO_PATCH

Session : $SessionId

Type : $TypeValue

Raison :
- Session documentaire de type $TypeValue.
- Aucun patch officiel a produire pour cette session.
- Le dossier patch reste present pour conserver le miroir avec docs/2-sessions.
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
$Stage = Read-ValueIfMissing -CurrentValue $Stage -PromptText "Stage (1-ALPHA / 2-BETA)"
$Block = Read-ValueIfMissing -CurrentValue $Block -PromptText "Bloc (A1 a A13 / B1 a B4)"
$SessionCode = Read-ValueIfMissing -CurrentValue $SessionCode -PromptText "Code session (ex: AUTH-01)"
$Type = Read-ValueIfMissing -CurrentValue $Type -PromptText "Type (AUDIT / CORRECTION / COMPLETION / VALIDATION / CORRECTION-COMPLETION / VALIDATION+CORRECTION+COMPLETION)"
$Title = Read-ValueIfMissing -CurrentValue $Title -PromptText "Intitule de la session"

$Stage = Get-CanonicalStage -Value $Stage
$Block = Get-CanonicalBlock -Value $Block
Test-BlockAllowedForStage -StageValue $Stage -BlockValue $Block
$SessionCode = (Get-SafeString -Value $SessionCode).ToUpperInvariant()
$Type = Get-CanonicalType -Value $Type
$Title = Get-SafeString -Value $Title

if ([string]::IsNullOrWhiteSpace($SessionCode)) {
    throw "Le code session est obligatoire (ex: AUTH-01)."
}
if ([string]::IsNullOrWhiteSpace($Title)) {
    throw "L'intitule de session est obligatoire."
}
if ($SessionCode -notmatch '^[A-Z0-9_-]+$') {
    throw "Le code session ne doit contenir que des lettres majuscules, chiffres, tirets et underscores."
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
Ensure-Directory $blockSessionsRoot
Ensure-Directory $blockPatchesRoot

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

$sessionRelativePath = (Join-Path "docs/2-sessions/$Stage/$blockDirName" $sessionId) -replace '\\','/'
$patchRelativePath   = (Join-Path "docs/3-patches/$Stage/$blockDirName"  $sessionId) -replace '\\','/'

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
- Si le type ne contient que AUDIT et/ou VALIDATION : NO_PATCH.md
- Si le type contient CORRECTION et/ou COMPLETION : README_PATCH.md puis patch officiel unique si code modifie
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
