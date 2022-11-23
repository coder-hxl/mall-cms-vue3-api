import fileService from '@/service/file/fileService'
import userService from '@/service/user/userService'

import { APP_HOST, APP_PORT } from '@/app/config'

import type { IFileController } from './types'

const fileController: IFileController = {
  async saveAvatarInfo(ctx, next) {
    // 1.获取信息
    const { id: userId, hasAvatar } = ctx.user
    const { filename, mimetype, size } = ctx.request.file

    // 2.对图像信息进行 创建/更新
    if (!hasAvatar) {
      await fileService.createAvatar(userId, filename, mimetype, size)
    } else {
      await fileService.updateAvatar(userId, filename, mimetype, size)
    }

    // 3.添加图像url到用户表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar/${filename}`
    await userService.update(userId, { avatarUrl })

    ctx.body = {
      code: 200,
      data: {
        newAvatarUrl: avatarUrl
      }
    }
  }
}

export default fileController
