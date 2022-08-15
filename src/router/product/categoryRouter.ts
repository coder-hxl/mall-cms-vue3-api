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

export default categoryRouter
