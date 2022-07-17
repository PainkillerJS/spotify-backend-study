import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { Comment, CommentSchema, Track, TrackSchema } from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Track.name, schema: TrackSchema },
    ]),
  ],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
