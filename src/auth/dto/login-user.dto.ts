import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description:
      'Has to have minimum 8 characters, 1 uppercase, 1 lowercase, 1 numeric character and 1 special character',
  })
  password: string;
}
