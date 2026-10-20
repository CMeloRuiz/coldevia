import { Router } from 'express'
import { createContactRequest } from '../controllers/contact.controller.js'
import { contactRateLimit } from '../middlewares/rateLimit.js'

const router = Router()

router.post('/', contactRateLimit, createContactRequest)

export default router
