import type { Middleware, DefaultState } from 'koa'
import type { RouterParamContext } from '@koa/router'

import type { IRole, IUser } from '@/service/types'

interface IContext {
  user?: IUser
  role?: IRole
  menuList?: number[]
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
