import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { ImagesModule } from './images/images.module';
import { ImagesService } from './images/images.service';

import { ImagesController } from './images/images.controller';
import { EnvConfiguration } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
    ImagesModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class AppModule {}
