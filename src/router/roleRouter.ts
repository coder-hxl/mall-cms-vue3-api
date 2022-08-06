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
roleRouter.delete('/:roleId', verifyAuth, roleController.delete)
roleRouter.patch('/:roleId', verifyAuth, classify, roleController.update)
roleRouter.get('/:roleId', verifyAuth, roleController.detail)
roleRouter.get('/:roleId/menu', verifyAuth, roleController.roleMenu)
roleRouter.post('/:list', verifyAuth, roleController.list)

export default roleRouter
