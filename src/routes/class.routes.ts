import { Router } from 'express'

import classController from '../app/controllers/classController'

import authAdminMiddleware from '../app/middlewares/auth'

const classRoutes = Router()

classRoutes.get('/list', classController.listAll)
classRoutes.get('/list/:id', classController.list)

classRoutes.use(authAdminMiddleware)

classRoutes.post('/', classController.create)
classRoutes.patch('/:classId', classController.patch)
classRoutes.delete('/:classId', classController.delete)

export { classRoutes }
