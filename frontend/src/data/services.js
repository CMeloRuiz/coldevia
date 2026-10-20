import { Bot, Globe, Layers, Server, ShoppingBag, Workflow } from 'lucide-react'

// Resumen de servicios para el Home. Los textos están en los diccionarios,
// bajo services.items.<id> (src/i18n/es.js y en.js).
export const SERVICES = [
  { id: 'web', icon: Globe },
  { id: 'ecommerce', icon: ShoppingBag },
  { id: 'saas', icon: Layers },
  { id: 'automation', icon: Workflow },
  { id: 'infrastructure', icon: Server },
  { id: 'ai', icon: Bot },
]
