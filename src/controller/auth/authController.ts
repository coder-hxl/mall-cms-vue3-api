import jwt from 'jsonwebtoken'

import { PRIVATE_KEY } from '@/app/config'

import type { IAuthController } from './types'

const authController: IAuthController = {
  async login(ctx, next) {
    const { id, name } = ctx.user

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })

    ctx.body = {
      code: 0,
      data: {
        id,
        name,
        token
      }
    }
  },
  async success(ctx, next) {
    ctx.body = {
      code: 0,
      data: '授权成功~'
    }
  }
}

export default authController
