import pool from '@/app/database'
import mapSqlStatement from '@/utils/mapSqlStatement'

import type { ResultSetHeader } from 'mysql2'
import type { IMenuService } from './types'

const getField = (TName: string) => {
  return `'id', ${TName}.id, 'name', ${TName}.name, 'type', ${TName}.type, 'sort', ${TName}.sort, 'icon', ${TName}.icon, 'parentId', ${TName}.parentId, 'url', ${TName}.url, 'permission', ${TName}.permission, 'createAt', ${TName}.createAt,'updateAt', ${TName}.updateAt`
}

const menuService: IMenuService = {
  async create(menuInfo) {
    const { inserts, placeholders, values } = mapSqlStatement.create(menuInfo)
    const statement = `INSERT INTO menu (${inserts.join()}) VALUES (${placeholders.join()});`

    const [result] = await pool.execute<ResultSetHeader>(statement, values)

    return result
  },
  async delete(menuId) {
    const statement = `DELETE FROM menu WHERE id = ?;`

    const [result] = await pool.execute<ResultSetHeader>(statement, [menuId])

    return result
  },
  async update(menuId, menuInfo) {
    const { updates, values } = mapSqlStatement.update(menuInfo)
    const statement = `UPDATE menu SET ${updates.join()} WHERE id = ?;`

    const [result] = await pool.execute<ResultSetHeader>(statement, [
      ...values,
      menuId
    ])

    return result
  },
  async getMenuByAny(key, value) {
    const statement = `SELECT * FROM menu WHERE ${key} = ?;`

    const [result] = await pool.execute<any[]>(statement, [value])

    return result
  },
  async getMenuById(menuId) {
    const statement = `SELECT * FROM menu WHERE id = ?;`

    const [result] = await pool.execute<any[]>(statement, [menuId])

    return result[0]
  },
  async getMenuList(like, limit) {
    const likes = mapSqlStatement.like(like, 'm')

    const sqlLinke = likes.length ? `AND ${likes.join(' ')}` : ''
    const sqlLimit = limit.length ? 'LIMIT ?, ?' : ''
    const statement = `
      SELECT
      	m.id, m.name, m.type, m.icon, m.url, m.sort, m.permission, m.createAt, m.updateAt,
      	(SELECT
      		JSON_ARRAYAGG(JSON_OBJECT(${getField('m2')}, 'children', (
      			SELECT
      				JSON_ARRAYAGG(JSON_OBJECT(${getField('m3')}))
      			FROM menu m3 WHERE m3.type = 3 AND m3.parentId = m2.id)))
      	FROM menu m2 WHERE m2.type = 2 AND m2.parentId = m.id) children
      FROM menu m
      WHERE m.type = 1
      ${sqlLinke} ${sqlLimit};
    `

    const [result] = await pool.execute<any[]>(statement, limit)

    return result
  }
}

export default menuService
