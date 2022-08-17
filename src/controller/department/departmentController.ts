import departmentService from '@/service/department/departmentService'
import { IDepartment } from '@/service/types'

import { toString, splitObj } from '@/utils/transition'

import type { IDepatmentController } from './types'

const departmentControll: IDepatmentController = {
  async create(ctx, next) {
    const dInfo = ctx.request.body

    await departmentService.create(dInfo)

    ctx.body = {
      code: 200,
      data: '创建部门成功~'
    }
  },
  async delete(ctx, next) {
    const { departmentId } = ctx.params

    await departmentService.delete(departmentId)

    ctx.body = {
      code: 200,
      data: '删除部门成功~'
    }
  },
  async update(ctx, next) {
    const { departmentId } = ctx.params
    const dInfo = ctx.request.body

    await departmentService.update(departmentId, dInfo)

    ctx.body = {
      code: 200,
      data: '更新部门成功~'
    }
  },
  async detail(ctx, next) {
    const { departmentId } = ctx.params

    const result = await departmentService.getDepartmentById(departmentId)

    ctx.body = {
      code: 200,
      data: result
    }
  },
  async list(ctx, next) {
    const info = ctx.request.body
    const offset = toString(info.offset)
    const size = toString(info.size)
    const [like] = splitObj(info, ['offset', 'size']) as [IDepartment, any]

    let hasLimit = false
    if (offset && size) {
      hasLimit = true
    }

    const result = await departmentService.getDepartmentList(
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

export default departmentControll
