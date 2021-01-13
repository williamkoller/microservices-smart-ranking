import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator'
import { EventType } from '../types/event.type'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsArray()
  @ArrayMinSize(1)
  events: Array<EventType>
}
