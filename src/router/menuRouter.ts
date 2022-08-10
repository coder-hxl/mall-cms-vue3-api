import Router from '@koa/router'

import {
  verifyAuth,
  verifyCUInfo,
  verifyDelete
} from '@/middleware/verifyMiddleware'
import menuController from '@/controller/menu/menuController'

const menuRouter = new Router({ prefix: '/menu' })

menuRouter.post('/', verifyAuth, verifyCUInfo, menuController.create)
menuRouter.delete('/:menuId', verifyAuth, verifyDelete, menuController.delete)
menuRouter.patch(
  '/:menuId',
  verifyAuth,
  verifyDelete,
  verifyCUInfo,
  menuController.update
)
menuRouter.get('/:menuId', verifyAuth, menuController.detail)
menuRouter.post('/list', verifyAuth, menuController.list)

export default menuRouter
