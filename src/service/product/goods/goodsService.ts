import { ResultSetHeader } from 'mysql2'

import pool from '@/app/database'
import mapSqlStatement from '@/utils/mapSqlStatement'

import type IGoodsService from './types'

const goodsService: IGoodsService = {
  async create(goods) {
    const { inserts, placeholders, values } = mapSqlStatement.create(goods)

    const statement = `INSERT INTO goods (${inserts.join()}) VALUES (${placeholders.join()});`

    const [result] = await pool.execute<ResultSetHeader>(statement, values)

    return result
  },
  async delete(id) {
    const statement = `DELETE FROM goods WHERE id = ?;`

    const [result] = await pool.execute<ResultSetHeader>(statement, [id])

    return result
  },
  async update(id, info) {
    const { updates, values } = mapSqlStatement.update(info)
    const statement = `UPDATE goods SET ${updates.join()} WHERE id = ?;`

    const [result] = await pool.execute<ResultSetHeader>(statement, [
      ...values,
      id
    ])

    return result
  },
  async getGoodsById(id) {
    const statement = `
      SELECT
      	g.id, g.name, g.oldPrice, g.newPrice, g.description, g.enable,
        g.imgUrl, g.inventoryCount, g.saleCount, g.favorCount, g.address,
        JSON_ARRAYAGG(c.name) category, g.createAt, g.updateAt
      FROM goods g
      LEFT JOIN goods_category gc ON gc.goodsId = g.id
      LEFT JOIN category c ON c.id = gc.categoryId
      WHERE g.id = ?;
    `

    const [result] = await pool.execute<any[]>(statement, [id])

    return result[0]
  },
  async getGoodsList(like, limit) {
    const likes = mapSqlStatement.like(like, 'g')

    const sqlLike = likes.length ? `WHERE ${likes.join()}` : ''
    const sqlLmit = limit.length ? `LIMIT ?, ?` : ''
    const statement = `
      SELECT
      	g.id, g.name, g.oldPrice, g.newPrice, g.description, g.enable,
        g.imgUrl, g.inventoryCount, g.saleCount, g.favorCount, g.address,
        JSON_ARRAYAGG(c.name) category, g.createAt, g.updateAt
      FROM goods g
      LEFT JOIN goods_category gc ON gc.goodsId = g.id
      LEFT JOIN category c ON c.id = gc.categoryId
      ${sqlLike}
      GROUP BY g.id
      ${sqlLmit};
      `

    const [result] = await pool.execute<any[]>(statement, limit)

    return result
  },
  async getGoodsAmountList() {
    const statement = `
      SELECT
	      SUM(inventoryCount) inventory, SUM(saleCount) sale,
        SUM(favorCount) favor
      FROM goods;
    `

    const [result] = await pool.execute<any[]>(statement)

    return result
  },
  async getGoodsAddressSale() {
    const statement = `
      SELECT
	      address, SUM(saleCount) count
      FROM goods
      GROUP BY goods.address;
    `

    const [result] = await pool.execute<any[]>(statement)

    return result
  },
  async getGoodsByAny(key, value) {
    const statement = `SELECT * FROM goods WHERE ${key} = ?;`

    const [result] = await pool.execute<any>(statement, [value])

    return result
  }
}

export default goodsService
