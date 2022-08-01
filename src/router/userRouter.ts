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
userRouter.delete('/:userId', verifyAuth, userController.delete)
userRouter.patch('/:userId', verifyAuth, handlePassword, userController.update)
userRouter.get('/:userId', verifyAuth, userController.detail)
userRouter.post('/list', verifyAuth, userController.list)

export default userRouter
