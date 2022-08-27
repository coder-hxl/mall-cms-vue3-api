import categoryService from '@/service/product/category/categoryService'

import { toString, splitObj } from '@/utils/transition'

import type ICategoryController from './types'
import { ICategory } from '@/service/types'

const categoryController: ICategoryController = {
  async create(ctx, next) {
    const { name } = ctx.request.body

    await categoryService.create(name)

    ctx.body = {
      code: 200,
      data: `创建${name}成功~`
    }
  },
  async delete(ctx, next) {
    const { categoryId } = ctx.params

    await categoryService.delete(categoryId)

    ctx.body = {
      code: 200,
      data: `删除成功~`
    }
  },
  async update(ctx, next) {
    const { categoryId } = ctx.params
    const { name } = ctx.request.body

    await categoryService.update(categoryId, name)

    ctx.body = {
      code: 200,
      data: `更新成功~`
    }
  },
  async detail(ctx, next) {
    const { categoryId } = ctx.params

    const resultArr = await categoryService.getCategoryByAny('id', categoryId)
    const category = resultArr[0]

    ctx.body = {
      code: 200,
      data: category
    }
  },
  async list(ctx, next) {
    const info = ctx.request.body
    const offset = toString(info.offset)
    const size = toString(info.size)
    const [like] = splitObj(info, ['offset', 'size']) as [ICategory, any]

    let hasLimit = false
    if (offset && size) {
      hasLimit = true
    }

    const result = await categoryService.getCategoryList(
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
  async goodsCount(ctx, next) {
    const result = await categoryService.getCategoryGoodsCount()

    ctx.body = {
      code: 200,
      data: result
    }
  },
  async goodsSale(ctx, next) {
    const result = await categoryService.getCategoryGoodsSale()

    ctx.body = {
      code: 200,
      data: result
    }
  },
  async goodsFavor(ctx, next) {
    const result = await categoryService.getCategoryGoodsFavor()

    ctx.body = {
      code: 200,
      data: result
    }
  }
}

export default categoryController
