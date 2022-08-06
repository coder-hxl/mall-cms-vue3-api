import { recursionGetFilePath } from '@/utils/pathHandle'

import type Router from '@koa/router'
import type { IApp } from '@/app/types'

function useRouter(this: IApp) {
  const routerPaths = recursionGetFilePath(__dirname, 'Router.ts')

  routerPaths.forEach((routerPath) => {
    const router: Router = require(routerPath).default

    this.use(router.routes())
    this.use(router.allowedMethods())
  })
}

export default useRouter
