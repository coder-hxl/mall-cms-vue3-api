import pool from '@/app/database'
import mapSqlStatement from '@/utils/mapSqlStatement'

import type { ResultSetHeader } from 'mysql2'
import type ICategoryService from './types'

const categoryService: ICategoryService = {
  async create(name) {
    const statement = `INSERT INTO category (name) VALUES (?);`

    const [result] = await pool.execute<ResultSetHeader>(statement, [name])

    return result
  },
  async delete(id) {
    const statement = `DELETE FROM category WHERE id = ?;`

    const [result] = await pool.execute<ResultSetHeader>(statement, [id])

    return result
  },
  async update(id, name) {
    const statement = `UPDATE category SET name = ? WHERE id = ?;`

    const [result] = await pool.execute<ResultSetHeader>(statement, [name, id])

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
  async getCategoryGoodsCount() {
    const statement = `
      SELECT
      	c.id, c.name, COUNT(gc.goodsId) goodsCount
      FROM category c
      LEFT JOIN goods_category gc ON gc.categoryId = c.id
      GROUP BY c.id;
    `

    const [result] = await pool.execute<any[]>(statement)

    return result
  },
  async getCategoryGoodsSale() {
    const statement = `
      SELECT
      	c.id, c.name, SUM(g.saleCount) saleCount
      FROM category c
      LEFT JOIN goods_category gc ON gc.categoryId = c.id
      LEFT JOIN goods g ON g.id = gc.goodsId
      GROUP BY c.id;
    `

    const [result] = await pool.execute<any[]>(statement)

    return result
  },
  async getCategoryGoodsFavor() {
    const statement = `
      SELECT
      	c.id, c.name, SUM(g.favorCount) favorCount
      FROM category c
      LEFT JOIN goods_category gc ON gc.categoryId = c.id
      LEFT JOIN goods g ON g.id = gc.goodsId
      GROUP BY c.id;
    `

    const [result] = await pool.execute<any[]>(statement)

    return result
  },
  async getCategoryByAny(key, value) {
    const statement = `SELECT * FROM category WHERE ${key} = ?;`

    const [result] = await pool.execute<any[]>(statement, [value])

    return result
  }
}

export default categoryService
