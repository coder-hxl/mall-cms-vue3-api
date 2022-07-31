import type { Middleware, DefaultState } from 'koa'
import type { RouterParamContext } from '@koa/router'

import type { IUser } from '@/service/types'

interface IContext {
  user: IUser
}

interface IResponseBody {
  code: number
  data: any
}

type IMiddleware<Context = IContext> = Middleware<
  DefaultState,
  Context & RouterParamContext<DefaultState, Context>,
  IResponseBody
>

export { IMiddleware, IContext }
