import { Router } from 'express'

import authMiddleware from '../app/middlewares/auth'
import authAdminMiddleware from '../app/middlewares/authAdmin'

import userController from '../app/controllers/userController'
import moduleController from '../app/controllers/moduleController'
import classController from '../app/controllers/classController'

const routes = Router()

routes.get('/user/list', userController.list)
routes.get('/user/show/:userId', userController.show)
routes.post('/user/create', userController.create)
routes.post('/user/authenticate', userController.authenticate)
routes.patch('/user/patch/:userId', userController.patch)
routes.delete('/user/delete/:userId', userController.delete)

routes.get('/module/list', moduleController.list)

routes.get('/class/list', classController.list)

routes.use(authMiddleware)

// Rota criando somente para tornar um usuário administrado
routes.patch('/admin/patch/:userId', userController.patchAdmin)

routes.use(authAdminMiddleware)
routes.get('/admin/test', (req, res) => res.status(400).json({
  test1: req.userId,
  test2: req.username,
  test3: req.isAdmin,
}))

routes.post('/module/create', moduleController.create)
routes.patch('/module/patch/:moduleId', moduleController.patch)
routes.delete('/module/delete/:moduleId', moduleController.delete)

routes.post('/class/create', classController.create)
routes.patch('/class/patch/:classId', classController.patch)
routes.delete('/class/delete/:classId', classController.delete)

export { routes }
