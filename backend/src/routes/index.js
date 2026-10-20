import { Router } from 'express'
import healthRoutes from './health.routes.js'
import contactRoutes from './contact.routes.js'

// Punto de entrada de todas las rutas bajo /api.
const router = Router()

router.use('/health', healthRoutes)
router.use('/contact', contactRoutes)
// Nombre anterior del endpoint. Se mantiene para que una versión del sitio
// todavía en caché del navegador no se quede sin enviar.
router.use('/contacto', contactRoutes)

export default router
