import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator'
import { EventType } from '../types/event.type'

export class UpdateCategoryDTO {
  @IsString()
  @IsOptional()
  description: string

  @IsArray()
  @ArrayMinSize(1)
  events: Array<EventType>
}
