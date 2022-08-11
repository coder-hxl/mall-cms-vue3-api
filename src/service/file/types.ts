import { IAvatar } from '../types'

interface IFileService {
  createAvatar(
    userId: number,
    filename: string,
    mimetype: string,
    size: number
  ): Promise<any>
  updateAvatar(
    userId: number,
    filename: string,
    mimetype: string,
    size: number
  ): Promise<any>
  getAvatartByUserId(userId: string | number): Promise<IAvatar>
}

export { IFileService }
