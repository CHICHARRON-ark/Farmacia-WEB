# Farmacia Econopharma — Unidad Médica

Sitio web informativo de **Farmacia Econopharma** (unidad médica y farmacia de genéricos), desarrollado con **React + Vite + JavaScript**.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173/#/` en el navegador.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila para producción en `dist/` |
| `npm run preview` | Previsualiza el build localmente |
| `npm run lint` | Revisa el código con ESLint |

## Estructura del proyecto

```
src/
├── pages/          # Páginas (Inicio, Servicios, Nosotros, FAQ)
├── components/     # Layout, UI reutilizable, ErrorBoundary
├── constants/      # Datos de marca (nombre, contacto, mapa)
└── assets/         # Imágenes y recursos
public/
├── 404.html        # Página de error personalizada
├── panel/          # Página estática de panel restringido
└── nueva/          # Destino de redirección /vieja → /nueva
```

## Despliegue en Netlify

1. Sube el proyecto a un repositorio en GitHub.
2. En [Netlify](https://www.netlify.com/), conecta el repositorio.
3. Netlify detectará automáticamente la configuración de `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20
4. Haz clic en **Deploy site**.

El sitio usa **HashRouter** (`/#/ruta`), por lo que no requiere reglas especiales de SPA en el servidor.

### Redirecciones incluidas

- `/vieja` → `/nueva` (301 permanente)

## Despliegue alternativo (VPS con NGINX)

Si necesitas desplegar en un subdirectorio de un VPS, consulta la carpeta `deploy/` y cambia temporalmente `base` en `vite.config.js` al path correspondiente antes de compilar.

## Tecnologías

- React 19
- Vite 8
- React Router (HashRouter)
- CSS personalizado responsive

## Licencia

Proyecto académico — Farmacia Econopharma.
