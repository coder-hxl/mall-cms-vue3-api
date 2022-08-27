import type { ResultSetHeader } from 'mysql2'
import type { ICategory } from '@/service/types'

interface ICategoryGoodsCount {
  id: number
  name: string
  goodsCount: number
}

interface ICategoryGoodsSale {
  id: number
  name: string
  saleCount: number
}

interface ICategoryGoodsFavor {
  id: number
  name: string
  favorCount: number
}

interface ICategoryService {
  create(name: string): Promise<ResultSetHeader>
  delete(id: string): Promise<ResultSetHeader>
  update(id: string, name: string): Promise<ResultSetHeader>
  getCategoryList(like: ICategory, limit: string[]): Promise<ICategory[]>
  getCategoryGoodsCount(): Promise<ICategoryGoodsCount[]>
  getCategoryGoodsSale(): Promise<ICategoryGoodsSale[]>
  getCategoryGoodsFavor(): Promise<ICategoryGoodsFavor[]>
  getCategoryByAny(key: string, value: any): Promise<ICategory[]>
}

export default ICategoryService
