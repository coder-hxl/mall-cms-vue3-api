import pool from '@/app/database'
import mapSqlStatement from '@/utils/mapSqlStatement'
import type ICategoryService from './types'

const categoryService: ICategoryService = {
  async create(name) {
    const statement = `INSERT INTO category (name) VALUES (?);`

    const [result] = await pool.execute(statement, [name])

    return result
  },
  async delete(id) {
    const statement = `DELETE FROM category WHERE id = ?;`

    const [result] = await pool.execute(statement, [id])

    return result
  },
  async update(id, name) {
    const statement = `UPDATE category SET name = ? WHERE id = ?;`

    const [result] = await pool.execute(statement, [name, id])

    return result
  },
  async getCategoryList(like, limit) {
    const likes = mapSqlStatement.like(like, 'c')

    const sqlLike = likes.length ? `WHERE ${likes.join()}` : ''
    const sqlLmit = limit.length ? `LIMIT ?, ?` : ''
    const statement = `
      SELECT * FROM category c
      ${sqlLike}
      ${sqlLmit};
      `

    const [result] = await pool.execute<any[]>(statement, limit)

    return result
  },
  async getCategorByAny(key, value) {
    const statement = `SELECT * FROM category WHERE ${key} = ?;`

    const [result] = await pool.execute<any[]>(statement, [value])

    return result
  }
}

export default categoryService
