import { Router } from 'express'

import classController from '../app/controllers/classController'

import authAdminMiddleware from '../app/middlewares/auth'

const classRoutes = Router()

classRoutes.get('/list', classController.list)

classRoutes.use(authAdminMiddleware)

classRoutes.post('/create', classController.create)
classRoutes.patch('/patch/:classId', classController.patch)
classRoutes.delete('/delete/:classId', classController.delete)

export { classRoutes }
