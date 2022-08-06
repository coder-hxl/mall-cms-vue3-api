import { IRoleMenu } from '../types'

interface IRoleMenuService {
  create(roleId: string, menuId: number): Promise<any>
  delete(roleMenuId: number): Promise<any>
  getRoleMenuByRoleId(roleId: string | number): Promise<IRoleMenu[]>
}

export { IRoleMenuService }
