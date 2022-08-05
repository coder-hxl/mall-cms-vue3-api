import pool from '@/app/database'

import { IRoleMenuService } from './types'

const roleMenuService: IRoleMenuService = {
  async create(roleId, menuId) {
    const statement = `INSERT INTO role_menu (roleId, menuId) VALUES (?, ?);`

    const [result] = await pool.execute(statement, [roleId, menuId])

    return result
  },
  async delete(roleMenuId) {
    const statement = `DELETE FROM role_menu WHERE id = ?;`

    const [result] = await pool.execute(statement, [roleMenuId])

    return result
  },
  async getRoleMenuByRoleId(roleId) {
    const statement = `SELECT * FROM role_menu WHERE roleId = ?;`

    const [result] = await pool.execute<any[]>(statement, [roleId])

    return result
  }
}

export default roleMenuService
