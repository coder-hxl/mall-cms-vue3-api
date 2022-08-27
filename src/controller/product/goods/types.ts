import type { IMiddleware } from '@/middleware/types'

interface IGoodsController {
  create: IMiddleware
  delete: IMiddleware
  update: IMiddleware
  detail: IMiddleware
  list: IMiddleware
  amountList: IMiddleware
  addressSale: IMiddleware
}
export default IGoodsController
