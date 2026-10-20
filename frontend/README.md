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
