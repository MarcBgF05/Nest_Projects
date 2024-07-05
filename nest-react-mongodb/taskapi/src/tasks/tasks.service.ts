import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import { UpdateTaskDTO } from 'src/DTOs/updateTask.dto';
import { CreateTaskDto } from '../DTOs/createTask.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {} // método que se ejecuta apenas se instancia la clase

  findAll() {
    return this.taskModel.find();
  }

  async create(createTask: CreateTaskDto) {
    const newTask = new this.taskModel(createTask);
    return await newTask.save();
  }

  async findOne(id: string) {
    return await this.taskModel.findById(id);
  }

  async delete(id: string) {
    return await this.taskModel.findByIdAndDelete(id);
  }

  async update(id: string, task: UpdateTaskDTO) {
    return await this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }
}
