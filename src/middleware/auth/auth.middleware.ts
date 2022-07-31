import jwt from 'jsonwebtoken'

import userService from '@/service/user/user.service'
import { sha256Password } from '@/utils/passwordHandle'

import errorType from '@/constants/error-type'
import { PUBLIC_KEY } from '@/app/config'

import type { IMiddleware } from '../types'
import type { IAuthContent } from './types'

const verifyLogin: IMiddleware<IAuthContent> = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 1.验证是否为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 2.验证是否存在
  const userResult = await userService.getUserByName(name)
  const user = userResult[0]
  if (!user) {
    const error = new Error(errorType.USER_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.验证密码
  if (sha256Password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRENT)

    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user

  await next()
}

const verifyAuth: IMiddleware<IAuthContent> = async (ctx, next) => {
  // 1.获取 token
  const authorization = ctx.header.authorization
  const token = authorization?.replace('Bearer ', '') ?? ''

  // 2.验证 token
  try {
    const user = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    }) as any

    ctx.user = user

    await next()
  } catch {
    const error = new Error(errorType.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

export { verifyLogin, verifyAuth }
