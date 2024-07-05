// tipos de datos

export const name: string = 'fernando'

export const age: number = 35

export const isValid: boolean = true

//type safety -> el dato que estamos esperando
//template strings
export const templateString = ` Esto es un string
 Multilinea
 que puede tener
 " dobles
 " simple
 inyectar valores : ${name},
 Expresiones ${1 + 1}
 números : ${age}
 booleanos : ${isValid}
 `

console.log(templateString)
