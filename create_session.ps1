# ==============================
# create_session.ps1 (FINAL)
# ==============================

# --- CONFIG ---
$DocsSessionsRoot   = ".\docs\sessions"
$SessionTemplateDir = Join-Path $DocsSessionsRoot "SESSION-YYYYMMDD-XX"
$OpenInVSCode       = $true

# --- Helpers ---
function Get-NextSessionId {
    param([string]$Root)

    $date = Get-Date -Format "yyyyMMdd"
    $base = "SESSION-$date"
    $i = 1

    while (Test-Path (Join-Path $Root ("{0}-{1:D2}" -f $base, $i))) {
        $i++
    }

    return ("{0}-{1:D2}" -f $base, $i)
}

function Test-PathOrThrow {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        throw "Chemin introuvable : $Path. Lance le script a la racine du projet (dossier 'docs' present)."
    }
}

function Set-SessionIdInFile {
    param(
        [string]$FilePath,
        [string]$SessionId
    )

    if (-not (Test-Path $FilePath)) { return }

    $content = Get-Content $FilePath -Raw
    if ($content -match "SESSION-YYYYMMDD-XX") {
        $content = $content -replace "SESSION-YYYYMMDD-XX", $SessionId
        Set-Content -Encoding utf8 $FilePath -Value $content
    }
}

# --- Checks ---
Test-PathOrThrow $DocsSessionsRoot
Test-PathOrThrow $SessionTemplateDir

# --- Create session ---
$sessionId     = Get-NextSessionId -Root $DocsSessionsRoot
$newSessionDir = Join-Path $DocsSessionsRoot $sessionId

Copy-Item -Recurse -Force $SessionTemplateDir $newSessionDir

# Replace ID in session files (if placeholder exists)
$sessionMdPath   = Join-Path $newSessionDir "SESSION.md"
$notesMdPath     = Join-Path $newSessionDir "NOTES.md"
$evidencesMdPath = Join-Path $newSessionDir "EVIDENCES.md"
$resultatsMdPath = Join-Path $newSessionDir "RESULTATS.md"

Set-SessionIdInFile -FilePath $sessionMdPath   -SessionId $sessionId
Set-SessionIdInFile -FilePath $notesMdPath     -SessionId $sessionId
Set-SessionIdInFile -FilePath $evidencesMdPath -SessionId $sessionId
Set-SessionIdInFile -FilePath $resultatsMdPath -SessionId $sessionId

# --- Build "start of discussion" block (safe ASCII) ---
$startBlock = @"
ATTENTION - NOUVELLE SESSION - DEVELOPPEMENT

Projet : Investissement
Sous-projet : Ambulance Manager

CONTEXTE STRICT

Tu es autorise a utiliser UNIQUEMENT :

docs/master/ETAT_GLOBAL_PROJET.md
docs/master/DOCUMENT_MAITRE.md
docs/master/PLAN_DE_DEVELOPPEMENT.md
docs/master/REGISTRE_DECISIONS.md
docs/master/RECAP_DISCUSSIONS.md
docs/master/STRUCTURE_PROJET.md

docs/PROTOCOLE_SESSION.md

Les documents priment sur toute memoire interne.

Si une information manque :
INFORMATION NON FOURNIE — A CONFIRMER

SESSION

ID SESSION : $sessionId

POINT EXACT DE REPRISE :
INFORMATION NON FOURNIE — A CONFIRMER

OBJECTIF UNIQUE DE LA SESSION :
INFORMATION NON FOURNIE — A CONFIRMER
"@

# Copy to clipboard (Windows)
$clipboardMsg = "Non disponible"
try {
    Set-Clipboard -Value $startBlock
    $clipboardMsg = "OK"
} catch {}

# --- Output ---
Write-Host ""
Write-Host "Session creee : $sessionId"
Write-Host "Dossier       : $newSessionDir"
Write-Host "Fichier       : $sessionMdPath"
Write-Host "Presse-papiers: $clipboardMsg"
Write-Host ""

Write-Host "=============================="
Write-Host "BLOC A COPIER-COLLER (DEBUT)"
Write-Host "=============================="
Write-Host $startBlock
Write-Host ""

# --- Open in VS Code or fallback ---
if ($OpenInVSCode) {
    $codeCmd = Get-Command code -ErrorAction SilentlyContinue
    if ($null -ne $codeCmd) {
        # Open the whole session folder (more convenient)
        code $newSessionDir
    } else {
        # Fallback: open SESSION.md with default app
        Start-Process $sessionMdPath | Out-Null
        Write-Host "Note: commande 'code' introuvable. SESSION.md ouvert avec l'application par defaut."
    }
}