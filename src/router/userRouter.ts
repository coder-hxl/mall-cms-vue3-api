import Router from '@koa/router'

import { verifyAuth } from '@/middleware/authMiddleware'
import { verifyUser, handlePassword } from '@/middleware/userMiddleware'
import userController from '@/controller/user/userController'

const userRouter = new Router({ prefix: '/users' })

userRouter.post(
  '/',
  verifyAuth,
  verifyUser,
  handlePassword,
  userController.create
)

export default userRouter
