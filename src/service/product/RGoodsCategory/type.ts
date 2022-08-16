import { ResultSetHeader } from 'mysql2'

import { IRGoodsCategory } from '@/service/types'

interface IRGoodsCategoryService {
  create(
    goodsId: number | string,
    categoryId: number | number[]
  ): Promise<ResultSetHeader[]>
  delete(id: number): Promise<any>
  getGoodsCategoryByAny(key: string, value: any): Promise<IRGoodsCategory[]>
}

export default IRGoodsCategoryService
