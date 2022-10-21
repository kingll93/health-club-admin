import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CardType } from 'src/core/enums/common.enum';
import * as dayjs from 'dayjs';

@Entity('consumers')
export class Consumer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column('tinyint')
  gender: number;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: 0 })
  amount: number;

  @Column({ unique: true })
  cardNumber: string;

  @Column({ type: 'tinyint', default: CardType.DISCOUNT8 })
  cardType: CardType;

  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  createTime: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_time' })
  updateTime: string;

  toResponseData() {
    this.createTime = dayjs(this.createTime).format('YYYY-MM-DD HH:mm:ss');
    this.updateTime = dayjs(this.updateTime).format('YYYY-MM-DD HH:mm:ss');
    return this;
  }
}
