import pool from '@/app/database'
import mapSqlStatement from '@/utils/mapSqlStatement'

import { IRoleService } from './types'

const roleService: IRoleService = {
  async update(roleId, menuInfo) {
    const { updates, values } = mapSqlStatement.update(menuInfo)
    const statement = `UPDATE role SET ${updates.join(',')} WHERE id = ?;`

    const [result] = await pool.execute(statement, [...values, roleId])

    return result
  }
}

export default roleService
