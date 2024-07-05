import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthRequired } from './middlewares/validateToken.middleware';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://00028320:Wr5y9ZEnDfBcK8Bs@cluster0.riravzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    //Wr5y9ZEnDfBcK8Bs
    TasksModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthRequired).forRoutes('tasks/*', 'auth/verify');
  }
}
