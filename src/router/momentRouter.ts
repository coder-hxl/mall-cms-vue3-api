import Router from '@koa/router'

import {
  verifyAuth,
  verifyCUInfo,
  verifyForbid
} from '@/middleware/verifyMiddleware'
import momentController from '@/controller/moment/momentController'

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.post('/', verifyAuth, verifyCUInfo, momentController.create)
momentRouter.delete(
  '/:momentId',
  verifyAuth,
  verifyForbid,
  momentController.delete
)
momentRouter.post('/list', verifyAuth, momentController.list)

export default momentRouter
