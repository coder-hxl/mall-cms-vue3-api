import Router from '@koa/router'

import { verifyAuth, verifyCUInfo } from '@/middleware/verifyMiddleware'
import storyController from '@/controller/story//storyController'

const storyRouter = new Router({ prefix: '/story' })

storyRouter.post('/', verifyAuth, verifyCUInfo, storyController.create)
storyRouter.post('/list', verifyAuth, storyController.list)

export default storyRouter
