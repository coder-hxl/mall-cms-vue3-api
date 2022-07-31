import userService from '@/service/user/userService'
import { isMustValueExist } from '@/utils/include'

import errorType from '@/constants/errorType'

import type { IMiddleware } from './types'
import { sha256Password } from '@/utils/passwordHandle'

const verifyUser: IMiddleware = async (ctx, next) => {
  const userInfo = ctx.request.body

  // 1.判断必传值是否为空
  const isAllExist = isMustValueExist(
    [
      'name',
      'realname',
      'password',
      'cellphone',
      'enable',
      'departmentId',
      'roleId'
    ],
    userInfo
  )
  if (!isAllExist) {
    const error = new Error(errorType.LACK_MUST_VALUE)
    return ctx.app.emit('error', error, ctx)
  }

  // 2.判断用户是否被注册
  const userResult = await userService.getUserByName(userInfo.name)
  if (userResult.length) {
    const error = new Error(errorType.USER_IS_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

const handlePassword: IMiddleware = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = sha256Password(password)

  await next()
}

export { verifyUser, handlePassword }
