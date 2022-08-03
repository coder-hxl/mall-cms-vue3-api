import Router from '@koa/router'

import { verifyAuth, verifyRegister } from '@/middleware/verifyMiddleware'
import menuController from '@/controller/menu/menuController'

const menuRouter = new Router({ prefix: '/menu' })

menuRouter.post('/', verifyAuth, verifyRegister, menuController.create)

export default menuRouter
