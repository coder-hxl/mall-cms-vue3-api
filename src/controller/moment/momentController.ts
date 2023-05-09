import momentService from '@/service/moment/momentService'

import { toString, splitObj } from '@/utils/transition'

import type { IMomentController } from './types'
import type { IMoment } from '@/service/types'

const momentController: IMomentController = {
  async create(ctx, next) {
    const { id } = ctx.user
    const { title, contentHtml, contentText } = ctx.request.body

    await momentService.create(id, title, contentHtml, contentText)

    ctx.body = {
      code: 200,
      data: '创建故事成功~'
    }
  },
  async delete(ctx, next) {
    const { momentId } = ctx.params

    await momentService.delete(momentId)

    ctx.body = {
      code: 200,
      data: '删除动态成功~'
    }
  },
  async list(ctx, next) {
    const info = ctx.request.body
    const offset = toString(info.offset)
    const size = toString(info.size)
    const [like] = splitObj(info, ['offset', 'size']) as [IMoment, any]

    let hasLimit = false
    if (offset && size) {
      hasLimit = true
    }

    const result = await momentService.getStoryList(
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
  }
}

export default momentController
