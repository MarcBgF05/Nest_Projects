import { useEffect } from 'react'
import { useTask } from '../context/TaskContext'
import TaskCard from '../components/TaskCard'

export const TaskPage = () => {
  const { getTask, tasks } = useTask()

  useEffect(()=>{
    getTask()
  },[])

  if(tasks.length ===0) return (<h1>No hay tareas</h1>)
  return <div className='grid grid-cols-3 gap-2'>{
    tasks.map(task =>(
      <TaskCard task={task} key={task._id} />
    ))
  }
  </div>
}
