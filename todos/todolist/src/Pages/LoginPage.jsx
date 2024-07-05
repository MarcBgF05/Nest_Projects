import { useForm } from 'react-hook-form'

import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { signin, isAuthenticated, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Use the useEffect hook to redirect the user to the tasks page if they are already authenticated
    if (isAuthenticated) {
      navigate('/tasks')
    }
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signin(values)
  })

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc8 max-w-md p-10 rounded-md">
        {registerErrors.map((error, index) => (
          <p key={index} className="bg-red-500 my-2  text-center text-lg">
            {error}
          </p>
        ))}
        <h1 className="text-3xl font-bold my-2">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
            className="w-full bg-zinc10 text-zinc1 px-4 py-2 rounded-md my-2"
          />
          {errors.email && <p className="text-red-500">email is required</p>}
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
            className="w-full bg-zinc10 text-zinc1 px-4 py-2 rounded-md my-2"
          />
          {errors.password && (
            <p className="text-red-500 ">password is required</p>
          )}
          <button type="submit">Login</button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Don't have an account?{' '}
          <Link to="/register" className="text-neutral-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
