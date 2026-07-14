# Despliegue en http://2.25.174.243/kevin_gonzalez/

Ruta física en el VPS: `/home/kevin_gonzalez/public/`

## Estructura a subir

```
public/
├── index.html
├── 404.html
├── logo-econopharma.png
├── panel/
│   └── index.html      ← Req. 1 (ruta restringida por IP)
└── nueva/
    └── index.html      ← Req. 3 (destino del 301 desde /vieja)
```

## Despliegue rápido

```powershell
npm run deploy:vps
```

O manualmente:

```powershell
npm run build
scp dist/index.html kevin_gonzalez@2.25.174.243:/home/kevin_gonzalez/public/
scp dist/404.html kevin_gonzalez@2.25.174.243:/home/kevin_gonzalez/public/
scp dist/logo-econopharma.png kevin_gonzalez@2.25.174.243:/home/kevin_gonzalez/public/
scp -r dist/panel kevin_gonzalez@2.25.174.243:/home/kevin_gonzalez/public/
scp -r dist/nueva kevin_gonzalez@2.25.174.243:/home/kevin_gonzalez/public/
```

## Abrir la tienda

```
http://2.25.174.243/kevin_gonzalez/#/
```

## NGINX en el VPS

Usa el bloque unificado de `deploy/kevin_gonzalez.conf`.

**Importante:** elimina el bloque antiguo que tenía `try_files $uri $uri/ /kevin_gonzalez/index.html;` y deja solo el de `deploy/kevin_gonzalez.conf`.

Después de editar NGINX:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Verificar los 4 requerimientos

| # | Requerimiento | URL de prueba | Resultado esperado |
|---|---------------|---------------|-------------------|
| 1 | Restricción IP en `/panel/` | `http://2.25.174.243/kevin_gonzalez/panel/` | Acceso solo desde IPs permitidas |
| 2 | Bloqueo `.env`, `.git`, `.bak` | `http://2.25.174.243/kevin_gonzalez/config.env` | 403 o 404 |
| 3 | Redirección 301 | `http://2.25.174.243/kevin_gonzalez/vieja` | Redirige a `/kevin_gonzalez/nueva` |
| 4 | Error 404 personalizado | `http://2.25.174.243/kevin_gonzalez/no-existe` | Página 404 Econopharma |

## Notas

- El build usa un solo `index.html` (JS y CSS embebidos) porque el servidor no sirve `.js` externos.
- La app React usa `HashRouter`: las rutas internas van después de `#/` (ej. `/#/admin`).
- `/kevin_gonzalez/panel/` es ruta del **servidor** (NGINX + carpeta física).
- `/kevin_gonzalez/#/admin` es el panel **dentro de React** (requiere login admin).
- El proxy `/kevin_gonzalez/api/` apunta a `localhost:3006` (backend futuro).

## Probar en local antes de subir

```powershell
npm run local:start
npm run local:test
```

Ver `deploy/LOCAL-NGINX.md`.
