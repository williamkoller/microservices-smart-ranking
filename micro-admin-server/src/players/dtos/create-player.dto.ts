import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  tel: string

  @IsNotEmpty()
  @IsString()
  category: string
}
