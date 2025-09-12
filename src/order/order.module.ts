import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderHistory } from './orderHistory.entity';
import { CreateOrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderHistory])], // ⬅️ tambahkan ini
  controllers: [CreateOrderController],
  providers: [OrderService],
})
export class OrderModule {}
