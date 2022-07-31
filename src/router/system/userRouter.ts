import Router from '@koa/router'

import { verifyAuth } from '@/middleware/auth/authMiddleware'

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', verifyAuth)

export default userRouter
