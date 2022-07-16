import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { Comment, Track } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Track])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
