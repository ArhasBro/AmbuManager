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
$DocsSessionsRoot    = Join-Path $DocsRoot "2-SESSIONS"
$PatchSubDirName     = "PATCH"
$SessionTemplateDir  = Join-Path $DocsSessionsRoot "SESSION-YYYYMMDD-XX"
$DefaultOpenInVSCode = $false

$AlphaBlockMin = 1
$AlphaBlockMax = 99
$BetaBlockMin  = 1
$BetaBlockMax  = 99

$AllowedTypeTokens = @(
    'AUDIT',
    'CORRECTION',
    'CORRECTION_DOCUMENTAIRE',
    'DOCUMENTATION',
    'COMPLETION',
    'VALIDATION',
    'CADRAGE',
    'DESIGN_SYSTEM',
    'MAQUETTES_FONDATRICES',
    'MAQUETTES_COMPLEMENTAIRES',
    'PAGES_SIMPLES_FINITIONS',
    'REFERENCE_UI_UX_CODEX',
    'CLOTURE_DOCUMENTAIRE',
    'PREPARATION_INTEGRATION_CODE'
)

function Get-BlockRangeLabel {
    param(
        [string]$Prefix,
        [int]$Min,
        [int]$Max
    )

    return "{0}{1} a {0}{2}" -f $Prefix, $Min, $Max
}

function Get-BlockRegexPattern {
    param(
        [string]$Prefix,
        [int]$Min,
        [int]$Max
    )

    $values = $Min..$Max | ForEach-Object { "{0}{1}" -f $Prefix, $_ }
    return '^(?:' + (($values | ForEach-Object { [regex]::Escape($_) }) -join '|') + ')$'
}

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

function Convert-ToPlainLabel {
    param([string]$Value)

    $clean = (Get-SafeString -Value $Value).ToUpperInvariant()
    if ([string]::IsNullOrWhiteSpace($clean)) {
        return ""
    }

    $normalizedForm = $clean.Normalize([Text.NormalizationForm]::FormD)
    $chars = foreach ($char in $normalizedForm.ToCharArray()) {
        if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($char) -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
            $char
        }
    }

    return ((-join $chars) -replace '\s+', '')
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
        "DEV-V2"  { return "DEV-V2" }
        "DEVV2"   { return "DEV-V2" }
        "V2"      { return "DEV-V2" }
        default   { throw "Stage invalide. Valeurs autorisees : 1-ALPHA, 2-BETA, DEV-V2, ALPHA, BETA." }
    }
}

