import { IDepartment } from '../types'

interface IDepartmentService {
  create(info: IDepartment): Promise<any>
  delete(id: string): Promise<any>
  update(id: string, info: IDepartment): Promise<any>
  getDepartmentByName(name: string): Promise<IDepartment[]>
  getDepartmentById(id: string): Promise<IDepartment>
  getDepartmentList(like: IDepartment, limit: string[]): Promise<IDepartment[]>
}

export { IDepartmentService }
