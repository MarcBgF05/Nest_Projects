import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from './Pages/LoginPage'
import { RegisterPage } from './Pages/RegisterPage'
import { NavBar } from './components/NavBar'
import { TaskPage } from './Pages/TaskPage'
import { TaskFormPage } from './Pages/TaskFormPage'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './ProtectedRoute'
import { TaskProviver } from './context/TaskContext'

export const App = () => {
  return (
    <AuthProvider>
      <TaskProviver>
        <BrowserRouter>
        <main className='container mx-auto px-10'>
        <NavBar />
          <hr className='my-2' />
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Acá irían las rutas ya autenticadas */}

            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/add-task" element={<TaskFormPage />} />
              <Route path="/tasks/:id" element={<TaskFormPage />} />
            </Route>
          </Routes>
        </main>
        </BrowserRouter>
      </TaskProviver>
    </AuthProvider>
  )
}
