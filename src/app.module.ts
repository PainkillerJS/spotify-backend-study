import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import typeOrmConfig from '@config/typeOrm.config';

import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [
    TracksModule,
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
