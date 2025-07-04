import {
  IsUUID,
  IsNumber,
  IsEnum,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionType } from 'generated/prisma';

export class CreateTransactionDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  @Type(() => Number)
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsUUID()
  @IsOptional()
  tagId?: string;

  @IsUUID()
  @IsOptional()
  goalId?: string;

  @IsString()
  currency: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDate()
  @Type(() => Date)
  date: Date;
}
