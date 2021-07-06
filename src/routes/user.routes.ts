import { Router } from 'express'

import userController from '../app/controllers/userController'

const userRoutes = Router()

userRoutes.get('/list', userController.list)
userRoutes.get('/show/:userId', userController.show)
userRoutes.post('/create', userController.create)
userRoutes.post('/authenticate', userController.authenticate)
userRoutes.patch('/patch/:userId', userController.patch)
userRoutes.delete('/delete/:userId', userController.delete)

export { userRoutes }

