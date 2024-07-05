//Relación a la BD
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // Definimos el esquema de la BD
export class Pokemon extends Document {
  //id: string; -> No es necesario en Mongoose
  @Prop({
    unique: true,
    index: true, // Para que no se repitan los nombres de los pokemones
  })
  name: string;
  @Prop({
    unique: true,
    index: true, // Para que no se repitan los nombres de los pokemones
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon); //Creamos el esquema de la BD
