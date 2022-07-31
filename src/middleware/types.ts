import type { Middleware, DefaultState } from 'koa'
import type { RouterParamContext } from '@koa/router'

import type { IUser } from '@/service/types'

interface IAuthContext {
  user: IUser
}

interface IResponseBody {
  code: number
  data: any
}

type IMiddleware<Context = IAuthContext> = Middleware<
  DefaultState,
  Context & RouterParamContext<DefaultState, Context>,
  IResponseBody
>

export { IMiddleware }
