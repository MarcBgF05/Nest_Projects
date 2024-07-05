import axios from 'axios'
import { Move, PokeAPIResponse } from '../interfaces/pokeapi-response.interface'
//Clases - Forma tradicional
// export class Pokemon {
//   //propiedades
//   public id: number
//   public name: string

//   constructor(id: number, name: string) {
//     ;(this.id = id), (this.name = name)
//     console.log('constructor llamado')
//   }
// }

//Forma abreviada
export class Pokemon {
  get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`
  }

  constructor(public readonly id: number, public name: string) {}

  scream() {
    console.log(`${this.name.toUpperCase()}!!!!`)
  }

  speak() {
    console.log(`${this.name}, ${this.name}`)
  }

  //Métodos asíncronos
  async getMoves(): Promise<Move[]>{
    const {data} = await axios.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon/4')
    console.log(data.moves[0].move.name)
    return data.moves; 
  }
}

export const charmander = new Pokemon(4, 'Charmander')
// console.log(charmander.imageUrl)

// charmander.speak()
// charmander.scream()

console.log(charmander.getMoves())
