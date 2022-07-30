import mysql2 from 'mysql2'

import {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} from './config'

const pool = mysql2.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT as any,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
})

pool.getConnection((err) => {
  if (err) {
    console.log('数据库连接失败:', err)
  } else {
    console.log('数据库连接成功~')
  }
})

export default pool.promise()
