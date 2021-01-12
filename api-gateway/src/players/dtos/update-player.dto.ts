import { IsOptional, IsString } from 'class-validator'

export class UpdatePlayerDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  phoneNumber?: number
}
