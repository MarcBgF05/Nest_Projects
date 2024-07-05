import { useForm } from 'react-hook-form'
import { useTask } from '../context/TaskContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm()
  const { tasks, createTask, getTaskbyId, updateTask } = useTask()
  console.log(tasks)

  const navigate = useNavigate()

  const params = useParams()
  console.log(params)
  useEffect(() => {
    const loadtask = async () => {
      if (params.id) {
        const task = await getTaskbyId(params.id)
        console.log(task) 
        setValue('title', task.title)
        setValue('description', task.description)
      }
    }
    loadtask()
  }, [])

  const onSubmit = handleSubmit((data) => {
  if(params.id){
    console.log('Update') 
    updateTask(params.id, data)
  }else{
    createTask(data)
    
  }
  navigate('/tasks')
  })

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc10 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Title"
            {...register('title')}
            className="w-full bg-zinc8 text-neutral-50 px-4 py-2 rounded-md my-2"
            autoFocus
          />
          <textarea
            rows="3"
            placeholder="Description"
            {...register('description')}
            className="w-full bg-zinc8 text-neutral-50 px-4 py-2 rounded-md my-2"
          ></textarea>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}
