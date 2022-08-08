import type { IMiddleware } from './types'
import { sha256Password } from '@/utils/passwordHandle'

const handlePassword: IMiddleware = async (ctx, next) => {
  const { password } = ctx.request.body
  if (password) {
    ctx.request.body.password = sha256Password(password)
  }

  await next()
}

export { handlePassword }
