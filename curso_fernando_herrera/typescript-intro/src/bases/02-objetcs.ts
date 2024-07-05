export const pokemonIds = [1, 20, 30, 34, 66]

//pokemonIds.push(+'1') //conversión a un número

interface Pokemon {
  id: number
  name: string
  age?: number
}

export const bulbasur: Pokemon = {
  id: 1,
  name: 'Bulbasur',
  age: 2,
}

export const charmander: Pokemon = {
  id: 2,
  name: 'Charmander',
  age: 3,
}

console.log(bulbasur)

// Tipos de arreglos
export const pokemons: Pokemon[] = []
pokemons.push(bulbasur, charmander)
console.log(bulbasur, charmander)
