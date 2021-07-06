import { Router } from 'express'

import authMiddleware from '../app/middlewares/auth'
import authAdminMiddleware from '../app/middlewares/authAdmin'

import userController from '../app/controllers/userController'

const userRoutes = Router()

userRoutes.get('/list', userController.list)
userRoutes.get('/show/:userId', userController.show)
userRoutes.post('/create', userController.create)
userRoutes.post('/authenticate', userController.authenticate)
userRoutes.patch('/patch/:userId', userController.patch)
userRoutes.delete('/delete/:userId', userController.delete)

userRoutes.use(authMiddleware)

// Rota criando somente para tornar um usuário administrado
userRoutes.patch('/admin/patch/:userId', userController.patchAdmin)

export { userRoutes }

