import Koa from 'koa'
import koaBody from 'koa-body'
import cors from '@koa/cors'

import useRouter from '@/router'
import errorHandle from './errorHandle'

import type { IApp } from './types'

const app: IApp = new Koa()
app.useRouter = useRouter

app.use(cors())
app.use(koaBody())
app.useRouter()

app.on('error', errorHandle)

export default app
