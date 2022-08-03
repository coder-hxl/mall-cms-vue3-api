import pool from '@/app/database'
import mapSqlStatement from '@/utils/mapSqlStatement'

import type { IMenuService } from './types'

const menuService: IMenuService = {
  async create(menuInfo) {
    const { inserts, placeholders, values } = mapSqlStatement.create(menuInfo)
    const statement = `INSERT INTO menu (${inserts.join()}) VALUES (${placeholders.join()});`

    const [result] = await pool.execute(statement, values)

    return result
  },
  async getMenuByName(name) {
    const statement = `SELECT * FROM menu WHERE name = ?;`

    const [result] = await pool.execute<any[]>(statement, [name])

    return result
  },
  async getMenuByUrl(url) {
    const statement = `SELECT * FROM menu WHERE url = ?;`

    const [result] = await pool.execute<any[]>(statement, [url])

    return result
  }
}

export default menuService
