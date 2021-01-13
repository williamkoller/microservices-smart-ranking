import { EventType } from '../types/event.type'

export class CreateCategoryDto {
  name: string
  description: string
  events: Array<EventType>
}
