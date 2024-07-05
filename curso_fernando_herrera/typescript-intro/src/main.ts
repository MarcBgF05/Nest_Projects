// import { bulbasur, pokemons } from './bases/02-objetcs'
// import { charmander } from './bases/03-clases'
// import { charmander } from './bases/04-injection'
// import { charmander } from './bases/05-decorator'
import { charmander } from './bases/06-decortators2'
import './style.css'
// import { age, name } from './bases/01.types.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Hello Vite ${charmander.name} de Id "${charmander.id}"</h1>
  
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
