import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class taskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
