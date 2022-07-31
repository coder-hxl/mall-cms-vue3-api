import errorType from '@/constants/error-type'

import type { ParameterizedContext } from 'koa'

const errorHandle = (error: Error, ctx: ParameterizedContext) => {
  let status: number, message: string

  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = '账号或密码不能为空~'
      break

    case errorType.USER_NOT_EXISTS:
      status = 400
      message = '用户不存在~'
      break

    case errorType.PASSWORD_IS_INCORRENT:
      status = 400
      message = '密码不一致~'
      break

    case errorType.UNAUTHORIZATION:
      status = 401
      message = '未授权~'
      break

    default:
      status = 404
      message = 'NOT FOUND~'
      break
  }

  ctx.status = status
  ctx.body = {
    code: status,
    data: message
  }
}

export default errorHandle
