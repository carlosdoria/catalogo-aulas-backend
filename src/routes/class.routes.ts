import { Router } from 'express'

import authMiddleware from '../app/middlewares/auth'
import authAdminMiddleware from '../app/middlewares/authAdmin'

import classController from '../app/controllers/classController'

const classRoutes = Router()

classRoutes.get('/list', classController.list)


classRoutes.use(authMiddleware)
classRoutes.use(authAdminMiddleware)

classRoutes.post('/create', classController.create)
classRoutes.patch('/patch/:classId', classController.patch)
classRoutes.delete('/delete/:classId', classController.delete)

export { classRoutes }

