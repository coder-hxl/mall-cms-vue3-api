import { IRoleMenu } from '../types'

interface IRoleMenuService {
  create(roleId: string, menuId: number): Promise<any>
  delete(roleMenuId: number): Promise<any>
  getRoleMenuByRoleId(roleId: string): Promise<IRoleMenu[]>
}

export { IRoleMenuService }
