import roleService from '@/service/role/roleService'
import roleMenuService from '@/service/roleMenu/roleMenuService'

import type { IRoleController } from './types'

const roleController: IRoleController = {
  async create(ctx, next) {
    const roleInfo = ctx.role || {}
    const menuList = ctx.menuList || []

    const roleResult = await roleService.create(roleInfo)

    for (const menuId of menuList) {
      await roleMenuService.create(roleResult.insertId, menuId)
    }

    ctx.body = {
      code: 0,
      data: `创建${roleInfo.name}成功~`
    }
  },
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

      // 删旧
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
