import pool from '@/app/database'

import type { IUserService } from './types'

const userService: IUserService = {
  async getUserByName(userName) {
    const statement = `SELECT * FROM users WHERE name = ?;`

    const [result] = await pool.execute<any>(statement, [userName])

    return result
  },
  async create(userInfo) {
    const {
      name,
      realname,
      password,
      cellphone,
      enable,
      departmentId,
      roleId
    } = userInfo
    const statement = `INSERT INTO users (name, realname, password, cellphone, enable, departmentId, roleId) VALUES (?, ?, ?, ?, ?, ?, ?);`

    const [result] = await pool.execute(statement, [
      name,
      realname,
      password,
      cellphone,
      enable,
      departmentId,
      roleId
    ])

    return result
  }
}

export default userService
