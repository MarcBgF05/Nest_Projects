class NewPokemon{
    constructor(public readonly id: number, public name: string){}

    scream(){
      console.log(`No quierooo!!!`)
    }
    speack(){
      console.log(`No quiero hablar`)
    }
  
}



const MyDecorator = ()=>{
    return (target: Function) =>{
        return NewPokemon
    }
}


@MyDecorator()
export class Pokemon {
  constructor(public readonly id: number, public name: string){}

  scream(){
    console.log(`${this.name.toUpperCase()}!!!`)
  }
  speack(){
    console.log(`${this.name}, ${this.name}`)
  }

}

export const charmander = new Pokemon(4, 'Charmander')

charmander.speack()
charmander.scream()