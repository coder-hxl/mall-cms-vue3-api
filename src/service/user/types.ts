import type { ResultSetHeader } from 'mysql2'
import type { IUser } from '../types'

interface IUserService {
  create(userInfo: IUser): Promise<ResultSetHeader>
  delete(userId: string): Promise<ResultSetHeader>
  update(id: string | number, updateInfo: IUser): Promise<ResultSetHeader>
  getUserByAny(key: string, value: string): Promise<IUser[]>
  getUserByID(userId: string): Promise<IUser>
  getUserList(like: IUser, limit: string[]): Promise<IUser[]>
}

export { IUserService }
