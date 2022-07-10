import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { TracksService } from './tracks.service';

@Controller('/tracks')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Post('/create')
  async create() {}

  @Get('/getAll')
  async getAll() {
    return 'WORK';
  }

  @Get('/get/:id')
  async getOne(@Param('id') id: number) {}

  @Delete('/delete/:id')
  async delete() {}
}
