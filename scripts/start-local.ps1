$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot

if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "Docker detectado. Usando contenedor NGINX..."
    Push-Location $root
    try {
        npm run local:setup
        docker compose up -d
        Write-Host ""
        Write-Host "NGINX local (Docker) en http://localhost:8080/kevin_gonzalez/#/" -ForegroundColor Green
        Write-Host "Para detener: npm run local:stop" -ForegroundColor Yellow
    } finally {
        Pop-Location
    }
    exit 0
}

$nginxRoot = Join-Path $root 'deploy\local\nginx-win'
$nginxExe = Join-Path $nginxRoot 'nginx.exe'
$zipPath = Join-Path $nginxRoot 'nginx.zip'
$nginxVersion = '1.27.4'
$downloadUrl = "https://nginx.org/download/nginx-$nginxVersion.zip"

function Ensure-Nginx {
    if (Test-Path $nginxExe) {
        return
    }

    Write-Host "Descargando NGINX $nginxVersion para Windows..."
    New-Item -ItemType Directory -Force -Path $nginxRoot | Out-Null

    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath
    Expand-Archive -Path $zipPath -DestinationPath $nginxRoot -Force
    Remove-Item $zipPath -Force

    $extracted = Join-Path $nginxRoot "nginx-$nginxVersion"
    Get-ChildItem $extracted | ForEach-Object {
        Move-Item $_.FullName $nginxRoot -Force
    }
    Remove-Item $extracted -Force -ErrorAction SilentlyContinue

    New-Item -ItemType Directory -Force -Path (Join-Path $nginxRoot 'logs') | Out-Null
    Write-Host "NGINX instalado en $nginxRoot"
}

function Stop-LocalNginx {
    if (Test-Path $nginxExe) {
        Push-Location $nginxRoot
        try {
            & .\nginx.exe -s stop 2>$null
        } catch {}
        Pop-Location
    }
}

Write-Host "Docker no encontrado. Usando NGINX nativo de Windows..."
Write-Host "Preparando build local..."

Push-Location $root
try {
    npm run local:setup
    node scripts/generate-nginx-config.mjs
} finally {
    Pop-Location
}

Ensure-Nginx
Stop-LocalNginx

$config = 'conf/nginx.runtime.conf'
Push-Location $nginxRoot
try {
    & .\nginx.exe -t -p $nginxRoot -c $config
    if ($LASTEXITCODE -ne 0) {
        throw "La configuracion de NGINX no es valida."
    }
    cmd /c "cd /d `"$nginxRoot`" && start /B nginx.exe -p `"$nginxRoot`" -c conf/nginx.runtime.conf"
    Start-Sleep -Seconds 2
} finally {
    Pop-Location
}

Write-Host ""
Write-Host "NGINX local activo en http://localhost:8080/kevin_gonzalez/#/" -ForegroundColor Green
Write-Host "Para detener: npm run local:stop" -ForegroundColor Yellow
