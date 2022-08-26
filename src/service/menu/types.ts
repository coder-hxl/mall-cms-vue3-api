import type { ResultSetHeader } from 'mysql2'
import { IMenu } from '../types'

interface IMenuService {
  create(menuInfo: IMenu): Promise<ResultSetHeader>
  delete(menuId: string): Promise<ResultSetHeader>
  update(menuId: string, menuInfo: IMenu): Promise<ResultSetHeader>
  getMenuByAny(key: string, value: string): Promise<IMenu[]>
  getMenuById(menuId: string): Promise<IMenu>
  getMenuList(like: IMenu, limit: string[]): Promise<IMenu[]>
}

export { IMenuService }
