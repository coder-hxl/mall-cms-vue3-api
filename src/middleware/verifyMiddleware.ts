import jwt from 'jsonwebtoken'

import userService from '@/service/user/userService'
import departmentService from '@/service/department/departmentService'
import menuService from '@/service/menu/menuService'
import roleService from '@/service/role/roleService'

import { sha256Password } from '@/utils/passwordHandle'
import { verifyMustInfo } from '@/utils/verify'

import errorType from '@/constants/errorType'
import { registerMust, updateMust } from '@/constants/must'
import { PUBLIC_KEY } from '@/app/config'

import type { IMiddleware } from './types'

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

const verifyMust: IMiddleware = async (ctx, next) => {
  let pathname, mustInfo
  const rawInfo = ctx.request.body

  const paramsKey = Object.keys(ctx.params)
  // 注册/更新
  if (!paramsKey.length) {
    pathname = ctx.URL.pathname
    mustInfo = registerMust[pathname.replace('/', '')]
  } else {
    const subStr = '/' + ctx.params[paramsKey[0]]
    pathname = ctx.URL.pathname.replace(subStr, '')
    mustInfo = updateMust[pathname.replace('/', '')]
  }

  // 1.判断必传值是否存在
  const isAllExist = verifyMustInfo(mustInfo, rawInfo)
  if (!isAllExist) {
    const error = new Error(errorType.LACK_MUST_VALUE)
    return ctx.app.emit('error', error, ctx)
  }

  // 2.判断名字是否存在
  let result: any
  switch (pathname) {
    case '/users':
      result = await userService.getUserByName(rawInfo.name)
      break
    case '/department':
      result = await departmentService.getDepartmentByName(rawInfo.name)
      break
    case '/menu':
      result = await menuService.getMenuByName(rawInfo.name)

      if (result.length) {
        break
      }

      rawInfo.url && (result = await menuService.getMenuByUrl(rawInfo.url))

      break
    case '/role':
      result = await roleService.getRoleByAny('name', rawInfo.name)
      break
  }

  if (result.length) {
    // 注册/更新
    if (!paramsKey.length) {
      const error = new Error(errorType.NAME_IS_EXISTS)
      return ctx.app.emit('error', error, ctx)
    } else if (result[0].name != rawInfo.name) {
      const error = new Error(errorType.NAME_IS_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }
  }

  await next()
}

export { verifyLogin, verifyAuth, verifyMust }
