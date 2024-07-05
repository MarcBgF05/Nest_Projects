import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTaskDTO } from './dto/task.dto';

@Injectable()
export class TasksService {
  //Tasks en si es el entity, sin embargo se coloca con corchetes para que sea un array de tasks

  private tasks: Task[] = [
    {
      id: '1',
      title: 'Task one',
      description: 'This is task one',
      status: TaskStatus.PENDING,
    },
  ];

  //Métodos a utilizar
  getAllTasks() {
    return this.tasks;
  }
  createTasks(title: string, description: string) {
    const task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(task);
    return task;
  }
  updateTasks() {}
  deleteTasks(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  updateTask(id: string, updateFields: UpdateTaskDTO): Task {
    const task = this.getTaskById(id);

    const newTask = Object.assign(task, updateFields);
    this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task));
    return newTask;
  }
}
