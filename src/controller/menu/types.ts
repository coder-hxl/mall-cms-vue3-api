import { IMiddleware } from '@/middleware/types'

interface IMenuController {
  create: IMiddleware
  delete: IMiddleware
  update: IMiddleware
  detail: IMiddleware
  list: IMiddleware
}

export { IMenuController }
