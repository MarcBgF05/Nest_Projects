import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipesModule } from './recipes/recipes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthRequired } from './middlewares/validateToken.middleware';
// 0ZTNFKmwNmRTHUom

@Module({
  imports: [
    AuthModule,
    IngredientModule,
    RecipesModule,
    MongooseModule.forRoot(
      'mongodb+srv://00028320:0ZTNFKmwNmRTHUom@cluster0.xs03zuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'palabra_Secreta',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthRequired).forRoutes('auth/verify');
  }
}
