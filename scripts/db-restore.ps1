param(
  [Parameter(Mandatory = $true)]
  [string]$InputPath,
  [switch]$Force
)

$ErrorActionPreference = "Stop"

if (-not $Force) {
  throw "Database restore is destructive and requires -Force."
}

if ([string]::IsNullOrWhiteSpace($env:DATABASE_URL)) {
  throw "DATABASE_URL is required for database restore."
}

if (-not (Test-Path -LiteralPath $InputPath)) {
  throw "Backup file not found: $InputPath"
}

$pgRestore = Get-Command pg_restore -ErrorAction SilentlyContinue
if (-not $pgRestore) {
  throw "pg_restore is required in PATH for database restore."
}
$pgRestorePath = $pgRestore.Source

$resolvedInput = Resolve-Path -LiteralPath $InputPath
$resolvedInputPath = $resolvedInput.Path

& $pgRestorePath `
  --clean `
  --if-exists `
  --no-owner `
  --no-acl `
  --dbname $env:DATABASE_URL `
  $resolvedInputPath
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}
