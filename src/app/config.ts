import fs from 'node:fs'
import path from 'node:path'

import dotenv from 'dotenv'

dotenv.config()

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, './key/private.key')
)

const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './key/public.key'))

export { PRIVATE_KEY, PUBLIC_KEY }

export const {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = process.env
