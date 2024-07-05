type Beer = {
  readonly name: string
  readonly alcohol: number
  brand?: string
}

type Snack = {
  nameSnack: string
  price: number
}

const show = (beer: Beer) => {
  console.log(`Info: ${beer.name}- ${beer.alcohol} - ${beer.brand}`)
}

const myBeer: Beer = {
  name: 'Corona Extra',
  alcohol: 4.5,
  brand: 'Grupo Modelo',
}

show(myBeer)

const combo: Beer & Snack = {
  name: 'Corona Extra',
  alcohol: 4.5,
  brand: 'Grupo Modelo',
  nameSnack: 'Papas',
  price: 25,
}

console.log('El combo del mal: ', combo)