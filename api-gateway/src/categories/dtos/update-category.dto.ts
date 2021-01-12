import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator'
import { Event } from './create-category.dto'

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  description: string

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>
}
