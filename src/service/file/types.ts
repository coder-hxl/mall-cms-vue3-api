import type { ResultSetHeader } from 'mysql2'
import { IAvatar } from '../types'

interface IFileService {
  createAvatar(
    userId: number,
    filename: string,
    mimetype: string,
    size: number
  ): Promise<ResultSetHeader>
  updateAvatar(
    userId: number,
    filename: string,
    mimetype: string,
    size: number
  ): Promise<ResultSetHeader>
  getAvatartByUserId(userId: string | number): Promise<IAvatar>
}

export { IFileService }
