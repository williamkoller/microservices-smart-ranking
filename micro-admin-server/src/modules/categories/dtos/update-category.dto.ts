import { EventType } from '@/modules/categories/types/event.type'

export class UpdateCategoryDto {
  id?: string
  description: string
  events: Array<EventType>
}
