import Router from '@koa/router'

import { verifyAuth, verifyRegister } from '@/middleware/verifyMiddleware'
import departmentControll from '@/controller/department/departmentController'

const departmentRouter = new Router({ prefix: '/department' })

departmentRouter.post(
  '/',
  verifyAuth,
  verifyRegister,
  departmentControll.create
)
departmentRouter.delete('/:departmentId', verifyAuth, departmentControll.delete)
departmentRouter.patch('/:departmentId', verifyAuth, departmentControll.update)
departmentRouter.get('/:departmentId', verifyAuth, departmentControll.detail)
departmentRouter.post('/list', verifyAuth, departmentControll.list)

export default departmentRouter
