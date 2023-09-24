import { Router } from 'express'
const routes = Router()
import { callback, login } from '../controllers/linkedin.js'

routes.get('/login', login)
routes.get('/callback', callback)


export default routes