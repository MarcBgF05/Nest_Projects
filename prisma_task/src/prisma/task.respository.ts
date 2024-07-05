import { Prisma, Task } from '@prisma/client';
import { getPrismaClient } from './prisma.singleton';
import { taskDto } from 'src/DTOs/task.dto';

export class TaskRepository {
  prisma = getPrismaClient();
  //creación de task
  async createTask(data: taskDto): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  //buscar por Id
  async findTaskById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  //Actualizar una task
  async updateTask(id: string, data: taskDto): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data });
  }

  //Eliminar una task
  async deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }

  //Buscar todas las tareas
  async findAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  //Buscar una tarea por Id
  async findTasksByUserId(id: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { id },
    });
  }
}

export const taskRepository = new TaskRepository();
