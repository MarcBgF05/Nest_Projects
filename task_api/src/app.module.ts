import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

//muCYgbNHV2LhTOhJ

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv:',
    ),
    TasksModule,
  ],
})
export class AppModule {}
