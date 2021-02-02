import { EventType } from '@/categories/types/event.type'
import { Document } from 'mongoose'

export interface ICategory extends Document {
  category: string
  description: string
  events: Array<EventType>
}
