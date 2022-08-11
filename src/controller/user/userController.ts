import userService from '@/service/user/userService'

import { toString } from '@/utils/transition'

import type { IUserController } from './types'

const userController: IUserController = {
  async create(ctx, next) {
    const userInfo = ctx.request.body

    await userService.create(userInfo)

    ctx.body = {
      code: 200,
      data: '创建用户成功~'
    }
  },
  async delete(ctx, next) {
    const { userId } = ctx.params

    await userService.delete(userId)

    ctx.body = {
      code: 200,
      data: '删除用户成功~'
    }
  },
  async update(ctx, next) {
    const { userId } = ctx.params
    const updateInfo = ctx.request.body

    await userService.update(userId, updateInfo)

    ctx.body = {
      code: 200,
      data: '修改用户成功~'
    }
  },
  async detail(ctx, next) {
    const { userId } = ctx.params

    const result = await userService.getUserByID(userId)

    ctx.body = {
      code: 200,
      data: result
    }
  },
  async list(ctx, next) {
    const offset = toString(ctx.request.body.offset)
    const size = toString(ctx.request.body.size)
    const like = ctx.request.body
    let hasLimit = false

    if (offset && size) {
      hasLimit = true
    }

    const result = await userService.getUserList(
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

export default userController
