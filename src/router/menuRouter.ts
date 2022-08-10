import Router from '@koa/router'

import { verifyAuth, verifyCUValue } from '@/middleware/verifyMiddleware'
import menuController from '@/controller/menu/menuController'

const menuRouter = new Router({ prefix: '/menu' })

menuRouter.post('/', verifyAuth, verifyCUValue, menuController.create)
menuRouter.delete('/:menuId', verifyAuth, menuController.delete)
menuRouter.patch('/:menuId', verifyAuth, verifyCUValue, menuController.update)
menuRouter.get('/:menuId', verifyAuth, menuController.detail)
menuRouter.post('/list', verifyAuth, menuController.list)

export default menuRouter
