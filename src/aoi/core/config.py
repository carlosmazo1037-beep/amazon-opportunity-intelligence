# AOI Release v0.3.0
$ErrorActionPreference = "Stop"

Write-Host "=== AOI Release v0.3.0 ===" -ForegroundColor Cyan

# 0. Verificar repo
if (-not (Test-Path ".git")) {
    Write-Host "ERROR: no estas en la raiz del repo" -ForegroundColor Red
    exit 1
}

# 1. Merge version_2 -> main
$currentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
Write-Host "Rama actual: $currentBranch" -ForegroundColor Yellow

if ($currentBranch -eq "version_2") {
    Write-Host "=== Merge version_2 -> main ===" -ForegroundColor Cyan
    git add -A
    git commit -m "WIP: pre-release v0.3.0" --allow-empty | Out-Null
    git checkout main
    git merge version_2 --no-edit
    git tag -a v0.2.0 -m "v0.2.0 - src-layout + aoi CLI" 2>$null
    git push origin main --tags
    Write-Host "OK: Merge completado, tag v0.2.0" -ForegroundColor Green
}

# 2. Carpetas
Write-Host "=== Creando estructura ===" -ForegroundColor Cyan
@("src\aoi\core","src\aoi\research","src\aoi\commands","src\aoi\database","src\aoi\reports","tests","database","logs","reports") | ForEach-Object {
    New-Item -ItemType Directory -Force -Path $_ | Out-Null
}

# 3. config.py
@'
"""AOI configuration."""
from pathlib import Path
PROJECT_ROOT = Path(__file__).resolve().parents[3]
DB_PATH = PROJECT_ROOT / "database" / "aoi.db"
LOGS_DIR = PROJECT_ROOT / "logs"
REPORTS_DIR = PROJECT_ROOT / "reports"
for d in (DB_PATH.parent, LOGS_DIR, REPORTS_DIR):
    d.mkdir(parents=True, exist_ok=True)
TREND_COUNTRIES = {
    "united_states": "US",
    "japan": "JP",
    "germany": "DE",
    "spain": "ES",
    "united_kingdom": "GB",
    "canada": "CA",
}
