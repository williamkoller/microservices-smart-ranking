import { EventType } from '../types/event.type'

export class CategoryDto {
  id: string
  name: string
  description: string
  events: Array<EventType>
}
