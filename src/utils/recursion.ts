import fs from 'node:fs'
import path from 'node:path'

function recursionGetFilePath(targetPath: string, fileSuffix: string) {
  const routerPaths: string[] = []

  fs.readdirSync(targetPath).forEach((name) => {
    if (name.endsWith(fileSuffix)) {
      const filePath = path.resolve(targetPath, `./${name}`)

      routerPaths.push(filePath)
    } else if (!name.includes('.')) {
      const dirPath = path.resolve(targetPath, name)

      const childrenRouterPaths = recursionGetFilePath(dirPath, fileSuffix)
      routerPaths.push(...childrenRouterPaths)
    }
  })

  return routerPaths
}

export { recursionGetFilePath }
