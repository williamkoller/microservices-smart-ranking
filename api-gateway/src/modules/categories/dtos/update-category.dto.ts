import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator'
import { EventType } from '@/modules/categories/types/event.type'

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  description: string

  @IsArray()
  @ArrayMinSize(1)
  events: Array<EventType>
}
