import fs from 'node:fs/promises'
import path from 'node:path'

import multer from '@koa/multer'
import jimp from 'jimp'

import fileService from '@/service/file/fileService'

import { AVATAR_PATH } from '@/constants/filePath'

import type { IMiddleware } from './types'

const avatarUpload = multer({ dest: AVATAR_PATH })
const avatarHandle = avatarUpload.single('avatar')

const avatarExists: IMiddleware = async (ctx, next) => {
  const { id: userId } = ctx.user

  // 把储存在本地的旧头像删掉
  const oldAvatar = await fileService.getAvatartByUserId(userId)
  if (oldAvatar) {
    ctx.user.hasAvatar = true
    fs.unlink(`${AVATAR_PATH}/${oldAvatar.filename}`)
  }

  await next()
}

const avatarCover: IMiddleware = async (ctx, next) => {
  const file = ctx.request.file

  // 调整图像
  const destPath = path.join(AVATAR_PATH, file.filename)
  jimp.read(destPath).then((image) => {
    image.cover(320, 320).write(destPath)
  })

  await next()
}

export { avatarHandle, avatarExists, avatarCover }
