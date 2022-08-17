import menuService from '@/service/menu/menuService'
import { IMenu } from '@/service/types'

import { toString, splitObj } from '@/utils/transition'

import type { IMenuController } from './types'

const menuController: IMenuController = {
  async create(ctx, next) {
    const menuInfo = ctx.request.body

    await menuService.create(menuInfo)

    ctx.body = {
      code: 200,
      data: `创建${menuInfo.name}成功~`
    }
  },
  async delete(ctx, next) {
    const { menuId } = ctx.params

    await menuService.delete(menuId)

    ctx.body = {
      code: 200,
      data: `删除菜单成功~`
    }
  },
  async update(ctx, next) {
    const { menuId } = ctx.params
    const menuInfo = ctx.request.body

    await menuService.update(menuId, menuInfo)

    ctx.body = {
      code: 200,
      data: `更新菜单成功~`
    }
  },
  async detail(ctx, next) {
    const { menuId } = ctx.params

    const result = await menuService.getMenuById(menuId)

    ctx.body = {
      code: 200,
      data: result
    }
  },
  async list(ctx, next) {
    const info = ctx.request.body
    const offset = toString(info.offset)
    const size = toString(info.size)
    const [like] = splitObj(info, ['offset', 'size']) as [IMenu, any]

    let hasLimit = false
    if (offset && size) {
      hasLimit = true
    }

    const result = await menuService.getMenuList(
      like,
      hasLimit ? [offset, size] : []
    )

    ctx.body = {
      code: 200,
      data: {
        list: result,
        totalCount: result.length
      }
    }
  }
}
export default menuController
