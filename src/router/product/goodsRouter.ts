import Router from '@koa/router'

import {
  verifyAuth,
  verifyCUInfo,
  verifyForbid
} from '@/middleware/verifyMiddleware'
import goodsController from '@/controller/product/goods/goodsController'

const goodsRouter = new Router({ prefix: '/goods' })

goodsRouter.post('/', verifyAuth, verifyCUInfo, goodsController.create)
goodsRouter.delete(
  '/:goodsId',
  verifyAuth,
  verifyForbid,
  goodsController.delete
)
goodsRouter.patch(
  '/:goodsId',
  verifyAuth,
  verifyForbid,
  verifyCUInfo,
  goodsController.update
)
goodsRouter.get('/:goodsId', verifyAuth, goodsController.detail)
goodsRouter.post('/list', verifyAuth, goodsController.list)

export default goodsRouter