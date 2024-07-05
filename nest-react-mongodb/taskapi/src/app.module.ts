import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

//muCYgbNHV2LhTOhJ

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://00028320:muCYgbNHV2LhTOhJ@cluster0.riravzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    TasksModule,
  ],
})
export class AppModule {}
