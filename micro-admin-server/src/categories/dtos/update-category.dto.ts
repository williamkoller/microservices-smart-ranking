import { Event } from '../models/category.schema'

export class UpdateCategoryDto {
  id?: string
  description: string
  events: Array<Event>
}
