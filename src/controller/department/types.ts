import { IMiddleware } from '@/middleware/types'

interface IDepatmentController {
  create: IMiddleware
  delete: IMiddleware
  update: IMiddleware
  detail: IMiddleware
  list: IMiddleware
}

export { IDepatmentController }
