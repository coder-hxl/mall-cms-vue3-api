import pool from '@/app/database'
import mapSqlStatement from '@/utils/mapSqlStatement'

import { IRoleService } from './types'

const roleService: IRoleService = {
  async create(roleInfo) {
    const { inserts, placeholders, values } = mapSqlStatement.create(roleInfo)

    const statement = `INSERT INTO role (${inserts.join()}) VALUES (${placeholders.join()});`

    const [result] = await pool.execute(statement, values)

    return result
  },
  async delete(roleId) {
    const statement = `DELETE FROM role WHERE id = ?;`

    const [result] = await pool.execute(statement, [roleId])

    return result
  },
  async update(roleId, roleInfo) {
    const { updates, values } = mapSqlStatement.update(roleInfo)
    const statement = `UPDATE role SET ${updates.join()} WHERE id = ?;`

    const [result] = await pool.execute(statement, [...values, roleId])

    return result
  },
  async getRoleByAny(key, value) {
    const statement = `SELECT * FROM role WHERE ${key} = ?;`

    const [result] = await pool.execute<any[]>(statement, [value])

    return result
  },
  async getRoleList(like, limit) {
    const likes = mapSqlStatement.like(like, 'r')

    // LIKE 和 GROUP BY 无法同时使用
    const sqlLike = likes.length ? `WHERE ${likes.join()}` : 'GROUP BY r.id'
    const sqlLimit = limit.length ? `LIMIT ${limit.join()}` : ''
    const statement = `
      SELECT
       r.id, r.name, r.intro, r.createAt, r.updateAt,
       JSON_ARRAYAGG(JSON_OBJECT(
      	'id', m.id, 'name', m.name, 'type', m.type, 'icon', m.icon, 'parentId', m.parentId, 'url', m.url, 'sort', m.sort, 'permission', m.permission, 'createAt', m.createAt,'updateAt', m.updateAt
       )) menuList
      FROM role r
      LEFT JOIN role_menu rm ON rm.roleId = r.id
      LEFT JOIN menu m ON m.id = rm.menuId
      ${sqlLike}
      ${sqlLimit};
    `

    const [result] = await pool.execute<any>(statement, [limit])

    return result
  },
  async getRoleMenuById(id) {
    const statement = `
      SELECT
       JSON_ARRAYAGG(JSON_OBJECT(
      	'id', m.id, 'name', m.name, 'type', m.type, 'icon', m.icon, 'parentId', m.parentId, 'url', m.url, 'sort', m.sort, 'permission', m.permission, 'createAt', m.createAt,'updateAt', m.updateAt
       )) menuList
      FROM role r
      LEFT JOIN role_menu rm ON rm.roleId = r.id
      LEFT JOIN menu m ON m.id = rm.menuId
      WHERE r.id = ?;
    `

    const [result] = await pool.execute<any>(statement, [id])

    return result[0].menuList
  }
}

export default roleService
