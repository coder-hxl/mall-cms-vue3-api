import type { IUser } from '../types'

interface IUserService {
  getUserByName(userName: string): Promise<IUser[]>
}

export { IUserService }
