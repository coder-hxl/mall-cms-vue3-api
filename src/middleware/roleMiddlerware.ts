import { IMiddleware } from './types'

const classify: IMiddleware = async (ctx, next) => {
  const raw = ctx.request.body

  let role: any, menuList
  for (const key in raw) {
    const value = raw[key]
    if (key === 'menuList') {
      menuList = value
    } else {
      if (!role) {
        role = {}
      }

      role[key] = value
    }
  }

  ctx.role = role
  ctx.menuList = menuList

  await next()
}

export { classify }
