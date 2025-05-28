import {
  IsUUID,
  IsNumber,
  IsEnum,
  IsString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export class CreateTransactionDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  @Type(() => Number)
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsString()
  category: string;

  @IsString()
  currency: string;

  @IsOptional()
  @IsString()
  description?: string;
}
