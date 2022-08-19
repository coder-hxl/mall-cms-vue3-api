import type { ResultSetHeader } from 'mysql2'
import { IMoment } from '../types'

interface IMomentService {
  create(userId: string | number, content: string): Promise<ResultSetHeader>
  getStoryList(like: IMoment, limit: string[]): Promise<IMoment[]>
  getStoryByAny(key: string, value: any): Promise<IMoment[]>
}

export default IMomentService
