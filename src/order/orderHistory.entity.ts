import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('order_history')
export class OrderHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  year: number;

  @Column()
  month: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  status: number;

  @Column({ type: 'text', nullable: true })
  flavor: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0 })
  saved_at: Date;
}
