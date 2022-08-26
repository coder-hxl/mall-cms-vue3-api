import type { ResultSetHeader } from 'mysql2'
import { IMenu, IRole } from '../types'

interface IRoleService {
  create(roleInfo: IRole): Promise<ResultSetHeader>
  update(roleId: string, roleInfo: IRole): Promise<ResultSetHeader>
  delete(roleId: string): Promise<ResultSetHeader>
  getRoleByAny(key: string, value: string): Promise<IRole[]>
  getRoleList(like: IRole, limit: string[]): Promise<IRole[]>
  getRoleMenuById(roleId: string): Promise<IMenu[]>
}

export { IRoleService }
