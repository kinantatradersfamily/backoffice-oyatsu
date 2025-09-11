import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
  ) {}

  // create
  async createMany(
    year: number,
    month: number,
    dtoArray: Partial<Order>[],
  ) {
    const items = this.repo.create({ ...dtoArray, year, month });
    return await this.repo.save(items);
  }

  // READ
  async getByYearMonth(year: number) {
    const list = await this.repo.find({ where: { year } });

  let tempData = {};
    list.forEach(item => {
        if (!tempData[item.month]) {
            tempData[item.month] = [];
        }
        tempData[item.month].push(item)
    });

    return {
        message: {
        [year]: tempData,
        },
    };
  }

  // Update
  async update(id: number, dto: Partial<Order>) {
    await this.repo.update(id, { ...dto, updated_at: new Date() });
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
  async findByEmail(email: string) {
    return this.repo.find({
      where: { email },
    });
  }
}