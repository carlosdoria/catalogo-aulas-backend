import { Router } from 'express'

import moduleController from '../app/controllers/moduleController'

import authAdminMiddleware from '../app/middlewares/auth'

const moduleRoutes = Router()

moduleRoutes.get('/list', moduleController.list)

moduleRoutes.use(authAdminMiddleware)

moduleRoutes.post('/create', moduleController.create)
moduleRoutes.patch('/patch/:moduleId', moduleController.patch)
moduleRoutes.delete('/delete/:moduleId', moduleController.delete)

export { moduleRoutes }
