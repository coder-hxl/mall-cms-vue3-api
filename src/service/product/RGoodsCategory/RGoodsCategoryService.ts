import { ResultSetHeader } from 'mysql2'

import pool from '@/app/database'
import IRGoodsCategoryService from './type'

const RGoodsCategoryService: IRGoodsCategoryService = {
  async create(goodsId, categoryId) {
    const resultArr: ResultSetHeader[] = []
    const statement = `INSERT INTO goods_category (goodsId, categoryId) VALUES (?, ?);`

    async function addResult(cId: number) {
      const [result] = await pool.execute<ResultSetHeader>(statement, [
        goodsId,
        cId
      ])
      resultArr.push(result)
    }

    if (typeof categoryId === 'number') {
      await addResult(categoryId)
    } else if (Array.isArray(categoryId)) {
      for (const id of categoryId) {
        await addResult(id)
      }
    }

    return resultArr
  },
  async delete(id) {
    const statement = `DELETE FROM goods_category WHERE id = ?;`

    const [result] = await pool.execute<ResultSetHeader>(statement, [id])

    return result
  },
  async getGoodsCategoryByAny(key, value) {
    const statement = `SELECT * FROM goods_category WHERE ${key} = ?;`

    const [result] = await pool.execute<any>(statement, [value])

    return result
  }
}

export default RGoodsCategoryService
