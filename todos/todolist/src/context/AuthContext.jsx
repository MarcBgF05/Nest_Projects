import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth'

export const AuthContext = createContext()

//Hook para no estar utilizando el useContext
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([]) // en un principio no hay errores
  const [loading, setLoading] = useState(true)


  

  const signup = async (user) => {
    try {
      const res = await registerRequest(user)
      console.log('Respuesta de la petición de registro', res)
      if (res.message) {
        setErrors([res.message])
        setIsAuthenticated(false)
        return
      }
      setUser(res)
      setIsAuthenticated(true)
    } catch (error) {
      setUser(null)
      console.log(error)
    }
  }

  const signin = async (user) => {
    try {
      console.log(user)
      const res = await loginRequest(user)
      console.log('respuesta del loginRequest', res)
      if (res.message) {
        setErrors([res.message])
        setIsAuthenticated(false)
        return
      }
      setUser(res)
      setIsAuthenticated(true)

      console.log(isAuthenticated)
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUser(null)
  }
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  //Cuando cargue la app -> Biblioteca para comprobar la cookie : js-cookie
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get()
      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return
      }
      try {
        const res = await verifyTokenRequest()
        console.log(res)
        if (!res) {
          setIsAuthenticated(false)
          setLoading(false)
          return
        }

        setIsAuthenticated(true)
        setUser(res)
        setLoading(false)
      } catch (error) {
        console.log('Error en verifyTokenRequest: ', error)
        setLoading(false)
        setIsAuthenticated(false)
        setUser(null)
      }
    }
    checkLogin()
  }, [])



  return (
    <AuthContext.Provider
      value={{ signup, user, isAuthenticated, errors, signin, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
