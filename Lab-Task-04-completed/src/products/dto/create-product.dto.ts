import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsInt,
  Min,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price!: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}