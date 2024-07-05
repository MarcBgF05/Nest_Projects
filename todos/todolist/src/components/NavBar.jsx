import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <nav className="bg-zinc7 my-3 flex justify-between py5 px-10">
      <h1 className="text-2xl font-bold">Task Manager</h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className='text-red'>Welcome {user?.username}</li>
            <li>
              <Link to="/add-task">Agregar tarea</Link>
              
            </li>
            <li>
            <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
