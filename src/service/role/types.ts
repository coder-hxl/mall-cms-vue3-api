import { IRole } from '../types'

interface IRoleService {
  create(roleInfo: IRole): Promise<any>
  update(roleId: string, roleInfo: IRole): Promise<any>
  getRoleByName(roleName: string): Promise<IRole[]>
}

export { IRoleService }
