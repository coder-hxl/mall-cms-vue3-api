import { IMiddleware } from '@/middleware/types'

interface IMomentController {
  create: IMiddleware
  list: IMiddleware
}

export { IMomentController }
