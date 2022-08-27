import Router from '@koa/router'

import {
  verifyAuth,
  verifyCUInfo,
  verifyForbid
} from '@/middleware/verifyMiddleware'
import categoryController from '@/controller/product/category/categoryController'

const categoryRouter = new Router({ prefix: '/category' })

categoryRouter.post('/', verifyAuth, verifyCUInfo, categoryController.create)
categoryRouter.delete(
  '/:categoryId',
  verifyAuth,
  verifyForbid,
  categoryController.delete
)
categoryRouter.patch(
  '/:categoryId',
  verifyAuth,
  verifyForbid,
  verifyCUInfo,
  categoryController.update
)
categoryRouter.get('/:categoryId', verifyAuth, categoryController.detail)
categoryRouter.post('/list', verifyAuth, categoryController.list)

// 统计数据
categoryRouter.get('/goods/count', verifyAuth, categoryController.goodsCount)
categoryRouter.get('/goods/sale', verifyAuth, categoryController.goodsSale)
categoryRouter.get('/goods/favor', verifyAuth, categoryController.goodsFavor)

export default categoryRouter
