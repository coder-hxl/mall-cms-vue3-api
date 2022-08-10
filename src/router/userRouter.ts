import Router from '@koa/router'

import { verifyAuth, verifyCUInfo } from '@/middleware/verifyMiddleware'
import { handlePassword } from '@/middleware/userMiddleware'
import userController from '@/controller/user/userController'

const userRouter = new Router({ prefix: '/users' })

userRouter.post(
  '/',
  verifyAuth,
  verifyCUInfo,
  handlePassword,
  userController.create
)
userRouter.delete('/:userId', verifyAuth, userController.delete)
userRouter.patch(
  '/:userId',
  verifyAuth,
  verifyCUInfo,
  handlePassword,
  userController.update
)
userRouter.get('/:userId', verifyAuth, userController.detail)
userRouter.post('/list', verifyAuth, userController.list)

export default userRouter
