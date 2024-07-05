import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { taskDto } from 'src/DTOs/task.dto';
import { taskRepository } from 'src/prisma/task.respository';

@Injectable()
export class TaskService {
  async createTask(taskData: taskDto): Promise<Task> {
    return taskRepository.createTask(taskData);
  }

  async findAll() {
    return taskRepository.findAllTasks();
  }
}
