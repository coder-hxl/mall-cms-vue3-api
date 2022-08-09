import Router from '@koa/router'

import { verifyAuth, verifyMust } from '@/middleware/verifyMiddleware'
import menuController from '@/controller/menu/menuController'

const menuRouter = new Router({ prefix: '/menu' })

menuRouter.post('/', verifyAuth, verifyMust, menuController.create)
menuRouter.delete('/:menuId', verifyAuth, menuController.delete)
menuRouter.patch('/:menuId', verifyAuth, verifyMust, menuController.update)
menuRouter.get('/:menuId', verifyAuth, menuController.detail)
menuRouter.post('/list', verifyAuth, menuController.list)

export default menuRouter
