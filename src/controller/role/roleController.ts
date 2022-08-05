import roleService from '@/service/role/roleService'
import roleMenuService from '@/service/roleMenu/roleMenuService'

import type { IRoleController } from './types'

const roleController: IRoleController = {
  async update(ctx, next) {
    const { roleId } = ctx.params
    const roleInfo = ctx.role
    const menuList = ctx.menuList

    // 1.处理 role 角色表
    if (roleInfo) {
      await roleService.update(roleId, roleInfo)
    }

    // 2.处理 role_menu 关系表
    if (menuList) {
      const rawrRoleMenuList = await roleMenuService.getRoleMenuByRoleId(roleId)
      const oldMenuIdList = rawrRoleMenuList.map((item) => item.menuId)

      // 去旧
      for (const roleMenu of rawrRoleMenuList) {
        if (!menuList.includes(roleMenu.menuId as number)) {
          await roleMenuService.delete(roleMenu.id as number)
        }
      }

      // 添新
      for (const menu of menuList) {
        if (!oldMenuIdList.includes(menu)) {
          await roleMenuService.create(roleId, menu)
        }
      }
    }

    ctx.body = {
      code: 0,
      data: '修改角色成功~'
    }
  }
}

export default roleController
