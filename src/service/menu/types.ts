import { IMenu } from '../types'

interface IMenuService {
  create(menuInfo: IMenu): Promise<any>
  delete(menuId: string): Promise<any>
  update(menuId: string, menuInfo: IMenu): Promise<any>
  getMenuByAny(key: string, value: string): Promise<IMenu[]>
  getMenuById(menuId: string): Promise<IMenu>
  getMenuList(like: IMenu, limit: string[]): Promise<IMenu[]>
}

export { IMenuService }
