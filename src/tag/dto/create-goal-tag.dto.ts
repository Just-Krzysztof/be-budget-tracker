import { IsUUID } from 'class-validator';

export class CreateGoalTagDto {
  @IsUUID()
  goalId: string;

  @IsUUID()
  tagId: string;
}
