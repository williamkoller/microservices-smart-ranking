import { IsOptional } from 'class-validator'

export class UpdatePlayerDto {
  @IsOptional()
  category?: string

  @IsOptional()
  urlPhotoPlayer?: string
}
