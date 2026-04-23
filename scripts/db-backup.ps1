param(
  [string]$OutputPath
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($env:DATABASE_URL)) {
  throw "DATABASE_URL is required for database backup."
}

$pgDump = Get-Command pg_dump -ErrorAction SilentlyContinue
if (-not $pgDump) {
  throw "pg_dump is required in PATH for database backup."
}
$pgDumpPath = $pgDump.Source

if ([string]::IsNullOrWhiteSpace($OutputPath)) {
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $OutputPath = Join-Path -Path (Join-Path -Path (Get-Location) -ChildPath "backups") -ChildPath "ambulance-manager_$stamp.dump"
}

$parent = Split-Path -Parent $OutputPath
if ([string]::IsNullOrWhiteSpace($parent)) {
  $parent = "."
}

New-Item -ItemType Directory -Force -Path $parent | Out-Null

& $pgDumpPath --format=custom --no-owner --no-acl --file $OutputPath $env:DATABASE_URL
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host "Backup created: $OutputPath"
