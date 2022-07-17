import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TracksController } from "./tracks.controller";
import { TracksService } from "./tracks.service";
import { Comment, CommentSchema, Track, TrackSchema } from "./entities";
import { FileModule } from "../file/file.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Track.name, schema: TrackSchema }
    ]),
    FileModule
  ],
  controllers: [TracksController],
  providers: [TracksService]
})
export class TracksModule {}
