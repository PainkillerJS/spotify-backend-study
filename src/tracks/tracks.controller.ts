import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

import { TracksService } from "./tracks.service";
import { Types } from "mongoose";
import { CreateCommentDto, CreateTrackDto } from "./dto";

@Controller("/tracks")
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Post("/create")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "pictures", maxCount: 1 },
      { name: "audio", maxCount: 1 }
    ])
  )
  async create(
    @Body() dto: CreateTrackDto,
    @UploadedFiles()
    files: { pictures?: Express.Multer.File[]; audio: Express.Multer.File[] }
  ) {
    const { pictures, audio } = files;

    return this.trackService.create(dto, pictures[0], audio[0]);
  }

  @Get("/getAll")
  async getAll(@Query("count") count: number, @Query("offset") offset: number) {
    return this.trackService.getAll(count, offset);
  }

  @Get("/search")
  async search(@Query("query") query: string) {
    return this.trackService.search(query);
  }

  @Get("/:id")
  async getOne(@Param("id") id: Types.ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete("/:id")
  async delete(@Param("id") id: Types.ObjectId) {
    return this.trackService.delete(id);
  }

  @Patch("/comment")
  async addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }

  @Patch("/listen/:id")
  async addListen(@Param("id") id: Types.ObjectId) {
    return this.trackService.listen(id);
  }
}
