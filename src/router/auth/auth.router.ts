import Router from '@koa/router'

import { verifyLogin, verifyAuth } from '@/middleware/auth/auth.middleware'
import authController from '@/controller/auth/auth.controller'

const authRouter = new Router()

authRouter.post('/login', verifyLogin, authController.login)
authRouter.get('/test', verifyAuth, authController.success)

export default authRouter
