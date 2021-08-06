import { EventType } from '@/modules/categories/types/event.type'
import { IsNotEmpty, IsObject, IsString } from 'class-validator'

export class CreateChallengeDto {
  @IsString()
  @IsNotEmpty()
  category: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsObject()
  @IsNotEmpty()
  events: EventType
}
