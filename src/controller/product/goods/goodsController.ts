import goodsService from '@/service/product/goods/goodsService'
import RGoodsCategoryService from '@/service/product/RGoodsCategory/RGoodsCategoryService'

import { toString, splitObj } from '@/utils/transition'

import type IGoodsController from './types'
import type { IGoods } from '@/service/types'
import categoryService from '@/service/product/category/categoryService'

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
    const [goods, { categoryIds }]: [IGoods, any] = splitObj(rawInfo, [
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
    const [link] = splitObj(info, ['offset', 'size']) as [IGoods, any]

    let hasLimit = false
    if (offset && size) {
      hasLimit = true
    }

    const result = await goodsService.getGoodsList(
      link,
      hasLimit ? [offset, size] : []
    )

    ctx.body = {
      code: 200,
      data: {
        list: result,
        totalCount: result.length
      }
    }
  }
}

export default goodsController
