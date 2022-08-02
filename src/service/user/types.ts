import type { IUser } from '../types'

interface IUserService {
  create(userInfo: IUser): Promise<any>
  delete(userId: string): Promise<any>
  update(id: string, updateInfo: IUser): Promise<any>
  getUserByName(userName: string): Promise<IUser[]>
  getUserByID(userId: string): Promise<IUser>
  getUserList(like: IUser, limit: string[]): Promise<IUser[]>
}

export { IUserService }
