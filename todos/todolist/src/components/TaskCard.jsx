import React from 'react'
import { useTask } from '../context/TaskContext'
import { Link } from 'react-router-dom'

const TaskCard = ({ task }) => {
    
    const {deleteTask} = useTask()

  return (
    <div>
      <div className="bg-zinc7 max-w-md p-10 rounded-md">
        <header className='flex justify-between'>
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <div className="flex gap-x-2 items-center">
            <button onClick={()=>{
                deleteTask(task._id)
            }}>Elimnar</button>
            <Link to={`${task._id}`}>Editar</Link>
          </div>
        </header>
        <p className="text-zinc3">{task.description}</p>
      </div>
    </div>
  )
}

export default TaskCard
