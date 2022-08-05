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
  async update(roleId, roleInfo) {
    const { updates, values } = mapSqlStatement.update(roleInfo)
    const statement = `UPDATE role SET ${updates.join(',')} WHERE id = ?;`

    const [result] = await pool.execute(statement, [...values, roleId])

    return result
  },
  async getRoleByName(name) {
    const statement = `SELECT * FROM role WHERE name = ?;`

    const [result] = await pool.execute<any[]>(statement, [name])

    return result
  }
}

export default roleService
