import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import type { Model } from 'mongoose';
import { Types } from 'mongoose';

import { Comment, CommentDocument, Track, TrackDocument } from './entities';
import { CreateCommentDto, CreateTrackDto } from './dto';
import { ErrorTrack } from './constants/error.constants';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track.name)
    private trackEntity: Model<TrackDocument>,
    @InjectModel(Comment.name)
    private commentEntity: Model<CommentDocument>,
  ) {}

  async create(dto: CreateTrackDto): Promise<Track> {
    const existTrack = await this.trackEntity
      .findOne({ name: dto.name })
      .exec();

    if (existTrack) {
      throw new BadRequestException(ErrorTrack.EXISTS_TRACK_NAME);
    }

    return this.trackEntity.create({ ...dto, listens: 0 });
  }

  async getAll(): Promise<Track[]> {
    return this.trackEntity.find().exec();
  }

  async getOne(id: Types.ObjectId): Promise<Track> {
    const track = await this.trackEntity
      .findById(id)
      .populate('comments')
      .exec();

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
}
