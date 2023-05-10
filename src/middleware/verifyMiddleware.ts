import jwt from 'jsonwebtoken'

import { sha256Password } from '@/utils/passwordHandle'
import { regexRulesInfo, hasCUPremise } from '@/utils/verify'

import errorType from '@/constants/errorType'
import { PUBLIC_KEY } from '@/app/config'
import { loginRules, createRules, updateRules } from './config/rulesConifg'
import forbidHandleIds from './config/forbidConfig'

import type { IMiddleware } from './types'
import type { ITableRules, rulesTableName } from './config/rulesConifg'
import type { forbidTableName } from './config/forbidConfig'

const verifyLogin: IMiddleware = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 1.验证是否符合规则
  const { isSucceed, message } = regexRulesInfo(loginRules, { name, password })
  if (!isSucceed) {
    const error = new Error(errorType.REGEX_MISMATCH)
    return ctx.app.emit('error', error, ctx, message)
  }

  // 2.验证名字是否存在
  const result = await hasCUPremise('users', 'create', { name })
  if (result.isHas) {
    const error = new Error(errorType.USER_NOT_EXISTS)
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
  } catch {
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

const verifyCUInfo: IMiddleware = async (ctx, next) => {
  let tableName: rulesTableName, rule: ITableRules
  const rawInfo = ctx.request.body

  const paramsKey = Object.keys(ctx.params)[0]
  const infoId = ctx.params[paramsKey]
  const isCreate = !paramsKey
  // 注册/更新
  if (isCreate) {
    tableName = ctx.URL.pathname.replace('/', '') as rulesTableName
    rule = createRules[tableName]
  } else {
    const subStr = `/${infoId}`
    tableName = ctx.URL.pathname
      .replace('/', '')
      .replace(subStr, '') as rulesTableName
    rule = updateRules[tableName]
  }

  // 1.正则匹配规则
  const { isSucceed, message } = regexRulesInfo(rule, rawInfo)
  if (!isSucceed) {
    const error = new Error(errorType.REGEX_MISMATCH)
    return ctx.app.emit('error', error, ctx, message)
  }

  // 2.是否可以 注册/更新 表
  const result = isCreate
    ? await hasCUPremise(tableName, 'create', rawInfo)
    : await hasCUPremise(tableName, 'update', {
        id: infoId,
        ...rawInfo
      })

  if (!result.isHas) {
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

const verifyForbid: IMiddleware = async (ctx, next) => {
  const paramsKey = Object.keys(ctx.params)[0]
  const id = parseFloat(ctx.params[paramsKey])
  const tableName = ctx.URL.pathname
    .replace('/', '')
    .replace(`/${id}`, '') as forbidTableName
  const forbidHandleId = forbidHandleIds[tableName]

  if (forbidHandleId.includes(id)) {
    const error = new Error(errorType.FORBID_HANDLE)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

export { verifyLogin, verifyAuth, verifyCUInfo, verifyForbid }
