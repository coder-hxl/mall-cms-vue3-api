import pool from '@/app/database'

import type { IUserService } from './types'

const userService: IUserService = {
  async getUserByName(userName) {
    const statement = `SELECT * FROM users WHERE name = ?;`

    const [result] = await pool.execute(statement, [userName])

    return result
  }
}

export default userService
