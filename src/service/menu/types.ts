import { IMenu } from '../types'

interface IMenuService {
  create(menuInfo: IMenu): Promise<any>
  delete(menuId: string): Promise<any>
  update(menuId: string, menuInfo: IMenu): Promise<any>
  getMenuByName(name: string): Promise<IMenu[]>
  getMenuByUrl(url: string): Promise<IMenu[]>
  getMenuById(menuId: string): Promise<IMenu>
  getMenuList(like: IMenu, limit: string[]): Promise<IMenu[]>
}

export { IMenuService }
