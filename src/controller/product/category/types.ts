import type { IMiddleware } from '@/middleware/types'

interface ICategoryController {
  create: IMiddleware
  delete: IMiddleware
  update: IMiddleware
  detail: IMiddleware
  list: IMiddleware
  goodsCount: IMiddleware
  goodsSale: IMiddleware
  goodsFavor: IMiddleware
}
export default ICategoryController
