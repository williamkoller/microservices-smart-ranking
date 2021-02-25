import { EventType } from '@/categories/types/event.type'
import { Document } from 'mongoose'

export type Category = Document

export interface CategoryDocument extends Document {
  category: string
  description: string
  events: Array<EventType>
}
