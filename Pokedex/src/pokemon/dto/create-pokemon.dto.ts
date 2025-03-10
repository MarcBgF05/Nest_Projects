import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

//Data que vamos a recibir
export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;
  @IsString()
  @MinLength(1)
  name: string;
}
