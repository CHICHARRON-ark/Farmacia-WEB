$ErrorActionPreference = 'SilentlyContinue'

$root = Split-Path -Parent $PSScriptRoot
$nginxRoot = Join-Path $root 'deploy\local\nginx-win'
$nginxExe = Join-Path $nginxRoot 'nginx.exe'

if (Test-Path $nginxExe) {
    Push-Location $nginxRoot
    & .\nginx.exe -s stop
    Pop-Location
    Write-Host "NGINX local detenido."
} else {
    docker compose -f (Join-Path $root 'docker-compose.yml') down 2>$null
    Write-Host "Contenedor Docker detenido (si estaba activo)."
}
