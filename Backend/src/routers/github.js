import { Router } from 'express'
import { callback, login } from '../controllers/github.js'
const routes = Router()

routes.get('/login', login)
routes.get('/callback', callback)


export default routes