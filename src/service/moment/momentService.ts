import pool from '@/app/database'
import mapSqlStatement from '@/utils/mapSqlStatement'

import { ResultSetHeader } from 'mysql2'
import type IStoryService from './types'

const momentService: IStoryService = {
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, userId) VALUES (?, ?);`

    const [result] = await pool.execute<ResultSetHeader>(statement, [
      content,
      userId
    ])

    return result
  },
  async getStoryList(like, limit) {
    const likes = mapSqlStatement.like(like, 's')

    // LIKE 和 GROUP BY 无法同时使用
    const sqlLike = likes.length ? `WHERE ${likes.join()}` : ''
    const sqlLimit = limit.length ? `LIMIT ?, ?` : ''
    const statement = `
      SELECT
        s.id, s.content, u.name, s.createAt, s.updateAt
      FROM moment s
      LEFT JOIN users u ON u.id = s.userId
      ${sqlLike}
      ${sqlLimit};
    `

    const [result] = await pool.execute<any>(statement, limit)

    return result
  },
  async getStoryByAny(key, value) {
    const statement = `SELECT * FROM moment WHERE ${key} = ?;`

    const [result] = await pool.execute<any>(statement, value)

    return result
  }
}

export default momentService
