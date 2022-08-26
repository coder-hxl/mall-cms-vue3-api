import pool from '@/app/database'

import mapSqlStatement from '@/utils/mapSqlStatement'

import type { ResultSetHeader } from 'mysql2'
import type { IFileService } from './types'

const fileService: IFileService = {
  async createAvatar(userId, filename, mimetype, size) {
    const { inserts, placeholders, values } = mapSqlStatement.create({
      userId,
      filename,
      mimetype,
      size
    })
    const statement = `INSERT INTO avatar (${inserts.join()}) VALUES (${placeholders.join()});`

    const [result] = await pool.execute<ResultSetHeader>(statement, values)

    return result
  },
  async updateAvatar(userId, filename, mimetype, size) {
    const { updates, values } = mapSqlStatement.update({
      filename,
      mimetype,
      size
    })
    const statement = `UPDATE avatar SET ${updates.join()} WHERE userId = ?;`

    const [result] = await pool.execute<ResultSetHeader>(statement, [
      ...values,
      userId
    ])

    return result
  },
  async getAvatartByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE userId = ?;`

    const [result] = await pool.execute<any[]>(statement, [userId])

    return result[0]
  }
}

export default fileService
