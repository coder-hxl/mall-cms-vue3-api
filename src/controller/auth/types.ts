import type { IMiddleware } from '@/middleware/types'

interface IAuthController {
  login: IMiddleware
  success: IMiddleware
}

export { IAuthController }
