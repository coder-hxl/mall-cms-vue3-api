import type { ResultSetHeader } from 'mysql2'
import { IRRoleMenu } from '../types'

interface IRRoleMenuService {
  create(roleId: string | number, menuId: number): Promise<ResultSetHeader>
  delete(roleMenuId: number): Promise<ResultSetHeader>
  getRoleMenuByRoleId(roleId: string | number): Promise<IRRoleMenu[]>
}

export { IRRoleMenuService }
