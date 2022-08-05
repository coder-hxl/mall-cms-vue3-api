import { IMiddleware } from '@/middleware/types'

interface IRoleController {
  create: IMiddleware
  update: IMiddleware
}

export { IRoleController }
