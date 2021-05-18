import { IsOptional } from 'class-validator'

export class UpdatePlayerDto {
  @IsOptional()
  id?: string

  @IsOptional()
  category?: string

  @IsOptional()
  imgUrl?: string
}
