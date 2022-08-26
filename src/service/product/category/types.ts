import type { ResultSetHeader } from 'mysql2'
import type { ICategory } from '@/service/types'

interface ICategoryService {
  create(name: string): Promise<ResultSetHeader>
  delete(id: string): Promise<ResultSetHeader>
  update(id: string, name: string): Promise<ResultSetHeader>
  getCategoryList(like: ICategory, limit: string[]): Promise<ICategory[]>
  getCategoryByAny(key: string, value: any): Promise<ICategory[]>
}

export default ICategoryService
