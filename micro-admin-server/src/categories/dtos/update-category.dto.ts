import { EventType } from '@/categories/types/event.type'

export class UpdateCategoryDto {
  id?: string
  description: string
  events: Array<EventType>
}
