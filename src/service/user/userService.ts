import pool from '@/app/database'

import sqlExpectHandle from '@/utils/sqlExpectHandle'

import type { IUserService } from './types'
import type { IUser } from '../types'

const userService: IUserService = {
  async create(userInfo) {
    const { inserts, placeholders, values } =
      sqlExpectHandle.create<IUser>(userInfo)

    const statement = `INSERT INTO users (${inserts.join()}) VALUES (${placeholders.join()});`

    const [result] = await pool.execute(statement, values)

    return result
  },
  async delete(userId) {
    const statement = `DELETE FROM users WHERE id = ?;`

    const [result] = await pool.execute(statement, [userId])

    return result
  },
  async update(userId, updateInfo) {
    const { updates, values } = sqlExpectHandle.update<IUser>(updateInfo)

    const statement = `UPDATE users SET ${updates.join()} WHERE id = ?;`

    const [result] = await pool.execute(statement, [...values, userId])

    return result
  },
  async getUserByName(userName) {
    const statement = `SELECT * FROM users WHERE name = ?;`

    const [result] = await pool.execute<any>(statement, [userName])

    return result
  },
  async getUserByID(userId) {
    const statement = `
      SELECT
        u.id, u.name, u.realname, u.cellphone, u.enable, u.createAt, u.updateAt,
      	JSON_OBJECT('name', r.name, 'intro', r.intro, 'createAt', r.createAt,'updateAt', r.updateAt) role,
      	JSON_OBJECT('name', d.name, 'parentId', d.parentId, 'leader', d.leader, 'createAt', d.createAt, 'updateAt', d.updateAt) depatment
      FROM users u
      LEFT JOIN role r ON r.id = u.roleId
      LEFT JOIN department d ON d.id = u.departmentId
      WHERE u.id = ?;
    `

    const [result] = await pool.execute<any>(statement, [userId])

    return result[0]
  },
  async getUserList(like, showLimit, offset, size) {
    const likes = sqlExpectHandle.like(like, 'u')
    const value = showLimit ? [offset, size] : []

    const statement = `
      SELECT
    	  u.name, u.realname, u.cellphone, u.enable, u.departmentId, u.roleId, u.createAt, u.updateAt
      FROM users u
      ${likes.length ? `WHERE ${likes.join(' ')}` : ''}
      ${showLimit ? 'LIMIT ?, ?' : ''};
    `

    const [result] = await pool.execute<any[]>(statement, value)

    return result
  }
}

export default userService
