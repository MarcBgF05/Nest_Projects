const Deprecated = (deprecationReason: string) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
      // console.log({target})
      return {
        get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${ memberName } is deprecated with reason: ${ deprecationReason }`);
            //! Llamar la función propiamente con sus argumentos
            propertyDescriptor.value.apply(this, args); 
          }
          return wrapperFn;
        }
      }
    }   
}

export class Pokemon {
  constructor(public readonly id: number, public name: string){}

  scream(){
    console.log(`${this.name.toUpperCase()}!!!`)
  }
  @Deprecated('Most use speak2 method instead')
  speack(){
    console.log(`${this.name}, ${this.name}`)
  }

  speack2(){
    console.log('AAAAAAAAAAAAAAAAAAAAA')
  }

}

export const charmander = new Pokemon(4, 'Charmander')

charmander.speack2()