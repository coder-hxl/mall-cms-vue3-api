import { IMiddleware } from '@/middleware/types'

interface IRoleController {
  create: IMiddleware
  delete: IMiddleware
  update: IMiddleware
  detail: IMiddleware
  list: IMiddleware
  roleMenu: IMiddleware
}

export { IRoleController }
