import { Router } from 'express'

import moduleController from '../app/controllers/moduleController'

import authAdminMiddleware from '../app/middlewares/auth'

const moduleRoutes = Router()

moduleRoutes.get('/list', moduleController.listAll)

moduleRoutes.use(authAdminMiddleware)

moduleRoutes.post('/', moduleController.create)
moduleRoutes.patch('/:moduleId', moduleController.patch)
moduleRoutes.delete('/:moduleId', moduleController.delete)

export { moduleRoutes }
