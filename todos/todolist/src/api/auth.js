const api = 'http://localhost:3000/auth'

export const registerRequest = async (body) => {
  try {
    const resp = await fetch(`${api}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    })
    const result = await resp.json()
    // console.log("resultado del registerRequest: ",result)
    console.log('Fin de la petición')
    return result
  } catch (error) {
    console.error(error)
  }
}

export const loginRequest = async (body) => {
  try {
    const resp = await fetch(`${api}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include'
    })
    const result = await resp.json()
    // console.log("resultado del registerRequest: ",result)
    console.log('Fin de la petición')
    return result
  } catch (error) {
    console.error(error)
  }
};

export const verifyTokenRequest = async () =>{
  try {
     const response = await fetch(`${api

     }/verify`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       },
       credentials: 'include',
     })
 
     const result = await response.json() 
     return result 
 
  } catch (error) {
   console.log('Error en la petición verifyTokenRequest', error)
  }
 }