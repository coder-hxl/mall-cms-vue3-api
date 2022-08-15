import Router from '@koa/router'

import {
  verifyAuth,
  verifyCUInfo,
  verifyForbid
} from '@/middleware/verifyMiddleware'
import departmentControll from '@/controller/department/departmentController'

const departmentRouter = new Router({ prefix: '/department' })

departmentRouter.post('/', verifyAuth, verifyCUInfo, departmentControll.create)
departmentRouter.delete(
  '/:departmentId',
  verifyAuth,
  verifyForbid,
  departmentControll.delete
)
departmentRouter.patch(
  '/:departmentId',
  verifyAuth,
  verifyForbid,
  verifyCUInfo,
  departmentControll.update
)
departmentRouter.get('/:departmentId', verifyAuth, departmentControll.detail)
departmentRouter.post('/list', verifyAuth, departmentControll.list)

export default departmentRouter
