import errorType from '@/constants/errorType'

import type { ParameterizedContext } from 'koa'

const errorHandle = (
  error: Error,
  ctx: ParameterizedContext,
  otherMessage?: string
) => {
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

    case errorType.LACK_MUST_VALUE:
      status = 400
      message = '缺少必传值~'
      break

    case errorType.NAME_IS_EXISTS:
      status = 400
      message = '名字已存在, 请换一个吧~'
      break

    case errorType.USER_NOT_ENABLE:
      status = 400
      message = '不允许使用该用户~'
      break

    case errorType.URL_IS_EXISTS:
      status = 400
      message = '路径已存在, 请换一个吧~'
      break

    case errorType.FORBID_HANDLE:
      status = 400
      message = '初始化数据禁止被操作~'
      break

    case errorType.REGEX_MISMATCH:
      status = 400
      message = otherMessage ?? '正则表达式匹配不通过~'
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
