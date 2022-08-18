import { IMiddleware } from '@/middleware/types'

interface IStoryController {
  create: IMiddleware
  list: IMiddleware
}

export { IStoryController }
