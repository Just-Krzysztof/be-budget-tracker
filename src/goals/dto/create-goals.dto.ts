import { IsUUID, IsNumber, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGoalsDto {
  @IsUUID()
  userId: string;

  @IsString()
  name: string;

  @IsNumber()
  @Type(() => Number)
  targetAmount: number;

  @IsString()
  currency: string;

  @IsDate()
  @Type(() => Date)
  deadline: Date;
}
