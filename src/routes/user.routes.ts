import { Router } from 'express'

import userController from '../app/controllers/userController'
import auth2 from '../app/middlewares/auth2'

const userRoutes = Router()

userRoutes.get('/list', userController.list)
userRoutes.get('/show/:userId', userController.show)
userRoutes.post('/', userController.create)
userRoutes.post('/authenticate', userController.authenticate)
userRoutes.patch('/:userId', userController.patch)
userRoutes.delete('/:userId', userController.delete)
userRoutes.use(auth2)
userRoutes.get('/token', userController.test)
export { userRoutes }

