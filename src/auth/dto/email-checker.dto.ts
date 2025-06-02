import { IsString } from 'class-validator';

export class EmailChecker {
  @IsString()
  email: string;
}
