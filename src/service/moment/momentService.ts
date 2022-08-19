import pool from '@/app/database'
import mapSqlStatement from '@/utils/mapSqlStatement'

import { ResultSetHeader } from 'mysql2'
import type IStoryService from './types'

const momentService: IStoryService = {
  async create(userId, contentHtml, contentText) {
    const statement = `INSERT INTO moment (contentHtml, contentText, userId) VALUES (?, ?, ?);`
    console.log(contentHtml, contentText)

    const [result] = await pool.execute<ResultSetHeader>(statement, [
      contentHtml,
      contentText,
      userId
    ])

    return result
  },
  async getStoryList(like, limit) {
    const likes = mapSqlStatement.like(like, 's')

    const sqlLike = likes.length ? `WHERE ${likes.join()}` : ''
    const sqlLimit = limit.length ? `LIMIT ?, ?` : ''
    const statement = `
      SELECT
        s.id, s.contentHtml, s.contentText, u.name, s.createAt, s.updateAt
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
