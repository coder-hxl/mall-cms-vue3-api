import type { ResultSetHeader } from 'mysql2'
import { IDepartment } from '../types'

interface IDepartmentService {
  create(info: IDepartment): Promise<ResultSetHeader>
  delete(id: string): Promise<ResultSetHeader>
  update(id: string, info: IDepartment): Promise<ResultSetHeader>
  getDepartmentByAny(key: string, value: string): Promise<IDepartment[]>
  getDepartmentById(id: string): Promise<IDepartment>
  getDepartmentList(like: IDepartment, limit: string[]): Promise<IDepartment[]>
}

export { IDepartmentService }
