import type { Middleware, DefaultState } from 'koa'
import type { RouterParamContext } from '@koa/router'

import type { IRole } from '@/service/types'

type ICUser = {
  id: number
  name: string
  hasAvatar: boolean
}

interface IContext {
  user: ICUser
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
