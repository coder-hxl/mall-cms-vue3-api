import roleService from '@/service/role/roleService'
import RRoleMenuService from '@/service/RRoleMenu/RRoleMenuService'

import { toString, splitObj } from '@/utils/transition'
import { menuListHandle } from '@/utils/menuHandle'

import type { IRoleController } from './types'
import { IRole } from '@/service/types'

const roleController: IRoleController = {
  async create(ctx, next) {
    const info = ctx.request.body
    const [roleInfo, { menuList }]: [IRole, any] = splitObj(info, ['menuList'])

    const roleResult = await roleService.create(roleInfo)

    for (const menuId of menuList) {
      await RRoleMenuService.create(roleResult.insertId, menuId)
    }

    ctx.body = {
      code: 0,
      data: `创建${roleInfo.name}成功~`
    }
  },
  async delete(ctx, next) {
    const { roleId } = ctx.params

    await roleService.delete(roleId)

    ctx.body = {
      code: 200,
      data: '删除角色成功~'
    }
  },
  async update(ctx, next) {
    const { roleId } = ctx.params
    const info = ctx.request.body
    const [roleInfo, { menuList = [] }]: [IRole, any] = splitObj(info, [
      'menuList'
    ])

    // 1.处理 role 角色表
    if (roleInfo) {
      await roleService.update(roleId, roleInfo)
    }

    // 2.处理 role_menu 关系表
    if (menuList) {
      const rawrRoleMenuList = await RRoleMenuService.getRoleMenuByRoleId(
        roleId
      )
      const oldMenuIdList = rawrRoleMenuList.map((item) => item.menuId)

      // 删旧
      for (const roleMenu of rawrRoleMenuList) {
        if (!menuList.includes(roleMenu.menuId as number)) {
          await RRoleMenuService.delete(roleMenu.id as number)
        }
      }

      // 添新
      for (const menu of menuList) {
        if (!oldMenuIdList.includes(menu)) {
          await RRoleMenuService.create(roleId, menu)
        }
      }
    }

    ctx.body = {
      code: 0,
      data: '修改角色成功~'
    }
  },
  async detail(ctx, next) {
    const { roleId } = ctx.params

    const [result] = await roleService.getRoleByAny('id', roleId)

    ctx.body = {
      code: 200,
      data: result
    }
  },
  async list(ctx, next) {
    const info = ctx.request.body
    const offset = toString(info.offset)
    const size = toString(info.size)
    const [like] = splitObj(info, ['offset', 'size']) as [IRole, any]

    let hasLimit = false
    if (offset && size) {
      hasLimit = true
    }

    const roleResult = await roleService.getRoleList(
      like,
      hasLimit ? [offset, size] : []
    )

    // 处理 menuList
    for (const role of roleResult) {
      role.menuList = menuListHandle(role.menuList)
    }

    ctx.body = {
      code: 200,
      data: {
        list: roleResult,
        totalCount: roleResult.length
      }
    }
  },
  async roleMenu(ctx, next) {
    const { roleId } = ctx.params

    const menuList = await roleService.getRoleMenuById(roleId)

    const result = menuListHandle(menuList)

    ctx.body = {
      code: 200,
      data: result
    }
  }
}

export default roleController
