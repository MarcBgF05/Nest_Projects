import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

export const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth()
console.log(isAuthenticated)
  if (loading) {
    return <h1>Loading...</h1>
  }
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />

  return <Outlet />
}
