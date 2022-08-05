import Router from '@koa/router'

import { verifyAuth } from '@/middleware/verifyMiddleware'
import { classify } from '@/middleware/roleMiddlerware'
import roleController from '@/controller/role/roleController'

const roleRouter = new Router({ prefix: '/role' })

roleRouter.patch('/:roleId', verifyAuth, classify, roleController.update)

export default roleRouter
