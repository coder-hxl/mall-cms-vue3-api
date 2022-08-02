import jwt from 'jsonwebtoken'

import userService from '@/service/user/userService'

import { sha256Password } from '@/utils/passwordHandle'
import { objMustValNotNull } from '@/utils/verify'

import errorType from '@/constants/errorType'
import { PUBLIC_KEY } from '@/app/config'

import type { IMiddleware } from './types'
import getRegisterMustInfo from '@/utils/register'

const verifyLogin: IMiddleware = async (ctx, next) => {
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

const verifyAuth: IMiddleware = async (ctx, next) => {
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

const verifyRegister: IMiddleware = async (ctx, next) => {
  const pathname = ctx.URL.pathname
  const rawInfo = ctx.request.body
  // 获取表中值为非空的字段名
  const registerMustInfo = getRegisterMustInfo(pathname)
  console.log(registerMustInfo)

  // 1.判断必传值是否为空
  const isAllExist = objMustValNotNull(registerMustInfo, rawInfo)
  if (!isAllExist) {
    const error = new Error(errorType.LACK_MUST_VALUE)
    return ctx.app.emit('error', error, ctx)
  }

  // 2.判断名字是否已注册
  let result: any
  switch (pathname) {
    case '/users':
      result = await userService.getUserByName(rawInfo.name)
      break
    case '/department':
      result = await userService.getUserByName(rawInfo.name)
      break
  }

  if (result.length) {
    const error = new Error(errorType.NAME_IS_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

export { verifyLogin, verifyAuth, verifyRegister }
