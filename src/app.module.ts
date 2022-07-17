import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import mongooseConfig from '@config/mongoose.config';

import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [
    TracksModule,
    MongooseModule.forRootAsync({
      useFactory: mongooseConfig,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
