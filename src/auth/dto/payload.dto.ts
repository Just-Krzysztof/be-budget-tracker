import { IsString } from 'class-validator';

export class JwtPayload {
  @IsString()
  sub: string;

  @IsString()
  email: string;
}
