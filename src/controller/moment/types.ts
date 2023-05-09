import { IMiddleware } from '@/middleware/types'

interface IMomentController {
  create: IMiddleware
  delete: IMiddleware
  list: IMiddleware
}

export { IMomentController }
