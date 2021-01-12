import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  name: string

  @IsNumber()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  phoneNumber: number

  @IsEmail()
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  email: string
}
