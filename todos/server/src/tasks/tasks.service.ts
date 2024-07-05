import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/DTOs/createTaskDto';
import { UpdateTaskDto } from 'src/DTOs/updateTaskDto';
import { Task } from 'src/schemas/task.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private userService: UsersService,
  ) {}

  async getAll(userId: string) {
    return this.taskModel.find({ user: userId }).populate('user').exec();
  }

  async create(createTask: CreateTaskDto, userid: string) {
    const user = await this.userService.findById(userid);

    if (!user) {
      throw new Error('User not found');
    }

    const newTask = new this.taskModel({ ...createTask, user: user._id });

    return await newTask.save();
  }

  async getTaskById(id: string) {
    return this.taskModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  async updateTask(id: string, updateTask: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTask, { new: true });
  }
}
