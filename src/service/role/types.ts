import { IRole } from '../types'

interface IRoleService {
  update(roleId: string, menuInfo: IRole): Promise<any>
}

export { IRoleService }
