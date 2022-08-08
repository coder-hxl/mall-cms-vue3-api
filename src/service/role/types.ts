import { IMenu, IRole } from '../types'

interface IRoleService {
  create(roleInfo: IRole): Promise<any>
  update(roleId: string, roleInfo: IRole): Promise<any>
  delete(roleId: string): Promise<any>
  getRoleByAny(key: string, value: string): Promise<IRole[]>
  getRoleList(like: IRole, limit: any[]): Promise<IRole[]>
  getRoleMenuById(roleId: string): Promise<IMenu[]>
}

export { IRoleService }
