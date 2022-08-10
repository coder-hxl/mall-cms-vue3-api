import Router from '@koa/router'

import { verifyAuth, verifyCUValue } from '@/middleware/verifyMiddleware'
import departmentControll from '@/controller/department/departmentController'

const departmentRouter = new Router({ prefix: '/department' })

departmentRouter.post('/', verifyAuth, verifyCUValue, departmentControll.create)
departmentRouter.delete('/:departmentId', verifyAuth, departmentControll.delete)
departmentRouter.patch(
  '/:departmentId',
  verifyAuth,
  verifyCUValue,
  departmentControll.update
)
departmentRouter.get('/:departmentId', verifyAuth, departmentControll.detail)
departmentRouter.post('/list', verifyAuth, departmentControll.list)

export default departmentRouter
