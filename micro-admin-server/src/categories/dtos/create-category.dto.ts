import { Event } from '../models/category.schema'

export class CreateCategoryDto {
  name: string
  description: string
  events: Array<Event>
}
