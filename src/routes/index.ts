import { Router } from 'express'

import authMiddleware from '../app/middlewares/auth'

import userController from '../app/controllers/userController'
import moduleController from '../app/controllers/moduleController'
import classController from '../app/controllers/classController'

const routes = Router()

routes.get('/user/list', userController.list)
routes.get('/user/show/:userId', userController.show)
routes.post('/user/create', userController.create)
routes.post('/user/authenticate', userController.authenticate)
routes.put('/user/put/:userId', userController.put)
routes.delete('/user/delete/:userId', userController.delete)

routes.get('/module/list', moduleController.list)

routes.get('/class/list', classController.list)

routes.use(authMiddleware)

routes.post('/module/create', moduleController.create)
routes.put('/module/put/:moduleId', moduleController.put)
routes.delete('/module/delete/:moduleId', moduleController.delete)

routes.post('/class/create', classController.create)
routes.patch('/class/put/:classId', classController.put)
routes.delete('/class/delete/:classId', classController.delete)

export { routes }
