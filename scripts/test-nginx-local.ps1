$base = 'http://localhost:8080'
$ok = 0
$fail = 0

function Test-Case {
    param(
        [string]$Name,
        [scriptblock]$Check
    )

    try {
        if (& $Check) {
            Write-Host "[OK]   $Name" -ForegroundColor Green
            $script:ok++
        } else {
            Write-Host "[FAIL] $Name" -ForegroundColor Red
            $script:fail++
        }
    } catch {
        Write-Host "[FAIL] $Name -> $($_.Exception.Message)" -ForegroundColor Red
        $script:fail++
    }
}

function Get-BlockedStatus {
    param([string]$Url)

    try {
        Invoke-WebRequest -Uri $Url -UseBasicParsing -ErrorAction Stop | Out-Null
        return $null
    } catch {
        return $_.Exception.Response.StatusCode.value__
    }
}

Write-Host "`nProbando NGINX local en $base`n"

Test-Case 'Tienda principal' {
    $r = Invoke-WebRequest -Uri "$base/kevin_gonzalez/" -UseBasicParsing
    $r.StatusCode -eq 200 -and $r.Content -match 'GlowBeauty'
}

Test-Case 'Req 1: panel accesible desde localhost' {
    $r = Invoke-WebRequest -Uri "$base/kevin_gonzalez/panel/" -UseBasicParsing
    $r.StatusCode -eq 200 -and $r.Content -match 'Panel restringido'
}

Test-Case 'Req 2: bloqueo .env' {
    $code = Get-BlockedStatus "$base/kevin_gonzalez/config.env"
    $code -in 403, 404
}

Test-Case 'Req 2: bloqueo .bak' {
    $code = Get-BlockedStatus "$base/kevin_gonzalez/backup.bak"
    $code -in 403, 404
}

Test-Case 'Req 3: redireccion 301 vieja -> nueva' {
    $req = [System.Net.WebRequest]::Create("$base/kevin_gonzalez/vieja")
    $req.AllowAutoRedirect = $false
    $resp = $req.GetResponse()
    $location = $resp.Headers['Location']
    $resp.Close()
    $location -match '/kevin_gonzalez/nueva$'
}

Test-Case 'Req 4: pagina 404 personalizada' {
    try {
        Invoke-WebRequest -Uri "$base/kevin_gonzalez/archivo-inexistente" -UseBasicParsing -ErrorAction Stop | Out-Null
        $false
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
        if ($code -ne 404) { return $false }
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $body = $reader.ReadToEnd()
        $body -match '404' -and $body -match 'GlowBeauty'
    }
}

Write-Host "`nResultado: $ok OK, $fail FAIL`n"

if ($fail -gt 0) {
    exit 1
}
