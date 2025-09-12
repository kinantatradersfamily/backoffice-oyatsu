import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderHistory } from './orderHistory.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
    @InjectRepository(OrderHistory)
    private readonly historyRepo: Repository<OrderHistory>,
  ) {}
  async findOne(options: any) {
    return this.repo.findOne(options);
  }
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
    const oldOrder = await this.findOne({ where: { id } });
    if (!oldOrder) throw new BadRequestException('Order not found');
    if (dto.status !== undefined && dto.status <= oldOrder.status) {
      throw new BadRequestException(
        `Status baru (${dto.status}) harus lebih besar dari status lama (${oldOrder.status})`,
      );
    }

    await this.historyRepo.save({
      orderId: oldOrder.id,
      email: oldOrder.email,
      year: oldOrder.year,
      month: oldOrder.month,
      phone: oldOrder.phone,
      status: oldOrder.status,
      flavor: oldOrder.flavor,
      saved_at: new Date(),
    });

    await this.repo.update(id, { ...dto, updated_at: new Date() });
    return true;
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
  async getOrderHistoryByEmail(email: string) {
    const history = await this.historyRepo.find({
      where: { email },
      order: { saved_at: 'ASC' },
    });

    const current = await this.repo.find({
      where: { email },
      order: { updated_at: 'ASC' },
    });

    const combined = [
      ...history.map((h) => ({
        id: h.orderId,
        status: h.status,
        flavor: h.flavor ? JSON.parse(h.flavor) : [],
        email: h.email,
        phone: h.phone,
        date: h.saved_at,
      })),
      ...current.map((o) => ({
        id: o.id,
        status: o.status,
        flavor: o.flavor ? JSON.parse(o.flavor) : [],
        email: o.email,
        phone: o.phone,
        date: o.updated_at,
      })),
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      email,
      history: combined,
    };
  }

  async findByEmail(email: string) {
    return this.repo.find({
      where: { email },
    });
  }
}