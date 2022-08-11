import type { IUser } from '../types'

interface IUserService {
  create(userInfo: IUser): Promise<any>
  delete(userId: string): Promise<any>
  update(id: string | number, updateInfo: IUser): Promise<any>
  getUserByAny(key: string, value: string): Promise<IUser[]>
  getUserByID(userId: string): Promise<IUser>
  getUserList(like: IUser, limit: string[]): Promise<IUser[]>
}

export { IUserService }