function Test-BlockAllowedForStage {
    param(
        [string]$StageValue,
        [string]$BlockValue
    )

    switch ($StageValue) {
        "1-ALPHA" {
            $pattern = Get-BlockRegexPattern -Prefix "A" -Min $AlphaBlockMin -Max $AlphaBlockMax
            if ($BlockValue -notmatch $pattern) {
                throw "Bloc invalide pour 1-ALPHA. Valeurs autorisees : $(Get-BlockRangeLabel -Prefix 'A' -Min $AlphaBlockMin -Max $AlphaBlockMax)."
            }
        }
        "2-BETA" {
            $pattern = Get-BlockRegexPattern -Prefix "B" -Min $BetaBlockMin -Max $BetaBlockMax
            if ($BlockValue -notmatch $pattern) {
                throw "Bloc invalide pour 2-BETA. Valeurs autorisees : $(Get-BlockRangeLabel -Prefix 'B' -Min $BetaBlockMin -Max $BetaBlockMax)."
            }
        }
        "DEV-V2" {
            if ($BlockValue -notmatch '^DEV-V2-\d{2}$') {
                throw "Bloc invalide pour DEV-V2. Valeur attendue : DEV-V2-XX."
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

    if ([string]::IsNullOrWhiteSpace($clean)) {
        throw "Bloc invalide. Valeurs autorisees : $(Get-BlockRangeLabel -Prefix 'A' -Min $AlphaBlockMin -Max $AlphaBlockMax), $(Get-BlockRangeLabel -Prefix 'B' -Min $BetaBlockMin -Max $BetaBlockMax) (ou BLOC_A1 a BLOC_A21, BLOC_B1 a BLOC_B4)."
    }

    if ($clean -match '^BLOC_(.+)$') {
        $clean = $Matches[1]
    }

    $alphaPattern = Get-BlockRegexPattern -Prefix "A" -Min $AlphaBlockMin -Max $AlphaBlockMax
    $betaPattern  = Get-BlockRegexPattern -Prefix "B" -Min $BetaBlockMin -Max $BetaBlockMax

    if (($clean -match $alphaPattern) -or ($clean -match $betaPattern)) {
        return $clean
    }

    if ($clean -match '^DEV-V2-\d{2}$') {
        return $clean
    }

    throw "Bloc invalide. Valeurs autorisees : $(Get-BlockRangeLabel -Prefix 'A' -Min $AlphaBlockMin -Max $AlphaBlockMax), $(Get-BlockRangeLabel -Prefix 'B' -Min $BetaBlockMin -Max $BetaBlockMax) (ou BLOC_A1 a BLOC_A21, BLOC_B1 a BLOC_B4)."
}

function Get-CanonicalType {
    param([string]$Value)

    $normalized = Convert-ToPlainLabel -Value $Value
    $allowedTypesLabel = ($AllowedTypeTokens -join ', ')

    switch ($normalized) {
        "CORRECTIONDOCUMENTAIRE" { return "CORRECTION_DOCUMENTAIRE" }
        "DOCUMENTAIRE"           { return "DOCUMENTATION" }
    }

    if ([string]::IsNullOrWhiteSpace($normalized)) {
        throw "Type invalide. Tokens autorises : $allowedTypesLabel. Combinaisons acceptees avec '+', par exemple AUDIT+VALIDATION ou AUDIT+CORRECTION+COMPLETION+VALIDATION."
    }

    $normalized = $normalized -replace '[-/,;|]', '+'

    $rawTokens = @(
        $normalized -split '\+' |
        Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
    )

    if ($rawTokens.Count -eq 0) {
        throw "Type invalide. Tokens autorises : $allowedTypesLabel. Combinaisons acceptees avec '+', par exemple AUDIT+VALIDATION ou AUDIT+CORRECTION+COMPLETION+VALIDATION."
    }

    $canonicalTokens = New-Object System.Collections.Generic.List[string]

    foreach ($token in $rawTokens) {
        if ($token -notin $AllowedTypeTokens) {
            throw "Type invalide. Tokens autorises : $allowedTypesLabel. Combinaisons acceptees avec '+', par exemple AUDIT+VALIDATION ou AUDIT+CORRECTION+COMPLETION+VALIDATION."
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

    return (($tokens | Where-Object { $_ -in @('CORRECTION', 'COMPLETION') }).Count -gt 0)
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
- PATCH   : $PatchRelativePath
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

    New-DirectoryIfMissing -Path $PatchDir

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
- Le dossier PATCH reste present dans la session pour centraliser la documentation et les patchs.
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

## Dossier PATCH
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
$Block = Read-ValueIfMissing -CurrentValue $Block -PromptText "Bloc (A1 a A21 / B1 a B4)"
$SessionCode = Read-ValueIfMissing -CurrentValue $SessionCode -PromptText "Code session (ex: AUTH-01)"
$Type = Read-ValueIfMissing -CurrentValue $Type -PromptText "Type (AUDIT / CORRECTION / COMPLETION / VALIDATION / CADRAGE / DESIGN_SYSTEM / etc. / combinaisons avec +)"
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
Test-PathOrThrow $SessionTemplateDir

$blockDirName = "BLOC_{0}" -f $Block
if ($Stage -eq "DEV-V2") {
    $stageSessionsRoot = $DocsSessionsRoot
    $blockSessionsRoot = Join-Path $DocsSessionsRoot $blockDirName
}
else {
    $stageSessionsRoot = Join-Path $DocsSessionsRoot $Stage
    $blockSessionsRoot = Join-Path $stageSessionsRoot $blockDirName
}

New-DirectoryIfMissing -Path $stageSessionsRoot
New-DirectoryIfMissing -Path $blockSessionsRoot

$dateToken   = Get-Date -Format "yyyyMMdd"
$dateDisplay = Get-Date -Format "dd/MM/yyyy"
if ($Stage -eq "DEV-V2") {
    if ($SessionCode -notmatch '^\d{2}$') {
        throw "Pour DEV-V2, le code session doit etre sur 2 chiffres (ex: 01, 02)."
    }
    $sessionId = "SESSION-{0}-{1}" -f $Block, $SessionCode
}
else {
    $nextOrdinal = Get-NextSessionOrdinal -StageSessionsRoot $stageSessionsRoot -DateToken $dateToken
    $sessionId   = "SESSION-{0}-{1:D2}_{2}_{3}" -f $dateToken, $nextOrdinal, $Block, $SessionCode
}

$newSessionDir = Join-Path $blockSessionsRoot $sessionId
$newPatchDir   = Join-Path $newSessionDir $PatchSubDirName

if (Test-Path $newSessionDir) {
    throw "Le dossier de session existe deja : $newSessionDir"
}
if (Test-Path $newPatchDir) {
    throw "Le dossier de patch existe deja : $newPatchDir"
}

Copy-Item -Recurse -Force $SessionTemplateDir $newSessionDir

$sessionRelativePath = if ($Stage -eq "DEV-V2") {
    (Join-Path "docs/2-SESSIONS/$blockDirName" $sessionId) -replace '\\','/'
}
else {
    (Join-Path "docs/2-SESSIONS/$Stage/$blockDirName" $sessionId) -replace '\\','/'
}
$patchRelativePath   = (Join-Path $sessionRelativePath $PatchSubDirName) -replace '\\','/'

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
- PATCH   : $patchRelativePath

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
- Si session avec CORRECTION et/ou COMPLETION : README_PATCH.md puis patch officiel unique si code modifie
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
        code $newSessionDir
    }
    else {
        Start-Process (Join-Path $newSessionDir 'SESSION.md') | Out-Null
        Write-Host "Note: commande 'code' introuvable. SESSION.md ouvert avec l'application par defaut."
    }
}
