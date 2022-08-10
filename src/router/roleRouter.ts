import Router from '@koa/router'

import {
  verifyAuth,
  verifyCUInfo,
  verifyDelete
} from '@/middleware/verifyMiddleware'
import { classify } from '@/middleware/roleMiddlerware'
import roleController from '@/controller/role/roleController'

const roleRouter = new Router({ prefix: '/role' })

roleRouter.post('/', verifyAuth, verifyCUInfo, classify, roleController.create)
roleRouter.delete('/:roleId', verifyAuth, verifyDelete, roleController.delete)
roleRouter.patch(
  '/:roleId',
  verifyAuth,
  verifyDelete,
  verifyCUInfo,
  classify,
  roleController.update
)
roleRouter.get('/:roleId', verifyAuth, roleController.detail)
roleRouter.get('/:roleId/menu', verifyAuth, roleController.roleMenu)
roleRouter.post('/:list', verifyAuth, roleController.list)

export default roleRouter
