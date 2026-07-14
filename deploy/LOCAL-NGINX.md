# NGINX local (misma lógica que el VPS)

## Inicio rápido

```powershell
npm run local:start
npm run local:test
```

Tienda: `http://localhost:8080/kevin_gonzalez/#/`

## Requerimientos (igual que el VPS)

| # | URL local | Resultado |
|---|-----------|-----------|
| 1 | `/kevin_gonzalez/panel/` | Panel restringido (IP permitida en local) |
| 2 | `/kevin_gonzalez/config.env` | Bloqueado (403/404) |
| 3 | `/kevin_gonzalez/vieja` | 301 → `/kevin_gonzalez/nueva` |
| 4 | `/kevin_gonzalez/no-existe` | 404 personalizado Econopharma |

## Archivos

- `deploy/kevin_gonzalez.conf` — bloque para el VPS
- `deploy/local/nginx.conf` — Docker
- `scripts/generate-nginx-config.mjs` — Windows nativo

## Despliegue al VPS

```powershell
npm run deploy:vps
```

Ver `deploy/INSTRUCCIONES.md`.
