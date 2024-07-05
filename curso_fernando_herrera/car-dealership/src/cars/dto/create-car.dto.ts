import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateCarDTO {
  @IsString({ message: 'the brand must be a String' })
  readonly brand: string;
  @IsString({ message: 'the model must be a String' })
  @MinLength(3)
  readonly model: string;
}

export class UpdateCarDTO {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString({ message: 'the brand must be a String' })
  @IsOptional()
  readonly brand?: string;
  @IsString({ message: 'the model must be a String' })
  @MinLength(3)
  @IsOptional()
  readonly model?: string;
}
