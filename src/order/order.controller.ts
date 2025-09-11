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
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('order')
export class CreateOrderController {
  constructor(private readonly service: OrderService) {}

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
    sections['document'] = files[0] ? `/uploads/${files[0].filename}` : null;
    const dtoArray = sections;

    return { success: true, data: await this.service.createMany(yearNum, monthNum, dtoArray) };
  }

  @Get(':year')
  getByYearMonth(@Param('year') year: string) {
    return this.service.getByYearMonth(parseInt(year, 10));
  }

  @Get('by-email/:email')
  async getByEmail(@Param('email') email: string) {
    return this.service.findByEmail(email);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<Order>) {
    return this.service.update(parseInt(id, 10), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(parseInt(id, 10));
  }
}
