import Router from '@koa/router'

import {
  verifyAuth,
  verifyCUInfo,
  verifyForbid
} from '@/middleware/verifyMiddleware'
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
userRouter.delete('/:userId', verifyAuth, verifyForbid, userController.delete)
userRouter.patch(
  '/:userId',
  verifyAuth,
  verifyForbid,
  verifyCUInfo,
  handlePassword,
  userController.update
)
userRouter.get('/:userId', verifyAuth, userController.detail)
userRouter.post('/list', verifyAuth, userController.list)

// 获取头像
userRouter.get('/:userId/avatar/:filename', userController.avatarInfo)

export default userRouter
