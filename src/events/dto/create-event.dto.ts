import { IsBoolean, isBoolean, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateEventDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  start_date: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  end_date: string;

  @IsOptional()
  @IsBoolean()
  published: boolean = true;
}
