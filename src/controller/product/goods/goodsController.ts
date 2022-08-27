import goodsService from '@/service/product/goods/goodsService'
import RGoodsCategoryService from '@/service/product/RGoodsCategory/RGoodsCategoryService'

import { toString, splitObj } from '@/utils/transition'

import type IGoodsController from './types'
import type { IGoods } from '@/service/types'

const goodsController: IGoodsController = {
  async create(ctx, next) {
    const rawInfo = ctx.request.body
    const [goods, { categoryIds }]: [IGoods, any] = splitObj(rawInfo, [
      'categoryIds'
    ])

    const goodsResult = await goodsService.create(goods)
    await RGoodsCategoryService.create(goodsResult.insertId, categoryIds ?? [])

    ctx.body = {
      code: 200,
      data: `创建${goods.name}商品成功~`
    }
  },
  async delete(ctx, next) {
    const { goodsId } = ctx.params

    await goodsService.delete(goodsId)

    ctx.body = {
      code: 200,
      data: `删除成功~`
    }
  },
  async update(ctx, next) {
    const { goodsId } = ctx.params
    const rawInfo = ctx.request.body
    const [goods, { categoryIds = [] }]: [IGoods, any] = splitObj(rawInfo, [
      'categoryIds'
    ])

    // 更新 goods 表
    await goodsService.update(goodsId, goods)

    // 更新 goods_category 表
    const RGoodsCategoryList =
      await RGoodsCategoryService.getGoodsCategoryByAny('goodsId', goodsId)
    const oldCategoryIds = RGoodsCategoryList.map((item) => item.categoryId)

    // 删旧
    for (const item of RGoodsCategoryList) {
      if (!categoryIds.includes(item.categoryId)) {
        await RGoodsCategoryService.delete(item.id as number)
      }
    }

    // 添新
    for (const item of categoryIds) {
      if (!oldCategoryIds.includes(item)) {
        await RGoodsCategoryService.create(goodsId, item)
      }
    }

    ctx.body = {
      code: 200,
      data: `更新成功~`
    }
  },
  async detail(ctx, next) {
    const { goodsId } = ctx.params

    const result = await goodsService.getGoodsById(goodsId)

    ctx.body = {
      code: 200,
      data: result
    }
  },
  async list(ctx, next) {
    const info = ctx.request.body
    const offset = toString(info.offset)
    const size = toString(info.size)
    const [like] = splitObj(info, ['offset', 'size']) as [IGoods, any]

    let hasLimit = false
    if (offset && size) {
      hasLimit = true
    }

    const result = await goodsService.getGoodsList(
      like,
      hasLimit ? [offset, size] : []
    )

    ctx.body = {
      code: 200,
      data: {
        list: result,
        totalCount: result.length
      }
    }
  },
  async amountList(ctx, next) {
    const result = await goodsService.getGoodsAmountList()
    const amount = result[0]

    const amountListResult = []

    for (const key in amount) {
      const value = parseInt(amount[key])
      let item: any

      if (key === 'inventory') {
        item = {
          title: '商品总库存',
          tips: '所有商品的总库存'
        }
      } else if (key === 'sale') {
        item = {
          title: '商品总收藏',
          tips: '所有商品的总收藏'
        }
      } else if (key === 'favor') {
        item = {
          title: '商品总销量',
          tips: '所有商品的总销量'
        }
      }

      if (item) {
        item.amount = key
        item.value = value
        amountListResult.push(item)
      }
    }

    ctx.body = {
      code: 200,
      data: amountListResult
    }
  },
  async addressSale(ctx, next) {
    const result = await goodsService.getGoodsAddressSale()

    ctx.body = {
      code: 200,
      data: result
    }
  }
}

export default goodsController
