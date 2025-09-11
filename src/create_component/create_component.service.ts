import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Component } from './create_component.entity';

@Injectable()
export class componentService {
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Component)
    private readonly repo: Repository<Component>,
  ) {}

  // create
  async createMany(
    year: number,
    month: number,
    dtoArray: Partial<Component>[],
  ) {
    const items = dtoArray.map((dto) =>
      this.repo.create({ ...dto, year, month }),
    );
    return await this.repo.save(items);
  }

  // READ
  async getByYearMonth(year: number) {
    const list = await this.repo.find({ where: { year } });

    const grouped = list.reduce(
      (acc, item) => {
        if (!acc[item.month]) {
          acc[item.month] = {
            section_1: [],
            section_2: [],
            section_3: [],
            section_4: [],
          };
        }

        if (acc[item.month][item.section]) {
          const baseData: any = {
            id: item.id,
            title: item.title,
            desc: item.desc,
            image: item.image,
          };

          if (item.section === 'section_3') {
            baseData.price = item.price ?? 0;
          }

          acc[item.month][item.section].push(baseData);
        }

        return acc;
      },
      {} as Record<number, Record<string, any[]>>,
    );

    return {
      message: {
        [year]: grouped,
      },
    };
  }

  // Update
  async update(id: number, dto: Partial<Component>) {
    await this.repo.update(id, { ...dto, updated_at: new Date() });
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
