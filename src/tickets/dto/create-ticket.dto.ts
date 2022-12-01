import { IsBoolean, isBoolean, IsDateString, IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateTicketDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  event: Types.ObjectId;

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
  @IsNumber()
  price: number = 0;


  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_quantity: number = 0;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  available_quantity: number = 0;
}
