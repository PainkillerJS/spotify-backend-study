import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Types } from 'mongoose';
import { CreateCommentDto } from './dto';

@Controller('/tracks')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Post('/create')
  async create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Get('/getAll')
  async getAll() {
    return this.trackService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: Types.ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: Types.ObjectId) {
    return this.trackService.delete(id);
  }

  @Post('/comment')
  async addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }
}
