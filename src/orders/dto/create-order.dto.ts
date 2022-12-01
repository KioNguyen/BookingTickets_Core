import { IsBoolean, isBoolean, IsDateString, IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { defaultIfEmpty } from 'rxjs';

export class CreateOrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  owner: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  event: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  ticket: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  purchase_date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_price: number = 0;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number = 0;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({})
  status: number = 0;

}
