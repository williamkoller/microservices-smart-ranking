import { EventType } from '@/modules/categories/types/event.type'

export interface ICategory {
  _id: string
  category: string
  description: string
  events: Array<EventType>
}
