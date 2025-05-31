import { IsString, IsEnum } from 'class-validator';

export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
  PLN = 'PLN',
}

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEnum(Currency)
  currency?: string;
}
