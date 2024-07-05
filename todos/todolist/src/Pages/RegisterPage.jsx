import { useForm } from 'react-hook-form'
import { registerRequest } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { signup, isAuthenticated, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks')
    }
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  })

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc8 max-w-md p-10 rounded-md">
        {registerErrors.map((error, index) => (
              <p key={index} className="bg-red-500 my-2  text-center text-lg">
                {error}
              </p>
            ))
          }
        <h1 className="text-3xl font-bold my-2">Register</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Username"
            {...register('name', { required: true })}
            className="w-full bg-zinc10 text-zinc1 px-4 py-2 rounded-md my-2"
          />
          {errors.name && <p className="text-red-500">Username is required</p>}
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}
