import userService from '@/service/user/userService'

import type { IUserController } from './types'

const userController: IUserController = {
  async create(ctx, next) {
    const userInfo = ctx.request.body

    await userService.create(userInfo)

    ctx.body = {
      code: 0,
      data: '创建用户成功~'
    }
  }
}

export default userController
