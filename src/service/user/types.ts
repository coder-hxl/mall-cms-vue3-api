import type { IUser } from '../types'

interface IUserService {
  getUserByName(userName: string): Promise<IUser[]>
  create(userInfo: IUser): Promise<any>
}

export { IUserService }
