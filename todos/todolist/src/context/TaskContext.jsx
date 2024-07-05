import { createContext, useContext, useState } from 'react'
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from '../api/task'

const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('Use Task must be used within a TaskProviver')
  }
  return context
}

export const TaskProviver = ({ children }) => {
  const [tasks, setTasks] = useState([])

  const createTask = async (tasks) => {
    console.log(tasks)
    const res = await createTaskRequest(tasks)
    console.log(res)
  }

  const getTask = async () => {
    try {
      const res = await getTasksRequest()
      setTasks(res)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteTask = async (id) => {
    try {
      const resp = await deleteTaskRequest(id)
      if (resp) {
        setTasks(tasks.filter((task) => task._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTaskbyId = async (id) =>{
    try {
      const resp = await getTaskRequest(id)
      return resp
      console.log(resp)
    } catch (error) {
      console.log(error)
    }
  }
  const updateTask = async (id, task) => {
    console.log('task recibida para ser actualizada ', task)
    try {
      const result = await updateTaskRequest(id,task)
      console.log('result', result)
    } catch (error) {
      console.log('Error en la petición')
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTask, deleteTask, getTaskbyId, updateTask }}>
      {children}
    </TaskContext.Provider>
  )
}
