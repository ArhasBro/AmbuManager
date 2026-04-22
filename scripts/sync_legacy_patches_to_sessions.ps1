[CmdletBinding()]
param(
    [switch]$WhatIf,
    [switch]$VerboseOutput,
    [switch]$DeleteLegacy
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$LegacyRoot = Join-Path $RepoRoot "docs/3-patches"
$SessionsRoot = Join-Path $RepoRoot "docs/2-sessions"
$PatchSubDirName = "PATCH"

if (-not (Test-Path $LegacyRoot)) {
    Write-Host "Aucun dossier legacy detecte : $LegacyRoot"
    exit 0
}

function Test-SessionPatchFolder {
    param([string]$Path)

    if (-not (Test-Path $Path -PathType Container)) {
        return $false
    }

    $hasReadme = Test-Path (Join-Path $Path "README_PATCH.md")
    $hasNoPatch = Test-Path (Join-Path $Path "NO_PATCH.md")
    $hasDiff = @(Get-ChildItem -Path $Path -Filter "*.diff" -File -ErrorAction SilentlyContinue).Count -gt 0

    return ($hasReadme -or $hasNoPatch -or $hasDiff)
}

$legacySessionDirs = Get-ChildItem -Path $LegacyRoot -Directory -Recurse |
    Where-Object { Test-SessionPatchFolder -Path $_.FullName } |
    Sort-Object FullName

if ($legacySessionDirs.Count -eq 0) {
    Write-Host "Aucun dossier patch legacy a synchroniser."
    exit 0
}

$copiedCount = 0
$skippedCount = 0

foreach ($legacyDir in $legacySessionDirs) {
    $relative = $legacyDir.FullName.Substring($LegacyRoot.Length).TrimStart('\','/')
    $targetSessionDir = Join-Path $SessionsRoot $relative
    $targetPatchDir = Join-Path $targetSessionDir $PatchSubDirName

    if (-not (Test-Path $targetSessionDir -PathType Container)) {
        Write-Warning "Session cible introuvable, synchronisation ignoree : $targetSessionDir"
        $skippedCount++
        continue
    }

    if ($VerboseOutput) {
        Write-Host "SYNC $($legacyDir.FullName) -> $targetPatchDir"
    }

    if (-not $WhatIf) {
        New-Item -ItemType Directory -Path $targetPatchDir -Force | Out-Null
        Copy-Item -Path (Join-Path $legacyDir.FullName '*') -Destination $targetPatchDir -Recurse -Force

        if ($DeleteLegacy) {
            Remove-Item -Path $legacyDir.FullName -Recurse -Force
        }
    }

    $copiedCount++
}

Write-Host "Synchronisation terminee. Dossiers traites : $copiedCount. Ignores : $skippedCount."
if ($DeleteLegacy) {
    Write-Host "Mode suppression active : les dossiers legacy synchronises ont ete supprimes."
}
else {
    Write-Host "Mode securise : les dossiers legacy ont ete conserves pour compatibilite."
}
