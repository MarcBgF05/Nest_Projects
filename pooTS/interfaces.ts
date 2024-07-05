interface Drink {
  name: string
}

interface AlcholicDrink extends Drink {
  alcohol: number

  showInfo(): string
}

interface MixedDrink {
  ingredients: string[]
}

class Wine implements AlcholicDrink {
  name: string
  alcohol: number

  constructor(name: string, alcohol: number) {
    this.name = name
    this.alcohol = alcohol
  }

  showInfo(): string {
    return `Wine: ${this.name} - ${this.alcohol}`
  }
}

class Cocktail implements AlcholicDrink, MixedDrink {
  alcohol: number
  name: string
  ingredients: string[]

  constructor(name: string, alcohol: number, ingredients: string[]) {
    this.name = name
    this.alcohol = alcohol
    this.ingredients = ingredients
  }

  showInfo(): string {
    const ingredients = this.ingredients.reduce(
      (ac, ingredient) => ac + ' ' + ingredient + ', ',
      ''
    )
    return `Cocktail: ${this.name} - ${this.alcohol} - ${ingredients}`
  }
}

const margarita = new Cocktail('Margarita', 10, [
  'Tequila',
  'Lime',
  'Triple sec',
])

const rioja = new Wine('Rioja', 12)
const malbec = new Wine('Malbec', 14)

const ad: AlcholicDrink[] = [margarita, rioja, malbec]

const showDrinks = (drinnk: AlcholicDrink[]) => {
  drinnk.forEach((e) => console.log(e.showInfo()))
}

showDrinks(ad)