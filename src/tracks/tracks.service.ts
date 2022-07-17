import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import type { Model } from "mongoose";
import { Types } from "mongoose";

import { Comment, CommentDocument, Track, TrackDocument } from "./entities";
import { CreateCommentDto, CreateTrackDto } from "./dto";
import { ErrorTrack } from "./constants/error.constants";
import { FileService, FileType } from "../file/file.service";

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track.name)
    private trackEntity: Model<TrackDocument>,
    @InjectModel(Comment.name)
    private commentEntity: Model<CommentDocument>,
    private fileService: FileService
  ) {}

  async create(dto: CreateTrackDto, pictures, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturesPath = this.fileService.createFile(FileType.IMAGE, pictures);

    const existTrack = await this.trackEntity.findOne({ name: dto.name }).exec();

    if (existTrack) {
      throw new BadRequestException(ErrorTrack.EXISTS_TRACK_NAME);
    }

    return this.trackEntity.create({ ...dto, listens: 0, audio: audioPath, picture: picturesPath });
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    return this.trackEntity.find().skip(Number(offset)).limit(Number(count)).exec();
  }

  async getOne(id: Types.ObjectId): Promise<Track> {
    const track = await this.trackEntity.findById(id).populate("comments").exec();

    if (!track) {
      throw new BadRequestException(ErrorTrack.NOT_EXISTS_TRACK_ID);
    }

    return track;
  }

  async delete(id: Types.ObjectId): Promise<Types.ObjectId> {
    const track = await this.trackEntity.findByIdAndDelete(id).exec();

    return track._id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackEntity.findById(dto.trackId).exec();

    if (!track) {
      throw new BadRequestException(ErrorTrack.NOT_EXISTS_TRACK_ID);
    }

    const comment = await this.commentEntity.create({ ...dto });

    track.comments.push(comment._id);
    await track.save();

    return comment;
  }

  async listen(id: Types.ObjectId): Promise<void> {
    const track = await this.trackEntity.findById(id).exec();

    if (!track) {
      throw new BadRequestException(ErrorTrack.NOT_EXISTS_TRACK_ID);
    }

    track.listens += 1;

    await track.save();
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackEntity
      .find({
        name: { $regex: new RegExp(query, "i") }
      })
      .exec();

    return tracks;
  }
}
