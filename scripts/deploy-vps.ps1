$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$sshTarget = 'kevin_gonzalez@2.25.174.243'
$remote = '/home/kevin_gonzalez/public'

Write-Host "Generando build..."
Push-Location $root
try {
    npm run build
} finally {
    Pop-Location
}

$dist = Join-Path $root 'dist'

Write-Host "Subiendo archivos al VPS..."
scp (Join-Path $dist 'index.html') "${sshTarget}:${remote}/"
scp (Join-Path $dist '404.html') "${sshTarget}:${remote}/"
scp (Join-Path $dist 'logo-econopharma.png') "${sshTarget}:${remote}/"
scp (Join-Path $dist 'panel/index.html') "${sshTarget}:${remote}/panel/index.html"
scp (Join-Path $dist 'nueva/index.html') "${sshTarget}:${remote}/nueva/index.html"

Write-Host "Ajustando permisos en el servidor..."
ssh $sshTarget "mkdir -p ${remote}/panel ${remote}/nueva && chmod 755 ${remote}/panel ${remote}/nueva && chmod 644 ${remote}/panel/index.html ${remote}/nueva/index.html ${remote}/index.html ${remote}/404.html ${remote}/logo-econopharma.png"

Write-Host ""
Write-Host "Despliegue completado." -ForegroundColor Green
Write-Host "Farmacia: http://2.25.174.243/kevin_gonzalez/#/" -ForegroundColor Cyan
