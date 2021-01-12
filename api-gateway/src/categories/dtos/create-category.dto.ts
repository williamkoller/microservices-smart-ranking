import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator'

export type Event = {
  name: string
  operation: string
  value: number
}

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>
}
