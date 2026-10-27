# ColdevIA — Frontend

React + Vite + React Router, con CSS puro (sin Tailwind ni librerías de animación).
Sitio público: **https://coldevia.com**

```bash
npm install
npm run dev      # http://localhost:5173 (las llamadas a /api van al backend en :4000)
npm run build
npm run lint
```

## Estructura

```
src/
  index.css              CSS principal: fuentes, paleta documentada, base, botones y animaciones de scroll
  main.jsx / App.jsx     Entrada, proveedores (moneda e idioma) y rutas
  i18n/                  es.js / en.js (textos), LanguageProvider y contexto de idioma
  context/               CurrencyProvider y contexto de moneda
  components/layout/     Header, Footer, selectores de idioma y moneda, ScrollManager
  components/ui/         Reveal, Marquee (carrusel infinito CSS), SectionHeading, íconos de redes
  hooks/                 useRevealOnScroll, useCountUp, useSectionNavigation, useCanonicalLinks…
  sections/home/         Una carpeta por sección del Home, cada una con su .jsx y .css
  data/                  Datos sin texto: precios, enlaces e imágenes de proyectos, tecnologías, países
  pages/                 Home y páginas "Próximamente"
public/                  favicons, og-image.png, robots.txt, sitemap.xml, site.webmanifest
```

## Variables de entorno

Ver `.env.example`. Solo las que empiezan por `VITE_` llegan al navegador.

- `VITE_API_URL`: URL pública de la API, **sin barra final**.
  - **Desarrollo:** se deja vacía. Vite redirige `/api` a `http://localhost:4000`
    (ver `server.proxy` en `vite.config.js`).
  - **Producción:** la URL del servicio de la API en Render
    (`https://coldevia-api.onrender.com`). Se configura en Environment, dentro
    del sitio estático `coldevia`, no en el repositorio.

> **Importante:** Vite incrusta las variables `VITE_*` en el código **al
> compilar**, no las lee en el navegador. Cambiar `VITE_API_URL` en Render no
> surte efecto hasta hacer **Manual Deploy → Deploy latest commit** del sitio
> estático. Si el formulario sigue apuntando a la URL vieja, es que falta ese
> redespliegue.

El formulario del Home envía a `POST {VITE_API_URL}/api/contact` con el idioma
activo. Si el servidor tarda (el plan gratuito de Render duerme el servicio),
el botón queda en "Enviando…" y a los 6 segundos aparece un aviso de que puede
demorar; a los 90 segundos la petición se corta con un mensaje de error.

## Idiomas (español / inglés)

- Por defecto, español. El selector del header guarda la elección en `localStorage`
  (`coldevia:language`). No se detecta el idioma del navegador.
- `?lang=en` abre el sitio en inglés: es la URL que declaran las etiquetas `hreflang`.
- **Todo texto visible sale de `src/i18n/es.js` y `en.js`.** Los componentes no llevan
  cadenas escritas a mano; los datos (`src/data/`) solo guardan ids, precios, enlaces e
  imágenes. Para agregar contenido: añade la clave en los dos diccionarios y úsala con
  `const t = useT()`.
- La moneda es independiente del idioma. Si alguien pasa a inglés y nunca eligió moneda,
  se sugiere USD una sola vez.

## Contenido pendiente de reemplazar

Todo lo marcado con `TODO(cristhian)` en `src/data/`: testimonios, correo y redes sociales.
