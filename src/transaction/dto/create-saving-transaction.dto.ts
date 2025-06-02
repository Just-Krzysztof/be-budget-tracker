import {
  IsUUID,
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionType } from 'generated/prisma';

export class CreateSavingTransactionDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  @Type(() => Number)
  amount: number;

  @IsString()
  currency: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDate()
  @Type(() => Date)
  data: Date;

  @IsUUID()
  goalId: string;

  type: TransactionType = TransactionType.SAVING;
}
