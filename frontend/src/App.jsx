import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'
import NotFound from './pages/NotFound'

// Servicios, Proyectos, Acerca de y Contacto son placeholders hasta que se
// construyan sus páginas. Precios vive como sección dentro del Home (#precios)
// y el botón "Contacto" del header lleva al formulario del final (#contacto).
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="servicios" element={<ComingSoon titleKey="services" />} />
        <Route path="proyectos" element={<ComingSoon titleKey="projects" />} />
        <Route path="acerca-de" element={<ComingSoon titleKey="about" />} />
        <Route path="contacto" element={<ComingSoon titleKey="contact" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
