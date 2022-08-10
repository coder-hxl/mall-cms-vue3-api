import jwt from 'jsonwebtoken'

import { sha256Password } from '@/utils/passwordHandle'
import { regexRulesInfo, verifyChangeTable } from '@/utils/verify'

import errorType from '@/constants/errorType'
import { PUBLIC_KEY } from '@/app/config'
import { loginRules, createRules, updateRules } from './config/rulesConifg'

import type { IMiddleware } from './types'

const verifyLogin: IMiddleware = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 1.验证是否符合规则
  const { isSucceed, message } = regexRulesInfo(loginRules, { name, password })
  if (!isSucceed) {
    const error = new Error(errorType.REGEX_MISMATCH)
    return ctx.app.emit('error', error, ctx, message)
  }

  // 2.验证名字是否存在
  const result = await verifyChangeTable('users', { name })
  if (result.isChange) {
    const error = new Error(errorType.NAME_IS_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.验证密码
  const user = result.value
  if (sha256Password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error', error, ctx)
  }

  // 4.验证账号是否可用
  if (!user.enable) {
    const error = new Error(errorType.USER_NOT_ENABLE)
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

const verifyCUInfo: IMiddleware = async (ctx, next) => {
  let tableName, rule
  const rawInfo = ctx.request.body

  const paramsKey = Object.keys(ctx.params)
  const isCreate = !paramsKey.length
  // 注册/更新
  if (isCreate) {
    tableName = ctx.URL.pathname.replace('/', '')
    rule = createRules[tableName]
  } else {
    const subStr = '/' + ctx.params[paramsKey[0]]
    tableName = ctx.URL.pathname.replace('/', '').replace(subStr, '')
    rule = updateRules[tableName]
  }

  // 1.正则匹配规则
  const { isSucceed, message } = regexRulesInfo(rule, rawInfo)
  if (!isSucceed) {
    const error = new Error(errorType.REGEX_MISMATCH)
    return ctx.app.emit('error', error, ctx, message)
  }

  // 2.验证是否可以改变数据
  const result = isCreate
    ? await verifyChangeTable(tableName, rawInfo)
    : await verifyChangeTable(tableName, rawInfo, 'update')

  if (!result.isChange) {
    const key = result.key

    if (key === 'name') {
      const error = new Error(errorType.NAME_IS_EXISTS)
      return ctx.app.emit('error', error, ctx)
    } else if (key === 'url') {
      const error = new Error(errorType.URL_IS_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }
  }

  await next()
}

export { verifyLogin, verifyAuth, verifyCUInfo }
