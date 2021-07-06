import { Router } from 'express'

import authMiddleware from '../app/middlewares/auth'
import authAdminMiddleware from '../app/middlewares/authAdmin'

import moduleController from '../app/controllers/moduleController'

const moduleRoutes = Router()

moduleRoutes.get('/list', moduleController.list)


moduleRoutes.use(authMiddleware)
moduleRoutes.use(authAdminMiddleware)

moduleRoutes.post('/create', moduleController.create)
moduleRoutes.patch('/patch/:moduleId', moduleController.patch)
moduleRoutes.delete('/delete/:moduleId', moduleController.delete)

export { moduleRoutes }

