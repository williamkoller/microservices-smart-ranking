type Event = {
  name: string
  operation: string
  value: number
}

export class CategoryDto {
  id: string
  name: string
  description: string
  events: Array<Event>
}
