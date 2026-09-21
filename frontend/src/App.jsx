import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'
import NotFound from './pages/NotFound'

// Servicios, Proyectos, Acerca de y Contacto son placeholders hasta que se
// construyan sus páginas. Precios vive como sección dentro del Home (#precios).
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="servicios" element={<ComingSoon title="Servicios" />} />
        <Route path="proyectos" element={<ComingSoon title="Proyectos" />} />
        <Route path="acerca-de" element={<ComingSoon title="Acerca de" />} />
        <Route path="contacto" element={<ComingSoon title="Contacto" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

