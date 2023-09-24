import { Router } from 'express'
const routes = Router()
import { callback, login } from '../controllers/google.js'

routes.get('/login', login)
routes.get('/callback', callback)

export default routes