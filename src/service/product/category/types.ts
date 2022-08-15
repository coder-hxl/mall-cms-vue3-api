import type { ICategory } from '@/service/types'

interface ICategoryService {
  create(name: string): Promise<any>
  delete(id: string): Promise<any>
  update(id: string, name: string): Promise<any>
  getCategoryList(like: ICategory, limit: string[]): Promise<ICategory[]>
  getCategorByAny(key: string, value: string): Promise<ICategory[]>
}

export default ICategoryService
