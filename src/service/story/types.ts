import type { ResultSetHeader } from 'mysql2'
import { IStory } from '../types'

interface IStoryService {
  create(userId: string | number, content: string): Promise<ResultSetHeader>
  getStoryList(like: IStory, limit: string[]): Promise<IStory[]>
  getStoryByAny(key: string, value: any): Promise<IStory[]>
}

export default IStoryService
