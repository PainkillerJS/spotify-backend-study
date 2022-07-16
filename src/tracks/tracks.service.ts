import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Comment, Track } from './entities';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackEntity: Repository<Track>,
    @InjectRepository(Comment)
    private commentEntity: Repository<Comment>,
  ) {}

  async create() {}

  async getAll() {}

  async getOne() {}

  async delete() {}
}
