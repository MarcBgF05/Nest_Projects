import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  // Req,
} from '@nestjs/common';
import { taskDto } from 'src/DTOs/task.dto';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
//import { Request } from 'express';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  async createTask(@Body() task: taskDto): Promise<Task> {
    try {
      console.log(task);
      return this.taskService.createTask(task);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }
}
