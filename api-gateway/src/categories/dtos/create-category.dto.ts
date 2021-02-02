import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator'
import { EventType } from '@/categories/types/event.type'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  category: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsArray()
  @ArrayMinSize(1)
  events: Array<EventType>
}
