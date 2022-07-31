import pool from '@/app/database'

import type { IUserService } from './types'
import type { IUser } from '../types'

const userService: IUserService = {
  async getUserByName(userName) {
    const statement = `SELECT * FROM users WHERE name = ?;`

    const [result] = await pool.execute<any>(statement, [userName])

    return result
  }
}

export default userService
