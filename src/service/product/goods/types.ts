import type { ResultSetHeader } from 'mysql2'

import type { IGoods } from '@/service/types'

interface IDetail extends IGoods {
  category: string[]
}

interface IGoodsAmountList {
  inventory: string
  sale: string
  favor: string
  [key: string]: string
}

interface IGoodsAddressSale {
  address: number
  count: number
}

interface IGoodsService {
  create(goodsInfo: IGoods): Promise<ResultSetHeader>
  delete(id: string): Promise<ResultSetHeader>
  update(id: string, goodsInfo: IGoods): Promise<ResultSetHeader>
  getGoodsById(id: string): Promise<IDetail>
  getGoodsList(like: IGoods, limit: string[]): Promise<IGoods[]>
  getGoodsAmountList(): Promise<IGoodsAmountList[]>
  getGoodsAddressSale(): Promise<IGoodsAddressSale[]>
  getGoodsByAny(key: string, value: any): Promise<IGoods[]>
}

export default IGoodsService
