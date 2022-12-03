import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class DetailUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  role: number = 1;

  @ApiProperty()
  @IsNumber()
  status: number = 1;
}
