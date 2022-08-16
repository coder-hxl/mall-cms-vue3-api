import type { ICategory } from '@/service/types'

interface ICategoryService {
  create(name: string): Promise<any>
  delete(id: string): Promise<any>
  update(id: string, name: string): Promise<any>
  getCategoryList(like: ICategory, limit: string[]): Promise<ICategory[]>
  getCategoryByAny(key: string, value: any): Promise<ICategory[]>
}

export default ICategoryService
