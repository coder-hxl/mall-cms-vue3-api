import menuService from '@/service/menu/menuService'

import type { IMenuController } from './types'

const menuController: IMenuController = {
  async create(ctx, next) {
    const menuInfo = ctx.request.body

    await menuService.create(menuInfo)

    ctx.body = {
      code: 0,
      data: `创建${menuInfo.name}菜单成功~`
    }
  }
}
export default menuController
