import { Router } from 'express'
import { createContactRequest } from '../controllers/contact.controller.js'
import { rateLimit } from '../middlewares/rateLimit.js'

const router = Router()

// Máximo 5 envíos cada 10 minutos por IP
router.post('/', rateLimit({ windowMs: 10 * 60 * 1000, max: 5 }), createContactRequest)

export default router
