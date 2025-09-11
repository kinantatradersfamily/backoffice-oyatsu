import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { componentService } from './create_component.service';
import { Component } from './create_component.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('component')
export class CreateComponentController {
  constructor(private readonly service: componentService) { }

  @Post(':year/:month')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + '-' + file.originalname);
        },
      }),
    }),
  )
  async create(
    @Param('year') year: string,
    @Param('month') month: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);

    const sections = JSON.parse(body.sections);
    const dtoArray = sections.map((s, i) => ({
      ...s,
      image: files[i] ? `/uploads/${files[i].filename}` : null,
    }));

    return { success: true, data: await this.service.createMany(yearNum, monthNum, dtoArray) };
  }

  @Get(':year')
  getByYearMonth(@Param('year') year: string) {
    return this.service.getByYearMonth(parseInt(year, 10));
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + '-' + file.originalname);
        },
      }),
    }),
  )

  async update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {

    if (files[0]) {
      body.image = `/uploads/${files[0].filename}`;
    }

    if (body.price) body.price = +body.price;

    return this.service.update(+id, body);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(parseInt(id, 10));
  }
}
