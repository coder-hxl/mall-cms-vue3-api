import Koa from 'koa'
import koaBody from 'koa-body'

import useRouter from '@/router'
import errorHandle from './error-handle'

import type { IApp } from './types'

const app: IApp = new Koa()
app.useRouter = useRouter

app.use(koaBody())
app.useRouter()

app.on('error', errorHandle)

export default app
