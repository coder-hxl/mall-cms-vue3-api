import pool from '@/app/database'
import mapSqlStatement from '@/utils/mapSqlStatement'

import type { IDepartmentService } from './types'

const departmentService: IDepartmentService = {
  async create(info) {
    const { inserts, placeholders, values } = mapSqlStatement.create(info)

    const statement = `INSERT INTO department (${inserts.join()}) VALUES (${placeholders.join()});`

    const [result] = await pool.execute(statement, values)

    return result
  },
  async delete(id) {
    const statement = `DELETE FROM department WHERE id = ?;`

    const [result] = await pool.execute(statement, [id])

    return result
  },
  async update(id, info) {
    const { updates, values } = mapSqlStatement.update(info)

    const statement = `UPDATE department SET ${updates.join()} WHERE id = ?;`

    const [result] = await pool.execute(statement, [...values, id])

    return result
  },
  async getDepartmentByAny(key, value) {
    const statement = `SELECT * FROM department WHERE ${key} = ?;`

    const [result] = await pool.execute<any[]>(statement, [value])

    return result
  },
  async getDepartmentById(id) {
    const statement = `SELECT * FROM department WHERE id = ?;`

    const [result] = await pool.execute<any[]>(statement, [id])

    return result[0]
  },
  async getDepartmentList(like, limit) {
    const likes = mapSqlStatement.like(like, 'd')

    const statement = `
      SELECT
    	  d.id, d.name, d.parentId, d.leader, d.createAt, d.updateAt,
        dc.name parentName
      FROM department d
      LEFT JOIN department dc ON dc.id = d.parentId
      ${likes.length ? `WHERE ${likes.join(' ')}` : ''}
      ${limit.length ? 'LIMIT ?, ?' : ''};
    `

    const [result] = await pool.execute<any[]>(statement, limit)

    return result
  }
}

export default departmentService
