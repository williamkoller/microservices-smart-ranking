import { EventType } from '../types/event.type'

export class UpdateCategoryDto {
  id?: string
  description: string
  events: Array<EventType>
}
