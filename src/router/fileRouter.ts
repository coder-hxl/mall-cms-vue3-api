import Router from '@koa/router'

import { verifyAuth } from '@/middleware/verifyMiddleware'
import {
  avatarHandle,
  avatarExists,
  avatarCover
} from '@/middleware/fileMiddlerware'
import fileController from '@/controller/file/fileController'

const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post(
  '/avatar',
  verifyAuth,
  avatarHandle,
  avatarExists,
  avatarCover,
  fileController.saveAvatarInfo
)

export default fileRouter
