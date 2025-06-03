import { IsString, IsUUID } from 'class-validator';

export class CreateTagDto {
  @IsString()
  name: string;

  @IsUUID()
  userId: string;

  @IsString()
  colorBg: string;

  @IsString()
  colorText: string;
}
