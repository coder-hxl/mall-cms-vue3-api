import Router from '@koa/router'

import { verifyAuth, verifyRegister } from '@/middleware/verifyMiddleware'
import { classify } from '@/middleware/roleMiddlerware'
import roleController from '@/controller/role/roleController'

const roleRouter = new Router({ prefix: '/role' })

roleRouter.post(
  '/',
  verifyAuth,
  verifyRegister,
  classify,
  roleController.create
)
roleRouter.patch('/:roleId', verifyAuth, classify, roleController.update)

export default roleRouter
