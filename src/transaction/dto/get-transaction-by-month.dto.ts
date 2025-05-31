import { IsUUID, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTransactionByMonthDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  month: number;

  @IsNumber()
  @Min(2000)
  @Max(2100)
  @Type(() => Number)
  year: number;
}
