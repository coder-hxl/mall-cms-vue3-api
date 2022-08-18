import storyService from '@/service/story/storyService'

import { toString, splitObj } from '@/utils/transition'

import type { IStoryController } from './types'
import type { IStory } from '@/service/types'

const storyController: IStoryController = {
  async create(ctx, next) {
    const { id } = ctx.user
    const { content } = ctx.request.body

    await storyService.create(id, content)

    ctx.body = {
      code: 200,
      data: '创建故事成功~'
    }
  },
  async list(ctx, next) {
    const info = ctx.request.body
    const offset = toString(info.offset)
    const size = toString(info.size)
    const [like] = splitObj(info, ['offset', 'size']) as [IStory, any]

    let hasLimit = false
    if (offset && size) {
      hasLimit = true
    }

    const result = await storyService.getStoryList(
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

export default storyController
