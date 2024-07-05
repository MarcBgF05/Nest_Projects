import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/DTOs/createTaskDto';
import { UpdateTaskDto } from 'src/DTOs/updateTaskDto';
import { Request } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAll(@Req() req: Request) {
    try {
      const { userId } = await req.body.user;
      console.log(userId);
      return await this.tasksService.getAll(userId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    try {
      const task = await this.tasksService.getTaskById(id);

      if (!task) {
        throw new NotFoundException('Task not found');
      }
      return task;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(@Body() body: CreateTaskDto, @Req() req: Request) {
    try {
      console.log(req.body.user);
      const { userId } = await req.body.user;

      return await this.tasksService.create(body, userId);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const task = await this.tasksService.getTaskById(id);
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      await this.tasksService.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    try {
      const task = await this.tasksService.getTaskById(id);
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      return await this.tasksService.updateTask(id, body);
    } catch (error) {
      throw new Error(error);
    }
  }
}
