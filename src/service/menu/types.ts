import { IMenu } from '../types'

interface IMenuService {
  create(menuInfo: IMenu): Promise<any>
  getMenuByName(name: string): Promise<IMenu[]>
  getMenuByUrl(url: string): Promise<IMenu[]>
}

export { IMenuService }
