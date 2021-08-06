import { EventType } from '@/modules/categories/types/event.type'

export class CreateCategoryDto {
  name: string
  description: string
  events: Array<EventType>
}
