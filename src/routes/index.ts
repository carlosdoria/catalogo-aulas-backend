import { Router } from 'express'

import authAdminMiddleware from '../app/middlewares/auth'

import { userRoutes } from './user.routes'
import { moduleRoutes } from './module.routes'
import { classRoutes } from './class.routes'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/modules', moduleRoutes)
routes.use('/lessons', classRoutes)

routes.use(authAdminMiddleware)
routes.get('/admin/test', (req, res) => res.status(400).json({
  test1: req.userId,
  test2: req.username,
  test3: req.isAdmin,
}))

export { routes }
