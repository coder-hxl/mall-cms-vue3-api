import { IMiddleware } from '@/middleware/types'

interface IUserController {
  create: IMiddleware
  delete: IMiddleware
  update: IMiddleware
  detail: IMiddleware
  list: IMiddleware
}

export { IUserController }
