import type Koa from 'koa'

interface IApp extends Koa {
  useRouter?: (this: IApp) => void
}

export { IApp }
