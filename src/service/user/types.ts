import type { ResultSetHeader } from 'mysql2'
import type { IUser } from '../types'

interface IUserList extends IUser {
  departmentId: number
  departmentName: string
  roleId: number
  roleName: string
}

interface IUserService {
  create(userInfo: IUser): Promise<ResultSetHeader>
  delete(userId: string): Promise<ResultSetHeader>
  update(id: string | number, updateInfo: IUser): Promise<ResultSetHeader>
  getUserByID(userId: string): Promise<IUser>
  getUserList(like: IUser, limit: string[]): Promise<IUserList[]>
  getUserByAny(key: string, value: string): Promise<IUser[]>
}

export { IUserService }
