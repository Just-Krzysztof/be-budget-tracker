import { IsUUID } from 'class-validator';

export class GetShortSummaryDto {
  @IsUUID()
  userId: string;
}
