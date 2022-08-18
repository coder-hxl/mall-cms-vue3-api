import Router from '@koa/router'

import {
  verifyAuth,
  verifyCUInfo,
  verifyForbid
} from '@/middleware/verifyMiddleware'
import roleController from '@/controller/role/roleController'

const roleRouter = new Router({ prefix: '/role' })

roleRouter.post('/', verifyAuth, verifyCUInfo, roleController.create)
roleRouter.delete('/:roleId', verifyAuth, verifyForbid, roleController.delete)
roleRouter.patch(
  '/:roleId',
  verifyAuth,
  verifyForbid,
  verifyCUInfo,
  roleController.update
)
roleRouter.get('/:roleId', verifyAuth, roleController.detail)
roleRouter.get('/:roleId/menu', verifyAuth, roleController.roleMenu)
roleRouter.post('/list', verifyAuth, roleController.list)

export default roleRouter
