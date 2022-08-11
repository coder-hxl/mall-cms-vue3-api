import type { IMiddleware } from '@/middleware/types'
import type { Middleware as RMiddleware } from '@koa/router'

interface IUserController {
  create: IMiddleware
  delete: IMiddleware
  update: IMiddleware
  detail: IMiddleware
  list: IMiddleware
  avatarInfo: RMiddleware
}

export { IUserController }
