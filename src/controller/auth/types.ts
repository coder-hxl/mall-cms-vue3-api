import type { Middleware as RMiddleware } from '@koa/router'

interface IAuthController {
  login: RMiddleware
  success: RMiddleware
}

export { IAuthController }
