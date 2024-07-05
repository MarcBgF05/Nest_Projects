import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/DTOs/createTask.dto';
import { UpdateTaskDTO } from 'src/DTOs/updateTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  finAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) throw new NotFoundException('Task Not Found');
    return task;
  }

  @Post()
  async create(@Body() body: CreateTaskDto) {
    try {
      return await this.tasksService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task Already Exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const taskDeleted = await this.tasksService.delete(id);
    if (!taskDeleted) throw new NotFoundException('Task Not Found');
    return taskDeleted;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDTO) {
    const task = await this.tasksService.update(id, body);

    if (!task) throw new NotFoundException('Task Not Found');
    return task;
  }
}
