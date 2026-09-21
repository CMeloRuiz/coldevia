# ColdevIA — Frontend

React + Vite + React Router, con CSS puro (sin Tailwind ni librerías de animación).

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
  main.jsx / App.jsx     Entrada y rutas (/, /servicios, /proyectos, /acerca-de, /contacto)
  components/layout/     Header dinámico, Footer, ScrollManager
  components/ui/         Reveal, Marquee (carrusel infinito CSS), SectionHeading, íconos de redes
  hooks/                 useRevealOnScroll, useCountUp, useSectionNavigation
  sections/home/         Una carpeta por sección del Home, cada una con su .jsx y .css
  data/                  Contenido editable: planes, proyectos, testimonios, servicios, contacto
  pages/                 Home y páginas "Próximamente"
```

## Contenido pendiente de reemplazar

Todo lo marcado con `TODO(cristhian)` en `src/data/`: precios, proyectos, testimonios,
correo, teléfono y redes sociales.
