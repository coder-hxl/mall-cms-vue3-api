import fs from 'node:fs'

import userService from '@/service/user/userService'
import fileService from '@/service/file/fileService'

import { toString, splitObj } from '@/utils/transition'
import { AVATAR_PATH } from '@/constants/filePath'

import type { IUserController } from './types'
import { IUser } from '@/service/types'

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
    const info = ctx.request.body
    const offset = toString(info.offset)
    const size = toString(info.size)
    const [like] = splitObj(info, ['offset', 'size']) as [IUser, any]

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
  },
  async avatarInfo(ctx, next) {
    const { userId } = ctx.params

    const result = await fileService.getAvatartByUserId(userId)

    // 设置类型并返回内容
    ctx.response.set('content-Type', result.mimetype ?? '')
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)
  }
}

export default userController
